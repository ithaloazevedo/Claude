/**
 * Agente respondedor: para cada persona, envia o questionário ao Claude Code CLI
 * e salva as respostas em output/respostas.json.
 *
 * Uso:
 *   node responder.js              → processa todas as 350 personas
 *   node responder.js --limite 5   → processa só as primeiras N (para testes)
 *   node responder.js --retomar    → pula personas já processadas
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PERGUNTAS } from './questionario.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PERSONAS_PATH = path.join(__dirname, 'output', 'personas.json');
const RESPOSTAS_PATH = path.join(__dirname, 'output', 'respostas.json');

// ─── Args ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const limiteIdx = args.indexOf('--limite');
const LIMITE = limiteIdx !== -1 ? parseInt(args[limiteIdx + 1]) : null;
const RETOMAR = args.includes('--retomar');

// ─── Prompt completo ──────────────────────────────────────────────────────────

function buildPrompt(persona) {
  const perguntas = PERGUNTAS.map(p => {
    if (p.tipo === 'aberta') {
      return `${p.id}. ${p.texto}\n(Resposta livre)`;
    }
    const opcoes = p.opcoes.map((o, i) => `  ${i + 1}. ${o}`).join('\n');
    const tipoLabel = p.tipo === 'multipla_escolha' ? '(pode escolher mais de uma)' : '(escolha uma)';
    return `${p.id}. ${p.texto} ${tipoLabel}\n${opcoes}`;
  }).join('\n\n');

  return `Você é um(a) aluno(a) do Portal Arcoplus (marca Nave à Vela), um portal educacional escolar.

SEU PERFIL:
- Faixa etária: ${persona.faixaEtaria.descricao}
- Experiência com tecnologia: ${persona.experienciaTech.descricao}
- Frequência de uso do portal: ${persona.frequenciaPortal.descricao}
- Contexto de acesso: ${persona.contextoAcesso.descricao}
- Perfil comportamental: ${persona.perfilComportamental.descricao}
- Motivação de uso: ${persona.motivacao.descricao}

INSTRUÇÕES:
1. Responda em primeira pessoa, como esse(a) aluno(a) respondendo um formulário escolar.
2. Use vocabulário adequado à faixa etária (8-9 anos: frases curtas e simples; 14-15 anos: mais detalhado e crítico).
3. Para escolha única ou múltipla: responda APENAS com o texto exato da(s) opção(ões).
4. Para abertas: 1-2 frases se iniciante/raramente acessa; 3-5 frases se heavy user/acessa todo dia.
5. Siga seu perfil comportamental:
   - Impaciente: desiste rápido, P20 = menos de 1 minuto, P23 = raiva/frustrado
   - Tímido: pede ajuda em P5 e P21, evita explorar sozinho
   - Curioso: tenta bastante, descreve tentativas nas abertas
   - Persistente: não desiste fácil, descreve o processo passo a passo
   - Indiferente: respostas curtas, tom neutro
6. Se "Nunca acessou": P2 = "Nunca usei", P6-P18 = opções de "não sei/nunca", P31-P33 neutras.
7. Para múltipla escolha, use array JSON. Para abertas e únicas, use string.

Retorne SOMENTE um JSON válido neste formato exato, sem texto antes ou depois:
{
  "respostas": {
    "P1": "resposta",
    "P2": "resposta",
    "P3": "resposta",
    "P4": "resposta",
    "P5": ["opção 1", "opção 2"],
    "P6": ["opção 1"],
    "P7": "resposta",
    "P8": "resposta",
    "P9": "resposta aberta",
    "P10": ["opção 1"],
    "P11": "resposta",
    "P12": "resposta",
    "P13": "resposta",
    "P14": ["opção 1", "opção 2"],
    "P15": "resposta aberta",
    "P16": "resposta",
    "P17": ["opção 1"],
    "P18": "resposta",
    "P19": "resposta",
    "P20": "resposta",
    "P21": ["opção 1"],
    "P22": ["opção 1", "opção 2"],
    "P23": "resposta",
    "P24": "resposta aberta",
    "P25": "resposta",
    "P26": "resposta",
    "P27": "resposta",
    "P28": ["opção 1", "opção 2"],
    "P29": "resposta aberta",
    "P30": "resposta aberta",
    "P31": "resposta",
    "P32": "resposta",
    "P33": "resposta",
    "P34": "palavra"
  }
}

QUESTIONÁRIO:

${perguntas}`;
}

// ─── Chamar Claude via CLI ────────────────────────────────────────────────────

function responderComoPersona(persona) {
  const prompt = buildPrompt(persona);

  // Escapa o prompt para passar via stdin ao claude --print
  const resultado = execSync(`claude --print`, {
    input: prompt,
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 300_000,
  });

  const texto = resultado.trim();

  // Extrai JSON da resposta (ignora texto extra se houver)
  const match = texto.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`JSON não encontrado na resposta da persona ${persona.id}`);

  const parsed = JSON.parse(match[0]);
  return parsed.respostas;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(PERSONAS_PATH)) {
    console.error('❌ output/personas.json não encontrado. Execute primeiro: node gerar-personas.js');
    process.exit(1);
  }

  const personas = JSON.parse(fs.readFileSync(PERSONAS_PATH, 'utf-8'));
  const alvo = LIMITE ? personas.slice(0, LIMITE) : personas;

  // Carrega respostas existentes se --retomar
  let resultados = {};
  if (RETOMAR && fs.existsSync(RESPOSTAS_PATH)) {
    resultados = JSON.parse(fs.readFileSync(RESPOSTAS_PATH, 'utf-8'));
    console.log(`↩️  Retomando: ${Object.keys(resultados).length} personas já processadas`);
  }

  let processadas = 0;
  let erros = 0;

  for (const persona of alvo) {
    const chave = `persona_${persona.id}`;

    if (RETOMAR && resultados[chave]) {
      process.stdout.write(`⏭️  Pulando ${persona.id}\r`);
      continue;
    }

    try {
      process.stdout.write(`🤖 Persona ${persona.id}/${alvo.length} [${persona.faixaEtaria.descricao}, ${persona.perfilComportamental.descricao}]... `);

      const respostas = responderComoPersona(persona);

      resultados[chave] = { perfil: persona, respostas };

      // Salva incrementalmente
      fs.writeFileSync(RESPOSTAS_PATH, JSON.stringify(resultados, null, 2), 'utf-8');
      processadas++;
      console.log('✅');

    } catch (err) {
      erros++;
      console.log(`❌ Erro: ${err.message.slice(0, 100)}`);
    }
  }

  console.log(`\n📦 Concluído: ${processadas} processadas, ${erros} erros`);
  console.log(`💾 Salvo em: output/respostas.json`);
}

main();

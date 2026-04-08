/**
 * Agente respondedor: para cada persona, envia o questionário ao Claude
 * e salva as respostas em output/respostas.json.
 *
 * Uso:
 *   node responder.js              → processa todas as 350 personas
 *   node responder.js --limite 5   → processa só as primeiras N (para testes)
 *   node responder.js --retomar    → pula personas já processadas
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PERGUNTAS } from './questionario.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carrega .env da raiz do projeto (dois níveis acima)
const envPath = path.join(__dirname, '..', '..', '.env');
if (fs.existsSync(envPath)) {
  const envVars = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const linha of envVars) {
    const [chave, ...resto] = linha.split('=');
    if (chave && resto.length && !process.env[chave.trim()]) {
      process.env[chave.trim()] = resto.join('=').trim();
    }
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY não encontrada. Adicione ao arquivo .env na raiz do projeto.');
  process.exit(1);
}

const cliente = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const PERSONAS_PATH = path.join(__dirname, 'output', 'personas.json');
const RESPOSTAS_PATH = path.join(__dirname, 'output', 'respostas.json');

// ─── Args ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const limiteIdx = args.indexOf('--limite');
const LIMITE = limiteIdx !== -1 ? parseInt(args[limiteIdx + 1]) : null;
const RETOMAR = args.includes('--retomar');

// ─── Prompt do sistema ────────────────────────────────────────────────────────

function buildSystemPrompt(persona) {
  return `Você é um(a) aluno(a) do Portal Arcoplus (marca Nave à Vela), um portal educacional escolar.

SEU PERFIL:
- Faixa etária: ${persona.faixaEtaria.descricao}
- Experiência com tecnologia: ${persona.experienciaTech.descricao}
- Frequência de uso do portal: ${persona.frequenciaPortal.descricao}
- Contexto de acesso: ${persona.contextoAcesso.descricao}
- Perfil comportamental: ${persona.perfilComportamental.descricao}
- Motivação de uso: ${persona.motivacao.descricao}

INSTRUÇÕES PARA RESPONDER:
1. Responda SEMPRE em primeira pessoa, como se fosse esse(a) aluno(a) respondendo um formulário escolar.
2. Use vocabulário e complexidade adequados à faixa etária:
   - 8-9 anos: frases muito curtas, palavras simples, sem termos técnicos
   - 10-11 anos: frases médias, começa a comparar com outros apps
   - 12-13 anos: pode usar gírias, compara com redes sociais e jogos
   - 14-15 anos: pensamento mais crítico, descreve problemas com precisão
3. Para perguntas de escolha única ou múltipla, responda APENAS com o texto exato da(s) opção(ões).
4. Para perguntas abertas, responda de forma proporcional à experiência:
   - Iniciantes (nunca usou / raramente acessa): 1-2 frases simples
   - Heavy user / acessa todo dia: 3-5 frases com detalhes específicos
5. Siga as regras de coerência do seu perfil:
   - Impaciente: desiste rápido, P20 = menos de 1 minuto, P23 = raiva/frustrado
   - Tímido/dependente: pede ajuda em P5 e P21, evita explorar sozinho
   - Curioso/explorador: tenta bastante, descreve tentativas múltiplas nas abertas
   - Persistente/metódico: não desiste fácil, descreve o processo passo a passo
   - Indiferente: respostas curtas, tom neutro, não recomendaria com entusiasmo
6. Se "Nunca acessou" o portal: P2 = "Nunca usei", P6-P18 = "Nunca prestei atenção nisso" ou opções de "não sei", P31-P33 neutras.

FORMATO DE SAÍDA:
Retorne um JSON válido com exatamente este formato:
{
  "respostas": {
    "P1": "resposta aqui",
    "P2": "resposta aqui",
    ...
    "P34": "resposta aqui"
  }
}

Para múltipla escolha, use array: "P5": ["opção 1", "opção 2"]
Para abertas, use string simples.
Não inclua nada fora do JSON.`;
}

function buildUserPrompt() {
  const linhas = PERGUNTAS.map(p => {
    if (p.tipo === 'aberta') {
      return `${p.id}. ${p.texto}\n(Resposta livre)`;
    }
    const opcoes = p.opcoes.map((o, i) => `  ${i + 1}. ${o}`).join('\n');
    const tipoLabel = p.tipo === 'multipla_escolha' ? '(pode escolher mais de uma)' : '(escolha uma)';
    return `${p.id}. ${p.texto} ${tipoLabel}\n${opcoes}`;
  });
  return `Responda o questionário abaixo conforme seu perfil:\n\n${linhas.join('\n\n')}`;
}

// ─── Chamar Claude ────────────────────────────────────────────────────────────

async function responderComoPersona(persona) {
  const resposta = await cliente.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: buildSystemPrompt(persona),
    messages: [{ role: 'user', content: buildUserPrompt() }],
  });

  const texto = resposta.content[0].text.trim();

  // Extrai JSON da resposta
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
  let respostasExistentes = {};
  if (RETOMAR && fs.existsSync(RESPOSTAS_PATH)) {
    respostasExistentes = JSON.parse(fs.readFileSync(RESPOSTAS_PATH, 'utf-8'));
    console.log(`↩️  Retomando: ${Object.keys(respostasExistentes).length} personas já processadas`);
  }

  const resultados = { ...respostasExistentes };
  let processadas = 0;
  let erros = 0;

  for (const persona of alvo) {
    const chave = `persona_${persona.id}`;

    if (RETOMAR && resultados[chave]) {
      console.log(`⏭️  Pulando persona ${persona.id} (já processada)`);
      continue;
    }

    try {
      process.stdout.write(`🤖 Persona ${persona.id}/${alvo.length} [${persona.faixaEtaria.descricao}, ${persona.perfilComportamental.descricao}]... `);
      const respostas = await responderComoPersona(persona);

      resultados[chave] = {
        perfil: persona,
        respostas,
      };

      // Salva incrementalmente a cada persona
      fs.writeFileSync(RESPOSTAS_PATH, JSON.stringify(resultados, null, 2), 'utf-8');
      processadas++;
      console.log('✅');

      // Pausa curta para não sobrecarregar a API
      await new Promise(r => setTimeout(r, 300));

    } catch (err) {
      erros++;
      console.log(`❌ Erro: ${err.message}`);
    }
  }

  console.log(`\n📦 Concluído: ${processadas} processadas, ${erros} erros`);
  console.log(`💾 Salvo em: output/respostas.json`);
}

main();

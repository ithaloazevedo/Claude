/**
 * Gerador de 350 personas sintéticas
 * Spec: docs/superpowers/specs/2026-04-06-questionario-personas-encontrabilidade-design.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Eixos de variação ────────────────────────────────────────────────────────

const FAIXAS_ETARIAS = [
  { valor: '8-9', descricao: '8 ou 9 anos', quantidade: 70 },
  { valor: '10-11', descricao: '10 ou 11 anos', quantidade: 90 },
  { valor: '12-13', descricao: '12 ou 13 anos', quantidade: 110 },
  { valor: '14-15', descricao: '14 ou 15 anos', quantidade: 80 },
];

const EXPERIENCIAS_TECH = [
  { valor: 'nunca_computador', descricao: 'Nunca usou computador', peso: 40 },
  { valor: 'so_celular', descricao: 'Usa só celular', peso: 80 },
  { valor: 'computador_as_vezes', descricao: 'Usa computador às vezes', peso: 90 },
  { valor: 'computador_regularmente', descricao: 'Usa computador regularmente', peso: 90 },
  { valor: 'heavy_user', descricao: 'Heavy user digital', peso: 50 },
];

const FREQUENCIAS_PORTAL = [
  { valor: 'nunca_acessou', descricao: 'Nunca acessou', peso: 30 },
  { valor: 'raramente', descricao: 'Acessa raramente', peso: 80 },
  { valor: 'semanalmente', descricao: 'Acessa semanalmente', peso: 140 },
  { valor: 'todo_dia', descricao: 'Acessa todo dia', peso: 100 },
];

const CONTEXTOS_ACESSO = [
  { valor: 'so_escola', descricao: 'Só na escola', peso: 30 },
  { valor: 'so_casa', descricao: 'Só em casa', peso: 50 },
  { valor: 'escola_e_casa', descricao: 'Escola e casa', peso: 180 },
  { valor: 'escola_publica_rural', descricao: 'Escola pública, zona rural', peso: 90 },
];

const PERFIS_COMPORTAMENTAIS = [
  { valor: 'curioso', descricao: 'Curioso/explorador', peso: 70 },
  { valor: 'impaciente', descricao: 'Impaciente', peso: 60 },
  { valor: 'timido', descricao: 'Tímido/dependente', peso: 60 },
  { valor: 'persistente', descricao: 'Persistente/metódico', peso: 70 },
  { valor: 'indiferente', descricao: 'Indiferente', peso: 90 },
];

const MOTIVACOES = [
  { valor: 'obrigacao', descricao: 'Obrigação (professor mandou)', peso: 140 },
  { valor: 'curiosidade', descricao: 'Curiosidade própria', peso: 100 },
  { valor: 'gosta_conteudo', descricao: 'Gosta do conteúdo', peso: 110 },
];

// ─── Combinações incoerentes a evitar ────────────────────────────────────────

function ehIncoerente(persona) {
  const { faixaEtaria, experienciaTech, frequenciaPortal, contextoAcesso, perfilComportamental, motivacao } = persona;

  // Heavy user não pode nunca ter tido acesso em casa
  if (experienciaTech.valor === 'heavy_user' && contextoAcesso.valor === 'so_escola') return true;

  // 8-9 anos + heavy user é improvável
  if (faixaEtaria.valor === '8-9' && experienciaTech.valor === 'heavy_user') return true;

  // Nunca acessou + acessa todo dia: contradição
  if (frequenciaPortal.valor === 'nunca_acessou' && frequenciaPortal.valor === 'todo_dia') return true;

  // Indiferente + gosta do conteúdo: contradição
  if (perfilComportamental.valor === 'indiferente' && motivacao.valor === 'gosta_conteudo') return true;

  // Curioso + nunca acessou: improvável (curiosidade levaria a acessar)
  if (perfilComportamental.valor === 'curioso' && frequenciaPortal.valor === 'nunca_acessou') return true;

  // Zona rural + acessa todo dia em casa: improvável
  if (contextoAcesso.valor === 'escola_publica_rural' && frequenciaPortal.valor === 'todo_dia') return true;

  return false;
}

// ─── Seleção por peso ─────────────────────────────────────────────────────────

function selecionarPorPeso(opcoes) {
  const total = opcoes.reduce((acc, o) => acc + (o.peso ?? o.quantidade), 0);
  let rand = Math.random() * total;
  for (const opcao of opcoes) {
    rand -= (opcao.peso ?? opcao.quantidade);
    if (rand <= 0) return opcao;
  }
  return opcoes[opcoes.length - 1];
}

// ─── Gerar uma persona ────────────────────────────────────────────────────────

function gerarPersona(id) {
  let tentativas = 0;
  while (tentativas < 100) {
    const persona = {
      id,
      faixaEtaria: selecionarPorPeso(FAIXAS_ETARIAS),
      experienciaTech: selecionarPorPeso(EXPERIENCIAS_TECH),
      frequenciaPortal: selecionarPorPeso(FREQUENCIAS_PORTAL),
      contextoAcesso: selecionarPorPeso(CONTEXTOS_ACESSO),
      perfilComportamental: selecionarPorPeso(PERFIS_COMPORTAMENTAIS),
      motivacao: selecionarPorPeso(MOTIVACOES),
    };
    if (!ehIncoerente(persona)) return persona;
    tentativas++;
  }
  throw new Error(`Não foi possível gerar persona coerente para id ${id} após 100 tentativas`);
}

// ─── Gerar 350 personas respeitando distribuição de faixa etária ──────────────

function gerarTodasPersonas(total = 350) {
  const personas = [];

  // Garante distribuição de faixas etárias conforme spec
  const distribuicaoFaixas = FAIXAS_ETARIAS.flatMap(f =>
    Array(f.quantidade).fill(f)
  );

  // Preenche exatamente com as quantidades do spec
  for (let i = 0; i < distribuicaoFaixas.length && i < total; i++) {
    let tentativas = 0;
    while (tentativas < 100) {
      const persona = {
        id: i + 1,
        faixaEtaria: distribuicaoFaixas[i],
        experienciaTech: selecionarPorPeso(EXPERIENCIAS_TECH),
        frequenciaPortal: selecionarPorPeso(FREQUENCIAS_PORTAL),
        contextoAcesso: selecionarPorPeso(CONTEXTOS_ACESSO),
        perfilComportamental: selecionarPorPeso(PERFIS_COMPORTAMENTAIS),
        motivacao: selecionarPorPeso(MOTIVACOES),
      };
      if (!ehIncoerente(persona)) {
        personas.push(persona);
        break;
      }
      tentativas++;
    }
    if (personas.length < i + 1) {
      throw new Error(`Não foi possível gerar persona ${i + 1} após 100 tentativas`);
    }
  }

  return personas;
}

// ─── Estatísticas ─────────────────────────────────────────────────────────────

function imprimirEstatisticas(personas) {
  const contar = (eixo) => {
    const contagem = {};
    for (const p of personas) {
      const val = p[eixo].descricao;
      contagem[val] = (contagem[val] ?? 0) + 1;
    }
    return contagem;
  };

  console.log('\n📊 Distribuição das', personas.length, 'personas:\n');
  for (const eixo of ['faixaEtaria', 'experienciaTech', 'frequenciaPortal', 'perfilComportamental', 'motivacao']) {
    console.log(`  ${eixo}:`);
    const contagem = contar(eixo);
    for (const [k, v] of Object.entries(contagem)) {
      console.log(`    ${k}: ${v}`);
    }
    console.log();
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const personas = gerarTodasPersonas(350);
imprimirEstatisticas(personas);

const outputPath = path.join(__dirname, 'output', 'personas.json');
fs.writeFileSync(outputPath, JSON.stringify(personas, null, 2), 'utf-8');
console.log(`✅ ${personas.length} personas geradas em: output/personas.json`);

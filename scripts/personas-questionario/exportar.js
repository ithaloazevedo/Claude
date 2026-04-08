/**
 * Exportador: transforma respostas.json em:
 *   - output/respostas.csv    → uma linha por persona, uma coluna por pergunta
 *   - output/relatorio.md     → síntese narrativa dos padrões por perfil
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PERGUNTAS } from './questionario.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESPOSTAS_PATH = path.join(__dirname, 'output', 'respostas.json');
const CSV_PATH = path.join(__dirname, 'output', 'respostas.csv');
const RELATORIO_PATH = path.join(__dirname, 'output', 'relatorio.md');

// ─── CSV ──────────────────────────────────────────────────────────────────────

function escaparCSV(valor) {
  if (valor === null || valor === undefined) return '';
  const str = Array.isArray(valor) ? valor.join(' | ') : String(valor);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function gerarCSV(dados) {
  const ids = Object.keys(dados);
  if (ids.length === 0) return '';

  // Cabeçalho
  const cabecalhoPerfil = ['id', 'faixa_etaria', 'experiencia_tech', 'frequencia_portal', 'contexto_acesso', 'perfil_comportamental', 'motivacao'];
  const cabecalhoPerguntas = PERGUNTAS.map(p => p.id);
  const cabecalho = [...cabecalhoPerfil, ...cabecalhoPerguntas].join(',');

  // Linhas
  const linhas = ids.map(chave => {
    const { perfil, respostas } = dados[chave];
    const colsPerfil = [
      perfil.id,
      perfil.faixaEtaria.descricao,
      perfil.experienciaTech.descricao,
      perfil.frequenciaPortal.descricao,
      perfil.contextoAcesso.descricao,
      perfil.perfilComportamental.descricao,
      perfil.motivacao.descricao,
    ].map(escaparCSV);

    const colsRespostas = PERGUNTAS.map(p => escaparCSV(respostas?.[p.id] ?? ''));
    return [...colsPerfil, ...colsRespostas].join(',');
  });

  return [cabecalho, ...linhas].join('\n');
}

// ─── Análise para relatório ───────────────────────────────────────────────────

function contarOpcoes(lista) {
  const contagem = {};
  for (const item of lista) {
    const opcoes = Array.isArray(item) ? item : [item];
    for (const op of opcoes) {
      if (op) contagem[op] = (contagem[op] ?? 0) + 1;
    }
  }
  return Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function topOpcoes(dados, perguntaId, filtro = () => true) {
  const valores = Object.values(dados)
    .filter(({ perfil }) => filtro(perfil))
    .map(({ respostas }) => respostas?.[perguntaId])
    .filter(Boolean);
  return contarOpcoes(valores);
}

function formatarTop(top, total) {
  return top.map(([op, n]) => `  - **${op}** (${n}/${total} — ${Math.round(n / total * 100)}%)`).join('\n');
}

function amostraAbertas(dados, perguntaId, filtro = () => true, n = 5) {
  return Object.values(dados)
    .filter(({ perfil }) => filtro(perfil))
    .map(({ respostas, perfil }) => ({ texto: respostas?.[perguntaId], perfil }))
    .filter(({ texto }) => texto && texto.length > 10)
    .slice(0, n)
    .map(({ texto, perfil }) => `  > "${texto}" *(${perfil.faixaEtaria.descricao}, ${perfil.perfilComportamental.descricao})*`)
    .join('\n');
}

// ─── Relatório narrativo ──────────────────────────────────────────────────────

function gerarRelatorio(dados) {
  const total = Object.keys(dados).length;
  const todos = Object.values(dados);

  const porPerfil = (campo, valor) => ({ perfil }) => perfil[campo]?.valor === valor;

  // Satisfação geral (P31)
  const topSatisfacao = topOpcoes(dados, 'P31');

  // Sentimento ao abrir (P7)
  const topSentimento = topOpcoes(dados, 'P7');

  // Como busca (P12)
  const topBusca = topOpcoes(dados, 'P12');

  // Dead clicks (P18)
  const topDeadClicks = topOpcoes(dados, 'P18');

  // Gatilhos de desistência (P22)
  const topGatilhos = topOpcoes(dados, 'P22');

  // Categorias preferidas (P14)
  const topCategorias = topOpcoes(dados, 'P14');

  // Melhorias desejadas (P28)
  const topMelhorias = topOpcoes(dados, 'P28');

  // Menu preferido (P16)
  const topMenu = topOpcoes(dados, 'P16');

  // Por faixa etária — sentimento
  const impacientesTotal = todos.filter(({ perfil }) => perfil.perfilComportamental?.valor === 'impaciente').length;
  const topSentimentoImpaciente = topOpcoes(dados, 'P7', porPerfil('perfilComportamental', 'impaciente'));

  const heavyTotal = todos.filter(({ perfil }) => perfil.experienciaTech?.valor === 'heavy_user').length;
  const topBuscaHeavy = topOpcoes(dados, 'P12', porPerfil('experienciaTech', 'heavy_user'));

  const novosTotal = todos.filter(({ perfil }) => perfil.faixaEtaria?.valor === '8-9').length;
  const topDesistenciaNovos = topOpcoes(dados, 'P20', porPerfil('faixaEtaria', '8-9'));

  return `# Relatório de Pesquisa — Encontrabilidade no Portal Arcoplus
**Gerado em:** ${new Date().toLocaleDateString('pt-BR')}
**Total de personas:** ${total}

---

## 1. Satisfação Geral (P31)

${formatarTop(topSatisfacao, total)}

### Sentimento ao abrir o portal (P7)

${formatarTop(topSentimento, total)}

---

## 2. Navegação e Busca

### Como os alunos buscam recursos (P12)

${formatarTop(topBusca, total)}

### Preferência de menu: topo vs lateral (P16)

${formatarTop(topMenu, total)}

### Categorias mais desejadas (P14)

${formatarTop(topCategorias, total)}

---

## 3. Fricção e Dead Clicks

### Frequência de dead clicks (P18)

${formatarTop(topDeadClicks, total)}

### Principais gatilhos de desistência (P22)

${formatarTop(topGatilhos, total)}

---

## 4. Melhorias Mais Pedidas (P28)

${formatarTop(topMelhorias, total)}

---

## 5. Padrões por Perfil

### Alunos impacientes (n=${impacientesTotal}) — sentimento ao abrir (P7)

${formatarTop(topSentimentoImpaciente, impacientesTotal)}

### Heavy users (n=${heavyTotal}) — como buscam recursos (P12)

${formatarTop(topBuscaHeavy, heavyTotal)}

### Alunos 8-9 anos (n=${novosTotal}) — tempo antes de desistir (P20)

${formatarTop(topDesistenciaNovos, novosTotal)}

---

## 6. Vozes dos Alunos

### O que nunca conseguiram encontrar (P9)

${amostraAbertas(dados, 'P9')}

### Como tentariam achar uma atividade de programação (P15)

${amostraAbertas(dados, 'P15')}

### Situações de frustração relatadas (P24)

${amostraAbertas(dados, 'P24')}

### O que gostariam que o portal tivesse (P29)

${amostraAbertas(dados, 'P29')}

### Como recomendariam o portal (P30)

${amostraAbertas(dados, 'P30')}

---

## 7. Palavra que Define o Portal (P34 — amostra)

${amostraAbertas(dados, 'P34', () => true, 20)}
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(RESPOSTAS_PATH)) {
  console.error('❌ output/respostas.json não encontrado. Execute primeiro: node responder.js');
  process.exit(1);
}

const dados = JSON.parse(fs.readFileSync(RESPOSTAS_PATH, 'utf-8'));
const total = Object.keys(dados).length;
console.log(`📂 ${total} personas carregadas`);

// Gera CSV
const csv = gerarCSV(dados);
fs.writeFileSync(CSV_PATH, csv, 'utf-8');
console.log(`✅ CSV gerado: output/respostas.csv`);

// Gera relatório
const relatorio = gerarRelatorio(dados);
fs.writeFileSync(RELATORIO_PATH, relatorio, 'utf-8');
console.log(`✅ Relatório gerado: output/relatorio.md`);

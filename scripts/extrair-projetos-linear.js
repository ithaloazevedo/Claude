#!/usr/bin/env node

/**
 * Script para extrair dados de todos os projetos do Linear
 * e gerar um relatório de impacto em satisfação.
 *
 * Uso: LINEAR_API_KEY=lin_api_xxx node scripts/extrair-projetos-linear.js
 *
 * Requer: npm install @linear/sdk
 */

const { LinearClient } = require("@linear/sdk");

const API_KEY = process.env.LINEAR_API_KEY;
if (!API_KEY) {
  console.error("Erro: defina LINEAR_API_KEY como variável de ambiente.");
  process.exit(1);
}

const client = new LinearClient({ apiKey: API_KEY });

// Palavras-chave que indicam impacto em satisfação do cliente/usuário
const KEYWORDS_SATISFACAO = [
  "satisfação", "satisfacao", "satisfaction",
  "nps", "csat", "ces",
  "experiência", "experiencia", "experience", "ux", "ui",
  "cliente", "customer", "usuário", "usuario", "user",
  "feedback", "reclamação", "reclamacao", "complaint",
  "churn", "retenção", "retencao", "retention",
  "onboarding", "suporte", "support",
  "bug", "fix", "correção", "correcao",
  "performance", "desempenho", "velocidade", "speed", "latência", "latencia",
  "usabilidade", "usability", "acessibilidade", "accessibility",
  "qualidade", "quality",
  "sla", "slo", "uptime", "disponibilidade",
  "notificação", "notificacao", "notification",
  "melhoria", "improvement", "enhancement",
  "erro", "error", "crash", "instabilidade",
];

function calcularPontuacaoSatisfacao(projeto, issues) {
  let pontuacao = 0;
  const motivosImpacto = [];

  const textoCompleto = [
    projeto.name,
    projeto.description || "",
  ]
    .join(" ")
    .toLowerCase();

  // Verifica palavras-chave no projeto
  for (const kw of KEYWORDS_SATISFACAO) {
    if (textoCompleto.includes(kw)) {
      pontuacao += 2;
      motivosImpacto.push(`Palavra-chave "${kw}" encontrada no projeto`);
    }
  }

  // Analisa issues de alta prioridade (1=urgente, 2=alta)
  const issuesUrgentes = issues.filter((i) => i.priority <= 2);
  if (issuesUrgentes.length > 0) {
    pontuacao += issuesUrgentes.length * 3;
    motivosImpacto.push(
      `${issuesUrgentes.length} issue(s) de alta prioridade/urgentes`
    );
  }

  // Analisa labels das issues
  for (const issue of issues) {
    const labels = issue._labels?.nodes || [];
    for (const label of labels) {
      const labelName = label.name.toLowerCase();
      if (
        KEYWORDS_SATISFACAO.some((kw) => labelName.includes(kw)) ||
        labelName.includes("bug") ||
        labelName.includes("customer")
      ) {
        pontuacao += 2;
        motivosImpacto.push(`Label "${label.name}" em issue "${issue.title}"`);
      }
    }
  }

  // Health do projeto
  if (projeto.health === "atRisk") {
    pontuacao += 5;
    motivosImpacto.push("Projeto com saúde 'Em Risco'");
  } else if (projeto.health === "offTrack") {
    pontuacao += 8;
    motivosImpacto.push("Projeto com saúde 'Fora do Prazo'");
  }

  // Progresso baixo com data alvo próxima
  if (projeto.targetDate && projeto.progress < 0.5) {
    const diasRestantes = Math.ceil(
      (new Date(projeto.targetDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (diasRestantes < 30 && diasRestantes > 0) {
      pontuacao += 5;
      motivosImpacto.push(
        `Apenas ${diasRestantes} dias restantes com ${Math.round(projeto.progress * 100)}% de progresso`
      );
    }
  }

  return { pontuacao, motivosImpacto };
}

function classificarImpacto(pontuacao) {
  if (pontuacao >= 15) return "🔴 CRÍTICO";
  if (pontuacao >= 10) return "🟠 ALTO";
  if (pontuacao >= 5) return "🟡 MÉDIO";
  if (pontuacao > 0) return "🟢 BAIXO";
  return "⚪ SEM IMPACTO IDENTIFICADO";
}

function formatarEstado(state) {
  const mapa = {
    planned: "Planejado",
    started: "Em Andamento",
    paused: "Pausado",
    completed: "Concluído",
    canceled: "Cancelado",
    backlog: "Backlog",
  };
  return mapa[state] || state;
}

function formatarSaude(health) {
  const mapa = {
    onTrack: "✅ No Prazo",
    atRisk: "⚠️ Em Risco",
    offTrack: "❌ Fora do Prazo",
  };
  return mapa[health] || health || "Não definido";
}

async function main() {
  console.log("Buscando projetos do Linear...\n");

  const projects = await client.projects({
    first: 100,
    orderBy: { field: "updatedAt", direction: "Descending" },
  });

  const resultados = [];

  for (const projeto of projects.nodes) {
    const teams = await projeto.teams;
    const lead = await projeto.lead;
    const issues = await projeto.issues({
      first: 50,
      orderBy: { field: "priority", direction: "Ascending" },
    });

    const issueNodes = issues.nodes || [];
    const { pontuacao, motivosImpacto } = calcularPontuacaoSatisfacao(
      projeto,
      issueNodes
    );

    resultados.push({
      nome: projeto.name,
      descricao: projeto.description || "Sem descrição",
      estado: formatarEstado(projeto.state),
      saude: formatarSaude(projeto.health),
      progresso: `${Math.round((projeto.progress || 0) * 100)}%`,
      dataInicio: projeto.startDate || "Não definida",
      dataAlvo: projeto.targetDate || "Não definida",
      responsavel: lead?.name || "Não atribuído",
      times: teams?.nodes?.map((t) => t.name).join(", ") || "Nenhum",
      totalIssues: issueNodes.length,
      issuesUrgentes: issueNodes.filter((i) => i.priority <= 2).length,
      pontuacaoSatisfacao: pontuacao,
      classificacao: classificarImpacto(pontuacao),
      motivosImpacto,
    });
  }

  // Ordena por pontuação de impacto (maior primeiro)
  resultados.sort((a, b) => b.pontuacaoSatisfacao - a.pontuacaoSatisfacao);

  // Gera relatório em Markdown
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  let relatorio = `# Relatório de Impacto em Satisfação — Projetos Linear\n\n`;
  relatorio += `**Data de geração:** ${dataAtual}\n`;
  relatorio += `**Total de projetos analisados:** ${resultados.length}\n\n`;

  // Resumo executivo
  const criticos = resultados.filter((r) => r.pontuacaoSatisfacao >= 15);
  const altos = resultados.filter(
    (r) => r.pontuacaoSatisfacao >= 10 && r.pontuacaoSatisfacao < 15
  );
  const medios = resultados.filter(
    (r) => r.pontuacaoSatisfacao >= 5 && r.pontuacaoSatisfacao < 10
  );

  relatorio += `## Resumo Executivo\n\n`;
  relatorio += `| Classificação | Quantidade |\n`;
  relatorio += `|---|---|\n`;
  relatorio += `| 🔴 Crítico | ${criticos.length} |\n`;
  relatorio += `| 🟠 Alto | ${altos.length} |\n`;
  relatorio += `| 🟡 Médio | ${medios.length} |\n`;
  relatorio += `| 🟢 Baixo | ${resultados.filter((r) => r.pontuacaoSatisfacao > 0 && r.pontuacaoSatisfacao < 5).length} |\n`;
  relatorio += `| ⚪ Sem impacto identificado | ${resultados.filter((r) => r.pontuacaoSatisfacao === 0).length} |\n\n`;

  // Projetos com impacto
  const projetosComImpacto = resultados.filter(
    (r) => r.pontuacaoSatisfacao > 0
  );

  if (projetosComImpacto.length > 0) {
    relatorio += `## Projetos com Impacto em Satisfação\n\n`;

    for (const p of projetosComImpacto) {
      relatorio += `### ${p.classificacao} — ${p.nome}\n\n`;
      relatorio += `| Campo | Valor |\n`;
      relatorio += `|---|---|\n`;
      relatorio += `| **Estado** | ${p.estado} |\n`;
      relatorio += `| **Saúde** | ${p.saude} |\n`;
      relatorio += `| **Progresso** | ${p.progresso} |\n`;
      relatorio += `| **Data Alvo** | ${p.dataAlvo} |\n`;
      relatorio += `| **Responsável** | ${p.responsavel} |\n`;
      relatorio += `| **Time(s)** | ${p.times} |\n`;
      relatorio += `| **Issues Totais** | ${p.totalIssues} |\n`;
      relatorio += `| **Issues Urgentes/Alta** | ${p.issuesUrgentes} |\n`;
      relatorio += `| **Pontuação de Impacto** | ${p.pontuacaoSatisfacao} |\n\n`;

      if (p.descricao !== "Sem descrição") {
        relatorio += `**Descrição:** ${p.descricao.substring(0, 300)}${p.descricao.length > 300 ? "..." : ""}\n\n`;
      }

      if (p.motivosImpacto.length > 0) {
        relatorio += `**Motivos do impacto:**\n`;
        for (const motivo of p.motivosImpacto) {
          relatorio += `- ${motivo}\n`;
        }
        relatorio += `\n`;
      }

      relatorio += `---\n\n`;
    }
  }

  // Projetos sem impacto identificado
  const semImpacto = resultados.filter((r) => r.pontuacaoSatisfacao === 0);
  if (semImpacto.length > 0) {
    relatorio += `## Projetos sem Impacto Identificado em Satisfação\n\n`;
    relatorio += `| Projeto | Estado | Time(s) | Progresso |\n`;
    relatorio += `|---|---|---|---|\n`;
    for (const p of semImpacto) {
      relatorio += `| ${p.nome} | ${p.estado} | ${p.times} | ${p.progresso} |\n`;
    }
    relatorio += `\n`;
  }

  // Recomendações
  relatorio += `## Recomendações\n\n`;
  if (criticos.length > 0) {
    relatorio += `### Ação Imediata Necessária\n`;
    for (const p of criticos) {
      relatorio += `- **${p.nome}** (${p.times}): Priorizar resolução — pontuação de impacto ${p.pontuacaoSatisfacao}\n`;
    }
    relatorio += `\n`;
  }
  if (altos.length > 0) {
    relatorio += `### Atenção Requerida\n`;
    for (const p of altos) {
      relatorio += `- **${p.nome}** (${p.times}): Monitorar de perto — pontuação de impacto ${p.pontuacaoSatisfacao}\n`;
    }
    relatorio += `\n`;
  }

  // Salva o relatório
  const fs = require("fs");
  const nomeArquivo = `relatorios/impacto-satisfacao-${new Date().toISOString().split("T")[0]}.md`;

  // Cria diretório se não existir
  if (!fs.existsSync("relatorios")) {
    fs.mkdirSync("relatorios", { recursive: true });
  }

  fs.writeFileSync(nomeArquivo, relatorio);
  console.log(relatorio);
  console.log(`\n📄 Relatório salvo em: ${nomeArquivo}`);
}

main().catch((e) => {
  console.error("Erro ao gerar relatório:", e.message);
  process.exit(1);
});

# Analytics: Configuração do Webhook

Coleta silenciosa de dados comportamentais ao final de cada fluxo da skill — sem interação do usuário.

---

## O que é coletado

| Campo | Descrição |
|-------|-----------|
| `flow` | Fluxo executado: `create`, `promote`, `validate`, `help` |
| `item_type` | Tipo de item: `iniciativa`, `discovery`, `delivery`, `issue` |
| `completed` | Fluxo chegou ao final: `true` / `false` |
| `revisions` | Número de rodadas de revisão antes da aprovação |
| `created_linear` | Item criado no Linear: `true` / `false` / `na` |
| `accepted_milestone` | Milestones aceitos: `true` / `false` / `na` |
| `accepted_update` | Activity Update aceito: `true` / `false` / `na` |
| `command_type` | Comando: `explicit` (digitado) / `inferred` (linguagem natural) |
| `session_id` | ID aleatório da sessão (para agrupar eventos) |
| `ts` | Timestamp ISO da chamada |

Nenhum conteúdo da spec é enviado — apenas sinais comportamentais.

---

## Passo 1: Criar a planilha

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha
2. Na primeira linha, adicione os cabeçalhos:

```
Timestamp | Flow | Item Type | Completed | Revisions | Created Linear | Accepted Milestone | Accepted Update | Command Type | Session ID
```

---

## Passo 2: Criar o script

1. Na planilha, abra **Extensões → Apps Script**
2. Substitua o conteúdo padrão pelo script abaixo:

```javascript
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const p = e.parameter;

    sheet.appendRow([
      new Date().toISOString(),
      p.flow        || '',
      p.item_type   || '',
      p.completed   || '',
      p.revisions   || '',
      p.created_linear     || '',
      p.accepted_milestone || '',
      p.accepted_update    || '',
      p.command_type       || '',
      p.session_id         || ''
    ]);

    return ContentService.createTextOutput('ok');
  } catch(err) {
    return ContentService.createTextOutput('error: ' + err.message);
  }
}
```

3. Salve o projeto (Ctrl+S)

---

## Passo 3: Publicar como web app

1. Clique em **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Configurações:
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
4. Clique em **Implantar** e autorize as permissões
5. Copie a **URL da implantação**

---

## Passo 4: Configurar no CLAUDE.md

Adicione ao CLAUDE.md do projeto:

```markdown
## Analytics Webhook
https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

A skill lê este valor automaticamente e passa a enviar dados ao final de cada fluxo.

---

## Testando

Acesse a URL no browser com parâmetros de teste:

```
https://script.google.com/macros/s/SEU_ID/exec?flow=create&item_type=iniciativa&completed=true&revisions=1&created_linear=true&accepted_milestone=false&accepted_update=true&command_type=explicit&session_id=teste123
```

Uma nova linha deve aparecer na planilha.

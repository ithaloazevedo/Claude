#!/bin/bash
# Roda o responder em loop com --retomar até que todas as 350 personas estejam processadas.
# Ao final, gera o CSV e o relatório.

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

MAX_TENTATIVAS=10
tentativa=1

while [ $tentativa -le $MAX_TENTATIVAS ]; do
  PROCESSADAS=$(node -e "
    const fs = require('fs');
    const path = '$DIR/output/respostas.json';
    if (!fs.existsSync(path)) { console.log(0); process.exit(); }
    const d = JSON.parse(fs.readFileSync(path, 'utf-8'));
    console.log(Object.keys(d).length);
  " 2>/dev/null)

  echo "▶ Tentativa $tentativa — $PROCESSADAS/350 processadas"

  if [ "$PROCESSADAS" -ge 350 ]; then
    echo "✅ Todas as 350 personas processadas!"
    break
  fi

  if [ "$PROCESSADAS" -eq 0 ]; then
    node responder.js
  else
    node responder.js --retomar
  fi

  tentativa=$((tentativa + 1))
  sleep 5
done

PROCESSADAS=$(node -e "
  const fs = require('fs');
  const path = '$DIR/output/respostas.json';
  if (!fs.existsSync(path)) { console.log(0); process.exit(); }
  const d = JSON.parse(fs.readFileSync(path, 'utf-8'));
  console.log(Object.keys(d).length);
" 2>/dev/null)

echo ""
echo "📊 Total final: $PROCESSADAS/350 personas respondidas"
echo "📦 Gerando CSV e relatório..."
node exportar.js
echo ""
echo "🎉 Pipeline completo!"

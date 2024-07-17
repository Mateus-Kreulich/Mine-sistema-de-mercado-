@echo off
:: Adiciona o caminho do Node.js ao PATH (substitua "C:\Program Files\nodejs" pelo caminho correto se necessário)
SET PATH=%PATH%;C:\Program Files\nodejs
:: Executa o ts-node localmente
npx ts-node index.ts
pause

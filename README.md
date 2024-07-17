# Sistema de Supermercado

Este é um sistema de gerenciamento de supermercado desenvolvido em TypeScript, que permite adicionar, atualizar, excluir, listar produtos e calcular o total de uma compra. Os dados são armazenados em um arquivo CSV, e o sistema é operado através de um terminal com um script `.bat`.

## Funcionalidades

1. **Adicionar Produto**: Adiciona um novo produto ao inventário.
2. **Atualizar Produto**: Atualiza o preço e a quantidade de um produto existente pelo seu número.
3. **Excluir Produto**: Remove um produto do inventário pelo seu número.
4. **Listar Produtos**: Lista todos os produtos cadastrados com suas informações coloridas:
   - **Nome do Produto**: Azul
   - **Preço**: Verde
   - **Quantidade**: Amarelo
5. **Calcular Total de Compra**: Calcula o total da compra com base nos números dos produtos informados.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)

## Instalação

1. Clone este repositório:
    ```sh
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Instale o TypeScript e ts-node globalmente:
    ```sh
    npm install -g typescript ts-node
    ```

## Utilização

1. Compile o código TypeScript:
    ```sh
    tsc index.ts
    ```

2. Execute o script `gerenciar-inventario.bat` para iniciar o sistema:
    ```sh
    .\gerenciar-inventario.bat
    ```

## Estrutura do Projeto

- **index.ts**: Script principal do sistema de supermercado.
- **supermercado.csv**: Arquivo CSV onde os produtos são armazenados.
- **gerenciar-inventario.bat**: Script BAT para executar o sistema pelo terminal.

## Como Funciona

Ao executar o script `gerenciar-inventario.bat`, um menu será exibido no terminal com as seguintes opções:

1. **Adicionar produto**: Solicita o nome, preço e quantidade do produto, e então adiciona ao inventário.
2. **Atualizar produto**: Solicita o número do produto, novo preço e nova quantidade, e então atualiza as informações.
3. **Excluir produto**: Solicita o número do produto e o remove do inventário.
4. **Listar produtos**: Exibe todos os produtos no inventário com suas informações coloridas.
5. **Calcular total de compra**: Solicita os números dos produtos e calcula o total da compra.
6. **Sair**: Encerra o programa.

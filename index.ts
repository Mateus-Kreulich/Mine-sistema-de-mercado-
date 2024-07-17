import * as fs from 'fs';
import * as readline from 'readline';

const csvFilePath = 'supermercado.csv';

// Códigos ANSI para cores
const azul = '\x1b[34m';
const verde = '\x1b[32m';
const amarelo = '\x1b[33m';
const reset = '\x1b[0m';

interface Produto {
    numero: number;
    produto: string;
    preco: number;
    quantidade: number;
}

function lerCSV(): Produto[] {
    if (!fs.existsSync(csvFilePath)) {
        return [];
    }
    const data = fs.readFileSync(csvFilePath, 'utf8');
    const lines = data.trim().split('\n');
    lines.shift(); // Remove header
    return lines.map(line => {
        const [numero, produto, preco, quantidade] = line.split(',');
        return {
            numero: parseInt(numero),
            produto,
            preco: parseFloat(preco),
            quantidade: parseInt(quantidade)
        };
    });
}

function salvarCSV(produtos: Produto[]): void {
    const data = ['numero,produto,preco,quantidade'];
    produtos.forEach(({ numero, produto, preco, quantidade }) => {
        data.push(`${numero},${produto},${preco},${quantidade}`);
    });
    fs.writeFileSync(csvFilePath, data.join('\n'), 'utf8');
}

function adicionarProduto(produto: Produto): void {
    const produtos = lerCSV();
    produto.numero = produtos.length > 0 ? produtos[produtos.length - 1].numero + 1 : 1;
    produtos.push(produto);
    salvarCSV(produtos);
}

function atualizarProduto(numero: number, preco: number, quantidade: number): void {
    const produtos = lerCSV();
    const index = produtos.findIndex(p => p.numero === numero);
    if (index !== -1) {
        produtos[index].preco = preco;
        produtos[index].quantidade = quantidade;
        salvarCSV(produtos);
    } else {
        console.log('Produto não encontrado.');
    }
}

function excluirProduto(numero: number): void {
    let produtos = lerCSV();
    produtos = produtos.filter(p => p.numero !== numero);
    salvarCSV(produtos);
}

function listarProdutos(): void {
    const produtos = lerCSV();
    console.log('Lista de Produtos:');
    produtos.forEach(produto => {
        console.log(`Número: ${produto.numero}, Produto: ${azul}${produto.produto}${reset}, Preço: ${verde}${produto.preco.toFixed(2)}${reset}, Quantidade: ${amarelo}${produto.quantidade}${reset}`);
    });
}

function calcularTotalCompra(numeros: number[]): void {
    const produtos = lerCSV();
    let total = 0;
    numeros.forEach(numero => {
        const produto = produtos.find(p => p.numero === numero);
        if (produto) {
            total += produto.preco;
        } else {
            console.log(`Produto com número ${numero} não encontrado.`);
        }
    });
    console.log(`Total da compra: R$ ${total.toFixed(2)}`);
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const mostrarMenu = () => {
        console.log('\nEscolha uma opção:');
        console.log('1. Adicionar produto');
        console.log('2. Atualizar produto');
        console.log('3. Excluir produto');
        console.log('4. Listar produtos');
        console.log('5. Calcular total de compra');
        console.log('6. Sair');
    }

    const handleUserInput = (opcao: string) => {
        switch (opcao) {
            case '1':
                rl.question('Nome do produto: ', (produto) => {
                    rl.question('Preço do produto: ', (preco) => {
                        rl.question('Quantidade do produto: ', (quantidade) => {
                            adicionarProduto({
                                numero: 0, // Será ajustado automaticamente
                                produto,
                                preco: parseFloat(preco),
                                quantidade: parseInt(quantidade)
                            });
                            console.log('Produto adicionado com sucesso.');
                            mostrarMenu();
                            rl.question('Digite o número da opção desejada: ', handleUserInput);
                        });
                    });
                });
                break;
            case '2':
                rl.question('Número do produto: ', (numero) => {
                    rl.question('Novo preço do produto: ', (preco) => {
                        rl.question('Nova quantidade do produto: ', (quantidade) => {
                            atualizarProduto(parseInt(numero), parseFloat(preco), parseInt(quantidade));
                            console.log('Produto atualizado com sucesso.');
                            mostrarMenu();
                            rl.question('Digite o número da opção desejada: ', handleUserInput);
                        });
                    });
                });
                break;
            case '3':
                rl.question('Número do produto: ', (numero) => {
                    excluirProduto(parseInt(numero));
                    console.log('Produto excluído com sucesso.');
                    mostrarMenu();
                    rl.question('Digite o número da opção desejada: ', handleUserInput);
                });
                break;
            case '4':
                listarProdutos();
                mostrarMenu();
                rl.question('Digite o número da opção desejada: ', handleUserInput);
                break;
            case '5':
                rl.question('Digite os números dos produtos (separados por vírgula): ', (resposta) => {
                    const numeros = resposta.split(',').map(num => parseInt(num.trim()));
                    calcularTotalCompra(numeros);
                    mostrarMenu();
                    rl.question('Digite o número da opção desejada: ', handleUserInput);
                });
                break;
            case '6':
                console.log('Saindo...');
                rl.close();
                break;
            default:
                console.log('Opção inválida.');
                mostrarMenu();
                rl.question('Digite o número da opção desejada: ', handleUserInput);
                break;
        }
    }

    mostrarMenu();
    rl.question('Digite o número da opção desejada: ', handleUserInput);
}

main();

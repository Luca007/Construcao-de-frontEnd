/**
 * Sistema de Catalogação de Livros Digitais
 *
 * Este algoritmo utiliza expressões regulares para identificar e contar
 * ocorrências de nomes de autores em textos, considerando as regras específicas
 * para nomes com partes que podem não começar com maiúsculas (como preposições).
 */

/**
 * Função que conta ocorrências de nomes de autores em um texto
 *
 * @param {string} texto - O texto a ser analisado
 * @returns {Object} Um objeto com os nomes encontrados e suas contagens
 */
function contarAutores(texto) {
    // Criando um objeto para armazenar os autores encontrados e suas contagens
    const autoresEncontrados = {};

    // Expressão regular para identificar nomes de autores
    // Características da expressão:
    // 1. Procura por palavras que começam com letra maiúscula
    // 2. Permite palavras intermediárias em minúsculas (como "de", "da", "dos", etc.)
    // 3. Requer pelo menos 2 palavras (nome e sobrenome)
    // 4. Captura o nome completo

    // Usando uma expressão com grupos de captura para identificar os padrões de nomes
    const regexAutores = /\b([A-Z][a-zÀ-ÿ]+)(\s+([a-zÀ-ÿ]+\s+|[A-Z][a-zÀ-ÿ]+\s+))*([A-Z][a-zÀ-ÿ]+)\b/g;

    // Encontrando todos os matches no texto
    let match;
    while ((match = regexAutores.exec(texto)) !== null) {
        // Obtém o nome completo capturado
        const nomeCompleto = match[0];

        // Atualiza a contagem para este nome
        if (autoresEncontrados[nomeCompleto]) {
            autoresEncontrados[nomeCompleto]++;
        } else {
            autoresEncontrados[nomeCompleto] = 1;
        }
    }

    return autoresEncontrados;
}

/**
 * Função auxiliar para exibir os resultados no console de forma organizada
 *
 * @param {Object} autoresContagem - Objeto com nomes de autores e suas contagens
 */
function exibirResultados(autoresContagem) {
    console.log("=== AUTORES ENCONTRADOS ===");

    if (Object.keys(autoresContagem).length === 0) {
        console.log("Nenhum autor encontrado no texto.");
        return;
    }

    // Ordenar autores por contagem (do maior para o menor)
    const autoresOrdenados = Object.entries(autoresContagem)
        .sort((a, b) => b[1] - a[1]);

    // Exibir cada autor e sua contagem
    autoresOrdenados.forEach(([autor, contagem]) => {
        console.log(`${autor}: ${contagem} ocorrência${contagem > 1 ? 's' : ''}`);
    });
}

// Textos de exemplo para testar o algoritmo
const exemplo1 = `
    O romance Dom Casmurro, escrito por Machado de Assis, é uma das obras-primas da literatura brasileira.
    Machado de Assis é considerado um dos maiores escritores da língua portuguesa.
    Além de Machado de Assis, Pedro Álvares Cabral também é uma figura importante na história brasileira,
    embora Pedro Álvares Cabral não seja um escritor, mas sim o navegador português que descobriu o Brasil.
`;

const exemplo2 = `
    Na biblioteca, encontrei livros de Machado de Assis e José de Alencar.
    As obras de Pedro Álvares Cabral são documentos históricos importantes.
    Muitos estudantes leem os contos de Machado de Assis nas aulas de literatura.
    Pedro Álvares Cabral chegou ao Brasil em 1500.
`;

// Testando o algoritmo com os exemplos
console.log("Exemplo 1:");
const resultado1 = contarAutores(exemplo1);
exibirResultados(resultado1);

console.log("\nExemplo 2:");
const resultado2 = contarAutores(exemplo2);
exibirResultados(resultado2);

// Função para buscar autores em um texto fornecido pelo usuário
function buscarAutoresEmTexto(texto) {
    console.log("\nAnalisando texto fornecido:");
    const resultado = contarAutores(texto);
    exibirResultados(resultado);
    return resultado;
}

// Exportando as funções para uso em outros módulos
module.exports = {
    contarAutores,
    exibirResultados,
    buscarAutoresEmTexto
};

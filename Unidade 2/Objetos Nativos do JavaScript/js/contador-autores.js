/**
 * contador-autores.js - Sistema de Catalogação de Livros Digitais
 *
 * Este módulo contém funções para identificação e contagem de nomes
 * de autores em textos utilizando expressões regulares.
 * É projetado para uso tanto no navegador quanto no Node.js.
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

/**
 * Função para buscar autores em um texto fornecido pelo usuário
 *
 * @param {string} texto - O texto a ser analisado
 * @returns {Object} Um objeto com os nomes encontrados e suas contagens
 */
function buscarAutoresEmTexto(texto) {
    console.log("\nAnalisando texto fornecido:");
    const resultado = contarAutores(texto);
    exibirResultados(resultado);
    return resultado;
}

// Verificar se o ambiente é Node.js (module.exports existe)
// ou navegador (window existe)
if (typeof module !== 'undefined' && module.exports) {
    // Node.js - exportar funções
    module.exports = {
        contarAutores,
        exibirResultados,
        buscarAutoresEmTexto
    };
} else if (typeof window !== 'undefined') {
    // Navegador - adicionar ao objeto global window
    window.ContadorAutores = {
        contarAutores,
        exibirResultados,
        buscarAutoresEmTexto
    };
}

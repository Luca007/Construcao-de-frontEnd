/**
 * app.js - Sistema de Catalogação de Livros Digitais
 *
 * Este arquivo é responsável por conectar a interface do usuário
 * com as funções de análise de texto do módulo contador-autores.js
 */

// Aguardar que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Obter referências aos elementos do DOM
    const analyzeBtn = document.getElementById('analyze-btn');
    const inputText = document.getElementById('input-text');
    const resultContainer = document.getElementById('result-container');
    const authorsList = document.getElementById('authors-list');

    // Adicionar evento de clique ao botão de análise
    analyzeBtn.addEventListener('click', function() {
        analisarTexto();
    });

    /**
     * Função principal para analisar o texto e encontrar autores
     */
    function analisarTexto() {
        const texto = inputText.value;

        // Verificar se há texto para análise
        if (!texto.trim()) {
            alert('Por favor, digite algum texto para análise.');
            return;
        }

        // Utilizar a função contarAutores do módulo ContadorAutores
        const autoresEncontrados = window.ContadorAutores.contarAutores(texto);

        // Exibir os resultados na interface
        exibirResultadosNaInterface(autoresEncontrados);
    }

    /**
     * Exibe os resultados na interface
     *
     * @param {Object} autoresEncontrados - Objeto com nomes e contagens
     */
    function exibirResultadosNaInterface(autoresEncontrados) {
        // Limpar a lista atual
        authorsList.innerHTML = '';

        // Verificar se foram encontrados autores
        if (Object.keys(autoresEncontrados).length === 0) {
            authorsList.innerHTML = '<p>Nenhum autor encontrado no texto.</p>';
        } else {
            // Ordenar autores por contagem (maior para menor)
            const autoresOrdenados = Object.entries(autoresEncontrados)
                .sort((a, b) => b[1] - a[1]);

            // Criar elementos para cada autor
            autoresOrdenados.forEach(([autor, contagem]) => {
                const authorElement = document.createElement('div');
                authorElement.className = 'author';
                authorElement.textContent = `${autor}: ${contagem} ocorrência${contagem > 1 ? 's' : ''}`;
                authorsList.appendChild(authorElement);
            });
        }

        // Mostrar os resultados
        resultContainer.style.display = 'block';
    }
});

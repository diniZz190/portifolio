// PORTFÓLIO - ARTHUR DINIZ SILVEIRA

// 1. Atualizar ano do rodapé
function atualizarAno() {
    const elementosAno = document.querySelectorAll('.ano-atual');
    const anoAtual = new Date().getFullYear();

    elementosAno.forEach(function(elemento) {
        elemento.textContent = anoAtual;
    });
}

// 2. Configurar menu responsivo
function configurarMenu() {
    const botaoMenu = document.getElementById('botao-menu');
    const menu = document.getElementById('menu-principal');

    if (!botaoMenu || !menu) return;

    botaoMenu.addEventListener('click', function() {
        const estaAberto = menu.classList.toggle('aberto');

        botaoMenu.setAttribute('aria-expanded', String(estaAberto));
        botaoMenu.setAttribute(
            'aria-label',
            estaAberto ? 'Fechar menu' : 'Abrir menu'
        );
    });

    menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('aberto');

            botaoMenu.setAttribute('aria-expanded', 'false');
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        });
    });
}

// 3. Filtrar os projetos por categoria
function configurarFiltroProjetos() {
    const botoesFiltro = document.querySelectorAll('[data-filtro]');
    const cartoes = document.querySelectorAll('[data-categoria]');
    const resultadoFiltro = document.getElementById('resultado-filtro');

    if (botoesFiltro.length === 0) return;

    botoesFiltro.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const filtroSelecionado = botao.dataset.filtro;
            let quantidade = 0;

            cartoes.forEach(function(cartao) {
                const categorias = cartao.dataset.categoria.split(' ');

                const mostrar =
                    filtroSelecionado === 'todos' ||
                    categorias.includes(filtroSelecionado);

                cartao.hidden = !mostrar;

                if (mostrar) quantidade++;
            });

            botoesFiltro.forEach(function(outroBotao) {
                const ativo = outroBotao === botao;

                outroBotao.classList.toggle('ativo', ativo);
                outroBotao.setAttribute('aria-pressed', String(ativo));
            });

            if (resultadoFiltro) {
                resultadoFiltro.textContent =
                    quantidade +
                    (quantidade === 1
                        ? ' projeto encontrado.'
                        : ' projetos encontrados.');
            }
        });
    });
}

// 4. Abrir e fechar as perguntas frequentes
function configurarPerguntas() {
    const botoes = document.querySelectorAll('.botao-pergunta');

    botoes.forEach(function(botao) {

        botao.addEventListener('click', function() {

            const resposta = document.getElementById(
                botao.getAttribute('aria-controls')
            );

            if (!resposta) return;

            const abrir =
                botao.getAttribute('aria-expanded') !== 'true';

            // Fecha todas as respostas
            botoes.forEach(function(outroBotao) {
                const outraResposta = document.getElementById(
                    outroBotao.getAttribute('aria-controls')
                );

                outroBotao.setAttribute('aria-expanded', 'false');

                outroBotao.querySelector('.icone-pergunta').textContent = '+';

                if (outraResposta) {
                    outraResposta.hidden = true;
                }
            });

            // Abre ou fecha a pergunta selecionada
            botao.setAttribute('aria-expanded', String(abrir));

            resposta.hidden = !abrir;

            botao.querySelector('.icone-pergunta').textContent =
                abrir ? '−' : '+';

        });

    });
}

// Inicialização das funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    atualizarAno();
    configurarMenu();
    configurarFiltroProjetos();
    configurarPerguntas();
});
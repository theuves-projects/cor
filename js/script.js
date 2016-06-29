
// equivalente a `document.querySelector`
function qs(sel) {
    return document.querySelector(sel);
}

// reproduzir um audio
function reproduzir(nome) {
    new Audio('audio/' + nome + '.wav').play();
}

// registra pontuação se for a primeira
// vez que a página foi acessada
if (localStorage.pontos === undefined) {
    localStorage.pontos = '0000000';
}

// exibe a maior pontuação registrada
qs('.record').innerHTML = localStorage.pontos;

// variáveis de estado do jogo
var inicio = true; // se está na tela inicial
var final = false; // se está na tela final
var pausado = false; // se está pausado

// função para gerar números aleatórios
function rand(num) {
    return Math.floor(Math.random() * num);
}

// reseta informação do jogo
function resetarJogo() {

    // apaga o personagem
    qs('.lado1').innerHTML = '░';
    qs('.lado2').innerHTML = '░';

    // sorteia o lado em que o personagem irá iniciar
    var lado = ['.lado1', 'lado2'][rand(2)];

    // adiciona o personagem na tela
    qs(lado).innerHTML = '█';

    // apaga personagens adiversarios da rua
    qs('.rua1').innerHTML = '░░░░░░░░░░░░░░░';
    qs('.rua2').innerHTML = '░░░░░░░░░░░░░░░';

    // apaga personagens adiversarios
    // da rua atrás do personagem principal
    qs('.u1').innerHTML = '░';
    qs('.u2').innerHTML = '░';

    //===
    vezes = 0;

    fim1 = false;
    fim2 = false;

    qual1 = '';
    qual2 = '';

    v = 100;
    //===

    // reseta pontuação
    qs('.pontos').innerHTML = '0000000';
    qs('.velocidade').innerHTML = '000';
    qs('.seus-pontos').innerHTML = '0000000 ';
}

addEventListener('keypress', function (event) {

    // código da tecla pressionada
    var kc = event.keyCode;

    // códigos da teclas
    var tecla = {
        p: 112,
        enter: 13
    };

    // se for pressionadoa a tecla `p`
    if (kc === tecla.p) {

        // se o jogador estiver jogando, ou seja se
        // NÃO estiver tela inicial ou na tela final
        if (final === false && inicio === false) {

            // reproduz som de tecla
            reproduzir('typewriter_click');

            // pausa o jogo
            clearInterval(intervalo);
            pausado = true; // informa que o jogo está pausado

            qs('.jogo').hidden = true; // esconde tela do jogo
            qs('.pausado').hidden = false; // exibe tela pausada

            // passa os pontos feitos até o momento para a tela pausada
            qa('.pontos-pausado').innerHTML = qs('.pontos').innerHTML;
        }
    }

    // se a tecla enter for pressionada
    if (kc === tecla.enter) {

        // se não estiver na tela final e se o jogo
        // estiver pausado
        if (final === false && pausado === true) {

            // reproduz som de tecla
            reproduzir('typewriter_click');

            // volta o jogo
            definaIntervalo(cb, v);

            // esconde a tela de pause e
            // mostra a tela do jogo
            qs('.pausado').hidden = true;
            qs('.jogo').hidden = false;

            // informa que o jogo não está pausado
            pausado = false;
        }

        // primeira jogada, se o jogo estiver na tela inicial
        if (final === false && inicio === true) {

            // reproduz som de tecla
            reproduzir('typewriter_click');

            // inicia jogo
            definaIntervalo(cb, v);
            qs('.inicio').hidden = true;
            qs('.jogo').hidden = false;

            // informa que o jogo já começou
            inicio = false;
        }

        // se estiver na tela de fim de jogo
        if (final === true) {

            // reproduz som de tecla
            reproduzir('typewriter_click');

            // informa que não está
            // mais na tela final
            final = false;

            resetarJogo(); // reseta jogo

            // esconde tela de fim e mostra tela do jogo
            qs('.fim').hidden = true;
            qs('.jogo').hidden = false;

            // inicia o jogo
            definaIntervalo(cb, v);
        }
    }
});

// função para exibir a
// tela fim de jogo
function fim() {

    // reproduz som
    reproduzir('chime');

    // para o jogo
    clearInterval(intervalo);

    // esconde tela do jogo e mostra
    // tela de fim
    qs('.jogo').hidden = true;
    qs('.fim').hidden = false;

    // adiciona pontos feitos no jogo na tela final
    qs('.seus-pontos').innerHTML = qs('.pontos').innerHTML;

    var record = parseInt(qs('.record').innerHTML); // maior pontuação
    var pontos = parseInt(qs('.pontos').innerHTML); // pontuação feita

    // se os pontos feitos for maior que o record,
    // adiciona ponto no registro de record
    if (pontos > record) {
        localStorage.pontos = pontos;
    }

    // reseta pontos na tela de pause
    qs('.pontos-pausado').innerHTML = '0000000';

    // informa que o jogo
    // está na tela final
    final = true;
}

// adiciona pontos na tela de jogo,
// sempre somando os pontos já feitos com 1
function addPonto() {
    var zeros = '0000000';

    // pontuação feita até o momento
    var pontos = qs('.pontos').innerHTML;

    // adiciona mais um ponto
    var novo = (parseInt(pontos) + 1).toString();

    // informa nova pontuação na tela do jogo
    var ponto = zeros.substring(0, zeros.length - novo.length) + novo;
    qs('.pontos').innerHTML = ponto;
}

// adiciona mais velocidade no jogo
function addVelocidade() {
    var zeros = '000';

    // velocidade atual
    var vel = qs('.velocidade').innerHTML;

    // aumenta a velocidade
    var novo = (parseInt(novo) + 1).toString();

    // informa nova velocidade na tela do jogo
    var ponto = zeros.substr(0, zeros.length - novo.length) + novo;
    qs('.velocidade').innerHTML = ponto;
}

var lado = ['c', 'b'][Math.floor(Math.random() * 2)];

if (lado === 'c') {
    document.querySelector('.lado1').innerHTML = '█';
} else {
    document.querySelector('.lado2').innerHTML = '█';
}

addEventListener('keydown', function (event) {
    if (final === false) {
        if (event.keyCode === 38) {
            document.querySelector('.lado1').innerHTML = '█'; // escolhido
            document.querySelector('.lado2').innerHTML = '░';

            lado = 'c';

            // audio.movimento.play();
            reproduzir('womp');
        }

        if (event.keyCode === 40) {
            document.querySelector('.lado1').innerHTML = '░';
            document.querySelector('.lado2').innerHTML = '█'; // escolhido

            lado = 'b';

            // audio.movimento.play();
            reproduzir('womp');
        }
    }
});

var vezes = 0;

var fim1 = false;
var fim2 = false;

var qual1 = '';
var qual2 = '';

var v = 100;

var cb = function () {
    if (vezes === 0 && document.querySelector('.rua1').innerHTML.charAt(13) === '▓' || vezes === 0 && document.querySelector('.rua2').innerHTML.charAt(13) === '▓') {
        vezes = vezes + 2;
    }

    var regex = /^(\░|\▓)/;

    function defina(rua, oque) {
        document.querySelector(rua).innerHTML = document.querySelector(rua).innerHTML.replace(/^(\░|\▓)/, '') + oque;
    }

    // define aleatoriamente o lado em que
    // o carro irá nascer
    var n = Math.floor(Math.random() * 2);

    if (vezes === 0 || vezes === 7 || vezes === 14) {
        if (n === 0) {
            defina('.rua1', '▓');
            defina('.rua2', '░');
        } else {
            defina('.rua2', '▓');
            defina('.rua1', '░');
        }
    } else {
        if (n === 0) {
            defina('.rua1', '░');
            defina('.rua2', '░');
        } else {
            defina('.rua2', '░');
            defina('.rua1', '░');
        }
    }

    if (qual1) {
        if (document.querySelector(qual1).innerHTML === '▓') {
            if (document.querySelector(qual1).innerHTML === '█') {
                fim();
                return;
            } else {
                document.querySelector(qual1).innerHTML = '░';
                qual1 = '';
                fim1 = false;
            }
        }
    }

    if (fim1 === true) {
        if (document.querySelector(qual1).innerHTML === '█') {
            fim();
            return;
        } else {
            addPonto();

            if (parseInt(document.querySelector('.pontos').innerHTML) % 5 === 0 && parseInt(document.querySelector('.pontos').innerHTML) > 0) {
                addVelocidade();

                v = v - 1;
                definaIntervalo(cb, v);
            }

            document.querySelector(qual1).innerHTML = '▓';
        }
    }

    if (document.querySelector('.rua1').innerHTML.substring(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado1';
    }

    if (document.querySelector('.rua2').innerHTML.substring(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado2';
    }

    if (qual2) {
        if (document.querySelector(qual2).innerHTML === '▓') {
            document.querySelector(qual2).innerHTML = '░';
            qual2 = '';
            fim2 = false;
        }
    }

    if (fim2 === true) {
        document.querySelector(qual2).innerHTML = '▓';
    }

    if (document.querySelector('.lado1').innerHTML === '▓') {
        fim2 = true;
        qual2 = '.u1';
    }

    if (document.querySelector('.lado2').innerHTML === '▓') {
        fim2 = true;
        qual2 = '.u2';
    }

    if (document.querySelector('.lado1').innerHTML !== '█' && document.querySelector('.lado2').innerHTML !== '█') {
        fim();
        return;
    }

    vezes = vezes + 1;

    if (vezes === 16) {
        vezes = 0;
    }
};

var intervalo;

function definaIntervalo(callback, velocidade) {
    clearInterval(intervalo);

    intervalo = setInterval(callback, velocidade);
}


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

            // pausa
            clearInterval(intervalo);
            pausado = true; // informa que o jogo está pausado

            qs('.jogo').hidden = true; // esconde tela do jogo
            qs('.pausado').hidden = false; // exibe tela pausada

            // passa os pontos feitos até o momento para a tela pausada
            qa('.pontos-pausado').innerHTML = qs('.pontos').innerHTML;
        }
    }

    if (e.keyCode === 13) {
        if (final === false && pausado === true) {
            reproduzir('typewriter_click');

            definaIntervalo(cb, v);
            document.querySelector('.pausado').hidden = true;
            document.querySelector('.jogo').hidden = false;

            pausado = false;
        }
        if (final === false && inicio === true) {
            reproduzir('typewriter_click');

            definaIntervalo(cb, v);
            document.querySelector('.inicio').hidden = true;
            document.querySelector('.jogo').hidden = false;

            inicio = false;
        } else if (final === true) {
            reproduzir('typewriter_click');

            final = false;

            document.querySelector('.lado1').innerHTML = '░';
            document.querySelector('.lado2').innerHTML = '░';

            var lado = ['c', 'b'][Math.floor(Math.random() * 2)];

            if (lado === 'c') {
                document.querySelector('.lado1').innerHTML = '█';
            } else {
                document.querySelector('.lado2').innerHTML = '█';
            }

            document.querySelector('.rua1').innerHTML = '░░░░░░░░░░░░░░░';
            document.querySelector('.rua2').innerHTML = '░░░░░░░░░░░░░░░';

            document.querySelector('.u1').innerHTML = '░';
            document.querySelector('.u2').innerHTML = '░';

            vezes = 0;

            fim1 = false;
            fim2 = false;

            qual1 = '';
            qual2 = '';

            v = 100;

            document.querySelector('.pontos').innerHTML = '0000000';
            document.querySelector('.velocidade').innerHTML = '000';
            document.querySelector('.seus-pontos').innerHTML = '0000000 ';

            document.querySelector('.fim').hidden = true;
            document.querySelector('.jogo').hidden = false;

            // inicia
            definaIntervalo(cb, v);
        }
    }
});

function fim() {
    reproduzir('chime');

    clearInterval(intervalo);
    document.querySelector('.jogo').hidden = true;
    document.querySelector('.fim').hidden = false;
    document.querySelector('.seus-pontos').innerHTML = document.querySelector('.pontos').innerHTML;

    if (parseInt(document.querySelector('.record').innerHTML) < parseInt(document.querySelector('.pontos').innerHTML)) {
        localStorage.pontos = document.querySelector('.pontos').innerHTML;
    }

    document.querySelector('.pontos-pausado').innerHTML = '0000000';
    final = true;
}

function addPonto() {
    var zeros = '0000000';

    novo = parseInt(document.querySelector('.pontos').innerHTML) + 1;
    novo = novo.toString();

    var ponto = zeros.substring(0, zeros.length - novo.length) + novo;

    document.querySelector('.pontos').innerHTML = ponto;
}

function addVelocidade() {
    var zeros = '000';

    novo = parseInt(document.querySelector('.velocidade').innerHTML) + 1;
    novo = novo.toString();

    var ponto = zeros.substring(0, zeros.length - novo.length) + novo;

    document.querySelector('.velocidade').innerHTML = ponto;
}

function oMaisPerto(className) {
    return document.querySelector(className).innerHTML.charAt(0);
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

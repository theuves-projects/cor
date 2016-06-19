if (localStorage.pontos === undefined) {
    localStorage.pontos = '0000000';
}

document.querySelector('.record').innerHTML = localStorage.pontos;

var primeiro = true;
var final = false;

addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (final === false && primeiro === true) {
            definaIntervalo(cb, v);
            document.querySelector('.inicio').hidden = true;
            document.querySelector('.jogo').hidden = false;

            primeiro = false;
        } else if (final === true) {
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
    clearInterval(intervalo);
    document.querySelector('.jogo').hidden = true;
    document.querySelector('.fim').hidden = false;
    document.querySelector('.seus-pontos').innerHTML = document.querySelector('.pontos').innerHTML;

    if (parseInt(document.querySelector('.record').innerHTML) < parseInt(document.querySelector('.pontos').innerHTML)) {
        localStorage.pontos = document.querySelector('.pontos').innerHTML;
    }

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
        }

        if (event.keyCode === 40) {
            document.querySelector('.lado1').innerHTML = '░';
            document.querySelector('.lado2').innerHTML = '█'; // escolhido

            lado = 'b';
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

    var n = Math.floor(Math.random() * 2);

    if (vezes === 0 || vezes === 7 || vezes === 14) {
        if (n === 0) {
            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML + '▓';

            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML + '░';
        } else {
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML + '▓';

            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML + '░';
        }
    } else {
        if (n === 0) {
            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML.replace(/^(\░|\▓)/, '');

            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML + '░';

            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML + '░';
        } else {
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua2').innerHTML = document.querySelector('.rua2').innerHTML + '░';

            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML.replace(/^(\░|\▓)/, '');
            document.querySelector('.rua1').innerHTML = document.querySelector('.rua1').innerHTML + '░';
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

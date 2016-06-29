function qs(sel) {
    return document.querySelector(sel);
}

function html(sel) {
    return qs(sel).innerHTML;
}

function reproduzir(nome) {
    new Audio('audio/' + nome + '.wav').play();
}

if (localStorage.pontos === undefined) {
    localStorage.pontos = '0000000';
}

qs('.record').innerHTML = localStorage.pontos;

var inicio = true;
var final = false;
var pausado = false;

function rand(num) {
    return Math.floor(Math.random() * num);
}

function fim() {
    reproduzir('chime');

    clearInterval(intervalo);

    qs('.jogo').hidden = true;
    qs('.fim').hidden = false;
    qs('.seus-pontos').innerHTML = html('.pontos');

    var record = parseInt(html('.record'));
    var pontos = parseInt(html('.pontos'));

    if (pontos > record) {
        localStorage.pontos = html('.pontos');
    }

    qs('.pontos-pausado').innerHTML = '0000000';

    final = true;
}

function add(className, nums) {
    var val = html(className);
    var novo = (parseInt(val) + 1).toString();

    var ponto = nums.substr(0, nums.length - novo.length) + novo;
    qs(className).innerHTML = ponto;
}

var lado = ['.lado1', '.lado2'][rand(2)];
qs(lado).innerHTML = '█';

var vezes = 0;
var fim1 = false;
var fim2 = false;
var qual1 = '';
var qual2 = '';
var v = 100;

var cb = function () {
    function tc() {
        var lds = [
            html('.rua1').charAt(13),
            html('.rua2').charAt(13)
        ];

        return lds[0] === '▓' || lds[1] === '▓';
    }

    vezes = vezes === 0 && tc() ? vezes += 2 : vezes;

    function adicionar(rua, oque) {
        var re = /^(\░|\▓)/;

        qs(rua).innerHTML = html(rua).replace(re, '') + oque;
    }

    var n = Math.floor(Math.random() * 2);

    if (vezes === 0 || vezes === 7 || vezes === 14) {
        if (n === 0) {
            adicionar('.rua1', '▓');
            adicionar('.rua2', '░');
        } else {
            adicionar('.rua2', '▓');
            adicionar('.rua1', '░');
        }
    } else {
        if (n === 0) {
            adicionar('.rua1', '░');
            adicionar('.rua2', '░');
        } else {
            adicionar('.rua2', '░');
            adicionar('.rua1', '░');
        }
    }

    if (qual1) {
        if (html(qual1) === '▓') {
            if (html(qual1) === '█') {
                fim();
                return;
            } else {
                qs(qual1).innerHTML = '░';
                qual1 = '';
                fim1 = false;
            }
        }
    }

    if (fim1 === true) {
        if (html(qual1) === '█') {
            fim();

            return;
        } else {
            add('.pontos', '0000000');

            var pontos = parseInt(html('.pontos'));

            if (pontos % 5 === 0 && pontos > 0) {
                add('.velocidade', '000');

                v = v - 1;
                definaIntervalo(cb, v);
            }

            qs(qual1).innerHTML = '▓';
        }
    }

    if (html('.rua1').substr(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado1';
    }

    if (html('.rua2').substr(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado2';
    }

    if (qual2) {
        if (html(qual2) === '▓') {
            qs(qual2).innerHTML = '░';
            qual2 = '';
            fim2 = false;
        }
    }

    if (fim2 === true) {
        qs(qual2).innerHTML = '▓';
    }

    var l1 = html('.lado1');
    var l2 = html('.lado2');

    if (l1 === '▓') { fim2 = true; qual2 = '.u1'; }
    if (l2 === '▓') { fim2 = true; qual2 = '.u2'; }

    if (l1 !== '█' && l2 !== '█') {
        fim();
        return;
    }

    vezes = vezes + 1;
    vezes = vezes === 16 ? vezes = 0 : vezes
};

var intervalo;

function definaIntervalo(callback, velocidade) {
    clearInterval(intervalo);

    intervalo = setInterval(callback, velocidade);
}

function resetarJogo() {
    qs('.lado1').innerHTML = '░';
    qs('.lado2').innerHTML = '░';

    var lado = ['.lado1', '.lado2'][rand(2)];

    qs(lado).innerHTML = '█';
    qs('.rua1').innerHTML = '░░░░░░░░░░░░░░░';
    qs('.rua2').innerHTML = '░░░░░░░░░░░░░░░';
    qs('.u1').innerHTML = '░';
    qs('.u2').innerHTML = '░';

    vezes = 0;
    fim1 = false;
    fim2 = false;
    qual1 = '';
    qual2 = '';
    v = 100;

    qs('.pontos').innerHTML = '0000000';
    qs('.velocidade').innerHTML = '000';
    qs('.seus-pontos').innerHTML = '0000000 ';
}

addEventListener('keypress', function (event) {
    if (event.keyCode === 112) {
        if (final === false && inicio === false) {
            reproduzir('typewriter_click');

            clearInterval(intervalo);
            qs('.jogo').hidden = true;
            qs('.pausado').hidden = false;
            qa('.pontos-pausado').innerHTML = html('.pontos');

            pausado = true;
        }
    }

    if (event.keyCode === 13) {
        if (final === false && pausado === true) {
            reproduzir('typewriter_click');

            definaIntervalo(cb, v);
            qs('.pausado').hidden = true;
            qs('.jogo').hidden = false;

            pausado = false;
        }

        if (final === false && inicio === true) {
            reproduzir('typewriter_click');

            definaIntervalo(cb, v);
            qs('.inicio').hidden = true;
            qs('.jogo').hidden = false;

            inicio = false;
        }

        if (final === true) {
            reproduzir('typewriter_click');
            final = false;

            resetarJogo();
            qs('.fim').hidden = true;
            qs('.jogo').hidden = false;

            definaIntervalo(cb, v);
        }
    }
});

addEventListener('keydown', function (event) {
    if (final === false) {
        if (event.keyCode === 38) {
            qs('.lado1').innerHTML = '█';
            qs('.lado2').innerHTML = '░';

            lado = 'c';
            reproduzir('womp');
        }

        if (event.keyCode === 40) {
            qs('.lado1').innerHTML = '░';
            qs('.lado2').innerHTML = '█';

            lado = 'b';
            reproduzir('womp');
        }
    }
});

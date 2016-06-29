'use strict';

var zeros = '0000000';

function qs(sel) {
    return document.querySelector(sel);
}

function reproduz(nome) {
    new Audio('audio/' + nome + '.wav').play();
}

function rand(num) {
    return Math.floor(Math.random() * num);
}

function fim() {
    reproduz('chime');

    clearInterval(intervalo);

    qs('.jogo').hidden = true;
    qs('.fim').hidden = false;

    var record = qs('.record').innerHTML;
    var pontos = qs('.pontos').innerHTML;

    if (pontos > record) {
        localStorage.setItem('pontos', pontos);
    }

    qs('.seus-pontos').innerHTML = pontos;
    qs('.pontos-pausado').innerHTML = zeros;

    final = true;
}

function add(className, nums) {
    var val = qs(className).innerHTML;
    var novo = (parseInt(val) + 1).toString();

    var ponto = nums.substr(0, nums.length - novo.length) + novo;
    qs(className).innerHTML = ponto;
}

if (!localStorage.getItem('pontos')) {
    localStorage.setItem('pontos', zeros);
}

qs('.record').innerHTML = localStorage.pontos;

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
            qs('.rua1').innerHTML.charAt(13),
            qs('.rua2').innerHTML.charAt(13)
        ];

        return lds[0] === '▓' || lds[1] === '▓';
    }

    vezes = vezes === 0 && tc() ? vezes += 2 : vezes;

    function adicionar(rua, oque) {
        var re = /^(\░|\▓)/;

        qs(rua).innerHTML = qs(rua).innerHTML.replace(re, '') + oque;
    }

    var rua1 = '░';
    var rua2 = '░';
    
    if (vezes === 0 || vezes === 7 || vezes === 14) {        
        var n = rand(2);
    
        rua1 = n === 0 ? '▓' : rua1;
        rua2 = n !== 0 ? '▓' : rua2;
    }
    
    adicionar('.rua1', rua1);
    adicionar('.rua2', rua2);
    
    if (qual1) {
        if (qs(qual1).innerHTML === '▓') {
            if (qs(qual1).innerHTML === '█') {
                fim();
                return;
            } else {
                qs(qual1).innerHTML = '░';
                qual1 = '';
                fim1 = false;
            }
        }
    }

    if (fim1) {
        if (qs(qual1).innerHTML === '█') {
            fim();

            return;
        } else {
            add('.pontos', zeros);
            var pontos = parseInt(qs('.pontos').innerHTML);

            if (pontos % 5 === 0 && pontos > 0) {
                add('.velocidade', '000');

                v = v - 1;
                definaIntervalo(cb, v);
            }

            qs(qual1).innerHTML = '▓';
        }
    }

    if (qs('.rua1').innerHTML.substr(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado1';
    }

    if (qs('.rua2').innerHTML.substr(0, 1) === '▓') {
        fim1 = true;
        qual1 = '.lado2';
    }

    if (qual2) {
        if (qs(qual2).innerHTML === '▓') {
            qs(qual2).innerHTML = '░';
            qual2 = '';
            fim2 = false;
        }
    }

    if (fim2) qs(qual2).innerHTML = '▓';

    var l1 = qs('.lado1').innerHTML;
    var l2 = qs('.lado2').innerHTML;

    if (l1 === '▓') { fim2 = true; qual2 = '.u1'; }
    if (l2 === '▓') { fim2 = true; qual2 = '.u2'; }

    if (l1 !== '█' && l2 !== '█') {
        fim();
        return;
    }

    vezes = vezes + 1;
    vezes = vezes === 16 ? vezes = 0 : vezes;
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

    qs('.pontos').innerHTML = zeros;
    qs('.velocidade').innerHTML = zeros.substr(-3);
    qs('.seus-pontos').innerHTML = zeros;
}

var inicio = true;
var final = false;
var pausado = false;

addEventListener('keypress', function (event) {
    if (event.keyCode !== 112 && event.keyCode !== 13) return;

    if (event.keyCode === 112) {
        if (!final && !inicio) {
            qs('.jogo').hidden = true;
            reproduz('typewriter_click');
            qs('.pausado').hidden = false;

            qs('.pontos-pausado').innerHTML = qs('.pontos').innerHTML;
            clearInterval(intervalo);
            pausado = true;
        }
    }

    if (event.keyCode === 13) {
        if (!final && pausado) {
            qs('.pausado').hidden = true;
            reproduz('typewriter_click');
            qs('.jogo').hidden = false;

            definaIntervalo(cb, v);
            pausado = false;
        } else if (!final && inicio) {
            qs('.inicio').hidden = true;
            reproduz('typewriter_click');
            qs('.jogo').hidden = false;

            definaIntervalo(cb, v);
            inicio = false;
        } else if (final) {
            resetarJogo();

            qs('.fim').hidden = true;
            reproduz('typewriter_click');
            qs('.jogo').hidden = false;

            definaIntervalo(cb, v);
            final = false;
        }
    }
});

function mover(onde, lado1, lado2) {
    qs('.lado1').innerHTML = lado1;
    qs('.lado2').innerHTML = lado2;

    reproduz('womp');
    lado = onde;
}

addEventListener('keydown', function (event) {
    if (final || event.keyCode !== 38 && event.keyCode !== 40) return;

    if (event.keyCode === 38) mover('c', '█', '░');
    if (event.keyCode === 40) mover('b', '░', '█');
});

'use strict';

var obj = {
    car: '\u2588',
    adv: '\u2593',
    rua: '\u2591'
};

function qs(sel) {
    return document.querySelector(sel);
}

function reproduz(nome) {
    new Audio('audio/' + nome + '.wav').play();
}

function rand(num) {
    return Math.floor(Math.random() * num);
}

function repetir(str, vez) {
    var repetido = '';

    for (var i = 0; i < vez; i++) {
        repetido += str;
    }

    return repetido;
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
    qs('.pontos-pausado').innerHTML = '0000000';

    final = true;
}

function add(cn) {
    var nums = cn === '.pontos' ? '0000000' : '000';

    var val = qs(cn).innerHTML;
    var novo = (parseInt(val) + 1).toString();

    var ponto = nums.substr(0, nums.length - novo.length) + novo;
    qs(cn).innerHTML = ponto;
}

if (!localStorage.getItem('pontos')) {
    localStorage.setItem('pontos', '0000000');
}

qs('.record').innerHTML = localStorage.pontos;
qs(['.lado1', '.lado2'][rand(2)]).innerHTML = obj.car;

var vezes = 0;
var fim1 = false;
var fim2 = false;
var qual1 = '';
var qual2 = '';
var v = 100;

var cb = function () {
    function tc() {
        var lds = [
            qs('.rua1').innerHTML[13],
            qs('.rua2').innerHTML[13]
        ];

        return lds[0] === obj.adv || lds[1] === obj.adv;
    }

    vezes = vezes === 0 && tc() ? vezes += 2 : vezes;

    function adicionar(rua, oque) {
        var re = new RegExp('^(' + obj.rua + '|' + obj.adv + ')');

        qs(rua).innerHTML = qs(rua).innerHTML.replace(re, '') + oque;
    }

    var rua1 = obj.rua;
    var rua2 = obj.rua;

    if (!(vezes % 7)) {
        var n = rand(2);

        rua1 = n === 0 ? obj.adv : rua1;
        rua2 = n !== 0 ? obj.adv : rua2;
    }

    adicionar('.rua1', rua1);
    adicionar('.rua2', rua2);

    if (qual1 && qs(qual1).innerHTML === obj.adv) {
        qs(qual1).innerHTML = obj.rua;
        qual1 = '';
        fim1 = false;
    }

    if (fim1) {
        if (qs(qual1).innerHTML === obj.car) {
            fim();

            return;
        } else {
            add('.pontos');
            var pontos = parseInt(qs('.pontos').innerHTML);

            if (!(pontos % 5) && pontos > 0) {
                add('.velocidade');

                v -= 1;
                definaIntervalo(cb, v);
            }

            qs(qual1).innerHTML = obj.adv;
        }
    }

    if (qs('.rua1').innerHTML[0] === obj.adv) {
        fim1 = true;
        qual1 = '.lado1';
    }

    if (qs('.rua2').innerHTML[0] === obj.adv) {
        fim1 = true;
        qual1 = '.lado2';
    }

    if (qual2 && qs(qual2).innerHTML === obj.adv) {
        qs(qual2).innerHTML = obj.rua;
        qual2 = '';
        fim2 = false;
    }

    if (fim2) qs(qual2).innerHTML = obj.adv;

    var l1 = qs('.lado1').innerHTML;
    var l2 = qs('.lado2').innerHTML;

    if (l1 === obj.adv || l2 === obj.adv) {
        fim2 = true;

        qual2 = l1 === obj.adv ? '.u1' : '.u2';
    }

    if (l1 !== obj.car && l2 !== obj.car) {
        fim();
        return;
    }

    vezes = vezes === 15 ? 0 : vezes + 1;
};

var intervalo;

function definaIntervalo(callback, vel) {
    clearInterval(intervalo);

    intervalo = setInterval(callback, vel);
}

function resetarJogo() {
    qs('.lado1').innerHTML = obj.rua;
    qs('.lado2').innerHTML = obj.rua;

    var lado = ['.lado1', '.lado2'][rand(2)];

    qs(lado).innerHTML = obj.car;
    qs('.rua1').innerHTML = repetir(obj.rua, 15);
    qs('.rua2').innerHTML = repetir(obj.rua, 15);
    qs('.u1').innerHTML = obj.rua;
    qs('.u2').innerHTML = obj.rua;

    vezes = 0;
    fim1 = false;
    fim2 = false;
    qual1 = '';
    qual2 = '';
    v = 100;

    qs('.pontos').innerHTML = '0000000';
    qs('.velocidade').innerHTML = '000';
    qs('.seus-pontos').innerHTML = '0000000';
}

var inicio = true;
var final = false;
var pausado = false;

function pause(pausar) {
    qs('.jogo').hidden = pausar;
    qs('.pausado').hidden = !pausar;

    reproduz('typewriter_click');

    if (pausar) {
        qs('.pontos-pausado').innerHTML = qs('.pontos').innerHTML;
        clearInterval(intervalo);
    } else {
        definaIntervalo(cb, v);
    }

    pausado = pausar;
}

function jogue(doComeco) {
    if (!doComeco) resetarJogo();

    qs((doComeco ? '.inicio' : '.fim')).hidden = true;
    qs('.jogo').hidden = false;

    reproduz('typewriter_click');
    definaIntervalo(cb, v);

    if (doComeco) inicio = false;
    if (!doComeco) final = false;
}

addEventListener('keypress', function (event) {
    if (event.keyCode === 112 && !final && !inicio) pause(true);

    if (event.keyCode === 13) {
        if (!final && pausado) pause();
        if (!final && inicio) jogue(true);
        if (final) jogue();
    }
});

function mover(lado1, lado2) {
    qs('.lado1').innerHTML = lado1;
    qs('.lado2').innerHTML = lado2;

    reproduz('womp');
}

addEventListener('keydown', function (event) {
    if (event.keyCode === 38) mover(obj.car, obj.rua);
    if (event.keyCode === 40) mover(obj.rua, obj.car);
});

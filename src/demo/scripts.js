/* eslint-disable func-names,no-var,prefer-reflect,prefer-arrow-callback */
(function () {
    var win = window; // eslint-disable-line no-undef
    var FR = win.FileReader;
    var doc = win.document;
    var kjua = win.kjua;
    var options = {};

    var img = new Image();
    /*img.onload = function() {
        context.drawImage(this, 0, 0);
    };*/

    img.src = 'Nano_basic_logo_50pc.png';

    var guiValuePairs = [
        ['size', 'px'],
        ['width', 'x'],
        ['minversion', ''],
        ['quiet', ' modules'],
        ['rounded', '%'],
        ['msize', '%'],
        ['mposx', '%'],
        ['mposy', '%']
    ];

    function elById(id) {
        return doc.getElementById(id);
    }

    function valById(id) {
        var el = elById(id);
        return el && el.value;
    }

    function intById(id) {
        return parseInt(valById(id), 10);
    }

    function onEvent(el, type, fn) {
        el.addEventListener(type, fn);
    }

    function onReady(fn) {
        onEvent(doc, 'DOMContentLoaded', fn);

        // Init defaults
        options.items = [{
            mode: 'label',
            mSize: 20,
            mPosX: 9,
            mPosY: 50,
            label: 'NANO',
            fontname: 'Nunito',
            fontcolor: '#000000'
        },
        {
            mode: 'label',
            mSize: 14,
            mPosX: 74,
            mPosY: 47,
            label: 'NANO ACCEPTED HERE',
            fontname: 'Nunito',
            fontcolor: '#000000'
        },
        {
            mode: 'label',
            mSize: 10,
            mPosX: 84,
            mPosY: 63,
            label: 'Pay with NANO',
            fontname: 'Nunito',
            fontcolor: '#ee8a2e'
        },
        {
            mode: 'image',
            mSize: 9,
            mPosX: 70,
            mPosY: 62,
            label: '',
            fontname: 'Nunito',
            fontcolor: '#000000',
            image: img
        },
        {
            mode: 'label',
            mSize: 20,
            mPosX: 50,
            mPosY: 50,
            label: '',
            fontname: 'Nunito',
            fontcolor: '#000000'
        },
        {
            mode: 'label',
            mSize: 20,
            mPosX: 50,
            mPosY: 50,
            label: '',
            fontname: 'Nunito',
            fontcolor: '#000000'
        },
        {
            mode: 'label',
            mSize: 20,
            mPosX: 50,
            mPosY: 50,
            label: '',
            fontname: 'Nunito',
            fontcolor: '#000000'
        }
        ];
    }

    function forEach(list, fn) {
        Array.prototype.forEach.call(list, fn);
    }

    function all(query, fn) {
        var els = doc.querySelectorAll(query);
        if (fn) {
            forEach(els, fn);
        }
        return els;
    }

    function updateGui() {
        guiValuePairs.forEach(function (pair) {
            var label = all('label[for="' + pair[0] + '"]')[0];
            var text = label.innerHTML;
            label.innerHTML = text.replace(/:.*$/, ': ' + valById(pair[0]) + pair[1]);
        });
    }

    function updateQrCode() {
        options.render = valById('render');
        options.crisp = valById('crisp') === 'true';
        options.ecLevel = valById('eclevel');
        options.minVersion = intById('minversion');

        options.fill = valById('fill');
        options.back = valById('back');

        options.text = valById('text');
        options.size = intById('size');
        options.width = intById('width');
        options.rounded = intById('rounded');
        options.quiet = intById('quiet');

        if (!options.items) options.items = [];
        options.items[valById('item')] = {
            mode: valById('mode'),

            mSize: intById('msize'),
            mPosX: intById('mposx'),
            mPosY: intById('mposy'),

            label: valById('label'),
            fontname: valById('font'),
            fontcolor: valById('fontcolor'),

            image: elById('img-buffer')
        };
        var container = elById('container');
        var qrcode = kjua(options);
        forEach(container.childNodes, function (child) {
            container.removeChild(child);
        });
        if (qrcode) {
            container.appendChild(qrcode);
        }
    }

    function update() {
        updateGui();
        setTimeout(function () {
            updateQrCode();
        }, 250);
    }

    function onImageInput() {
        var input = elById('image');
        if (input.files && input.files[0]) {
            var reader = new FR();
            reader.onload = function (ev) {
                elById('img-buffer').setAttribute('src', ev.target.result);
                elById('mode').value = 4;
                setTimeout(update, 100);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function onItemChanged() {
        var item = valById('item');
        elById('mode').value = options.items[item].mode;
        elById('msize').value = options.items[item].mSize;
        elById('mposx').value = options.items[item].mPosX;
        elById('mposy').value = options.items[item].mPosY;
        elById('label').value = options.items[item].label;
        elById('font').value = options.items[item].fontname;
        elById('fontcolor').value = options.items[item].fontcolor;
        elById('img-buffer').value = options.items[item].image;
    }

    onReady(function () {
        onEvent(elById('item'), 'change', onItemChanged);
        onEvent(elById('image'), 'change', onImageInput);
        all('input, textarea, select', function (el) {
            onEvent(el, 'input', update);
            onEvent(el, 'change', update);
        });
        onEvent(win, 'load', update);
        update();
    });
}());
/* eslint-enable */

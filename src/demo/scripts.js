/* eslint-disable func-names,no-var,prefer-reflect,prefer-arrow-callback */
(function () {
    var win = window; // eslint-disable-line no-undef
    var FR = win.FileReader;
    var doc = win.document;
    var kjua = win.kjua;
    var options = {};

    var img = new Image();
    img.src = 'Nano_basic_logo.png';

    var img2 = new Image();
    img2.src = 'Nano_basic_dark.png';

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
            mode: 'image',
            mSize: 20,
            mPosX: 17,
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

            image: elById('img-buffer' + valById('item'))
        };
        var container = elById('container');
        var qrcode = kjua(options);
        forEach(container.childNodes, function (child) {
            container.removeChild(child);
        });
        if (qrcode) {
            container.appendChild(qrcode);
        }

        //console.log('getAsUriParameters(options)', getAsUriParameters(options));
        location.hash = encodeURIComponent('options=' + JSON.stringify(options));
        //location.hash = getAsUriParameters(options);
    }

    function getAsUriParameters (data) {
        return Object.keys(data).map(function (k) {
            if (_.isArray(data[k])) {
                return data[k].map(function (subData, index) {
                    var keyE = encodeURIComponent(k + '[' + index + ']');
                    return keyE + '=' + encodeURIComponent('{') + getAsUriParameters ( subData ) + encodeURIComponent('}');
                }).join('&');
            } else {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
            }
        }).join('&');
    };

    function update() {
        updateGui();
        setTimeout(function () {
            updateQrCode();
        }, 250);
        location.hash = encodeURIComponent('options=' + JSON.stringify(options));
    }

    function onImageInput() {
        var input = elById('image');
        if (input.files && input.files[0]) {
            var reader = new FR();
            reader.onload = function (ev) {
                elById('img-buffer' + valById('item')).setAttribute('src', ev.target.result);
                elById('mode').value = 'image';
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
        onModeChanged();
    }

    function onModeChanged() {
        if (elById('mode').value === 'label'){
            elById('fontblock').style.display = 'block';
            elById('imageblock').style.display = 'none';
        } else {
            elById('fontblock').style.display = 'none';
            elById('imageblock').style.display = 'block';
        }
    }

    onReady(function () {
        onEvent(elById('item'), 'change', onItemChanged);
        onEvent(elById('image'), 'change', onImageInput);
        onEvent(elById('mode'), 'change', onModeChanged);
        all('input, textarea, select', function (el) {
            onEvent(el, 'input', update);
            onEvent(el, 'change', update);
        });
        onEvent(win, 'load', update);
        onItemChanged();
        onModeChanged();
        console.log('location.hash',location.hash);
        console.log('location.hash.startsWith(#options)',location.hash.startsWith('#options'));
        if (location.hash.startsWith('#options')) {
            console.log('location.hash.substring(9)éé', decodeURIComponent(location.hash).substring(9));
            options = JSON.parse(decodeURIComponent(location.hash).substring(9));
            options.items[0].image = img2;
            options.items[3].image = img;
        }
        setTimeout(update, 100);
        console.log('window.location', JSON.stringify(window.location));
    });
}());
/* eslint-enable */

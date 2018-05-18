/* eslint-disable func-names,no-var,prefer-reflect,prefer-arrow-callback */
(function () {
    var win = window; // eslint-disable-line no-undef
    var FR = win.FileReader;
    var doc = win.document;
    var nanosign = win.nanosign;
    var options = {};

    const colorActive = '#ccffcc';
    const colorLoading = '#ffe6cc';
    const colorInactive = '#ff4d4d';

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

    function getHashValue(key) {
        var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
        return matches ? matches[1] : null;
      }

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
            msize: 20,
            mposx: 12,
            mposy: 50,
            label: 'NANO',
            fontname: 'Nunito',
            fontcolor: '#000000',
            stroke: true,
            imageurl: 'http://nanosign.org/Nano_basic_dark.png'
        },
        {
            mode: 'label',
            msize: 14,
            mposx: 74,
            mposy: 47,
            label: 'NANO ACCEPTED HERE',
            fontname: 'Nunito',
            fontcolor: '#000000',
            stroke: true
        },
        {
            mode: 'label',
            msize: 10,
            mposx: 84,
            mposy: 63,
            label: 'Pay with NANO',
            fontname: 'Nunito',
            fontcolor: '#ee8a2e',
            stroke: true
        },
        {
            mode: 'image',
            msize: 9,
            mposx: 60,
            mposy: 62,
            label: '',
            fontname: 'Nunito',
            fontcolor: '#000000',
            stroke: true,
            imageurl: 'http://nanosign.org/Nano_basic_logo.png'
        }
        ];
    }

    function newItem() {
        return {
            mode: 'label',
            msize: 9,
            mposx: 60,
            mposy: 62,
            label: 'New text',
            fontname: 'Nunito',
            fontcolor: '#000000',
            stroke: true
        };
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
        options.eclevel = valById('eclevel');
        options.background = valById('background');
        options.backgroundimageurl = valById('backgroundimageurl');
        options.minversion = intById('minversion');

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

            msize: intById('msize'),
            mposx: intById('mposx'),
            mposy: intById('mposy'),

            label: valById('label'),
            fontname: valById('font'),
            fontcolor: valById('fontcolor'),
            stroke: elById('stroke').checked,
            imageurl: valById('imageurl') ? valById('imageurl') : ''
        };
        forEach(options.items, function (item) {
            if (item && item.mode == 'image') {
                if (!item.image || item.image.src !== item.imageurl) {
                    if (!item.image || !item.image.src || item.image.src === ''){
                        item.image = new Image();
                    }
                    if (item.imageurl && item.imageurl !== '') {            
                        item.image.src = item.imageurl;
                        if (!item.image.complete) {
                            item.image.onload = function() {
                                update();
                            };
                        }
                    }
                }
            }
        });
        var container = elById('container');
        var qrcode = nanosign(options);
        forEach(container.childNodes, function (child) {
            container.removeChild(child);
        });
        if (qrcode) {
            container.appendChild(qrcode);
        }
    }

    function updateItemsLabel() {
        forEach(options.items, function (item, index) {
            if (item) {
                if (item.mode == 'label') {
                    elById('item').options[index].innerHTML = 'Item ' + (index + 1) + ' ' + item.label;
                } else {
                    elById('item').options[index].innerHTML = 'Item ' + (index + 1) + ' image';
                }
            }
        });
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
        updateQrCode();
    }

    function updateHash() {
        update();
        location.hash = 'content=' + encodeURIComponent(elById('text').value) + '&options=' + encodeURIComponent(JSON.stringify(options));
        updateItemsLabel();
    }

    function onImageInput() {
        var input = elById('image');
        if (input.files && input.files[0]) {
            var reader = new FR();
            reader.onload = function (ev) {
                elById('img-buffer' + valById('item')).setAttribute('src', ev.target.result);
                elById('mode').value = 'image';
                elById('imageurl').value = '';
                setTimeout(update, 100);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function onItemChanged() {
        var item = valById('item');
        if (!options.items[item]) {
            options.items[item] = newItem();
        }
        elById('mode').value = options.items[item].mode;
        elById('msize').value = options.items[item].msize;
        elById('mposx').value = options.items[item].mposx;
        elById('mposy').value = options.items[item].mposy;
        elById('label').value = options.items[item].label;
        elById('font').value = options.items[item].fontname;
        elById('fontcolor').value = options.items[item].fontcolor;
        elById('imageurl').value = options.items[item].imageurl;
        elById('stroke').checked = options.items[item].stroke;
        onModeChanged();
        updateItemsLabel();
    }

    function onModeChanged() {
        if (elById('mode').value === 'label'){
            elById('fontblock').style.display = 'block';
            elById('imageblock').style.display = 'none';
        } else {
            elById('fontblock').style.display = 'none';
            elById('imageblock').style.display = 'block';
            if (!elById('imageurl').value || elById('imageurl').value === 'undefined') {
                elById('imageurl').value = 'http://nanosign.org/Nano_basic_logo.png';
                var item = valById('item');
                options.items[item].imageurl = 'http://nanosign.org/Nano_basic_logo.png';
            } 
        }
    }

    function onImageInputChanged() {
        if (elById('imageinput').value === 'url'){
            elById('imageinputurlblock').style.display = 'block';
            elById('imageinputlocalblock').style.display = 'none';
        } else {
            elById('imageinputurlblock').style.display = 'none';
            elById('imageinputlocalblock').style.display = 'block';
        }
    }

    function onBackgroundChanged() {
        if (elById('background').value === 'transparent'){
            elById('backgroundcolorblock').style.display = 'none';
            elById('backgroundimageblock').style.display = 'none';
        } else if (elById('background').value === 'image'){
            elById('backgroundcolorblock').style.display = 'none';
            elById('backgroundimageblock').style.display = 'block';
        } else {
            elById('backgroundcolorblock').style.display = 'block';
            elById('backgroundimageblock').style.display = 'none';
        }
        updateHash();
    }

    function onFontNameChanged() {
        updateHash();
        loadFont(valById('font'));
    }

    function loadFont(font) {
        if (font) {
            WebFont.load( {
                google: { 
                    families: [font]
                },
                fontactive: function(familyName, fvd) {
                    elById('font').style.backgroundColor = colorActive;
                    update();
                },
                fontloading: function(familyName, fvd) {
                    if (elById('font').value === familyName){
                        elById('font').style.backgroundColor = colorLoading;
                    }
                },
                fontinactive: function(familyName, fvd) {
                    if (elById('font').value === familyName){
                        elById('font').style.backgroundColor = colorInactive;
                    }
                }
            });
        }
    }

    onReady(function () {
        onEvent(elById('item'), 'change', onItemChanged);
        onEvent(elById('image'), 'change', onImageInput);
        onEvent(elById('mode'), 'change', onModeChanged);
        
        all('input, textarea, select', function (el) {
            if (el.id === 'item') {
                onEvent(el, 'change', update);
            } else if (el.id === 'imageinput') {
                onEvent(el, 'change', onImageInputChanged);
            } else if (el.id === 'background') {
                onEvent(el, 'change', onBackgroundChanged);
            } else if (el.id === 'font') {
                onEvent(el, 'input', onFontNameChanged);
                onEvent(el, 'change', onFontNameChanged);
                onEvent(el, 'paste', onFontNameChanged); 
            } else {
                onEvent(el, 'input', updateHash);
                onEvent(el, 'change', updateHash);
                onEvent(el, 'paste', updateHash); 
            }
        });
        onEvent(win, 'load', update);
        onModeChanged();
        onImageInputChanged();
        if (getHashValue('options')) {
            options = JSON.parse(decodeURIComponent(getHashValue('options')));
            elById('size').value = options.size;
            elById('width').value = options.width;
            elById('fill').value = options.fill;
            elById('back').value = options.back;
            elById('text').value = options.text;
            elById('background').value = options.background;
            elById('minversion').value = options.minversion;
            elById('eclevel').value = options.eclevel;
            elById('quiet').value = options.quiet;
            elById('rounded').value = options.rounded;
                        
            elById('mode').value = options.items[0].mode;
            elById('msize').value = options.items[0].msize;
            elById('mposx').value = options.items[0].mposx;
            elById('mposy').value = options.items[0].mposy;
            elById('label').value = options.items[0].label;
            elById('font').value = options.items[0].font;
            elById('fontcolor').value = options.items[0].fontcolor;
            elById('stroke').value = options.items[0].stroke;
            elById('imageurl').value = options.items[0].imageurl;
        }

        forEach(options.items, function (item) {
            if (item && item.mode === 'label' && item.fontname) {
                loadFont(item.fontname);
            }
        });
        if (getHashValue('content')) {
            elById('text').value = decodeURIComponent(getHashValue('content'));
        }
        updateItemsLabel();
        setTimeout(update, 100);
    });
}());
/* eslint-enable */

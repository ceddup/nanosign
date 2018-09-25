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

    const templates = {
        simpleqr: '%7B%22items%22%3A%5B%7B%22mode%22%3A%22image%22%2C%22msize%22%3A0%2C%22mposx%22%3A12%2C%22mposy%22%3A50%2C%22label%22%3A%22NANO%22%2C%22fontname%22%3A%22undefined%22%2C%22fontbackground%22%3A%22color%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22fontimagetexture%22%3A%22http%3A%2F%2Fnanosign.org%2Fwood.jpg%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22http%3A%2F%2Fnanosign.org%2FNano_basic_dark.png%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A0%2C%22mposx%22%3A74%2C%22mposy%22%3A47%2C%22label%22%3A%22NANO%20ACCEPTED%20HERE%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontbackground%22%3A%22color%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22fontimagetexture%22%3A%22http%3A%2F%2Fnanosign.org%2Fwood.jpg%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22undefined%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A0%2C%22mposx%22%3A84%2C%22mposy%22%3A63%2C%22label%22%3A%22Pay%20with%20NANO%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontbackground%22%3A%22image%22%2C%22fontcolor%22%3A%22%23ee8a2e%22%2C%22fontimagetexture%22%3A%22http%3A%2F%2Fnanosign.org%2Fwood.jpg%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22undefined%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22image%22%2C%22msize%22%3A0%2C%22mposx%22%3A60%2C%22mposy%22%3A62%2C%22label%22%3A%22%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontbackground%22%3A%22color%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22fontimagetexture%22%3A%22http%3A%2F%2Fnanosign.org%2Fwood.jpg%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22http%3A%2F%2Fnanosign.org%2FNano_basic_logo.png%22%2C%22image%22%3A%7B%7D%7D%5D%2C%22render%22%3Anull%2C%22crisp%22%3Afalse%2C%22eclevel%22%3A%22H%22%2C%22background%22%3A%22color%22%2C%22backgroundimageurl%22%3A%22http%3A%2F%2Fnanosign.org%2Fmoon.jpg%22%2C%22minversion%22%3A1%2C%22fill%22%3A%22%23498ac7%22%2C%22back%22%3A%22%23ffffff%22%2C%22text%22%3A%22xrb%3Axrb_%3Cyour_nano_address%3E%22%2C%22size%22%3A300%2C%22width%22%3A1%2C%22rounded%22%3A100%2C%22quiet%22%3A2%2C%22qrcodefilltype%22%3A%22image%22%2C%22qrcodeimage%22%3A%22http%3A%2F%2Fnanosign.org%2Fmood.jpg%22%7D',
        ramisstyle: '%7B%22items%22%3A%5B%7B%22mode%22%3A%22image%22%2C%22msize%22%3A0%2C%22mposx%22%3A10%2C%22mposy%22%3A85%2C%22label%22%3A%22NANO%22%2C%22fontname%22%3A%22undefined%22%2C%22fontbackground%22%3A%22%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22fontimagetexture%22%3A%22undefined%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22http%3A%2F%2Fnanosign.org%2FNano_basic_dark.png%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A14%2C%22mposx%22%3A79%2C%22mposy%22%3A47%2C%22label%22%3A%22We%20Accept%20Nano%20Currency%22%2C%22fontname%22%3A%22Roboto%22%2C%22fontcolor%22%3A%22%23ffffff%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22http%3A%2F%2Fnanosign.org%2FNano_basic_logo.png%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A0%2C%22mposx%22%3A84%2C%22mposy%22%3A63%2C%22label%22%3A%22Pay%20with%20NANO%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontcolor%22%3A%22%239fa8da%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22undefined%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22image%22%2C%22msize%22%3A0%2C%22mposx%22%3A60%2C%22mposy%22%3A62%2C%22label%22%3A%22%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22http%3A%2F%2Fnanosign.org%2FNano_basic_logo.png%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A9%2C%22mposx%22%3A60%2C%22mposy%22%3A62%2C%22label%22%3A%22%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontcolor%22%3A%22%23000000%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22undefined%22%2C%22image%22%3A%7B%7D%7D%2C%7B%22mode%22%3A%22label%22%2C%22msize%22%3A5%2C%22mposx%22%3A45%2C%22mposy%22%3A62%2C%22label%22%3A%22Instant.%20Feeless.%20Secure.%22%2C%22fontname%22%3A%22Nunito%22%2C%22fontcolor%22%3A%22%239fa8da%22%2C%22stroke%22%3Atrue%2C%22imageurl%22%3A%22undefined%22%2C%22image%22%3A%7B%7D%7D%5D%2C%22render%22%3Anull%2C%22crisp%22%3Afalse%2C%22eclevel%22%3A%22H%22%2C%22minversion%22%3A1%2C%22fill%22%3A%22%239fa8da%22%2C%22back%22%3A%22%233f51b5%22%2C%22text%22%3A%22xrb%3Axrb_%3Cyour_nano_address%3E%22%2C%22size%22%3A350%2C%22width%22%3A3%2C%22rounded%22%3A100%2C%22quiet%22%3A3%2C%22background%22%3A%22color%22%2C%22backgroundimageurl%22%3A%22http%3A%2F%2Fnanosign.org%2Fmoon.jpg%22%2C%22qrcodefilltype%22%3A%22color%22%2C%22qrcodeimage%22%3A%22http%3A%2F%2Fnanosign.org%2Fmood.jpg%22%7D',
        texturedtext: '%7B"items"%3A%5B%7B"mode"%3A"image"%2C"msize"%3A0%2C"mposx"%3A12%2C"mposy"%3A50%2C"label"%3A"NANO"%2C"fontname"%3A"undefined"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fnanosign.org%2FNano_basic_dark.png"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"label"%2C"msize"%3A14%2C"mposx"%3A74%2C"mposy"%3A47%2C"label"%3A"NANO%20ACCEPTED%20HERE"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%7D%2C%7B"mode"%3A"label"%2C"msize"%3A10%2C"mposx"%3A84%2C"mposy"%3A63%2C"label"%3A"Pay%20with%20NANO"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"image"%2C"fontcolor"%3A"%23ee8a2e"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"undefined"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A9%2C"mposx"%3A60%2C"mposy"%3A62%2C"label"%3A""%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fnanosign.org%2FNano_basic_logo.png"%2C"image"%3A%7B%7D%7D%5D%2C"render"%3Anull%2C"crisp"%3Afalse%2C"eclevel"%3A"H"%2C"background"%3A"color"%2C"backgroundimageurl"%3A"http%3A%2F%2Fnanosign.org%2Fmoon.jpg"%2C"minversion"%3A1%2C"fill"%3A"%23498ac7"%2C"back"%3A"%23ffffff"%2C"text"%3A"xrb%3Axrb_<your_nano_address>"%2C"size"%3A350%2C"width"%3A3%2C"rounded"%3A100%2C"quiet"%3A2%2C"qrcodefilltype"%3A"image"%2C"qrcodeimage"%3A"http%3A%2F%2Fnanosign.org%2Fmood.jpg"%7D',
        moon: '%7B"items"%3A%5B%7B"mode"%3A"image"%2C"msize"%3A0%2C"mposx"%3A12%2C"mposy"%3A50%2C"label"%3A"NANO"%2C"fontname"%3A"undefined"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fnanosign.org%2FNano_basic_dark.png"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"label"%2C"msize"%3A14%2C"mposx"%3A74%2C"mposy"%3A47%2C"label"%3A"NANO%20ACCEPTED%20HERE"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Afalse%2C"imageurl"%3A"undefined"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"label"%2C"msize"%3A10%2C"mposx"%3A84%2C"mposy"%3A63%2C"label"%3A"Pay%20with%20NANO"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"image"%2C"fontcolor"%3A"%23ee8a2e"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Afalse%2C"imageurl"%3A"undefined"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A9%2C"mposx"%3A60%2C"mposy"%3A62%2C"label"%3A""%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fnanosign.org%2FNano_basic_logo.png"%2C"image"%3A%7B%7D%7D%5D%2C"render"%3Anull%2C"crisp"%3Afalse%2C"eclevel"%3A"H"%2C"background"%3A"image"%2C"backgroundimageurl"%3A"http%3A%2F%2Fnanosign.org%2Fmoon.jpg"%2C"minversion"%3A1%2C"fill"%3A"%230a243c"%2C"back"%3A"%23ffffff"%2C"text"%3A"xrb%3Axrb_<your_nano_address>"%2C"size"%3A300%2C"width"%3A3%2C"rounded"%3A100%2C"quiet"%3A2%2C"qrcodefilltype"%3A"color"%2C"qrcodeimage"%3A"http%3A%2F%2Fnanosign.org%2Fmood.jpg"%7D',
        banano: '%7B"items"%3A%5B%7B"mode"%3A"image"%2C"msize"%3A24%2C"mposx"%3A27%2C"mposy"%3A50%2C"label"%3A"NANO"%2C"fontname"%3A"undefined"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcS8hi82MnA5_J9QtofKmBbDce6v2Yi8LHWFy8kKc9eVpfnP2GelVg"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"label"%2C"msize"%3A14%2C"mposx"%3A74%2C"mposy"%3A88%2C"label"%3A"BANANO%20MAY%20BEACCEPTED%20HERE"%2C"fontname"%3A"Shadows%20Into%20Light"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23400080"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"undefined"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"label"%2C"msize"%3A10%2C"mposx"%3A84%2C"mposy"%3A63%2C"label"%3A"Pay%20with%20bananas"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23ee8a2e"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"undefined"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A9%2C"mposx"%3A59%2C"mposy"%3A62%2C"label"%3A""%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"color"%2C"fontcolor"%3A"%23000000"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fwww.whats4eats.com%2Ffiles%2Fingredients-green-bananas-bunch-wikimedia-Rosendahl-4x3.jpg"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A37%2C"mposx"%3A100%2C"mposy"%3A0%2C"label"%3A"BANANO%20MAY%20BEACCEPTED%20HERE"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"image"%2C"fontcolor"%3A"%23400080"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"https%3A%2F%2Fwww.cremadelechealqueria.com%2Fsites%2Falqueria-dev%2Ffiles%2Fstyles%2F650_x_350%2Fpublic%2Fhelado_de_banano.png%3Fitok%3DUqDmmU-7"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A20%2C"mposx"%3A46%2C"mposy"%3A0%2C"label"%3A"BANANO%20MAY%20BEACCEPTED%20HERE"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"image"%2C"fontcolor"%3A"%23400080"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"https%3A%2F%2Fbanano.co.in%2Fapp%2Fuploads%2F2018%2F04%2Fbanano-coin.jpg"%2C"image"%3A%7B%7D%7D%2C%7B"mode"%3A"image"%2C"msize"%3A40%2C"mposx"%3A100%2C"mposy"%3A0%2C"label"%3A"BANANO%20MAY%20BEACCEPTED%20HERE"%2C"fontname"%3A"Nunito"%2C"fontbackground"%3A"image"%2C"fontcolor"%3A"%23400080"%2C"fontimagetexture"%3A"http%3A%2F%2Fnanosign.org%2Fwood.jpg"%2C"stroke"%3Atrue%2C"imageurl"%3A"http%3A%2F%2Fnanosign.org%2Fold_dude.png"%2C"image"%3A%7B%7D%7D%5D%2C"render"%3Anull%2C"crisp"%3Afalse%2C"eclevel"%3A"H"%2C"background"%3A"color"%2C"backgroundimageurl"%3A"http%3A%2F%2Fnanosign.org%2Fmoon.jpg"%2C"minversion"%3A1%2C"fill"%3A"%23008000"%2C"back"%3A"%23ffff00"%2C"text"%3A"xrb%3Axrb_1cmaqpxehsc9r64t3zwof1y5p6gdup6towixsu6bu35srz1f8dgymd8skktc"%2C"size"%3A350%2C"width"%3A3%2C"rounded"%3A100%2C"quiet"%3A2%2C"qrcodefilltype"%3A"color"%2C"qrcodeimage"%3A"http%3A%2F%2Fnanosign.org%2Fmood.jpg"%7D'
    }

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
            fontbackground : 'color',
            fontcolor: '#000000',
            fontimagetexture: 'http://nanosign.org/wood.jpg',
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
            fontbackground : 'color',
            fontcolor: '#000000',
            fontimagetexture: 'http://nanosign.org/wood.jpg',
            stroke: true
        },
        {
            mode: 'label',
            msize: 10,
            mposx: 84,
            mposy: 63,
            label: 'Pay with NANO',
            fontname: 'Nunito',
            fontbackground : 'color',
            fontcolor: '#ee8a2e',
            fontimagetexture: 'http://nanosign.org/wood.jpg',
            stroke: true
        },
        {
            mode: 'image',
            msize: 9,
            mposx: 60,
            mposy: 62,
            label: '',
            fontname: 'Nunito',
            fontbackground : 'color',
            fontcolor: '#000000',
            fontimagetexture: 'http://nanosign.org/wood.jpg',
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
            fontbackground : color,
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
        options.crisp = true;
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
        options.qrcodefilltype = valById('qrcodefilltype');
        options.qrcodeimage = valById('qrcodeimage');

        if (!options.items) options.items = [];
        options.items[valById('item')] = {
            mode: valById('mode'),

            msize: intById('msize'),
            mposx: intById('mposx'),
            mposy: intById('mposy'),

            label: valById('label'),
            fontname: valById('font'),
            fontbackground: valById('fontbackground'),
            fontcolor: valById('fontcolor'),
            fontimagetexture: valById('fontimagetexture'),
            stroke: elById('stroke').checked,
            imageurl: valById('imageurl') ? valById('imageurl') : '',
            image: elById('img-buffer' + valById('item'))
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
        elById('fontbackground').value = options.items[item].fontbackground;
        elById('fontcolor').value = options.items[item].fontcolor;
        elById('fontimagetexture').value = options.items[item].fontimagetexture;
        elById('imageurl').value = options.items[item].imageurl;
        elById('stroke').checked = options.items[item].stroke;
        onModeChanged();
        updateItemsLabel();
        updateFontBackgroundBlocks();    
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
        updateBackgroundBlocks();
        updateHash();
    }

    function updateBackgroundBlocks() {
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
    }

    function onQRCodeFillTypeChanged() {
        updateQRFillBlocks();
        updateHash();
    }

    function updateQRFillBlocks() {
        if (elById('qrcodefilltype').value === 'none'){
            elById('qrcodefillcolorblock').style.display = 'none';
            elById('qrcodefillimageblock').style.display = 'none';
        } else if (elById('qrcodefilltype').value === 'color'){
            elById('qrcodefillcolorblock').style.display = 'block';
            elById('qrcodefillimageblock').style.display = 'none';
        } else { // image
            elById('qrcodefillcolorblock').style.display = 'none';
            elById('qrcodefillimageblock').style.display = 'block';
        }
    }

    function onFontBackgroundChanged() {
        updateFontBackgroundBlocks();
        updateHash();
    }

    function updateFontBackgroundBlocks() {
        if (elById('fontbackground').value === 'color') {
            elById('fontimagetextureblock').style.display = 'none';
            elById('fontimagecolorblock').style.display = 'block';
        } else { // image
            elById('fontimagetextureblock').style.display = 'block';
            elById('fontimagecolorblock').style.display = 'none';
        }
    }

    function onFontNameChanged() {
        updateHash();
        loadFont(valById('font'));
    }

    function onTemplateChanged() {
        if (valById('template') !== 'default') {
            location.hash = 'template=' + valById('template');
            loadPage(templates[valById('template')]);
            setTimeout(update, 100);
        } else {
            history.pushState('', document.title, window.location.pathname + window.location.search);
            location.reload();
        }
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
            } else if (el.id === 'qrcodefilltype') {
                onEvent(el, 'change', onQRCodeFillTypeChanged);
            } else if (el.id === 'fontbackground') {
                onEvent(el, 'change', onFontBackgroundChanged);
            } else if (el.id === 'template') {
                onEvent(el, 'change', onTemplateChanged);
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

        if (getHashValue('template')) {
            elById('template').value = getHashValue('template');
            loadPage(templates[valById('template')]);
        } else {
            loadPage(getHashValue('options'));
        }
            
        setTimeout(update, 100);
    });

    function loadPage(optionsString) {
        onModeChanged();
        onImageInputChanged();
        if (optionsString) {
            setOptions(optionsString)
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
        updateBackgroundBlocks();
        updateQRFillBlocks();
        updateFontBackgroundBlocks()
    }

    function setOptions(optionsString) {
        if (optionsString) {
            options = JSON.parse(decodeURIComponent(optionsString));
            elById('size').value = options.size;
            elById('width').value = options.width;
            elById('fill').value = options.fill;
            elById('back').value = options.back;
            elById('text').value = options.text;
            elById('background').value = options.background;
            elById('qrcodefilltype').value = options.qrcodefilltype;
            elById('qrcodeimage').value = options.qrcodeimage ? options.qrcodeimage : 'http://nanosign.org/mood.jpg';
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
            elById('fontbackground').value = options.items[0].fontbackground;
            elById('fontcolor').value = options.items[0].fontcolor;
            elById('fontimagetexture').value = options.items[0].fontimagetexture;
            elById('stroke').value = options.items[0].stroke;
            elById('imageurl').value = options.items[0].imageurl;
        }
    }

}());
/* eslint-enable */

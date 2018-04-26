const {createCanvas, canvasToImg, dpr} = require('./lib/dom');
const defaults = require('./lib/defaults');
const qrcode = require('./lib/qrcode');
const draw = require('./lib/draw');

module.exports = options => {
    const settings = Object.assign({}, defaults, options);

    const qr = qrcode(settings.text, settings.eclevel, settings.minversion, settings.quiet);
    const ratio = settings.ratio || dpr;
    const canvas = createCanvas(settings.size, ratio, settings.width);
    const context = canvas.getContext('2d');

    context.scale(ratio, ratio);
    draw(qr, context, settings);

    return settings.render === 'image' ? canvasToImg(canvas) : canvas;
};

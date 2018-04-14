const drawLabel = (context, settings, item) => {
    if (item.label) {
        const size = settings.size;
        const font = item.mSize * 0.01 * size + 'px ' + item.fontname;

        context.strokeStyle = settings.back;
        context.lineWidth = item.mSize * 0.01 * size * 0.1;
        context.fillStyle = item.fontcolor;
        context.font = font;

        const w = context.measureText(item.label).width;
        const sh = item.mSize * 0.01;
        const sw = w / (settings.width * size);
        const sl = (1 - sw) * (item.mPosX * settings.width) * 0.01;
        const st = (1 - sh) * item.mPosY * 0.01;
        const x = sl * size;
        const y = st * size + 0.75 * item.mSize * 0.01 * size;

        context.strokeText(item.label, x, y);
        context.fillText(item.label, x, y);
    }
};

const drawImage = (context, settings, item) => {
    const size = settings.size;
    const w = item.image.naturalWidth || 1;
    const h = item.image.naturalHeight || 1;
    const sh = item.mSize * 0.01;
    const sw = sh * w / h;
    const sl = (1 - sw) * item.mPosX * 0.01;
    const st = (1 - sh) * item.mPosY * 0.01;
    const x = sl * size * settings.width;
    const y = st * size;
    const iw = sw * size;
    const ih = sh * size;

    context.drawImage(item.image, x, y, iw, ih);
};

const drawMode = (context, settings) => {
    for (const item of settings.items) {
        if (item.mode === 'label') {
            drawLabel(context, settings, item);
        } else if (item.mode === 'image') {
            drawImage(context, settings, item);
        }
    }
};

module.exports = drawMode;

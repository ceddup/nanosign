const drawLabel = (item, context, settings) => {
	return new Promise(function(resolve) {
        if (item.label) {
            const size = settings.size;
            const font = item.msize * 0.01 * size + 'px ' + item.fontname;

            context.strokeStyle = settings.back;
            context.lineWidth = item.msize * 0.01 * size * 0.1;
            context.fillStyle = item.fontcolor;
            context.font = font;

            const w = context.measureText(item.label).width;
            const sh = item.msize * 0.01;
            const sw = w / (settings.width * size);
            const sl = (1 - sw) * (item.mposx * settings.width) * 0.01;
            const st = (1 - sh) * item.mposy * 0.01;
            const x = sl * size;
            const y = st * size + 0.75 * item.msize * 0.01 * size;

            if (item.stroke) context.strokeText(item.label, x, y);
            if (item.label === 'Pay with NANO'){
                drawTexturedText(resolve, context, item, 'http://www.bittbox.com/wp-content/uploads/2008/04/free_hires_wood_texture_5.jpg', x, y);
            } else {
                context.fillText(item.label, x, y);
                resolve();
            }
        } else {
            resolve();
        }
    });
};

function drawTexturedText(resolve, ctx, item, imgsrc, x, y) {
	var img = document.createElement("img");
    img.onload= function(){
        drawTexturedTextWhenImageLoaded(resolve, ctx, item, img, x, y);
    }
    img.src=imgsrc;
}

function drawTexturedTextWhenImageLoaded(resolve, ctx, item, img, x, y) {
    var can1 = getNewCanvas(ctx.canvas);
    var ctx1 = can1.getContext("2d");

    ctx1.strokeStyle = ctx.strokeStyle;
    ctx1.lineWidth = ctx.lineWidth;
    ctx1.fillStyle = ctx.fillStyle;
    ctx1.font = ctx.font;
    ctx1.fillText(item.label, x, y);
    ctx1.globalCompositeOperation = "source-in";
    ctx1.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(can1, 0, 0);
    document.body.removeChild(can1);
    resolve();
}

// call document.body.removeChild(<returnedcanvas>); when done
function getNewCanvas(canvas) {
  var canv = document.createElement('canvas');
  canv.id = 'tempcanvas';
  canv.height = canvas.height;
  canv.width = canvas.width;
  canv.style.display = 'none';
  document.body.appendChild(canv);
  return document.getElementById('tempcanvas');
}

const drawImage = (item, context, settings) => {
	return new Promise(function(resolve) {
        const size = settings.size;
        const w = item.image.naturalWidth || 1;
        const h = item.image.naturalHeight || 1; 
        const sh = item.msize * 0.01;
        const sw = sh * w / (h * settings.width);
        const sl = (1 - sw) * item.mposx * 0.01;
        const st = (1 - sh) * item.mposy * 0.01;
        const x = sl * size * settings.width;
        const y = st * size;
        const iw = sw * size * settings.width;
        const ih = sh * size;

        context.drawImage(item.image, x, y, iw, ih);
        resolve();
    });
};

const drawItem = (item, context, settings) => {
    if (item.mode === 'label') {
        return drawLabel(item, context, settings);
    } else if (item.mode === 'image') {
        return drawImage(item, context, settings);
    }
}

const drawItemPromise = (item, context, settings) =>
  drawItem(item, context, settings).then(() => {})

const drawMode = (context, settings) => {
	return new Promise(function(resolve) {
        settings.items.reduce(
            (p, item) =>
                p.then(_ => drawItemPromise(item, context, settings)),
                Promise.resolve()
        );
    });
};

module.exports = drawMode;

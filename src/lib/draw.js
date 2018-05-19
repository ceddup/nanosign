const drawModuleRounded = require('./drawRounded');
const drawMode = require('./drawMode');

const drawBackground = (context, settings) => {
	return new Promise(function(resolve) {
        if (settings.background === 'color') {
            context.fillStyle = settings.back;
            context.fillRect(0, 0, settings.size * settings.width, settings.size);
            resolve();
        } else if (settings.background === 'image') {
            settings.backgroundimage = new Image();
            settings.backgroundimage.src = settings.backgroundimageurl;
            settings.backgroundimage.onload = function() {
                context.drawImage(settings.backgroundimage, 0, 0);
                resolve();
            };
            settings.backgroundimage.onerror = function() {
                resolve();
            };
        } else {
            resolve();
        }
    });
};

const drawModuleDefault = (qr, context, settings, width, row, col) => {
    if (qr.isDark(row, col)) {
        context.rect(col * width, row * width, width, width);
    }
};

const drawModules = (qr, context, settings) => {
	return new Promise(function(resolve) {
        if (!qr) {
            return;
        }

        const drawModule = settings.rounded > 0 && settings.rounded <= 100 ? drawModuleRounded : drawModuleDefault;
        const moduleCount = qr.moduleCount;

        let moduleSize = settings.size / moduleCount;
        let offset = 0;
        if (settings.crisp) {
            moduleSize = Math.floor(moduleSize);
            offset = Math.floor((settings.size - moduleSize * moduleCount) / 2);
        }

        context.translate(offset, offset);
        context.beginPath();
        for (let row = 0; row < moduleCount; row += 1) {
            for (let col = 0; col < moduleCount; col += 1) {
                drawModule(qr, context, settings, moduleSize, row, col);
            }
        }
        context.fillStyle = settings.fill;
        if (settings.qrcodefilltype === 'image') {
            var img = document.createElement('img');
            img.src='https://news.files.bbci.co.uk/include/shorthand/40076/media/sea-l_gbqwvrs-mr_4pkq6di.jpg';
            //draw the text
            img.onload= function(){
                drawQR(context, img);
                context.translate(-offset, -offset);
                resolve();
            }
        } else if (settings.qrcodefilltype === 'color') {
            context.translate(-offset, -offset);
            context.fill();
            resolve();
        } else { // transparent
            resolve();
        }
    });
};

function drawQR(ctx, img) {
    ctx.fillStyle = ctx.createPattern(img, 'repeat');
    ctx.fill();
};

const draw = (qr, context, settings) => {
    drawBackground(context, settings)
    .then(x => drawModules(qr, context, settings))
    .then(x => drawMode(context, settings));
};

module.exports = draw;

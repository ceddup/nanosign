module.exports = {
    // render method: 'canvas' or 'image'
    render: 'image',

    // render pixel-perfect lines
    crisp: true,

    // minimum version: 1..40
    minversion: 1,

    // error correction level: 'L', 'M', 'Q' or 'H'
    eclevel: 'L',

    // size in pixel
    size: 200,

    // pixel-ratio, null for devicePixelRatio
    ratio: null,

    // code color
    fill: '#333',

    // background color
    back: '#fff',

    // content
    text: 'no text',

    // roundend corners in pc: 0..100
    rounded: 0,

    // quiet zone in modules
    quiet: 0,

    // modes: 'plain', 'label' or 'image'
    mode: 'plain',

    // label/image size and pos in pc: 0..100
    msize: 30,
    mposx: 50,
    mposy: 50,

    // label
    label: 'no label',
    fontname: 'sans',
    fontcolor: '#333',

    // image element
    image: null
};

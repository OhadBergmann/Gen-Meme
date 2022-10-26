'use strict'

let gElCanvas;
let gCtx;

function onImgSelect(el){
    gElCanvas = document.querySelector('.meme-editor .meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    createCurrMeme(el.dataset.id);
    onToggleEditor();
    _resizeCanvas();
    _setEventListener();
    renderMeme()
}

function renderMeme(){
    drawImgFromMeme(getCurrMeme());
}


function onMove(){

}

function onDown(){

}

function onUp(){
    
}

function drawImgFromMeme(meme) {
    const image = getImagesFromId(meme.imgId);
    gElCanvas.setAttribute('data-imgid',`${meme.imgId}`);
    const img = new Image();
    console.log(image);
    img.src = image.url;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

}

function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}

function _setEventListener(){
    if(!gElCanvas) return;

    window.addEventListener('resize', _resizeCanvas);

    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function _resizeCanvas() {
    const elCanvasContainer = document.querySelector('section.meme-editor .editor-container');
    //TODO : add different clal for other sizes then 500X500
    let CurrHieght = elCanvasContainer.offsetHeight;
    let CurrWidth = (CurrHieght * 500) / 500
    gElCanvas.setAttribute('width',`${CurrWidth}`);
    gElCanvas.setAttribute('height', `${CurrHieght}`);

    renderMeme();
}

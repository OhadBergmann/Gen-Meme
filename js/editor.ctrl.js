'use strict'

let gElCanvas;
let gCtx;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];

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
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    }
}

function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}

function getEvPos(ev) {
    if (TOUCH_EVS.includes(ev.type)) {
      ev.preventDefault();
      ev = ev.changedTouches[0];
      return{
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
    }
    return {x: ev.offsetX, y: ev.offsetY}
}

function _setEventListener(){
    

    /* screen events*/
    window.addEventListener('resize', _resizeCanvas);

    if(!gElCanvas) return;
    /* only for canvas: mouse events*/
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);

    /* only for canvas: touch events*/
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
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

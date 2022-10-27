'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];

let gElCanvas;
let gCtx;
let gLineIdx = 0;
var gCurrCbS = null;

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
    _drawImgFromMeme(getCurrMeme(),gCurrCbS);
    gCurrCbS = null;
}


function onMove(){

}

function onDown(){

}

function onUp(){
    
}

function onFontSizeChange(val){
    setLineFontSize(gLineIdx ,(getLineFontSize(gLineIdx) + val))
}

function onAlignText(alingment) {
    setLineAlignment(gLineIdx,alingment);
    const elInput = document.querySelector('.canvas-controller .txt-line');
    switch (alingment) {
        case 'left':
            elInput.classList.add('txt-left');
            elInput.classList.remove('txt-center');
            elInput.classList.remove('txt-right');
            break;
        case 'center':
            elInput.classList.add('txt-center');
            elInput.classList.remove('txt-left');
            elInput.classList.remove('txt-right');
            break;
        case 'right':
            elInput.classList.add('txt-right');
            elInput.classList.remove('txt-center');
            elInput.classList.remove('txt-left');
            break;
    }
}
function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}

function onGetTxtFromInput(){
    const currTxt = document.querySelector('.canvas-controller .txt-line').value;
    setLineTxt(gLineIdx,currTxt);

    gCurrCbS = [];
    gCurrCbS.push(_drawRect);
    gCurrCbS.push(_drawText)
    renderMeme();
}

function _drawText(){
    const txt = getLineTxt(gLineIdx)
    gCtx.font = `${getLineFontSize(gLineIdx)}px ${getLineFamily(gLineIdx)}`;
    const {x,y} = getLineRect(gLineIdx).botL;

    console.log(txt)
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function _drawRect() {
    let currMeme = getCurrMeme()

    const elInput = document.querySelector('.meme-canvas');
    const {x,y} = _getPosFromMeme(currMeme,gLineIdx);

    let height = currMeme.lines[gLineIdx].size * 2;
    let width = +elInput.getAttribute('width') -20;
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = '#059bb647';
    gCtx.strokeRect(x, y, width , height);
}


function _drawImgFromMeme(meme,callbacks) {
    const image = getImagesFromId(meme.imgId);
    gElCanvas.setAttribute('data-imgid',`${meme.imgId}`);
    const img = new Image();
    
    img.src = image.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        if(callbacks){
            callbacks.forEach((cb)=>{
                cb();
            });
        }
    }
}

function _getPosFromMeme(meme, lineidx){
    return meme.lines[lineidx].rect.topL;
}

function _getEventPos(ev) {
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

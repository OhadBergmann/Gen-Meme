'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];
const CANVAS_IMAGE_PADDING = 30; 

let gElCanvas;
let gCtx;
let gLineIdx = 0;
let gCurrCbS = null;
let gRectStyle = {fill: false, outer: true}



function onImgSelect(el){
    const fontSize = parseInt(getComputedStyle(document.querySelector('.canvas-controller .txt-line')).fontSize);
    gElCanvas = document.querySelector('.meme-editor .meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    onToggleEditor();
    setEventListener();
    createCurrMeme(el.dataset.id, gElCanvas.width,gElCanvas.height,fontSize,CANVAS_IMAGE_PADDING);
    //NOTE: _resizeCanvas all ready calls to renderMeme();
     resizeCanvas();
}

function renderMeme(){
    getMemeLines().forEach((line,idx)=>{
        if(line.isVisible){
            gLineIdx = idx;
            gCurrCbS = [];
            gCurrCbS.push(drawRect);
            gCurrCbS.push(drawText);
        }
    });
    drawImage();
    gCurrCbS = null;
}


function onMove(){

}

function onDown(){

}

function onUp(){
    
}

function onFontSizeChange(val){
    setLineFontSize(gLineIdx ,(getLineFontSize(gLineIdx) + val));
    renderMeme();
}

function onAlignText(alingment) {
    setLineAlign(gLineIdx,alingment);
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
    renderMeme();
}
function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}


function onToggleOuterLine(){
    gRectStyle.outer = !gRectStyle.outer;
    renderMeme();
}

function onToggleFill(){
    gRectStyle.fill = !gRectStyle.fill;
    renderMeme();
}

function onGetTxtFromInput(){
    const currTxt = document.querySelector('.canvas-controller .txt-line').value;
    setLineTxt(gLineIdx,currTxt);
    renderMeme();
}

function onFontSelect(){
    const elInput = document.querySelector('.canvas-controller .txt-line');
    const FontFamily = document.querySelector('.font-selection').value;
    setLineFamily(gLineIdx, FontFamily);
    elInput.classList.value = `txt-line txt-Left`;
    if(!elInput.classList.contains(`toggle-${FontFamily}`)){
        elInput.classList.add(`toggle-${FontFamily}`);
    }
    renderMeme();
}
function drawImage() {
    const currImgId = getImageIdFromMeme();
    const image = getImageFromId(currImgId);
    const cds = gCurrCbS; //NOTE: the declaration of this variable is for closure reasons (for the onload function)
    gElCanvas.setAttribute('data-imgid',`${currImgId}`);
    const img = new Image();
    
    img.src = image.url;
    img.onload = ()=>{
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        if(cds){
            cds.forEach((cb)=>{
                cb();
            });
        }
    }
}

function drawText(){
    const txt = getLineTxt(gLineIdx)
    var pos = {};
    const fontsize = getLineFontSize(gLineIdx);
    gCtx.font = `${fontsize}px ${getLineFamily(gLineIdx)}`;
    gCtx.textAlign = getLineAlign(gLineIdx);
    
    switch (gCtx.textAlign) {
        case 'left':
            pos = getLineRect(gLineIdx).botL;
            break;
        case 'center':
            pos = getLineRect(gLineIdx).botM;
            break;
        case 'right':
            pos = getLineRect(gLineIdx).botR;
            break;
    }

    gCtx.fillStyle = '#ffffff';
    gCtx.fillText(txt, pos.x*2, (pos.y - (fontsize + CANVAS_IMAGE_PADDING)/2));
    gCtx.strokeStyle= '#0000004d';
    gCtx.strokeText(txt, pos.x*2, (pos.y - (fontsize + CANVAS_IMAGE_PADDING)/2));   
}

function drawRect() {
    if(!gRectStyle.fill && !gRectStyle.outer) return;

    const elInput = document.querySelector('.meme-canvas');
    const {x,y} = getLineRect(gLineIdx).topL;

    let height = getLineFontSize(gLineIdx) * 1.5;
    let width = +document.querySelector('.meme-canvas').width -CANVAS_IMAGE_PADDING*2;
    gCtx.lineWidth = 5;

    if(gRectStyle.fill){
        gCtx.fillStyle = '#ffffff59';
        gCtx.fillRect(x, y, width , height);
    }
    
    if(gRectStyle.outer){
        gCtx.strokeStyle = '#ffffffb3';
        gCtx.strokeRect(x, y, width , height);
    }
   
}




function getEventPos(ev) {
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

function setEventListener(){
    
    /* screen events*/
    window.addEventListener('resize', resizeCanvas);

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

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('section.meme-editor .editor-container');
    //TODO : add different clal for other sizes then 500X500
    let CurrWidth = elCanvasContainer.offsetWidth;
    let CurrHieght = CurrWidth;
    gElCanvas.width = CurrWidth;
    gElCanvas.height = CurrHieght;
    gElCanvas.style.height = `${CurrHieght}`;
    renderMeme();
}

'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']; 

let gElCanvas;
let gCtx;
let gLineIdx = 0;
let gCurrCbS = null;
let gRectStyle = {fill: false, outer: true};



function onImgSelect(el){
    onToggleEditor();
    gElCanvas = document.querySelector('.editor-container .meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    createCurrMeme(el.dataset.id,20);
    gElCanvas.setAttribute('data-imgid',`${getImageIdFromMeme()}`);
    setEventListener();
    resizeCanvas()
}

function renderMeme(){
    getMemeLines().forEach((line,idx)=>{
        if(line.isVisible){
            gLineIdx = idx;
            gCurrCbS = [];
           // gCurrCbS.push(drawRect);
            gCurrCbS.push(drawText);
        }
    });

    const image = getImageFromId(getImageIdFromMeme());
    drawImage(image,0,0,gElCanvas.width,gElCanvas.height);
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

    const elInput = document.querySelector('.txt-editor-container .current-line');
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
    const elEditor = document.querySelector('.main-editor-container');
    elEditor.classList.contains('hidden') ? elEditor.classList.remove('hidden') : elEditor.classList.add('hidden');
    onTogglebCoverGallery();
}

function onTogglebCoverGallery(){
    const elCovor = document.querySelector('.gallery-cover');
    elCovor.classList.contains('hidden') ? elCovor.classList.remove('hidden') : elCovor.classList.add('hidden');
}

function onToggleOuterLine(){
    gRectStyle.outer = !gRectStyle.outer;
    renderMeme();
}

function onToggleFill(){
    gRectStyle.fill = !gRectStyle.fill;
    renderMeme();
}

function onTxtFromInput(){
    const currTxt = document.querySelector('.txt-editor-container .current-line').value;
    setLineTxt(gLineIdx,currTxt);
    renderMeme();
}

function onFontSelect(){
    const elInput = document.querySelector('.txt-editor-container .current-line');
    const FontFamily = document.querySelector('.font-selection').value;
    setLineFamily(gLineIdx, FontFamily);

    elInput.classList.value = `current-line txt-Left`;
    if(!elInput.classList.contains(`toggle-${FontFamily}`)){
        elInput.classList.add(`toggle-${FontFamily}`);
    }

    renderMeme();
}

function onColorPicked(el) {
    setLineColor(gLineIdx, el.value);
    renderMeme();
}

function onOpenMenu(){
    
    const elMenu = document.querySelector('.nav-bar-container ul');
    const links = document.querySelectorAll('.nav-bar-container ul li');
    const elMenuBtn = document.querySelector('.nav-bar-container .menu-btn');
    const elCloseBtn = document.querySelector('.nav-bar-container .close-menu-btn');

    onTogglebCoverGallery();
    elMenuBtn.classList.add('hidden');
    elCloseBtn.classList.remove('hidden');

    if(elMenu.classList.contains('scale-zero')) elMenu.classList.remove('scale-zero');
    setTimeout(()=>{
        links.forEach((link)=>{
            if(link.classList.contains('op-zero')) link.classList.remove('op-zero');
        })
       
    },350)
}

function onCloseMenu(){
    const elMenu = document.querySelector('.nav-bar-container ul');
    const links = document.querySelectorAll('.nav-bar-container ul li');
    const elMenuBtn = document.querySelector('.nav-bar-container .menu-btn');
    const elCloseBtn = document.querySelector('.nav-bar-container .close-menu-btn');

    onTogglebCoverGallery();
    elCloseBtn.classList.add('hidden');
    elMenuBtn.classList.remove('hidden');
    

    links.forEach((link)=>{
        if(!link.classList.contains('op-zero')) link.classList.add('op-zero');
    })

    setTimeout(()=>{
        if(!elMenu.classList.contains('scale-zero')) elMenu.classList.add('scale-zero');
    },350)
}



/* --------------------------------------- INNER FUNCTIONS ---------------------------------------*/

function drawImage(image,x,y,endX,endY) {
    const cds = gCurrCbS; //NOTE: the declaration of this variable is for closure reasons (for the onload function)
    const img = new Image();
    
    img.src = image.url;
    img.onload = ()=>{
        gCtx.drawImage(img, x, y, endX, endY);
        if(cds){
            cds.forEach((cb)=>{
                cb();
            });
        }
    }
}

function drawText(){
    // text padding from the sides
    // txt height\width structure: bios || font size || bios 

    const bios = 2.5;
    const width = gElCanvas.width;
    const height = gElCanvas.height;
    const txt = getLineTxt(gLineIdx)
    let x,y;
    const fontSize = getLineFontSize(gLineIdx);
    const fontFamily = getLineFamily(gLineIdx);
    
    switch (getLineAlign(gLineIdx)) {
        case 'left':
            if(gLineIdx === 0){
                x = bios*2;
                y = fontSize + bios
            } else if (gLineIdx === getMemeLines().length - 1){
                x = bios*2;
                y = height - bios*2;
            }
            break;
        case 'center':
            if(gLineIdx === 0){
                x = width/2 - bios*2;
                y = fontSize + bios
            } else if (gLineIdx === getMemeLines().length - 1){
                x = width/2 - bios*2;
                y = height - bios*2;
            }
            break;
        case 'right':
            if(gLineIdx === 0){
                x = width - bios*2;
                y = fontSize + bios
            } else if (gLineIdx === getMemeLines().length - 1){
                x = width - bios*2;
                y = height - bios*2;
            }
            break;
    }

    gCtx.font = `${fontSize}px ${fontFamily}`;
    gCtx.textAlign = getLineAlign(gLineIdx);
    gCtx.fillStyle = getLineColor(gLineIdx);
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle= '#0000004d';
    gCtx.strokeText(txt, x,y);   
}

/*function drawRect() {
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
   
}*/




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
    const container = gElCanvas.parentNode;

    //TODO : add different clal for other sizes then 500X500
    let imgRatio = 500/500;
    let newHieght;
    let newWidth;
    
    //handle DOM
    switchDesktopAndMobile();

    if(document.body.clientWidth  < 750){
        newHieght = container.getBoundingClientRect().height - (container.getBoundingClientRect().height 
    - gElCanvas.getBoundingClientRect().height);
    newWidth = newHieght * imgRatio;
     } else {
        newWidth = container.getBoundingClientRect().width/2 - (container.getBoundingClientRect().width 
        - gElCanvas.getBoundingClientRect().width)
        newHieght = newWidth * imgRatio;
     }

     gElCanvas.height = gCtx.height =  newHieght;
     gElCanvas.width = gCtx.width = newWidth;
     gCtx.height = newHieght;
     gCtx.width = newWidth;
    renderMeme();
}



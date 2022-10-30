'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']; 
let canvasEdgeSize = 15;
let defaultFontSize = 80;
let gElCanvas;
let gCtx;
let gLineIdx = 0;
let gCurrCbS = null;
let gRectStyle = {fill: false, outer: true};

function renderMeme(){
    gCurrCbS = [];
    getMemeLines().forEach((line)=>{
        if(line.isVisible){
            gCurrCbS.push({func: drawText, id: line.lineIdx});
        }
    });

    getMemeSmileys();
    if(hasActiveLines()){
        gCurrCbS.push({func: drawTxtOutline, id: getMarkedLine()});
    }

    const image = getImageFromId(getImageIdFromMeme());
    drawImage(image,0,0,gElCanvas.width,gElCanvas.height);
    gCurrCbS = null;
}


function onImgSelect(el){
    
    onToggleEditor();
    gElCanvas = document.querySelector('.editor-container .meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    const linesPos = [{x: canvasEdgeSize, y: canvasEdgeSize},
        {x: canvasEdgeSize, y: gElCanvas.height - (defaultFontSize + canvasEdgeSize*3)}]
    createCurrMeme(el.dataset.id,defaultFontSize,linesPos);
    gElCanvas.setAttribute('data-imgid',`${getImageIdFromMeme()}`);
    setEventListener();
    resizeCanvas();
    updateLinesPos(1,(canvasEdgeSize + getLineFontSize(1)/2 + canvasEdgeSize),
    (gCtx.height - (getLineFontSize(1) + canvasEdgeSize*4)));
}


function OnExitEditor() {
    onToggleEditor();
}

function onMove(){

}

function onDown(){

}

function onUp(){
    
}
function onUserAddLine(){
    let newLine = null;
    let linepos;
    const lines = getMemeLines();

    if(lines){
        for (let i = 0; i < lines.length; i++) {
            if(!lines[i].isVisible){
                setLineVisibleValue(i, true);
                setMarkedLine(i);
                gLineIdx = i;
                renderMeme();
                return;
            } 
             
         }
    } else {
        //add new line at the top and return;
        linepos = {x: canvasEdgeSize, y: canvasEdgeSize};
        addLineToMeme(0, defaultFontSize,linepos, true);
        gLineIdx = 0;
    }
    
    if(!newLine){
        if(lines.length === 1){
            //add the bottom line
            linepos = {x: canvasEdgeSize, y: gElCanvas.height - (defaultFontSize + canvasEdgeSize*3)};
            addLineToMeme(lines.length, defaultFontSize,linepos, true);
            gLineIdx = lines.length;
        } else {
            // add a line in the center
            /*
            linepos = {x: CANVAS_EDGESIZE, y: gElCanvas.height/2 - (DEFAULT_FONT_SIZE + CANVAS_EDGESIZE*3)}
            addLineToMeme(lines.length, DEFAULT_FONT_SIZE,linepos, true);
            gLineIdx = lines.length;
            */
        }
    }

    renderMeme();
}

function onFontSizeChange(direction){
    const value = 7 * direction
    setLineFontSize(gLineIdx ,(getLineFontSize(gLineIdx) + value));
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
}getMarkedLine

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

function onSwitchLine(){
    const lines = getMemeLines();
    if(lines[gLineIdx + 1] && lines[gLineIdx + 1].isVisible){
        setMarkedLine(gLineIdx + 1);
        gLineIdx++;
        renderMeme();
    } else {
        setMarkedLine(0);
        gLineIdx = 0;
        renderMeme();
    }
               
}

function onDownloadImg() {
    const imgContent = gElCanvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = imgContent;
    link.download = 'my-meme.jpg';
    link.click();
  }

function onShareImg(){
    shareImg();
  }

function onDeleteLine(){
    deleteLine(gLineIdx);
    gLineIdx = 0;
    renderMeme();
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
                cb.func(cb.id);
            });
        }
    }
}

function drawText(idx){
    // text padding from the sides
    // txt height\width structure: CANVAS_EDGESIZE || font size || CANVAS_EDGESIZE 

    const width = gElCanvas.width;
    const height = gElCanvas.height;
    const txt = getLineTxt(idx)
    let x,y;
    const fontSize = getLineFontSize(idx);
    const fontFamily = getLineFamily(idx);
    const radiusSize = fontSize/2 + canvasEdgeSize;
    switch (getLineAlign(idx)) {
        case 'left':
            if(idx === 0){
                x = (canvasEdgeSize + radiusSize);
                y = fontSize + canvasEdgeSize
            } else if (idx === getMemeLines().length - 1){
                x = (canvasEdgeSize + radiusSize);
                y = height - (canvasEdgeSize*3);
            }
            break;
        case 'center':
            if(idx === 0){
                x = width/2 - (canvasEdgeSize + radiusSize);
                y = fontSize + canvasEdgeSize
            } else if (idx === getMemeLines().length - 1){
                x = width/2 - (canvasEdgeSize + radiusSize);
                y = height - canvasEdgeSize*3;
            }
            break;
        case 'right':
            if(idx === 0){
                x = width - (canvasEdgeSize + radiusSize);
                y = fontSize + canvasEdgeSize
            } else if (idx === getMemeLines().length - 1){
                x = width - (canvasEdgeSize + radiusSize);
                y = height - canvasEdgeSize*3;
            }
            break;
    }

    gCtx.font = `${fontSize}px ${fontFamily}`;
    gCtx.textAlign = getLineAlign(idx);
    gCtx.fillStyle = getLineColor(idx);
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle= '#0000004d';
    gCtx.strokeText(txt, x,y);   
}


function drawTxtOutline(idx){
    const leftdistance = getLinePos(idx).x;
    const topdistance = getLinePos(idx).y;
    const fontSize = getLineFontSize(idx);
    const radiusSize = fontSize/2 + canvasEdgeSize;
    const width = gElCanvas.width;
    let startX,currY,endX,centerY
    
    gCtx.beginPath();
    gCtx.strokeStyle = '#ffffffb3';

    /*top line*/
    centerY = topdistance + radiusSize;
    startX = (leftdistance + radiusSize);
    currY = topdistance;

    endX = (width - (canvasEdgeSize + radiusSize));
    drawLinePath(startX, currY, endX, currY);

    /* right arc*/
   
    drawArcPath(endX, centerY, 'right',radiusSize);

     /*bottom line*/

    currY = topdistance + (canvasEdgeSize*2 + fontSize);
     drawLinePath(endX, currY, startX, currY);

      /* right arc*/
    drawArcPath(startX, centerY,'left',radiusSize);
    gCtx.stroke()
}

function drawLinePath(x, y, xEnd, yEnd) {
    gCtx.lineWidth = 6
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd) 
  }

function drawArcPath(x, y, alignment,radiusSize) {
    //NOTE TO SELF x,y = the middle of circle
    gCtx.lineWidth = 6;
    
    switch(alignment){
        case 'left':
            gCtx.arc(x, y, radiusSize, Math.PI/2, (Math.PI*3)/2);
            break;
        case 'right':
            gCtx.arc(x, y, radiusSize, (Math.PI*3)/2, Math.PI/2);
            break;
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
    const container = gElCanvas.parentNode;
    const padding = 10;
    let newHieght = container.offsetHeight - padding*2
    let newWidth = container.offsetWidth - padding*2
    //TODO : add different clal for other sizes then 500X500
    let imgRatio = 500/500;
    
    //handle DOM
    switchDesktopAndMobile();

    if(document.body.clientWidth  < 750){
        newWidth = newHieght * imgRatio;
        canvasEdgeSize = 7.5;
        defaultFontSize = 20;
     } else {
        newHieght = newWidth * imgRatio;
        canvasEdgeSize = 15;
        defaultFontSize = 80;
     }

    gElCanvas.height = gCtx.height =  newHieght;
    gElCanvas.width = gCtx.width = newWidth;
    updateLinesPos(1,(canvasEdgeSize + getLineFontSize(1)/2 + canvasEdgeSize),
    (gCtx.height - (getLineFontSize(1) + canvasEdgeSize*4)));
    resizeDefaultFontSize();
    renderMeme();
  }


  function resizeDefaultFontSize(){
    if(document.body.clientWidth  <= 450){
        defaultFontSize = 16;
    } else if(document.body.clientWidth  <= 750){
        defaultFontSize = 20;
    } else if(document.body.clientWidth  <= 1050){
        defaultFontSize = 30;
    } else if(document.body.clientWidth  <= 1300){
        defaultFontSize = 40;
    } else {
        defaultFontSize = 80;
    }
  }

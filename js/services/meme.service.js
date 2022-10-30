'use strict'

var gCurrMeme;
var gMemes = [];
var gImages = [];
var gMarkedLine = 0;
var gKeywordSearchCountMap = {'funny':12,'cat':16, 'dark':2};

const IMAGES_STOREKEY = 'local-images';
const MEMES_STOREKEY = 'local-memes';


//TODO: fixe meme sizes when resizeing
/*function resizeImgVariables(width,height,padding){
  gCurrMeme.lines.forEach((line,idx)=>{
        line.rect.topL = 
        line.rect.topM = 
        line.rect.topR = 
        line.rect.botL = 
        line.rect.botM = 
        line.rect.botR = 
    });
}*/

function createCurrMeme(id,fontsize, linespos){
    gCurrMeme = _createMeme(id,fontsize, linespos);
}

function getCurrMeme(){
    return gCurrMeme;
}

function getImageIdFromMeme(){
    return gCurrMeme.imgId;
}
function getMemeLines(){
    return gCurrMeme.lines;
}

function setMarkedLine(value){
    gMarkedLine = value;
}

function getMarkedLine(){
    return gMarkedLine;
}

function setLineAlign(idx,value){
    gCurrMeme.lines[idx].align = value;
}

function getLineAlign(idx){
    return gCurrMeme.lines[idx].align;
}

function getLineTxt(idx){
    return gCurrMeme.lines[idx].txt;
}

function setLineTxt(idx,value){
    gCurrMeme.lines[idx].txt = value;
}

function getLineFontSize(idx){
    return gCurrMeme.lines[idx].size;
}

function setLineFontSize(idx,value){
    gCurrMeme.lines[idx].size = value;
}

function getLineFamily(idx){
    return gCurrMeme.lines[idx].family;
}

function setLineFamily(idx,value){
    gCurrMeme.lines[idx].family = value;
}

function getLineColor(idx){
    return gCurrMeme.lines[idx].color;
}

function setLineColor(idx, color){
    gCurrMeme.lines[idx].color = color;
}

function getLinePos(idx){
    return gCurrMeme.lines[idx].pos;
}

function getImageFromId(id){
    for (let i = 0; i < gImages.length; i++) {
        if(gImages[i].id === id) return gImages[i];
    }

    return null;
}

function deleteLine(idx){
    if(gCurrMeme.lines[idx]){
        gCurrMeme.lines.splice(idx,1);
    }

    for(let i = 0; i <gCurrMeme.lines.length; i++){
        gCurrMeme.lines[i].lineIdx = i;
    }

    gMarkedLine = 0;
}

function setLineVisibleValue (idx, value){
    gCurrMeme.lines[idx].isVisible = value;
}

function hasActiveLines() {
    return gCurrMeme.lines && gCurrMeme.lines.length > 0 && gCurrMeme.lines.some((line)=>{return line.isVisible;});
}
function getImages(){
    _setImagesFromStorage();
    return gImages.map((img)=>{return img});
}

function getSmileyFromLine(LineIdx, smileyIdx){
    return gCurrMeme.lines[LineIdx].smileys[smileyIdx];
}

function updateLinesPos(idx,currLeft,currTop){
    gCurrMeme.lines[idx].pos = {x: currLeft, y: currTop}
}

function ToggleUnderLine(idx){
    gCurrMeme.lines[idx].hasUnderLine = ! gCurrMeme.lines[idx].hasUnderLine;
}

function createImages(){
    gImages = [];
    gImages[0] = _createImage(makeId(7), './img/img-1x1/1.jpg',['trump', 'politics']);
    gImages[1] = _createImage(makeId(7), './img/img-1x1/2.jpg',['dog', 'funny']);
    gImages[2] = _createImage(makeId(7), './img/img-1x1/3.jpg',['baby', 'dog']);
    gImages[3] = _createImage(makeId(7), './img/img-1x1/4.jpg',['cat', 'funny']);
    gImages[4] = _createImage(makeId(7), './img/img-1x1/5.jpg',['serious', 'baby']);
    gImages[5] = _createImage(makeId(7), './img/img-1x1/6.jpg',['tvshows', 'funny']);
    gImages[6] = _createImage(makeId(7), './img/img-1x1/7.jpg',['surprised', 'baby']);
    gImages[7] = _createImage(makeId(7), './img/img-1x1/8.jpg',['movies', 'smile']);
    gImages[8] = _createImage(makeId(7), './img/img-1x1/9.jpg',['funny', 'smile']);
    gImages[9] = _createImage(makeId(7), './img/img-1x1/10.jpg',['obama', 'politics']);
    gImages[10] = _createImage(makeId(7), './img/img-1x1/11.jpg',['sport', 'hugs']);
    gImages[11] = _createImage(makeId(7), './img/img-1x1/12.jpg',['tvshows', 'caught you']);
    gImages[12] = _createImage(makeId(7), './img/img-1x1/13.jpg',['movies', 'smile']);
    gImages[13] = _createImage(makeId(7), './img/img-1x1/14.jpg',['movies', 'serious']);
    gImages[14] = _createImage(makeId(7), './img/img-1x1/15.jpg',['tvshows', 'serious']);
    gImages[15] = _createImage(makeId(7), './img/img-1x1/16.jpg',['movies', 'smile']);
    gImages[16] = _createImage(makeId(7), './img/img-1x1/17.jpg',['putin', 'politics']);
    gImages[17] = _createImage(makeId(7), './img/img-1x1/18.jpg',['toys', 'movies']);
    saveToStorage(IMAGES_STOREKEY, gImages);
}

function _setImagesFromStorage(){
    if(loadFromStorage(IMAGES_STOREKEY)){
        gImages = loadFromStorage(IMAGES_STOREKEY);
        return true;
    }
    return false;
}


function addLineToMeme(idx, fontsize, linespos, isVisible){
    gCurrMeme.lines.push(_createLine(idx, fontsize, linespos, isVisible))
}

function _createMeme(imgId,fontsize, linespos){
    const pos0 = linespos[0];
    const pos1 = linespos[1];
    return {
        imgId,
        lines: [_createLine(0,fontsize,pos0,true),_createLine(1,fontsize,pos1,false)]
   };   
}

function _createLine(lineIdx, fontsize, linespos, isVisible){
    return {
            lineIdx,
            isVisible,
            hasUnderLine: false,
            pos: linespos,
            txt: '   enter your line',
            family: 'Poppins-Regular',
            size: fontsize,
            align: 'left',
            color: '#ffffff',
            smileys: [
                {
                    name: 'ecstatic',
                    isVisible: false,
                    size: fontsize*3,
                    url: './img/img-general/smiley-ecstatic.jpg'
                },{
                    name: 'awkward',
                    isVisible: false,
                    size: fontsize*3,
                    url: './img/img-general/smiley-awkward.jpg'
                },{
                    name: 'awe',
                    isVisible: false,
                    size: fontsize*3,
                    url: './img/img-general/smiley-awe.jpg'
                },{
                    name: 'silly',
                    isVisible: false,
                    size: fontsize*3,
                    url: './img/img-general/smiley-silly.jpg'
                }]
    }
}

function _createImage(id, url, keywords){
    return {id, url, keywords};
}

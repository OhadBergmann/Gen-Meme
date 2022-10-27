'use strict'

var gCurrMeme;
var gMemes = [];
var gImages = [];
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

function createCurrMeme(id,width,height,size,padding){
    console.log(width,height)
    gCurrMeme = _createMeme(id,width,height,size,padding);
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


function getLineRect(idx){
    return gCurrMeme.lines[idx].rect;
}

function setLineRect(idx,rect){
    gCurrMeme.lines[idx].rect = rect;
}



function getImagesFromId(id){
    for (let i = 0; i < gImages.length; i++) {
        if(gImages[i].id === id) return gImages[i];
    }

    return null;
}

function getImages(){
    _setImagesFromStorage();
    return gImages.map((img)=>{return img});
}

function createImages(images){
    gImages = images.map((img)=>{
        const {id,url,words} = img;
        return _createImage(id,url,words);
    });

    saveToStorage(IMAGES_STOREKEY, gImages);
}

function _setImagesFromStorage(){
    if(loadFromStorage(IMAGES_STOREKEY)){
        gImages = loadFromStorage(IMAGES_STOREKEY);
        return true;
    }
    return false;
}

function _createMeme(imgId,width,height,size,padding){
    return {
        imgId,
        lines: [{
            isVisible: true,
            txt: '   enter your line',
            family: 'Poppins-Regular',
            size,
            align: 'left',
            color: '#0c98b9',
            rect: {
                topL: {x:padding,y:padding},
                topR: {x:width - padding,y:padding},
                topM: {x:(width - padding)/2, y:padding},
                botL: {x:padding,y:(padding + size*2)},
                botR: {x:width - padding,y:(padding + size*2)},
                botM: {x:(width - padding)/2, y:(padding + size*2)}
            }
        },{
            isVisible: false,
            txt: '   enter your line',
            family: 'Poppins-Regular',
            size,
            align: 'left',
            color: '#dc14c3',
            rect: {
                topL: {x:padding,y:(height - (padding + size*2))},
                topR: {x:width - padding,y:(height - (padding + size*2))},
                topM: {x:(width - padding)/2, y:(height - (padding + size*2))},
                botL: {x:padding,y:padding},
                botR: {x:width - padding,y:padding},
                botM: {x:(width - padding)/2, y:padding}
            }
        }],
   };   
}

function _createImage(id, url, keywords){
    return {id, url, keywords};
}


// 


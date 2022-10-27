'use strict'

var gCurrMeme;
var gMemes = [];
var gImages = [];
var gKeywordSearchCountMap = {'funny':12,'cat':16, 'dark':2};

const IMAGES_STOREKEY = 'local-images';
const MEMES_STOREKEY = 'local-memes';


function createCurrMeme(id){
    gCurrMeme = _createMeme(id);
}

function getCurrMeme(){
    return gCurrMeme;
}

function setLineAlignment(idx,value){
    gCurrMeme.lines[idx].align = value;
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

function _createMeme(imgId){
    return {
        imgId,
        lineIdx: 0,
        lines: [{
            txt: '',
            family: 'poppins-r',
            size: 20,
            align: 'left',
            color: '#0c98b9',
            rect: {
                topL: {x:10,y:10},
                botL: {x: 10,y:(10 + (20 * 1.5))},
                topR: {x:150,y:10},
                botR: {x: 150,y:(10 + (20 * 1.5))}
            }
        },{
            txt: '',
            family: 'poppins-r',
            size: 20,
            align: 'left',
            color: '#dc14c3',
            rect: {
                topLeft: {x:10,y:300},
                botLeft: {x: 10,y:(300 + (20 * 1.5))},
                topright: {x:150,y:300},
                botLeft: {x: 150,y:(300 + (20 * 1.5))}
            }
        }],
   };   
}

function _createImage(id, url, keywords){
    return {id, url, keywords};
}


// 


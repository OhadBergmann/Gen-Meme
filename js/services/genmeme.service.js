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
            size: 20,
            align: 'left',
            color: '#0c98b9'
        },{
            txt: '',
            size: 20,
            align: 'left',
            color: '#dc14c3'
        },
    ]};   
}

function _createImage(id, url, keywords){
    return {id, url, keywords};
}


// 


'use strict'

var gCurrMeme;
var gMemes = [];
var gImages = [];
var gKeywordSearchCountMap = {'funny':12,'cat':16, 'dark':2};

const IMAGES_STOREKEY = 'local-images';
const MEMES_STOREKEY = 'local-memes';


function getMeme(){
    
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

function _createMeme(imgIdx){
    return {
        selectedImgId: imgIdx,
        selectedLineIdx: 0,
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


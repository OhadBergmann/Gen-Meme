'use strict'

var gCurrMeme;
var gMemes = [];
var gKeywordSearchCountMap = {'funny':12,'cat':16, 'dark':2};







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

function _createImage(imgIdx, url, keywords){
    return {id: imgIdx, url, keywords};
}


// 


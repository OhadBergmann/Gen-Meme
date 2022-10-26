'use strict'

function onInit(){
    setGallery();
}

function renderMeme(){
    
}


function setGallery(){
    var strHtml = '';
    const folders = ['img-1x1'];
    const ElgalleryContainer = document.querySelector('section.images-grid');
    
    for (let i = 1; i <= 18; i++) {
        strHtml += `<div class="item-container"><img class="square-img" data-filename="${i}.png" data-folder="${folders[0]}" 
        onclick="onGenerateNewMeme(this,)" src="./img/img-1x1/${i}.jpg" alt="item"></div>`;
    }
    
    ElgalleryContainer.innerHTML = strHtml;
}


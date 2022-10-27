'use strict'

function onInit(){
    setGallery();
}

function renderMeme(){
    
}


function setGallery(){
    let strHtml = '';

    const elGalleryContainer = document.querySelector('section.images-grid');
    let images = getImages();

    if(!images.length){
        createImages(images);
        images = getImages();
        for (let i = 1; i <= 18; i++) {
            images.forEach((img)=>{
                strHtml += `<div class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
                src="${img.url}"= alt="item"></div>`;
            });
        }

       
    } else {
        images.forEach((img)=>{
            strHtml += `<div class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
            src="${img.url}"= alt="item"></div>`;
        });
    }
    
    elGalleryContainer.innerHTML = strHtml;
}


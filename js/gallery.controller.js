'use strict'

function onInit(){
    setGallery();
    switchDesktopAndMobile()
}


function setGallery(){
    let strHtml = '';

    const elGalleryContainer = document.querySelector('.img-grid-container');
    let images = getImages();

    if(!images.length){
        createImages(images);
        images = getImages();
        for (let i = 1; i <= 18; i++) {
            images.forEach((img)=>{
                strHtml += `<div class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
                src="${img.url}" alt="item"></div>`;
            });
        }

       
    } else {
        images.forEach((img)=>{
            strHtml += `<div class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
            src="${img.url}" alt="item"></div>`;
        });
    }
    
    elGalleryContainer.innerHTML = strHtml;
}

function switchDesktopAndMobile(){
    const isMoblie =  document.body.clientWidth  < 750;
    const elMenuBtn =  document.querySelector('.nav-bar-container .menu-btn');
    const elXBtn = document.querySelector('.nav-bar-container .close-menu-btn');
    const elMenu = document.querySelector('.nav-bar-container ul');

    if(isMoblie) {
        if(elMenuBtn.classList.contains('hidden')) elMenuBtn.classList.remove('hidden');
        if(!elXBtn.classList.contains('hidden'))elXBtn.classList.add('hidden');
        if(!elMenu.classList.contains('hidden'))elMenu.classList.add('hidden');
    }
    else {
        if(!elMenuBtn.classList.contains('hidden')) elMenuBtn.classList.add('hidden');
        if(!elXBtn.classList.contains('hidden'))elXBtn.classList.add('hidden');
        if(elMenu.classList.contains('hidden'))elMenu.classList.remove('hidden');
    }
}
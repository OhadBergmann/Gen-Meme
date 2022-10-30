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
                strHtml += `<article class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
                src="${img.url}" alt="item"></article>`;
            });
        }

       
    } else {
        images.forEach((img)=>{
            strHtml += `<article class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
            src="${img.url}" alt="item"></article>`;
        });
    }
    
    elGalleryContainer.innerHTML = strHtml;
}

function onSearchFilter(){
    
}

function onUpdateFontSize(el){
    var fontSize = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));; 
    if(fontSize <= 50){
        el.style.fontSize = (fontSize + 2) + 'px';
    }
}

function switchDesktopAndMobile(){
    const isMoblie =  document.body.clientWidth  < 750;
    const elMenuBtn =  document.querySelector('.nav-bar-container .menu-btn');
    const elMenu = document.querySelector('.nav-bar-container ul');
    const elXBtn = document.querySelector('.nav-bar-container .close-menu-btn');
    const links = document.querySelectorAll('.nav-bar-container ul li');

    if(isMoblie) {
        if(elMenuBtn.classList.contains('hidden')) elMenuBtn.classList.remove('hidden');
        if(!elXBtn.classList.contains('hidden'))elXBtn.classList.add('hidden');
        if(!elMenu.classList.contains('scale-zero'))elMenu.classList.add('scale-zero');
        links.forEach((link)=>{
            if(!link.classList.contains('op-zero')) link.classList.add('op-zero')
        })
        
    }
    else {
        if(!elMenuBtn.classList.contains('hidden')) elMenuBtn.classList.add('hidden');
        if(!elXBtn.classList.contains('hidden'))elXBtn.classList.add('hidden');
        if(elMenu.classList.contains('scale-zero'))elMenu.classList.remove('scale-zero');
        links.forEach((link)=>{
            if(link.classList.contains('op-zero')) link.classList.remove('op-zero')
        })
    }
}
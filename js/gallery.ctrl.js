'use strict'

function onInit(){
    setGallery();
}

function renderMeme(){
    
}


function setGallery(){
    let strHtml = '';
    const folders = ['img-1x1'];
    const ElgalleryContainer = document.querySelector('section.images-grid');
    let images = getImages();

    if(!images.length){
        for (let i = 1; i <= 18; i++) {
            let currId = makeId(7);
            strHtml += `<div class="item-container"><img class="square-img" data-id="${currId}" onclick="onImgSelect(this)"
            src="./img/${folders[0]}/${i}.jpg"= alt="item"></div>`;
    
            images[i - 1] =  { id: currId, url: `./img/${folders[0]}/${i}.jpg`, words: '' };
        }

        createImages(images);
    } else {
        images.forEach((img)=>{
            strHtml += `<div class="item-container"><img class="square-img" data-id="${img.id}" onclick="onImgSelect(this)"
            src="${img.url}"= alt="item"></div>`;
        });
    }
    
    ElgalleryContainer.innerHTML = strHtml;
}


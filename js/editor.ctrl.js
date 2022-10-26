'use strict'

function renderGallery(){
    
}

function onOpenEditor(el){
    const imgSrc = `./img/${el.dataset.folder}/${el.dataset.filename}`;
    
}


function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}
'use strict'

function renderGallery(){
    
}

function onOpenEditor(el){
    onToggleEditor();
}


function onToggleEditor(){
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.contains('hide') ? elEditor.classList.remove('hide') : elEditor.classList.add('hide');
}
'use strict'

function makeId(length){
    var str = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++)
    {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
}


function test(str){
    console.log('test' + str)
}
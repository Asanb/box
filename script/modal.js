"use strict"

let btn = document.querySelector(".header_button");
let btnClose = document.querySelector(".popup-close");
let modal = document.querySelector(".overlay");

btn.onclick = function () {
 modal.style.display = "block"
}
btnClose.onclick = function () {
 modal.style.display = "none"
}
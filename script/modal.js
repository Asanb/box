let btn = document.querySelector(".header_button");
let btnClose = document.querySelector(".popup-close")

btn.onclick = function () {
 document.querySelector(".overlay").style.display = "block"
}
btnClose.onclick = function () {
 document.querySelector(".overlay").style.display = "none"
}
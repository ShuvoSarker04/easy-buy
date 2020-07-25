let myCart = (localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')): {};

console.log(myCart)
let items = Object.keys(myCart)

let totalItem = items.length;

let tItem = document.querySelector('#totalItem');

if(tItem){
tItem.innerHTML = totalItem;
}
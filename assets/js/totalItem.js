let myCart = (localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')): {};

let items = Object.keys(myCart)

let totalItem = items.length;

document.querySelector('#totalItem').innerHTML = totalItem;
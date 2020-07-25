
let User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):{};

let MyCart = (localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')): {};

let Items = Object.keys(MyCart);

if(Object.keys(User).length>0){

    // IF logged in hide message box
    document.querySelector('#notLoggedIn').style.display="none";
    document.querySelector('#emptyCart').style.display="none";
    
if(Items.length>0){
    for(let i=0; i<Items.length; i++){

    let html = `
    <div class="col-sm-12 col-md-10 col-md-offset-1 mb-3">

            <div class="col-12 pt-3 pb-1">

                <div class="row border pt-3">
                    <div class=" col-3 ">
                        <p class="lead">${MyCart[Items[i]].name}</p>
                    </div>
                    <div class=" col-3  ">
                        <p class="lead">${MyCart[Items[i]].productCode}</p>
                    </div>
                    <div class=" col-2  ">
                        <div class="form-group">
                            <input type="text" class="form-control" data-value="${MyCart[Items[i]].productId}" value="${MyCart[Items[i]].quantity}">
                        </div>
                    </div>
                    <div class=" col-2 ">
                        <p class="lead" id="price_${MyCart[Items[i]].productId}">BDT ${MyCart[Items[i]].price}</p>
                    </div>
                    <div class=" col-2 ">
                        <button class="btn btn-danger remove" data-value="${myCart[Items[i]].productId}" id="${myCart[Items[i]].productId}">Remove</button>
                    </div>
                </div>

            </div>
        </div>
    `
    document.querySelector('#items').innerHTML += html;
}


let subTotal = 0;
for(let i=0; i<Items.length; i++){
    console.log(MyCart[Items[i].price])
    subTotal+= parseFloat(MyCart[Items[i]].price);
}
let charge = subTotal*0.02;
let total = subTotal + charge;


let html = `
<div class="row " >
                <div class=" col-12" style="overflow: hidden;">
                    <p class="lead" style="width: 500px; float: right;" id="subTotal">Subtotal: BDT ${subTotal}</p>
                </div>
                <div class=" col-12 " style="overflow: hidden;">
                    <p class="lead" id="serviceCharge" style="width: 500px; float: right;">Service Charge: BDT ${charge} (2%)</p>
                </div>
                <div class=" col-12 "  style="overflow: hidden;">
                    <p class="lead" id="total" style="width: 500px; float: right;">Total: BDT ${total}</p>
                </div>

            </div>
`;

document.querySelector('#charges').innerHTML = html;


document.querySelectorAll('input').forEach(e=>{
    e.addEventListener('keyup', event=>{
        let productId = event.target.dataset.value;
        let quantity = Math.floor(event.target.value);

        let item = MyCart[productId];
        
        if(quantity<1){
            document.querySelector(`#price_${productId}`).innerHTML = `BDT ${MyCart[productId].sPrice}`;
            event.target.value =1;
        }else{
            event.target.value =quantity;
        //Increase price
        console.log(`#price_${productId}`);
        let price = parseFloat(quantity*item.sPrice);
        document.querySelector(`#price_${productId}`).innerHTML = `BDT ${price}`;


        //change in MyCart
        MyCart[productId].price = price;
        MyCart[productId].quantity = quantity;

        //update subtotal, total
        let subTotal = 0;
        for(let i=0; i<Items.length; i++){
            console.log(MyCart[Items[i].price])
            subTotal+= parseFloat(MyCart[Items[i]].price);
        }
        let charge = subTotal*0.02;
        let total = subTotal + charge;

        document.querySelector('#subTotal').innerHTML=`Subtotal: BDT ${subTotal}`;
        document.querySelector('#serviceCharge').innerHTML = `Service Charge: BDT ${charge} (2%)`;
        document.querySelector('#total').innerHTML = `Total: BDT ${total}`

        localStorage.setItem('myCart', JSON.stringify(MyCart));
    }
    })
})

// REMOVE ITEM
document.querySelectorAll('.remove').forEach(button=>{
    button.addEventListener('click', (e)=>{
        let id = e.target.dataset.value
        document.getElementById(id).parentElement.parentElement.remove();

        //Remove from total price
        console.log(MyCart[id])
        console.log(subTotal)
        subTotal -=MyCart[id].quantity*MyCart[id].sPrice;
        charge = subTotal*0.02;
        total = subTotal + charge;

        let html = `
<div class="row " >
                <div class=" col-12" style="overflow: hidden;">
                    <p class="lead" style="width: 500px; float: right;" id="subTotal">Subtotal: BDT ${subTotal}</p>
                </div>
                <div class=" col-12 " style="overflow: hidden;">
                    <p class="lead" id="serviceCharge" style="width: 500px; float: right;">Service Charge: BDT ${charge} (2%)</p>
                </div>
                <div class=" col-12 "  style="overflow: hidden;">
                    <p class="lead" id="total" style="width: 500px; float: right;">Total: BDT ${total}</p>
                </div>

            </div>
`;

document.querySelector('#charges').innerHTML = html;


        //Remove from cart
        delete MyCart[id];
        let countCartItem = Object.keys(MyCart);
        document.querySelector('#totalItem').innerHTML = countCartItem.length;

        //Show empty cart
        if(countCartItem.length===0){
            document.querySelector('#emptyCart').style.display = "block"
            let message = "Your cart is empty";
            document.querySelector('#emptyCart .message-img').src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png"
            document.querySelector('#emptyCart .message').innerHTML = message;

            document.querySelector('#charges').style.display="none";
        }
        localStorage.setItem('myCart', JSON.stringify(MyCart));
    })
})}else{
    document.querySelector('#emptyCart').style.display="block";
    //let message = "Your cart is empty";
    document.querySelector('#emptyCart .message-img').src="https://tyjara.com/assets/site/img/empty-cart.png"
}


}else{
    let message = "Sign in to access cart";
    document.querySelector('#notLoggedIn .message-img').src = "https://i.pinimg.com/originals/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg"
    document.querySelector('#notLoggedIn  .message').innerHTML = message;
    document.querySelector('#emptyCart').style.display="none";

}
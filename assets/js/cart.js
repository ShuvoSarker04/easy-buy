
let myCart = (localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')): {};

let items = Object.keys(myCart)

console.log(myCart[items[0]].name)

for(let i=0; i<items.length; i++){

    let html = `
    <div class="col-sm-12 col-md-10 col-md-offset-1 mb-3">

            <div class="col-12 border pt-3 pb-1">

                <div class="row">
                    <div class=" col-3 ">
                        <p class="lead">${myCart[items[i]].name}</p>
                    </div>
                    <div class=" col-3  ">
                        <p class="lead">${myCart[items[i]].productCode}</p>
                    </div>
                    <div class=" col-2  ">
                        <div class="form-group">
                            <input type="text" class="form-control" data-value="${myCart[items[i]].productId}" value="${myCart[items[i]].quantity}">
                        </div>
                    </div>
                    <div class=" col-2 ">
                        <p class="lead" id="price_${myCart[items[i]].productId}">BDT ${myCart[items[i]].price}</p>
                    </div>
                    <div class=" col-2 ">
                        <button class="btn btn-danger" id="${myCart[items[i]].productId}">Remove</button>
                    </div>
                </div>

            </div>
        </div>
    `
    document.querySelector('#items').innerHTML += html;
}


let subTotal = 0;
for(let i=0; i<items.length; i++){
    console.log(myCart[items[i].price])
    subTotal+= parseFloat(myCart[items[i]].price);
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

        let item = myCart[productId];
        
        if(quantity<1){
            document.querySelector(`#price_${productId}`).innerHTML = `BDT ${myCart[productId].sPrice}`;
            event.target.value =1;
        }else{
            event.target.value =quantity;
        //Increase price
        console.log(`#price_${productId}`);
        let price = parseFloat(quantity*item.sPrice);
        document.querySelector(`#price_${productId}`).innerHTML = `BDT ${price}`;


        //change in mycart
        myCart[productId].price = price;
        myCart[productId].quantity = quantity;

        //update subtotal, total
        let subTotal = 0;
        for(let i=0; i<items.length; i++){
            console.log(myCart[items[i].price])
            subTotal+= parseFloat(myCart[items[i]].price);
        }
        let charge = subTotal*0.02;
        let total = subTotal + charge;

        document.querySelector('#subTotal').innerHTML=`Subtotal: BDT ${subTotal}`;
        document.querySelector('#serviceCharge').innerHTML = `Service Charge: BDT ${charge} (2%)`;
        document.querySelector('#total').innerHTML = `Total: BDT ${total}`

        localStorage.setItem('myCart', JSON.stringify(myCart));
    }
    })
})


console.log(document.querySelectorAll('input'));
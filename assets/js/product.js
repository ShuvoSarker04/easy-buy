const params = new URLSearchParams(window.location.search)
let data;
firebase.firestore().collection('products').doc(params.get('id')).get().then(p=>{
    console.log(p.data())

    data = p.data();

    let srcs = Object.keys(data.img);

    console.log(srcs)
    let i=0;
    let div = document.querySelector('.carousel-inner');
    srcs.forEach(src=>{
        if(i===0){
        div.innerHTML+=`<div class="carousel-item active">
        <img src="${data.img[src]}" class="d-block" style="width:75%">
      </div>`
    }else{
        div.innerHTML+=`<div class="carousel-item">
        <img src="${data.img[src]}" class="d-block" style="width:75%">
      </div>`
    }
    i++;
    });
    div.innerHTML+=`
    <a class="carousel-control-prev" href="#product-slider" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>

  <a class="carousel-control-next" href="#product-slider" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    `
    



    // Product Details
    let html = ` <p class="new-arrival text-center">${data.condition}</p>
    <h2>${data.name}</h2>
 <p>Product Code: ${data.productCode}</p>  
    
 <p class="price">BDT &#x9f3 ${data.price}</p>
 <p><b>Availability:</b> ${data.stock}</p>
 <p><b>Condition:</b> ${data.condition}</p>
 <p><b>Brand/Company:</b> ${data.company}</p>
 <label>Quantity: </label>
 <input type="text" value="1" id="quantity">
 <button type="button" class="btn btn-primary" id="addToCart">Add to Cart</button>`;

 document.querySelector('#productDetails').innerHTML = html;
 document.querySelector('#description').innerHTML = data.description;



});

setTimeout(()=>{
  const quantity = document.querySelector('#quantity');
  const addToCart = document.querySelector('#addToCart');
  
  console.log("WORKING")
  if(quantity && addToCart){
      addToCart.addEventListener('click', ()=>{
  
          console.log(quantity.value);
  
          let myCart = localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart')) : {} ;
  
          let q = quantity.value
  
          let item = {
              productId:  params.get('id'),
              name: data.name,
              quantity: q,
              image: data.img[0],
              productCode: data.productCode,
              price: (data.sale==="0")? parseInt(data.price)*q : parseInt(data.sale)*q,
              sPrice: (data.sale==="0")? parseInt(data.price)/q : parseInt(data.sale)/q
          }
  
          if(myCart[item.productId]){
              myCart[item.productId].price = item.price;
              myCart[item.productId].quantity = q;
          }else{
              myCart[item.productId] = item;
          }
          
          //Increase cart Item
          document.querySelector('#totalItem').innerHTML = Object.keys(myCart).length;

          //Set items in localstorage mycart
          localStorage.setItem('myCart', JSON.stringify(myCart));
  
      })
  }
}, 3000);





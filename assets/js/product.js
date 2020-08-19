const userLoggedIn = localStorage.getItem('user');
const params = new URLSearchParams(window.location.search);
let data;
let category;





const allProductsDiv = document.querySelector('#all-products');
let allProductsArray = []; 

firebase.firestore().collection('products').get().then(products=>{
	products.forEach(product=>{
		allProductsArray.push(product.data());
	});
})



//Fetch Selected Item
firebase
  .firestore()
  .collection("products")
  .doc(params.get("id"))
  .get()
  .then((p) => {
    console.log(p.data());

    data = p.data();
    category = data.category;
    let srcs = Object.keys(data.img);

    let i = 0;
    let div = document.querySelector(".carousel-inner");
    srcs.forEach((src) => {
      if (i === 0) {
        div.innerHTML += `<div class="carousel-item active">
        <img src="${data.img[src]}" class="d-block selected_Product_Image" style="width:75%">
      </div>`;
      } else {
        div.innerHTML += `<div class="carousel-item">
        <img  src="${data.img[src]}" class="d-block selected_Product_Image" style="width:75%">
      </div>`;
      }
      i++;
    });
    div.innerHTML += `
    <a class="carousel-control-prev" href="#product-slider" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>

  <a class="carousel-control-next" href="#product-slider" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    `;

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

    document.querySelector("#productDetails").innerHTML = html;
    document.querySelector("#description").innerHTML = data.description;

    //Fetch similar 4 items
    let similarProducts = [];
    firebase
      .firestore()
      .collection("products")
      .where("category", "==", category)
      .limit(5)
      .get()
      .then((items) => {
        items.forEach((item) => {
          similarProducts.push(item.data());
        });

        //Remove same item
        similarProducts = similarProducts.filter(
          (product) => product.productCode != data.productCode
        );


        // Show similar product in html
        let sProductsDiv = document.querySelector("#similarProducts");
        similarProducts.forEach((prd) => {

          let html = `
          <div class="col-md-3">
          <div class="product-top">
            <a href="product.html?id=${prd.productId}"><img src="${prd.img.src1}"></a>
            <div class="overlay-right">
              <button type="button" class="btn btn-secondary" title="Quick Shop">
                <i class="fa fa-eye"></i>
              </button>
              <button type="button" class="btn btn-secondary" title="Add to Wishlist">
                <i class="fa fa-heart-o"></i>
              </button>
              <button type="button" class="btn btn-secondary" title="Add to Cart">
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
    
          <div class="product-bottom text-center">
            <h3>${prd.name}</h3>
            <h5>&#x9f3 ${prd.price}</h5>
          </div>
        </div>
      `;
    
      sProductsDiv.innerHTML+=html;
        });
      });

    
  });

// firebase
// .firestore().collection("products").where("category", "==", category)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })

setTimeout(() => {
  const quantity = document.querySelector("#quantity");
  const addToCart = document.querySelector("#addToCart");

  console.log("WORKING");
  if (quantity && addToCart) {
    addToCart.addEventListener("click", () => {
      if(userLoggedIn!=null || userLoggedIn!=undefined){
      let myCart = localStorage.getItem("myCart")
        ? JSON.parse(localStorage.getItem("myCart"))
        : {};

      let q = quantity.value;

      let item = {
        productId: params.get("id"),
        name: data.name,
        quantity: q,
        image: data.img[0],
        productCode: data.productCode,
        price:
          data.sale === "0"
            ? parseInt(data.price) * q
            : parseInt(data.sale) * q,
        sPrice:
          data.sale === "0"
            ? parseInt(data.price) / q
            : parseInt(data.sale) / q,
      };

      if (myCart[item.productId]) {
        myCart[item.productId].price = item.price;
        myCart[item.productId].quantity = q;
      } else {
        myCart[item.productId] = item;
      }

      //Increase cart Item
      document.querySelector("#totalItem").innerHTML = Object.keys(
        myCart
      ).length;

      //Set items in localstorage mycart
      localStorage.setItem("myCart", JSON.stringify(myCart));
    
  }else{
    alert("You must logged in first!")
  }
});
  }
}, 3000);





function searchProducts(){
	

	let product = document.querySelector('#searchbox').value;
	let productWords = product ?  product.split(' ') : [];
	let prdFound = false;
	let filteredArray = [];
	let foundWithWholeKeywordArray = []
	if(productWords.length>0){
	allProductsArray.forEach(prd=>{
		if(prd.category.toLowerCase().trim().includes(product.toLowerCase().trim()) || prd.name.toLowerCase().trim().includes(product.toLowerCase().trim()) || prd.company.toLowerCase().trim().includes(product.toLowerCase().trim())){
			// console.log(prd, "HREE")
			foundWithWholeKeywordArray.push(prd);
		}

	})

	for(let i=0; i< productWords.length; i++){
		allProductsArray.forEach(prd=>{
			if(prd.category.toLowerCase().trim().includes(productWords[i].toLowerCase().trim()) ||prd.name.toLowerCase().trim().includes(productWords[i].toLowerCase().trim()) || prd.company.toLowerCase().trim().includes(productWords[i].toLowerCase().trim())){
				console.log(prd)
				filteredArray.push(prd)
			}
	
		})
	}

	if(foundWithWholeKeywordArray.length>0){
		filteredArray = foundWithWholeKeywordArray;
	}
	let div = document.createElement('div');
	div.classList.add('row', 'mt-5');
	for(let i=0; i<filteredArray.length; i++){
		let html = `
		<div class="col-md-3">
						<div class="filterprd">
							<a href="product.html?id=${filteredArray[i].productId}"><img src="${filteredArray[i].img.src1}"></a>
							<div class="overlay-right">
								<button type="button" class="btn btn-secondary" title="Quick Shop">
									<i class="fa fa-eye"></i>
								</button>
								<button type="button" class="btn btn-secondary" title="Add to Wishlist">
									<i class="fa fa-heart-o"></i>
								</button>
								<button type="button" class="btn btn-secondary" title="Add to Cart">
									<i class="fa fa-shopping-cart"></i>
								</button>
							</div>
						</div>
	
						<div class="product-bottom text-center">
							<h3>${filteredArray[i].name}</h3>
							<h5>&#x9f3 ${filteredArray[i].price}</h5>
						</div>
					</div>
		`;

		div.innerHTML += html	
	}
	document.querySelector('.contents').style.display = 'none'
	allProductsDiv.innerHTML = '';
	allProductsDiv.append(div);

	console.log(filteredArray.length, "LENGTH")
	filteredArray = []


	document.querySelector('.header').style.display="none"
}else{
	location.reload();
}
}

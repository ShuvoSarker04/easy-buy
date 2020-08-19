
let myInfo = JSON.parse(localStorage.getItem("user"));
console.log(myInfo.contact);
document.querySelector("#firstname").value = myInfo.firstname;
document.querySelector("#lastname").value = myInfo.lastname;
document.querySelector("#email").value = myInfo.email;
document.querySelector("#address").value = myInfo.contact.address.area;
document.querySelector("#city").value = myInfo.contact.address.city;
document.querySelector("#zip").value = myInfo.contact.address.zip;
document.querySelector("#mobile").value = myInfo.contact.mobile;


const allProductsDiv = document.querySelector('#all-products');
let allProductsArray = []; 

firebase.firestore().collection('products').get().then(products=>{
	products.forEach(product=>{
		allProductsArray.push(product.data());
	});
})

document.querySelector(".basicinfo").addEventListener("submit", function (e) {
  console.log("HERE");
  e.preventDefault();
  let user = {
    firstname: document.querySelector("#firstname").value,
    lastname: document.querySelector("#lastname").value,
    email: document.querySelector("#email").value,
    contact: {
      address: {
        area: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        zip: document.querySelector("#zip").value,
      },
      mobile: document.querySelector("#mobile").value,
    },
  };
  console.log(user);
  firebase
    .firestore()
    .collection("users")
    .doc(myInfo.uid)
    .set(user, { merge: true })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
    });
});


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



// function changePassword(){
//     let credentials = {
//         email: firebase.auth().currentUser
//     }
//     firebase.auth().reauthenticateWithCredential()
// }


// (()=>{
// 	let product = {
// 		productId: Date.now().toString(),
// 		gender: 'all',
// 		name: 'MSI RADEON RX 570 8GT',
// 		price: '19000',
// 		sale: "0",
// 		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugiat nihil eum iste nostrum tempore, quae sequi non praesentium sint aliquam maiores ipsam animi officiis nulla culpa et, dolorem libero quasi dignissimos? Alias cupiditate beatae esse qui fuga. Error rerum alias, et numquam quaerat consectetur perferendis porro, est blanditiis quasi doloremque eaque explicabo modi, veritatis iste assumenda esse facere magnam. Sit amet alias facere distinctio illo, quas, architecto consectetur cupiditate minima esse quasi quod deserunt sint reprehenderit a consequatur in dolores? Quibusdam in tempore aut nesciunt pariatur unde sunt rem ipsa, debitis est officiis quis fuga obcaecati, culpa voluptatem hic!',
// 		category: 'electronics',
// 		color: [
// 			'black'
// 		],
// 		type: 'graphics card',
// 		size: 'Universal',
// 		company: 'MSI',
// 		condition: 'Brand New',
// 		productCode: '908JAVU0M',
// 		stock: 'In stock',
// 		img: {
// 			src1:'https://www.techlandbd.com/image/cache/catalog/Graphics%20Card/MSI/RX%20570/RX%20570%208GT%20OC/msi-radeon-rx-570-8gt-oc-graphics-card-500x500.png',
// 			src2:'https://www.techlandbd.com/image/cache/catalog/Graphics%20Card/MSI/RX%20570/RX%20570%208GT%20OC/msi-radeon-rx-570-8gt-oc-graphics-card-bd-500x500.png',
// 			src3:'https://www.techlandbd.com/image/cache/catalog/Graphics%20Card/MSI/RX%20570/RX%20570%208GT%20OC/msi-radeon-rx-570-8gt-oc-graphics-card-price-500x500.png'
// 		}

// 	}


// 	firebase.firestore().collection('products').doc(product.productId).set(product, {merge: true});
// })();



{ //<ul>
	//				<li><a href="mycart.html"><i class="fa fa-shopping-basket"></i>cart</a></li>    
	//				<li><a href="sign up.html">Sign Up</a></li>    
	//				<li><a href="sign in.html">Log In</a></li>    
      //          </ul> 
    }
			

const allProductsDiv = document.querySelector('#all-products');
let allProductsArray = []; 

firebase.firestore().collection('products').get().then(products=>{
	products.forEach(product=>{
		allProductsArray.push(product.data());
	});
})

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
	allProductsDiv.innerHTML = '';
	allProductsDiv.append(div);

	console.log(filteredArray.length, "LENGTH")
	filteredArray = []


	document.querySelector('.header').style.display="none"
}else{
	location.reload();
}
}



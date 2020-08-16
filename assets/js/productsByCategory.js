let params = new URLSearchParams(window.location.search);
let reservedProducts = []
let lastVisitedIndex = 0;
let elementVisible = [];
function capitalize(str){
	console.log(str)
	let st = str[0].toUpperCase();
	let s = str[0];
	let replacedStr = str.replace(s, st);
	return replacedStr;
}

let category = capitalize(params.get('category'));
let gender = params.get('gender') ? capitalize(params.get('gender')) : 'all';
let sub_category = params.get('sub-category');
let sale = params.get('sale');

console.log(category, gender, sub_category)
document.querySelector('#title').innerHTML = `
${gender!='all'? gender: category} <i class="fas fa-angle-double-right"></i> ${gender!='all'? category:sub_category}
`;


if(gender==='all'){	
	firebase
	.firestore()
	.collection('products')
	.where('gender', '==', gender.toLowerCase())
	.where('category', '==', category.toLowerCase())
	.where('sub-category', '==', sub_category.toLowerCase())
	.get()
	.then(snapshot=>{
		snapshot.forEach(snap=>{
			let product = snap.data();
			reservedProducts.push(product);
		})

		for(let i=0; i<8; i++){
			let product = reservedProducts[i];
			if(product){
			let html = `
			<div class="col-md-3 prolist">
							<div class="product-top">
								<a href="product.html?id=${product.productId}"><img src="${product.img.src1}"></a> 
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
								<h3>${product.name}</h3>
								<h5>&#x9f3 ${product.price}</h5>
							</div>
						</div>
			`
	
	
			document.querySelector('#selected_products').innerHTML +=html;
				lastVisitedIndex = i;
				elementVisible.push(product)
		}
		}
	})
	
	}
else if(!sale){	
firebase
.firestore()
.collection('products')
.where('gender', '==', gender.toLowerCase())
.where('category', '==', category.toLowerCase())
.limit(8)
//.where('sub-category', '==', sub_category)
.get()
.then(snapshot=>{
    snapshot.forEach(snap=>{
        let product = snap.data();

        let html = `
        <div class="col-md-3 prolist">
					    <div class="product-top">
					        <a href="product.html?id=${product.productId}"><img src="${product.img.src1}"></a> 
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
					        <h3>${product.name}</h3>
					        <h5>&#x9f3 ${product.price}</h5>
					    </div>
					</div>
        `


        document.querySelector('#selected_products').innerHTML +=html;
    })
})

}else{
	console.log(category, sub_category)
firebase
.firestore()
.collection('products')
.where('sale', '>', "0")
.where('category', '==', category.toLowerCase())
.where('sub-category', '==', sub_category.toLowerCase())
.get()
.then(snapshot=>{
    snapshot.forEach(snap=>{
		let product = snap.data();
		
        let html = `
        <div class="col-md-3 prolist">
					    <div class="product-top">
					        <a href="product.html?id=${product.productId}"><img src="${product.img.src1}"></a> 
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
					      <i class="fa fa-star"></i>  
					      <i class="fa fa-star"></i>  
					      <i class="fa fa-star"></i>  
					      <i class="fa fa-star"></i>  
					      <i class="fa fa-star-half-o"></i>  
					        <h3>${product.name}</h3>
					        <h5>&#x9f3 ${product.price}</h5>
					    </div>
					</div>
        `


        document.querySelector('#selected_products').innerHTML +=html;
    });
});

}

// Categories Navbar
const category_items = document.querySelectorAll('.category-item');

category_items.forEach(item=>{
	item.addEventListener('click', (event)=>{

		document.querySelectorAll('.container-fluid').forEach(e=>{
			if(e){
				// e.target.style.display = 'none'
				e.style.display = "none"
			}
			
		})

		document
		.getElementsByClassName(event.target.id)[0]
		.style.display = "block";

		document
		.getElementsByClassName(event.target.id)[0].addEventListener('mouseover', (e)=>{
			document.getElementsByClassName(event.target.id)[0].style.display = "block"
		
	})
	
	
	let cont  = '.'+event.target.id+' .container';
	document
		.querySelector(cont).addEventListener('mouseout', (e)=>{
			document.getElementsByClassName(event.target.id)[0].style.display = "none"

	})
	
	})
	
})





// const { scrollHeight } = document.documentElement;	
document.addEventListener('scroll', ()=>{
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;	
	if(scrollTop + clientHeight >= (scrollHeight - 500)){
	
		let upto =  elementVisible.length * 2;
		for(let i=elementVisible.length; i<upto; i++){	
			let product = reservedProducts[i];
			console.log(i, elementVisible.length, upto, reservedProducts.length)
			if(product){
			elementVisible.push(product)
			let html = `
			<div class="col-md-3 prolist">
							<div class="product-top">
								<a href="product.html?id=${product.productId}"><img src="${product.img.src1}"></a> 
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
								<h3>${product.name}</h3>
								<h5>&#x9f3 ${product.price}</h5>
							</div>
						</div>
			`
	
	
			document.querySelector('#selected_products').innerHTML +=html;
		}
		}		
	}
	
})
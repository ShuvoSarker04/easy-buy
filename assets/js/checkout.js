console.log(JSON.parse(localStorage.getItem('user')).uid)
firebase.firestore().collection('users').get().then(snapshot=>{
    snapshot.forEach(snap=>{
        console.log(snap.data())
    })
})


let allItems = localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart')) : {};

let itemKeys = Object.keys(allItems);

let html;
let totalAmount = 0;
console.log(allItems)
document.querySelector('#totalItem').innerHTML = itemKeys.length;
itemKeys.forEach(key=>{
    console.log(allItems[key].quantity)
    html = `
    <p><span class="font">${allItems[key].name}/${allItems[key].quantity}</span> <span class="price font">BDT-${allItems[key].price}</span></p>    
    `;
    document.querySelector('.myCart').innerHTML+=html;
    totalAmount+=allItems[key].price;
})

document.querySelector('.myCart').innerHTML+= `
    <hr>
    <p><span class="font">Cart</span> <span class="price font" style="color:black"><b>BDT-${totalAmount}</b></span></p>
`
document.querySelector('form').addEventListener('submit', event =>{
    event.preventDefault();
    let paymentInfo = {
        fname: event.target[0].value,
        email : event.target[1].value,
        address : event.target[2].value,
        city : event.target[3].value,
        dist : event.target[4].value,
        zip : event.target[5].value,
        cardname : event.target[6].value,
        cardnumber : event.target[7].value,
        exmonth : event.target[8].value,
        exyear : event.target[9].value,
        cvv : event.target[10].value,
        paymentDate: new Date()
    }

    let myAcc = JSON.parse(localStorage.getItem('user'));
    // firebase.firestore().collection('users').doc(myAcc.uid).collection('history').set({paymentInfo, allItems});
    console.log(paymentInfo)
    console.log(allItems)
    firebase.firestore()
    .collection('users')
    .doc(myAcc.uid)
    .collection('history')
    .add({paymentInfo, allItems})
    .then(data=>{
        console.log("HERE")
       document.querySelector('.wrapper').style.display="block"
        
    }).catch(err=>{
        alert("Something went wrong. Please try again later.")
    })
})

document.querySelector('#explore').addEventListener('click', ()=>{
    localStorage.removeItem('myCart');
    window.location.href="index.html"
})
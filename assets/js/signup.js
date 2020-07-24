
const signUpForm = document.querySelector('#signupForm');
let errors = [];
let emailAlreadyInUse = false;
function validateForms(user){
    errors = [];
    if(!user.firstname.match(RegExp('[a-zA-Z]+'))){
        errors.push({firstname: "Should not contain special character or number!"});
    }
    if(!user.lastname.match(RegExp('[a-zA-Z]+'))){
        errors.push({lastname: "Should not contain special character or number!"});
    }
    if(!user.password.match(RegExp('^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))).{8,32}$'))){
        errors.push({password: "Should be (8-32, lowercase, uppercase, number, special character)"});
    }
    if(user.confpassword!=user.password){
        errors.push({passMatch: "Password does not match!"});
    }

    if(user.contact.address.area===('' || null || undefined)){
        errors.push({address: "Address required"});
    }
    if(user.contact.address.zip===('' || null || undefined)){
        errors.push({address: "Zip/Postal required"});
    }
    if(errors.length>0) {
        return false;
    }
    else {
        return true;
    } 
}

signUpForm.addEventListener('submit', function(e){
    e.preventDefault();
    let user= {
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        confpassword:document.querySelector('#confpassword').value,

        contact:{
            mobile:document.querySelector('#contact').value,
            address:{
                // city:document.querySelector('#city').value,
                // country: document.querySelector('#country').value,
                area: document.querySelector('#area').value,
                zip: document.querySelector('#zip').value
            }
        }
    }
    if(validateForms(user)){
    


    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(data=>{
        delete user.password;
        delete user.confpassword
        user['uid']=data.user.uid;

        firebase.firestore().collection('users').doc(user['uid'])
        .set(user)
        .then(()=>{
            localStorage.setItem('user', JSON.stringify(user));
            location.href = 'index.html';
        });
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        emailAlreadyInUse = true;
        // ...
      });
}else{
    console.log(errors)
}
});


    
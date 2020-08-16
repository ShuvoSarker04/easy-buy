
const signUpForm = document.querySelector('#signupForm');
let emailAlreadyInUse = false;


var password = document.getElementById("password")
  , confirm_password = document.getElementById("confpassword");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

if(password){
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
}
if(signUpForm){
signUpForm.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.querySelector('#area').value)
    let user= {
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        confpassword:document.querySelector('#confpassword').value,

        contact:{
            mobile:document.querySelector('#contact').value,
            address:{
                city: document.querySelector('#city').value,
                area: document.querySelector('#area').value,
                zip: document.querySelector('#zip').value
            }
        }
    }

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
        if(errorCode="auth/email-already-in-use"){
       document.querySelector('#emailError').innerHTML = errorMessage;
            
        }else{
            document.querySelector('otherError').innerHTML = "Something went wrong. Try later";
            setTimeout(()=>{
                document.querySelector('otherError').innerHTML = "";
            }, 2000);
        }
        
      });

});
}


if(document.querySelector('#emailError')){
document.querySelector('#emailError').onchange = removeError();
function removeError(){
    document.querySelector('#emailError').innerHTML = "";
}
}
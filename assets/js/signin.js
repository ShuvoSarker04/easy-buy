const signInForm = document.querySelector('#signInForm');
if(signInForm!=null){
// LOGIN
signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let user= {

        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
        // contact:{
        //     mobile:document.querySelector('#mobile').value,
        //     address:{
        //         city:document.querySelector('#city').value,
        //         country: document.querySelector('#country').value,
        //         zip: document.querySelector('#zip').value
        //     }
        // }
    }
    let { email, password } = user;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data=>{
        firebase.firestore().collection('users').doc(data.user.uid)
        .get()
        .then((user)=>{
            console.log(user.data())
            localStorage.setItem('user', JSON.stringify(user.data()));
            location.href = 'index.html';
        });
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });

});
}


// PASS RESET
document
.querySelector('#passResetForm')
.addEventListener('submit', (e)=>{
    e.preventDefault();
    let email = e.target[0].value;

    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email.trim())
    .then(function() {
        alert('password reset email sent');
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      })
});

    
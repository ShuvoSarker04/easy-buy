const signInForm = document.querySelector('#signInForm');
if(signInForm!=null){
// LOGIN
signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let user= {

        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    let { email, password } = user;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data=>{
        localStorage.setItem('currentUser', JSON.stringify(firebase.auth().currentUser))
        // console.log(data)
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
     
        document.querySelector('.error').style.display="block";
        document.querySelector('.error p').innerHTML = "Please provide valid credentials";
        setTimeout(()=>{
            document.querySelector('.error p').innerHTML = '';
            document.querySelector('.error').style.display="none"
        },3000)
      });

});
}


// PASS RESET
const resetForm = document.querySelector('#passResetForm');

if(resetForm){
resetForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let email = e.target[0].value;

    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email.trim())
    .then(function() {
        alert('password reset email sent');
      }).catch(function(error) {
        console.log(error)
      })
});

    }
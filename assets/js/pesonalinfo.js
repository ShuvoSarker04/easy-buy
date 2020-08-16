
let myInfo = JSON.parse(localStorage.getItem("user"));
console.log(myInfo.contact);
document.querySelector("#firstname").value = myInfo.firstname;
document.querySelector("#lastname").value = myInfo.lastname;
document.querySelector("#email").value = myInfo.email;
document.querySelector("#address").value = myInfo.contact.address.area;
document.querySelector("#city").value = myInfo.contact.address.city;
document.querySelector("#zip").value = myInfo.contact.address.zip;
document.querySelector("#mobile").value = myInfo.contact.mobile;

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



// function changePassword(){
//     let credentials = {
//         email: firebase.auth().currentUser
//     }
//     firebase.auth().reauthenticateWithCredential()
// }
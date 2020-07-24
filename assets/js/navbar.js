
const menuContent = document.querySelector('#menuContent');

let user = JSON.parse(localStorage.getItem('user'));
if(user && user.uid){
menuContent.innerHTML = `<ul>
<li><a href="index.html"><i class="fa fa-shopping-basket"></i> <span class="badge badge-warning" id="totalItem"></span></a></li>
<li><a href="sign in.html">My account</a></li>        
<li><a href="" id="logout">Logout</a></li>    
</ul>
`
}else{
menuContent.innerHTML = `
<ul>
					<li><a href="index.html"><i class="fa fa-shopping-basket"></i></a></li>    
					<li><a href="sign up.html">Sign Up</a></li>    
					<li><a href="sign in.html">Log In</a></li>    
</ul>
        `
}

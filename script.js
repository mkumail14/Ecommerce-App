document.getElementById('signup-form').style.display = 'none';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4wXkJ87f6GUmiwCUYd6qzpD-OoBb4-Dc",
    authDomain: "ecommerce-web-smit.firebaseapp.com",
    projectId: "ecommerce-web-smit",
    storageBucket: "ecommerce-web-smit.appspot.com",
    messagingSenderId: "744444177405",
    appId: "1:744444177405:web:7122894ad04c72efaf8794",
    measurementId: "G-MDEZJVFWBQ"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

document.getElementById('show-signup').addEventListener('click', (e) => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});


document.getElementById('signUp').addEventListener('click', (e) => {
  var email=document.getElementById('new-email').value
  var password=document.getElementById('new-password').value
  var repassword=document.getElementById('re-new-password').value

  var type;
if(document.getElementById('user-type-signup').value=='customer'){
  type="c";
}else if(document.getElementById('user-type-signup').value=='seller'){
  type="s";
}
    if(password!=repassword){
      alert("Password Dosen't Match")
      password=''
    }
createUserWithEmailAndPassword(auth, email+type, password)
  .then((userCredential) => {
    console.log("Account Created")
    const user = userCredential.user;
    if(type=='s'){    localStorage.setItem(email,null)    }
    console.log(user)
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    Swal.fire(errorCode);


console.log("Error")
  }); 
});

document.getElementById('login').addEventListener('click', (e) => {
  var email=document.getElementById('att-email').value
  var password=document.getElementById('att-password').value
  var type;
if(document.getElementById('user-type-login').value=='customer'){
  type="c";
}if(document.getElementById('user-type-login').value=='seller'){
  type="s";
}
signInWithEmailAndPassword(auth, email+type, password)
  .then((userCredential) => {
console.log("Verificaton Succesful")
    const user = userCredential.user;
    localStorage.setItem('currentUser',email)
    if(type=='c'){
      window.location.href="customerDashboard.html"
    }else if(type=='s'){
      window.location.href="sellerDashboard.html"
    }
console.log(user)
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      Swal.fire(errorCode);

  });

})
// This Js File is for the LoginPage only. 

$(document).ready(function() {
//Initialize Firebase 
  var config = {
    apiKey: "AIzaSyA7i_7yLZxHJxRmtHqvYFepccrvGxbrie8",
    authDomain: "nutritrack-smu.firebaseapp.com",
    databaseURL: "https://nutritrack-smu.firebaseio.com",
    projectId: "nutritrack-smu",
    storageBucket: "nutritrack-smu.appspot.com",
    messagingSenderId: "1078293750813"
  };
  firebase.initializeApp(config);

  //Get Elements 
  var txtEmail = document.getElementById('txtEmail');
  var txtPassword = document.getElementById('txtPassword');
  if (txtEmail.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (txtPassword.length < 4) {
          alert('Please enter a password.');
          return;
        } 
  var btnLogin = document.getElementById('btnLogin'); 
  var btnSignUp = document.getElementById('btnSignUp'); 
  var btnLogout = document.getElementById('btnLogout');

  //add login event on click listener
  btnLogin.addEventListener('click', e=>{
    event.preventDefault(); 
  	//Get email and pass 
  	var email = txtEmail.value; 
  	var pass = txtPassword.value; 
  	var auth = firebase.auth(); 
  	// sign in 
  	var promise = auth.signInWithEmailAndPassword(email, pass); 
  	promise.catch(e => console.log(e.message)); 
    alert("The password is invalid or the user does not have a password."); 
  }); 


  //add signUp Event
  btnSignUp.addEventListener('click', e=>{
  	//Get email and pass
    //TO DO: check for real emails 
    event.preventDefault(); 
    alert("You've Signed up"); 
  	var email = txtEmail.value; 
  	var pass = txtPassword.value; 
  	var auth = firebase.auth(); 
  	// sign in 
  	var promise = auth.createUserWithEmailAndPassword(email, pass); 
  	promise.catch(e => console.log(e.message));
  }); 

  btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut(); 
    console.log('clicked')
    alert('clicked'); 
  }); 

  //add a realtime Listener
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    event.preventDefault(); 
    location.href = "landingpage.html"
    console.log(user); 
    console.log(email); 
    console.log(firebase.user + 'user'); 
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

}); 
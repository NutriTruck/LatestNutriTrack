//Initiate the firebase. 
var config = {
    apiKey: "AIzaSyA7i_7yLZxHJxRmtHqvYFepccrvGxbrie8",
    authDomain: "nutritrack-smu.firebaseapp.com",
    databaseURL: "https://nutritrack-smu.firebaseio.com",
    projectId: "nutritrack-smu",
    storageBucket: "nutritrack-smu.appspot.com",
    messagingSenderId: "1078293750813"
};
firebase.initializeApp(config);
var btnLogout = $('#btnLogout');
var fileButton = $('#fileButton');
var filePlacement = $('#default-img'); 


//handles logout button 
btnLogout.on('click', e => {
    firebase.auth().signOut();
    event.preventDefault();
    console.log('clicked');
    alert('clicked');
    location.href = "index.html"
});

    //handles current signin 
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
            console.log(user); 
            console.log(email); 
            console.log(firebase.user + ' user'); 
            // ...
          } else {
            // User is signed out.
            // ...
          }
        }); 


$(document).ready(function () {
    var user = firebase.auth().currentUser;
    var fileButton = document.getElementById("fileButton");
    
    // Listen for a file selection
    fileButton.addEventListener("change", function (event) {
        event.preventDefault();
        
        //Get file
        var file = e.target.files[0];
        
        // Create a storage ref
        var storageRef = firebase.storage().ref("profiles/" + file.name);
        
        //Upload file.. put method will save the file in the 
        var uploadTask = storageRef.put(file);
        
        // Updated progress bar
        uploadTask.on('state_changed',
            function (snapshot) {},
            function error(err) {},
            function complete() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                $("#fileButton").hide();
                $("#default-img").attr("src", downloadURL);
                console.log(downloadURL);
            });
    //cretae a reference to the file we want to download.
    var starsRef = storageRef.child('profile/cat.jpg'); 

    // get the download URL 
    starsRef.getDownloadURL().then(function() {
        filePlacement.html('<img src="starsRef"/>')

    }).catch(function(error) {
        switch (error.code){
            case 'storage/object_not_found':
                //file doesn't exist:
                break; 
            case 'storage/unauthrozied':
                //user doesnt have permission to access the object
                break; 
            case 'storage/canceled':
                //user canceled the upload
                break; 
        }
    }); 
    });
    

    // $("#done-btn").on("click", function () {
    //     //Add the first name and last name to Firebase database
    //     // var database = firebase.database();
    
    //         // Don't refresh the page!
    //         event.preventDefault();
    //         firstName = $("#userName").val().trim();
    //         lastName = $("#lastName").val().trim();
    //         database.ref().push({
    //             firstName: firstName,
    //             lastName: lastName,
    //         });
    //         console.log(firstName, lastName);
    //        database.ref().on("value", function(snapshot){
               
    //            console.log(snapshot.val().firstName);
    //            console.log(snapshot.val().lastName);
                
    //            var sv = snapshot.val();
    //             $("#userName").text(sv.firstName);
    //             $("#lastName").text(sv.lastName);
                
                
    //             Confirm('Update Profile', 'Are you sure you want to save this profile?', 'Yes', 'Cancel', "profile.html");
             
    //             function Confirm(title, msg, $true, $false, $link) { /*change*/
    //                 var $content = "<div class='dialog-ovelay'>" +
    //                     "<div class='dialog'><header>" +
    //                     " <h3> " + title + " </h3> " +
    //                     "<i class='fa fa-close'></i>" +
    //                     "</header>" +
    //                     "<div class='dialog-msg'>" +
    //                     " <p> " + msg + " </p> " +
    //                     "</div>" +
    //                     "<footer>" +
    //                     "<div class='controls'>" +
    //                     " <button class='button button-danger doAction'>" + $true + "</button> " +
    //                     " <button class='button button-default cancelAction'>" + $false + "</button> " +
    //                     "</div>" +
    //                     "</footer>" +
    //                     "</div>" +
    //                     "</div>";
    //                 $('body').prepend($content);
    //                 $('.doAction').click(function () {
    //                     window.open($link, "_blank"); /*new*/
    //                     $(this).parents('.dialog-ovelay').fadeOut(500, function () {
    //                         $(this).remove();
    //                     });
    //                 });
    //                 $('.cancelAction, .fa-close').click(function () {
    //                     $(this).parents('.dialog-ovelay').fadeOut(500, function () {
    //                         $(this).remove();
    //                     });
    //                 });
    //             }
    //         });
    //     });
    // });

        // $('#done-btn').on('click', function(event){
        //     var user = firebase.auth().currentUser;
        //     event.preventDefault(); 
        //     user.updateProfile({
        //         firstName: $("#userName").val().trim(),
        //         lastName: $("#lastName").val().trim(), 
        //     }).then(function() {
                
        //     }).catch(function(error){
            

        //     }); 

        }); //done on click
        
        //User Information Write 
        $('#done-btn').on('click', function(event){
            var user = firebase.auth().currentUser;
            var database =firebase.database(); 
            var firstName = $("#userName").val().trim();
            var lastName = $("#lastName").val().trim();


            database.ref(currentUser).set({
                firstName: firstName,
                lastName: lastName
            }); 
            console.log(firstName); 
            console.log(lastName); 

        }); 

        //User Information Read 





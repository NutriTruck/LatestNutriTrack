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
    
    //reference the Firebase 
    var database = firebase.database();

    //Global Variable 
    var item;
    var cal = 0;
    var sug = 0;
    var sodi = 0;
    var fat = 0;
    var unixTime;
    var timeStamp;
    var time;
    var pro = 0; 
    var itemName; 
    var carb = 0; 
    // var itemCalTotal = 0;
    // var itemCal =0;
    var newMeal;
    
    // //Get HTML Elements
    // var btnLogout = $('#btnLogout');
    
    // //handles logout button 
    // btnLogout.on('click', e => {
    //     logout(); 

    // });

    // function logout(){
    //     firebase.auth().signOut();
    //     event.preventDefault();
    //     console.log('logged Out');
    //     location.href = "index.html"
    //     alert('clicked');
    // }, 
                        

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
            console.log('not logged in'); 
          }
        });

        //hide the table on page load.
        $('#tableHeader').hide();
        $('#itemName').hide(); 

        //Write Data to Firebase Root Directory 
        $("#add-meal-btn").on("click", function() {
            event.preventDefault();
            item = $("#item").val().trim();
            $('#item').val(' '); 
              
          
            //firebase.database().ref 
            firebase.database().ref('/.info/serverTimeOffset').once('value').then(function stv(data){
                    
            }, 
        
            function (err) {
                return err;
            }); //function(err)

            var queryURL = "https://api.nutritionix.com/v1_1/search/" + item + "?results=0%3A1&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=ef960392&appKey=55b5dd87d2107d2b9ae4e9b7651a181a" 
            //submit value from enter item box
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(r){
                console.log("food Consumed: " + item);
                var results = r.brand_name;
                var itemId = r.hits[0]._id;        
                console.log(itemId);
                var queryURL2 = "https://api.nutritionix.com/v1_1/item?id=" + itemId + "&appId=ef960392&appKey=55b5dd87d2107d2b9ae4e9b7651a181a"

            $.ajax({
                url: queryURL2,
                method: "GET"
                }).done(function(response) {
                    var results2 = response;
                    cal = response.nf_calories;
                    sug = response.nf_sugars;
                    sodi = response.nf_sodium;
                    fat = response.nf_total_fat;
                    pro = response.nf_protein; 
                    itemName = response.item_name; 
                    carb = response.nf_total_carbohydrate; 

                    $("#food").html('<h4>' + 'Food consumed: '+ '</h4>'+ '<h5>' + itemName+ '</h5>'
            + '<h5>' +'Total Calories: ' + cal + '</h5>'
            + '<h5>' + 'Total Fat: ' + fat +  ' gms' + '</h5>'
            + '<h5>' + 'Total Protein Intake: ' + pro +  ' gms' + '</h5>'
            + '<h5>' + 'Total Carbs Consumed:' + carb +  ' gms' + '</h5>'
            + '<h5>' + 'Sugar:  ' + sug +  ' gms' + '</h5>'
            );

                    console.log('Food consumed: ' + itemName); 
                    console.log('Calories consumed: ' + cal);
                    console.log('Sugar consumed: ' + sug + ' gms'); 
                    console.log('Sodium consumed: ' + sodi + ' gms'); 
                    console.log('Fat consumed: ' + fat + ' gms'); 
                    console.log('Protein Intake: ' + pro + ' gms'); 
                    console.log('Carbs consumed: ' + carb + ' gms'); 

                    
                    // console.log('Date in moment ' + data.val() + Date.now());
                    
                    unixTime = Date.now();
                    timeStamp = moment(unixTime).format("MM/DD/YY");
                    
                    //Add table Header
                    $("#tableHeader").html("<div class='tbl-header'><table cellpadding='0' cellspacing='0' border='0'><thead><tr>" + 
                        "<th>" + "Meal" + 
                        "</th><th>" + "Calories" + 
                        "</th><th>" + "Carbs" + 
                        "</th><th>" + "Sodium" + 
                        "</th><th>" + "Fat" + 
                        "</th><th>" + "Date" + 
                        "</th></tr></thead></table></div>"); 
                    //Add table content
                    $(".tbl-content").html("<table cellpadding='0' cellspacing='0' border='0'><tbody><tr><td>" + 
                        itemName + "</td>" + "<td>" + 
                        cal + "</td>" + "<td>" + 
                        sug + "</td>" + "<td>" + 
                        sodi + "</td>" + "<td>" + 
                        fat + "</td>" + "<td>" + 
                        timeStamp + "</td>" + " </td></tr></tbody></table>");
                           
                     //Assign firebase data variables
                     newMeal = {
                        item:item,
                        calories:cal,
                        sug:sug,
                        sodium:sodi,
                        fat:fat,
                        carbs:carb,
                        protein: pro, 
                        time:timeStamp,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    };

               });//2nd Ajax
       

        });//1st Ajax


});//Add Meal
                
              
                 
                
          
                 
 
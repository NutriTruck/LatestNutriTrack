'use strict'; 

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
    var database = firebase.database();

    var item;
    var cal;
    var sug;
    var sodi;
    var fat;
    var unixTime;
    var timeStamp;
    var time;

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


    $("#add-meal-btn").on("click", function() {
            
        event.preventDefault();
        item = $("#item").val().trim();
        $('#item').val(' '); 
        alert('Food Added');         
          

        firebase.database().ref('/.info/serverTimeOffset').once('value').then(function stv(data){
                
            // console.log('Date in moment ' + data.val() + Date.now());

            unixTime = Date.now();
            timeStamp = moment(unixTime).format("MM/DD/YY");
            
            console.log("today's Date " + timeStamp);
        }, //firebase.database().ref 
        
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

                    console.log('Food consumed: ' + itemName); 
                    console.log('Calories consumed: ' + cal);
                    console.log('Sugar consumed: ' + sug + ' gms'); 
                    console.log('Sodium consumed: ' + sodi + ' gms'); 
                    console.log('Fat consumed: ' + fat + ' gms'); 
                    console.log('Protein Intake: ' + pro + ' gms'); 
                    console.log('Carbs consumed: ' + carb + ' gms'); 

                    var newMeal = {

                        item:item,
                        calories:cal,
                        sugar:sug,
                        sodium:sodi,
                        fat:fat,
                        carbs:carb,
                        protein: pro, 
                        time:timeStamp,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    };

                    database.ref().push(newMeal);

                        //Create if statement for number range

                    var ctx = document.getElementById("myChart");
                        
                    var myChart = new Chart(ctx, {
                        type: 'polarArea',
                        data: {
                            labels: ["Calories", "Sugar", "Sodium", "Fats", "Protein", "Carbs" ],
                            datasets: [{
                                label: '# of Votes',
                                data: [cal, sug, sodi, fat, pro,carb],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 164, 1)',
    
                                ],
                                borderColor: [
                                    'rgba(0,0,0,1)',
                                    'rgba(0,0,0,1)',
                                    'rgba(0,0,0,1)',
                                    'rgba(0,0,0,1)',
                                    'rgba(0,0,0,1)',
                                    'rgba(0,0,0,1)',
                                  
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    }); // my chart
  

                    });  //2nd Ajax


               }); //1st Ajax

    });


                $("#reportGen-btn").on("click", function() {
                    $("#tableHeader").html("<div class='tbl-header'><table cellpadding='0' cellspacing='0' border='0'><thead><tr>" + 
                        "<th>" + "Meal" + 
                        "</th><th>" + "Calories" + 
                        "</th><th>" + "Carbs" + 
                        "</th><th>" + "Sodium" + 
                        "</th><th>" + "Fat" + 
                        "</th><th>" + "Date" + 
                        "</th></tr></thead></table></div>"); 
                });
                //retrieving Data from firebase
                database.ref().on("child_added", function(childSnapshot, prevChildKey) {

                    $("#reportGen-btn").on("click", function(event) {
                 
                        event.preventDefault();
                        console.log("Generate works");
                        var fromDate = $("#reportFrom").val();
                        var toDate = $("#reportTo").val();
                        fromDate = moment(fromDate).format("MM/DD/YY");
                        toDate = moment(toDate).format("MM/DD/YY");

                        var itemCal =0;
                        var itemCalTotal = 0;
               
                
                        if(fromDate <= childSnapshot.val().time && childSnapshot.val().time <= toDate){
                           var itemVal = childSnapshot.val().item;
                           console.log(childSnapshot.val().item); 
            
                           $(".tbl-content").append("<table cellpadding='0' cellspacing='0' border='0'><tbody><tr><td>" + 
                            itemVal + "</td>" + "<td>" + 
                            childSnapshot.val().calories + "</td>" + "<td>" + 
                            childSnapshot.val().sugar + "</td>" + "<td>" + 
                            childSnapshot.val().sodium + "</td>" + "<td>" + 
                            childSnapshot.val().fat + "</td>" + "<td>" + 
                            childSnapshot.val().time + "</td>" + " </td></tr></tbody></table>");
            
                        }
                    });

 
                },

                database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {

                    $("#item").val(snapshot.val().item);
                    document.getElementById("myChart");
                    console.log("taco");
     
                
                }));
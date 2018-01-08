
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
    var cal = 0;
    var carb = 0;
    var fat = 0;
    // var pro = 0;
    // var sodi = 0;
    var itemName; 
    var unixTime;
    var timeStamp;
    var time;
    var newMeal;
                        

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
                    fat = response.nf_total_fat;
                    carb = response.nf_total_carbohydrate; 
                    // pro = response.nf_protein;
                    // sodi = response.nf_sodium;
                    itemName = response.item_name; 

                  

                     newMeal = {

                        item:item,
                        calories:cal,
                        fat:fat,
                        carbs:carb,
                        // protein: pro, 
                        // sodium:sodi,
                        time:timeStamp,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    };

                    database.ref().push(newMeal);


                        //Create if statement for number range

                    

                    });  //2nd Ajax


               }); //1st Ajax
         
    });
             
                
                $("#reportGen-btn").on("click", function() {
                    $("#tableHeader").html("<div class='tbl-header'><table cellpadding='0' cellspacing='0' border='0'><thead><tr>" + 
                        "<th>" + "Meal" + 
                        "</th><th>" + "Calories" + 
                        "</th><th>" + "Carbs" +  
                        "</th><th>" + "Fat" + 
                        "</th><th>" + "Protein" +
                        "</th><th>" + "Sodium" + 
                        "</th><th>" + "Date" + 
                        "</th></tr></thead></table></div>"); 
                });
                //retrieving Data from firebase



                database.ref().on("child_added", function(childSnapshot, prevChildKey) {



                    $("#reportGen-btn").on("click", function(event) {
                     
                        event.preventDefault();
                        
                       
                        var fromDate = $("#reportFrom").val();
                        var toDate = $("#reportTo").val();
                        fromDate = moment(fromDate).format("MM/DD/YY");
                        toDate = moment(toDate).format("MM/DD/YY");

                       
               
                        //Applies data from user specified dates
                        if(fromDate <= childSnapshot.val().time && childSnapshot.val().time <= toDate){
                           var itemVal = childSnapshot.val().item;
                           //Creates a table 
                           $(".tbl-content").append("<table cellpadding='0' cellspacing='0' border='0'><tbody><tr><td>" + 
                            itemVal + "</td>" + "<td>" + 
                            childSnapshot.val().calories + "</td>" + "<td>" + 
                            childSnapshot.val().carbs + "</td>" + "<td>" +  
                            childSnapshot.val().fat + "</td>" + "<td>" + 
                            // childSnapshot.val().protein + "</td>" + "<td>" + 
                            // childSnapshot.val().sodium + "</td>" + "<td>" + 
                            childSnapshot.val().time + "</td>" + " </td></tr></tbody></table>");
                            
                           
                        }
                        //Totals each variable
                         if(fromDate <= childSnapshot.val().time && childSnapshot.val().time <= toDate){
                            cal = cal + childSnapshot.val().calories;
                            carb = carb + childSnapshot.val().carbs;
                            fat = fat + childSnapshot.val().fat;
                        //     if(pro > 0 && pro != NaN){
                        //         console.log(pro);
                        //     pro = pro + childSnapshot.val().protein;
                        // }
                        //     sodi = sodi + childSnapshot.val().sodium;
                        // console.log(pro);

                              $("#total").html("<table cellpadding='0' cellspacing='0' border='0'><tbody><tr><td>" + 
                            "Total" + "</td>" + "<td>" + 
                            cal + "</td>" + "<td>" + 
                            carb + "</td>" + "<td>" +  
                            fat + "</td>" + "<td>" + 
                            // pro + "</td>" + "<td>" + 
                            // sodi + "</td>" + "<td>" + 
                            fromDate + "-" + toDate + "</td>" + " </td></tr></tbody></table>");

                        

                        }
                       

                          

             var ctx = document.getElementById("myChart");
                        var myChart = new Chart(ctx, {
                        type: 'polarArea',
                        data: {
                            labels: ["Calories", "Carbohydrates", "Fats", ],
                            datasets: [{
                                label: '# of Votes',
                                data: [cal, carb, fat, ],
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

                    $("#reset").on("click", function(event){ 
                        $(".tbl-content").empty();
                        $("#total").empty();
                        cal = 0;
                        carb = 0;
                        fat = 0;
                        pro = 0;
                       var ctx = document.getElementById("myChart");
                        var myChart = new Chart(ctx, {
                        type: 'polarArea',
                        data: {
                            labels: ["Calories", "Carbohydrates", "Fats",],
                            datasets: [{
                                label: '# of Votes',
                                data: [0, 0, 0, ],
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
                    }); 

                 
            console.log(myChart.data.datasets[0].data[0]);
            console.log(myChart.data.datasets[0]);
 
                });

                   
                },



                database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {

                  
                   
                    

     
                
                }));

    //intiate Firebase
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
   
    $("#add-meal-btn").on("click", function() {
            
        event.preventDefault();
        console.log('clicked'); 
        item = $("#item").val().trim();
        $('#item').val(''); 
        firebase.database().ref('/.info/serverTimeOffset').once('value').then(function stv(data) {        
            console.log(data.val() + Date.now());

            unixTime = Date.now();
            timeStamp = moment(unixTime).format("MM/DD/YY");
            
            console.log(timeStamp);
        }, 
        function (err) {
                return err;
        });

//         var queryURL =  "https://api.nutritionix.com/v1_1/search/" + item + "?results=0%3A1&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=ef960392&appKey=55b5dd87d2107d2b9ae4e9b7651a181a"

//         //submit value from enter item box
        
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).done(function(response) {
//             console.log(item);
//             var results = response.brand_name;
//             var itemId = response.hits[0]._id;        
//             console.log(itemId);
//             var queryURL2 = "https://api.nutritionix.com/v1_1/item?id=" + itemId + "&appId=ef960392&appKey=55b5dd87d2107d2b9ae4e9b7651a181a"

//             $.ajax({
//                 url: queryURL2,
//                 method: "GET"
//                 }).done(function(response) {
//                     var results2 = response;
//                     cal = response.nf_calories;
//                     sug = response.nf_sugars;
//                     sodi = response.nf_sodium;
//                     fat = response.nf_total_fat;

//                     var newMeal = {

//                         item:item,
//                         calories:cal,
//                         sugar:sug,
//                         sodium:sodi,
//                         fat:fat,
//                         time:timeStamp,
//                         dateAdded: firebase.database.ServerValue.TIMESTAMP
//                     };

//                     database.ref().push(newMeal);

//                         //Create if statement for number range

//                     var ctx = document.getElementById("myChart");
                        
//                     var myChart = new Chart(ctx, {
//                         type: 'polarArea',
//                         data: {
//                             labels: ["Calories", "Sugar", "Sodium", "Fats",],
//                             datasets: [{
//                                 label: '# of Votes',
//                                 data: [cal, sug, sodi, fat, 20,],
//                                 backgroundColor: [
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
                                   
//                                 ],
//                                 borderColor: [
//                                     'rgba(255,99,132,1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
                                  
//                                 ],
//                                 borderWidth: 1
//                             }]
//                         },
//                         options: {
//                             scales: {
//                                 yAxes: [{
//                                     ticks: {
//                                         beginAtZero:true
//                                     }
//                                 }]
//                             }
//                         }
//                             });
    

//                     console.log(response);
//                     console.log("calories " + response.nf_calories);
//                     console.log("sugar " + response.nf_sugars);
//                     console.log("sodium " + response.nf_sodium);
//                     console.log("fat " + response.nf_total_fat);

//                     });


//                });



            
//     console.log(myChart);
//     });

//                 $("#reportGen-btn").on("click", function() {
//                     $("#itemName").html("<div class='tbl-header'><table cellpadding='0' cellspacing='0' border='0'><thead><tr><th>" + "Calories" + "</th><th>" + "Sugar" + "</th><th>" + "Sodium" + "</th><th>" + "Fat" + "</th><th>" + "Date" + "</th></tr></thead></table></div>"); 
//                 });
//                 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

// $("#reportGen-btn").on("click", function() {


        
//                 console.log(childSnapshot.val());
//                 console.log(childSnapshot.val().item);
//                 console.log(childSnapshot.val().time);
            




                 
//                         event.preventDefault();
//                         console.log("Generate works");
//                         var fromDate = $("#reportFrom").val();
//                         var toDate = $("#reportTo").val();
//                         fromDate = moment(fromDate).format("MM/DD/YY");
//                         toDate = moment(toDate).format("MM/DD/YY");

//                 var itemCal =0;
//                 var itemCalTotal = 0;
               
                
//         if(fromDate <= childSnapshot.val().time && childSnapshot.val().time <= toDate){
//             console.log("The item " + childSnapshot.val().item + " is between " + fromDate + " and " + toDate);
//             var itemVal = childSnapshot.val().item;
//             console.log(itemVal);
            
//            $(".tbl-content").append("<table cellpadding='0' cellspacing='0' border='0'><tbody><tr><td>" + itemVal + "</td>" + "<td>" + childSnapshot.val().calories + "</td>" + "<td>" + childSnapshot.val().sugar + "</td>" + "<td>" + childSnapshot.val().fat + "</td>" + "<td>" + childSnapshot.val().time + "</td>" + " </td></tr></tbody></table>");
            
//         }
//         // else{
//         //     $("#itemName").html("<table cellpadding='0' cellspacing='0' border='0'><tr><td>" + " No Data.  Please enter a different range." + "</td></tr></table>")
//         // }
        
//         console.log();
//     });

 
//                 },

//                 database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {

//                     $("#item").val(snapshot.val().item);
//                     document.getElementById("myChart");
//                     console.log("taco");
     
                
//             }));
//     // import Chart from 'chart.js';

  </script>
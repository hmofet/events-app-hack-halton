angular.module('discovery.controllers', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


//angular.module('discovery.controllers', ['ionic'])


angular.module('discovery').service('currCity', function() {

  this;

})


angular.module('discovery').service('currEventType', function() {

  this;

})

angular.module('discovery').service('currEventUser', function() {

  this;

})
angular.module('discovery').service('currEventCity', function() {

  this;

})

angular.module('discovery').controller('ChooseCtrl', function($scope, currCity) {

  $scope.serverSideList = [
    { text: "Burlington", value: "Burlington" },
    { text: "Oakville", value: "Oakville" }
  ];
  
  $scope.serverSideChange = function(item) {
    currCity.city=item.value;
   // console.log(currCity.city);
  };

});

angular.module('discovery').controller('EventTypeCtrl', function($scope, currEventType, currCity) {
  $scope.city = function(item) {
    currEventType.event="city";
    console.log(currEventType.event);
  };

  $scope.user = function(item) {
    currEventType.event="user";
    console.log(currEventType.event);
  };
});

angular.module('discovery').controller('EventsCtrl', function($scope, $ionicHistory, $stateParams, currEventType, currEventCity, currEventUser, currCity, $firebaseObject) {
 
//  console.log(currCity.city);
    if(currEventType.event == "user"){

      var ref = new Firebase("https://teamdiscovery.firebaseio.com");
      ref.once("value", function(snapshot) {

      $scope.eventList = [];

        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
          // key will be "fred" the first time and "barney" the second time
          var key = childSnapshot.key();
        //  console.log(key);

          childSnapshot.forEach(function(otherSnapshot){
            var key2 = otherSnapshot.key();

            $scope.eventList.push({ text: otherSnapshot.val().date + " " + otherSnapshot.val().eventName, value: key });
          });
        });
      });


            $scope.eventChange = function(item) {
              currEventUser.event=item.value;
              console.log(item.value);
              var currKey = new Firebase("https://teamdiscovery.firebaseio.com/" + item.value);
              currKey.once("value", function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                        currEventUser.name="Name: " + childSnapshot.val().name;
                          currEventUser.category="Category: " + childSnapshot.val().category;
                          currEventUser.city="City: " + childSnapshot.val().city;
                          currEventUser.email="Email: " + childSnapshot.val().email;
                          currEventUser.eventName="Event: " + childSnapshot.val().eventName;
                          currEventUser.address="Address: " + childSnapshot.val().houseNumber + " " + childSnapshot.val().street;
                          currEventUser.number="Phone number: " + childSnapshot.val().number;
                          currEventUser.postalCode="Postal Code: " + childSnapshot.val().postalCode;
                          currEventUser.repeat="Repeated? " + childSnapshot.val().repeat;
                          currEventUser.time="Time: " + childSnapshot.val().time;
                          currEventUser.date="Date: " + childSnapshot.val().date;
                          console.log(currEventUser);
                          $scope.detail = currEventUser;
              
            });
            });
      }
    } else if (currEventType.event == "city"){


      var ref = new Firebase("https://halton.firebaseio.com");
      ref.once("value", function(snapshot) {
        
      $scope.eventList = [];

        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
          // key will be "fred" the first time and "barney" the second time
          var key = childSnapshot.key();
          console.log(key);

          $scope.eventList.push({ text: childSnapshot.val().date + " " + childSnapshot.val().activity, value: key });
            
        });
      });


            $scope.eventChange = function(item) {
              currEventCity.event=item.value;
              var currKey = new Firebase("https://halton.firebaseio.com/" + item.value);
              var x =0;
              currKey.once("value", function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                  currEventCity.type="city";
                  if (x == 0){
                    currEventCity.activity="Activity: " + childSnapshot.val();
                  } else if (x == 1) {
                  currEventCity.address="Address: " + childSnapshot.val();
                } else if (x == 2){
                  currEventCity.catagory="Category: " + childSnapshot.val();
                } else if ( x == 3) {
                  currEventCity.date="Date: " + childSnapshot.val();
                } else if ( x == 4){
                  currEventCity.postalCode="Postal Code: " + childSnapshot.val();
                } else if ( x == 5 ){
                  currEventCity.room="Room: " + childSnapshot.val();
                } 
                 x++; 
                $scope.detail = currEventCity; 

                  console.log(childSnapshot.val());
              });
            });
      }

    };


  $scope.navBack = function() {
    $ionicHistory.goBack();
  };

});





angular.module('discovery').controller('DetailsCtrl', function($scope, $ionicHistory, $stateParams, currEventType, currEventUser, currEventCity, currCity, $firebaseObject) {
 
//  console.log(currCity.city);
    if(currEventType.event == "user"){
        $scope.detail = currEventUser;
    } else if (currEventType.event == "city"){

        $scope.detail = currEventCity;
        console.log($scope.detail);

    };


  $scope.navBack = function() {
    $ionicHistory.goBack();
  };

});

angular.module('discovery').controller('AddCtrl', function($scope, $ionicHistory, $stateParams, currEventType, currEventUser, currEventCity, currCity, $firebaseObject) {

$scope.formData = {};
var ref = new Firebase("https://teamdiscovery.firebaseio.com/");
    
  $scope.saveEvent = function() {
    $ionicHistory.goBack();

        ref.push({ 
          event: {
            eventName: $scope.formData.eventName,
            category: $scope.formData.category,
            date: $scope.formData.date,
            time: $scope.formData.time,
            repeat: $scope.formData.repeat,
            name: $scope.formData.name,
            number: $scope.formData.number,
            email: $scope.formData.email,
            city: $scope.formData.city,
            houseNumber: $scope.formData.houseNumber,
            street: $scope.formData.street,
            postalcode: $scope.formData.postalCode
          }
    });
  };

});
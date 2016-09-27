// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('discovery', ['ionic', 'firebase'])

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


 .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('choose', {
                url: '/choose',
                templateUrl: 'templates/choose.html',
                controller: 'ChooseCtrl'
            })
            .state('events', {
                url: '/events',
                templateUrl: 'templates/events.html',
                controller: 'EventsCtrl'
            })
            .state('details', {
                url: '/details',
                templateUrl: 'templates/details.html',
                controller: 'DetailsCtrl'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'templates/add.html',
                controller: 'AddCtrl'
            })
            .state('eventtype', {
                url: '/eventtype',
                templateUrl: 'templates/eventtype.html',
                controller: 'EventTypeCtrl'
            })

        $urlRouterProvider.otherwise('/choose');
});
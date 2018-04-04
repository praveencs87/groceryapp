// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angular.filter'])

.run(function($ionicPlatform,logincheck,$location) {

  $ionicPlatform.ready(function() {
if(logincheck()==1)
{
  $location.path('/dash');
}
else
{
 $location.path('/tab/categories');
}
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('dash', {
    url: '/dash',
  
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
    
  })

    .state('myaccount', {
             url: '/myaccount',
   
        templateUrl: 'templates/tab-myaccount.html',
        controller: 'MyaccountCtrl'     
   
  })

 .state('myorders', {
    url: '/myorders',
   templateUrl: 'templates/tab-myorders.html',
        controller: 'MyordersCtrl',
   
  })
.state('order', {
    url: '/myorders/:orderID',
  
        templateUrl: 'templates/tab-order.html',
        controller: 'OrderCtrl'
    
  })
  // Each tab has its own nav history stack:


  .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'CategoriesCtrl'
          
         
        }
      }
    })
    .state('tab.category-detail', {
      url: '/categories/:catId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category-detail.html',
          controller: 'CategoryDetailCtrl'
        }
      }
    })
   .state('tab.product', {
      url: '/products/:prodId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/products.html',
          controller: 'ProductCtrl'
        }
      }
    })
   .state('tab.productsonly', {
    url: '/productlist',
    views: {
      'tab-product': {
        templateUrl: 'templates/productsonly.html',
        controller: 'ProductCtrl'
      }
    }
  })
 
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
 .state('tab.checkout', {
    url: '/checkout',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-checkout.html',
        controller: 'CheckoutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/tab/categories');




});

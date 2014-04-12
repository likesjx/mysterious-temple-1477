'use strict';

angular.module('mysteriousTemple1477App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl',
        resolve : {
            awesomeThings : ["$q","$http","$log", function($q, $http, $log) {
                    $log.log("entering awesomeThings");
                    var defer = $q.defer();

                    $http.get('/api/awesomeThings').success(function(data) {
                        defer.resolve(data);
                    }).error(function(error) {
                        defer.reject(error);
                    });
                    return defer.promise;
                }]
            }
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/end', {
        templateUrl: 'partials/end',
        controller: 'EndCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });

    $rootScope.$on('$viewContentLoaded', function() {
        $rootScope.$broadcast("blurPage");
        return true;
    });
  });

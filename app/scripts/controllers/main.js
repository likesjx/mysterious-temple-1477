'use strict';

angular.module('mysteriousTemple1477App')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      $rootScope.$broadcast("blurPage");
    });
  });

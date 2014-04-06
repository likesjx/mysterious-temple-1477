'use strict';

angular.module('mysteriousTemple1477App')
  .controller('EndCtrl', function ($scope, $http, $interval) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.timeleft = "";

    var seconds = 120;

    $interval(function() {
        seconds -= 1;
        $scope.timeleft = seconds;
    }, 1000, 120);
  });

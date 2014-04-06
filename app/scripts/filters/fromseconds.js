'use strict';

angular.module('mysteriousTemple1477App')
  .filter('fromSeconds', function () {
    return function (input) {
        if(angular.isNumber(input)) {

            var seconds = input%60;
            var minutes = (input-seconds)/60;
            return ""+((minutes<10)?"0":"")+minutes+":"+((seconds<10)?"0":"")+seconds;
        } else return input;
    };
  });

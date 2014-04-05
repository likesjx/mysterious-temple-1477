'use strict';

angular.module('mysteriousTemple1477App')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });

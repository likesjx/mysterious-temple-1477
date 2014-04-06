'use strict';

describe('Filter: fromSeconds', function () {

  // load the filter's module
  beforeEach(module('mysteriousTemple1477App'));

  // initialize a new instance of the filter before each test
  var fromSeconds;
  beforeEach(inject(function ($filter) {
    fromSeconds = $filter('fromSeconds');
  }));

  it('should return the input prefixed with "fromSeconds filter:"', function () {
    var text = 'angularjs';
    expect(fromSeconds(text)).toBe('fromSeconds filter: ' + text);
  });

});

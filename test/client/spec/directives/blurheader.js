'use strict';

describe('Directive: blurHeader', function () {

  // load the directive's module
  beforeEach(module('mysteriousTemple1477App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<blur-header></blur-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the blurHeader directive');
  }));
});

'use strict';

angular.module('mysteriousTemple1477App')
  .directive('blurHeader', ['$log', '$window','$document', '$rootScope', function ($log, $window, $document, $rootScope) {
    return {
      //template: '<div></div>',
      restrict: 'EAC',
      scope : {
        radius : "@"
      },
      link: function (scope, element, attrs) {
          var canvasObj = null,
              bodyObj = angular.element("body"),
              windowObj = angular.element($window),
              docObj = angular.element($document),
              radius = 0;

          $rootScope.$on("blurPage", function(){
              $("header").hide();
              html2canvas(bodyObj, {
                  onrendered: function(canvas) {
                      if (angular.isElement(canvasObj)) {
                          canvasObj.remove();
                      }
                      canvasObj = angular.element(canvas).attr("id", "blurCanvas");
                      element.append(canvasObj);
                      try {
                          radius = parseInt(scope.radius);
                      } catch(err) {
                          $log.error("radius is not set correctly", err);
                          radius = 0;
                      }
                          stackBlurCanvasRGB('blurCanvas', 0, 0, canvasObj.width(), canvasObj.height(), radius);
                         $("header").show();

                  }
              });
          });

          windowObj.bind("scroll", function(){
              canvasObj.css("-webkit-transform", "translatey(-" + windowObj.scrollTop() + "px)");
          })
          window.onresize = function(){
              canvasObj.width(windowObj.width());
          }

          docObj.bind('touchmove', function(){
              canvasObj.css("-webkit-transform", "translatey(-" + windowObj.scrollTop() + "px)");
          })
          docObj.bind('touchend', function(){
              canvasObj.css("-webkit-transform", "translatey(-" + windowObj.scrollTop() + "px)");
          })
      }
    };
  }]);

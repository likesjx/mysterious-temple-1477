'use strict';

angular.module('mysteriousTemple1477App')
  .directive('blurHeader', ['$log', '$window','$document', '$rootScope', '$timeout', function ($log, $window, $document, $rootScope, $timeout) {
    return {
      //template: '<div></div>',
      restrict: 'EAC',
      scope : {
        radius : "@"
      },
      link: function (scope, element, attrs) {
            $log.log("entering link");
          var canvasObj = angular.element("<canvas/>"),
              bodyObj = angular.element("body"),
              windowObj = angular.element($window),
              docObj = angular.element($document),
              radius = 0;
          $log.log(canvasObj);



          $log.log(bodyObj);
          var timeLinked = new Date(),
              timeLoaded = null,
              timeRendered = null,
              timeBlurred = null;
          $log.log(timeLinked, "Linked");

          $rootScope.$on("blurPage", function(){
              timeLoaded = new Date();
              $log.log(timeLoaded, "loaded");
              $log.log(timeLoaded - timeLinked, "loaded - linked");


              html2canvas(bodyObj, {
                  onrendered: function(canvas) {
                      timeRendered = new Date();
                      $log.log(timeRendered);
                      $log.log(timeRendered - timeLoaded, "rendered - loaded")
                      $log.info(canvas);
                      if (angular.isElement(canvasObj)) {
                          element.remove("canvas");
                      }
                      canvasObj = angular.element(canvas).attr("id","canvas");
                      element.append(canvasObj);

                      try {
                          radius = parseInt(scope.radius);
                      } catch(err) {

                      }
                      stackBlurCanvasRGB('canvas', 0, 0, canvasObj.width(), canvasObj.height(), radius);
                      $log.log(scope.radius, angular.isNumber(radius));
                      timeBlurred = new Date();
                      $log.log(timeBlurred);
                      $log.log(timeBlurred - timeRendered, "blurred - rendered")
                      $("header").show();
                  }
              });
              var  vv = setTimeout(function(){
                  //$("header").show();
                  $log.log(timeBlurred - new Date(), 'timeBlurred - showHeader');
                  clearTimeout(vv);
              },200)

          });
          windowObj.bind("scroll", function(){
              $("canvas").css("-webkit-transform", "translatey(-" + $(window).scrollTop() + "px)");
          })
          window.onresize = function(){
              $("canvas").width($(window).width());
          }

          docObj.bind('touchmove', function(){
              $("canvas").css("-webkit-transform", "translatey(-" + $(window).scrollTop() + "px)");
          })
          $(document).bind('touchend', function(){
              $("canvas").css("-webkit-transform", "translatey(-" + $(window).scrollTop() + "px)");
          })
      }
    };
  }]);

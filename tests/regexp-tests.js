'use strict';

/* global apress, module, test, ok */

module('Apress regexp routing module',{
  setup: function() {
    this.status = false;
    var that = this;
    this.testRoute = function(routeToRegister, routeToFire) {
      routeToFire = routeToFire || routeToRegister;

      apress.addRoute(routeToRegister, function(param, param2){
        that.status = true;
        that.param = param;
        that.param2 = param2;
        apress.removeRoute(routeToRegister);
      });

      window.location.hash = '#!' + routeToFire;
      apress.hashTest();
    };
  },
  beforeEach:  function() {
    this.status = false;
    this.param = false;
  }
});

test('should understand route defined by RegExp - /[A-Z][0-9]/',
function() {
  this.testRoute(/[A-Z][0-9]/, '/B5/');
  ok(this.status, 'proper root listener called');
});

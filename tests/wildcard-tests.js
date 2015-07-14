'use strict';

/* global apress, module, test, ok, equal */

module('Apress wildcard routing module',{
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

test('should understand wildcards at the end of the routes - `/foo/*`',
function() {
  this.testRoute('/foo/*', '/foo/barfoo');
  ok(this.status, 'proper route listener called');
});

test('should understand wildcards in the middle of the routes - `/foo/*/bar`',
function() {
  this.testRoute('/foo/*/bar', '/foo/barfoo/bar');
  ok(this.status, 'proper route listener called');
});

test('should pass proper parameter `/foo/%`',
function() {
  this.testRoute('/foo/%', '/foo/bar');
  ok(this.status, 'proper route listener called');
  equal(this.param, 'bar', 'proper param passed to the listener');
});

test('should pass proper parameter in the middle `/foo/%/yo`',
function() {
  this.testRoute('/foo/%/yo', '/foo/bar/yo');
  ok(this.status, 'proper route listener called');
  equal(this.param, 'bar', 'proper param passed to the listener');
});

test('should pass proper parameters `/foo/%/yo/%`',
function() {
  this.testRoute('/foo/%/yo/%', '/foo/bar/yo/foo');
  ok(this.status, 'proper route listener called');
  equal(this.param, 'bar', 'proper param passed to the listener');
  equal(this.param2, 'foo', 'proper param passed to the listener');
});

test('should pass proper parameter and understand wildcard `/foo/*/%`',
function() {
  this.testRoute('/foo/*/%', '/foo/bar/yo');
  ok(this.status, 'proper route listener called');
  equal(this.param, 'yo', 'proper param passed to the listener');
});

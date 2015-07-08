'use strict';

/* global apress, module, test, ok */

module('Apress simple routing module',{
  setup: function() {
    this.status = false;
    var that = this;
    this.testRoute = function(routeToRegister, routeToFire) {
      routeToFire = routeToFire || routeToRegister;

      apress.addRoute(routeToRegister, function(){
        that.status = true;
      });

      window.location.hash = '#' + routeToFire;
      apress.hashTest();
    };
  },
  beforeEach:  function() {
    this.status = false;
  }
});

test('should run proper function for main route (`/`)', function() {
  this.testRoute('/');
  ok(this.status);
});

test('should run proper function for simple route - `/foo`', function() {
  this.testRoute('/foo');
  ok(this.status, 'proper root listener called');
});

test(
'should run proper function for simple route with slash ant the ' +
  'end - `/foobar/`',
function() {
  this.testRoute('/foobar', '/foobar/');
  ok(this.status);
});

test(
'should NOT run function for simple route `/foo` when ' +
  '`/foo/something` is called',
function() {
  this.testRoute('/foo', '/foo/bar');
  ok(!this.status);
});

test('should run proper function for more complex route - `/foo/bar`',
function() {
  this.testRoute('/foo/bar');
  ok(this.status);
});

test('should understand wildcards at the end of the routes - `/foo/*`',
function() {
  this.testRoute('/foo/*', '/foo/barfoo');
  ok(this.status);
});

test('should understand wildcards in the middle of the routes - `/foo/*/bar`',
function() {
  this.testRoute('/foo/*/bar', '/foo/barfoo/bar');
  ok(this.status);
});

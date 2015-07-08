'use strict';

/* global apress, module, test, ok, equal, throws */

module('Apress simple routing module',{
  setup: function() {
    this.status = false;
    var that = this;
    this.testRoute = function(routeToRegister, routeToFire) {
      routeToFire = routeToFire || routeToRegister;

      apress.addRoute(routeToRegister, function(param){
        that.status = true;
        that.param = param;
      });

      window.location.hash = '#' + routeToFire;
      apress.hashTest();
    };
  },
  beforeEach:  function() {
    this.status = false;
    this.param = false;
  }
});

test('should run proper function for main route (`/`)', function() {
  this.testRoute('/');
  ok(this.status, 'proper root listener called');
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
  ok(this.status, 'proper root listener called');
});

test(
'should NOT run function for simple route `/foo` when ' +
  '`/foo/something` is called',
function() {
  this.testRoute('/foo', '/foo/bar');
  ok(!this.status, 'root listener wasn\'t called');
});

test('should run proper function for more complex route - `/foo/bar`',
function() {
  this.testRoute('/foo/bar');
  ok(this.status, 'proper root listener called');
});

test('should understand wildcards at the end of the routes - `/foo/*`',
function() {
  this.testRoute('/foo/*', '/foo/barfoo');
  ok(this.status, 'proper root listener called');
});

test('should understand wildcards in the middle of the routes - `/foo/*/bar`',
function() {
  this.testRoute('/foo/*/bar', '/foo/barfoo/bar');
  ok(this.status, 'proper root listener called');
});

test('should pass proper parameter `/param/%`',
function() {
  this.testRoute('/param/%', '/param/bar');
  ok(this.status, 'proper root listener called');
  equal(this.param, 'bar', 'proper param passed to the listener');
});

test('should pass proper parameter in the middle `/qwe/%/yo`',
function() {
  this.testRoute('/qwe/%/yo', '/qwe/bar/yo');
  ok(this.status, 'proper root listener called');
  equal(this.param, 'bar', 'proper param passed to the listener');
});

test('should pass proper parameter and understand wildcard `/hi/*/%`',
function() {
  this.testRoute('/hi/*/%', '/hi/bar/yo');
  ok(this.status, 'proper root listener called');
  equal(this.param, 'yo', 'proper param passed to the listener');
});

test('should understand route defined by RegExp - /[A-Z][0-9]/',
function() {
  this.testRoute(/[A-Z][0-9]/, '/B5/');
  ok(this.status, 'proper root listener called');
});

test('should run ErrorPage listener if route cannot be found',
function() {
  apress.setErrorPage(function(){
    this.status = true;
  }.bind(this));

  window.location.hash = '#PeperePutti';
  apress.hashTest();

  ok(this.status);
});

test('should throw error when route is not string or regexp',
function() {
  throws(function(){
    apress.addRoute(997, function(param){});
  });
});

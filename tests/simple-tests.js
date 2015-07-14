'use strict';

/* global apress, module, test, ok, throws */

module('Apress simple routing module',{
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

test('should run proper function for main route (`/`)', function() {
  this.testRoute('/');
  ok(this.status, 'proper route listener called');
});

test('should run proper function for simple route - `/foo`', function() {
  this.testRoute('/foo');
  ok(this.status, 'proper route listener called');
});

test('should NOT call route when removeRoute was called on simple route',
function() {
  this.testRoute('/foo2');
  ok(this.status, 'proper route listener called');

  this.status = false;
  apress.removeRoute('/foo2');
  apress.hashTest();
  ok(!this.status, 'listener wasn\'t called');
});

test(
'should run proper function for simple route with slash ant the ' +
  'end - `/foobar/`',
function() {
  this.testRoute('/foobar', '/foobar/');
  ok(this.status, 'proper route listener called');
});

test(
'should NOT run function for simple route `/foo` when ' +
  '`/foo/something` is called',
function() {
  this.testRoute('/foo', '/foo/bar');
  ok(!this.status, 'route listener wasn\'t called');
});

test('should run proper function for more complex route - `/foo/bar`',
function() {
  this.testRoute('/foo/bar');
  ok(this.status, 'proper route listener called');
});

test('should run ErrorPage listener if route cannot be found',
function() {
  apress.setErrorPage(function(){
    this.status = true;
  }.bind(this));

  window.location.hash = '#!PeperePutti';
  apress.hashTest();

  ok(this.status);
});

test('should throw error when route is not string or regexp',
function() {
  throws(function(){
    apress.addRoute(997, function(param){});
  });
});

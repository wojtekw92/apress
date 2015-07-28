'use strict';

/* global apress, module, test, ok, throws */

module('Apress simple routing module',{});

test('should call multiple callbacks attached to the same route',
function() {
  var status1 = false;
  var status2 = false;
  var route = '/foo';

  apress.addRoute(route, function(){
    status1 = true;
  });

  apress.addRoute(route, function(){
    status2 = true;
  });

  window.location.hash = '#!' + route;
  apress.hashTest();

  ok(status1, 'first listener fired');
  ok(status2, 'second listener fired');
});

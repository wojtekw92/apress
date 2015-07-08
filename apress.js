'use strict';
/* exported apress */

var apress = (function(){
  var routes = [];
  /*

  objects inside {
    route: string describing the route
    regexp: PRIVATE regexp constructed to match the route
    callback: function called on route match
  }

  special characters that can be used in the route description
  % return this to the callback
  * match everything but ignore it
  */

  var setup = {
    storage: false,  // use storage api for storing last route
    routingEnable: true, // enable/disable routing
    error404: function(){},
  };

  var hashTest = function () {
    if(setup.routingEnable) {
      var routeExist = false;
      var hash = window.location.hash;
      hash = hash.replace('#','');
      if (hash.length < 1) {
        hash = '/';
      }
      for(var i = 0; i< routes.length; i++) {
        var result = routes[i].regexp.exec(hash);
        if(result !== null) {
          result = result.slice(1);
          routeExist = true;
          routes[i].callback.apply(this, result);
          break;
        }
      }
      if (!routeExist) {
        setup.error404();
      }
    }
  };

  window.onhashchange = hashTest;

  var addRoute = function(route, callback) {
    if (typeof(route) === 'string') {
      var reg = route.replace('/','\\/');
      reg = reg.replace('*','[\\w-]+');
      reg = reg.replace('%','([\\w-]+)');
      routes.push({'route': route,
                   'regexp': new RegExp('^'+reg+'[\\/?]?$','i'),
                   'callback': callback});
    } else {
      routes.push({'route': route.toString(),
      'regexp': route,
      'callback': callback});
    }
  };

  var setRoute = function(route) {
    window.location.hash = '#' + route;
  };
  var getRoute = function() {
    return window.location.hash.replace('#','');
  };

  var setErrorPage = function(errorFunction) {
    setup.error404 = errorFunction;
  };
  //API for router
  return {
    addRoute: addRoute,
    hashTest: hashTest,
    setRoute: setRoute,
    getRoute: getRoute,
    setErrorPage: setErrorPage,
  };
})();

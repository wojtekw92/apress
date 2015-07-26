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
  % pass parameter on that position to the callback
  * wildcard that matches everything

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
      hash = hash.replace('#!','');
      if (hash.length < 1) {
        hash = '/';
      }
      for(var i = 0, l = routes.length; i < l ; i++) {
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

  var addRoute = function(route, callback) {
    if (typeof route === 'string') {
      var regexp = route.replace('/','\\/')
                        .replace('*','[\\w-]+')
                        .replace(/\%/g, '([\\w-]+)');
      routes.push({
        'route': route,
        'regexp': new RegExp('^'+ regexp +'[\\/?]?$','i'),
        'callback': callback
      });
    } else if (route instanceof RegExp) {
      routes.push({
        'route': route.toString(),
        'regexp': route,
        'callback': callback
      });
    } else {
      throw Error('Route should be string or regular expression');
    }
  };

  var setRoute = function(route, redirect) {
    if(!redirect) {
      lock(true);
      window.onhashchange = function() {
        lock(false);
        window.onhashchange = hashTest;
      };
    }
    window.location.hash = '#!' + route;
  };
  var getRoute = function() {
    return window.location.hash.replace('#!','');
  };

  var setErrorPage = function(errorFunction) {
    setup.error404 = errorFunction;
  };

  var lock = function (lock) {
    setup.routingEnable = !lock;
  };

  var removeRoute = function(route, callback) {
    if (route instanceof RegExp) {
      route = route.toString();
    }

    for(var i = 0, l = routes.length; i < l ; i++) {
      if (routes[i].route === route) {
        routes.splice(i,1);
        break;
      }
    }
  };

  window.onhashchange = hashTest;

  //API for the router
  return {
    addRoute: addRoute,
    removeRoute: removeRoute,
    hashTest: hashTest,
    setRoute: setRoute,
    getRoute: getRoute,
    lock: lock,
    setErrorPage: setErrorPage,
  };
})();

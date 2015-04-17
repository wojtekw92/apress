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
  };

  var hashTest = function () {
    if(setup.routingEnable) {
      var hash = window.location.hash;
      hash = hash.replace('#','');
      for(var i = 0; i< routes.length; i++) {
        var result = routes[i].regexp.exec(hash);
        if(result !== null) {
          result = result.slice(1);
          routes[i].callback.apply(this, result);
          break;
        }
      }
    }
  };

  window.onhashchange = hashTest;

  var addRoute = function(route, callback) {
    var reg = route.replace('/','\\/');
    reg = reg.replace('*','[\\w-]+');
    reg = reg.replace('%','([\\w-]+)');
    routes.push({'route': route,
                 'regexp': new RegExp(reg,'i'),
                 'callback': callback});
  };

  //API for router
  return {
    addRoute: addRoute,
    hashTest: hashTest,
  };
})();

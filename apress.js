var routeLib = (function(){
  var routes = [];
  /*
  objects inside {
    route:
    callback:
  }
  in route
  % if we wont to get this value as varible
  * if we don't care

  */
  var setup = {
    storage: false,  //USE storage api for storeing last route
    routingEnable: true, //You can disable router lib
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
    hashTest: hashTest
  };
})();

var routeLib = (function(){
  var routes = [];
  /*
  objects inside {
    route: string with route
    regexp: route changed to th regexp object
    callback: callback function started when route is ok
  }
  in route
  % if we wont to get this value as varible
  * if we don't care

  */
  var setup = {
    storeage: false,  //USE storeage api for storeing last route
    rouetingEnable: true, //You can disable router lib
  }
  var hashTest = function () {
    if(setup.rouetingEnable) {
      var hash = window.location.hash;
      hash = hash.replace('#','');
      for(var i = 0; i< routes.length; i++) {
        var results = routes[i].regexp.exec(hash);
        if(results != null) {
          results = results.slice(1);
          routes[i].callback.apply(this, results);
          break;
        }
      }
    }
  }
  window.onhashchange = hashTest;
  var addRoute = function(route, callback) {
    var reg = route.replace('/','\\/');
    reg = reg.replace('*','[\\w-]+');
    reg = reg.replace('%','([\\w-]+)');
    routes.push({'route': route,
                 'regexp': new RegExp(reg,'i'),
                 'callback': callback});
  }
  //API for router
  return {
    addRoute: addRoute,
    hashTest: hashTest,
  };
})();

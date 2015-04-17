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
    storeage: false,  //USE storeage api for storeing last route
    rouetingEnable: true, //You can disable router lib
  }
  var hashTest = function () {
    if(setup.rouetingEnable) {
      var hash = window.location.hash;
      hash = hash.replace('#','');
      for(var i = 0; i< routes.length; i++) {
        var route = routes[i].route.replace('/','\\/');
        route = route.replace('*','[\\w-]+');
        route = route.replace('%','([\\w-]+)');
        var re = new RegExp(route,'i');
        var resualt = re.exec(hash);
        if(resualt != null) {
          resualt = resualt.slice(1);
          routes[i].callback.apply(this, resualt);
          break;
        }
      }
      //console.log(hash);

    }
  }
  window.onhashchange = hashTest;
  var addRoute = function(route, callback) {
    routes.push({'route': route,
                 'callback': callback});
  }
  //API for router
  return {
    addRoute: addRoute,
    hashTest: hashTest
  };
})();

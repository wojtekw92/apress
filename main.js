routeLib.addRoute('ala/srala',function(){alert('ala');});
routeLib.addRoute('wykonaj/*/alert/%',function(param){alert(param);});
routeLib.addRoute('alert/%',function(param){alert(param);});
routeLib.hashTest();

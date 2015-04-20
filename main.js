apress.addRoute('/',function(){
  document.getElementById('content').innerHTML = 'main page';
  });
apress.addRoute('/one/two',function(){
  document.getElementById('content').innerHTML = '/one/two';
  });
apress.addRoute('/run/*/alert/%',function(param){
  document.getElementById('content').innerHTML = '/run/*/aletrt/' + param;
  alert(param);
  });
apress.addRoute('/alert/%',function(param){
  document.getElementById('content').innerHTML = '/alert/' + param;
  alert(param);
  });
apress.setErrorPage(function(){

  document.getElementById('content').innerHTML = '<h1>ERROR 404!</h1>Page <b>' +
  apress.getRoute() + '</b> doesn\'t exist!';
  });
apress.hashTest();

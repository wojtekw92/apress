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
apress.hashTest();

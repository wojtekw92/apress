# apress
Apress.js is a simple library for routing on cliet side in OPA projects.
##how to use
to use apress you need to add it your html file
```
<script src="apress.js"></script>
```
and in your js scripts add routes.
```
apress.addRoute('ala/ma',function(){alert('ala');});
```
the first parameter is route, we can use there * if we dont care what will be there
or % if we wont to use this param as callback param.
if we wont to force check the route for example when page is loading we can use
```
apress.hashTest();
```
##what to do next

##why apress?

localstorage
============

Localstorage in HTML5 can be used only to store string values and if you try to store an object it looses any reference to functions.This is an extension to localstorage to directly store objects and retrieve in the same format without loosing object structure.

Usage
--------

1. Download the extension and include it in your app.

         <script type='text/javascript' src='lib/localstorage.js'></script>

2. It's extends the localstorage namespace by two new functions `setObject` and `getObject` .These two methods also can be used to store simple strings

```js
student = { id : '1', 'name':'John', 'greet' : function() { console.log("Hello") } }
student.greet() //Returns Hello
localStorage.setObject(student.id,student)  // save object against a key
same_student = localStorage.getObject(student.id) //retrieve the same student using the key
same_student.greet()  // returns Hello
```

3.  It can be used to store complex and nested object and it would keep the behaviour of the object as-is.


# Companion
Companion lets you easily load javascript libraries into node that were not developed with node's [module](http://nodejs.org/api/modules.html) implementation.

## Installation
```javascript
npm install companion
```

## Using companion
Companion exposes a single method, `require`.  Use it just like the native `require` function.
```javascript
// libs/third-party.js
var thirdParty = { awesomesauce : true };
```
```javascript
// script.js
var companion = require('companion');
var context = companion.require('libs/third-party.js');

console.log(context.thirdParty); // { awesomesauce : true }
```
### Synchronous or Asynchronous
The above example shows how to use companion to load a file synchronously, just like the native `require` function.  If you'd rather load the file asynchronously, companion has a ayntax for that.
```javascript
companion.require('libs/third-party.js', function(err, data) {
    if (!err) {
        console.log(data.thirdParty); // { awesomesauce : true }
    }
});
```
### Passing a Context
Sometimes you already have an object and you want the contents of the file merged into it.  Sometimes the library you are trying to load requires configuration data or another dependency to exist in the global scope.  Passing in a context will expose that object's properties as global variables in the file; then it will return an object containing those globals along with whatever the library exposes.
```javascript
var context = { foo : 42 };

// synchronously
var result = companion.require('libs/third-party.js', context);
console.log(result); // { foo : 42, thirdParty : { awesomesauce : true } }

// asynchronously
companion.require('libs/third-party.js', context, function(err, data){
    if (!err) {
        console.log(data); // { foo : 42, thirdParty : { awesomesauce : true } }
    }
});
```
## Details
Many third party browser libraries expose a global variable as a namespace.  These are perfect candidates for companion.  The `companion.requre` method returns an object with properties that map to the global variables in the file.  It uses node's [VM](http://nodejs.org/api/vm.html) module to accomplish most of the magic.  As of this writing the VM module is listed as *unstable*.  See the documentation for VM to understand the limitations of companion.
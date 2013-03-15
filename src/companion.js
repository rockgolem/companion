/* global require */
(function(module, undefined){
    "use strict";
    var fs, vm, load;

    fs = require('fs');
    vm = require('vm');

    load = function(filename, context, callback){
        var poly = typeof context === 'function';

        callback = poly ? context : callback;
        context = poly ? {} : (context || {});

        if (callback){
            fs.readFile(filename, function(err, data){
                if (!err) {
                    vm.runInNewContext(data, context, filename);
                }
                callback(err, context);
            });
        } else {
            vm.runInNewContext(fs.readFileSync(filename), context, filename);
        }
        return context;
    };

    module.exports = { require : load };
}(module));
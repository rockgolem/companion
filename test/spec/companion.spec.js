(function(define, expect, it, runs, waitsFor, undefined){
    describe('companion', function(){
        console.log(__dirname);
        var companion = require('../../src/companion.js');

        it('can load a file synchronously', function(){
            var context = companion.require('../fixture/test.js');
            expect(context.Test).toBe(true);
        });

        it('can load a file asynchronously', function(){
            var context;
            runs(function(){
                companion.require('../fixture/foo.js', function(err, data){
                    context = data;
                });
            });
            waitsFor(function(){
                return !!context;
            });
            runs(function(){
                expect(context.Foo).toBe(true);
            });
        });

        it('can pass a context synchronously', function(){
            var context = { baz : 42 };

            companion.require('../fixture/test.js', context);
            expect(context.Test).toBe(true);
            expect(context.baz).toBe(42);
        });

        it('can pass a context synchronously', function(){
            var context;
            runs(function(){
                companion.require('../fixture/foo.js', { biff : true }, function(err, data){
                    context = data;
                });
            });
            waitsFor(function(){
                return !!context;
            });
            runs(function(){
                expect(context.Foo).toBe(true);
                expect(context.biff).toBe(true);
            });
        });
        it('still returns the context when calling asynchronously', function(){
            var context, precontext;
            runs(function(){
                precontext = companion.require('../fixture/foo.js', { zing : false }, function(err, data){
                    context = data;
                });
                expect(precontext.Foo).toBeUndefined();
                expect(precontext.zing).toBe(false);

            });
            waitsFor(function(){
                return !!context;
            });
            runs(function(){
                expect(context.Foo).toBe(true);
                expect(context.zing).toBe(false);
                expect(precontext.Foo).toBe(true);
                expect(precontext.zing).toBe(false);
            });
        });
    });
}(describe, expect, it, runs, waitsFor));
/*global module:false*/

/**
 * Javascript Project Boilerplate
 * Version 0.1.0
 */
module.exports = function(grunt) {
    "use strict";
    var pkg, config;

    pkg = grunt.file.readJSON('package.json');

    config = {
        sources : ['src/companion.js'],
        pkg : pkg
    };

    // Project configuration.
    grunt.initConfig({
        pkg : config.pkg,
        lint : {
            files : ['gruntfile.js', 'test/*.js', 'src/*']
        },
        jshint : {
            options : {
                jshintrc : 'jshint.json'
            },
            source : 'src/companion.js'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint', 'jasmineNode']);

    /**
     * Runs the server-side jasmine tests
     */
    grunt.registerTask('jasmineNode', 'runs jasmine tests intended for jasmine-node', function(){
        var exec = require('child_process').exec,
            child,
            done = grunt.task.current.async(); // Tells Grunt that an async task is complete

        child = exec('jasmine-node test/spec/', function(error, stdout, stderr) {
            grunt.log.writeln(stdout);
            grunt.log.writeln(stderr);
            done(error);
        });
    });
};
'use strict';

module.exports = function(grunt) {

    // configuration
    grunt.initConfig({
        mochaTest: {
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/unit/*.js']
            }
        },

        // start - code coverage settings

        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/'
            }
        },


        clean: {
            coverage: {
                src: ['test/coverage/']
            }
        },

        instrument: {
            files: '*.js',
            options: {
                lazy: true,
                basePath: 'test/coverage/instrument/'
            }
        },


        storeCoverage: {
            options: {
                dir: 'test/coverage/reports'
            }
        },


        makeReport: {
            src: 'test/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        }

        // end - code coverage settings

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('test', ['mochaTest:unit']);
    grunt.registerTask('coverage', ['clean', 'env:coverage',
        'instrument', 'mochaTest:unit', 'storeCoverage', 'makeReport'
    ]);

};

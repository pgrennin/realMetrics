module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/app.css": "less/app.less",
                },
                cleancss: true
            }
        },
        csssplit: {
            your_target: {
                src: ['css/app.css'],
                dest: 'css/app.min.css',
                options: {
                    maxSelectors: 4095,
                    suffix: '.'
                }
            },
        },
        ngtemplates: {
          materialAdmin: {
            src: ['template/**.html', 'template/**/**.html'],
            dest: 'js/templates.js',
            options: {
              htmlmin: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
              }
            }
          }
        },
        watch: {
            a: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less', 'csssplit'],
                options: {
                    nospawn: true
                }
            },
            b: {
                files: ['template/**/*.html'], // which files to watch
                tasks: ['ngtemplates'],
                options: {
                    nospawn: true
                }
            }
        },
        // added this
        connect: {
          server: {
            options: {
              port: 9001,
              base: 'www-root'
            }
          }
        }
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-serve');


    // Default task(s).
    grunt.registerTask('default', ['less']);

    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // added this
    grunt.registerTask('server', 'Start a custom web server', function() {
        grunt.log.writeln('Started web server on port 3000');
        require('./js/app.js').listen(3000);
    });

    grunt.registerTask('server', 'Start a custom web server.', function() {
      grunt.log.writeln('Starting web server on port 1234.');
      require('./js/app.js').listen(1234);
    });

};



// // Project configuration.
// grunt.initConfig({
//   connect: {
//     server: {
//       options: {
//         port: 9001,
//         base: 'www-root'
//       }
//     }
//   }
// });



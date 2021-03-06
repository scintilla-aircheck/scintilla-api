lib = require('bower-files')({
    overrides: {
        modernizr: {
            main: 'modernizr.js',
            dependencies: {}
        }
    }
});

output_dir = 'static/build/';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                compass: true,
                sourceMap: true,
                require: 'susy'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['**/*.scss'],
                    dest: output_dir + 'static/build/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            reload: {
                files: ['**/*.css', '**/js/**/*.js'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            pages: {
                files: ['**/js/**/*.js'],
                tasks: ['webpack', 'cacheBust']
            }
        },
        webpack: {
            scintilla: {
                // webpack options
                entry: "./static/jsx/index.jsx",

                output: {
                    path: output_dir + "javascript/",
                    //filename: "scintilla-[hash].bundle.js"
                    filename: "scintilla.bundle.js"
                },

                module: {
                    loaders: [{
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {compact: false}
                    }]
                },

                stats: {
                    // Configure the console output
                    colors: false,
                    modules: true,
                    reasons: true
                },
                // stats: false disables the stats output

                storeStatsTo: "webpack_status", // writes the status to a variable named webpack_status
                // you may use it later in grunt i.e. <%= webpack_status.hash %>

                progress: false, // Don't show progress
                // Defaults to true

                failOnError: false, // don't report error to grunt if webpack find errors
                // Use this if webpack errors are tolerable and grunt should continue

                watch: true, // use webpacks watcher
                // You need to keep the grunt process alive

                watchOptions: {
                    aggregateTimeout: 500,
                    poll: true
                },
                // Use this when you need to fallback to poll based watching (webpack 1.9.1+ only)

                keepalive: true, // don't finish the grunt task
                // Use this in combination with the watch option

                inline: true  // embed the webpack-dev-server runtime into the bundle
                // Defaults to false
            }
        },
        cacheBust: {
            scintilla: {
                options: {
                    assets: ['static/build/**']
                },
                src: ['templates/common/react_home.html']
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-cache-bust');

    //grunt.registerTask('build', ['sass', 'concat', 'uglify']);
    grunt.registerTask('test', ['sass']);
    //grunt.registerTask('watch', ['watch']);
    grunt.registerTask('default', ['webpack', 'cacheBust']);
};

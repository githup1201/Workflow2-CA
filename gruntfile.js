module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'dist/css/style.css' : 'sass/style.scss'
                }
            }
        },
        cssmin: {
            minify: {
                src: 'dist/css/style.css',
                dest: 'dist/css/minified/style.min.css'
            }
        },
        imagemin: {
           options: {
               optimizationLevel: 3
           },
           files: {
               'dist/images/img.png' : 'src/img.png',
               'dist/images/img.jpg' : 'src/img.jpg',
               'dist/images/img.gif' : 'src/img.gif'
        },    
        dynamic: {
           files: [{
               expand: true,
               cwd: 'dist/images/',
               src: ['**/*.{png,jpg,gif}'],
               dest: 'dist/css/minified-img'
               
           }]
         }    
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: '*.html', 
                    dest:'dist/html',
                    
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/css/minified/style.min.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/style.scss',
                tasks: ['sass', 'cssmin', 'imagemin'],
                options: {
                    nospawn: true
                }
            }
        }   
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['sass','cssmin','imagemin','copy','browserSync','watch']);
    
}
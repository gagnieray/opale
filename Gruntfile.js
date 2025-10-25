module.exports = function (grunt) {
  grunt.initConfig({
    src: 'src/',

    sass: {
      options: {
        implementation: require('sass'),
        sourceMap: false,
        style: 'compressed'
      },

      theme: {
        files: {
          'stylesheets/application.css': '<%= src %>sass/application.scss'
        }
      },

      plugins: {
        files: [
          {
            expand: true,
            cwd: '<%= src %>sass/plugins/',
            src: '**/*.scss',
            dest: 'plugins/',
            ext: '.css',
            extDot: 'last'
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },

      all: {
        src: [
          'stylesheets/*.css',
          'plugins/**/*.css'
        ]
      }
    },

    watch: {
      css: {
        files: ['<%= src %>sass/**/*.scss'],
        tasks: ['css']
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('@lodder/grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('css', ['sass', 'postcss'])

  grunt.registerTask('default', ['css'])
}

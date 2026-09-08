module.exports = function (grunt) {
  grunt.initConfig({
    src: 'src/',

    copy: {
      tablericons: {
        expand: true,
        cwd: 'node_modules/@tabler/icons-webfont/dist',
        src: 'tabler-icons.scss',
        dest: 'src/sass/vendor/',
        options: {
          process: function (content, srcpath) {
            return content.replace(/\.\/fonts/g, '../webfonts');
          },
        },
        rename: function (dest, src) {
          return dest + '_' + src;
        }
      },
      fonts: {
        expand: true,
        cwd: 'node_modules/@tabler/icons-webfont/dist/fonts',
        src: 'tabler-icons.*',
        dest: 'webfonts'
      }
    },

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

      theme: {
        src: [
          'stylesheets/*.css'
        ]
      },

      plugins: {
        src: [
          'plugins/**/*.css'
        ]
      }
    },

    watch: {
      theme: {
        files: ['src/sass/components/*.scss', 'src/sass/_*.scss'],
        tasks: ['css-theme']
      },

      plugins: {
        files: ['src/sass/plugins/**/*.scss', 'src/sass/_*.scss'],
        tasks: ['css-plugins']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('@lodder/grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('css-theme', ['copy', 'sass:theme', 'postcss:theme'])
  grunt.registerTask('css-plugins', ['copy', 'sass:plugins', 'postcss:plugins'])

  grunt.registerTask('default', ['css-theme'])
}

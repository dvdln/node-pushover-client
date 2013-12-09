cfg =
  scripts: [
    'lib/**/*.js'
    'bin/**/*'
  ]

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      scripts: cfg.scripts

    jshint:
      options: grunt.file.readJSON '.jshintrc'
      scripts: cfg.scripts

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', ['jshint']

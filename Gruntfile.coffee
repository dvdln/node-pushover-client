module.exports = (grunt) ->
  path = require 'path'
  pkg = grunt.file.readJSON 'package.json'

  cfg =
    scripts: [
      path.join pkg.directories.lib, '**/*.js'
      path.join pkg.directories.bin, '**/*'
    ],
    tests: path.join pkg.directories.test, '**/*_test.js'

  grunt.initConfig
    pkg: pkg

    watch:
      all: cfg.scripts

    jshint:
      options: grunt.file.readJSON '.jshintrc'
      all: cfg.scripts

    nodeunit:
      all: cfg.tests

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'

  grunt.registerTask 'default', ['jshint', 'nodeunit']

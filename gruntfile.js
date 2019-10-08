module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // auto reload
    watch:{
      options:{
        livereload:true
      }
    },
    express: {
      options: {
        port: 3001
      },
      server: {
        options: {
          script: 'server.js'
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express','watch']);
};

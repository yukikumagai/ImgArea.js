/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({



  concat: {

     core: {
      src: [
        
 
        'js/ImgArea.js',
        'js/OneImg.js',
         'js/ResizeManager.js',
        'js/TransitionManager.js'



      ],
      
      dest: '../js/ImgArea.build.js'
    }

    

    }

  });
   
  grunt.registerTask('default', 'concat');

};

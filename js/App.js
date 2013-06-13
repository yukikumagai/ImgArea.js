(function(window) {

  var App = function() {

      return {

        el: null,

        render: function() {

          this.el = $('<div/>', {id: 'App'});

          var src_array = ['img/3.jpg', 'img/2.jpg','img/0.jpg', 'img/1.jpg'];

          this.ia = new ImgArea({
            src: src_array,
            duration: 3,
            transitionSpeed: 1.3, // In seconds

            transitionType: 'SCROLL_BOTTOM',
            resizeType: 'CENTER_CROP'
          });



          this.el.append(this.ia.render());
          this.ia.play();


          TweenLite.to(this.ia, 1, {physics2D:{velocity:10, angle:0, gravity:100, friction:0.3}});

　
          $(window).resize(_.debounce(_.bind(this.resize, this, true), 100));
          this.resize();

          return this.el;
        },


        resize:function(anim){

          var w_w = $(window).width();
          var w_h = $(window).height();


          if(anim != true){
             this.ia.width = w_w;
            this.ia.height = w_h;
             
          }else{
            
             TweenLite.to(this.ia, 0.3, {
             width: w_w, 
             height: w_h 

            });
　
          }



        }



      }

    };

  window.App = App;

})(window);
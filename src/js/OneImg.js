// Required library: TweenLite.js, jquery.js

(function(window){

    var P = ImgArea.prototype;

    P.OneImg = function(that){

      return {

        setting: null,
        JQ_img: null,

        originalWidth: null,
        originalHeight: null,

        width: null,
        height: null,

        render:function(){


          this.setting = that.setting
          this.JQ_img = that._JQ(this.img);

          this.el = that._JQ('<div/>', {});
          this.el.css({'position': 'absolute', 'overflow': 'hidden', 'opacity': 0});
          if(this.setting.background != null) this.el.css({'background': this.setting.background});
          this.el2 = that._JQ('<div/>', {});
          this.el2.css({'position': 'absolute'});
          this.el2.append(this.img);
          this.el.append(this.el2);

          

          return this.el;

        },
 


        resize:function(){
          this.el.width(this.width);
          this.el.height(this.height);

          that.ResizeManager(this);
        }


};

}



})(window);


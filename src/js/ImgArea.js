// Required library: TweenLite.js, jquery.js

(function(window){

  var ImgArea = function(opt){
    this._initialize(opt);
  }

  var P = ImgArea.prototype;

  P.setting = {

    background: null,
    slideShow: false,
    duration: 3, // In seconds
    fadeInSpeed: 0.3,
    transitionSpeed: 1, // In seconds

    transitionType: 'CROSS_FADE',
    resizeType: 'CENTER_CROP',

    fadeInEasing: Power0.easeOut, 
    transitionEasing: Power2.easeInOut,

    css:{'position': 'relative', 'overflow': 'hidden'},
  //  orientationSwitchRatio: 0, //originalHeight/originalWidth < orientationSwitchRatio

    src: null

  };

  P.el = null;
  P.timer = null;
  P.currentIndex = 0;


  P._TL = TweenLite;
  P._JQ =  $;
  P._option = null;
  P._oneImgArray = [];
  P._width = 100;
  P._height = 100;


 
 

  P._initialize = function(opt){
    this._oneImgArray = [];
    this._paramsUpdate(opt);
    // get width(){ return _r.width; },
    // set width(v){ _r.width = v; this.resize.apply(this); },
    // get height(){ return _r.height; },
    // set height(v){ _r.height = v; this.resize.apply(this); },


    this.TM = new this.TransitionManager(this);

    try{

      Object.defineProperty(this, 'width', {

       // value : 0,
        //writable : true,
       // enumerable : true,
      //  configurable : true,

        get: function(){return this._width;},
        set: function(v){
          this._width = v;  
          this.resize.apply(this);
        } 

    

      });

      Object.defineProperty(this, 'height', {
        get: function(){return this._height;},
        set: function(v){
          this._height = v;  
          this.resize.apply(this);
        }
 


      });

    }catch(error){
      console.log('Line: 153 | width, height | getter setter -> ' + error);
    };

  }

  P._paramsUpdate = function(new_setting){

    this.setting = this._JQ.extend({}, this.setting, new_setting);

  }

  

  P.render = function(){
 
    this.el = this._JQ('<div/>', {'class': 'ImgArea'});
    this.el.css(this.setting.css);
    this.el.css({
      'pointer-events': 'none', 
      '-webkit-touch-callout': 'none', 
      '-webkit-user-select': 'none', 
      '-moz-user-select': 'none', 
      'user-select': 'none',
      '-webkit-transform': 'translate3d(0, 0, 0)',
      'overflow':'hidden'
    });

    this.el.bind("ON_FADEIN", this._bind(this, this._onFadeIn));

    return this.el;
  };



  P.load = function(index){

    this._currentIndex = (index < this.setting.src.length && index >= 0) ? index : 0;

    var img = new Image();
    img.onload =  this._bind(this, function(){this._loadComplete(img);});
    img.src = this.setting.src[this._currentIndex ];

    

 
  }


  P._loadComplete = function(img){

    var oi;
    oi = new this.OneImg(this);
          

    // if(this.setting.transitionType == 'CROSS_FADE') oi = new this.OneImg(this);
    // if(this.setting.transitionType == 'SCROLL_RIGHT') oi = new this.OneImgScroll(this);

    oi.img = img;
    oi.originalWidth = img.width;
    oi.originalHeight = img.height;
    this._oneImgArray.push(oi);

    this.el.append(oi.render());


    this.resize();

    this.TM.start();

    if(this.slideShow)this._startTimer();


  } 


  P._onFadeIn = function(){
    if(this.el.children().length > 1){
      this.el.children().slice(0, this.el.children().length - 1).remove();
      this._oneImgArray.splice(0, this._oneImgArray.length - 1);
    }
  }


  P.play = function(){
    this.slideShow = true;
    (this.timer == null) ? this.load(0) : this.timer.resume();
  }


  P.goNextImg = function(){

    if(this._currentIndex < this.setting.src.length - 1){
      this._currentIndex += 1;
    }else{
      this._currentIndex = 0;
    }
    this.load(this._currentIndex);

  }



  P.resize = function(){

    if(this.el != null){

      this.el.width(this.width); 
      this.el.height(this.height);

 
      for (var i = 0; i < this._oneImgArray.length; i++) {
        this._oneImgArray[i].width = this.width;
        this._oneImgArray[i].height = this.height;
        this._oneImgArray[i].resize();
      };

    }

  }


  


  

  


    


  // Utility Functions //////////////////////////////////////////

  P._bind = function(scope, fn) {
    return function () {
      fn.apply(scope, arguments);
    };
  }

  P._Timer = function(callback, delay) {

    var timerId, start, remaining = delay;

    this.pause = function() {
      clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    this.resume = function() {
      start = new Date();
      timerId = setTimeout(callback, remaining);
    };

    this.reset = function() {
      clearTimeout(timerId);
      remaining = delay;
    };


  }

  P._startTimer = function(that){

    this.timer = new this._Timer(this._bind(this, this.goNextImg), this.setting.duration*1000);
    this.timer.resume();
  }
    

    







 
  window.ImgArea = ImgArea;

})(window);


// Required library: TweenLite.js, jquery.js

(function(window){

	var P = ImgArea.prototype;
	
	P.ResizeManager = function(that){
		

		var rr, tw, th;
		var rt = that.setting.resizeType;

        // if(that.originalHeight/that.originalWidth < that.setting.orientationSwitchRatio){
        //     rt = 'CENTER_NOCROP';
        // }

        if(rt == 'CENTER_CROP'){
        	rr = (that.originalWidth/that.originalHeight > that.width/that.height) ? that.height/that.originalHeight : that.width/that.originalWidth;


        }
        
        if(rt == 'CENTER_NOCROP'){

        	rr = (that.originalWidth/that.originalHeight > that.width/that.height) ? that.width/that.originalWidth : that.height/that.originalHeight;

        }

        
        tw = that.originalWidth*rr;
        th = that.originalHeight*rr;

        that.JQ_img.width(tw);
        that.JQ_img.height(th);

        that.el2.css({
        	left:(that.width - tw)/2,
        	top:(that.height - th)/2
        });

        




    }
    

})(window);


// Required library: TweenLite.js, jquery.js
(function(window) {

	var P = ImgArea.prototype;

	P.TransitionManager = function(that) {

		var ia = that;


		return {

			start: function() {

				var tt = ia.setting.transitionType;


				if (tt == 'CROSS_FADE') {

					if (ia._oneImgArray.length <= 1) {

						ia._TL.to(ia._oneImgArray[ia._oneImgArray.length - 1].el, ia.setting.fadeInSpeed, {
							opacity: 1,
							onComplete: ia._bind(this, this.onFadeIn),
							ease: ia.setting.fadeInEasing
						});

					}

 					if (ia._oneImgArray.length >= 2) {

						ia._TL.set(ia._oneImgArray[ia._oneImgArray.length - 1].el, {
 							opacity: 0
						});


						ia._TL.to(ia._oneImgArray[ia._oneImgArray.length - 1].el, ia.setting.transitionSpeed, {
 							opacity: 1,
							onComplete: ia._bind(this, this.onFadeIn),
							ease: ia.setting.fadeInEasing
						});

					}

				}


				if (tt == 'SCROLL_TOP' || tt == 'SCROLL_RIGHT' || tt == 'SCROLL_BOTTOM' || tt == 'SCROLL_LEFT') {

					if (ia._oneImgArray.length <= 1) {

						ia._TL.to(ia._oneImgArray[ia._oneImgArray.length - 1].el, ia.setting.fadeInSpeed, {
							opacity: 1,
							onComplete: ia._bind(this, this.onFadeIn),
							ease: ia.setting.fadeInEasing
						});


					}


					if (ia._oneImgArray.length >= 2) {

						ia._TL.set(ia._oneImgArray[ia._oneImgArray.length - 1].el, {
							x: ia._width,
							opacity: 1 
						});


						ia._TL.to(ia._oneImgArray[ia._oneImgArray.length - 1].el, ia.setting.transitionSpeed, {
							x: 0,
							onComplete: ia._bind(this, this.onFadeIn),
							ease: ia.setting.transitionEasing
						});

						for (var i = 0; i < ia._oneImgArray.length - 1; i++) {
							ia._TL.to(ia._oneImgArray[i].el, ia.setting.transitionSpeed, {
								x: -ia._width,
								ease: ia.setting.transitionEasing
							});

						};



					}




				}



			},

			onFadeIn: function() {
				ia.el.trigger('ON_FADEIN');
			}

		}




	}


})(window);
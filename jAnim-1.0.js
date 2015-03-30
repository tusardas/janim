/**
 * Library : jAnim.js
 * Author  : The jAnim Team
 * Date    : 27th May, 2012
 * version : 1.0
 * Requires: jQuery v1.7.2
 */

(function( $ ){

    var methods = {
        init : function() {
        	//alert("init() called");
        },
        flyIn : function(options) {
        	var settings = $.extend( {
				        		"speed" : "slow",
				        	    "callback" : function(e) {return e;}
				      	    }, options);
        	return this.hide().each(function(index, obj) {        
				$(obj).slideDown(settings["speed"], settings["callback"]);
			});
        },
        flyOut : function(options) {
        	var settings = $.extend( {
				        		"speed" : "slow",
				        	    "callback" : function(e) {return e;}
				      	    }, options);
        	return this.show().each(function(index, obj) {        
				$(obj).slideUp(settings["speed"], settings["callback"]);
			});
        },
        pinwheel : function(options) {
        	var speedArray = {
        						"slow"   : 35,
        						"medium" : 20,
        						"fast"   : 5
        			         };
        	var settings = $.extend( {
				        		"speed" : "slow"
				      	    }, options);
        	
        	var $obj = this;
            function rotate(degree) {
                $obj.css({ 'WebkitTransform' : 'rotate(' + degree + 'deg)'});  
                $obj.css({ '-moz-transform'  : 'rotate(' + degree + 'deg)'});                      
                var timer = setTimeout(function() {
                    rotate(++degree);
                },speedArray[settings["speed"]]);
            }
	        function rotateIE(obj)	 {
	        	$(obj).css({
	                position: "absolute"});
	        	var target = obj; //  document.getElementById('myDiv');
				
				// simple feature detection
				if (target && typeof target.filters === 'object') {
				
					// original layout
					var x = target.offsetLeft;
					var y = target.offsetTop;
					var w = target.offsetWidth;
					var h = target.offsetHeight;
					
					// save some divisions
					var halfW = w / 2;
					var halfH = h / 2;
					
					var angle = 0;

					setInterval(function(){
						// this is a simple stand-in for a matrix object
						angle += .1;
						var costheta = Math.cos(angle);
						var sintheta = Math.sin(angle);
						var a = costheta;
						var b = sintheta;
						var c = -sintheta;
						var d = costheta;
						var e = 0; // no translation in this example
						var f = 0;
						
						// set linear transformation via Matrix Filter
						var filt = 'progid:DXImageTransform.Microsoft.Matrix(';
						filt +=   'M11=' + a;
						filt += ', M21=' + b;
						filt += ', M12=' + c;
						filt += ', M22=' + d;
						filt += ', SizingMethod="auto expand")';
						target.style['filter'] = filt;

						// assuming a-d are local variables...

						// horizontal shift
						a = Math.abs(a); // or go ternary
						c = Math.abs(c);
						var sx = (a - 1)*halfW + c*halfH;

						// vertical shift
						b = Math.abs(b);
						d = Math.abs(d);
						var sy = b*halfW + (d - 1)*halfH;

						// translation, corrected for origin shift
						// rounding helps--but doesn't eliminate--integer jittering
						target.style.left = Math.round(x + e - sx) + 'px';
						target.style.top = Math.round(y + f - sy) + 'px';
						
					}, speedArray[settings["speed"]]);
				}
	        }
        	/*If the browser is Internet Explorer*/
    		if($.browser["msie"]) {
    			return this.each(function(index, obj) {        
    				//$(obj).slideUp(settings["speed"], settings["callback"]);
    				rotateIE(obj);
    			});
    		}
        	/*For other browsers*/
        	else {
        		rotate(0);
        		return this;
        	}
        },
        popin : function(options) {
        	var settings = $.extend( {
				        		"duration" : 1000,
				        		"callback" : function(e) {return e;}
				      	    }, options);
        	return this.show().each(function(index, obj) {        
				$(obj).fadeOut(settings["duration"]);
				$(obj).fadeIn(settings["duration"], settings["callback"]);
			});
        },
        emphasis : function(options) {
        	var settings = $.extend( {
				        		"duration"    : 1000,
				        		"width"       : "70%",
				        		"fontSize"    : "3em",
				        		"borderWidth" : "10px",
				        		"callback"    : function(e) {return e;}
				      	    }, options);
        	return this.show().each(function(index, obj) {        
				$(obj).animate({
				    	width       : settings["width"],
					    fontSize    : settings["fontSize"],
					    borderWidth : settings["borderWidth"]
				  	}, settings["duration"], settings["callback"] );
			});
        },
        tickerText : function(options) {
        	var settings = $.extend( {
				        		"speed"    : 350,
				        		"content"  : "",
				        		"overwrite": false
				      	    }, options);
		    if(settings["overwrite"]) {
		    	this.text("");
		    }
        	return this.show().each(function(index, obj) {        
				var contentArray = settings["content"].split(""),
		            current = 0,
		            elem = $(obj);
		        setInterval(function() {
		            if(current < contentArray.length) {
		                elem.text(elem.text() + contentArray[current++]);
		            }
		        }, settings["speed"]);
			});
        },
        dropin : function(options) {
        	var config = {
        			texteffect: "collapse",
        			speed: "slow",
        			delay: 0
        		};
        		
    		var classModifier = "texteffects";
    		
    		if (options) {
    			$.extend(config, options);
    		}
    		var nextSetIdentifier = 0;
    		var characterInfoList = new Array();
    		var animationInProgress = new Array();
    		function expandChar(setId, characters, positionInfo, arrayPosition, speed) {
    			var nextPosition = arrayPosition + 1;
    			if ($(characters[arrayPosition]).text() == " ") {
    				if (nextPosition < characters.length) {
    					expandChar(setId, characters, positionInfo, nextPosition, speed);
    				} else {
    					setAnimationInProgress(setId, false);
    				}
    			} else {
    				var top = positionInfo[arrayPosition].top;
    				var left = positionInfo[arrayPosition].left;
    			
    				$(characters[arrayPosition]).css({ position:"absolute" });
    				$(characters[arrayPosition]).animate({ top: top+"px", left: left+"px"}, speed, function () {
    					if (nextPosition < characters.length) {
    						expandChar(setId, characters, positionInfo, nextPosition, speed);
    					}else {
    						setAnimationInProgress(setId, false);
    					}
    				});
    			}
    		};
        	function getSetIdentifier() {
        		var set = "texteffectid_" + nextSetIdentifier;
        		nextSetIdentifier++;
        		return set;
        	}
        	
        	function setCharacterInfo(key, value) {
        		characterInfoList[key] = value;
        	}
        	
        	function getCharacterInfo(key) {
        		return characterInfoList[key];
        	}
        	
        	function setAnimationInProgress(key, value) {
        		animationInProgress[key] = value;
        	}
        	
        	function getAnimationInProgress(key) {
        		return animationInProgress[key];
        	}
        	
        	function explodeChar(setId, characters, positionInfo, arrayPosition, speed, removeAfter) {
        		var nextPosition = arrayPosition + 1;
        		if ($(characters[arrayPosition]).text() == " ") {
        			if (nextPosition < characters.length) {
        				explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
        			} else {
        				setAnimationInProgress(setId, false);
        			}
        		} else {
        			var screenWidth = $(window).width();
        			var screenHeight = $(window).height();
        			
        			var direction = Math.floor(Math.random()*5);
        			
        			var top = "-100px";
        			var left = "-100px";
        			
        			switch (direction) {
        				case 1:
        					var randomNumber = Math.floor(Math.random()*screenHeight);
        					top = randomNumber + "px";
        					break;
        				case 2:
        					var randomNumber = Math.floor(Math.random()*screenWidth);
        					left = randomNumber + "px";
        					break;
        				case 3:
        					var randomNumber = Math.floor(Math.random()*screenHeight);
        					top = randomNumber + "px";
        					left = screenWidth + "px";
        					break;
        				case 4:
        					var randomNumber = Math.floor(Math.random()*screenWidth);
        					left = randomNumber + "px";
        					top = screenHeight + "px";
        					break;
        			}
        			
        			if (!removeAfter) {
        				$(characters[arrayPosition]).show();
        			}
        			$(characters[arrayPosition]).css({ position:"absolute" });
        			$(characters[arrayPosition]).animate({ top: top, left: left}, speed, function () {
        				if (removeAfter) {
        					$(this).hide();
        				}
        				if (nextPosition < characters.length) {
        					explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
        				}else {
        					setAnimationInProgress(setId, false);
        				}
        			});
        		}
        	};
        	return this.each(function () {
        		
    			var setId;
    		
    			if ($(this).hasClass(classModifier)) {
    				// Great - alreay processed the characters
    				setId = $(this).children().eq(0).attr("id");
    			} else {
    				// Need to process the characters
    				setId = getSetIdentifier();
    				var text = $(this).text();
    				var chars = text.match(/.{1}/g);
    				text = "<span id=\"" + setId + "\"><span class=\"char\">" + chars.join("</span><span class=\"char\">") + "</span></span>";
    				$(this).html(text).addClass(classModifier);
    			}
    			
    			// If animation is already in progress, ignore this request
    			if (getAnimationInProgress(setId)) {
    				// We won't animate an item while it is in progress
    			} else {
    	
    				// Reserve space on the container
    				var height = $(this).height();
    				$(this).css({height: height}).removeClass("expand").removeClass("collapse").addClass(config.texteffect);
    				
    				// Get a list of characters
    				var characters = $("#" + setId + " span.char", this);
    				
    				// Find the starting position of each character so we can re-place it
    				var offset = $(characters[0]).offset();
    				var left = 0;
    				var charInfo = getCharacterInfo(setId);
    				if (charInfo == undefined) {
    					var originalInfo = new Array();
    					for (i = 0; i < characters.length; i++) {
    						var itemoffset = $(characters[i]).offset();
    						originalInfo[i] = itemoffset;
    					}
    					charInfo = originalInfo;
    					setCharacterInfo(setId, originalInfo);
    				}
    				setAnimationInProgress(setId, true);
					explodeChar(setId, characters, characterInfoList[setId], 0, 0, false);
					window.setTimeout(function() {
						expandChar(setId, characters, characterInfoList[setId], 0, config.speed);
					}, config.delay);
    			}
    		});
        },
        scatterout : function(options) {
        	var config = {
        			texteffect: "collapse",
        			speed: "slow",
        			delay: 0
        		};
        		
    		var classModifier = "texteffects";
    		
    		if (options) {
    			$.extend(config, options);
    		}
    		var nextSetIdentifier = 0;
    		var characterInfoList = new Array();
    		var animationInProgress = new Array();
    		function expandChar(setId, characters, positionInfo, arrayPosition, speed) {
    			var nextPosition = arrayPosition + 1;
    			if ($(characters[arrayPosition]).text() == " ") {
    				if (nextPosition < characters.length) {
    					expandChar(setId, characters, positionInfo, nextPosition, speed);
    				} else {
    					setAnimationInProgress(setId, false);
    				}
    			} else {
    				var top = positionInfo[arrayPosition].top;
    				var left = positionInfo[arrayPosition].left;
    			
    				$(characters[arrayPosition]).css({ position:"absolute" });
    				$(characters[arrayPosition]).animate({ top: top+"px", left: left+"px"}, speed, function () {
    					if (nextPosition < characters.length) {
    						expandChar(setId, characters, positionInfo, nextPosition, speed);
    					}else {
    						setAnimationInProgress(setId, false);
    					}
    				});
    			}
    		};
        	function getSetIdentifier() {
        		var set = "texteffectid_" + nextSetIdentifier;
        		nextSetIdentifier++;
        		return set;
        	}
        	
        	function setCharacterInfo(key, value) {
        		characterInfoList[key] = value;
        	}
        	
        	function getCharacterInfo(key) {
        		return characterInfoList[key];
        	}
        	
        	function setAnimationInProgress(key, value) {
        		animationInProgress[key] = value;
        	}
        	
        	function getAnimationInProgress(key) {
        		return animationInProgress[key];
        	}
        	
        	function explodeChar(setId, characters, positionInfo, arrayPosition, speed, removeAfter) {
        		var nextPosition = arrayPosition + 1;
        		if ($(characters[arrayPosition]).text() == " ") {
        			if (nextPosition < characters.length) {
        				explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
        			} else {
        				setAnimationInProgress(setId, false);
        			}
        		} else {
        			var screenWidth = $(window).width();
        			var screenHeight = $(window).height();
        			
        			var direction = Math.floor(Math.random()*5);
        			
        			var top = "-100px";
        			var left = "-100px";
        			
        			switch (direction) {
        				case 1:
        					var randomNumber = Math.floor(Math.random()*screenHeight);
        					top = randomNumber + "px";
        					break;
        				case 2:
        					var randomNumber = Math.floor(Math.random()*screenWidth);
        					left = randomNumber + "px";
        					break;
        				case 3:
        					var randomNumber = Math.floor(Math.random()*screenHeight);
        					top = randomNumber + "px";
        					left = screenWidth + "px";
        					break;
        				case 4:
        					var randomNumber = Math.floor(Math.random()*screenWidth);
        					left = randomNumber + "px";
        					top = screenHeight + "px";
        					break;
        			}
        			
        			if (!removeAfter) {
        				$(characters[arrayPosition]).show();
        			}
        			$(characters[arrayPosition]).css({ position:"absolute" });
        			$(characters[arrayPosition]).animate({ top: top, left: left}, speed, function () {
        				if (removeAfter) {
        					$(this).hide();
        				}
        				if (nextPosition < characters.length) {
        					explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
        				}else {
        					setAnimationInProgress(setId, false);
        				}
        			});
        		}
        	};
        	return this.each(function () {
        		
    			var setId;
    		
    			if ($(this).hasClass(classModifier)) {
    				// Great - alreay processed the characters
    				setId = $(this).children().eq(0).attr("id");
    			} else {
    				// Need to process the characters
    				setId = getSetIdentifier();
    				var text = $(this).text();
    				var chars = text.match(/.{1}/g);
    				text = "<span id=\"" + setId + "\"><span class=\"char\">" + chars.join("</span><span class=\"char\">") + "</span></span>";
    				$(this).html(text).addClass(classModifier);
    			}
    			
    			// If animation is already in progress, ignore this request
    			if (getAnimationInProgress(setId)) {
    				// We won't animate an item while it is in progress
    			} else {
    	
    				// Reserve space on the container
    				var height = $(this).height();
    				$(this).css({height: height}).removeClass("expand").removeClass("collapse").addClass(config.texteffect);
    				
    				// Get a list of characters
    				var characters = $("#" + setId + " span.char", this);
    				
    				// Find the starting position of each character so we can re-place it
    				var offset = $(characters[0]).offset();
    				var left = 0;
    				var charInfo = getCharacterInfo(setId);
    				if (charInfo == undefined) {
    					var originalInfo = new Array();
    					for (i = 0; i < characters.length; i++) {
    						var itemoffset = $(characters[i]).offset();
    						originalInfo[i] = itemoffset;
    					}
    					charInfo = originalInfo;
    					setCharacterInfo(setId, originalInfo);
    				}
    				setAnimationInProgress(setId, true);
					for (i = 0; i < characters.length; i++) {
						$(characters[i]).css({ position:"absolute", top: charInfo[i].top+"px", left: charInfo[i].left+"px" });
					}
					window.setTimeout(function() {
						explodeChar(setId, characters, characterInfoList[setId], 0, config.speed, true);
					}, config.delay);
    			}
    		});
        }
    };

    $.fn.jAnim = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.jAnim' );
        }    
    };

})( jQuery );

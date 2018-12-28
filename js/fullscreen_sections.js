
/**************

Fullscreen sections actions

***************/



if(typeof(test_mode) == "undefined")test_mode = false;
fullScreenSections = "";
jQuery(document).ready(function(){
	updateFullscreenSections()
	setControls()
	setCurrentSec()
	jQuery("body").unmousewheel(mouseWheelWork);
	jQuery("body").mousewheel(mouseWheelWork);
	if(test_mode && test_inisec > -1){
		animToSection(test_inisec)
	}
})


function setControls(){
	cloneStepStr = jQuery("#portfolio_control_step_clone").html();
	stepsStr = "";
	jQuery("#portfolio_control_steps").html("");
	fullScreenSections.each(function(index){
		//name = jQuery(this).attr("nav_name")
		name = jQuery(this).find(".work_section_vars").attr("name")
		if(name == undefined || name == "undefined") name = "";
		name = decodeURIComponent(name.replace(/\+/g, '%20'));
		thisstep = cloneStepStr;
		thisstep = thisstep.replace("%name%", name); 
		thisstep = thisstep.replace("%name%", name); 
		thisstep = thisstep.replace("%section_index%", index); 
		thisstep = thisstep.replace("%section_index_visual%", (index+1)); 
		thisstep = jQuery(thisstep)
		if(name =="" ) thisstep.addClass("hiddenStep")
		//stepsStr += thisstep;
		jQuery("#portfolio_control_steps").append(thisstep)
	})
	if(fullScreenSections.length <= 1){
		jQuery("#site_portfolio_controls").fadeOut();
	}else{
		jQuery("#site_portfolio_controls").fadeIn();
	}
	
	jQuery(".portfolio_control_step").click(function(){
		animToSection(parseInt(jQuery(this).attr("section_index")))
	})
	
	fixLabelPosition()

	
	jQuery(".portfolio_control_arrow_up").unbind("click").click(function(e){
		e.preventDefault();
		animToSectionPrev()
	})
	jQuery(".portfolio_control_arrow_down").unbind("click").click(function(e){
		e.preventDefault();
		animToSectionNext()
	})
	
	
}
function updateControls(){
	jQuery("#portfolio_control_steps .portfolio_control_step.current").removeClass("current")
	//console.log("currentSection:"+currentSection)
	if(currentSection > -1)
	jQuery("#portfolio_control_steps .portfolio_control_step").eq(currentSection).addClass("current")
}
if(typeof secIntroFunctionQueue == 'undefined')
	secIntroFunctionQueue = []
function animateSecIntro(){
	//console.log("Sec Intro "+currentSection)
	animateSecs = fullScreenSections.eq(currentSection).find(".animate_afb,.animate_afl,.animate_afr").not(".animate_start")
	TweenMax.killTweensOf(animateSecs);
	TweenMax.to(animateSecs, .01, {delay:+.2,className:"+=animate_start"});
	
	for(j = 0; j<secIntroFunctionQueue.length;j++){
		(secIntroFunctionQueue[j])(fullScreenSections.eq(currentSection));
	}
	

	
}
if(typeof secOutFunctionQueue == 'undefined')
	secOutFunctionQueue = []
function animateSecOut(index){
	animate_elements = fullScreenSections.eq(index).find(".animate_afb,.animate_afl,.animate_afr")
	TweenMax.killTweensOf(animate_elements);
	TweenMax.to(animate_elements, .01, {delay:.4, onComplete:checkIfCurrentSec,onCompleteParams:[index]});
	for(i = 0; i<secOutFunctionQueue.length;i++){
		(secOutFunctionQueue[i])(fullScreenSections.eq(index));
	}
}
function checkIfCurrentSec(index){
	if(index != currentSection){
		animate_elements = fullScreenSections.eq(index).find(".animate_afb,.animate_afl,.animate_afr")
		TweenMax.set(animate_elements, {className:"-=animate_start"});
	}
}


secScrollIsAnim = -1;
function unlockScroll(){
	setCurrentSec()
	waitForFinalEvent(function(){
      unlockScroll_fn()
    }, 500, "unlockScroll");
}
function unlockScroll_fn(){
	secScrollIsAnim = 0;
	if(fullScreenSections.eq(currentSection).attr("id") != "" && typeof(fullScreenSections.eq(currentSection).attr("id")) == "string"){
		window.location.hash = fullScreenSections.eq(currentSection).attr("id");
	}
}

function updateFullscreenSections(){

	fullScreenSections = [];
	fullScreenSections = jQuery(".l-main .l-section.height_full");
	if(fullScreenSections.length > 1){
		jQuery("body").addClass("hasControls")
	}else{
		jQuery("body").removeClass("hasControls")
	}

}
minDif = 9999;
currentSection = -1
prevSection = -1
function setCurrentSec(){
	if(fullScreenSections.length > 0){
		currentScroll = jQuery(window).scrollTop();
		currentSec = -1;
		minDif = 9999;
		//console.log(currentSec)
		fullScreenSections.each(function(index){
			secpos = jQuery(this).offset().top
			if(secpos-currentScroll < minDif){
				currentSec = index;
				minDif = currentScroll-secpos;
			}
		})
		//console.log("currentSection: "+currentSection+" currentSec: "+currentSec)
		if(currentSec != -1){
			setCurrentSec_num(currentSec)
		}
	}
}
function setCurrentSec_num(new_sec){
	
	currentSec = new_sec
	if(currentSection != currentSec){

		prevSection = currentSection;
		currentSection = currentSec;
		fullScreenSections.eq(currentSection).addClass("current_section")
		
		if(fullScreenSections.eq(currentSection).hasClass("color_alternate")){
			jQuery("body").addClass("controls_alt_color")
			jQuery("body").removeClass("controls_light_color")
		}else if(fullScreenSections.eq(currentSection).hasClass("color_primary")){
			jQuery("body").removeClass("controls_alt_color")
			jQuery("body").addClass("controls_light_color")
		}else{
			jQuery("body").removeClass("controls_alt_color")
			jQuery("body").removeClass("controls_light_color")
		}
		if(fullScreenSections.eq(currentSection).hasClass("half_colour_alternate")){
			jQuery("body").addClass("controls_light_color_half")
		}else{
			jQuery("body").removeClass("controls_light_color_half")
		}
		updateControls();
		if(prevSection != -1){
			fullScreenSections.eq(prevSection).removeClass("current_section")
			animateSecOut(prevSection)
		}
		
		animateSecIntro();

		
	}
}

function mouseWheelWork(event, delta){
	
		if(isNavOpen){
			event.preventDefault();
		}else if(secScrollIsAnim == 1){
			event.preventDefault();
		}else if(jQuery(window).width() < 800){
			
		}else if(fullScreenSections.length > 1){
			body = jQuery("html, body");
			currentScroll = jQuery(window).scrollTop();
			windowHeight = jQuery(window).height();
			setCurrentSec()
			currentSec = parseInt(currentSection);
			
			
			_currentsec = getCurrentSec();
			team_items = _currentsec.find("ul.team_list li")

			
				if(delta > 0 && currentSec > 0){
					if(currentSec-1 >= 0 && minDif <= 0){
						event.preventDefault();
						
						//in case you are in the first item, and goes back, then it goes to normal funcionallity scrolling sections:
						if(_currentsec.find(".team_block").length > 0 && _current_memeber_index > 0){
							teamOpenNext_delay(-1)
							
						}else if(_currentsec.find(".vertical_scrolling_content").length > 0 && getCurrentVertScrollingIndex() > 0){
							verticalScrollItemOpenNext_delay(-1)
							
						}else{//normal functionallity:
							animToSection_delay(currentSec-1)
						}
						
					}
				}else if(delta < 0){
					if(	currentSec+1 <= fullScreenSections.length-1 
						&& (fullScreenSections.eq(currentSec).height() + fullScreenSections.eq(currentSec).offset().top - currentScroll <= windowHeight )
						){
						event.preventDefault();
						
						
						if(_currentsec.find(".vertical_scrolling_content").length > 0){
							if(
							getCurrentVertScrollingIndex() == getTotalVertScrollingIndex()-1
							&& currentSec < fullScreenSections.length-1
							){
								animToSection_delay(currentSec+1)
							}else{
								
								verticalScrollItemOpenNext_delay(1)
							}
								
							
						}else if( _currentsec.find(".team_block").length > 0){
							if(
							_current_memeber_index == team_items.length-1
							&& currentSec < fullScreenSections.length-1
							){
								animToSection_delay(currentSec+1)
							}else{
								teamOpenNext_delay(1)
							}
								
							
						}else{
							animToSection_delay(currentSec+1)
						}

					}else if(
						_currentsec.find(".team_block").length > 0
						&& currentSec == fullScreenSections.length-1
					){
						event.preventDefault();
						teamOpenNext_delay(1)
					}else if(
						_currentsec.find(".vertical_scrolling_content").length > 0
						&& currentSec == fullScreenSections.length-1
					){
						event.preventDefault();
						verticalScrollItemOpenNext_delay(1)
					}
				}
		}
	
}
function animToSection_delay(index){
	waitBeforeRepeatEvent(function(){
		animToSection(index)
    }, 400, "animToSection");
}
function animToSection(index){
	//console.log("animToSection:"+index)
	if(secScrollIsAnim != 1){
		
		setCurrentSec_num(index)
		body = jQuery("html, body");
		secScrollIsAnim = 1;
		TweenMax.killTweensOf(body);
		if(fullScreenSections.length == 0) to_scrollTop = 0
		else to_scrollTop = fullScreenSections.eq(index).offset().top;
		
		TweenMax.to(body, .7, {scrollTop:to_scrollTop, ease:Power3.easeInOut, onComplete:unlockScroll})
	}
}

function animToSectionNext(){
	index = parseInt(currentSection)+1;
	if( index <= fullScreenSections.length-1 )
		animToSection(index)
}
function animToSectionPrev(){
	index = parseInt(currentSection)-1;
	if( index >= 0 )
		animToSection(index)
}

jQuery(document).scroll(function (event) {
	if(secScrollIsAnim != 1)
    checkCurrentSection()
});
jQuery(window).resize(function (event) {
	resizeSections()
});
function checkCurrentSection(){
	waitForFinalEvent(function(){
		if(secScrollIsAnim != 1)
		checkCurrentSection_fn()
    }, 50, "checkCurrentSection");
}
function checkCurrentSection_fn(){
	if(secScrollIsAnim != 1)
	setCurrentSec()
}

function resizeSections(){
		waitForFinalEvent(function(){
		resizeSections_fn();
		}, 50, "resizeSections_fn");
}
function resizeSections_fn(){
	
	if(secScrollIsAnim != 1){
		currentSection_temp = currentSection
		waitForFinalEvent(function(){
			if(jQuery(window).width() > 800){
				animToSection(currentSection_temp);
			}
		
		}, 20, "animToSection");
		
	}

	fixLabelPosition()
}

function fixLabelPosition(){
	waitForFinalEvent(function(){
		fixLabelPosition_fn()
	}, 50, "fixLabelPosition");
}
function fixLabelPosition_fn(){

	jQuery(".portfolio_control_step").each(function(){
		_h = jQuery(this).height()
		
		_label = jQuery(this).find(".portfolio_control_step_label");
		_labelalt = jQuery(this).find(".portfolio_control_step_label_alt");
		/*TweenMax.set(_label, {transition:"none"})
		TweenMax.set(_labelalt, {transition:"none"})*/
		//TweenMax.set(_label, {top:(_h/2-_label.height()/2)})
		TweenMax.set(_label, {top:(-_label.height()/2 + _h/2)})
		TweenMax.set(_labelalt, {top:(-_labelalt.height()/2)})
		/*
		waitForFinalEvent(function(){
			TweenMax.set(".portfolio_control_step_label", {clearProps:"transition"})
			TweenMax.set(".portfolio_control_step_label_alt", {clearProps:"transition"})
		}, 10, "fixLabelPositionTransitions");*/
		
	})
/*
	_portfolio_controls = jQuery(".site_portfolio_controls");
	
	main_menu_link = jQuery(".main_menu_link");
	logo_bottom_offset = main_menu_link.height() + main_menu_link.offset().top - jQuery(window).scrollTop()
	last_control_step = _portfolio_controls.find(".portfolio_control_steps .portfolio_control_step:not(.hiddenStep)").last();
	TweenMax.set(last_control_step,{marginBottom:0})
	
	TweenMax.set(_portfolio_controls,{clearProps:"all"})
	
	win_h = jQuery(window).height();
	new_top = win_h/2 - _portfolio_controls.height()/2;
	
	if(new_top < logo_bottom_offset + 20)
		new_top = logo_bottom_offset + 20;
	
	TweenMax.set(_portfolio_controls,{top:new_top})
	
	
	
	bottom_offset = last_control_step.height()/2;
	new_h = new_top + _portfolio_controls.height() - bottom_offset - logo_bottom_offset ;
	
	*/
	
	
}

function getCurrentSec(){
	return fullScreenSections.eq(currentSection);
}
function getCurrentSecAnimDirection(){
	direction = 1;
	if(prevSection - currentSection > 0){
		direction = -1;
	} 
	return direction;
}



















if(typeof readyBeforeDefinitions == 'undefined')
	readyBeforeDefinitions = []
/* document ready: */
readyBeforeDefinitions.push(site_ready_before);
function site_ready_before(){
	/*
	fadeInElements = jQuery(".sequenced_fadein")
	TweenMax.killTweensOf(fadeInElements)
	TweenMax.set(fadeInElements,{autoAlpha:0,scale:.7})	

	fadeInElements2 = jQuery(".sequenced_fadein_noscale")
	TweenMax.killTweensOf(fadeInElements2)
	TweenMax.set(fadeInElements2,{autoAlpha:0})	
	*/
	
	
}


secIntroFunctionQueue.push(base_site_secintro);
function base_site_secintro(_currentsec){

		
		fadeInDelay = .5;
		if(jQuery(window).width() < 1000){
			fadeInDelay = 0;
		}

		fadeInElements = _currentsec.find(".sequenced_fadein")
		TweenMax.killTweensOf(fadeInElements)
		TweenMax.set(fadeInElements,{autoAlpha:0,scale:.8})
		TweenMax.staggerTo(fadeInElements,.5,{delay:fadeInDelay,autoAlpha:1,scale:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
		
		fadeInElements3 = _currentsec.find(".sequenced_fadein_noscale")
		TweenMax.killTweensOf(fadeInElements3)
		TweenMax.set(fadeInElements3,{autoAlpha:0})
		TweenMax.staggerTo(fadeInElements3,.5,{delay:fadeInDelay,autoAlpha:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
		
		
}

secOutFunctionQueue.push(site_secout);
function site_secout(_prevsec){
		if(jQuery(window).width() > 767){
			fadeInElements2 = _prevsec.find(".sequenced_fadein")
		
			TweenMax.killTweensOf(fadeInElements2)
			TweenMax.staggerTo(fadeInElements2,.5,{autoAlpha:0,scale:.8,ease:Power3.easeInOut},-.05)
			
		}
		fadeInElements2 = _prevsec.find(".sequenced_fadein_noscale")
		TweenMax.killTweensOf(fadeInElements2)
		TweenMax.staggerTo(fadeInElements2,.5,{autoAlpha:0,ease:Power3.easeInOut},-.05)

		
}


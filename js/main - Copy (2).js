var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
  document.documentElement.className = "svg";
}


function updateUsBasicVars(){
		// Commonly used dom elements
		$us.canvas.$window = jQuery(window);
		$us.canvas.$document = jQuery(document);
		$us.canvas.$container = jQuery('.l-canvas');
		$us.canvas.$html = jQuery('html');
		$us.canvas.$body = jQuery('.l-body');
		$us.canvas.$htmlBody = jQuery('html, body');
		$us.canvas.$header = $us.canvas.$container.find('.l-header');
		$us.canvas.$main = $us.canvas.$container.find('.l-main');
		$us.canvas.$titlebar = $us.canvas.$container.find('.l-titlebar');
		$us.canvas.$sections = $us.canvas.$container.find('.l-section');
		$us.canvas.$firstSection = $us.canvas.$sections.first();
		$us.canvas.$fullscreenSections = $us.canvas.$sections.filter('.height_full');
		$us.canvas.$topLink = jQuery('.w-toplink');
		$us.canvas.resize();
		//jQuery('.parallax_hor').horparallax();
}


readyBeforeDefinitions = [];
jQuery(document).ready(function(){
	
	
	saveFirstCache();

	for(i = 0; i<readyBeforeDefinitions.length;i++){
		(readyBeforeDefinitions[i])();
	}
	

	jQuery("#main_menu_link").click(function(){
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}else{
			openMainMenu();
		}
	})

	jQuery(".main_menu_close").click(function(){
		if(jQuery("body").hasClass("main_menu_open")){
			closeMainMenu();
		}
	})
	jQuery(".main_menu_block_hitarea_back").click(function(){
		if(!jQuery("body").hasClass("main_menu_open")){
			openMainMenu();
		}
	})

	


	
	
	jQuery( window ).load(function() {
		//stopPreloaderFirst()
		
		setTimeout(function(){stopPreloaderFirst()}, 200)
	});
	


})

function stopPreloaderFirst(){
	stopPreloader()
	jQuery("body").addClass("first_loaded_completed")
}
function stopPreloader(){
	jQuery("body").removeClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:0})
	/*waitForFinalEvent(function(){
      resizeHomeSlider()
    }, 500, "resizeHomeSlider");*/
}
function startPreloader(){
	jQuery("body").addClass("ajax_loading")
	TweenMax.to("#trama_preloader", .5, {autoAlpha:1})
}

isNavOpen = false;
function openMainMenu(){
	
	
	isNavOpen = true;
	jQuery("body").addClass("main_menu_open")
	//TweenMax.killTweensOf("#main_menu_block")
	//TweenMax.to("#main_menu_block", .2, {autoAlpha:1, ease:Power3.easeOut})
	closeInfoItem(jQuery(".ajax_content_container.ajax_content_current .information_item"));

	pauseHomeSlider()
}

function closeMainMenu(){
	isNavOpen = false;
	jQuery("body").removeClass("main_menu_open")
	//TweenMax.killTweensOf("#main_menu_block")
	//TweenMax.to("#main_menu_block", .5, {autoAlpha:0, ease:Power3.easeInOut})

	
	resumeHomeSlider()
}


function setHomeSlider(){
	TweenMax.set(".ajax_content_container.ajax_content_current .home_slider", {autoAlpha:0})
	
	jQuery(".ajax_content_container.ajax_content_current .home_slider").closest(".l-section").addClass("home_slider_section")
	
	home_slider_lines_nav = "";
	jQuery(".ajax_content_container.ajax_content_current .home_slides .home_slide").each(function(index){
		jQuery(this).show()
		TweenMax.set(jQuery(this), {autoAlpha: 0})
		jQuery(this).find(".img_ref").hide()
		background = jQuery("#"+jQuery(this).attr("data_slidebg"))
		TweenMax.set(background, {autoAlpha:0})
		
		home_slider_lines_nav += '\
					<div class="line_ex_icon line_ex_icon_'+index+'" data_index="'+index+'" >\
						<div class="line_ex_icon_top"></div>\
						<div class="line_ex_icon_bottom"></div>\
					</div>\
					'
	})
	jQuery(".ajax_content_container.ajax_content_current .home_slider_nav_dot").html(home_slider_lines_nav);
	jQuery(".ajax_content_container.ajax_content_current .home_slider_nav_dot .line_ex_icon").click(function(){
		openHomeSlide(jQuery(this).attr("data_index"))
		
	})
	
	
	jQuery(".ajax_content_container.ajax_content_current .home_slider_nav_button.home_slider_nav_right").click(function(){
		openNextHomeSlide()
	})
	jQuery(".ajax_content_container.ajax_content_current .home_slider_nav_button.home_slider_nav_left").click(function(){
		openPrevHomeSlide()
	})
	
	
	jQuery(".home_slide a").each(function(){
		jQuery(this).unbind( "click" ).click(function(e){
			e.preventDefault();
			href = jQuery(this).attr("href")
			if(href != window.location.href){
				getSinglePageAjax(href, true)
			}
		})
		
	})
	resizeHomeSlider()
}


lastSliderShownIndex = -1;
function startHomeSlider(){
	TweenMax.to(".ajax_content_container.ajax_content_current .home_slider", .3,{autoAlpha:1})
	sliderActivated = true;

	if(lastSliderShownIndex > 0){
		openHomeSlide(lastSliderShownIndex);
	}else{
		openHomeSlide(0);
	}
	updateUsBasicVars();
	
	centeredBlock = jQuery(".ajax_content_container.ajax_content_current #home_slider_box>.l-section-h");
	TweenMax.set(centeredBlock, {marginTop:"0"})
	_marginTop = (jQuery(".ajax_content_container.ajax_content_current #home_slider_box").height()-centeredBlock.outerHeight())/2;
	if(_marginTop < 0) _marginTop = 0;
	TweenMax.set(centeredBlock, {marginTop:_marginTop+"px"})
	resizeHomeSlider();
	
}

jQuery(window).resize(function(){
	resizeHomeSlider();
})
function resizeHomeSlider(){
	/*
	TweenMax.set(".home_slider .background_slides", {clearProps:"left,width"})
	TweenMax.set(".home_slider .background_slides_color_deco_square", {clearProps:"width"})
	TweenMax.set(".home_slider .background_slides_color_deco_diag", {clearProps:"left,width"})

	slider_width = jQuery(".home_slider").width();
	slider_height = jQuery(".home_slider").height();
	if(jQuery(window).width() > 900)
		diag_width = getTriangleBaseWidth(slider_height, 55.7);
	else if(jQuery(window).width() > 767) //responsive vertical tablet:
		diag_width = getTriangleBaseWidth(slider_height, 70);
	else //responsive vertical phone:
		diag_width = getTriangleBaseWidth(slider_height, 75);
	
	left_pos = (slider_width-diag_width)/2;
	low_limit = 220;
	if(jQuery(window).width() < 767) low_limit = 120;
	
	
	if(left_pos < low_limit)left_pos = low_limit
	
	TweenMax.set(".home_slider .background_slides", {left:left_pos, width:slider_width-left_pos})
	TweenMax.set(".home_slider .background_slides_color_deco_square", {width:left_pos})
	TweenMax.set(".home_slider .background_slides_color_deco_diag", {left:left_pos, width:diag_width})*/
}


currentHomeSlide = "";
currentHomeSlideIndex = -1;
var timerReactivateSlider;
sliderActivated = true;


sliderPrevSlideFunctionQueue = [];
sliderNextSlideFunctionQueue = [];


function openHomeSlide(index){
	if(sliderActivated){
		if(currentHomeSlide != ""){
			currentHomeSlideBackground = jQuery(".ajax_content_container.ajax_content_current #"+currentHomeSlide.attr("data_slidebg"));
			currentHomeSlideBackground.removeClass("current")
			currentHomeSlide.removeClass("current")
			TweenMax.killTweensOf(currentHomeSlideBackground)
			TweenMax.killTweensOf(currentHomeSlide)
			TweenMax.to(currentHomeSlide, .7, {autoAlpha: 0,left:"-50px",ease:Power3.easeOut})
			TweenMax.to(currentHomeSlideBackground, .5, {autoAlpha: 0, delay:.5})
				/*
			TweenMax.set(currentHomeSlide.find(".link_square_arrow"), {position:"relative"});
			TweenMax.to(currentHomeSlide.find(".link_square_arrow"), 1,{top:"10px", ease:Power1.easeOut, clearProps:"top,position"});
			
			*/
			TweenMax.set(currentHomeSlide.find(".slide_tag_line"), {position:"relative"});
			TweenMax.to(currentHomeSlide.find(".slide_tag_line"), 1,{top:"-10px", ease:Power1.easeOut, clearProps:"top,position"});
		
			
			
			for(i = 0; i<sliderPrevSlideFunctionQueue.length;i++){
				(sliderPrevSlideFunctionQueue[i])(currentHomeSlide);
			}
		}
		currentHomeSlideIndex = lastSliderShownIndex = index;
		currentHomeSlide = jQuery(".ajax_content_container.ajax_content_current .home_slides .home_slide").eq(currentHomeSlideIndex);
		currentHomeSlideBackground = jQuery(".ajax_content_container.ajax_content_current #"+currentHomeSlide.attr("data_slidebg"));
		TweenMax.killTweensOf(currentHomeSlideBackground)
		TweenMax.killTweensOf(currentHomeSlide)

		TweenMax.set(currentHomeSlide, {autoAlpha: 0,left:"50px"})
		TweenMax.to(currentHomeSlide, .5, {autoAlpha: 1,left:0, ease:Power3.easeOut, delay:.1})
		/*
		TweenMax.set(currentHomeSlide.find(".link_square_arrow"), {top:"-30px", position:"relative"});
		TweenMax.to(currentHomeSlide.find(".link_square_arrow"), 1,{top:0, ease:Power1.easeOut, clearProps:"top,position"});
		*/
		TweenMax.set(currentHomeSlide.find(".slide_tag_line"), {top:"20px", position:"relative"});
		TweenMax.to(currentHomeSlide.find(".slide_tag_line"), 1,{top:0, clearProps:"top,position"});
		
		TweenMax.to(currentHomeSlide.find(".slide_title>a"), 1.5,{scrambleText:{text:currentHomeSlide.find(".slide_title").attr("data_title"), chars:"Xelement ", revealDelay:.1, tweenLength:false, speed:0.7}});
	
		TweenMax.to(currentHomeSlide.find(".slide_tag_line>a"), 1,{scrambleText:{text:currentHomeSlide.find(".slide_tag_line").attr("data_descr"), chars:"Xelement ", revealDelay:.2,  speed:0.4}});

		currentHomeSlide.addClass("current");
		currentHomeSlideBackground.addClass("current");
		
		delayBg = 0;
		
		
		TweenMax.to(currentHomeSlideBackground, .3, {autoAlpha: 1, onComplete:activateAutoplayHomeSlider})
		delayBg += .7;
		

		jQuery(".ajax_content_container.ajax_content_current .line_ex_icon").removeClass("current")
		jQuery(".ajax_content_container.ajax_content_current .line_ex_icon_"+index).addClass("current")
		
		

		for(i = 0; i<sliderNextSlideFunctionQueue.length;i++){
			(sliderNextSlideFunctionQueue[i])(currentHomeSlide);
		}
	
		
		if(timerReactivateSlider != undefined){
			clearTimeout(timerReactivateSlider);
		}
		sliderActivated = false
		timerReactivateSlider = setTimeout(function(){reactivateSlider()}, 800);
	}
}

function reactivateSlider(){
	sliderActivated = true;
}

function openNextHomeSlide(){
	waitForFinalEvent(function(){
      openNextHomeSlide_fn()
    }, 100, "openNextHomeSlide_fn");

}
function openNextHomeSlide_fn(){
	nextSlide = currentHomeSlideIndex;
	nextSlide ++;
	if(nextSlide > jQuery(".ajax_content_container.ajax_content_current .home_slides .home_slide").length-1)
		nextSlide = 0;
	openHomeSlide(nextSlide)
	
}

function openPrevHomeSlide(){
	waitForFinalEvent(function(){
      openPrevHomeSlide_fn()
    }, 100, "openNextHomeSlide_fn");
}
function openPrevHomeSlide_fn(){
	nextSlide = currentHomeSlideIndex;
	nextSlide --;
	if(nextSlide < 0)
		nextSlide = jQuery(".ajax_content_container.ajax_content_current .home_slides .home_slide").length-1;
	openHomeSlide(nextSlide)
}
var timerHomeSlider;
function activateAutoplayHomeSlider(){
	stopAutoplayHomeSlider();
	timerHomeSlider = setTimeout(function(){openNextHomeSlide()}, 7000);
}
function stopAutoplayHomeSlider(){
	if(timerHomeSlider != undefined){
		clearTimeout(timerHomeSlider);
	}
	sliderActivated = true
	if(timerReactivateSlider != undefined){
		clearTimeout(timerReactivateSlider);
	}
	
}
function pauseHomeSlider(){
	if(jQuery(".ajax_content_container.ajax_content_current .home_slider").length > 0){
		stopAutoplayHomeSlider()
	}
}
function resumeHomeSlider(){
	if(jQuery(".ajax_content_container.ajax_content_current .home_slider").length > 0){
		activateAutoplayHomeSlider()
	}
}









jQuery(document).ready(function(){
	updateFullscreenSections()
	
	
	setControls()
	setCurrentSec()
	jQuery("body").unmousewheel(mouseWheelWork);
	jQuery("body").mousewheel(mouseWheelWork);
	
	setColorSwitcher()
})










function setControls(){
	cloneStepStr = jQuery("#portfolio_control_step_clone").html();
	stepsStr = "";
	jQuery("#portfolio_control_steps").html("");
	fullScreenSections.each(function(index){
		name = jQuery(this).find(".work_section_vars").attr("name")
		if(name == undefined || name == "undefined") name = "";
		name = decodeURIComponent(name.replace(/\+/g, '%20'));
		thisstep = cloneStepStr;
		thisstep = thisstep.replace("%name%", name); 
		thisstep = thisstep.replace("%section_index%", index); 
		
		stepsStr += thisstep;
	})
	if(fullScreenSections.length <= 1){
		jQuery("#trama_portfolio_controls").fadeOut();
	}else{
		jQuery("#trama_portfolio_controls").fadeIn();
	}
	jQuery("#portfolio_control_steps").html(stepsStr)
	jQuery(".portfolio_control_step").click(function(){
		animToSection(jQuery(this).attr("section_index"))
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
	jQuery("#trama_portfolio_controls .portfolio_control_step.current").removeClass("current")
	if(currentSection > -1)
	jQuery("#trama_portfolio_controls .portfolio_control_step").eq(currentSection).addClass("current")
}
if(typeof secIntroFunctionQueue == 'undefined')
	secIntroFunctionQueue = []
function animateSecIntro(){
	console.log("Sec Intro "+currentSection)
	animateSecs = fullScreenSections.eq(currentSection).find(".animate_afb,.animate_afl,.animate_afr").not(".animate_start")
	TweenMax.killTweensOf(animateSecs);
	TweenMax.to(animateSecs, .01, {delay:+.2,className:"+=animate_start"});

	for(i = 0; i<secIntroFunctionQueue.length;i++){
		(secIntroFunctionQueue[i])(fullScreenSections.eq(currentSection));
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
	
}

function updateFullscreenSections(){

	fullScreenSections = [];
	fullScreenSections = jQuery(".l-main .ajax_content_container.ajax_content_current .l-section.height_full");
	if(fullScreenSections.length > 1){
		jQuery("body").addClass("hasControls")
	}else{
		jQuery("body").removeClass("hasControls")
	}

}
minDif = 9999;
currentSection = -1
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
		if(currentSection != -1){
			fullScreenSections.eq(currentSection).removeClass("current_section")
			animateSecOut(currentSection)
		}
		currentSection = currentSec;
		fullScreenSections.eq(currentSection).addClass("current_section")
		checkCurrentSecColor()
		updateControls();
		animateSecIntro();
	}
}
function setColorSwitcher(){
	
	jQuery(".section_color_switcher").each(function(){
		_sections_color = jQuery(this).closest("section.l-section")
		_sections_color.addClass("section_color_switcher_container")
		if(!jQuery(this).hasClass("color_alternate"))
			jQuery(this).addClass("color_normal")
	})
	
	jQuery(".color_switcher_button").click(function(){
		_this_class = jQuery(this).attr("color-class")
		//_section = jQuery(this).closest("section.l-section")
		_section = jQuery("section.l-section.section_color_switcher_container")
		
		jQuery(this).closest(".section_color_switcher").find(".color_switcher_button").each(function(){
			_section.removeClass(jQuery(this).attr("color-class"))
		})
		_section.addClass(_this_class)
		

		
		checkCurrentSecColor()
	})
}
function checkCurrentSecColor(){
		
	if(fullScreenSections.eq(currentSection).hasClass("color_alternate")){
		jQuery("body").addClass("controls_light_color")
	}else{
		jQuery("body").removeClass("controls_light_color")
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
			currentSec = currentSection;
			
			if(delta > 0 && currentSec > 0){
				if(currentSec-1 >= 0 && minDif <= 0){
					event.preventDefault();
					animToSection_delay(currentSec-1)
				}
			}else if(delta < 0){
				if(currentSec+1 <= fullScreenSections.length-1 
					 && (fullScreenSections.eq(currentSec).height() + fullScreenSections.eq(currentSec).offset().top - currentScroll <= windowHeight )
					){
					event.preventDefault();
					animToSection_delay(currentSec+1)
					
				}
			}
		}
	
}
function animToSection_delay(index){
	waitForFinalEvent(function(){
		animToSection(index)
    }, 10, "animToSection");
}
function animToSection(index){
	console.log("animToSection:"+index)
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
	index = currentSection+1;
	if( index <= fullScreenSections.length-1 )
		animToSection(index)
}
function animToSectionPrev(){
	index = currentSection-1;
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
		TweenMax.set(_label, {transition:"none"})
		TweenMax.set(_label, {top:(_h/2-_label.height()/2)})
		waitForFinalEvent(function(){
			TweenMax.set(".portfolio_control_step_label", {clearProps:"transition"})
		}, 10, "fixLabelPositionTransitions");
		
	})

	
}





/***
	ajax transitions
***/
jQuery(document).ready(function(){
	
	setPagesAjaxLinks()
	
	
})
function saveFirstCache(){
	pageString = jQuery(".ajax_content_container.ajax_content_current").html()
	if(typeof page_URL != 'undefined'){
	pageVars = '\
		<div class="page_ajax_vars" \
		id="'+page_id+'"\
		URL="'+page_URL+'"\
		title="'+page_Title+'"\
		WPtitle="'+page_WPtitle+'"\
		postType="'+page_PostType+'"\
		slug="'+page_Slug+'"\
		hash_var=""\
		color_bright="'+page_color_bright+'"\
		color_dark="'+page_color_dark+'"\
		></div>'
	cachedPages[page_URL] = pageString+pageVars;
	}
}

function setPagesAjaxLinks(){

/*
	jQuery("#main_logo_link").unbind( "click" ).click(function(e){
		
		if(isNavOpen){
			e.preventDefault();
			closeMainMenu();
		}else{
			href = jQuery(this).attr("href")
			e.preventDefault();
			//openHomeSmart(true)
			if(href != window.location.href){
				getSinglePageAjax(href, true)
			}
			
		}

	})
*/

	jQuery(".main_nav li").each(function(){
	
		href = jQuery(this).find(">a").attr("href")
		if(homeUrl == href){
			jQuery(this).addClass("homeportfolio_menuitem");
		}
		jQuery(this).find(">a").unbind( "click" ).click(function(e){
			
			e.preventDefault();
			if(!isNavOpen){
				openMainMenu();
			}else{
				
				href = jQuery(this).attr("href")
				if(href != window.location.href){
					getSinglePageAjax(href, true)
				}else{
					closeMainMenu();
				}
			}
		})
	})
	setTimeout(function (){cacheNextPage()}, 2500)
	
}


function showLoading(){
	/*
	if(isNavOpen){
		pagesContainer = jQuery("main.l-content") 
		oldPage = pagesContainer.find(".ajax_content_container.ajax_content_current")
		TweenMax.set(oldPage, {autoAlpha:0})
	}*/
	jQuery("body").addClass("loader_active")
	//TweenMax.to("#trama_loader",.5, {autoAlpha:1});

}
function hideLoading(){
	//TweenMax.to("#trama_loader",1, {autoAlpha:0});
	jQuery("body").removeClass("loader_active")
	closeMainMenu()
}
loadAjaxObj = "";
cachedPages = []


function cacheNextPage(){
	jQuery(".main_nav li a,.section_compartir_postal").each(function(){
		href = jQuery(this).attr("href")
		str_id_page = href.split("#")[0]
		if(str_id_page.charAt(str_id_page.length-1) != "/")
		str_id_page = str_id_page+"/";
		if(cachedPages[str_id_page] == undefined && str_id_page != ""){
			cacheSinglePage(str_id_page)
			return false;
		}
	})
	
}
function cacheSinglePage(url_page){
	if(!jQuery("body").hasClass("loader_active")){
		str_id_page = url_page.split("#")[0]
		var data = {
			action: 'get_page',
			url_page: str_id_page
		};
		loadAjaxObj = jQuery.ajax({
			type : "post",
			dataType : "html",
			url : ajaxurl,
			data : data,
			success: function(response) {
				
				ajax_vars_extract = response.split('<div class="page_ajax_vars"')
				if(ajax_vars_extract[1] != ""){
					ajax_vars_extract_str = '<div class="page_ajax_vars"'+ajax_vars_extract[1]
					str_id_page = jQuery(ajax_vars_extract_str).attr("URL")
				}
				
				cachedPages[str_id_page] = response;
				console.log("cached: "+str_id_page)
				cacheImagesFromString(response)
				cacheNextPage()
			},
			error: function(xhr, ajaxOptions, thrownError) {
				
			}
		})
		
	}
}

function getSinglePageAjax(url_page, doHistory){
	
	showLoading()
	stopAutoplayHomeSlider()
	setCurrentPage(url_page)
	console.log("request page ajax: "+url_page)
	
	if(loadAjaxObj != ""){
		loadAjaxObj.abort()
	}
	str_id_page = url_page.split("#")[0]
	hashed_var = url_page.split("#")[1]
	
	current_url_full = window.location.href
	current_url = current_url_full.split("#")[0]
	current_hashed_var = current_url_full.split("#")[1]
	
	if(str_id_page == '') str_id_page = current_url;
	if(typeof hashed_var == 'undefined') hashed_var = "";
	if(typeof current_hashed_var == 'undefined') current_hashed_var = "";
	
	if((current_url == str_id_page) && doHistory == true ){ //doHistory to true, because when is false, is a browser back, and the url is the same as the requested.
		if(hashed_var != ""){
			scrollTo = -1;
			fullScreenSections.each(function(index){
				if(jQuery(this).attr("id") == hashed_var ){
					scrollTo = index
				}
			})
			if(scrollTo >= 0){
				
				//pageVars = jQuery(".ajax_content_container.ajax_content_current .page_ajax_vars");
				//history.pushState("page:"+pageVars.attr("slug")+";post_id:"+pageVars.attr("id")+";post_type:"+pageVars.attr("postType")+";url:"+escape(pageVars.attr("URL"))+";title:"+escape(pageVars.attr("WPtitle")),pageVars.attr("URL"),pageVars.attr("WPtitle"), '', url_page);
				animToSection_delay(scrollTo)
				
				
				
			}
		}
		hideLoading()
		
	}else if(cachedPages[str_id_page] != undefined){
		
		printPageContent(cachedPages[str_id_page], doHistory, true, hashed_var)
		
	}else{
	
	
		var data = {
			action: 'get_page',
			url_page: url_page
			//_ajax_work_nonce: _ajax_work_nonce

		};
		loadAjaxObj = jQuery.ajax({
			type : "post",
			dataType : "html",
			url : ajaxurl,
			data : data,
			success: function(response) {
				cachedPages[str_id_page] = response;
				printPageContent(response, doHistory, false, hashed_var)
				
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				/* para dar un tiempo minimo entre cargas de paginas */
				console.log("se produjo un error "+thrownError)
				//agendaPageLoadingFinish()
				if(isNavOpen){
					pagesContainer = jQuery("main.l-content") 
					oldPage = pagesContainer.find(".ajax_content_container.ajax_content_current")
					TweenMax.set(oldPage, {autoAlpha:1})
				}
				hideLoading()
			}
		})
	
	}
	
}

function printPageContent(response, doHistory, isCached, hashVar){
	hideLoading()
	pagesContainer = jQuery("main.l-content") 
	oldPage = pagesContainer.find(".ajax_content_container.ajax_content_current")
	oldPage.removeClass("ajax_content_current");

	pagesContainer.append('<div class="ajax_content_container ajax_content_current" >'+response+'</div>')
	
	currentPage = pagesContainer.find(".ajax_content_container.ajax_content_current")
	stopAutoplayHomeSlider()
	
	

	
	pageVars = currentPage.find(".page_ajax_vars");
	if(isCached){
		hash_var = hashVar;
	}else{
		hash_var = pageVars.attr("hash_var");
	}
	
	if(doHistory){
		setHistory("page:"+pageVars.attr("slug")+";post_id:"+pageVars.attr("id")+";post_type:"+pageVars.attr("postType")+";url:"+escape(pageVars.attr("URL"))+";title:"+escape(pageVars.attr("WPtitle")),pageVars.attr("URL"),pageVars.attr("WPtitle"))
	}
	/*
	updateUsBasicVars()
	waitForFinalEvent(function(){
	  updateUsBasicVars()
	}, 300, "updateUsBasicVars");
	*/
	
	pageInitialFuncion(hash_var)
	
	for(i = 0; i<pageTransitionFunctionQueueFn.length;i++){
		(pageTransitionFunctionQueueFn[i])(currentPage, oldPage, hash_var);
	}
	
	
	cacheNextPage()
}


function removeOldPages(){
	jQuery(this.target[0]).remove();
}

pageInitialFunctionQueueFn = [];
pageTransitionFunctionQueueFn = [];
function pageInitialFuncion(hash_var){
	updateFullscreenSections()
	setControls()
	
	currentSection = -1;
	setCurrentSec()
	if(hash_var != ""){
		scrollTo = 0;
		fullScreenSections.each(function(index){
			if(jQuery(this).attr("id") == hash_var ){
				scrollTo = index
			}
		})
		animToSection_delay(scrollTo)
	}else{
	
		animToSection_delay(0)
	}

	
	/*
	if(jQuery(".ajax_content_container.ajax_content_current .home_slider").length > 0){
		currentHomeSlide = "";
		currentHomeSlideIndex = -1;
		setHomeSlider()
		sliderActivated = true;
		startHomeSlider()
		//setTimeout(function(){startHomeSlider()}, 800)
	}

	TweenMax.killTweensOf("#trama_portfolio_controls")
	TweenMax.set("#trama_portfolio_controls", {clearProps:"right,opacity"})
	TweenMax.from("#trama_portfolio_controls",.8, { right:-100, opacity:0, delay:1.3,clearProps:"right,opacity", ease:Power3.easeOut})
	*/
	
	jQuery('.ajax_content_container.ajax_content_current .w-slider').wSlider();
	
	for(i = 0; i<pageInitialFunctionQueueFn.length;i++){
		(pageInitialFunctionQueueFn[i])();
	}
}


function clearCurrentPage(){
	
	jQuery(".main_nav li.current-menu-item").removeClass("current-menu-item")
}
function setCurrentPage(str_id){
		clearCurrentPage();
		str_id_page = str_id.split("#")[0]
		
		jQuery(".main_nav li").each(function(){
			page_href = jQuery(this).find("> a").attr("href");
			page_href = page_href.split("#")[0];
			if(page_href == str_id_page){
				jQuery(this).addClass("current-menu-item")
			}
			
		})

	
}










function openHomeSmart(bool){
	console.log("open home smart")
	getSinglePageAjax(homeUrl, bool);
}



function setHistory(dataState,  pageUrl, pageTitle){
	//"work_index:"+currentWorkIndexOpen
	document.title = decodeHtml(pageTitle);
	window.history.pushState(dataState, pageTitle, pageUrl);
	
	ga_send(pageUrl)
}
function ga_send(pageUrl){
	pageUrl = pageUrl.replace(homeUrl, ""); 
	if(typeof ga == 'function')
		ga('send', 'pageview', pageUrl);
}
window.addEventListener('popstate', function(e) {
	//e.state is equal to the data-attribute of the last image we clicked
	//setHistory('work_index:'+homeCurrentSlide+";post_id:"+pageVars.attr("id")+";post_type:"+pageVars.attr("postType");pageVars.attr("URL");pageVars.attr("WPtitle"))
	
	dataState = e.state;
	
	if(dataState != null){
		varsArray = dataState.split(";");
		firstVar = varsArray[0].split(":")
		post_id = varsArray[1].split(":")
		post_type = varsArray[2].split(":")
		url = varsArray[3].split(":")
		title = varsArray[4].split(":")
		//console.log(dataState)
		document.title = unescape(title[1]);
		//if(firstVar[0] == "page"){
		getSinglePageAjax(unescape(url[1]),false);
		//}else if(firstVar[0] == "home"){
		//	openHomeSmart(false);
		//}
		ga_send(url[1])
	}else{
		if(typeof tportfolio_WPtitle !== "undefined"){
			docTitle = tportfolio_WPtitle;
		}else if(typeof page_WPtitle !== "undefined"){
			docTitle = page_WPtitle;
		}else{
			docTitle = homeWpTitle;
		}
		document.title = decodeHtml(docTitle);
		
		if(typeof page_id !== "undefined" && typeof page_URL  !== "undefined" ){
			if(page_id != homeId){
				getSinglePageAjax(page_URL, false);
			}else{
				openHomeSmart(false);
			}
			ga_send(page_URL)
		}else{
			openHomeSmart(false);
			ga_send(homeUrl)
		}
	}
	
	
	
});

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}




function cacheImagesFromString(str){
	
	var m,
	urls = [], 
	//str = '<img src="http://site.org/one.jpg />\n <img src="http://site.org/two.jpg />',
	rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
	
	while ( m = rex.exec( str ) ) {
		urls.push( m[1] );
	}
	preloadImages( urls );
}
function preloadImages(arrayOfImages) {
	if(jQuery("#images_preload").length <= 0){
		jQuery("body").append('<div id="images_preload" style="display:none;" ></div>')
	}
    jQuery(arrayOfImages).each(function () {
        jQuery('<img />').attr('src',this).appendTo('#images_preload').css('display','none');
    });
}





pageTransitionFunctionQueueFn.push(transitionPagesLoad)
function transitionPagesLoad(currentPage, oldPage, hashVar){
	currentPage.find(".l-section-img").addClass("loaded")
		
	if(oldPage.find(".home_slider").length > 0 && currentPage.find(".page_ajax_vars").attr("posttype") == "trama_portfolio"){
		//Open Work from home slider
		secScrollIsAnim = 1;
		TweenMax.set(oldPage,{position:'absolute',zIndex:20, overflow:'hidden', width:'100%'})
		TweenMax.to(oldPage, .8, {delay:.6,autoAlpha:0,top:-jQuery(window).height(), onComplete:removeOldPages, ease:Power3.easeInOut})
		
		deco_diag = oldPage.find(".background_slides_color_deco")
		bg_slides = oldPage.find(".background_slides")
		bg_slides_width =bg_slides.width();
		TweenMax.to(deco_diag, 1, {left:"-100%", ease:Power3.easeInOut});
		TweenMax.to(bg_slides, .8, {left:"0", width:"100%", ease:Power3.easeInOut});

		TweenMax.set(currentPage,{autoAlpha:0,top:jQuery(window).height(),position:"relative"})
		TweenMax.to(currentPage, .8, {delay:.6,autoAlpha:1,top:0,ease:Power3.easeInOut,onComplete:unlockScroll})

		
	}else{
		//simple fade
		TweenMax.set(oldPage,{position:'absolute', overflow:'hidden', width:'100%'})
		TweenMax.to(oldPage, 1, {autoAlpha:0, onComplete:removeOldPages, ease:Power1.easeInOut})
		
		TweenMax.set(currentPage,{autoAlpha:0})
		TweenMax.to(currentPage, 1, {autoAlpha:1, ease:Power3.easeOut, clearProps:"opacity,visibility"})

	}
}













jQuery(document).ready(function(){
	
	

	
})
function setNavCircle(){
	
	jQuery(".circle_nav_clockitems .circle_nav_clockitem").remove();
	//alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
	
	
	clock_item_clone = jQuery(".circle_nav_clockitems .circle_nav_clockitem_clone").html()
	
	//for (i=0; i < alphabet.length; i++) {
	for (i=0; i < amazonia_slides.length; i++) {
		letter = amazonia_slides[i].id
		danger_level = amazonia_slides[i].danger
		this_clockitem = clock_item_clone;
		this_clockitem = this_clockitem.replace("%letter%", letter); 
		this_clockitem = this_clockitem.replace("%dingbat%", letter); 
		this_clockitem = this_clockitem.replace("%dingbat%", letter); 
		this_clockitem = '<div class="circle_nav_clockitem danger_level_'+danger_level+'" data_letter="'+letter+'" data_index="'+i+'" >'+this_clockitem+'</div>';

		jQuery(".circle_nav_clockitems").append(this_clockitem);
		
		
    }
	
	
	
	jQuery(".circle_nav_clockitems .circle_nav_clockitem").each(function(index){
		jQuery(this).attr("data_letter", jQuery(this).find(".clockitem_letter").html())
					.find(".clockitem_hitarea").click(function(){
						_item = jQuery(this).closest(".circle_nav_clockitem")

						circle_nav_current_index = parseInt(_item.attr("data_index"));
						
						
						_slidernav = jQuery(this).closest(".amazonia_slider_nav")
						
						if(_item.hasClass("circle_nav_clockitem_current")){
							toggleAmazoniaSliderNav()
						}else{
							openAmazoniaSlide(circle_nav_current_index);
						}
						
						
						
						//setNavCirclePos()
						
					})
		
	})
	jQuery(".circle_nav_arrow_left").click(function(){
		_base = jQuery(this).closest(".amazonia_slider_nav")
		clock_items = _base.find(".circle_nav_clockitem")
		total_clock_items = clock_items.length;
		
		circle_nav_current_index--
		if(circle_nav_current_index < 0) circle_nav_current_index = total_clock_items-1;
		//setNavCirclePos()
		openAmazoniaSlide(circle_nav_current_index);
	})
	jQuery(".circle_nav_arrow_right").click(function(){
		_base = jQuery(this).closest(".amazonia_slider_nav")
		clock_items = _base.find(".circle_nav_clockitem")
		total_clock_items = clock_items.length;
		
		circle_nav_current_index++
		if(circle_nav_current_index > total_clock_items-1) circle_nav_current_index = 0;
		//setNavCirclePos()
		openAmazoniaSlide(circle_nav_current_index);
	})
	jQuery(".circle_nav_world").click(function(){
		toggleAmazoniaSliderNav()
	})
	jQuery(".cicle_back_button").click(function(){
		toggleAmazoniaSliderNav()
	})
}

circle_nav_current_index = -1;
last_angle = 0
function setNavCirclePos(){
	
	container_clock_items = jQuery(".circle_nav_clockitems")
	clock_items = jQuery(".circle_nav_clockitems .circle_nav_clockitem")
	
	total_clock_items = clock_items.length
	angle_space_current = 20;
	
	current_index = circle_nav_current_index;
	angle_current = (360-angle_space_current)/total_clock_items*current_index;
	new_angles = fixClosestVisualAngle(-angle_current, last_angle)
	if(total_clock_items > 0){
		
		clock_items.removeClass("circle_nav_clockitem_current").each(function(index){
			_thisitem = jQuery(this)
			
			if(index < current_index){
				new_angle = (360-angle_space_current)/total_clock_items*index - angle_space_current/2;
			}else if(index > current_index){
				new_angle = (360-angle_space_current)/total_clock_items*index + angle_space_current/2;
			}else{
				new_angle = angle_current;
				_thisitem.addClass("circle_nav_clockitem_current")
			}
			
			TweenMax.to(_thisitem, .7, {rotation:new_angle, ease:Power3.easeInOut})
			_dingbat = _thisitem.find(".clockitem_line_dingbat span")
			//TweenMax.to(_dingbat, .7,{rotation:-new_angle + angle_current, ease:Power3.easeInOut})
			TweenMax.to(_dingbat, .7,{rotation:-new_angle - new_angles[0], ease:Power3.easeInOut})
		})
		
		
		TweenMax.set(container_clock_items,{rotation:new_angles[1]})
		TweenMax.to(container_clock_items,.7, {rotation:new_angles[0], ease:Power3.easeInOut})
		last_angle = new_angles[0];
	}
}
function fixClosestVisualAngle(destAng, currentAng){

	returnAng = destAng%360;
	currentAng = currentAng%360;
	//currentAng = currentAng%360;
	//console.log("destAng:"+destAng +"  returnAng:"+returnAng+"  currentAng:"+currentAng)
	
	dif = currentAng - destAng;
	
	//ang_op1 = 
	console.log("dif:" + dif)
	if(dif > 180) returnAng = returnAng+360
	if(dif < -180) returnAng = returnAng-360
	
	
	//returnAng = destAng%360;
	//currentAng = currentAng%360;
	/*
	if((returnAng + 360 - currentAng)%360 > (returnAng - currentAng)%360){
		returnAng = returnAng + 360
	}

	*/
	
	
	console.log("destAng:"+destAng +"  returnAng:"+returnAng+"  currentAng:"+currentAng)
	
	return [returnAng, currentAng];
}

function toggleAmazoniaSliderNav(){
		_base = jQuery(".amazonia_slider")
		_slidernav = _base.find(".amazonia_slider_nav")
		_slides = _base.find(".amazonia_slides")
		slides_h = _slides.height();
		if(!_slidernav.hasClass("amazonia_slider_nav_open")){
			_slidernav.addClass("amazonia_slider_nav_open")
			TweenMax.set(_slides,{minHeight:slides_h})
			TweenMax.to(_slides,1,{autoAlpha:0,top:"-500px",scale:.7, clearProps:"minHeight", ease:Power3.easeOut})
			removePreviousAmazoniaSlides()
			animateDatablockIntro(.4)
		}else{
			_slidernav.removeClass("amazonia_slider_nav_open")
			TweenMax.to(_slides,1,{autoAlpha:1,top:0,scale:1, ease:Power3.easeInOut})
			openAmazoniaSlide(circle_nav_current_index);
			
		}
}


/*

_mouseX = 500
_mouseY = 300
jQuery(document).mousemove(function( event ) {
 
	_mouseX = event.pageX;
	_mouseY = event.pageY;
	
	//updateWorldPos();
	
});



function updateWorldPos(){
	_world_map_inner = jQuery(".circle_nav_world_inner")

	if(_world_map_inner.length > 0){
		
		_winW = jQuery(window).width();
		_winH = jQuery(window).height();
		
		newLeft = (_mouseX - _winW/2)/_winW*10
		newTop = (_mouseY - _winH/2)/_winH*10
		TweenMax.killTweensOf(_world_map_inner);
		TweenMax.to(_world_map_inner, 5,{top:newTop+"%", left:newLeft+"%"});
	}
}*/



jQuery(document).ready(function(){
	waitForFinalEvent(function(){
		setAmazoniaSlider();
		animateSlideIntro()
    }, 30, "setAmazoniaSlider"); //this timeout is to give time to GWD to define the html parts of each animated animal
	
	
})
var amazonia_slides = [];
function setAmazoniaSlider(){
	
	amazonia_slides = []
	jQuery(".amazonia_slides .amazonia_slide").each(function(){
		slide_html = jQuery(this).prop('outerHTML');
		slide_id = jQuery(this).attr('data-id');
		slide_name = jQuery(this).attr('data-name');
		animal_scientific_name = jQuery(this).attr('data-scientific_name');
		animal_height = jQuery(this).attr('data-height');
		animal_weight = jQuery(this).attr('data-weight');
		animal_danger = jQuery(this).attr('data-danger');
		
		amazonia_slides.push({
			id:slide_id, 
			name:slide_name, 
			html:slide_html,
			scientific_name:animal_scientific_name,
			height:animal_height,
			weight:animal_weight,
			danger:animal_danger
			});
		jQuery(this).remove();
	})
	
	setNavCircle()
	//setNavCirclePos()
	
	openAmazoniaSlide(0)
	
}

function openAmazoniaSlide(index){
	


	var prevIndexOpen = old_slides = jQuery(".amazonia_slides .amazonia_slide.current_slide").attr("data-index");
	
	var prev_circle_open = jQuery(".amazonia_slider .amazonia_slider_nav .circle_nav_clockitem.circle_nav_clockitem_current").attr("data_index");
	
	circle_nav_current_index = index;
	
	_slidernav = jQuery(".amazonia_slider .amazonia_slider_nav")
	
	/* world current animal data set values */
	_datablock = _slidernav.find(".circle_nav_info");
	_datablock.find(".circle_nav_info_header h3").html(amazonia_slides[index].name)
	
	_datablock.find(".nav_info_height_value").html(amazonia_slides[index].height)
	_datablock.find(".nav_info_weight_value").html(amazonia_slides[index].weight)
	_datablock.find(".nav_info_scientific_name_value").html(amazonia_slides[index].scientific_name)
	
	
		if(!_slidernav.hasClass("amazonia_slider_nav_open")){
			if(prevIndexOpen != circle_nav_current_index){
				/* remove current slide and add new one, start animation */
				removePreviousAmazoniaSlides()
			
				new_slide = jQuery(amazonia_slides[index].html)
				new_slide.addClass("current_slide").attr("data-index", index)
				jQuery(".amazonia_slides").append(new_slide);
				resizeSlideTitle()
				animateSlideIntro();
			}
		}else{
			
			if(prev_circle_open != circle_nav_current_index){
				/* animate world data items after change values */
				animateDatablockIntro(0)
			}
		}
	
	
	setNavCirclePos()
	

}
function animateDatablockIntro(_delay){
	_slidernav = jQuery(".amazonia_slider .amazonia_slider_nav")

	_datablock = _slidernav.find(".circle_nav_info");
	
				TweenMax.set(_datablock,{autoAlpha:0, scale:.8})
				TweenMax.to(_datablock, 1,{autoAlpha:1, scale:1, ease:Power2.easeOut, delay:_delay})
				
				info_items_anim = _datablock.find(".circle_info_item_anim")
				
				TweenMax.killTweensOf(info_items_anim)
				TweenMax.set(info_items_anim, {autoAlpha:0, scale:.7, position:"relative",top:"30px"})
				TweenMax.staggerTo(info_items_anim, .5,{autoAlpha:1, top:0, scale:1, ease:Power3.easeOut, clearProps:"top,opacity,visibility,position,scale,transform", delay:_delay}, .1)
			
}

function removePreviousAmazoniaSlides(){
	old_slides = jQuery(".amazonia_slides .amazonia_slide:not(.old_slide)")
	if(old_slides.length > 0){
		
		old_slides.removeClass("current_slide").addClass("old_slide")
		hojas_old = old_slides.find(".plan_leaf img");
		TweenMax.staggerTo(hojas_inner, .3, {scale:0, ease:Power3.easeOut},.05)
		/*
		titulo_old = old_slides.find(".amazonia_slide_ly_title h1");
		TweenMax.to(titulo_old, .7, {autoAlpha:0, scale:.7, ease:Power1.easeInOut})
		*/
		/*
		animal_old = old_slides.find(".animal_block-h");
		TweenMax.killTweensOf(animal_old)
		TweenMax.to(animal_old,.4,{scale:.1,autoAlpha:0,ease:Power1.easeOut})
		*/
		
		TweenMax.killTweensOf(old_slides)
		TweenMax.set(old_slides, {position:"absolute", top:"0",width:"100%"})
	/*	TweenMax.to(old_slides, .7, {autoAlpha:0, scale:.8, ease:Power1.easeOut, onComplete:killOldAmazoniaSlides})
	*/
	
	

		
		plant_back_ly = old_slides.find(".amazonia_slide_ly_plant_back");
		TweenMax.killTweensOf(plant_back_ly)
		TweenMax.set(plant_back_ly,{transformOrigin:"50% -150% -300"})
		TweenMax.to(plant_back_ly,.7,{autoAlpha:0,scale:1.1, ease:Power3.easeInOut, delay:.05})
		
		plant_front_ly = old_slides.find(".amazonia_slide_ly_plant_top");
		TweenMax.killTweensOf(plant_front_ly)
		TweenMax.set(plant_front_ly,{transformOrigin:"50% -150% -300"})
		TweenMax.to(plant_front_ly,.7,{autoAlpha:0,scale:1.1, ease:Power3.easeInOut, delay:0})
		
		animal_ly = old_slides.find(".amazonia_slide_ly_animal");
		TweenMax.killTweensOf(animal_ly)
		TweenMax.set(animal_ly,{transformOrigin:"50% -150% -300"})
		TweenMax.to(animal_ly,.7,{autoAlpha:0,scale:1.1, ease:Power3.easeInOut, delay:.1, onComplete:killOldAmazoniaSlides, onCompleteParams:[old_slides]})
		
		
	
	}
}
/*
function killOldAmazoniaSlides(){
	waitForFinalEvent(function(){
      killOldAmazoniaSlides_fn()
    }, 500, "killOldAmazoniaSlides");
}
function killOldAmazoniaSlides_fn(){
	TweenMax.killTweensOf(".amazonia_slides .amazonia_slide.old_slide");
	jQuery(".amazonia_slides .amazonia_slide.old_slide").remove()
}*/
function killOldAmazoniaSlides(old_slides){
	TweenMax.killTweensOf(old_slides);
	old_slides.remove()
}


function openNextAmazoniaSlide(){
	current_index = jQuery(".amazonia_slides .amazonia_slide.current_slide").attr("data-index")
	if(!current_index) current_index = -1;
	current_index++
	if(current_index > amazonia_slides.length-1) current_index = 0;
	
	openAmazoniaSlide(current_index)
}
function openPrevAmazoniaSlide(){
	current_index = jQuery(".amazonia_slides .amazonia_slide.current_slide").attr("data-index")
	if(!current_index) current_index = amazonia_slides.length;
	current_index--
	if(current_index < 0) current_index = amazonia_slides.length-1;

	openAmazoniaSlide(current_index)
}






var tl_planta = new TimelineMax();
var tituloSplitText = "";
function animateSlideIntro(){
	
	_slidebase = jQuery(".amazonia_slide.current_slide")
	
	TweenMax.set(_slidebase, {perspective:800})
	
	plant_base = _slidebase.find(".plan_base");
	TweenMax.set(plant_base,{perspective:800,transformStyle:"preserve-3d"})
	
	animal = _slidebase.find(".animal_block-h");
	TweenMax.killTweensOf(animal)
	TweenMax.set(animal,{scale:1,autoAlpha:1})
//	TweenMax.from(animal,1,{scale:0,autoAlpha:0,ease:Power3.easeOut, delay:.4})
	
	
	

	
	/*
	title = _slidebase.find(".plant_title");
	TweenMax.killTweensOf(title)
	TweenMax.set(title,{scale:1,autoAlpha:1})
	TweenMax.from(title,1,{scale:.8,autoAlpha:0,ease:Power1.easeOut, delay:1})
	*/
	if(tituloSplitText != "") tituloSplitText.revert();
	tituloSplitText = new SplitText(_slidebase.find(".amazonia_slide_ly_title h1"), {type:"chars"}), 
    tituloChars = tituloSplitText.chars; //an array of all the divs that wrap each character
	
	TweenMax.set(tituloChars, {opacity:1, scale:1, transformOrigin:"0 50%"})
	
	TweenMax.staggerFrom(tituloChars, .7, {opacity:0, scale:0, ease:Power3.easeOut, delay:.7}, 0.07)
	
	
	
	branch = _slidebase.find(".amazonia_slide_ly_plant_back .plant_branch");
	TweenMax.killTweensOf(branch)
	TweenMax.set(branch,{scale:1,autoAlpha:1})
	TweenMax.from(branch,1,{scale:0,autoAlpha:0,ease:Power2.easeOut})

	
	hojas_inner = _slidebase.find(".plan_leaf img");
	offset_delay = .5;
	
	hojas_inner.each(function(index){
		_hoja = jQuery(this)
		_hoja_h = jQuery(this).parent();
		TweenMax.killTweensOf(_hoja)
		TweenMax.set(_hoja,{clearProps:"transform,rotation,rotationX,scale,opacity,visiblity"})
		TweenMax.set(_hoja,{rotation:_hoja_h.attr("data-rotation")})
		if(_hoja_h.hasClass("effect_center")){
			TweenMax.from(_hoja,.7,{scale:0, autoAlpha:0, rotation:-90,ease:Power3.easeOut, delay:.1*index+offset_delay})
		}else{
			TweenMax.from(_hoja,.7,{rotationX:90,autoAlpha:0, ease:Power3.easeOut, delay:.1*index+offset_delay})
		}
	})
	
	
	animal_ly = _slidebase.find(".amazonia_slide_ly_animal");
	TweenMax.killTweensOf(animal_ly)
	TweenMax.set(animal_ly,{autoAlpha:1,transformOrigin:"50% 45% -100",  scale:1, rotationX:0})
	
	TweenMax.from(animal_ly,1,{autoAlpha:0,scale:.5, rotationX:20, ease:Power3.easeOut, delay:.5})
	
	
	
	plant_back_ly = _slidebase.find(".amazonia_slide_ly_plant_back");
	TweenMax.killTweensOf(plant_back_ly)
	TweenMax.set(plant_back_ly,{autoAlpha:1,transformOrigin:"50% 45% -100",  scale:1, rotationX:0})
	TweenMax.from(plant_back_ly,1,{autoAlpha:0,scale:.5,rotationX:90, ease:Power3.easeOut, delay:.1})
	
	plant_front_ly = _slidebase.find(".amazonia_slide_ly_plant_top");
	TweenMax.killTweensOf(plant_front_ly)
	TweenMax.set(plant_front_ly,{autoAlpha:1,transformOrigin:"50% 45% -100",  scale:1, rotationX:0})
	TweenMax.from(plant_front_ly,1,{autoAlpha:0,scale:.5,rotationX:90, ease:Power3.easeOut, delay:.3})
	
	
	
}


jQuery(document).ready(function(){
	resizeSlideTitle()
})
jQuery(window).resize(function(){
	resizeSlideTitle()
})
function resizeSlideTitle(){
	jQuery(".amazonia_slide_ly_title").each(function(){
		_font_size = jQuery(this).attr("data-font_size")
		_width = jQuery(this).width();
		_new_font_size = _width/1000*_font_size
		_titleObj = jQuery(this).find("h1");
		TweenMax.set(_titleObj,{fontSize:_new_font_size+"px"})
		//alert(_titleObj.outerWidth() )
		
		
	})
	jQuery(".amazonia_slide_ly_animal_autoscale").each(function(){
		
		_width = jQuery(this).width();
		_new_scale = _width/1000
		_animal_block = jQuery(this).find(".animal_block");
		TweenMax.set(_animal_block,{scale:_new_scale})
		//alert(_titleObj.outerWidth() )
		
		
	})
}





/* document ready: */
readyBeforeDefinitions.push(amz_cntsld_ready_before);
function amz_cntsld_ready_before(_currentsec){
	
	jQuery('.amz_content_slides').slick({
		arrows: false,
		infinite: false
	});
	// On before slide change
	jQuery('.amz_content_slides').closest(".l-section").addClass("amz_content_slider_section_holder")
	jQuery('.amz_content_slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){

		amz_cntsld_update_nav(slick, currentSlide, nextSlide)
		
	});


	//amz_content_slide slick-slide slick-current slick-active


	
	jQuery(".amz_content_slider_buttons .amz_cntsl_button").click(function(){
		goto_index = jQuery(this).attr("data-slide_index")
		jQuery(this).closest(".amz_content_slider").find(".amz_content_slides").slick('slickGoTo', goto_index)
	})
	
	
	
	fadeInElements = jQuery(".fadein_on_slide")
	TweenMax.killTweensOf(fadeInElements)
	TweenMax.set(fadeInElements,{autoAlpha:0,scale:.7})	
	
	
	fadeInElements2 = jQuery(".fadein_on_scroll")
	TweenMax.killTweensOf(fadeInElements2)
	TweenMax.set(fadeInElements2,{autoAlpha:0,scale:.7})	
}

function amz_cntsld_update_nav(slick, currentSlide, nextSlide){
		_prev_slide = jQuery(slick.$slides[currentSlide])
		_next_slide = jQuery(slick.$slides[nextSlide])
		_base_slider = _next_slide.closest(".amz_content_slider");
		
		_base_slider.find(".amz_content_slider_buttons .amz_cntsl_button").removeClass("amz_current_menu");
		_base_slider.find(".amz_content_slider_buttons .amz_cntsl_button[data-slide_index='"+nextSlide+"']").addClass("amz_current_menu");
		
		if(currentSlide != nextSlide){

			fadeInElements = _next_slide.find(".fadein_on_slide")
			TweenMax.killTweensOf(fadeInElements)
			TweenMax.staggerTo(fadeInElements,.5,{delay:.3,autoAlpha:1,scale:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
			
			if(_prev_slide.length > 0){
				fadeInElements = _prev_slide.find(".fadein_on_slide")
				TweenMax.killTweensOf(fadeInElements)
				TweenMax.to(fadeInElements,.5,{autoAlpha:0,scale:.7,ease:Power3.easeInOut})
			}
		
		}	
}


secIntroFunctionQueue.push(amz_cntsld_secintro);
function amz_cntsld_secintro(_currentsec){
		
		fadeInDelay = .5;
		if(jQuery(window).width() < 1000){
			fadeInDelay = 0;
		}
		
		fadeInElements = _currentsec.find(".slick-current.slick-active .fadein_on_slide")
		TweenMax.killTweensOf(fadeInElements)
		TweenMax.staggerTo(fadeInElements,.5,{delay:fadeInDelay,autoAlpha:1,scale:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
	
		fadeInElements2 = _currentsec.find(".fadein_on_scroll")
		TweenMax.killTweensOf(fadeInElements2)
		TweenMax.staggerTo(fadeInElements2,.5,{delay:fadeInDelay,autoAlpha:1,scale:1,ease:Power3.easeOut,clearProps:"opacity,visibility,transform,scale"},.1)
	
	
	if(_currentsec.attr("id") == "buying_options"){
		jQuery("body").addClass("hide_buy_button")
	}else{
		jQuery("body").removeClass("hide_buy_button")
	}
}

secOutFunctionQueue.push(amz_cntsld_secout);
function amz_cntsld_secout(_prevsec){
		fadeInElements = _prevsec.find(".slick-current.slick-active .fadein_on_slide")
		TweenMax.killTweensOf(fadeInElements)
		TweenMax.staggerTo(fadeInElements,.5,{autoAlpha:0,scale:.7,ease:Power3.easeInOut},-.05)	
		
		if(jQuery(window).width() > 676){
			fadeInElements2 = _prevsec.find(".fadein_on_scroll")
			TweenMax.killTweensOf(fadeInElements2)
			TweenMax.staggerTo(fadeInElements2,.5,{autoAlpha:0,scale:.7,ease:Power3.easeInOut},-.05)
			
		}
	
}



jQuery(document).ready(function(){
	jQuery('.tryout_box').each(function(){
		jQuery(this).attr("initial_text", jQuery(this).text())
	})
	jQuery('.tryout_box').on('focus', function() {
		before = jQuery(this).html();
	}).on('blur keyup paste', function() {
		if (before != jQuery(this).html()) {
			jQuery(this).trigger('change'); 
			before = jQuery(this).html();
		}
	}).on('blur', function() { 
		if(jQuery(this).text() == ""){
			tryout_placeholder = jQuery(this).attr("placeholder_fixed")
			jQuery(this).closest(".tryout_box_block").find(".tryout_box_placeholder").html(tryout_placeholder+"<br>")
		}
	}).on('focus', function() { 
		if(jQuery(this).text() == ""){
			tryout_rand_messages = jQuery(this).attr("placeholder_random").split(";")
			rand_msg = tryout_rand_messages[Math.floor(Math.random()*tryout_rand_messages.length)]
			jQuery(this).closest(".tryout_box_block").find(".tryout_box_placeholder").html(rand_msg)
		}
	});

	jQuery('.tryout_box').on('change', function() {
		_base = jQuery(this).closest(".tryout_box_block");
		if(jQuery(this).text() == ""){
			_base.addClass("show_placeholder")
			
			//placeholder_msg = tryout_rand_messages[Math.floor(Math.random()*tryout_rand_messages.length)]
			placeholder_msg = jQuery(this).attr("placeholder_fixed")
			jQuery(this).closest(".tryout_box_block").find(".tryout_box_placeholder").html(placeholder_msg+"<br>")
			
			
		}else if(_base.hasClass("show_placeholder")){
			_base.removeClass("show_placeholder")
		}

	});

})
secIntroFunctionQueue.push(tryout_box_secintro);
function tryout_box_secintro(_currentsec){
		if(_currentsec.find(".tryout_box").length > 0){
			waitForFinalEvent(function(){
				tryout_box = _currentsec.find(".tryout_box");
				 tryout_box.focus();
			}, 500, "tryout_box_focus");
		}	
}






jQuery(document).ready(function(){


	waitForFinalEvent(function(){
		jQuery("#btn_buying_options").unbind("click").click(function(e){
			
			
			hash = jQuery(this).attr("href").split("#")[1]
			scrollTo = -1;
			fullScreenSections.each(function(index){
				if(jQuery(this).attr("id") == hash ){
					scrollTo = index
				}
			})
			if(scrollTo >= 0){
				e.preventDefault();
				animToSection(scrollTo)
			}
			
		})
	}, 20, "btn_buying_options");
	
})
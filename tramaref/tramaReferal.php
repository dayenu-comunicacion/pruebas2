<?php
/* 

Trama Referal WordPress Integration

 */

function getTramaReferal(){
	global $tramarefColor, $tramarefOpacity;

	if($tramarefColor == '')
	$tramarefColor == '#fff';
	if($tramarefOpacity == '')
	$tramarefOpacity == '.7';

	ob_start();
?>

<div id="trama_referal">
	<a href="http://tramastudio.net" title="Trama Studio / Web Design and Development" target="_blank" >
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 24 29" style="enable-background:new 0 0 24 29;" xml:space="preserve">
			<style type="text/css">
				#trama_referal a{opacity:<?php echo $tramarefOpacity; ?>;}
				.tr_icon_part{fill:<?php echo $tramarefColor; ?>;}
			</style>
			<g id="svg_trama_icon" class="svg_trama_icon">
				<polygon id="svg_trama_icon_1" class="tr_icon_part" points="15.6,28 16.4,27.2 17,27.8 16.2,28.5 	"/>
				<polygon id="svg_trama_icon_2" class="tr_icon_part" points="16.4,27.5 15.9,28 16.2,28.3 16.7,27.8 	"/>
				<polygon id="svg_trama_icon_3" class="tr_icon_part" points="12.3,28 16.4,23.9 16.9,24.5 12.8,28.6 	"/>
				<polygon id="svg_trama_icon_4" class="tr_icon_part" points="16.4,24.2 12.5,28 12.8,28.3 16.7,24.5 	"/>
				<polygon id="svg_trama_icon_5" class="tr_icon_part" points="8.8,28 16.4,20.5 17,21.1 9.4,28.5 	"/>
				<polygon id="svg_trama_icon_6" class="tr_icon_part" points="16.4,20.8 9,28 9.4,28.3 16.7,21.1 	"/>
				<polygon id="svg_trama_icon_7" class="tr_icon_part" points="7.1,26.3 16.4,17.2 17,17.7 7.7,26.8 	"/>
				<polygon id="svg_trama_icon_8" class="tr_icon_part" points="16.4,17.4 7.4,26.3 7.7,26.6 16.7,17.7 	"/>
				<polygon id="svg_trama_icon_9" class="tr_icon_part" points="7.1,22.9 16.4,13.7 17,14.3 7.7,23.4 	"/>
				<polygon id="svg_trama_icon_10" class="tr_icon_part" points="16.4,14 7.4,22.9 7.7,23.1 16.7,14.3 	"/>
				<polygon id="svg_trama_icon_11" class="tr_icon_part" points="7.1,19.5 16.4,10.3 17,10.9 7.7,20 	"/>
				<polygon id="svg_trama_icon_12" class="tr_icon_part" points="16.4,10.6 7.4,19.5 7.7,19.7 16.7,10.9 	"/>
				<polygon id="svg_trama_icon_13" class="tr_icon_part" points="7.1,16.1 15.6,7.7 16.2,8.2 7.7,16.6 	"/>
				<polygon id="svg_trama_icon_14" class="tr_icon_part" points="15.6,7.9 7.4,16.1 7.7,16.3 15.9,8.2 	"/>
				<polygon id="svg_trama_icon_15" class="tr_icon_part" points="7.1,12.7 12.4,7.5 13,8 7.7,13.2 	"/>
				<polygon id="svg_trama_icon_16" class="tr_icon_part" points="12.4,7.7 7.4,12.7 7.7,13 12.7,8 	"/>
				<polygon id="svg_trama_icon_17" class="tr_icon_part" points="7.1,9.3 8.8,7.6 9.4,8.1 7.7,9.8 	"/>
				<polygon id="svg_trama_icon_18" class="tr_icon_part" points="8.8,7.8 7.4,9.2 7.7,9.5 9.1,8.1 	"/>
				<rect id="svg_trama_icon_19" x="0" y="0" class="tr_icon_part" width="24" height="8.4"/>
			</g>
		</svg>
	</a>
</div>
<?php
	
	$output .= ob_get_contents();
	ob_end_clean();
	
	return $output;

}
function tramaReferalStyle() {
    wp_enqueue_style( 'tramaReferal', get_stylesheet_directory_uri().'/tramaref/tramaReferal.css' );
}
add_action( 'wp_enqueue_scripts', 'tramaReferalStyle' );



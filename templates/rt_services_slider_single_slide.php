<?php 


$number= "";
$title= $atts['title'];
$copy = $atts['copy'];

$img = wp_get_attachment_image_src($atts["bg_image"], "full");
$imgSrc = $img[0];

$imgOver = wp_get_attachment_image_src($atts["over_image"], "full");
$imgOverSrc = $imgOver[0];

?>
<div class="rt_service_slide">
	<div class="rt_service_item">
		<div class="rt_service_content_block">
			<div class="line_border_box sequenced_fadein">
				<div class="line_border_box_line line_border_box_line_top"></div>
				<div class="line_border_box_line line_border_box_line_right"></div>
				<div class="line_border_box_line line_border_box_line_bottom"></div>
				<div class="line_border_box_line line_border_box_line_left"></div>
			</div>
			<div class="rt_service_content_block-h">
				<div class="rt_service_number_block" >
					<span><?php echo $number; ?></span>
				</div>
				<div class="rt_service_title_block" >
					<h3><?php echo $title; ?></h3>
				</div>
				<div class="rt_service_copy_block" >
					<p><?php echo $copy; ?></p>
				</div>
				<div class="rt_service_image_ref" >
					<img class="rt_service_image_ref_bg" src="<?php echo $imgSrc; ?>" >
					<img class="rt_service_image_ref_over" src="<?php echo $imgOverSrc; ?>" >
				</div>
			</div>
		</div>
	</div>
</div>
			
<?php 

$home_message_image_url = get_stylesheet_directory_uri()."/images/home_people_alone.png";
?>
<div class="rt_home_message" >
	<div class="line_border_box sequenced_fadein">
		<div class="line_border_box_line line_border_box_line_top"></div>
		<div class="line_border_box_line line_border_box_line_right"></div>
		<div class="line_border_box_line line_border_box_line_bottom"></div>
		<div class="line_border_box_line line_border_box_line_left"></div>
	</div>
	<div class="rt_home_message_h" >
		<div class="rt_home_message_content sequenced_fadein" >
			<?php 
			 echo do_shortcode($content);
			?>
			
		</div>
		<div class="rt_home_message_image sequenced_fadein_noscale" >
			<div class="home_people_img_holder" >
				<div class="home_people_bg" ></div>
				<img src="<?php echo $home_message_image_url ; ?>" />
			</div>
		</div>
	</div>
</div>
<?php
	
	
	
	$article_number = ($post_index_n+1);
	$article_title = get_the_title();
	$article_summary = get_field("summary");
	$article_link = get_the_permalink();
	
	$article_thumbnail_src = get_the_post_thumbnail_url( null, 'large' );
	if($article_thumbnail_src == "") $article_thumbnail_src =  get_stylesheet_directory_uri() ."/images/article_image_placeholder.jpg";
	
	$video_url = get_field("video_url");
	
?>
<div class="rt_news_slide">
	<article class="rt_news_item">
		<div class="rt_news_content_block sequenced_fadein">
			<div class="rt_news_index_n" >
				<span><?php echo $article_number; ?></span>
			</div>
			<div class="rt_news_title_block" >
				<a href="<?php echo $article_link; ?>" onClick="" >
				<div class="rt_title_block_frame" >
				
					<h1><?php echo $article_title; ?></h1>
				
				</div>
				</a>
			</div>
			<div class="rt_news_share_block" >
				<?php
				echo do_shortcode('[us_sharing type="outlined" color="primary" counters="hide" email="1" facebook="1" twitter="1" gplus="1" linkedin="1" url="'.$article_link.'"]');
				?>
			</div>
			<div class="rt_news_summary_block" >
				<p><?php echo $article_summary; ?></p>
			</div>
			<div class="rt_news_button_block" >
				<div class="w-btn-wrapper align_left"><a onClick="" class="w-btn style_solid color_primary icon_none" href="<?php echo $article_link; ?>"><span class="w-btn-label">Go to Article</span></a></div>
			</div>
		</div>
		<div onClick="" class="rt_news_preview_block <?php if($video_url!= "") echo " has_video" ;?>" video_url="<?php echo $video_url; ?>" >
			<div class="rt_news_preview_h" >
				<div class="rt_news_preview_frame sequenced_fadein" >
					<div class="line_border_box">
						<div class="line_border_box_line line_border_box_line_top"></div>
						<div class="line_border_box_line line_border_box_line_right"></div>
						<div class="line_border_box_line line_border_box_line_bottom"></div>
						<div class="line_border_box_line line_border_box_line_left"></div>
					</div>
					<div class="rt_news_preview_image" style="background-image:url('<?php echo $article_thumbnail_src; ?>');" >
						<svg class="news_proportional_image_size" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 840 472" xml:space="preserve">
						</svg>
						<?php if($video_url!= "") { ?>
							<div class="play_button"><i class="fa fa-play"></i></div>
						<?php } ?>
					</div>
				</div>
			</div>
			
		</div>
	</article>
</div>
<?php
	
	$article_number = ($post_index_n+1);
	$article_title = get_the_title();
	$article_summary = "";
	$summary_item = get_field("position");
	if($summary_item)
		$article_summary .= '<p class="rt_jobs_summary_item" ><strong>Position:</strong> '.$summary_item.'</p>';
	$summary_item = get_field("location");
	if($summary_item)
		$article_summary .= '<p class="rt_jobs_summary_item" ><strong>Location:</strong> '.$summary_item.'</p>';
	//$summary_item = get_field("level");
	//if($summary_item)
	//	$article_summary .= '<p class="rt_jobs_summary_item" ><strong>Level:</strong> '.$summary_item.'</p>';
	$summary_item = get_field("ref");
	if($summary_item)
		$article_summary .= '<p class="rt_jobs_summary_item" ><strong>Ref:</strong> '.$summary_item.'</p>';
	
	$article_link = get_the_permalink();

?>
<div class="rt_jobs_slide">
	<article class="rt_jobs_item">
		<div class="rt_jobs_content_block">
			<div class="rt_news_index_n" >
				<span><?php echo $article_number; ?></span>
			</div>
			<div class="rt_news_title_block" >
				<a href="<?php echo $article_link; ?>"  >
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
			<div class="rt_news_summary_block rt_jobs_summary_block" >
				<?php echo $article_summary; ?>
			</div>
			<div class="rt_news_button_block" >
				<div class="w-btn-wrapper align_left"><a class="w-btn style_solid color_white icon_none" href="<?php echo $article_link; ?>"><span class="w-btn-label">Go to Job Offer</span></a></div>
			</div>
		</div>
	</article>
</div>
			
			
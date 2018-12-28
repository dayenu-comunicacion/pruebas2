<?php 

$article_number=0;
?>
<div class="rt_jobs_block" >
	
	<div class="rt_jobs_block_h" >
		
		<div class="rt_jobs_list" >
<?php
 $the_query = new WP_Query( 'post_type=rt_jobs&posts_per_page=6' ); 
 
// Start our WP Query
$post_index_n = 0;
if ($the_query -> have_posts()) : 
while ($the_query -> have_posts()) : 
	$the_query -> the_post(); 
	include(locate_template('templates/rt_jobs-post.php'));
	$post_index_n++;	
endwhile;
else:
?>
<div class="rt_jobs_slide">
	<article class="rt_jobs_item">
		<div class="rt_jobs_content_block">
			<div class="rt_news_title_block" >
				<h1>Job Offers</h1>
			</div>
			<div class="rt_news_summary_block rt_jobs_summary_block" >
				<p>Come back soon to check our available job positions.</p>
			</div>
		</div>
	</article>
</div>
<?php
endif;
wp_reset_postdata();

?>

		
			
			
			
		</div>
	
		<div class="rt_jobs_arrows">
		
		</div>
	</div>
</div>
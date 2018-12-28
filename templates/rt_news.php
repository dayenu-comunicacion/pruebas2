<?php 


?>
<div class="rt_news_block" >
	
	<div class="rt_news_block_h" >
		
		<div class="rt_news_list" >
<?php
 $the_query = new WP_Query( 'posts_per_page=5' ); 
 
// Start our WP Query
$post_index_n = 0;
while ($the_query -> have_posts()) : 
	$the_query -> the_post(); 
	include(locate_template('templates/rt_news-post.php'));
	//get_template_part('templates/rt_news-post');
	$post_index_n++;	
endwhile;
wp_reset_postdata();

?>

		</div>
	
		<div class="rt_news_arrows">
		
		</div>
	</div>
</div>
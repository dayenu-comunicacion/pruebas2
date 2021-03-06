<?php defined( 'ABSPATH' ) OR die( 'This script cannot be accessed directly.' );

/**
 * Outputs one single post.
 *
 * (!) Should be called after the current $wp_query is already defined
 *
 * @var $metas     array Meta data that should be shown: array('date', 'author', 'categories', 'comments')
 * @var $show_tags boolean Should we show tags?
 *
 * @action Before the template: 'us_before_template:templates/blog/single-post'
 * @action After the template: 'us_after_template:templates/blog/single-post'
 * @filter Template variables: 'us_template_vars:templates/blog/single-post'
 */

$us_layout = US_Layout::instance();

// Generate schema.org markup
$schema_heading = $schema_text = $schema_date = '';
if ( us_get_option( 'schema_markup' ) ) {
	$schema_heading = ' itemprop="headline"';
	$schema_text = ' itemprop="text"';
	$schema_date = ' itemprop="datePublished"';
}

// Filling and filtering parameters
$default_metas = array( 'date', 'author', 'categories', 'comments' );
$metas = ( isset( $metas ) AND is_array( $metas ) ) ? array_intersect( $metas, $default_metas ) : $default_metas;
if ( ! isset( $show_tags ) ) {
	$show_tags = TRUE;
}

$post_format = get_post_format() ? get_post_format() : 'standard';

// Note: it should be filtered by 'the_content' before processing to output
$the_content = get_the_content();

$preview_type = usof_meta( 'us_post_preview_layout' );
if ( $preview_type == '' ) {
	$preview_type = us_get_option( 'post_preview_layout', 'basic' );
}

$preview_html = '';
$preview_bg = '';
$preview_size = us_get_option( 'post_preview_img_size', 'large' );
if ( $preview_type != 'none' AND ! post_password_required() ) {
	$post_thumbnail_id = get_post_thumbnail_id();
	if ( $preview_type == 'basic' ) {
		if ( in_array( $post_format, array( 'video', 'gallery', 'audio' ) ) ) {
			$preview_html = us_get_post_preview( $the_content, TRUE );
			if ( $preview_html == '' AND $post_thumbnail_id ) {
				$preview_html = wp_get_attachment_image( $post_thumbnail_id, $preview_size );
			}
		} else {
			if ( $post_thumbnail_id ) {
				$preview_html = wp_get_attachment_image( $post_thumbnail_id, $preview_size );
			} else {
				// Retreiving preview HTML from the post content
				$preview_html = us_get_post_preview( $the_content, TRUE );
			}
		}
	} elseif ( $preview_type == 'modern' OR 'trendy' ) {
		if ( $post_thumbnail_id ) {
			$image = wp_get_attachment_image_src( $post_thumbnail_id, $preview_size );
			$preview_bg = $image[0];
		} elseif ( $post_format == 'image' ) {
			// Retreiving image from post content to use it as preview background
			$preview_bg_html = us_get_post_preview( $the_content, TRUE );
			if ( preg_match( '~src=\"([^\"]+)\"~u', $preview_bg_html, $matches ) ) {
				$preview_bg = $matches[1];
			}
		}
	}
}

if ( ! post_password_required() ) {
	$the_content = apply_filters( 'the_content', $the_content );
}

// The post itself may be paginated via <!--nextpage--> tags
$pagination = us_wp_link_pages(
	array(
		'before' => '<div class="g-pagination"><nav class="navigation pagination">',
		'after' => '</nav></div>',
		'next_or_number' => 'next_and_number',
		'nextpagelink' => '>',
		'previouspagelink' => '<',
		'link_before' => '<span>',
		'link_after' => '</span>',
		'echo' => 0,
	)
);

// If content has no sections, we'll create them manually
$has_own_sections = ( strpos( $the_content, ' class="l-section' ) !== FALSE );
if ( ! $has_own_sections ) {
	$the_content = '<section class="l-section single_post_section"><div class="l-section-h i-cf"' . $schema_text . '>' . $the_content . $pagination . '</div></section>';
} elseif ( ! empty( $pagination ) ) {
	$the_content .= '<section class="l-section single_post_section"><div class="l-section-h i-cf"' . $schema_text . '>' . $pagination . '</div></section>';
}

// Meta => certain html in a proper order
$meta_html = array_fill_keys( $metas, '' );

// Preparing post metas separately because we might want to order them inside the .w-blog-post-meta in future
$meta_html['date'] = '<time class="w-blog-post-meta-date date updated';
if ( ! in_array( 'date', $metas ) ) {
	// Hiding from users but not from search engines
	$meta_html['date'] .= ' hidden';
}
$meta_html['date'] .= '"' . $schema_date . ' datetime="' . get_the_date( 'Y-m-d H:i:s' ) . '">' . get_the_date() . '</time>';

$meta_html['author'] = '<span class="w-blog-post-meta-author vcard author';
if ( ! in_array( 'author', $metas ) ) {
	$meta_html['author'] .= ' hidden';
}
$meta_html['author'] .= '">';
$meta_html['author'] .= '<a href="' . get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) ) . '" class="fn">' . get_the_author() . '</a>';
$meta_html['author'] .= '</span>';

if ( in_array( 'categories', $metas ) ) {
	$meta_html['categories'] = get_the_category_list( ', ' );
	if ( ! empty( $meta_html['categories'] ) ) {
		$meta_html['categories'] = '<span class="w-blog-post-meta-category">' . $meta_html['categories'] . '</span>';
	}
}

$comments_number = get_comments_number();
if ( in_array( 'comments', $metas ) AND ! ( $comments_number == 0 AND ! comments_open() ) ) {
	$meta_html['comments'] .= '<span class="w-blog-post-meta-comments">';
	// TODO Replace with get_comments_popup_link() when https://core.trac.wordpress.org/ticket/17763 is resolved
	ob_start();
	$comments_label = sprintf( us_translate_n( '%s <span class="screen-reader-text">Comment</span>', '%s <span class="screen-reader-text">Comments</span>', $comments_number ), $comments_number );
	comments_popup_link( us_translate( 'No Comments' ), $comments_label, $comments_label );
	$meta_html['comments'] .= ob_get_clean();
	$meta_html['comments'] .= '</span>';
}

if ( us_get_option( 'post_nav' ) ) {
	$prevnext = us_get_post_prevnext();
}

if ( $show_tags ) {
	$the_tags = get_the_tag_list( '', ', ', '' );
}

$meta_html = apply_filters( 'us_single_post_meta_html', $meta_html, get_the_ID() );

$article_link = get_the_permalink();

$post_type = get_post_type();
if($post_type == "post"){
	$back_link = get_home_url()."/#news";
	
	$article_summary = "<p>".get_field("summary")."</p>";
	
}else if($post_type == "rt_jobs"){
	$back_link = get_home_url()."/#jobs";
	
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
	
}else{
	$article_summary = "";
	$back_link = get_home_url();
}
$article_thumbnail_src = get_the_post_thumbnail_url( null, 'large' );
//if($article_thumbnail_src == "") $article_thumbnail_src =  get_stylesheet_directory_uri() ."/images/article_image_placeholder_2.jpg";

$images = get_field('gallery');
$video_url = get_field("video_url");
?>
<article <?php post_class( 'l-section single_post_section for_blogpost preview_' . $preview_type ) ?>>
	<div class="l-section-h i-cf">
		<div class="rt_blog_columns">
		<div class="w-blog-left_column">
			
			
				<div class="rt_news_content_block">
					
					<div class="rt_news_back_block" >
						<a href="<?php echo $back_link ; ?>" ><span class="nav_arrow" ><span class="fa fa-angle-left"></span></span> <?php _e("Back", "trama") ?></a>
					</div>
					<div class="rt_news_title_block" >
						<div class="rt_title_block_frame" >
							<h1 class="w-blog-post-title entry-title"<?php echo $schema_heading ?>><?php the_title() ?></h1>
						</div>
					</div>
					<div class="rt_news_share_block" >
						<?php
						echo do_shortcode('[us_sharing type="outlined" color="primary" counters="hide" email="1" facebook="1" twitter="1" gplus="1" linkedin="1" url="'.$article_link.'"]');
						?>
					</div>
					<div class="rt_news_summary_block" >
						<?php echo $article_summary; ?>
					</div>
					<?php if($post_type == "rt_jobs"){ ?>
					<div class="rt_jobs_signup_block" >
						<p><?php _e("Send us your Resume and a Cover Letter explaining why you want to join RT", "trama") ?></p>
						<div class="rt_jobs_signup_block_button rt_jobs_signup_block_button_apply">
						<div class="w-btn-wrapper align_left"><a target="_blank" class="w-btn style_solid color_primary icon_none" href="mailto:nicetomeetyou@rationaltouch.com?subject=<?php echo esc_attr("Application for '".get_the_title()."'"); ?>&body=<?php echo esc_attr("Send us your Resume and a Cover Letter explaining why you want to join RT ( ".get_the_permalink());?> )"><span class="w-btn-label"><?php _e("Apply to this offer", "trama") ?></span></a></div>
						</div>
						
						
						<div class="rt_jobs_signup_block_button rt_jobs_signup_block_button_become">
						
						Not there yet?<br>
						<div class="w-btn-wrapper align_left"><a target="_blank" class="w-btn style_solid color_primary icon_none" href="mailto:becomeone@rationaltouch.com?subject=<?php echo esc_attr("I Want to become '".get_the_title()."'"); ?>&body=<?php echo esc_attr("Send us your Resume and a Cover Letter explaining why you want to join RT ( ".get_the_permalink());?> )"><span class="w-btn-label"><span class="w-btn-label"><?php _e("Want to become one", "trama") ?></span></a></div>
						
						</div>
						
					</div>
					<?php } ?>
				</div>
			
			
		</div>
		<div class="w-blog w-blog-right_column">
			<?php 


			if( $images ){ ?>
				<div class="rt_single_post_image_block" >
					<ul class="rt_single_gallery" >
						<?php 
						foreach( $images as $image ): 
							$gallery_image_src = $image['sizes']['large'];
						?>
							<li>
								<div class="rt_news_preview_image" style="background-image:url('<?php echo $gallery_image_src; ?>');" >
									<svg class="news_proportional_image_size" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 840 472" xml:space="preserve">
									</svg>
								</div>
							</li>
						<?php 
						endforeach; 
						?>
					</ul>
				</div>
<?php 
		}elseif($article_thumbnail_src != "") {
			
?>
				<div class="rt_single_post_image_block<?php if($video_url!= "") echo " has_video" ;?>" video_url="<?php echo $video_url; ?>" >
					<div class="rt_news_preview_image" style="background-image:url('<?php echo $article_thumbnail_src; ?>');" >
						<svg class="news_proportional_image_size" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 840 472" xml:space="preserve">
						</svg>
						<?php if($video_url!= "") { ?>
							<div class="play_button"><i class="fa fa-play"></i></div>
						<?php } ?>
					</div>
				</div>
<?php 
			
		}
			
?>
			
			<div class="w-blog-post-body">
				
				<div class="w-blog-post-content-block">
					<div class="w-blog-post-meta<?php echo empty( $metas ) ? ' hidden' : '' ?>">
						<?php echo implode( '', $meta_html ) ?>
					</div>
				
					<div class="w-blog-post-content">
					<?php echo $the_content ?>
				
					</div>
				</div>
				
			</div>
		</div>

		<?php
		if ( $preview_type == 'trendy' AND $us_layout->sidebar_pos == 'none' AND us_get_option( 'titlebar_post' ) == 0 AND usof_meta( 'us_titlebar' ) != 'custom' ) {
			add_action( 'wp_footer', 'us_trendy_preview_parallax', 99 );
			function us_trendy_preview_parallax() { ?>
				<script>
					(function($){
						var $window = $(window),
							windowWidth = $window.width();

						$.fn.trendyPreviewParallax = function(){
							var $this = $(this),
								$postBody = $this.siblings('.w-blog-post-body');

							function update(){
								if (windowWidth > 900) {
									var scrollTop = $window.scrollTop(),
										thisPos = scrollTop * 0.3,
										postBodyPos = scrollTop * 0.4,
										postBodyOpacity = Math.max(0, 1 - scrollTop / 450);
									$this.css('transform', 'translateY(' + thisPos + 'px)');
									$postBody.css('transform', 'translateY(' + postBodyPos + 'px)');
									$postBody.css('opacity', postBodyOpacity);
								} else {
									$this.css('transform', '');
									$postBody.css('transform', '');
									$postBody.css('opacity', '');
								}
							}

							function resize(){
								windowWidth = $window.width();
								update();
							}

							$window.bind({scroll: update, load: resize, resize: resize});
							resize();
						};

						$('.l-section.for_blogpost.preview_trendy .w-blog-post-preview').trendyPreviewParallax();

					})(jQuery);
				</script>
				<?php
			}
		}
		?>
		</div>
	</div>
</article>



<?php if ( $show_tags AND ! empty( $the_tags ) ): ?>
	<section class="l-section for_tags">
		<div class="l-section-h i-cf">
			<div class="g-tags">
				<span class="g-tags-title"><?php us_translate( 'Tags' ) ?>:</span>
				<?php echo $the_tags ?>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php if ( us_get_option( 'post_sharing' ) ) : ?>
	<section class="l-section for_sharing">
		<div class="l-section-h i-cf">
			<?php
			$sharing_providers = (array) us_get_option( 'post_sharing_providers' );
			$us_sharing_atts = array(
				'type' => us_get_option( 'post_sharing_type', 'simple' ),
				'align' => ( is_rtl() ) ? 'right' : 'left',
			);
			foreach ( array( 'email', 'facebook', 'twitter', 'linkedin', 'gplus', 'pinterest', 'vk' ) as $provider ) {
				$us_sharing_atts[$provider] = in_array( $provider, $sharing_providers );
			}
			us_load_template( 'shortcodes/us_sharing', array( 'atts' => $us_sharing_atts ) );
			?>
		</div>
	</section>
<?php endif; ?>

<?php if ( us_get_option( 'post_author_box' ) ): ?>
	<?php us_load_template( 'templates/blog/single-post-author' ) ?>
<?php endif;
if ( us_get_option( 'post_nav' ) AND ! empty( $prevnext ) ) {
	$nav_inv = 'false';
	if ( us_get_option( 'post_nav_invert', 0 ) == 1 ) {
		$nav_inv = 'true';
	}
	if ( us_get_option( 'post_nav_layout' ) == 'sided' ) {
		?>
		<div class="l-navigation inv_<?php echo $nav_inv ?>">
			<?php
			global $us_template_directory_uri;
			$placeholder_url = $us_template_directory_uri . '/framework/img/us-placeholder-square.jpg';
			foreach ( $prevnext as $key => $item ) {
				if ( isset( $prevnext[$key] ) ) {
					$tnail_id = get_post_thumbnail_id( $item['id'] );
					if ( $tnail_id ) {
						$image = wp_get_attachment_image( $tnail_id, 'thumbnail', FALSE, array( 'class' => 'l-navigation-item-image' ) );
					}
					if ( ! $tnail_id OR empty( $image ) ) {
						$image = '<img src="' . $placeholder_url . '" alt="">';
					}
					?>
					<a class="l-navigation-item to_<?php echo $key; ?>" href="<?php echo $item['link']; ?>">
						<?php echo $image ?>
						<div class="l-navigation-item-arrow"></div>
						<div class="l-navigation-item-title">
							<span><?php echo $item['title']; ?></span>
						</div>
					</a>
					<?php
				}
			}
			?>
		</div>
		<?php
	} else {
?>
	<section class="l-section for_blognav">
		<div class="l-section-h i-cf">
			<div class="w-blognav inv_<?php echo $nav_inv ?>">
				<?php foreach ( $prevnext as $key => $item ): ?>
					<a class="w-blognav-item to_<?php echo $key ?>" href="<?php echo $item['link'] ?>">
						<span class="w-blognav-meta"><?php echo $item['meta'] ?></span>
						<span class="w-blognav-title"><?php echo $item['title'] ?></span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
<?php
	}
} ?>

<?php if ( us_get_option( 'post_related', TRUE ) ): ?>
	<?php us_load_template( 'templates/blog/single-post-related' ) ?>
<?php endif; ?>

<?php if ( comments_open() OR get_comments_number() != '0' ): ?>
	<section class="l-section for_comments">
		<div class="l-section-h i-cf">
			<?php wp_enqueue_script( 'comment-reply' ) ?>
			<?php comments_template() ?>
		</div>
	</section>
<?php endif; ?>

<?php
	

	$form_title = $atts['title'];
	$form_list_id = $atts['list_id'];
	$form_subtitle = $atts['subtitle'];
	$form_question = $atts['question'];
	
	$form_question = str_replace ( "%dynamic%" , "<span class='question_dynamic_value'></span>" , $form_question );
	
	
	$form_alternatives = $atts['alternatives'];
	$correct_alternative = $atts['correct'];
	$form_alternatives_arr = explode(' ; ', $form_alternatives);
	

?>
<div class="rt_subscribe_form">
	<form action="<?php echo site_url() ?>/wp-admin/admin-ajax.php" class="mailchimp">
		<input class="correct_alternative<?php if($correct_alternative == "%dynamic%") echo " correct_alternative_dynamic" ?>" name="therightcaptcha" type="hidden"  value="<?php echo esc_attr($correct_alternative); ?>" />
		<input type="hidden" name="action" value="mailchimpsubscribe" />
		<input type="hidden" name="list_id" value="<?php echo $form_list_id; ?>" />
		<div class="rt_subscribe_form_title_block" >
			<div class="rt_title_block_frame" >
				<h4><?php echo $form_title; ?></h4>
			</div>
		</div>
		<div class="rt_subscribe_form_data_block" >
			<div class="rt_subscribe_form_email_block" >
				<input type="text" class="email_value" name="email" placeholder="Type your email" />
			</div>
			<div class="rt_subscribe_form_subtitle_block" >
				<p><?php echo $form_subtitle; ?></p>
			</div>
			<div class="rt_subscribe_form_question_block" >
				<p><?php echo $form_question; ?></p>
			</div>
			<?php 
			/*
			<div class="rt_subscribe_form_alternatives_block" >
				<ul class="alternative_select">
					<?php foreach($form_alternatives_arr as $form_alternative){ 
					
					?>
					<li class="alternative_option<?php if($form_alternative == "%dynamic%") echo " alternative_option_dynamic" ?>" value="<?php echo esc_attr($form_alternative);  ?>" ><span class="option_circle"></span><span class="value_label"><?php echo $form_alternative;  ?></span></li>
					<?php } ?>
					<input class="altermative_select_value" type="hidden"  />
				</ul>
			</div>
			*/ ?>
			<div class="rt_subscribe_form_alternatives_block" >
				<input type="text" class="captcha_value" name="captcha_value" placeholder="Your answer" autocomplete="off" />
			</div>
			
			<div class="subscribe_errors" ></div>
			
			<div class="rt_subscribe_form_button_block" >
				<div class="w-btn-wrapper align_left"><button type="submit" class="w-btn style_solid color_white icon_none" ><span class="w-btn-label">Send</span></button></div>
			</div>
			
			<h4 class="subscribe_success" ></h4>
		</div>
	</form>
</div>
			
			
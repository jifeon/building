$(document).ready(function() {

// Стиль для <select>

	$('select.qsb_select').each(function(){
		var title = $(this).attr('title');
		if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
		$(this)
		.css({'z-index':2,'opacity':0,'-khtml-appearance':'none'})
		.after('<span class="qsb_select_title">' + title + '</span>')
		.change(function(){
			val = $('option:selected',this).text();
			$(this).next().text(val);
		})
	});

// Хак z-index для IE7

	$(function() {
		var zIndexNumber = 1000;
		$('.apl_block').each(function() {
			$(this).css('zIndex', zIndexNumber);
			zIndexNumber -= 1;
		});
		$('.ie7_pop_fix').each(function() {
			$(this).css('zIndex', zIndexNumber);
			zIndexNumber -= 1;
		});
	});



	$('td.floor_detail_pic_td').css('height', $('.floor_detail_pic').height());

});
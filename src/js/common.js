$(function() {

	$('.logo-liter').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace('O', '<span>O</span>'));
	});
	$('.header-search').click(function() {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.search-field').slideUp();
		}
	}).click(function() {
		$('.search-field').slideUp();
	});
	$('.header-search').click(function(e) {
		e.stopPropagation();
	});
	$('.header').after('<div class="mobile-menu lg-d-none">');
	$('.header-menu_mobile').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
	});



});

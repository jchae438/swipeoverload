$(window).scroll(function() {
  	if($(document).scrollTop() > 1) {
    	$('nav').addClass('bg-dark');
    }
    else {
    $('nav').removeClass('bg-dark');
    }
});
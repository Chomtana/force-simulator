var scrollSpeed = 20;
var step = 2;
var current = 0;
var imageWidth = 1392;
var headerWidth = 2560;
var restartPosition = -(imageWidth - headerWidth);

function scrollBg(){
	current -= step;
	if (current == restartPosition){
		current = 0;
	}
	$('#header').css("background-position",current+"px 0");
}

var init = setInterval("scrollBg()", scrollSpeed);


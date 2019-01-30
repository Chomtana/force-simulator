	$(window).resize(function(e) {
		$("#intro video").css("height",$(window).height());
		$("#intro video").css("width",$(window).width());
		if ($(window).width() > $(window).height()) {
			$("#learning nav,#learning nav a").height($(window).height()-285);
			$(".slide").removeClass("slide_hw");
			$(".slide").removeClass("slide_hw");
			//$(".slide-sub").removeClass("slide-sub_hw");
			$(".container").removeClass("container_hw");
			$(".back").removeClass("back_hw");
			$(".home").removeClass("home_hw");
		} else {
			$("#learning nav,#learning nav a").height(($(window).height()-285)/2);
			$(".slide").addClass("slide_hw");
			//$(".slide-sub").addClass("slide-sub_hw");
			$(".container").addClass("container_hw");
			$(".back").addClass("back_hw");
			$(".home").addClass("home_hw");
		}
		$(".pdf").css("height",$(window).height()-85);
		setTimeout(function () {$(window).trigger("resize");},1);
	});
	//$(window).load(function(e) {
		setTimeout(function () {$(window).trigger("resize");},1);
	//});
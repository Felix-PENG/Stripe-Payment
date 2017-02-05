$(document).ready(function(){
	$(".type_dropdown").click(function(){
		$(this).children("span").toggleClass("glyphicon-chevron-right");
		$(this).children("span").toggleClass("glyphicon-chevron-down");

		$(this).siblings(".detail-list").toggle();
	});

	$(".feed_type").click(function(){
		$("#addSourcePage").hide();
		$("#mainPage").show();
		$("#type").text($(this).text());
	});

	$(".favorite").click(function(){
		$(this).toggleClass("glyphicon-heart-empty");
		$(this).toggleClass("glyphicon-heart");
	});

	$("#addSourceBtn").click(function(){
		$("#mainPage").hide();
		$("#addSourcePage").show();
	});

	$("#searchSource").click(function(){
		$("#result").show();
	});
});
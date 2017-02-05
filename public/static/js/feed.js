$(document).ready(function(){	
	$(".type_dropdown").click(function(){
		$(this).children("span").toggleClass("glyphicon-chevron-right");
		$(this).children("span").toggleClass("glyphicon-chevron-down");

		$(this).siblings(".detail-list").toggle();
	});

	$(".tag_feed").click(function(){
		var userEmail = $("#right").attr("userEmail");
		var tagName = $(this).attr("tagName");
		var url = "/taglist/" + userEmail + "/" + tagName;
		$("#right").attr('src',url);
		localStorage.prevUrl = $("#right").attr("src");
	});

	$(".source_feed").click(function(){
		var userEmail = $("#right").attr("userEmail");
		var source = $(this).attr("source");
		var url = "/sourcelist/" + userEmail + "/" + source;
		$("#right").attr('src',url);
		localStorage.prevUrl = $("#right").attr("src");
	});

	$(".favorite").click(function(){
		$(this).toggleClass("glyphicon-heart-empty");
		$(this).toggleClass("glyphicon-heart");
		var sourceId = $(this).attr("sourceId");
		var date = $(this).attr("date");
		var userEmail = window.parent.$("#right").attr("userEmail");
		var url = "/like/" + sourceId + "/" + date + "/" + userEmail;
		$.get(url);
	});

	$("#addSourceBtn").click(function(){
		var userEmail = $("#right").attr('userEmail');
		var url = "/editSource/" + userEmail;
		$("#right").attr('src',url);
		localStorage.prevUrl = $("#right").attr("src");
	});

	$(".newSource").click(function(){
		$("#addModal").modal();
		$("#addModal").attr("source",$(this).text());
	});

	$(".tag-select").click(function(){
		$(this).addClass("active");
		$(this).siblings(".active").removeClass("active");
	});

	$("#createTag").click(function(){
		var tagName = $("#newTag").val();
		var existTags = $("#existTags").attr("tags");
		var userEmail = window.parent.$("#right").attr("userEmail");
		var source = $("#addModal").attr('source');

		if(tagName == "" || existTags.includes(tagName)){
			$("#newTag").popover('show');
		}else{
			$.post("/editSource/"+userEmail,
			{
				'source': source,
				'tag': tagName
			},function(data){
				window.parent.location.reload();
			});
		}
	});

	$('#addModal').on('hidden.bs.modal', function () {
  		$('[data-toggle="popover"]').popover('destroy');
	});

	$("#confirm-add-source").click(function(){
		var tagName = $(".tag-select.active").text();
		var source = $("#addModal").attr('source');
		var userEmail = window.parent.$("#right").attr("userEmail");

		if(tagName == ""){
			alert("Please create a tag first!");
		}else{
			$.post("/editSource/"+userEmail,
			{
				'source': source,
				'tag': tagName
			},function(data){
				window.parent.location.reload();
			});
		}
	});

	$(".followedSource").click(function(){
		$("#removeModal").modal();
		$("#removeSourceName").text($(this).text());
		$("#removeSourceName").attr("source",$(this).text());
		$("#removeSourceName").attr("tag",$(this).attr("tag"));
	});

	$("#confirm-remove-source").click(function(){
		var source = $("#removeSourceName").attr("source");
		var tag = $("#removeSourceName").attr("tag");
		var userEmail = window.parent.$("#right").attr("userEmail");

		$.post("/editSource/"+userEmail,
		{
			'source': source,
			'tag': tag
		},function(data){
			window.parent.location.reload();
		});
	});

	$(".newsTitle").click(function(){
		var sourceId = $(this).attr("sourceId");
		var date = $(this).attr("date");
		var userEmail = window.parent.$("#right").attr("userEmail");
		var url = "/newspage/" + sourceId + "/"+ date + "/" + userEmail;
		window.parent.$("#right").attr('src',url);
	});

	$(".recommend-news").click(function(){
		var sourceId = $(this).attr("sourceId");
		var date = $(this).attr("date");
		var userEmail = window.parent.$("#right").attr("userEmail");
		var url = "/newspage/" + sourceId + "/"+ date + "/" + userEmail;
		window.parent.$("#right").attr('src',url);
	});

	$("#backToMainPage").click(function(){
		window.parent.$("#right").attr("src",localStorage.prevUrl);
	});

	$("#myFavorite").click(function(){
		var userEmail = $("#right").attr("userEmail");
		var url = "/fav/" + userEmail;
		$("#right").attr("src",url);
		localStorage.prevUrl = $("#right").attr("src");
	});

	$(".sentiment").hover(function(){
		$(this).popover('toggle');
	});

	$("#logout").click(function(){
		window.location.href = "/logout"; 
		localStorage.clear();
	});

	$(".visit").click(function(){
		window.open($(this).attr("url"));  
	});
});
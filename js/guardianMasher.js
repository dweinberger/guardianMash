
// Guardian API info
//
// http://open-platform.theguardian.com/documentation/
// 	AND: ,
//     OR: |
//     NOT: -
//"http://content.guardianapis.com/search?q=" + term + "&tag=environment&from-date=2014-01-01&api-key=k32u7x6my2jxnahxtbretjza"
// http://content.guardianapis.com/search?q=water&tag=environment&api-key=k32u7x6my2jxnahxtbretjza
//works:
//http://content.guardianapis.com/search?q=resilient&section=environment&api-key=k32u7x6my2jxnahxtbretjza
// works
//http://content.guardianapis.com/search?q=water&section=environment&from-date=2015-09-01&order-by=newest&api-key=k32u7x6my2jxnahxtbretjza
// works
//http://content.guardianapis.com/search?q=water&section=environment&from-date=2015-09-01&show-fields=byline,standfirst,main,wordcount,thumbnail,starRating&api-key=k32u7x6my2jxnahxtbretjza&order-by=newest

// amazon
// //https://doc-gc-search-r2aim34zywsfrpbiwkzneb7wae.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?return=title&q=trade

// ClimateTagger
// //http://api.climatetagger.net/service/extract?token=5c62f0ba28b94d24a8aacbbfc2d2feb0&text=smog&format=json&locale=en	
	
// guardian green commons
// API Token: 5c62f0ba28b94d24a8aacbbfc2d2feb0
	
function init(){	
	// bind enter key
	$("#searchbox").keydown(function(ev) {
		
	   if (ev.keyCode === 13) {
	   		ev.preventDefault();
		    doIt();
	   }
	});
	$("#wait").click(function(){
		$(this).slideUp();
	});
	
	// ADD: get keys from file
}
		
function doIt(){
	var term = $("#searchbox").val();
	if (term == ""){
		alert("Enter a search term");
		return;
		}
		
	$("#wait").slideDown();
		
	// make metadata about results visible
	//$("#gmeta").css({"display": "block"});
	$("#gmeta").fadeIn(700);

	// Guardian API query 
	var url = "http://content.guardianapis.com/search?q=" + term + "&section=environment&from-date=2015-09-01&show-fields=byline,standfirst,main,wordcount,thumbnail,starRating&api-key=k32u7x6my2jxnahxtbretjza&order-by=newest";
	$.get(url, function(data) {
		// get total number of results
		var totresults = data.response.total;
		var page = data.response.currentPage;
		 var arr= data.response.results;
		 //var title = a[0].webTitle;
		 //alert(title);
		 if (arr.length == 0){
		 	status("No results from the Guardian");
		 }
		 else{
		 	showResults(arr, totresults, page);
		 }
	});
}

function showResults(arr,totalresults,currentPage){
	// show the Guardian results
	displayGuardianResults(arr,totalresults,currentPage);
	displayGCrecommendations(arr);
}

function displayGuardianResults(arr,totalresults,currentPage){

	// display stats
	$("#guardTotalResults").text(totalresults);
	$("#guardCurrentPage").text(currentPage);
	
	// clear old results
	$("#guardianResultsList").fadeOut(300).html("").fadeIn(100);

	// go through array
	for (i=0; i < arr.length; i++){
		var resdiv = document.createElement("div");
		// create div for entire result
		$(resdiv).attr({"class" : "guardresultdiv","id" : "guardresultdiv" + i});
		// add the divs and their spans
		var leftdiv = document.createElement("div");
		$(leftdiv).attr({"class":"leftdiv"});
		// thumbnail
		var span = document.createElement("span");
		$(span).attr({"class" : "guardthumbnail","id" : "guardthumbnail" + i});
		$(span).html("<img src='" +  arr[i].fields.thumbnail + "'>");
		leftdiv.appendChild(span);
		var rightdiv = document.createElement("div");
		$(rightdiv).attr({"class":"rightdiv", "id" : "rightdiv" + i});
		// -- title
		var spantit = document.createElement("span");
		$(spantit).attr({"class" : "guardtitle","id" : "guardtitle" + i});
		$(spantit).html("<a href='" + arr[i].webUrl + "'>" + arr[i].webTitle + "</a>")
		rightdiv.appendChild(spantit);
		// -- date
		var span = document.createElement("span");
		$(span).attr({"class" : "guardDate","id" : "guardDate" + i});
		var rawdate = arr[i].webPublicationDate;
		var formattedDate = rawdate.substring(0,10);
		$(span).html("&nbsp;" + formattedDate);
		rightdiv.appendChild(span);
		// -- byline
		var span = document.createElement("span");
		$(span).attr({"class" : "guardbyline","id" : "guardbyline" + i});
		var byline = arr[i].fields.byline;
		$(span).html("by " + byline);
		status("Byline: " + $(span).html());
		$(rightdiv).append(span);
		// -- snippet
		var div = document.createElement("span");
		$(span).attr({"class" : "guardsnippet","id" : "guardsnippet" + i});
		var snipid = "#guardsnippet" + i;
		$(span).html("<br>" + arr[i].fields.standfirst);
		rightdiv.appendChild(span);
		// -- wordcount
		var spanwc = document.createElement("span");
		$(spanwc).attr({"class" : "guardwordcount","id" : "guardwordcount" + i});
		$(spanwc).html("words: " + arr[i].fields.wordcount);
		$(rightdiv).append(spanwc);
		// -- stars
		var span = document.createElement("span");
		$(span).attr({"class" : "guardstar","id" : "guardstar" + i});
		var stars = arr[i].fields.starRating;
		if (stars != undefined){
			$(span).text("stars: " + stars);
			rightdiv.appendChild(span);
		}
		// add newline to rightdiv for the upcoming tags and recommendations
		$(rightdiv).html($(rightdiv).html() + "<br>");
		$(resdiv).append(leftdiv);
		$(resdiv).append(rightdiv);
		$(resdiv).fadeIn(500);
		// put in a clear div
		var cleardiv = document.createElement("div");
		$(cleardiv).css({"clear":"both"});
		$(resdiv).append(cleardiv);
		
		// append to the container div
		$("#guardianResultsList").append(resdiv);
		var gcdiv = document.createElement("div");
		$(gcdiv).attr({"class" : "gcresults", "id" : "gcresultsdiv" + i});
		$("#guardianResultsList").append(gcdiv);
	}
}


function displayGCrecommendations(arr){

	// go through the array of Guardian results
	// and fetch items for each, one at a time,
	// from GC, pluggin them into the page
	
	var i,x=0;
	for ( i=0; i < arr.length; i++){
		// concatenate the headline and description
		var txt = arr[i].fields.standfirst + " " + arr[i].webTitle;
		// put it into hidden field to strip out html
		$("#hidden").html(txt);
		txt = $("#hidden").text();
		// call climatetagger
		$.ajax({
			type: "GET",
			url: "php/getTags.php", 
			data: {"text" : txt},
			dataType: 'json',
			async: false,
			error: function(e){
				status("Error getting tags: " + e.statusText + " in: " + i);
			},
			success: function (data){ 
			// get total number of results
				var tags = data.concepts;
					for (var j=0; j < tags.length; j++){	
					var tag = tags[j].prefLabel;
					var id = "#gcresultsdiv" + x;

				
					// --- get the GC page
				
					var gcurl = "https://doc-gc-search-r2aim34zywsfrpbiwkzneb7wae.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?&q=ship&return=" + tag;


					$.ajax({
						type: "GET",
						url: "php/getGC.php", 
						data: {"term" : tag},
						dataType: 'json',
						async: false,
						success: function (jsn){
							var gcresult = document.createElement("span");
							$(gcresult).attr({"class" : "gcresult", "id" : "gcresult-" + x + "-" + j} );
							var gctitle = jsn.data[j].attributes.title;
							var sp = document.createElement("span");
							$(sp).attr("class","climatetag");
							var txt = "<a  href='https://greencommons.herokuapp.com/search?query=" + tag + "'>" + tag + "</a>";
							$(sp).html(txt);
							
							//var guardid = "#gcresultsdiv" + x;
							var rightdivid = "#rightdiv" + i;
							$(rightdivid).append(sp);
						},
						error: function (e){
							var stat = e.statusText;
							$("#status").html(i + ": " + $("#status").html() + stat + "<br>");
						}
					 });
				if (x == arr.length - 1){
					 $("#wait").slideUp();
					}
				
				} // one guardian item
			
			x++;
			}
			});
			
		
	}
	
}

function status(s){
	var oldstatus = $("#status").html();
	$("#status").html(oldstatus + "<br>" + s);
}


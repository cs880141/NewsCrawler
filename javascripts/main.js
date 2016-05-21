$('#button_submit').click(function () {
	
	var url = document.getElementById("input_URL").value;
	console.log("click!"+url);
	
	getData(url);
	
})

var getData = function(url) {
	var BasicQueryUrl = 'http://query.yahooapis.com/v1/public/yql?'
	var query = 'q=' +
		encodeURIComponent('select * from html where ' 
		+ 'url = "' +url +'" and ' +  'xpath=' + "'" 
		+ '//title' + "'") + '&format=json';
	
	$('p.info').hide();	
	$.get(BasicQueryUrl + query, function (data) {
		try{
			var title = data.query.results.title;
			console.log(data.query.results.title);
			$('#title').text(title.substring(0, title.length-12));
		}catch(e){
			console.log(e);
		}
	});
	
	
	
	var query = 'q=' +
		encodeURIComponent('select * from html where ' 
		+ 'url = "' +url +'" and ' +  'xpath=' + "'" 
		+ '//abbr' + "'") + '&format=json';
	$.get(BasicQueryUrl + query, function (data) {
		try{
			var time = data.query.results.abbr.content;
			console.log(time);
			$('#time').text(time);
			$('p.info').show();
		}catch(e){
				console.log(e);
			}
	});
	
	
	
}

/*
function getTime(url){
	var BasicQueryUrl = 'http://query.yahooapis.com/v1/public/yql?';
	var query = 'q=' +
			  encodeURIComponent('select * from html where ' +
			  '  url = "' +url +'" and ' +  'xpath=' + "'" 
			  + '//abbr' + "'") + '&format=json';
	$.get( BasicQueryUrl+query, function( data ) {
		try {
			var ret = data.query.results.abbr.content;
			console.log(ret);
			$("p.message").text("Time: "+ret); 
			$("div.result").slideDown("slow");
			// if get time suc, get title;
			getTitle(url);
		}
		catch (e) {
			$("div.alert1").slideDown("slow");
			console.log(e);
		}
		//alert( "Load was performed." );
	});  
}
*/
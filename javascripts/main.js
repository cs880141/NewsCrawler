// show histories
clearCookies();
//listHistory();


/*
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}
*/


$('#button_submit').click(function () {
	
	var url = $('#input_URL').val();
	console.log("click!");
	
	getData(url);
	
})

// use YQL to get news title and time
function getData(url) {
	var BasicQueryUrl = 'http://query.yahooapis.com/v1/public/yql?'
	var query = 'q=' +
		encodeURIComponent('select * from html where ' 
		+ 'url = "' +url +'" and ' +  'xpath=' + "'" 
		+ '//title|//abbr' + "'") + '&format=json';
	
	$('p.info').hide();	
	$.get(BasicQueryUrl + query, function (data) {
		try{
			var title = data.query.results.title;
			var time = data.query.results.abbr.content;
			
			$('#title').text(title.substring(0, title.length-12));
			$('#time').text(time);
			$('p.info').show();
			
			setCookie(title.substring(0, title.length-12), JSON.stringify({URL:url,TIME:time}),1);
			insertHistory(title.substring(0, title.length-12),url,time);
			
		}catch(e){
			console.log(e);
		}
	});

}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
	alert(document.cookie);
}

function insertHistory(title, url, time) {
	var row = document.getElementById("table_hist").insertRow(1);
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	// Add some text to the new cells:
	cell1.innerHTML = "<a href="+url+" target=\"_blank\">"+title+"</a>";
	cell2.innerHTML = time;
}

function listHistory() {
	console.log("list histories");
	var cookieArray = document.cookie.split(";");

	for (var i = 0; i < cookieArray.length; i++) {
		if(cookieArray[i]!="")
		{
			try {
				var cElement = cookieArray[i].split("=");
				
				var cName = cElement[0];
				var cValue = JSON.parse(cElement[1]);
				insertHistory(cName, cValue.URL, cValue.TIME);	
			}catch(e) {
				console.log(e);
			}
		}
	}
}

function clearCookies() {
	
	var cookieArray = document.cookie.split(";");

	for (var i = 0; i < cookieArray.length; i++) {
		if(cookieArray[i]!=[])
		{
			console.log(i);
			try{
				var cElement = cookieArray[i].split("=");
				setCookie(cElement[0],cElement[1],-1);
				alert(document.cokie);
			}catch(e){
				console.log(e);
			}
		}
	}
	console.log("cookie cleared");
	
}




// show histories
//doCookieSetup("test1",1);
//doCookieSetup("test2","def");

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

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


$('#button_submit').click(function () {
	
	var url = $('#input_URL').val();
	console.log("click!"+url);
	
	getData(url);
	
})

// use YQL to get news title and time
var getData = function(url) {
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
		}catch(e){
			console.log(e);
		}
	});

}


function doCookieSetup(name, value) {
	var expires = new Date();
	//有效時間保存 2 天 2*24*60*60*1000
	expires.setTime(expires.getTime() + 172800000);
	document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString();
	alert(document.cookie);
	listCookie();
}

function listCookie() {
	document.writeln("<table>");
	document.writeln("<tr><th>Name<th>Value");
	cookieArray = document.cookie.split(";");
	for (var i = 0; i < cookieArray.length; i++) {
		console.log(cookieArray[i]);
		thisCookie = cookieArray[i].split("=");
		cName = unescape(thisCookie[0]);
		cValue = unescape(thisCookie[1]);
		document.writeln("<tr><td>" + cName + "</td><td>" + cValue + "</td>");
	}
	document.writeln("</table>");
}


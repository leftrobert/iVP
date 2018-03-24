function iframeSize() {
	var s = window.innerWidth - 4;
	var slider = document.getElementById("slide");
	var sw = window.outerWidth * 5;
	slider.style.width = sw + "px";
	for (var i = 1; i <= 5; i++) {
		var divID = document.getElementById("p" + i);
		divID.height = window.innerHeight - 290;
		divID.width = s - 20;
	}
}

function slideTo(no) {
	var s = window.innerWidth;
	var pos = (1 - no) * s;
	var slider = document.getElementById("slide");
	slider.style.marginLeft = pos + 6 + "px";
	for (var i = 1; i <= 5; i++) {
		var d = document.getElementById("d" + i);
		if (no == i && !d.classList.contains("in")) d.classList.add("in");
		if (no != i && d.classList.contains("in")) d.classList.remove("in");
	}
}

function highlight() {
	for (var i = 1; i <= 5; i++) {
		var divID = document.getElementById("p" + i);
		divID.setAttribute("class", "onhighlight");
	}
	setTimeout(function(){ 
		for (var i = 1; i <= 5; i++) {
			var divID = document.getElementById("p" + i);
			divID.removeAttribute("class"); 
		}
	}, 800);
}

function showSlider () {
	var slider = document.getElementById("slide");
	if (!slider.classList.contains("animatable")) addAnim();
	slider.classList.remove("invincible");
}

function addAnim() {
	var slider = document.getElementById("slide");
	slider.classList.add("animatable");
}

function remAnim() {
	var slider = document.getElementById("slide");
	slider.classList.remove("animatable");
}

function viewChanged(now) {
	iframeSize();
	slideTo(now);
	setTimeout(function(){ addAnim(); }, 300);
}

function startDate() {
	var today = new Date();
	var D;
	var M = " Tháng " + today.getMonth();
	switch(today.getDay()) {
	    case 1:
	    	D = "Thứ Hai";
	        break;
	    case 2:
	    	D = "Thứ Ba";
	        break;
	    case 3:
	    	D = "Thứ Tư";
	        break;
	    case 4:
	    	D = "Thứ Năm";
	        break;
	    case 5:
	    	D = "Thứ Sáu";
	        break;
	    case 6:
	    	D = "Thứ Bảy";
	        break;
	    default:
	        D = "Chủ Nhật";
	}
	document.getElementById("bigdate").innerHTML = D + ", " + today.getDate() + M;
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	m = checkTime(m);
	var t = " AM"
	if (h > 12) {
		h = h - 12;
		t = " PM";
	}
	document.getElementById("clock").innerHTML = h + ":" + m + t;
	document.getElementById("bigclock").innerHTML = h + ":" + m + t;
	startDate();
	var t = setTimeout(startTime, 1000);
}

// function printTime() {
// 	while (true) {
// 		var t = setTimeout(startTime, 500);
// 	}
// }

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

function browser() {
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

function printBrowser() {
	var b = document.getElementById("browser");
	b.innerHTML = browser();
}

function showBottom() {
	var bottDiv = document.getElementsByClassName("bottom")[0];
	var dictDiv = document.getElementsByClassName("dictation")[0];
	bottDiv.classList.remove("bott-out");
	dictDiv.classList.remove("dict-out");
}

function hideBottom() {
	var bottDiv = document.getElementsByClassName("bottom")[0];
	var dictDiv = document.getElementsByClassName("dictation")[0];
	bottDiv.classList.add("bott-out");
	dictDiv.classList.add("dict-out");
}

function showAbout() {
	var darkDiv = document.getElementsByClassName("dark")[0];
	var aboutDiv = document.getElementsByClassName("about")[0];
	darkDiv.classList.remove("invincible");
	document.getElementById("slide").classList.add("invincible");
	document.getElementById("clock").classList.add("invincible");
	setTimeout(function(){ aboutDiv.classList.remove("a-invincible"); }, 400);
	setTimeout(function(){ document.getElementsByClassName("bigclock")[0].classList.remove("invincible"); }, 400);
	hideBottom();
}

function hideAbout() {
	var darkDiv = document.getElementsByClassName("dark")[0];
	var aboutDiv = document.getElementsByClassName("about")[0];
	// setTimeout(function(){ aboutDiv.classList.add("invincible"); }, 200);
	document.getElementsByClassName("bigclock")[0].classList.add("invincible");
	aboutDiv.classList.add("a-invincible");
	setTimeout(function(){ darkDiv.classList.add("invincible"); }, 250);
	setTimeout(showBottom, 400);
	setTimeout(function(){ document.getElementById("slide").classList.remove("invincible"); }, 400);
	setTimeout(function(){ document.getElementById("clock").classList.remove("invincible"); }, 400);
}

function setDate() {
	if (document.getElementsByTagName("style")[0]) {document.head.removeChild(document.getElementsByTagName("style")[0]);}
	var today = new Date();
	var date = today.getDate();
	var picIndex = (date - 1) % 29;
	// var styleTag = document.createElement("style");
	document.body.style.background = "url(img/bg/bg"+picIndex+".jpg) center fixed no-repeat";
	document.getElementsByClassName("bottom")[0].style.background = "url(img/bg/_bg"+picIndex+".jpg) center fixed no-repeat";
	document.getElementsByClassName("bottom")[0].style.backgroundSize = "cover";
	document.getElementsByClassName("about")[0].style.background = "url(img/bg/_bg"+picIndex+".jpg) center fixed no-repeat";
	document.getElementsByClassName("about")[0].style.backgroundSize = "cover";
	// styleTag.appendChild(style);
	// document.head.appendChild(styleTag);
}

function setLock() {
	if (document.getElementsByTagName("style")[0]) {document.head.removeChild(document.getElementsByTagName("style")[0]);}
	var styleTag = document.createElement("style");
	var style = document.createTextNode(":root{--page-bg:url(../img/bg/lockscreen.jpg)}");
	styleTag.appendChild(style);
	document.head.appendChild(styleTag);
}

function setBg() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xml = this.responseXML;
			var bg = xml.getElementsByTagName("settings")[0].getAttribute("bg");
			var scriptTag = document.createElement("script");
			var script = document.createTextNode("var now=3;set"+bg+"();");
			scriptTag.appendChild(script);
			document.head.appendChild(scriptTag);
		}
	};
	xhttp.open("GET", "xml/iVP.xml", true);
	xhttp.send();
}

function fromXML(page) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xml = this.responseXML;
			var items = xml.getElementsByTagName(page)[0];
			var item = items.getElementsByTagName("item");
			var cont = document.getElementsByClassName("container")[0];
			for (var i = 0; i < item.length; i++) {
				var iconImg = document.createElement("img");
				iconImg.setAttribute("src", "../img/i/"+item[i].getAttribute("icon"));
				iconImg.setAttribute("width", "72");
				iconImg.setAttribute("height", "72");

				var linkA = document.createElement("a");
				linkA.setAttribute("href", item[i].getAttribute("link"));
				if (item[i].getAttribute("target") == "tab") linkA.setAttribute("target", "_parent");
				linkA.appendChild(iconImg);

				var iconDiv = document.createElement("div");
				iconDiv.setAttribute("class", "icon-c");
				iconDiv.setAttribute("align", "center");
				iconDiv.appendChild(linkA);

				var labelText = document.createTextNode(item[i].getAttribute("label"));
				var labelDiv = document.createElement("div");
				labelDiv.setAttribute("class", "label");
				labelDiv.setAttribute("align", "center");
				labelDiv.appendChild(labelText);

				var itemDiv = document.createElement("div");
				itemDiv.setAttribute("class", "item");
				itemDiv.appendChild(iconDiv);
				itemDiv.appendChild(labelDiv);

				cont.appendChild(itemDiv);
			}
		}
	};
	xhttp.open("GET", "../xml/iVP.xml", true);
	xhttp.send();
}
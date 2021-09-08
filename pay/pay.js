// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}

(function() {
	var targetDate = new Date(2021,8,19,18,40,0);
	var timer = null;
	function countdown() {
		var diff = targetDate.getTime() - new Date().getTime();
		if(diff <=0 ) { clearInterval(timer); timer = null; return;}
		var hours = parseInt(diff / 1000 / 60 / 60 % 60 , 10);
		console.log(hours);
		var minutes = parseInt(diff / 1000 / 60 % 60, 10);
		console.log(minutes);
		var seconds = parseInt(diff / 1000 % 60, 10);
		console.log(seconds);
		var ltime = hours+"小时" + minutes+"分"+seconds+"秒"; 
		document.querySelector('span.date').innerText = ltime;
	}
	setInterval(countdown,1000)
	
})();
// ddxq
(function() {
	var tpBts = document.querySelector('.top-rg-bt span'),
	ddxq = document.querySelector('.pay-info-rg-bt');
	console.log(tpBts)
	tpBts.onclick = function() {
		ddxq.classList.toggle('show');
	}
})();
// ewm
(function() {
	var wxzf = document.querySelector('.wxzf'),
		ewmShow = document.querySelector('.page'),
		qxBts = document.querySelector('.quxiao');
	console.log(wxzf);
	wxzf.onclick = function() {
		ewmShow.classList.add('show');
	}
	qxBts.onclick = function() {
		ewmShow.classList.remove('show');
	}
})();
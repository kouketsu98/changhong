// 选项卡
(function(){
	
	function tabToggle() {
		if(this.classList.contains('active')) return;
		
		this.parentNode.querySelector('.active').classList.remove("active");
		this.classList.add("active");
		
		
		document.querySelector(".tab-wrapper>div.show").classList.remove("show");
		document.querySelector(".tab-wrapper>div:nth-child(" + this.index +")").classList.add("show");
	}
	var tabs = document.querySelectorAll('.content-top>div');
	for(i = 0; i < tabs.length; i++) {
		tabs[i].index = i+1;
		tabs[i].onclick = tabToggle;
	}
	
})();


// 输入信息
document.querySelector('button.submit').onclick = function() {
	var yhm = document.querySelector('input.user-name').value.trim();
	var pws = document.querySelector('input.pws').value;
	// 判断是否为空
	if( yhm.length === 0 || pws.length === 0 ) {
		alert('请不要账号/密码为空');
		return;
	};
	if(yhm === 'user' && pws === '123') {
		Cookies.set("user","zhangsan")
		var referrer = document.referrer === window.location.href ? "../home/index.html" : document.referrer;
		window.location.replace(referrer);
	}else {
		alert("用户名或密码错误");
	}
	
};

// 
document.querySelector('button.submit2').onclick = function() {
	
	var phonename = document.querySelector('input.phone-name').value.trim();

	var yzm = document.querySelector('input.yzm').value;
	// 判断是否为空
	
	
	if( phonename.length === 0 || yzm.length === 0 ) {
		alert('请不要账号/密码为空');
		return;
	};
	if(phonename === 'user' && yzm === '123') {
		// window.location.href = "index.html";
		Cookies.set("user","zhangsan")
		var referrer = document.referrer === window.location.href ? "../home/index.html" : document.referrer;
		window.location.replace(referrer);
	}else {
		alert("用户名或密码错误");
	}
};

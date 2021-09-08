// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}

// xxk
(function() {
	var info = document.querySelectorAll(".info-wrapper>div")
	console.log(info);
	function tabToggle() {
		if(this.classList.contains("active")) return;
			
			this.parentNode.querySelector(".my-order-hd>a.active").classList.remove("active");
			this.classList.add("active");
			
			document.querySelector(".info-wrapper>div.show").classList.remove("show");
			
			document.querySelector(".info-wrapper>div:nth-child(" + this.index +")").classList.add("show");
			
	}
	var as = document.querySelectorAll(".my-order-hd>a");
	console.log(as);
	for(i = 0; i < as.length; i++) {
		as[i].index = i + 1;
		as[i].onclick = tabToggle;
	}
})();

// xxk2
(function() {
	function tabToggle2() {
		if(this.classList.contains("active")) return;
			
			this.parentNode.querySelector(".infoheader-left>li.active").classList.remove("active");
			this.classList.add("active");
			
			document.querySelector(".info-bd-wrapper>div.show").classList.remove("show");
			
			document.querySelector(".info-bd-wrapper>div:nth-child(" + this.index +")").classList.add("show");
			
	}
	var lis = document.querySelectorAll(".infoheader-left>li");
	console.log(lis);
	for(i = 0; i < lis.length; i++) {
		lis[i].index = i + 1;
		lis[i].onclick = tabToggle2;
	}
})();
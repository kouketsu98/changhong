// 关联
(function() {
	var threshold = 100, cxList = document.querySelector('ul.part-indicators');
	console.log(cxList);
	var onscrollHandler = window.onscroll;
	window.onscroll = function() {
		if(onscrollHandler !== undefined) onscrollHandler();
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		if(nowTop >= threshold)
			cxList.classList.add('show');
		else
			cxList.classList.remove('show');
	};
	
	var thresholds = [],
		indicators = document.querySelectorAll('ul.part-indicators li'),
		parts = document.querySelectorAll('.part'),
		timer = null;
	// 1. 搜集关联的区域的临界值
	(function() {
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop,
			threshold = 0;
		for(var i = 0; i < parts.length; i++) {
			threshold = parts[i].getBoundingClientRect().top + nowTop;
			thresholds.push(Math.ceil(threshold));
			if(i === parts.length - 1) {
				thresholds.push(Math.ceil(threshold + parts[i].getBoundingClientRect().height));
			}
		}
		console.log(thresholds);
	})();
	
	// 右关联左边
	window.onscroll = function() {
		if(timer !== null) return; // 如果是点击指示器，触发滚动我们不做响应
		console.log(1);
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		// 左边菜单全部不激活
		for(var i = 0; i < indicators.length; i++) { indicators[i].classList.remove('active'); }
		// 如果没有任意一个part进入浏览器可视区域
		if(nowTop < thresholds[0] || nowTop > thresholds[thresholds.length - 1]) { return; }
		// 找出哪个part进入了可视区域，让其对应的indicator附加active
		for(var i = 0; i < thresholds.length - 1; i++) {
			if(nowTop >= thresholds[i] && nowTop < thresholds[i + 1]) {
				indicators[i].classList.add('active');
				break; // 直接结束for循环
			}
		}
	};
	// 左关联右
	document.onmousewheel = function() {
		if(timer !== null) {
			window.clearInterval(timer);
			timer = null;
		}
	};
	for(var i = 0; i < indicators.length; i++) {
		indicators[i].index = i;
		indicators[i].onclick = function() {
			if(this.classList.contains('active')) return;
			if(timer !== null) {
				window.clearInterval(timer);
				timer = null;
			}
			// 左边菜单全部不激活
			for(var i = 0; i < indicators.length; i++) { indicators[i].classList.remove('active'); }
			// 当前被点的激活
			this.classList.add('active');
			// window滚动指定的位置
			var targetY = thresholds[this.index];
			timer = window.setInterval(function() {
				var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
				var distance = (nowTop - targetY) * 0.2; // 本次计时器需要滚动的距离
				if(Math.abs(distance) <= 1) {
					window.scrollTo(0, targetY);
					clearInterval(timer);
					setTimeout(function() { timer = null; }, 3);
					return;
				}
				window.scrollTo(0, nowTop - distance);
			}, 15);
		};
	}
})();




// 返回顶部
(function() {
	var threshold = 500, topButton = document.querySelector('.topbuttom'), timer = null;
	var onscrollHandler = window.onscroll;
	window.onscroll = function() {
		if(onscrollHandler !== undefined) onscrollHandler();
		var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
		if(nowTop >= threshold)
			topButton.classList.add('show');
		else
			topButton.classList.remove('show');
	};
	// 返回顶部的过程中动了鼠标滚轮，则停止继续返回顶部
	document.onmousewheel = function() {
		if(timer !== null) {
			clearInterval(timer);
			timer = null;
		}
	};
	// 返回顶部
	topButton.onclick = function() {
		timer = setInterval(function() {
			var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
			if(nowTop <= 5) {
				clearInterval(timer);
				timer = null;
				window.scrollTo(0, 0);
				return;
			}
			window.scrollTo(0,nowTop * 0.9);
		},10);
	};
})();
		

// 轮播图
(function () {
	
	var index = 0;
	var timer = null;
	var banner = document.querySelector('.banner');
	var items = banner.querySelectorAll('.item');
	var indicators = banner.querySelectorAll('.indicator');
	banner.onmouseover = function() {
		window.clearInterval(timer);
	};
	banner.onmouseout = function() {
		timer = window.setInterval(function() { bannerToggle((index + 1) % items.length);} , 3000);
	};
	for(var i = 0; i <indicators.length; i++) {
		indicators[i].index = i;
		indicators[i].onclick = function() {
			if(this.classList.contains('active')) return;
			bannerToggle(this.index);
		};
	}
	function bannerToggle(nextIndex) {
		console.log(nextIndex);
		items[index].classList.remove('active');
		indicators[index].classList.remove('active');// index = (index + 1) % items.length;
		index = nextIndex;
		items[index].classList.add('active');
		indicators[index].classList.add('active');
	}
	timer = window.setInterval(function() { bannerToggle((index + 1) % items.length);} , 3000);
	
})();	


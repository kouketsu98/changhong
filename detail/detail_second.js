
(function () {
	
	var lis = document.querySelector('.nav-list-wrapper');
	var menus = document.querySelector('.home-banner-menu-main');
	var over = document.querySelector('.menu-ul-bg');
	 lis.onclick = change;
	 function change() {
		 console.log('1');
		if(menus.classList.contains('show')) {
			menus.classList.remove('show');
			lis.classList.remove('active');
			over.classList.remove('over');
		}
		else {
			menus.classList.add('show');
			lis.classList.add('active');
			over.classList.add('over');
		}
	}
})();



	(function(){
		//给上一个和下一个绑定点击事件
		var length = document.querySelector('ul.indicator-wrapper').children.length;
			console.log(length);
		var imgBg = document.querySelector('.box-img-wrapper ');
			console.log(imgBg);
			// console.log(imgBg[1]);
		var indicaterWrapper = document.querySelectorAll('ul.indicator-wrapper li img');
			console.log(indicaterWrapper);
			
			indicaterWrapper.forEach(function(item) {
				item.onmouseover = function () {
					var id = item.src;
					console.log(id);
					// imgBg.innerHTML =`<img class="show" src="${id}"/> `;
					document.querySelector('.box-img-wrapper img').src = id;
					
				};
			});
			
		document.querySelector('span.btn-prev').onclick = function() {
			console.log('上一个');
		};
		document.querySelector('span.btn-next').onclick = function() {
			console.log('下一个');
		};
		
	})();
	




(function() {
	
	
	// 放大倍率
	var ratio = 2, minRatio = 1, maxRatio = 4,
		zoomContainer = document.querySelector('.zoom-container'),
		zoomMask = document.querySelector('.zoom-mask'),
		zoom = document.querySelector('.zoom'),
		zoomBig = document.querySelector('.zoom-big'),
		// 为了不断实时获取zoom的宽高，因为全局变量先赋初始值
		zoomW = 0, zoomH = 0;
		zoomContainerW = 0, zoomContainerH = 0;
		
		// var boxImg = document.getElementById('.box-img-wrapper img.show');
		console.log(boxImg);
		var boxImg = document.querySelector('.box-img-wrapper img');
	// 图片加载完成后，动态获取其最终大小，进而绑定zoomContainer的宽高
		document.querySelector('.box-img-wrapper img').onload = function() {
		// var boxImg = document.querySelector('.box-img-wrapper img.show');
		// console.log(boxImg);
		// var zoomContainer = document.querySelector('.zoom-container');
		zoomContainer.style.width = this.width + 'px';
		console.log(zoomContainer.style.width);
		zoomContainer.style.height = this.height + 'px';
		console.log(zoomContainer.style.height);
		zoom.style.backgroundImage = `url(${this.src})`;
		zoom.style.backgroundSize = `${this.width}px ${this.height}px`;
		zoomBig.style.backgroundImage = `url(${this.src})`;
		zoomBig.style.backgroundSize = `${this.width * ratio}px ${this.height * ratio}px`;
		zoom.style.width = this.width / ratio + 'px';
		zoom.style.height = this.height / ratio + 'px';
		// 实时获取zoom宽高
		zoomW = this.width / ratio;
		zoomH = this.height / ratio;
		zoomContainerW = this.width;
		zoomContainerH = this.height;
	};
	// 鼠标移动
	zoomMask.onmousemove = function(e) {
		console.log(e.offsetX, e.offsetY);
		var x = e.offsetX, y = e.offsetY;
		
		var left = x - zoomW / 2;
		if(left < 0) left = 0;
		if(left + zoomW > zoomContainerW) left = zoomContainerW - zoomW;
		var top = y - zoomH /2;
		if(top < 0) top = 0;
		if(top + zoomH > zoomContainerH) top = zoomContainerH - zoomH;
		
		zoom.style.left = `${left -3}px`;
		zoom.style.top = `${top -3}px`;
		
		zoom.style.backgroundPosition = `-${left}px -${top}px`;
		zoomBig.style.backgroundPosition = `-${left * ratio}px -${top * ratio}px`;
	};
})();


// rg-Counter
(function() {
	var countList = [
		{id :1, count: 4,  mintotal: 1, maxCount: 20,kucun:20,zhuangtai: "有货",},
		// {id :2, count: 3,  mintotal: 2, maxCount: 5,}
	];
	
	var htmlStr = "";
	countList.forEach(function(item) {
		htmlStr += `
			<div class="count-wrapper">
				
				<input data-id="${item.id}" class="btn-decrease" type="button" value="-" ${ item.count === 1 ? "disabled" : ""}>
				<span class="count">${item.count}</span>
				<input data-id="${item.id}" data-max="${item.maxCount}"  class="btn-increase" type="button" value="+" ${ item.count === item.maxCount ? "disabled" : "" }>
			</div>
			<div class="kucun-num"><span>库存剩余量:</span> ${item.kucun}<span> 件</span></div>
			<div class="kucun-zhuangtai">${item.zhuangtai}</div>
		`;
		document.querySelector(".rg-count-wrapper").innerHTML += htmlStr;
	});
	// 减
	var decreaseBtns = document.querySelector('input.btn-decrease');
	// console.log(2);
	decreaseBtns.onclick = function () {
			// 数量减少
			var countinput = this.parentNode.querySelector('span.count'),
				count = parseInt(countinput.innerText);
			countinput.innerText = count - 1;
			// 
			// 让加号取消禁用状态
			this.parentNode.querySelector('input.btn-increase').disabled = false;
			// 更新好自身的状态
			this.disabled = count - 1 === 1;
			// 更新cartList中的数据
			// var id = parseInt(this.parentNode.parentNode.dataset.id);
			
			// for(var i = 0; i < cartList.length; i++) {
			// 	if(cartList[i].id === id) {
			// 		// cartList[i].count -= 1;
			// 		cartList[i].count = cartList[i].count - 1;
			// 		// console.log(cartList[i].count);
					
			// 		break;
			// 	}
			// }
		};
	
	// 加
	var increaseBtns = document.querySelector('input.btn-increase');
	// console.log(2);
	increaseBtns.onclick = function () {
			// 数量减少
			var countinput = this.parentNode.querySelector('span.count'),
				count = parseInt(countinput.innerText);
			countinput.innerText = count + 1;
			// 
			// 让加号取消禁用状态
			this.parentNode.querySelector('input.btn-decrease').disabled = false;
			// 更新好自身的状态
			this.disabled = count + 1 === parseInt(this.dataset.max);;
	};
})();

// xxk
(function() {
	function tabToggle() {
		if(this.classList.contains("active")) return;
			
			this.parentNode.querySelector(".pro-tab a.active").classList.remove("active");
			this.classList.add("active");
			
			document.querySelector(".pro-tab-sub div.show").classList.remove("show");
			document.querySelector(".pro-tab-sub div:nth-child(" + this.index +")").classList.add("show");
		
	}
	var as = document.querySelectorAll(".pro-tab a");
	// console.log(as);
	for(i = 0; i < as.length; i++) {
		as[i].index = i + 1;
		as[i].onclick = tabToggle;
	}
})();
// 




// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}
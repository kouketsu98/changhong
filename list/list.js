
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
// 
(function() {
	var divShow = document.querySelector('.other-wrapper');
	var spanActive = document.querySelector('.select-btn');
	// var span2Active = document.querySelector('.select-btn2');
	spanActive.onclick = change;
	
	console.log('被点了');
	function change() {
		if(spanActive.classList.contains('active') ) {
			spanActive.classList.remove('active');
			// span2Active.classList.add('active');
			divShow.classList.add('show');
		}
		else {
			divShow.classList.remove('show');
			spanActive.classList.add('active');
			// span2Active.classList.remove('active');
		}
	}
	
})();
// 
(function() {
	var divList = [
		{id: 1, name: "65英寸 智能AI交互真8K电视 65D8K", avatar:"../cart/images/P020210525624439782671.jpg", price: 7299, pl: 5,},
		{id: 2, name: "CHiQ 75英寸 极智屏电视", avatar:"../public/images/nav002.jpg", price: 13997, pl: 3,},
		{id: 3, name: "CHiQ 55英寸 极智薄全生态8K电视", avatar:"../public/images/nav003.jpg", price: 5999, pl: 11,},
		{id: 4, name: "CHiQ 三色4K激光电视", avatar:"../public/images/nav004.jpg", price: 23997, pl: 7,},
	];
	// 渲染页面
	// function getHtml() {}
	var htmlStr ="";
	divList.forEach(function(item) {
		htmlStr += `
			<li>
				<div>
					<img src="${item.avatar}" width="190px" >
					<p>${item.name}</p>
					<span>￥${item.price}.00</span>
					<a>${item.pl}人评价</a>
					<div class="xr-bt">
						<div>
							<input type="checkbox" name="" id="" value="" /> 对比
						</div>
						<div>
							<img src="images/hert.jpg" > 收藏
						</div>
						<div>
							<img src="images/cart.jpg" > 加入购物车
						</div>
					</div>
				</div>
			</li>
			
		`;
	});
	document.querySelector('ul.ct-main-wrapper-ul').innerHTML = htmlStr;
	
	// 
	var jgup = document.querySelector('.jgup'),
		jgdown = document.querySelector('.jgdown');
	console.log(jgup);
	console.log(jgdown);
	jgup.onclick = function () {
		
			jgup.classList.add('none');
			jgdown.classList.remove('none')
			console.log(2);
			var up = divList.sort(function(a,b){
				return a.price - b.price
			})
			console.log(up);
		// 渲染页面
		var htmlStr ="";
		divList.forEach(function(item) {
			htmlStr += `
				<li>
					<div>
						<img src="${item.avatar}" width="190px" >
						<p>${item.name}</p>
						<span>￥${item.price}.00</span>
						<a>${item.pl}人评价</a>
						<div class="xr-bt">
							<div>
								<input type="checkbox" name="" id="" value="" /> 对比
							</div>
							<div>
								<img src="images/hert.jpg" > 收藏
							</div>
							<div>
								<img src="images/cart.jpg" > 加入购物车
							</div>
						</div>
					</div>
				</li>
				
			`;
		});
		document.querySelector('ul.ct-main-wrapper-ul').innerHTML = htmlStr;
			
	};
	jgdown.onclick = function () {
		jgup.classList.remove('none');
		jgdown.classList.add('none')
		console.log(2);
		var up = divList.sort(function(a,b){
			return b.price - a.price
		})
		console.log(up);
	// 渲染页面
	var htmlStr ="";
	divList.forEach(function(item) {
		htmlStr += `
			<li>
				<div>
					<img src="${item.avatar}" width="190px" >
					<p>${item.name}</p>
					<span>￥${item.price}.00</span>
					<a>${item.pl}人评价</a>
					<div class="xr-bt">
						<div>
							<input type="checkbox" name="" id="" value="" /> 对比
						</div>
						<div>
							<img src="images/hert.jpg" > 收藏
						</div>
						<div>
							<img src="images/cart.jpg" > 加入购物车
						</div>
					</div>
				</div>
			</li>
			
		`;
	});
	document.querySelector('ul.ct-main-wrapper-ul').innerHTML = htmlStr;
	
		
	};
			
		
		
		
		
	
	// 升序排序
	
	
	// 降序排序
	// var down = divList.sort(function(c,d){
	// 	return d.price - c.price
	// })
	// console.log(down);
	
	
})();
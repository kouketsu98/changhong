// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}

// 0 .构造虚假购物信息
		var cartList = [
			// { id: 1, name: "WiFi放大器Pro 黑色", avatar:"images/cart1.jpg", price: 998, count: 2,  mintotal: 0, maxCount: 10},
			// { id: 2, name: "体脂秤2 白色", avatar:"images/cart2.jpg", price: 799, count: 1,  mintotal: 1, maxCount: 5},
			// { id: 3, name: "无线鼠标 Lite", avatar:"images/cart3.jpg", price: 599, count: 5,  mintotal: 2, maxCount: 10},
			// { id: 4, name: "无线蓝牙双模鼠标 静音版", avatar:"images/cart4.jpg", price: 299, count: 10,  mintotal: 3, maxCount: 20},
			{ id: 5, name: "美菱M鲜生BCD-506WQ3S十字对开冰箱", avatar:"images/P020210525316803294949.jpg", price: 8799, count: 4,  mintotal: 1, maxCount: 8,kucun: "有货",},
			{ id: 6, name: "65英寸 智能AI交互真8K电视 65D8K", avatar:"images/P020210525329778606616.jpg", price: 7299, count: 2,  mintotal: 2, maxCount: 10,kucun: "有货",},
			{ id: 7, name: "CHiQ 75英寸 AI极智屏电视 75Q7S", avatar:"images/P020210525624439782671.jpg", price: 8997, count: 10,  mintotal: 3, maxCount: 10,kucun: "有货",}
		];
		// 动态渲染购物记录数据
		var htmlStr = "";
		cartList.forEach(function(item){
			
			htmlStr += `
				<div class="cartt-list-item" data-id="${item.id}">
					<div class="heart-wrapper">
						<div data-id="${item.id}" class="heart"></div>
					</div>
					<input class="checkbox" type="checkbox">
					<div class="col2-img">
						<img src="${item.avatar}" >
						<h6>${item.name}</h6>
					</div>
					<div class="price-wrapper">
						￥<span class="price">${item.price}</span>.00
					</div>
					<div class="count-wrapper">
						<input data-id="${item.id}" class="btn-decrease" type="button" value="-" ${ item.count === 1 ? "disabled" : ""}>
						
						<span class="count">${item.count}</span>
						<input data-id="${item.id}" data-max="${item.maxCount}"  class="btn-increase" type="button" value="+" ${ item.count === item.maxCount ? "disabled" : "" }>
					</div>
					<span class="kucun">${item.kucun}</span>
					<input data-id="${item.id}" class="btn-remove" type="button" value="X">
				</div>
			`;
			// <input class="count" type="text" value="${item.count}">
			// <span class="count">${item.count}</span>
			// <div class="col2-total" data-id="${item.id}">
			// 			<span class="mintotal">${item.price * item.count} </span>
			// 		</div>
		});
		document.querySelector(".cart-list").innerHTML = htmlStr;
		
		// 利用事件委托处理数量加减、删除、勾选
		// 实现购物数量加
		var decreaseBtns = document.querySelectorAll('.cart-list input.btn-decrease');
		
		decreaseBtns.forEach(function(item){
			item.onclick = function () {
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
				var id = parseInt(this.parentNode.parentNode.dataset.id);
				
				
				
				for(var i = 0; i < cartList.length; i++) {
					if(cartList[i].id === id) {
						// cartList[i].count -= 1;
						cartList[i].count = cartList[i].count - 1;
						// console.log(cartList[i].count);
						
						break;
					}
				}
				updateTotal();
			};
		});
		// for( var i = 0; i <decreaseBtns.length; i++) {
			
		// }
		
		var increaseBtns = document.querySelectorAll('.cart-list input.btn-increase');
		increaseBtns.forEach(function(item){
			item.onclick = function () {
				// 数量增加
				var countinput = this.parentNode.querySelector('span.count'),
					count = parseInt(countinput.innerText);
				countinput.innerText = count + 1;
				// 让减号取消禁用状态
				this.parentNode.querySelector('input.btn-decrease').disabled = false;
				// 更新好自身的状态
				this.disabled = count + 1 ===  parseInt(this.dataset.max);
				// 更新cartList中的数据
				var id = parseInt(this.parentNode.parentNode.dataset.id);
				for(var i =0; i <cartList.length; i++){
					if(cartList[i].id === id) {
						cartList[i].count += 1;
						
						// console.log(cartList[i].count);
						break;
					}
				}
				updateTotal();
			};
		});
		
		// 删除按钮点击事件
		var removeBtns = document.querySelectorAll('input.btn-remove');
		removeBtns.forEach(function(item){
			item.onclick = function() {
				// 1.判断是否删除
				if(!confirm('确定删除吗')) return;
				// 2.删除数组中数据
				var id = parseInt(this.parentNode.dataset.id);
					// 2.1找到它
				var i = cartList.findIndex(function(item){
					return item.id === id;
					
					
				});
				
					//2.2 删除它
				cartList.splice(i,1);
				// 3.删除渲染页面
				this.parentNode.parentNode.removeChild(this.parentNode);
				updateTotal();
			};
		});
		// redHeart
		
		var changeHeart = document.querySelectorAll('.heart');
		console.log(this.classList);
		changeHeart.forEach(function(item){
			item.onclick = function() {
				// this.classList.toggle('active');
				if(this.classList.contains('active') ) {
					if(confirm('确定取消收藏此产品吗？')) {
						this.classList.remove('active');
					};
				}
				else {
					if(confirm('确定收藏此产品吗？')) {
						this.classList.add('active');
					};
				}
				
				
				// confirm('收藏成功');
			};
		});
		
		
		
		
		// 全选反选功能
		var checkboxes = document.querySelectorAll('.cart-list input.checkbox');
		// 上联动下
		checkboxes.forEach(function(item){
			item.onclick = function(){
				this.classList.toggle('checked');
				var unchecked = document.querySelectorAll('.cart-list input.checkbox:not(.checked)');
				document.querySelector('input.checkbox.all').checked = unchecked.length === 0;
				document.querySelector('input.checkbox.all').classList.toggle('checked', unchecked.length === 0);
				
				
				// console.log(changeHeart[item]);
				updateTotal();
			};
		});
		// 下联动上
		document.querySelector('input.checkbox.all').onchange = function() {
			this.classList.toggle('checked');
			document.querySelectorAll('.cart-list input.checkbox').forEach(function(item){
				item.checked = this.checked;
				item.classList.toggle('checked',this.checked);
				
			},this);
			updateTotal();
		};
		// 总计
		function updateTotal() {
			var checkedBoxes = document.querySelectorAll('.cart-list input.checkbox.checked');
			var zongGong = document.querySelector('span.zonggong');
			var mintotal = document.querySelectorAll('span.mintotal');
			// var zongGong = "";
			var total = 0,id = 0, target = null,mintotal = 0 ,zongGong =0;
			checkedBoxes.forEach(function(item) {
				id= parseInt(item.parentNode.dataset.id);
				target = cartList.find(function(item) {
					return item.id === id;
					item.count === count;
					
				
				});
				// console.log(target);
				zongGong += target.count;
				total += target.price * target.count;
				mintotal = target.count * target.price;
				
			});
			
			document.querySelector('span.total').innerText = total;
			document.querySelector('span.zonggong').innerText = zongGong;
			document.querySelectorAll('span.mintotal').innerText = mintotal;
		}
		
		// 小计
		// (function(item) {
			
		// 	var minTotal = document.querySelectorAll('span.mintotal');
		// 	// 
		// 	console.log(1);
		// 	mintotal = "";
		// 	for(var i =0; i <cartList.length; i++){
		// 		mintotal = cartList[i].price * cartList[i].count;
		// 		document.querySelector('span.mintotal').innerText = mintotal;
			
		// 		console.log(cartList[i].mintotal);
		// 	} 
			
			
		// })();
		
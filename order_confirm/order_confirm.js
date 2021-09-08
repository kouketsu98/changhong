// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}


var addresses = [
	{id: 1, user: "zhangsan", receiveName: "张三", receivePhone: "17655555555",  receiveEmail: "123456@163.com",receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都20#1421", isDefault: true},
	{id: 2, user: "zhangsan", receiveName: "张三同学", receivePhone: "17688888888", receiveEmail: "654321@163.com", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都5#2201", isDefault: false},
];
(function() {
	var user = "zhangsan"; 
	var htmlStr = "";
	addresses.filter(function(item) { return item.user === user;}).forEach(function(item) {
		htmlStr += getAddressHtml(item);
	});
	document.querySelector('.info-select select').innerHTML = htmlStr;
	
	document.querySelector('.order-info-name-bd').onclick = function(e) {
		if(e.target.classList.contains('info-update'))
			beginUpdateHandler(e.target);
		else if(e.target.classList.contains('info-add'))
			beginAddHandler(e.target);
		else
			return;
	};
	

	function getAddressHtml(address) {
	var htmlStr = `
		<option data-id="${address.id}">
			<span class="name">${address.receiveName}-</span>
			<span class="region">${address.receiveRegion}-${address.receiveDetail}</span>
			<span class="phone">-${address.receivePhone}</span>
		</option>
	`;
	return htmlStr;
	}
	
	function beginUpdateHandler(target) {
		// 读取修改的地址id
		// var id = parseInt(target.parentNode.firstChild.childNodes.dataset.id);
		var j = document.querySelector('.info-select select option')
		console.log(j);
		// var id = parseInt(traget.dataset.id);
		var id = parseInt(j.dataset.id);
		console.log(id);
		var address = addresses.find(function(item) {return item.id === id;});
		// 让表单回显要修改的地址的当前值
		var form = document.forms['addressEdit'];
		form['id'].value = address.id;
		form['receiveName'].value = address.receiveName;
		form['receivePhone'].value = address.receivePhone;
		form['receiveEmail'].value = address.receiveEmail;
		form['receiveDetail'].value = address.receiveDetail;
		// 让模态框显示出来
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
	}	
	
	function beginAddHandler() {
		// 表单重置
		var form = document.forms['addressEdit'];
		form.reset();
		form['id'].value = 0;
		regionPicker.reset();
		// 让模态框显示出来
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
	}
	// 取消按钮
	document.querySelector('button.btn-cancel').onclick = function() {
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	};
	// 确定按钮
	document.querySelector('button.btn-ok').onclick = function() {
		// 非空验证
		// 搜集用户的输入，整合成一个对象
		var form = document.forms['addressEdit'];
		var address = {
			id: parseInt(form['id'].value),
			receiveName: form['receiveName'].value.trim(),
			receivePhone: form['receivePhone'].value.trim(),
			receiveEmail: form['receiveEmail'].value.trim(),
			receiveRegion: regionPicker.get(),
			receiveDetail: form['receiveDetail'].value.trim()
		};
		// 取出form.id判断是新增还是修改,并继续完成整合在进行操作
		if(address.id === 0) {
			address.id = addresses[addresses.length - 1].id + 1;
			address.isDefault = false;
			// 数据变更
			addresses.push(address);
			// dom变更
			document.querySelector('.info-select select').innerHTML += getAddressHtml(address);
			// 提示反馈用户
			alert('新增成功');
		} else {
			var i = addresses.findIndex(function(item) {return item.id === address.id; });
			// console.log(i);
			address.isDefault = addresses[i].isDefault;
			// 数据变更
			addresses.splice(i,1,address);
			// dom变更
			var io = document.querySelector(`.info-select select option[data-id = "${address.id}"]`);
			console.log(2);
			console.log(io);
			// var ioSpan = document.querySelector();
			// console.log(ioSpan);
			// io.querySelector('span.name').innerText = `收货人:` + address.receiveName;
			// io.querySelector('span.phone').innerText =`手机:` + address.receivePhone;
			// io.querySelector('span.region').innerText =`收货人地址:` + `${address.receiveRegion} ${address.receiveDetail}`;
			io.innerHTML = address.receiveName + address.receivePhone + `${address.receiveRegion} ${address.receiveDetail}`;
			// // 提示反馈用户
			alert('修改成功');
		}
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	};
})();
// 判断是否登录
if(Cookies.get("user") === undefined) {
	window.location.replace("../login/login.html");
}
var addresses = [
	{id: 1, user: "zhangsan", receiveName: "张三", receivePhone: "17655555555",  receiveEmail: "123456@163.com",receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都20#1421", isDefault: true},
	{id: 2, user: "zhangsan", receiveName: "张三同学", receivePhone: "17688888888", receiveEmail: "654321@163.com", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都5#2201", isDefault: false},
	{id: 3, user: "zhangsan", receiveName: "张三父亲", receivePhone: "17699999999",  receiveEmail: "123654@163.com",receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "青岛农业大学西苑小区", isDefault: false},
	{id: 11, user: "lisi", receiveName: "李四", receivePhone: "17698765432", receiveEmail: "123456@163.com",receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "青岛农业大学", isDefault: false },
	{id: 12, user: "lisi", receiveName: "李四同学", receivePhone: "17623456789", receiveEmail: "123456@163.com",receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都1#1101", isDefault: false }
];

(function() {
	var user = "zhangsan"; //假设zhangsan登录的商城
	// filter 从数组筛选出所有满足条件的元素，返回数组，找不到也返回数组，只是length为0
	var htmlStr = "";
	addresses.filter(function(item) { return item.user === user;}).forEach(function(item) {
		htmlStr += getAddressHtml(item);
	});
	
	document.querySelector('ul.address-list').innerHTML = htmlStr + document.querySelector('ul.address-list').innerHTML;
	// 给ul。address-list绑定点击事件
	document.querySelector('ul.address-list').onclick = function(e) {
		if(e.target.classList.contains('btn-remove'))
			removeHandler(e.target);
		else if(e.target.classList.contains('btn-default'))
			defaultHandler(e.target);
		else if(e.target.classList.contains('btn-modify'))
			beginModifyHandler(e.target);
		else if(e.target.classList.contains('btn-add'))
			beginAddHandler(e.target);
		else
			return;
	};
	function getAddressHtml(address) {
		var liStr = `
			<li data-id="${address.id}">
				<span class="name">收货人:${address.receiveName}</span>
				<span class="phone">手机:${address.receivePhone}</span>
				<span class="email">电子邮箱:${address.receiveEmail}</span>
				<span class="region">收货地址:${address.receiveRegion}${address.receiveDetail}</span>
				<span class="default-wrapper ${address.isDefault ? 'is-default' : ''}">
					<span class="default">默认地址</span>
					<button class='btn-default'>设为默认</button>
				</span>
				<span class="btn-bjsc">
					<button class="btn-modify" type="button">编辑</button>
					<button class="btn-remove" type="button">删除</button>
				</span>
			</li>
		`;
		return liStr;
	}
	
	function removeHandler(target) {
			// 判断是否删除
			if(!confirm('are you sure?')) return;
			// 删除数组中的数据（先找到它；然后删除它）
			var id = parseInt(target.parentNode.parentNode.dataset.id);
			var i = addresses.findIndex(function(item) {
				return item.id === id;
			});
			addresses.splice(i,1);
			// 删除渲染页面
			target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
			alert('删除成功');
	}
	function defaultHandler(target) {
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		// 数据变更
		var curDefault = addresses.find(function(item) { return item.user === user && item.isDefault;});
		if(curDefault !== undefined) curDefault.isDefault = false;
		addresses.find(function(item) { return item.id === id}).isDefault = true;
		// 页面dom变更
		var curDefaultDom = document.querySelector('span.is-default');
		if(curDefaultDom !== null) curDefaultDom.classList.remove('is-default');
		target.parentNode.classList.add('is-default');
		// 提示用户
		alert('默认地址修改成功');
	}
	function beginModifyHandler(target) {
		// 读取修改的地址id
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var address = addresses.find(function(item) {return item.id === id;});
		// 让表单回显要修改的地址的当前值
		var form = document.forms['addressEdit'];
		form['id'].value = address.id;
		form['receiveName'].value = address.receiveName;
		form['receivePhone'].value = address.receivePhone;
		form['receiveEmail'].value = address.receiveEmail;
		form['receiveDetail'].value = address.receiveDetail;
		regionPicker.set(address.receiveRegion);
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
			document.querySelector('ul.address-list').innerHTML += getAddressHtml(address);
			// 提示反馈用户
			alert('新增成功');
		} else {
			var i = addresses.findIndex(function(item) {return item.id === address.id; });
			// console.log(i);
			address.isDefault = addresses[i].isDefault;
			// 数据变更
			addresses.splice(i,1,address);
			// dom变更
			var li = document.querySelector(`ul.address-list li[data-id = "${address.id}"]`);
			console.log(li);
			li.querySelector('span.name').innerText = `收货人:` + address.receiveName;
			li.querySelector('span.phone').innerText =`手机:` + address.receivePhone;
			li.querySelector('span.email').innerText =`电子邮箱:` + address.receiveEmail;
			li.querySelector('span.region').innerText =`收货人地址:` + `${address.receiveRegion} ${address.receiveDetail}`;
			// 提示反馈用户
			alert('修改成功');
		}
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	};
})();


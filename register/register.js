(function(){
				
document.querySelector('input.zc').onclick = function() {
	
	var yhm = document.forms['register']['userName'].value;
	// console.log(1);
	var pwd = document.forms['register']['pwd'].value;
	var zcpwd = document.forms['register']['zcpwd'].value;
	
	// 判断注册是否为空
	if(yhm.length === 0 || pwd.length === 0 || zcpwd === 0) {
		alert('手机号码/密码不能为空');
		return;
	}else if(pwd !== zcpwd) {
		alert('密码两次不一样');
		return;
	}else{
		confirm('已注册成功!是否要去登录');
		
		window.location.href = "login.html";
		console.log('测试')
	}
	
};

})();
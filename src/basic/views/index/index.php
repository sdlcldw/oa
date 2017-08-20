<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title></title>
</head>
<body>

</body>
</html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>育才学校办公系统</title>
<link rel="stylesheet" type="text/css" href="assets/css/index.css">
<script type="text/javascript" src="assets/js/jquery.js"></script>
<script type="text/javascript" src="assets/js/index.js"></script>
</head>
<body>

<div class="top">

<img class="logo" src="assets/images/logo.png">
	<ul class="top_rightmenu">

		<a href="<?php echo yii\helpers\Url::to(['index/logout']) ?>" role="button">
		<li class="li1" title="退出系统" onmouseover="menuOver(this);" onmouseout="menuOut(this);"><img src="assets/images/exit.png" hoversrc="assets/images/exit2.png" normalsrc="assets/images/exit.png"  border="0"></li>
		 </a>
		<li class="li2" title="回退" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="execute(this);"><img src="assets/images/return.png" hoversrc="assets/images/return2.png" normalsrc="assets/images/return.png"  border="0"></li>
		<li class="li3" title="门户" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="execute(this);"><img src="assets/images/home.png" hoversrc="assets/images/home2.png" normalsrc="assets/images/home.png"  border="0"></li>
		<li class="li4" title="返回首页" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="execute(this);"><img src="assets/images/main.png" hoversrc="assets/images/main2.png" normalsrc="assets/images/main.png"  border="0"></li>
	</ul>
	<ul class="top_leftmenu">
		<li class="a1" title="学生管理" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="enterPages('xsgl');"><div><img class="top_img1" hoversrc="assets/images/student2.png" normalsrc="assets/images/student.png" src="assets/images/student.png"></div><div>学生管理</div></li>
		<li class="a2" title="资产管理" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="enterPages('zcgl');"><div><img class="top_img2" hoversrc="assets/images/asset2.png" normalsrc="assets/images/asset.png"  src="assets/images/asset.png"></div><div>资产管理</div></li>
		<li class="a3" title="个人办公" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="enterPages('grbg');"><div><img class="top_img3" hoversrc="assets/images/private2.png" normalsrc="assets/images/private.png"  src="assets/images/private.png"></div><div>个人办公</div></li>
		<li class="a4" title="人事管理" onmouseover="menuOver(this);" onmouseout="menuOut(this);" onclick="enterPages('rsgl');"><div><img class="top_img4" hoversrc="assets/images/hr2.png" normalsrc="assets/images/hr.png"  src="assets/images/hr.png"></div><div>人事管理</div></li> 
		
	</ul>
	<div class="dibu"></div>
</div>



<!-- 以下是左侧工具栏 -->
<div class="left">
	<div class="user">
	<a href="#" onclick="userSetup(this,'HtTrace0904', '我的申请', 'desktop');"> <?php echo Yii::$app->session['user']['username']; ?></a>
	</div>
	<div class="menu">
 	<div class="menu2">
<div class="menu-title">
	   	<img class="menu-title-img" src="assets/images/dian_1.png">
	  	 学生管理
	  	</div>
	  <div class="menu_ul">
	  <div class="menu_1 menu_1_1"><span>新生入学</span></div>
	  		<div class="menu_1_2">
			<a href="#" class="out" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">创建新生</a>
			<a href="#" class="out" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">我的招生</a>
			<a href="#" class="out out_last" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">流程管理</a>
			</div>	
	  <div class="menu_1 menu_1_1"><span>学生管理1</span></div>
			<div class="menu_1_2">
			<a href="#" class="out" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">我的招生</a>
			<a href="#" class="out" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">我的招生</a>
			<a href="#" class="out" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">我的招生</a>
			<a href="#" class="out out_last" onclick="actionPage(this,'HtTrace0904', '我的申请', 'desktop');">我的招生</a>
			</div>	  
	  <div class="menu_1"><span>学生管理2</span></div>
	  <div class="menu_1"><span>学生管理3</span></div>
	  <div class="menu_1"><span>学生管理3</span></div>
	  <div class="menu_1"><span>学生管理3</span></div>
	  <div class="menu_1"><span>学生管理3</span></div>
	  </div>
		<!-- 载入左侧菜单位置 -->
</div>
	</div>
	<div class="search">
	search
	</div>
</div>
<div class="right">
<div class="right_title"><img class="title_arrow" src="assets/images/title_arrow.png"><div class="title_txt">我是内容标题</div></div>

<div class="right_content">

<!-- 页面嵌套开始 -->
<iframe class="iframe" src="desktop.php" name="desktop" frameborder="0" scrolling="yes" width="100%"></iframe>
<!-- 页面嵌套结束 -->

</div>

</div>


</body>
</html>
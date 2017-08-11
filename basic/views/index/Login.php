<?php 
use yii\bootstrap\ActiveForm;
use yii\helpers\Html;
?>
<!DOCTYPE html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Content-Style-Type" content="text/css">
		<meta http-equiv="Pragma" content="no-cache">
		<title>育才学校办公系统登录</title>
		<link href="assets/css/login.css" type="text/css" rel="stylesheet">
		<script language="javascript" src="assets/js/jquery.js"></script>
		<script language="javascript" src="assets/js/login.js"></script>
		<script language="javascript" src="assets/js/login_002.js"></script>
	</head>
	<body leftmargin="0" topmargin="0" onload="onLoad();" marginwidth="0" marginheight="0">
		
	<div style="display:none;">
		
	</div>
	<!-- <input id="illegalBrowserFlg" value="0" name="illegalBrowserFlg" type="hidden"> -->
	<!-- <form method="post" name="actForm" action="index.php?controller=index&method=login"> -->
	<?php $form = ActiveForm::begin( 
	[	'fieldConfig' =>[
		'template'=>'{input}{error}',
		],
	]);
	?>
		<div class="">
			<!-- <input id="alertMsg" name="alertMsg" type="hidden"> -->
			<!-- <input id="confirmMsg" name="confirmMsg" type="hidden"> -->
			<table id="loginTable" width="100%" cellspacing="0" cellpadding="0" border="0">
				<tbody><tr id="topTr">
					<td class="blank_td">&nbsp;</td>
					<td class="second_blank_td"><img id="top_logo_img" src="assets/images/logo.png"></td>
					<td id="center_td" style="width: 740px;"></td>
					<td class="second_blank_td">
					</td>
					<td class="blank_td"></td>
				</tr>
				<tr>
					<td colspan="5" class="middleTd" id="middleTd" style="height: 603px;" align="CENTER">
						<table class="main_table" cellspacing="0" cellpadding="0" border="0">
							<tbody><tr>
								<td height="50"></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td width="135" height="40"></td>
								<td colspan="2" align="CENTER"><img id="user_login_img" src="assets/images/user_login.png"></td>
								<td width="135"></td>
							</tr>
							<tr><td height="40"></td><td></td><td></td><td></td></tr><tr>
								<td height="65"></td>
								<td colspan="2" align="CENTER">
									<div class="login_input_content">
										<table width="100%" cellspacing="0" cellpadding="0" border="0" height="Value">
											<tbody><tr>
												<td><span><img class="user_name_img" id="imgSrc_user_name" src="assets/images/user_name.png"></span></td>
												<td><span>
		<?php echo $form->field($model,'username')->textInput(["class"=>"login_input","id"=>"userId","name"=>"username","size"=>"20"])?>
		<!-- <input size="20" class="login_input" id="userId" name="username" type="text"> -->


																</span></td>
											</tr>
										</tbody></table></div></td>
								<td></td>
							</tr>
							<tr>
								<td height="65"></td>
								<td colspan="2" align="CENTER"><div class="login_input_content">
									<table width="100%" cellspacing="0" cellpadding="0" border="0" height="0">
										<tbody><tr>
											<td><img class="user_name_img" id="imgSrc_user_pwd" src="assets/images/user_pwd.png"></td>
		<td>
		<?php echo $form->field($model,'password')->textInput(["class"=>"login_input","id"=>"userPwd","name"=>"password","size"=>"20"])?>
		<!-- <input size="20" class="login_input" id="userPwd" name="password" type="password"> -->
		</td></tr>
		
										
									</tbody></table></div></td>
								<td></td>
							</tr>
							<tr>
								<td height="10"></td>
								<td></td>
								<td align="RIGHT">
									</td>
								<td></td>
							</tr>
							<tr><td height="20"></td><td></td><td></td><td></td></tr><tr>
								<td height="80"></td>
														<td>
		<?php echo $form->field($model,'rememberMe')->checkbox([
			'name' => 'rememberMe',
			'id' => 'remember-me',
			'template' => '{input}<label for="remember-me">记住我</label>',
		]) ?>
		</td>
								<td colspan="2" align="CENTER">
								<?php echo Html::submitButton('登录',["class"=>"login_button","id"=>"login_button_img"]) ?>
									<!-- <img onclick="javascript:document.formname.submit()" class="login_button" id="login_button_img" src="assets/images/login_button.png"> -->
									
								</td>
		
							</tr>

							<tr>
								<td colspan="4" align="CENTER">
									
									<table class="update_table" width="0" cellspacing="0" cellpadding="0" border="0" height="0">
										<tbody><tr>
											<td>&nbsp;</td>
											<td width="30"><img src="assets/images/gear.png"></td>
											<td><a target="_blank" width="50" height="50" href="http://demo.oa8000.com/OAapp/jsp/download.jsp?wosid=KW4YjhcxeM0W2oQraEMUBw">IE环境初始化</a></td>
											<td width="100px">&nbsp;</td>
											<td width="30"><img src="assets/images/app_download.png"></td>
											<td><a onclick="actOpenWindowBtn('down','1000','500');" href="#?wosid=KW4YjhcxeM0W2oQraEMUBw">移动应用下载</a></td>
											<td>&nbsp;</td>
										</tr>
									</tbody></table>
								</td>
							</tr>
							<tr>
								<td height="30">&nbsp;</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody></table>
						<img id="login_main_img" src="assets/images/C.png" style="width: 1440px; height: 603px; position: absolute; top: 80px; left: 0px; z-index: -10;">
					</td>
				</tr>
				<tr id="bottomTr">
					<td class="bottom_blank_td"></td>
					<td colspan="3">
						<table width="100%" cellspacing="0" cellpadding="0" border="0" height="0">
							<tbody><tr>
								<td width="204"><img id="bottom_logo_img" src="assets/images/logo.png"></td>
								<td>
									<div class="copyright">
										<a href="http://www.sdlcycxx.com/" target="_blank" style="text-decoration:none;cursor: pointer;">版权所有  山东省聊城育才学校 办公室</a>
									</div>
									<div class="copyright">
										<span class="login_3_span" onclick="actOpenWindowBtn('version','505','400');">版本号:DLHT-OA9000-3-0-7.5-1-3-8-600[1.3(1.3_2016-09-26)]</span>
									</div>
								</td>
								<td width="204">&nbsp;</td>
							</tr>
						</tbody></table>
					</td>
					<td></td>
				</tr>
			</tbody></table>
		</div>
		<div style="display:none;">
		<!-- 	<input name="functionName" type="hidden">
			<input name="screenWidth" type="hidden">
			<input name="screenHeight" type="hidden">
			<input id="userNameInputId" name="userNameInputId" type="hidden">
			<input id="pasdInputId" name="pasdInputId" type="hidden"><input id="useStyle" value="BLUE" name="12.17" type="text">
			<input id="useLanguage" value="CN" name="12.18" type="text">
			<input id="useStyleType" value="BLUE" name="12.19" type="hidden"> -->
			<a id="version" href="http://demo.oa8000.com/OAapp/WebObjects/OAapp.woa/wo/com.oa8000.mainapp.Main/KW4YjhcxeM0W2oQraEMUBw/0.12.20"></a><a id="down" href="http://demo.oa8000.com/OAapp/WebObjects/OAapp.woa/wo/com.oa8000.mainapp.Main/KW4YjhcxeM0W2oQraEMUBw/0.12.21"></a>
                        
		</div>
<!-- 	<input name="wosid" value="KW4YjhcxeM0W2oQraEMUBw" type="hidden"> -->
	<?php ActiveForm::end(); ?>
	<!-- </form> -->
</body></html>
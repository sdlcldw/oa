<?php 
use yii\bootstrap\ActiveForm;
use yii\helpers\Html;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Content-Style-Type" content="text/css">
		<meta http-equiv="Pragma" content="no-cache">
		<title>育才学校办公系统</title>
		<link href="assets/css/bootstrap.min.css" type="text/css" rel="stylesheet">
        <link href="assets/css/seekpassword.css" type="text/css" rel="stylesheet">
        <script language="javascript" src="assets/js/jquery.js"></script>
       
	</head>
	<body>
	

<div class="container">
<div class="col-md-3"></div>
<div class="panel panel-primary col-md-6" id="logindev">
<?php $form = ActiveForm::begin(
                [
                    'fieldConfig' =>[
                    'template'=>'{input}{error}',
                    ],
                    'validateOnType' => true,
                    'validationDelay' => '1000',
                ]);
                ?>
    <div class="panel-body">
        <div class="row">
            <div class="col-md-12">
                <h2 class="text-center">设置新密码</h2>
            </div>
           
        </div>
        <div class="row">
            <div class="col-md-12">
           
            <div style="display: none;"><?php echo $form->field($model,'userid')->textInput(["name"=>"userid"]);?>	</div>	
                    <div class="form-group">
                        <label class="col-md-3 control-label">
                            新密码：
                        </label>
                        <div class="col-md-8" > 							
                                <?php echo $form->field($model,'pass')->passwordInput(["class"=>"pass form-control","id"=>"pass","name"=>"pass","size"=>"20","placeholder"=>"新密码"]);?>
                         </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">
                            确认密码：
                        </label>
                            <div class="col-md-8" > 
                                <?php echo $form->field($model,'repass')->passwordInput(["class"=>"pass form-control","id"=>"repass","name"=>"repass","size"=>"20","placeholder"=>"确认密码"]);?>
                            </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">
                        <?php echo Html::submitButton('修改',["class"=>"btn btn-success btn-lg col-md-5"]) ?>
                             <?php ActiveForm::end(); ?>
                        </div>
                    </div>
                  
                </form>
            </div>
        </div>
    </div>
</div>
</div> 
<script>
$(function() { 
            $('#pass,#repass').focus(function() {
                $("p").remove();
                $(".field-pass").removeClass("has-error");
                $(".field-repass").removeClass("has-error");
            });
        }) 
</script>

        
</body>
</html>
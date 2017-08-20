<?php
namespace app\controllers;
use yii\rest\ActiveController;   

class CesiController extends ActiveController
{
	public $modelClass = 'models/User';
	public function actionCesi()
	{
		echo "测试数据";
		public $modelClass = 'app\models\User';

	}
public function actionNihao()
	{
		echo "nihaoma测试数据";
	}
	
}
?>
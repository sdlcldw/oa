<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;

class Student_basic extends ActiveRecord
{
	public $rememberMe = 0;
	
	public static function tbaleName()
	{
		return "{{%Student_basic}}";
	}

	public function getUser(){
			return $this->hasOne(User::className(),['Id'=>'user_id'])->select(['user.Id' , 'user.username']);
	}

	public function inserts($data){
		$this->bjlx = $data['bjlx'];
		$this->name = $data['xm'];
		$this->sfzh = $data['sfzh'];
		$this->xb = $data['xb'];
		$this->mz = $data['mz'];
		$this->jg = $data['jg'];
		$this->sg = $data['sg'];
		$this->jtzz = $data['jtzz'];
		$this->xjh = $data['xjh'];
		$this->tz = $data['tz'];
		$this->szds = $data['szds'];
		$this->szdx = $data['szdx'];
		$this->szdc = $data['szdc'];
		$this->byxx = $data['byxx'];
		$this->sfzx = $data['sfzx'];
		$this->hkxz = $data['hkxz'];
		$this->fqxm = $data['fqxm'];
		$this->fqzzmm = $data['fqzzmm'];
		$this->fqgzdw = $data['fqgzdw'];
		$this->fqsjh = $data['fqsjh'];
		$this->mqxm = $data['mqxm'];
		$this->mqzzmm = $data['mqzzmm'];
		$this->mqgzdw = $data['mqgzdw'];
		$this->mqsjh = $data['mqsjh'];
		$this->bmsj = date("Y-m-d");		
		$this->user_id = Yii::$app->session['__id'];
		$this->zt = 1;
		$this->save();
		return true;
	}
	public function xxshok($id){
		
		$model = $this->findOne($id['Id']);
		$model->zt = 2;
		$model->shr = Yii::$app->session['user']['username'];
		$model->save();
	}
	public function gzjfok($id){
		$model = $this->find()->where(['xjh' => $id['xjh']])->one();
		$model->zt = 3;
		$model->save();
	}
	public function deleteone($id){
		$model = $this->findOne($id['Id']);
		$model->delete(); 
	}	
	public function gzjf(){
		$model = $this->findOne();
		
	}

}?>
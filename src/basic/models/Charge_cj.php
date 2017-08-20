<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;

class Charge_cj extends ActiveRecord
{
	
	public static function tbaleName()
	{
		return "{{%Charge_cj}}";
	}

	public function inserts($data){
		$this->student_basic_xjh = $data['xjh'];
		$this->xf = $data['xf'];
		$this->sf = $data['sf'];
		$this->zsf = $data['zsf'];
		$this->dsf = $data['dsf'];
		$this->jfxd = $data['jfxd'];
		$this->jfrq = date("Y-m-d");
		$this->bz = $data['bz'];
		$this->save();
	}
	public function updata($data){
		$model = $this->find()->where(['student_basic_xjh' => $data['xjh']])->one();
		$model->xf = $data['xf'];
		$model->sf = $data['sf'];
		$model->zsf = $data['zsf'];
		$model->dsf = $data['dsf'];
		$model->jfxd = $data['jfxd'];
		$model->jfrq = date("Y-m-d");
		$model->bz = $data['bz'];
		$model->save();
	}
}?>
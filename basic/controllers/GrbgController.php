<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use app\controllers\CommonController;


class GrbgController extends CommonController
{

	public $enableCsrfValidation = false;// ->覆盖父类的属性
	

	public function actionGzcx_htgz(){
			$session = Yii::$app->session;
			$username = $session['user']['username'];
		  	$sql = "select * from gzcx_xd where username = '".$username."' order by 2 desc";
  			$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
			  if($dataReader){
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
			  }
			  return "2";
	}
	public function actionGzcx_tggz(){
			$session = Yii::$app->session;
			$username = $session['user']['username'];
		  	$sql = "select * from gzcx_xd_2 where username = '".$username."' order by 2 desc";
  			$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
			  if($dataReader){
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
			  }
			  return "2";
	}
	public function actionWdzs(){
		$username = Yii::$app->session['user']['username'];
		$sql = "select a.username,b.*,c.xjh as fxjh,c.sfzh as fsfzh,c.name as fname,c.zkzh as fzkzh,c.cfmm as fcfmm,c.yw as fyw,c.sx as fsx,c.yy as fyy,c.zz as fzz,c.ls as fls,c.wl as fwl,c.hx as fhx,c.dl as fdl,c.sw as fsw,c.xxjs as fxxjs,c.tncs as ftncs,c.sy as fsy,c.suy as fsuy,c.tc as ftc,c.tsks as ftsks,c.qf as fqf,c.zy as fzy from user as a left join student_basic as b on a.Id=b.user_id left join xsgl_zkfs as c on b.xjh=c.xjh WHERE a.username='".$username."';";
		$student_basic = Yii::$app->db->createCommand($sql)->queryAll();
		foreach ($student_basic as $row=>$v){
			if($student_basic[$row]['zt']==1){
				$student_basic[$row]['zt']= "未审核";
			}elseif($student_basic[$row]['zt']==2){
				$student_basic[$row]['zt']= "已审核";
			}elseif($student_basic[$row]['zt']==3){
				$student_basic[$row]['zt']= "已缴费";
			}
			if($student_basic[$row]['bjlx']==1){
				$student_basic[$row]['bjlx']= "普通高中";
			}elseif($student_basic[$row]['bjlx']==2){
				$student_basic[$row]['bjlx']= "春季实验班";
			}
			$student_basic[$row]['zrjs'] = $username; 
			} 
		Yii::$app->response->format=Response::FORMAT_JSON;
		return $student_basic;
}
public function actionBrsy_get(){
	$um =Yii::$app->session['user']['username'];
	$sql = "SELECT * FROM zcgl_mx where zrr='".$um."';";
	$connection=Yii::$app->db;
   $command=$connection->createCommand($sql);
   $dataReader=$command->query();
   $dataReader=$dataReader->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
	return $dataReader;
}

public function actionGrzl_update(){
	if (Yii::$app->request->isPost){ 
		$ps = Yii::$app->request->post();
		$session = Yii::$app->session;
		$id = $session['__id'];
		$sql = "UPDATE user SET sfzhm='".$ps['sfzhm']."',email='".$ps['email']."',sex='".$ps['sex']."',phone='".$ps['phone']."',phone_d='".$ps['phone_d']."',phone_bg='".$ps['phone_bg']."',xk='".$ps['xk']."' WHERE Id='".$id."';";
		$ifok = Yii::$app->db->createCommand($sql)->execute();
   Yii::$app->response->format=Response::FORMAT_JSON;
	return $ifok;
	}
	return false;
}

public function actionGrzl_jc(){
	$session = Yii::$app->session;
	$id = $session['__id'];
	$sql="select * from user where Id='".$id."';";
	$data = Yii::$app->db->createCommand($sql)->queryOne();
	if($data){
		if($data['email'] && $data['sex'] && $data['phone'] && $data['phone_d'] && $data['phone_bg'] && $data['xk']){
			return '2';
		}else{
			return 'false';
		}
	}
	return 'false';
}
public function actionKqjl_get(){
	$um =Yii::$app->session['user']['username'];
	$sql = "SELECT * FROM zhxz_kqb_mx where xm='".$um."';";
	$connection=Yii::$app->db;
   $command=$connection->createCommand($sql);
   $dataReader=$command->query();
   $dataReader=$dataReader->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
	return $dataReader;
}
public function actionBmkqjl_get(){
	$id =Yii::$app->session['__id'];
	$control=Yii::$app->runAction('xtsz/get_bm_byuser',['userid'=> '33']);
	if(!$control){
		return '没有数据';
	  }
	 $sql = "SELECT * FROM zhxz_kqb_mx where bm in (";
	  foreach ($control as $row) {
		$sql .="'".$row['name']."',";
	}
	$sql = rtrim($sql,',');
	$sql .=");";
	$dataReader=Yii::$app->db->createCommand($sql)->query()->readAll();
	Yii::$app->response->format=Response::FORMAT_JSON;
	 return $dataReader;
}
	














}?>
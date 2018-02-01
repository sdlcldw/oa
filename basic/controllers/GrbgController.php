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
	$control=Yii::$app->runAction('xtsz/get_bm_byuser',['userid'=> $id]);
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
	
public function actionKtjl_get_kc(){
	$id =Yii::$app->session['__id'];
	$sql="select Id,name from xsgl_xbkc_mx where zt = 1 and user_id = :id";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$id])->query()->readAll();
	if(empty($data)){
		return '2';
	}
	Yii::$app->response->format=Response::FORMAT_JSON;	
	return $data;
}

public function actionKtjl_get_kcmx(){
	if (Yii::$app->request->isPost){ 
		$ps = Yii::$app->request->post();
	$sql="select a.Id,a.name,b.username,b.Id as user_id from xsgl_xbkc_mx a left join user b on a.user_id = b.Id where a.Id=:id";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$ps['id']])->queryOne();
	
	$sqlt="select b.Id as xsid,b.name,b.xb,c.name as bj_name,d.name as njb_name from xsgl_xbkc_xk a left join xsgl_jcxx_xs_jbxx b on a.xs_id = b.Id left join xsgl_jcxx_bj c on b.bj_id = c.Id left join xsgl_jcxx_njb d on c.njb_id = d.Id where a.kc_id = :id";
	$datat=Yii::$app->db->createCommand($sqlt,[':id'=>$ps['id']])->query()->readAll();
	Yii::$app->response->format=Response::FORMAT_JSON;	
	$rdata['kc']=$data;
	$rdata['xs']=$datat;
	return $rdata;
}
}

public function actionKtjl_add(){
	Yii::$app->response->format=Response::FORMAT_JSON;	
	if (Yii::$app->request->isPost){
		$ps = Yii::$app->request->post();
		$sj = gmdate('Y-m-d',strtotime($ps['kcjl']['sj']) + 8*3600); //将标准时间转换为东八区时间
		$sql = "INSERT xsgl_xbkc_ktjl (kc_id,sj,kq_yd,kq_sd,kq_qj,kq_cd,kq_kc,xjpj,ktqk,user_id) VALUES (:kc_id,:sj,:kq_yd,:kq_sd,:kq_qj,:kq_cd,:kq_kc,:xjpj,:ktqk,:user_id)";
        $ifok = Yii::$app->db->createCommand($sql,[':kc_id'=>$ps['kcdata']['Id'],':sj'=>$sj,':kq_yd'=>$ps['kqtj']['yd'],':kq_sd'=>$ps['kqtj']['sd'],':kq_qj'=>$ps['kqtj']['qj'],':kq_cd'=>$ps['kqtj']['cd'],':kq_kc'=>$ps['kqtj']['kc'],':xjpj'=>$ps['xj'],':ktqk'=>$ps['kcjl']['ktqk'],':user_id'=>$ps['kcdata']['user_id']])->execute();
		if(!$ifok){
			return false;
		}
		$sql = "select last_insert_id() as id;";
		$data=Yii::$app->db->createCommand($sql)->queryOne();
		$id = $data['id'];
		foreach ($ps['xsjl']['xsid'] as $k => $v) { 
			$xsjl[] = [$id,$v,$ps['xsjl']['kq'][$k],$ps['xsjl']['bz'][$k]]; 
		}
		$ifok = Yii::$app->db->createCommand()->batchInsert('xsgl_xbkc_ktjl_xskq',['ktjl_id','xs_id','kqzt','bz'],$xsjl)->execute();
		return $ifok;
	}
}

public function actionKtjl_ck_get(){
	Yii::$app->response->format=Response::FORMAT_JSON;	
	$id = Yii::$app->session['__id'];
	$sql="select a.Id,a.kc_id,a.sj,a.kq_yd,a.kq_sd,a.kq_qj,a.kq_cd,a.kq_kc,a.xjpj,b.name,c.username from xsgl_xbkc_ktjl a left join xsgl_xbkc_mx b on a.kc_id = b.Id left join user c on a.user_id = c.Id where a.user_id = :id ORDER BY a.Id desc;";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$id])->query()->readAll();
	if(empty($data)){
		return '2';
	}
	return $data;
}
public function actionKtjl_del(){
	Yii::$app->response->format=Response::FORMAT_JSON;	
	if (Yii::$app->request->isPost){
		$id =Yii::$app->session['__id'];
	$ps = Yii::$app->request->post();
	$sql="DELETE FROM xsgl_xbkc_ktjl WHERE Id =:id and user_id = :userid";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$ps['id'],':userid'=>$id])->execute();
	if(!$data){
		return false;
	}
	$sql="DELETE FROM xsgl_xbkc_ktjl_xskq WHERE ktjl_id =:id";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$ps['id']])->execute();
	return $data;
}
}
public function actionKtjl_ck_getkc(){
	Yii::$app->response->format=Response::FORMAT_JSON;	
	if (Yii::$app->request->isPost){
	$ps = Yii::$app->request->post();
	$sql="select a.*,b.name,c.username from xsgl_xbkc_ktjl a left join xsgl_xbkc_mx b on a.kc_id = b.Id left join user c on a.user_id = c.Id where a.Id = :id;";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$ps['id']])->queryOne();
	if(empty($data)){
		return '2';
	}
	$sqlt="select a.kqzt,a.bz,b.name,b.xb,c.name as bj_name,d.name as njb_name from xsgl_xbkc_ktjl_xskq a left join xsgl_jcxx_xs_jbxx b on a.xs_id = b.Id left join xsgl_jcxx_bj c on b.bj_id = c.Id left join xsgl_jcxx_njb d on c.njb_id = d.Id where a.ktjl_id = :id;";
	$datat=Yii::$app->db->createCommand($sqlt,[':id'=>$ps['id']])->query()->readAll();
	if(empty($datat)){
		return '2';
	}
	$datas['kc']=$data;
	$datas['kq']=$datat;
	return $datas;
 }
}

//结课评价
public function actionJkpj_get_kc(){
	$id =Yii::$app->session['__id'];
	$sql="select Id,name from xsgl_xbkc_mx where zt = 3 and user_id = :id";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$id])->query()->readAll();
	if(empty($data)){
		return '2';
	}
	Yii::$app->response->format=Response::FORMAT_JSON;	
	return $data;
}

public function actionJkpj_get_kcmx(){
	if (Yii::$app->request->isPost){ 
		$ps = Yii::$app->request->post();
	$sql="select a.Id,a.name,a.rs,a.zt,b.username,b.Id as user_id from xsgl_xbkc_mx a left join user b on a.user_id = b.Id where a.Id=:id";
	$data=Yii::$app->db->createCommand($sql,[':id'=>$ps['id']])->queryOne();//获取课程基本信息

	$sqlt="SELECT count(*) as zs,SUM(CASE xjpj WHEN 5 THEN 1 ELSE 0 END) 'wu',SUM(CASE xjpj WHEN 4 THEN 1 ELSE 0 END) 'si', SUM(CASE xjpj WHEN 3 THEN 1 ELSE 0 END) 'san',SUM(CASE xjpj WHEN 2 THEN 1 ELSE 0 END) 'er',SUM(CASE xjpj WHEN 1 THEN 1 ELSE 0 END) 'yi' FROM xsgl_xbkc_ktjl WHERE kc_id = :id";
	$datat=Yii::$app->db->createCommand($sqlt,[':id'=>$ps['id']])->queryOne();//统计星级评价次数
	
	$sqls="select SUM(CASE kqzt WHEN 1 THEN 1 ELSE 0 END) 'zc',
	SUM(CASE kqzt WHEN 2 THEN 1 ELSE 0 END) 'qj',
	SUM(CASE kqzt WHEN 3 THEN 1 ELSE 0 END) 'cd',
	SUM(CASE kqzt WHEN 4 THEN 1 ELSE 0 END) 'kc'
	 from xsgl_xbkc_ktjl_xskq where ktjl_id in (select Id from xsgl_xbkc_ktjl where kc_id = :id)";
	$datas=Yii::$app->db->createCommand($sqls,[':id'=>$ps['id']])->query()->readAll();
	Yii::$app->response->format=Response::FORMAT_JSON;	
	$rdata['kc']=$data;
	$rdata['xs']=$datat;
	return $rdata;
}
}





}?>
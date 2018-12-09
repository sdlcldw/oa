<?php
namespace app\controllers;

use yii\web\Controller;
use Yii;
use yii\web\Response;
use app\controllers\CommonwxController;
use yii\db\Expression;
use yii\db\Query;


class WxController extends CommonwxController{
	public $enableCsrfValidation = false;// ->覆盖父类的属性

	public function actionCs()
	{
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "select openid from wx_session where skey=:sid limit 1";
		$ifcz = Yii::$app->db->createCommand($sql, [':sid' => $sid])->queryOne();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $ifcz;
	}

	public function actionLogin(){
		$return = '';
		$return .= $this->actionQl_session();
		
		//判断是否post请求并获取数据
		if (Yii::$app->request->isPost) {
			$post = Yii::$app->request->post();
			$code = $post['code'];
			$username = $post['username'];
			$password = $post['password'];
			$rawDatay = $post['rawData'];
			$signature = $post['signature'];
		} else {
			return false;
		}

		$datat = $this->actionWx_api($code);

		$session_key = $datat['session_key'];
		$openid = $datat['openid'];
		$rawData = json_decode($rawDatay, true);
		
		//验证用户名和密码
		$sql = "select Id from user where username=:username and password=:password";
		$userid = Yii::$app->db->createCommand($sql, [':username' => $username, ':password' => sha1($password)])->queryOne();
		if (!$userid) {
			return '用户名或密码错误';
		}

		//验证微信用户数据是否合法，并入库
		if (sha1($rawDatay . $session_key) == $signature) {
			$sqla = "select openid from wx_userinfo where openid=:openid limit 1";
			$ifcz = Yii::$app->db->createCommand($sqla, [':openid' => $openid])->queryOne();
			if ($ifcz) {
				$return .= 'userinfo：更新';
				$sqlb = "UPDATE wx_userinfo SET nickname=:nickname,gender=:gender,country=:country,province=:province,city=:city,avatarUrl=:avatarUrl,language=:language where openid=:openid";
				$result = Yii::$app->db->createCommand($sqlb, [':openid' => $openid, ':nickname' => $rawData['nickName'], ':gender' => $rawData['gender'], ':country' => $rawData['country'], ':province' => $rawData['province'], ':city' => $rawData['city'], ':avatarUrl' => $rawData['avatarUrl'], ':language' => $rawData['language']])->execute();
			} else {
				$return .= 'userinfo：插入';

				$sqlb = "INSERT wx_userinfo (openid,nickname,gender,country,province,city,avatarUrl,language) VALUES (:openid,:nickname,:gender,:country,:province,:city,:avatarUrl,:language)";
				$result = Yii::$app->db->createCommand($sqlb, [':openid' => $openid, ':nickname' => $rawData['nickName'], ':gender' => $rawData['gender'], ':country' => $rawData['country'], ':province' => $rawData['province'], ':city' => $rawData['city'], ':avatarUrl' => $rawData['avatarUrl'], ':language' => $rawData['language']])->execute();
			}
		} else {
			return 'rawdata 数据非法' . $session_key;
		}

		//保存session信息
		$sessionid = sha1($session_key . mt_rand());
		$sql = "INSERT wx_session (skey,openid,session_key,expire) VALUES (:skey,:openid,:session_key,:expire)";
		$result = Yii::$app->db->createCommand($sql, [':skey' => $sessionid, ':openid' => $openid, ':session_key' => $session_key, ':expire' => time() + 2592000])->execute();
		if (!$result) {
			return '保存session失败';
		}

		//用户名关联微信openid
		$sql = "UPDATE user SET wx_openid=:wx_openid where Id =:id";
		$result = Yii::$app->db->createCommand($sql, [':wx_openid' => $openid, ':id' => (int)$userid['Id']])->execute();

		//返回执行结果
		Yii::$app->response->format = Response::FORMAT_JSON;
		$datafh = ['sessionid' => $sessionid, 'yx' => $return, 'ptzh' => $username];
		return $datafh;
	}

	/* 微信登录 */
	public function actionWx_login(){
		$return = '';
		$return .= $this->actionQl_session();
			
			//判断是否post请求并获取数据
		if (Yii::$app->request->isPost) {
			$post = Yii::$app->request->post();
			$code = $post['code'];
		} else {
			return false;
		}

		$datat = $this->actionWx_api($code);
		$session_key = $datat['session_key'];
		$openid = $datat['openid'];

		$sql = "select username from user where wx_openid = :openid limit 1";
		$ifcz = Yii::$app->db->createCommand($sql, [':openid' => $openid])->queryOne();

		if ($ifcz) {
			//保存session信息
			$sessionid = sha1($session_key . mt_rand());
			$sql = "INSERT wx_session (skey,openid,session_key,expire) VALUES (:skey,:openid,:session_key,:expire)";
			$result = Yii::$app->db->createCommand($sql, [':skey' => $sessionid, ':openid' => $openid, ':session_key' => $session_key, ':expire' => time() + 2592000])->execute();
			if (!$result) {
				return '保存session失败';
			}

		//返回执行结果
			Yii::$app->response->format = Response::FORMAT_JSON;
			$datafh = ['sessionid' => $sessionid, 'log' => $return, 'ptzh' => $ifcz['username']];
			return $datafh;
		} else {
			return 2;
		}
	}

	
/* 清理过期session */
	public function actionQl_session(){
	//五分之一的概率清除过期session
		if (rand(1, 5) == 1) {
			$sql = "DELETE FROM wx_session WHERE expire < :sj";
			$result = Yii::$app->db->createCommand($sql, [':sj' => time()])->execute();
			return '清除过期session：清除;';
		} else {
			return '清除过期session：未清除;';
		};
	}

/* 获取session_key 和 openid */
	public function actionWx_api($code){
			//设置小程序id和秘钥
		$appid = 'wx339f1245bd4ac4c8';
		$secret = 'ae213baee054da4db986a1b86b914c5e';

		//调用微信api 获取session_key和openid
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_TIMEOUT, 500);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
		// curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
		curl_setopt($curl, CURLOPT_URL, 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $secret . '&js_code=' . $code . '&grant_type=authorization_code');
		$data = curl_exec($curl);
		$datat = json_decode($data, true);
		curl_close($curl);
		return $datat;
	}

	public function actionExit(){
		// 1.在http头部获取session_id		
		$sid = Yii::$app->request->headers->get('sessionid');	
		// 2.清除数据库中符合该session_id下openid的 所有session数据			
		$sqlw = "select openid from wx_session where skey=:sid limit 1";
		$ifcz = Yii::$app->db->createCommand($sqlw, [':sid' => $sid])->queryOne();
		if (!$ifcz) {
			return false;
		}
		$sqlt = "DELETE FROM wx_session WHERE openid = :openid";
		$results = Yii::$app->db->createCommand($sqlt, [':openid' => $ifcz['openid']])->execute();
		if (!$results) {
			return false;
		}
		// 3.清除数据库中user的该openid。
		$sql = "UPDATE user SET wx_openid='' where wx_openid =:openid";
		$result = Yii::$app->db->createCommand($sql, [':openid' => $ifcz['openid']])->execute();
		return $result;
	}
	

	/* 获取本人合同工资日期列表 */
	public function actionGet_htgz_rqlb(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT a.riqi FROM gzcx_xd as a left join user as b on a.username = b.username left join wx_session as c on b.wx_openid = c.openid where c.skey = :skey ORDER BY a.riqi DESC;";
		$riqis = Yii::$app->db->createCommand($sql, [':skey' => $sid])->query()->readAll();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $riqis;
	}

	/* 获取本人某月合同工资详单 */
	public function actionHtgz_cx(){
		if (Yii::$app->request->isPost) {
			$post = Yii::$app->request->post();
			$sid = Yii::$app->request->headers->get('sessionid');
			$sql = "SELECT a.* FROM gzcx_xd a WHERE a.riqi = :riqi AND a.username = (SELECT b.username FROM user b left join wx_session c on b.wx_openid = c.openid WHERE c.skey = :skey)";
			$data = Yii::$app->db->createCommand($sql, [':skey' => $sid, ':riqi' => $post['riqi']])->queryOne();
			Yii::$app->response->format = Response::FORMAT_JSON;
			return $data;
		}
	}


/* 获取本人套改工资日期列表 */
	public function actionGet_tggz_rqlb(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT a.riqi FROM gzcx_xd_2 as a left join user as b on a.username = b.username left join wx_session as c on b.wx_openid = c.openid where c.skey = :skey ORDER BY a.riqi DESC;";
		$riqis = Yii::$app->db->createCommand($sql, [':skey' => $sid])->query()->readAll();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $riqis;
	}

/* 获取本人某月套改工资详单 */
	public function actionTggz_cx(){
		if (Yii::$app->request->isPost) {
			$post = Yii::$app->request->post();
			$sid = Yii::$app->request->headers->get('sessionid');
			$sql = "SELECT a.* FROM gzcx_xd_2 a WHERE a.riqi = :riqi AND a.username = (SELECT b.username FROM user b left join wx_session c on b.wx_openid = c.openid WHERE c.skey = :skey)";
			$data = Yii::$app->db->createCommand($sql, [':skey' => $sid, ':riqi' => $post['riqi']])->queryOne();
			Yii::$app->response->format = Response::FORMAT_JSON;
			return $data;
		}
	}
	public function actionGet_txl(){
// 查询部门信息，并统计人数
		$sqlw = "SELECT a.bm_id id,b.name,count(a.bm_id)as count FROM txl_bm_user a left join txl_bm b on a.bm_id = b.Id group by a.bm_id;";
		$bms = Yii::$app->db->createCommand($sqlw)->query()->readAll();
	// 查询通讯人员信息
		$sqlt = "SELECT b.Id id, a.bm_id groupid,b.username,b.phone,b.phone_d,b.phone_bg,b.sex,b.email FROM txl_bm_user a left join user b on b.Id = a.user_id;";
		$rys = Yii::$app->db->createCommand($sqlt)->query()->readAll();
		$data = ['bms' => $bms, 'rys' => $rys];
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data;
	}


	public function actionGet_userphone(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.phone FROM wx_session a left join user b on a.openid = b.wx_openid where a.skey = :skey;";
		$data = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data['phone'];
	}
	public function actionGet_userphone_d(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.phone_d FROM wx_session a left join user b on a.openid = b.wx_openid where a.skey = :skey;";
		$data = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data['phone_d'];
	}
	public function actionGet_userphone_bg(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.phone_bg FROM wx_session a left join user b on a.openid = b.wx_openid where a.skey = :skey;";
		$data = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data['phone_bg'];
	}
	public function actionGet_useremail(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.email FROM wx_session a left join user b on a.openid = b.wx_openid where a.skey = :skey;";
		$data = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();
		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data['email'];
	}
	public function actionUp_userinfo(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$data= Yii::$app->request->get("data");
		$xm = Yii::$app->request->get("xm");
		$sql = "UPDATE user SET ".$xm." = :dataw where wx_openid = (select openid from wx_session where skey = :skey)";
		$rs = Yii::$app->db->createCommand($sql, [':dataw' => $data,':skey' => $sid])->execute();
		Yii::$app->response->format = Response::FORMAT_JSON;				
		return $rs;
	}

	//订餐功能接口
	public function actionGet_dc(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.Id FROM user b left join wx_session c on b.wx_openid = c.openid WHERE c.skey = :skey";
		$userid = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();

		$sqla = "SELECT count(*) as lsdc FROM wx_dc_dcjl WHERE sfyx = 1"; //总历史订餐人数
		$a_data = Yii::$app->db->createCommand($sqla)->queryOne();

		$sqlb = "SELECT count(*) as jrdc FROM wx_dc_dcjl WHERE TO_DAYS(TimeStamp) = TO_DAYS(NOW()) and sfyx = 1"; //今日订餐人数
		$b_data = Yii::$app->db->createCommand($sqlb)->queryOne();

		$sqlc = "SELECT sfyx FROM wx_dc_dcjl WHERE TO_DAYS(TimeStamp) = TO_DAYS(NOW()) and user_id = :user_id"; //本人订餐状态
		$c_data = Yii::$app->db->createCommand($sqlc,[':user_id' => $userid['Id']])->queryOne();

		$sqld = "SELECT count(*) as mylsdc FROM wx_dc_dcjl WHERE sfyx = 1 and user_id = :user_id"; //本人历史订餐次数
		$d_data = Yii::$app->db->createCommand($sqld,[':user_id' => $userid['Id']])->queryOne();
		
		$sqle = "SELECT * FROM wx_dc_jrcd"; //获取今日菜单
		$e_data = Yii::$app->db->createCommand($sqle)->queryOne();
 
		$sqlf = "SELECT * FROM wx_dc_sj"; //获取订餐时间
		$f_data = Yii::$app->db->createCommand($sqlf)->queryOne();

		$data['lsdcrs'] = $a_data['lsdc']; //历史订餐人数
		$data['jrdcrs'] = $b_data['jrdc'];
		$data['mylsdc'] = $d_data['mylsdc'];
		$data['jrcd'] = $e_data;
		$data['sj'] = $f_data;
		$data['mydczt'] = $c_data['sfyx'];
		

		$checkDayStr = date('Y-m-d ',time());
		$timeBegin1 = strtotime($checkDayStr."06:00".":00");
		$timeEnd1 = strtotime($checkDayStr."10:00".":00");
		$time1 = strtotime($checkDayStr."00:00".":00");
		$time2 = strtotime($checkDayStr."23:59".":59");
		$curr_time = time();
		if($curr_time <= $timeBegin1 and $curr_time >= $time1){
			$data['dcsj'] = 2;//未开始
		}else if($curr_time >= $timeEnd1 and $curr_time <= $time2){
			$data['dcsj'] = 3;//已结束
		}else{
			$data['dcsj'] = 4;//正常时间
		}

		$data['djs'] = $timeEnd1 - time();

		Yii::$app->response->format = Response::FORMAT_JSON;
		return $data;
	}

	public function actionAdd_dc(){
			$sid = Yii::$app->request->headers->get('sessionid');
			$sql = "SELECT b.Id FROM user b left join wx_session c on b.wx_openid = c.openid WHERE c.skey = :skey";
			$userid = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();

			$sqlc = "SELECT sfyx FROM wx_dc_dcjl WHERE TO_DAYS(TimeStamp) = TO_DAYS(NOW()) and user_id = :user_id"; //本人订餐状态
			$c_data = Yii::$app->db->createCommand($sqlc,[':user_id' => $userid['Id']])->queryOne();

			if($c_data['sfyx'] == 1){
				return 2;
			}else if($c_data['sfyx'] == 2){
				return 3;
			}
			$sqlb = "INSERT wx_dc_dcjl (user_id) VALUES (:userid)";
			$data = Yii::$app->db->createCommand($sqlb, [':userid' => $userid['Id']])->execute();
			Yii::$app->response->format = Response::FORMAT_JSON;
			return $data;
	}

	public function actionDele_dc(){
		$sid = Yii::$app->request->headers->get('sessionid');
		$sql = "SELECT b.Id FROM user b left join wx_session c on b.wx_openid = c.openid WHERE c.skey = :skey";
		$userid = Yii::$app->db->createCommand($sql, [':skey' => $sid])->queryOne();
		$sqlt = "UPDATE wx_dc_dcjl SET sfyx = 2 WHERE TO_DAYS(TimeStamp) = TO_DAYS(NOW()) and user_id = :user_id";
		$results = Yii::$app->db->createCommand($sqlt, [':user_id' => $userid['Id']])->execute();
	}


} ?>

<?php
namespace app\controllers;
use yii\web\Controller;
use app\models\User;
use app\models\Student_basic;
use app\models\Charge_gz;
use app\models\Charge_cj;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;
use app\controllers\CommonController;
use yii\db\Query;
use yii\db\Expression;



class IndexController extends CommonController
{
	public $enableCsrfValidation = false;// ->覆盖父类的属性

	public function actionCss(){
		ini_set("display_errors","On");
		if(!isset(Yii::$app->session['user']['isLogin'])){
			return "1";
		}
		return "2";
		error_reporting(E_ALL);
	}	
	public function actionCst(){
		$control=Yii::$app->runAction('xtsz/get_bm_byuser',['userid'=>'33']);
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

	public function actionCs(){
		$code = Yii::$app->request->get("code");
		$appid='wx339f1245bd4ac4c8';
		$secret = 'ae213baee054da4db986a1b86b914c5e';
	     $curl = curl_init();
	     //设置抓取的url
	     curl_setopt($curl, CURLOPT_URL, 'https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$secret.'&js_code='.$code.'&grant_type=authorization_code');
	        $data = curl_exec($curl);
	        //关闭URL请求
	        curl_close($curl);
			//显示获得的数据
			Yii::$app->response->format=Response::FORMAT_JSON;			
	        return $data;
		}

		




	public function actionIndex(){
				$this->layout = false;
				if(Yii::$app->session['user']['isLogin']===1){
				   return $this->render("index");
				   Yii::$app->end();
				   }
				echo "请先登录！";
	}

	public function actionIslogin(){
		if(Yii::$app->session['user']['isLogin']===1){
		return "1";
		   }
		return "2";
	}

	public function actionLogin(){
				$model = new User;
				if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					if ($ssv = $model->login($post)){
						return $ssv;
						Yii::$app->end();
					}
				}		
	}
	//找回密码
	public function actionSeekpassword(){
		if (Yii::$app->request->isPost){ 
			$post = Yii::$app->request->post();
			$sql="select * from user where username='".$post['username']."' and email='".$post['email']."'";
			$command = Yii::$app->db->createCommand($sql)->queryOne();
			if(!$command){
				return "2"; //用户名和绑定的邮箱不匹配
			}else{
					$time = time();
					$token = md5(md5($command['Id']).base64_decode('666888').md5($time));
					$url = Yii::$app->urlManager->createAbsoluteUrl(['index/seekpasswordxg','timestamp'=>$time,'id'=>$command['Id'],'token'=>$token]);
					$body="尊敬的".$post['username']."您好：\r\n您的找回密码链接如下：\r\n".$url."\r\n该链接5分钟内有效，请勿传递给别人！\r\n该邮件为系统自动发送，请勿回复！";
					$data = $this->email($post['email'],'聊城育才学校在线办公平台——找回密码',$body);
					Yii::$app->response->format=Response::FORMAT_JSON;
				   return $data;
				}
		}
		return false;
	}	
	public function actionSeekpasswordxg(){
		$this->layout = false;
		$time= Yii::$app->request->get("timestamp");
		$userid= Yii::$app->request->get("id");
		$token= Yii::$app->request->get("token");
		$mytoken =  md5(md5($userid).base64_decode('666888').md5($time));
		if($token != $mytoken){
			return '非法访问！';
		}
		if(time() - $time > 300){
			return '该链接已经失效！';
		}
		$model = new User;
		if (Yii::$app->request->isPost){
			$post = Yii::$app->request->post();
			if($model->changepass($post)){			
				return '修改密码成功！点击链接重新登录：<a href="http://oa.sdlcycxx.com/#/login">http://oa.sdlcycxx.com/#/login</a>';
			}
		}
		$model->userid = $userid;
		return $this->render("mailchangepass",['model' => $model]);
	}		


//阿里云虚拟主机适用的email发送方法
	public function email($to, $subject = 'No subject', $body){
		$loc_host = "oa.sdlcycxx.com";            //发信计算机名，可随意
        $smtp_acc = "oa_lcycxx@163.com"; //Smtp认证的用户名，类似fuweng@im286.com，或者fuweng
        $smtp_pass="dawang1990";          //Smtp认证的密码，一般等同pop3密码
        $smtp_host="smtp.163.com";    //SMTP服务器地址，类似 smtp.tom.com
        $from="oa_lcycxx@163.com";       //发信人Email地址，你的发信信箱地址
//     $headers = "Content-Type: text/plain; charset=\"gb2312\"\r\nContent-Transfer-Encoding: base64";
    $headers = "Content-Type: text/plain; charset=\"utf8\"\r\nContent-Transfer-Encoding: base64";
    $lb="\r\n";                    //linebreak
        $hdr = explode($lb,$headers);     //解析后的hdr
	if($body) {$bdy = preg_replace("/^\./","..",explode($lb,$body));}//解析后的Body
        $smtp = array(
                //1、EHLO，期待返回220或者250
                array("EHLO ".$loc_host.$lb,"220,250","HELO error: "),
                //2、发送Auth Login，期待返回334
                array("AUTH LOGIN".$lb,"334","AUTH error:"),
                //3、发送经过Base64编码的用户名，期待返回334
                array(base64_encode($smtp_acc).$lb,"334","AUTHENTIFICATION error : "),
                //4、发送经过Base64编码的密码，期待返回235
                array(base64_encode($smtp_pass).$lb,"235","AUTHENTIFICATION error : "));
        //5、发送Mail From，期待返回250
        $smtp[] = array("MAIL FROM: <".$from.">".$lb,"250","MAIL FROM error: ");
        //6、发送Rcpt To。期待返回250
        $smtp[] = array("RCPT TO: <".$to.">".$lb,"250","RCPT TO error: ");
        //7、发送DATA，期待返回354
        $smtp[] = array("DATA".$lb,"354","DATA error: ");
        //8.0、发送From
        $smtp[] = array("From: ".$from.$lb,"","");
        //8.2、发送To
        $smtp[] = array("To: ".$to.$lb,"","");
        //8.1、发送标题
        $smtp[] = array("Subject: ".$subject.$lb,"","");
        //8.3、发送其他Header内容
        foreach($hdr as $h) {$smtp[] = array($h.$lb,"","");}
        //8.4、发送一个空行，结束Header发送
        $smtp[] = array($lb,"","");
        //8.5、发送信件主体
		if($bdy) {foreach($bdy as $b) {$smtp[] = array(base64_encode($b.$lb).$lb,"","");}}
        //9、发送“.”表示信件结束，期待返回250
        $smtp[] = array(".".$lb,"250","DATA(end)error: ");
        //10、发送Quit，退出，期待返回221
		$smtp[] = array("QUIT".$lb,"221","QUIT error: ");
        //打开smtp服务器端口
        $fp = @fsockopen($smtp_host, 25);
        if (!$fp) echo "Error: Cannot conect to ".$smtp_host."";
        while($result = @fgets($fp, 1024)){if(substr($result,3,1) == " ") { break; }}
        $result_str="";
        //发送smtp数组中的命令/数据
        foreach($smtp as $req){
                //发送信息
                @fputs($fp, $req[0]);
                //如果需要接收服务器返回信息，则
                if($req[1]){
                        //接收信息
                        while($result = @fgets($fp, 1024)){
                                if(substr($result,3,1) == " ") { break; }
                        };
                        if (!strstr($req[1],substr($result,0,3))){
                                $result_str.=$req[2].$result."";
                        }else{
                                $result_str='success';
                        }
                }
        }
        //关闭连接
        @fclose($fp);
        return $result_str;
	}





	
	public function actionUp_time(){
		$model = new User;
		$zxrs = $model->up_time();
		return $zxrs;
	}
	public function actionXgmm(){
		$model = new User;
		if (Yii::$app->request->isPost){
			$post = Yii::$app->request->post();
			if ($ssv = $model->xgmm($post)){
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $ssv;
				Yii::$app->end();
			}

		}
	}
	public function actionLogout(){
				   Yii::$app->session->removeAll();
				   Yii::$app->session->destroy();
				   if(!isset(Yii::$app->session['user']['isLogin'])){
				   	return "1";
				   }
				   return "2";
	}


	public function actionHome_ssb(){
		Yii::$app->response->format=Response::FORMAT_JSON;		
		if (Yii::$app->request->isPost) {
		$post = Yii::$app->request->post(); 
		$userid = Yii::$app->session['__id'];
		$sql = "select max(tjsj) as tjsj from home_ssb where xs_id = :id;";
		$data=Yii::$app->db->createCommand($sql,[':id'=>$userid])->queryOne();
		if(time()-strtotime($data['tjsj']) < 24*3600){
			$rt['zt'] = '2';
			$rt['sj'] = $data['tjsj'];			
			return $rt;
		}
		$sql = "INSERT home_ssb (nr,xs_id) VALUES (:nr,:id)";
		$data=Yii::$app->db->createCommand($sql,['nr'=>$post['nr'],':id'=>$userid])->execute();
		return $data;
		}
	}


	public function actionXxsh_wsh(){
		if (!yii::$app->user->can('xxsh')){
				 return "没有权限的非法访问！";
				}
			if(Yii::$app->session['user']['isLogin']===1){
				$sql = "select a.*,b.username,c.xjh as fxjh,c.sfzh as fsfzh,c.name as fname,c.zkzh as fzkzh,c.cfmm as fcfmm,c.yw as fyw,c.sx as fsx,c.yy as fyy,c.zz as fzz,c.ls as fls,c.wl as fwl,c.hx as fhx,c.dl as fdl,c.sw as fsw,c.xxjs as fxxjs,c.tncs as ftncs,c.sy as fsy,c.suy as fsuy,c.tc as ftc,c.tsks as ftsks,c.qf as fqf,c.zy as fzy from student_basic as a left join user as b on a.user_id=b.Id left join xsgl_zkfs as c on a.xjh=c.xjh WHERE a.zt=1;";
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
					} 
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $student_basic;
	}else{
		return "非法访问！";
	}
	}
		public function actionXxsh_ysh(){
			if (!yii::$app->user->can('xxsh')){
				 return "没有权限的非法访问！";
				}
				    // 获取一个客户信息
			if(Yii::$app->session['user']['isLogin']===1){
				$sql = "select a.*,b.username,c.xjh as fxjh,c.sfzh as fsfzh,c.name as fname,c.zkzh as fzkzh,c.cfmm as fcfmm,c.yw as fyw,c.sx as fsx,c.yy as fyy,c.zz as fzz,c.ls as fls,c.wl as fwl,c.hx as fhx,c.dl as fdl,c.sw as fsw,c.xxjs as fxxjs,c.tncs as ftncs,c.sy as fsy,c.suy as fsuy,c.tc as ftc,c.tsks as ftsks,c.qf as fqf,c.zy as fzy from student_basic as a left join user as b on a.user_id=b.Id left join xsgl_zkfs as c on a.xjh=c.xjh WHERE a.zt=2;";
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
					} 
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $student_basic;
	}else{
		return "非法访问！";
	}
	}
		public function actionXxsh_qb(){
			if (!yii::$app->user->can('xxsh')){
				 return "没有权限的非法访问！";
				}
				    // 获取一个客户信息
			if(Yii::$app->session['user']['isLogin']===1){
				$sql = "select a.*,b.username,c.xjh as fxjh,c.sfzh as fsfzh,c.name as fname,c.zkzh as fzkzh,c.cfmm as fcfmm,c.yw as fyw,c.sx as fsx,c.yy as fyy,c.zz as fzz,c.ls as fls,c.wl as fwl,c.hx as fhx,c.dl as fdl,c.sw as fsw,c.xxjs as fxxjs,c.tncs as ftncs,c.sy as fsy,c.suy as fsuy,c.tc as ftc,c.tsks as ftsks,c.qf as fqf,c.zy as fzy from student_basic as a left join user as b on a.user_id=b.Id left join xsgl_zkfs as c on a.xjh=c.xjh;";
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
					} 
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $student_basic;
	}else{
		return "非法访问！";
	}
	}
	public function actionXxsh_cz(){
			if (!yii::$app->user->can('xxsh')){
				 return "没有权限的非法访问！";
				}
			if(Yii::$app->session['user']['isLogin']===1){
				if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				$sql = "select student_basic.*,user.username from student_basic left join user on student_basic.user_id=user.Id WHERE student_basic.name='".$post['name']."';";
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
					}
					if(!$student_basic){
						return 2;
					}
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $student_basic;
			}
	}else{
		return "非法访问！";
	}
	}
	public function actionXxshok(){
		if (!yii::$app->user->can('xxsh')){
				 return "没有权限的非法访问！";
				}
					$model = new Student_basic;
					if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					$model->xxshok($post);
					}
	}
	//学生管理-招生总览 方法
	public function actionZszl(){
		if (!yii::$app->user->can('zszl')){
				 return "没有权限的非法访问！";
				}
				$sql = "select count(a.xjh) zs,sum(case WHEN b.qf>=600 THEN 1 else 0 end) aa, sum(case WHEN b.qf>=550 THEN 1 else 0 end) a, sum(case WHEN b.qf>=500 THEN 1 else 0 end) b, sum(case WHEN b.qf>=450 THEN 1 else 0 end) c, sum(case WHEN b.qf>=400 THEN 1 else 0 end) d, sum(case WHEN b.qf>=350 THEN 1 else 0 end) e, sum(case WHEN b.qf<=349 THEN 1 else 0 end) f, max(b.qf) max,min(b.qf) min,cast(avg(b.qf*1.0) as decimal(18,2)) avg from student_basic a left join xsgl_zkfs b on a.xjh = b.xjh WHERE a.zt >=3 and a.bjlx = 1;";
				$data['ptgz'] = Yii::$app->db->createCommand($sql)->queryAll();
				$sql = "select count(a.xjh) zs,sum(case WHEN b.qf>=600 THEN 1 else 0 end) aa, sum(case WHEN b.qf>=550 THEN 1 else 0 end) a, sum(case WHEN b.qf>=500 THEN 1 else 0 end) b, sum(case WHEN b.qf>=450 THEN 1 else 0 end) c, sum(case WHEN b.qf>=400 THEN 1 else 0 end) d, sum(case WHEN b.qf>=350 THEN 1 else 0 end) e, sum(case WHEN b.qf<=349 THEN 1 else 0 end) f, max(b.qf) max,min(b.qf) min,cast(avg(b.qf*1.0) as decimal(18,2)) avg from student_basic a left join xsgl_zkfs b on a.xjh = b.xjh WHERE a.zt >=3 and a.bjlx = 2;";
				$data['cjsyb'] = Yii::$app->db->createCommand($sql)->queryAll();
				$sql = "select * from xsgl_zkyzy";
				$data['yzy'] = Yii::$app->db->createCommand($sql)->queryAll();
				$sql = "select * from xsgl_zkezy";
				$data['ezy'] = Yii::$app->db->createCommand($sql)->queryAll();
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $data;
	}
	public function actionDeleteone(){
					$model = new Student_basic;
					if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					$model->deleteone($post);
					}
	}
	public function actionGzjf_wjf(){
		if (!yii::$app->user->can('gzjf')){
				 return "没有权限的非法访问！";
				}
					// $get = Yii::$app->request->get();//获取页码
					// $ts=10; //显示条数
					// $ys= ($get['p']-1)*$ts; //计算后的起始条数
					// 获取总页数
					// $zs = Yii::$app->db->createCommand('SELECT COUNT(*) FROM student_basic where zt=2')->queryScalar();
					//到数据库取数据
					// $sql = "select * from charge limit ".$ys.",".$ts;
					$sql = "select a.*,b.username from student_basic a left join user b on a.user_id = b.Id where a.zt=2 and a.bjlx =1";
					$connection=Yii::$app->db;
					$command=$connection->createCommand($sql);
					$dataReader=$command->query();
					$dataReader=$dataReader->readAll();
					foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
					// $zs = count($dataReader);//结果总条数
					// $zys = ceil($zs/$ts);//计算总页数
					// $dataReader['0']['zys']= $zys;
					Yii::$app->response->format=Response::FORMAT_JSON;
					return $dataReader;
					
  	}
  		public function actionGzjf_yjf(){
  			if (!yii::$app->user->can('gzjf')){
				 return "没有权限的非法访问！";
				}
					// $get = Yii::$app->request->get();//获取页码
					// $ts=10; //显示条数
					// $ys= ($get['p']-1)*$ts; //计算后的起始条数
					// 获取总页数
					// $zs = Yii::$app->db->createCommand('SELECT COUNT(*) FROM charge')->queryScalar();
					// $zys = ceil($zs/$ts);//计算总页数
					//到数据库取数据
					// $sql = "select * from charge limit ".$ys.",".$ts;
					$sql = "select a.*,b.* from charge_gz a left join student_basic b on a.student_basic_xjh = b.xjh WHERE b.zt >=3 and b.bjlx =1;";

					$connection=Yii::$app->db;
					$command=$connection->createCommand($sql);
					$dataReader=$command->query();
					$dataReader=$dataReader->readAll();
					foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
					// $dataReader['0']['zys']= $zys;
					Yii::$app->response->format=Response::FORMAT_JSON;
					return $dataReader;
  	}
  		public function actionGzjf_namecz(){
  			if (!yii::$app->user->can('gzjf')){
				 return "没有权限的非法访问！";
				}
  			$get = Yii::$app->request->get();
  			$name = $get['name'];
  			// $sql = "select * from student_basic where name='".$name."' and  zt=2 or zt=3";
  			$sql = "Select a.*,b.*,c.username from student_basic a Left JOIN charge_gz b on a.xjh = b.student_basic_xjh left join user c on a.user_id = c.Id where a.name = '".$name."' and a.zt >=2 and a.bjlx=1;";
  			$connection=Yii::$app->db;
			$command=$connection->createCommand($sql);
			$dataReader=$command->query();
			$dataReader=$dataReader->readAll();
			foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
			Yii::$app->response->format=Response::FORMAT_JSON;
			return $dataReader;
  		}
  		public function actionGzjf_jf(){
  			if (!yii::$app->user->can('gzjf')){
				 return "没有权限的非法访问！";
				}
  					$model = new charge_gz;
  					$models = new Student_basic;
					if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					$sql="select * from charge_gz WHERE student_basic_xjh = ".$post['xjh'].";";
					$sd = Yii::$app->db->createCommand($sql)->queryAll();
					if($sd){
						$model->updata($post);
						return 2;
					}else{
					$model->inserts($post);
					$models->gzjfok($post);
					return 1;
					}
				}
  		}
  		public function actionCjjf_wjf(){
  			if (!yii::$app->user->can('cjjf')){
				 return "没有权限的非法访问！";
				}
					// $get = Yii::$app->request->get();//获取页码
					// $ts=10; //显示条数
					// $ys= ($get['p']-1)*$ts; //计算后的起始条数
					// 获取总页数
					// $zs = Yii::$app->db->createCommand('SELECT COUNT(*) FROM student_basic where zt=2')->queryScalar();
					//到数据库取数据
					// $sql = "select * from charge limit ".$ys.",".$ts;
					$sql = "select a.*,b.username from student_basic a left join user b on a.user_id = b.Id where a.zt=2 and a.bjlx =2";
					$connection=Yii::$app->db;
					$command=$connection->createCommand($sql);
					$dataReader=$command->query();
					$dataReader=$dataReader->readAll();
					foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
					// $zs = count($dataReader);//结果总条数
					// $zys = ceil($zs/$ts);//计算总页数
					// $dataReader['0']['zys']= $zys;
					Yii::$app->response->format=Response::FORMAT_JSON;
					return $dataReader;
					
  	}
  		public function actionCjjf_yjf(){
  			if (!yii::$app->user->can('cjjf')){
				 return "没有权限的非法访问！";
				}
					// $get = Yii::$app->request->get();//获取页码
					// $ts=10; //显示条数
					// $ys= ($get['p']-1)*$ts; //计算后的起始条数
					// 获取总页数
					// $zs = Yii::$app->db->createCommand('SELECT COUNT(*) FROM charge')->queryScalar();
					// $zys = ceil($zs/$ts);//计算总页数
					//到数据库取数据
					// $sql = "select * from charge limit ".$ys.",".$ts;
					$sql = "select a.*,b.* from charge_cj a left join student_basic b on a.student_basic_xjh = b.xjh WHERE b.zt >=3 and b.bjlx = 2;";

					$connection=Yii::$app->db;
					$command=$connection->createCommand($sql);
					$dataReader=$command->query();
					$dataReader=$dataReader->readAll();
					foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
					// $dataReader['0']['zys']= $zys;
					Yii::$app->response->format=Response::FORMAT_JSON;
					return $dataReader;
  	}
  		public function actionCjjf_namecz(){
  			if (!yii::$app->user->can('cjjf')){
				 return "没有权限的非法访问！";
				}
  			$get = Yii::$app->request->get();
  			$name = $get['name'];
  			// $sql = "select * from student_basic where name='".$name."' and  zt=2 or zt=3";
  			$sql = "Select a.*,b.*,c.username from student_basic a Left JOIN charge_cj b on a.xjh = b.student_basic_xjh left join user c on a.user_id = c.Id where a.name = '".$name."' and a.zt >=2 and a.bjlx=2;";
  			$connection=Yii::$app->db;
			$command=$connection->createCommand($sql);
			$dataReader=$command->query();
			$dataReader=$dataReader->readAll();
			foreach ($dataReader as $row=>$v){
					if($dataReader[$row]['bjlx']==1){
						$dataReader[$row]['bjlx']= "普通高中";
					}elseif($dataReader[$row]['bjlx']==2){
						$dataReader[$row]['bjlx']= "春季实验班";
					}
					} 
			Yii::$app->response->format=Response::FORMAT_JSON;
			return $dataReader;
  		}
  		public function actionCjjf_jf(){
  			if (!yii::$app->user->can('cjjf')){
				 return "没有权限的非法访问！";
				}
  					$model = new Charge_cj;
  					$models = new Student_basic;
					if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					$sql="select * from charge_cj WHERE student_basic_xjh = ".$post['xjh'].";";
					$sd = Yii::$app->db->createCommand($sql)->queryAll();
					if($sd){
						$model->updata($post);
						return 2;
					}else{
					$model->inserts($post);
					$models->gzjfok($post);
					return 1;
					}
					}
  		}
  		public function actionJfzl(){
  			if (!yii::$app->user->can('jfzl')){
				 return "没有权限的非法访问！";
				}
  					$sql = "select count(a.xjh) zs, sum(b.xf) xf,sum(b.sf) sf,sum(b.zsf) zsf,sum(b.dsf) dsf from student_basic a left join charge_gz b on a.xjh = b.student_basic_xjh WHERE a.zt >=3 and a.bjlx = 1;";
  					$data['ptgz'] = Yii::$app->db->createCommand($sql)->queryAll();
  					$sqlq = "select count(a.xjh) zs, sum(b.xf) xf,sum(b.sf) sf,sum(b.zsf) zsf,sum(b.dsf) dsf from student_basic a left join charge_gz b on a.xjh = b.student_basic_xjh WHERE a.zt >=3 and a.bjlx = 2;";
  					$data['cjsyb'] = Yii::$app->db->createCommand($sqlq)->queryAll();
  					Yii::$app->response->format=Response::FORMAT_JSON;
					return $data;
  		}
  		public function actionNanss(){
  			$sql = "Select * from dorm_boy";
  			$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			foreach($dataReader as $k => $val){
  				$tmp[$val['fjh']] = array( 'fjh'=>$val['fjh'],'cw_1'=>$val['cw_1'],'cw_2'=>$val['cw_2'],'cw_3'=>$val['cw_3'],'cw_4'=>$val['cw_4'],'cw_5'=>$val['cw_5'],'cw_6'=>$val['cw_6'],'bj'=>$val['bj'], );
  			}

  			/*计算五楼空铺*/
  			$wl = 0;
  			for ($i=501; $i < 530; $i++) { 
  				$array = array_count_values($tmp[$i])['0'];
  				$wl = $wl+$array;
  			}
  			$tmp['wl'] = $wl;
  			/*计算四楼空铺*/
  			$sil = 0;
  			for ($i=401; $i < 430; $i++) { 
  				$array = array_count_values($tmp[$i])['0'];
  				$sil = $sil+$array;
  			}
  			$tmp['sil'] = $sil;
  			/*计算三楼空铺*/
  			$sl = 0;
  			for ($i=301; $i < 330; $i++) { 
  				$array = array_count_values($tmp[$i])['0'];
  				$sl = $sl+$array;
  			}
  			$tmp['sl'] = $sl;
  			/*计算二楼空铺*/
  			$el = 0;
  			for ($i=201; $i < 230; $i++) { 
  				$array = array_count_values($tmp[$i])['0'];
  				$el = $el+$array;
  			}
  			$tmp['el'] = $el;
  			/*计算一楼空铺*/
  			$yl = 0;
  			for ($i=101; $i < 130; $i++) { 
  				$array = array_count_values($tmp[$i])['0'];
  				$yl = $yl+$array;
  			}
  			$tmp['yl'] = $yl;
      
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $tmp;
  		}
  		public function actionGetuserinfo(){
  			$session = Yii::$app->session;
			$id = $session['__id'];
  			$sql = "Select * from user where id=".$id;
  			$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
			  $userinfo=$dataReader->readAll();
			  
			  	/*获取当前用户权限列表*/
			// $sql = "Select b.child from (select * from `auth_assignment` where user_id='".$id."') a Left JOIN auth_item_child b on a.item_name = b.parent";
			// $connection=Yii::$app->db;
			// $command=$connection->createCommand($sql);
			// $dataReader=$command->query();
			// $dataReader=$dataReader->readAll();

			// $qx="";
			// foreach($dataReader as $item){
			// 	foreach ($item as $ite) {
			// 		$qx=$qx.$ite.';';
			// 	}
			// }


			$qx = "";
			$items = Yii::$app->authManager->getPermissionsByUser($id);
			foreach($items as $item){
				$qx =$qx.$item->name.';';
			}


			$arr = array('qx'=>$qx,'userinfo'=>$userinfo[0]);

  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $arr;
  		}
  		public function actionSetuserinfo(){
  			$model = new User;
  			if (Yii::$app->request->isPost){
  				$post = Yii::$app->request->post();
		         
  				if ($ssv = $model->Setuserinfo($post)){
  					return $ssv;
  					Yii::$app->end();
  				}
  			}		
  		}
  		// /*获取并保存lcedu的cookie，并获取验证码进行保存*/↓↓↓
  		public function actionLcedu_yzm(){
					$userid = Yii::$app->session['__id'];
					/*-----保存COOKIE-----*/
					$url = 'http://wsbm.lcedu.cn/'; //url地址
					$ch = curl_init($url); //初始化
					curl_setopt($ch,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出
					curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流
					$content = curl_exec($ch); //执行curl并赋值给$content
					$httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE); //获取状态码
					curl_close($ch); //关闭curl
					if ($httpCode != 200) {
						return "2";
					}
					preg_match('/Set-Cookie:(.*);/iU',$content,$str); //正则匹配
					$cookie = $str[1]; //获得COOKIE（SESSIONID）
					
					Yii::$app->session['lcedu'] = $cookie; //将获取的cookie存入session
					 /*
					*@通过curl方式获取指定的图片到本地
					*@ 完整的图片地址
					*@ 要存储的文件名
					*/
					$url = "http://wsbm.lcedu.cn/image.jsp";
						$filename = "lcedu/".$userid.".jpg";
						
					 //去除URL连接上面可能的引号
					 //$url = preg_replace( '/(?:^['"]+|['"/]+$)/', '', $url );
					 $hander = curl_init();
					 $fp = fopen($filename,'wb');
					 curl_setopt($hander,CURLOPT_URL,$url);
					 curl_setopt($hander,CURLOPT_FILE,$fp);
					 curl_setopt($hander,CURLOPT_COOKIE,$cookie);
					 curl_setopt($hander,CURLOPT_HEADER,0);
					 // curl_setopt($hander,CURLOPT_FOLLOWLOCATION,1);
					 // curl_setopt($hander, CURLOPT_RETURNTRANSFER, true);
					 // curl_setopt($hander, CURLOPT_COOKIEJAR, $cookie_jar);
					 //curl_setopt($hander,CURLOPT_RETURNTRANSFER,false);//以数据流的方式返回数据,当为false是直接显示出来
					 curl_setopt($hander,CURLOPT_TIMEOUT,60);
					 curl_exec($hander);
					 $httpCode = curl_getinfo($hander,CURLINFO_HTTP_CODE); //获取状态码
					 curl_close($hander);
					 fclose($fp);
					if($httpCode != 200){ //如果状态码不为200返回false
							return "2";
						}
					 return "1";
  			}
		/*向lcdeu发送用户名 密码 验证码 进行查分*/
		public function actionLcedu_cf(){
						if (Yii::$app->request->isPost){
						$post = Yii::$app->request->post();
						$yhzh = $post['yhzh'];
						$cfmm = $post['yhmm'];
						$yhmm = md5($post['yhmm']);
						$yzm = $post['yzm'];
						$cookie = Yii::$app->session['lcedu'];//在session中获取最新cookie值
						$url = 'http://wsbm.lcedu.cn/login_liaocheng.do'; //url地址
						$post = array ("yhzh" => $yhzh,"yhmm" => $yhmm,"yzm" => $yzm); //POST数据
						$ch = curl_init(); //初始化
						curl_setopt($ch,CURLOPT_URL,$url);
						// curl_setopt($ch,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出
						curl_setopt($ch,CURLOPT_COOKIE,$cookie);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流
						curl_setopt($ch, CURLOPT_POST, 1);
						curl_setopt($ch,CURLOPT_POSTFIELDS,$post); //发送POST数据
						 // curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
						  curl_setopt($ch,CURLOPT_TIMEOUT,60);
						$content = curl_exec($ch); //执行curl并赋值给$content
						$httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE); //获取状态码
						curl_close($ch); //关闭curl
						if($httpCode != 200){ //如果状态码不为200返回false
							return "2";
						}
						$name = "";
						// 如果学生为初次登录进入提示修改密码界面则执行该if语句
						if(strstr( $content, '初次登录系统')){
							$name = strstr( $content, '姓名');
							$name = strstr( $name, '身份证号' , true);
							$name = strstr( $name, '<td>');
							$name = strstr( $name, '</td>' , true);
						$name = substr($name,4);
						// 如果学生不为初次登录进入分数界面则进入该elseif语句
						}elseif(strstr( $content, '姓名')){
							 $name = strstr( $content, '姓名');
							 $name = strstr( $name, '<table', true);
							 $name = strstr( $name, '</div>', true);
							 $name = substr($name,14);
					}

					}

						$urlb = 'http://wsbm.lcedu.cn/cjcx.do'; //url地址
						$char = curl_init(); //初始化
						curl_setopt($char,CURLOPT_URL,$urlb);
						// curl_setopt($ch,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出
						curl_setopt($char,CURLOPT_COOKIE,$cookie);
						curl_setopt($char,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流
						curl_setopt($char,CURLOPT_POSTFIELDS,$post); //发送POST数据
						// curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
						curl_setopt($char,CURLOPT_TIMEOUT,60);
						$content = curl_exec($char); //执行curl并赋值给$content
						$httpCode = curl_getinfo($char,CURLINFO_HTTP_CODE); //获取状态码
						curl_close($char); //关闭curl
						if($httpCode != 200){ //如果状态码不为200返回false
							return "2";
						}
						//如果lcedu系统提示重新登录则执行该if语句
						if(strstr( $content, '请重新登录')){
							 $fanhui['html'] = '请重新登录';
							 Yii::$app->response->format=Response::FORMAT_JSON;
							 return $fanhui;
						}

$content = strstr( $content, '<body>');//截取body后字符。
$content = strstr( $content, '</body>', TRUE)."</body>";//截取/body前字符。
// return $content;
preg_match_all("/CD\">(.*?)<\/font>/",$content,$zjh); //将准考证和身份证号取出
preg_match_all("/CD'>(.*?)<\/td>/",$content,$result);//将各科成绩取出
// Yii::$app->response->format=Response::FORMAT_JSON;
//  return $result;
if(count($result[1])==15){
					// $scope.fenshu['name'] = data.name; //姓名
					if(count($zjh[1])==2){
                    $zk['zkzh'] = $zjh[1][0]; //准考证号
                    $zk['sfzh'] = $zjh[1][1]; //身份证号
                	}
                	$zk['name'] = $name;//学生姓名
                    $zk['xjh'] = $post['yhzh']; //学籍号
                    $zk['cfmm'] = $cfmm; //查分密码
                    $zk['yw'] =$result[1][0]; //语文
                    $zk['sx'] =$result[1][1]; //数学
                    $zk['yy'] =$result[1][2]; //英语
                    $zk['zz'] =$result[1][3]; //政治
                    $zk['ls'] = $result[1][4]; //历史
                    $zk['wl'] = $result[1][5]; //物理
                    $zk['hx'] = $result[1][6]; //化学
                    $zk['dl'] = $result[1][7]; //地理
                    $zk['sw'] = $result[1][8]; //生物
                    $zk['xxjs'] = $result[1][9]; //信息技术
                    $zk['tncs'] = $result[1][10]; //体验测试
                    $zk['sy'] = $result[1][11]; //实验
                    $zk['suy'] = $result[1][12]; //素养
                    $zk['tc'] = $result[1][13]; //特长加分
                    $zk['tsks'] = '无'; //特殊考生
                    $zk['qf'] = $result[1][14]; //全分
}
if(count($result[1])==16){
					// $scope.fenshu['name'] = data.name; //姓名
					if(count($zjh[1])==2){
                    $zk['zkzh'] = $zjh[1][0]; //准考证号
                    $zk['sfzh'] = $zjh[1][1]; //身份证号
                	}
                	$zk['name'] = $name;//学生姓名
                    $zk['xjh'] = $post['yhzh']; //学籍号
                    $zk['cfmm'] = $cfmm; //查分密码
                    $zk['yw'] =$result[1][0]; //语文
                    $zk['sx'] =$result[1][1]; //数学
                    $zk['yy'] =$result[1][2]; //英语
                    $zk['zz'] =$result[1][3]; //政治
                    $zk['ls'] = $result[1][4]; //历史
                    $zk['wl'] = $result[1][5]; //物理
                    $zk['hx'] = $result[1][6]; //化学
                    $zk['dl'] = $result[1][7]; //地理
                    $zk['sw'] = $result[1][8]; //生物
                    $zk['xxjs'] = $result[1][9]; //信息技术
                    $zk['tncs'] = $result[1][10]; //体验测试
                    $zk['sy'] = $result[1][11]; //实验
                    $zk['suy'] = $result[1][12]; //素养
                    $zk['tc'] = $result[1][13]; //特长加分
                    $zk['tsks'] = $result[1][14]; //特殊考生
                    $zk['qf'] = $result[1][15]; //全分
}

$sql = "select xjh from xsgl_zkyzy where xjh = '".$zk['xjh']."' limit 1";
$sqle = "select xjh from xsgl_zkezy where xjh = '".$zk['xjh']."' limit 1";
if(Yii::$app->db->createCommand($sql)->execute()){
$zk['zy'] = 1;//报一志愿
}elseif (Yii::$app->db->createCommand($sqle)->execute()) {
	$zk['zy'] = 2;//报二志愿
}else{
	$zk['zy'] = 0;//未报志愿
}
$sql = "select xjh from xsgl_zkfs where xjh = '".$zk['xjh']."' limit 1";
if(!Yii::$app->db->createCommand($sql)->execute()){
$sql = "insert into xsgl_zkfs values ('".$zk['xjh']."','".$zk['sfzh']."','".$zk['name']."','".$zk['zkzh']."','".$zk['cfmm']."','".$zk['yw']."','".$zk['sx']."','".$zk['yy']."','".$zk['zz']."','".$zk['ls']."','".$zk['wl']."','".$zk['hx']."','".$zk['dl']."','".$zk['sw']."','".$zk['xxjs']."','".$zk['tncs']."','".$zk['sy']."','".$zk['suy']."','".$zk['tc']."','".$zk['tsks']."','".$zk['qf']."','".$zk['zy']."');";
Yii::$app->db->createCommand($sql)->execute();
}
						$fanhui['zy'] = $zk['zy'];//报几志愿
						$fanhui['sfzh'] = $zk['sfzh'];//将身份证号返回
						$fanhui['xjh'] = $zk['xjh'];//将学籍号返回
						$fanhui['name'] = $name;//将学生姓名返回浏览器
						$fanhui['html'] = $content;//将body部分返回浏览器
						Yii::$app->response->format=Response::FORMAT_JSON;
						return $fanhui;
}
		// 查完分数 点击填写详细信息按钮 执行 验证分数方法
		public function actionYzfs(){
				$gzx=500; //高中班录取分数线
				$cjx=480; //春季班录取分数线
				$yzy=30;//一志愿加分
				$ezy=20;//二志愿加分
				if (Yii::$app->request->isPost){
				$post = Yii::$app->request->post();
				$sql = "select qf,zy from xsgl_zkfs where xjh = '".$post['xjh']."' limit 1;";
				$jg = Yii::$app->db->createCommand($sql)->queryAll();
				$qf = $jg[0]['qf']; //全分
				$zy = $jg[0]['zy']; //几志愿
				if($zy==1){$yxf=$qf+$yzy;}elseif($zy==2){$yxf=$qf+$ezy;}else{$yxf=$qf;}
				// return $zy;
				if($yxf >= $gzx){
					return 1; //分数高于高中录取分数线
				}
				if($yxf < $gzx && $yxf >= $cjx ){
					return 2; //分数低于高中线高于春季线
				}
				if($yxf < $cjx){
					return 3; //分数低于春季线
				}
				}
		}
		//填写完信息 点击提交执行以下方法
public function actionCjxs(){
				$gzx=500; //高中班录取分数线
				$cjx=480; //春季班录取分数线
				$yzy=30;//一志愿加分
				$ezy=20;//二志愿加分
					$model = new Student_basic;
					if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					$sql = "select qf,zy from xsgl_zkfs where xjh = '".$post['xjh']."' limit 1;";
						$jg = Yii::$app->db->createCommand($sql)->queryAll();
						$qf = $jg[0]['qf']; //全分
						$zy = $jg[0]['zy']; //几志愿
						if($zy==1){$yxf=$qf+$yzy;}elseif($zy==2){$yxf=$qf+$ezy;}else{$yxf=$qf;}
					if($post['bjlx'] == 1){
						if($yxf < $gzx){
							return 2;
						}
					}else{
						if($yxf < $cjx){
							return 3;
						}
					}
					$fh = $model->inserts($post);
					return $fh;
					}
	}
	public function actionAdd_todo(){
        if (Yii::$app->request->isPost){
			$post = Yii::$app->request->post();
			$session = Yii::$app->session;
			
            $sql = "insert into todo_list (userid,text,isChecked) values (".$session['__id'].",'".$post['text']."',null);";
            
                $ifok = Yii::$app->db->createCommand($sql)->execute();
            Yii::$app->response->format=Response::FORMAT_JSON;
            if($ifok){
				return $this->actionGet_todo();
			}
            }
		}
		public function actionGet_todo(){
			$session = Yii::$app->session;			
            $sql = "SELECT * FROM todo_list where userid = ".$session['__id'];
            $connection=Yii::$app->db;
           $command=$connection->createCommand($sql);
           $dataReader=$command->query();
           $dataReader=$dataReader->readAll();
           Yii::$app->response->format=Response::FORMAT_JSON;
            return $dataReader;
        }
		public function actionDelete_todo(){
			if (Yii::$app->request->isPost){
				$post = Yii::$app->request->post();
				$sql = "DELETE FROM todo_list WHERE Id=".$post['id'];
				$connection=Yii::$app->db;
				$ifok = Yii::$app->db->createCommand($sql)->execute();
				if($ifok){
					return $this->actionGet_todo();
				}			
				}
			}
			public function actionUpdata_todo(){
				if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
					if($post['isc']){
$sql = "UPDATE todo_list SET isChecked = null where Id =".$post['id'];
					}else{
$sql = "UPDATE todo_list SET isChecked = 1 where Id =".$post['id'];
					}					
					$connection=Yii::$app->db;
					$ifok = Yii::$app->db->createCommand($sql)->execute();
					if($ifok){
						return $this->actionGet_todo();
					}			
					}
				}

}?>


<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\web\Response; 

class User extends ActiveRecord{
	public $rememberMe = 0;
	public $userid;
	public $pass;
	public $repass;

	public static function tbaleName(){
			return "{{%user}}";
	}

	public function getStudent_basic(){
			$student_basic = $this->hasMany(Student_basic::className(),['user_id'=>'Id'])->asArray()->all();
			return $student_basic;
	}


	public function rules(){
			return [
			 ['username', 'required','on'=>['login']],
			 ['password', 'required','on'=>['login']],
			 ['pass', 'required','message'=>'密码不能为空','on'=>['changepass']],
			 ['repass', 'required','message'=>'确认密码不能为空','on'=>['changepass']],
			 ['repass', 'compare','compareAttribute'=>'pass','message'=>'两次密码输入不一致','on'=>['changepass']],
 			];
	}


	public function login($data){
		$this->scenario = 'login';		
			if ($this->load($data,"") && $this->validate()){
			 	// $lifetime = $this->rememberMe ? 24*3600 : 0;
			 	// $this->load($data,"");
			 	$passw = $this->password;
			 	$data = self::find()->where('username= :user and password=:pass',[":user"=>$this->username,":pass"=>sha1($this->password)])->one();
			 	// var_dump($data['attributes']['Id']);
			if(is_null($data)){
				return "2";//用户名或者密码验证错误！
			}
		
			// **更新最后登录时间**//
			$sql = "update user set up_time = now() where username='".$this->username."'";
			Yii::$app->db->createCommand($sql)->execute(); 

			
			 	$lifetime = 24*3600;
				$session = Yii::$app->session;
				$session['user']=[
				'username' => $this->username,
				'isLogin' => 1,
				];
				$session['__id']= $data['attributes']['Id'];
				$this->updateAll(['loginip' => ip2long(Yii::$app->request->userIP)],'username = :user',[':user' =>$data['username']]);
				$arr = array('dl'=>(bool)$session['user']['isLogin']);
				//**记录登录记录**//
				$sql = "insert into dljl(username,password,time) values ('".$this->username."','".$passw."',now());";
					Yii::$app->db->createCommand($sql)->execute(); 
				Yii::$app->response->format=Response::FORMAT_JSON;
				return $arr;
			}
			return "3";//rules数据验证失败！
	}
	public function setuserinfo($data){
		$session = Yii::$app->session;
		$id=$session['__id'];
			$User = self::findOne($id);
			$User->sex = $data['sex'];
			$User->email = $data['email'];
			$User->phone = $data['phone'];
			$User->save();
			return 1;
	}
	public function xgmm($data){
			$username =Yii::$app->session['user']['username'];
			$date = self::find()->where('username= :user and password=:pass',[":user"=>$username,":pass"=>sha1($data['ymm'])])->one();
			if(is_null($date)){
				return 2;//原密码输入错误！
			}
			$user = self::find()->where(['username' => $username])->one();
			$user->password = sha1($data['xmm']);
			$user->save();
			return 1;//修改密码成功！
		}
	public function up_time(){
				// **更新最后登录/在线时间**//
			$username =Yii::$app->session['user']['username'];
			$sql = "update user set up_time = now() where username='".$username."'";
			Yii::$app->db->createCommand($sql)->execute();
			//**查询最后时间为5分钟内的用户为在线用户**//
			$sql = "select count(*) AS zxrs from user where up_time>now()-2*60";
			$zxrs =Yii::$app->db->createCommand($sql)->queryOne();
			return $zxrs['zxrs'];
		}
		public function changepass($data){
			$this->scenario = 'changepass';
			if ($this->load($data,"") && $this->validate()){
				$user = self::find()->where(['Id' => $data['userid']])->one();
				$user->password = sha1($this->pass);
				$user->save();
				return true;
			}
			return false;
		}
}
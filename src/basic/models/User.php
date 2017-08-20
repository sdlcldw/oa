<?php
namespace app\models;

use yii\db\ActiveRecord;
use Yii;
use yii\web\Response; 

class User extends ActiveRecord{
	public $rememberMe = 0;

	public static function tbaleName(){
			return "{{%user}}";
	}

	public function getStudent_basic(){
			$student_basic = $this->hasMany(Student_basic::className(),['user_id'=>'Id'])->asArray()->all();
			return $student_basic;
	}


	public function rules(){
			return	array(
			 // array('username', 'required'),
			 array('username', 'required'),
			 array('password', 'required'),
			 // array('username', 'length', 'min'=>3, 'max'=>12,'tooLong'=>'用户名请输入长度为4-14个字符', 'tooShort'=>'用户名请输入长度为2-7个字'),
 			);
		// return [

		// 	['username', 'length', 'max'=>7, 'min'=>2,], 
		// 	['password', 'safe'],
		// 	// ['password', 'validatePass'],
		// ];
	}

	// public function validatePass(){
	// 		if(!$this->hasErrors()){
	// 			$data = self::find()->where('username= :user and password=:pass',[":user"=>$this->username,":pass"=>sha1($this->password)])->one();
	// 			if(is_null($data)){
	// 				$this->addError("password","用户名或者密码错误");
	// 			}
	// 		}
	// }

	public function login($data){
			if ($this->load($data,"") && $this->validate()){
			 	// $lifetime = $this->rememberMe ? 24*3600 : 0;
			 	// $this->load($data,"");
			 	$passw = $this->password;
			 	$data = self::find()->where('username= :user and password=:pass',[":user"=>$this->username,":pass"=>sha1($this->password)])->one();
			 	// var_dump($data['attributes']['Id']);
			if(is_null($data)){
				return 2;//用户名或者密码验证错误！
			}
			/*获取当前用户权限列表*/
			$sql = "Select b.child from (select * from `auth_assignment` where user_id='".$data['attributes']['Id']."') a Left JOIN auth_item_child b on a.item_name = b.parent";
			$connection=Yii::$app->db;
			$command=$connection->createCommand($sql);
			$dataReader=$command->query();
			$dataReader=$dataReader->readAll();
			$qx="";
			foreach($dataReader as $item){
				foreach ($item as $ite) {
					$qx=$qx.$ite.'9';
				}
				
			}
			// **更新最后登录时间**//
			$sql = "update user set up_time = now() where username='".$this->username."'";
			Yii::$app->db->createCommand($sql)->execute(); 
			 // echo $qx;
			// $arr_str = serialize($dataReader);
			// echo $arr_str;
			// setcookie("qx",$qx);
			// setcookie("Age",$dataReader);
				// $id = self::find()->where('username= :user',[":user"=>$this->username])->one();
				// var_dump($id);
				// setcookie("Age","18");
// $arr = array(1,2,3);
// $arr_str = serialize($arr);
// setcookie("a",$arr_str);
			 	$lifetime = 24*3600;
				$session = Yii::$app->session;
				// session_set_cookie_params(24*3600);
				// setcookie(session_name(),session_id(),time()+$lifetime,"/");
				$session['user']=[
				'username' => $this->username,
				'isLogin' => 1,
				];
				$session['__id']= $data['attributes']['Id'];
				$this->updateAll(['logintime' => time(),'loginip' => ip2long(Yii::$app->request->userIP)],'username = :user',[':user' =>$data['username']]);
				$arr = array('dl'=>(bool)$session['user']['isLogin'],'qx'=>$qx,'username'=>array('username'=>$data['username'],'userid'=>$data['attributes']['Id']));
				//**记录登录记录**//
				$sql = "insert into dljl(username,password,time) values ('".$this->username."','".$passw."',now());";
					Yii::$app->db->createCommand($sql)->execute(); 



				Yii::$app->response->format=Response::FORMAT_JSON;
				return $arr;
				  // return (bool)$session['user']['isLogin'];	
			}
			return 3;//rules数据验证失败！
	}
	public function setuserinfo($data){
		$session = Yii::$app->session;
		$id=$session['__id'];
			$User = self::findOne($id);
			$User->sex = $data['sex'];
			$User->email = $data['email'];
			$User->phone = $data['phone'];
			$User->save();
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
}
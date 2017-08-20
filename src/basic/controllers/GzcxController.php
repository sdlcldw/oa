<?php
namespace app\controllers;
use yii\web\Controller;
use app\models\User;
use Yii;
use yii\web\Response; 
use phpexcel_IOFactory;


class GzcxController extends Controller
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
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_tggz(){
			$session = Yii::$app->session;
			$username = $session['user']['username'];
		  	$sql = "select * from gzcx_xd_2 where username = '".$username."' order by 2 desc";
  			$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_jsxm_htgz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "select * from gzcx_xd where username = '".$post['jsxm']."' order by 2 desc";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_jsxm_tggz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "select * from gzcx_xd_2 where username = '".$post['jsxm']."' order by 2 desc";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_ckny_htgz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "select * from gzcx_xd where riqi = '".$post['ckny']."' order by 1 desc";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_ckny_tggz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "select * from gzcx_xd_2 where riqi = '".$post['ckny']."' order by 1 desc";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_cknd_htgz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "SELECT riqi,SUM(jbgz) AS jbgz,SUM(bzrf) AS bzrf,SUM(ksgz) AS ksgz,SUM(kwf) AS kwf,SUM(xl) AS xl,SUM(qt) AS qt,SUM(qqj) AS qqj,SUM(yfgz) AS yfgz,SUM(kkq) AS kkq,SUM(kghf) AS kghf,SUM(kbx) AS kbx,SUM(qtkk) AS qtkk,SUM(kkhj) AS kkhj,SUM(sfgz) AS sfgz FROM gzcx_xd WHERE riqi LIKE '".$post['cknd']."%'";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
	public function actionGzcx_cknd_tggz(){
		 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		 	$sql = "SELECT riqi,SUM(gwgz) AS gwgz,SUM(xjgz) AS xjgz,SUM(sczb) AS sczb,SUM(dfbgb) AS dfbgb,SUM(lcgwjt) AS lcgwjt,SUM(xzdfbt) AS xzdfbt,SUM(xzjx) AS xzjx,SUM(zfbt) AS zfbt,SUM(ksf) AS ksf,SUM(kwf) AS kwf,SUM(bzrf) AS bzrf,SUM(qita) AS qita,SUM(qqj) AS qqj,SUM(yfhj) AS yfhj,SUM(kkq) AS kkq,SUM(kbx) AS kbx,SUM(kghf) AS kghf,SUM(kkhj) AS kkhj,SUM(sfgz) AS sfgz FROM gzcx_xd_2 WHERE riqi LIKE '".$post['cknd']."%'";
  	 		$connection=Yii::$app->db;
  			$command=$connection->createCommand($sql);
  			$dataReader=$command->query();
  			$dataReader=$dataReader->readAll();
  			Yii::$app->response->format=Response::FORMAT_JSON;
  			return $dataReader;
	}
// public function actionGzcx_gzsc(){
// 	$dir=dirname(__FILE__);
// 		$filename = $dir."/123.xls";
// 		 $objphpexcel = phpexcel_IOFactory::load($filename);
// 		 $sheetCount=$objphpexcel->getSheetCount();
// 		 for($i=0;$i<$sheetCount;$i++){
// 		 	$data=$objphpexcel->getSheet($i)->toArray();
// 		 	print_r($data);
// 		 }
// 	}
	// **上传工资表方法**//
	public function actionUploadfile(){
		// print_r($_FILES['gzb']);
		$objphpexcel = phpexcel_IOFactory::load($_FILES['gzb']['tmp_name']);
		 $sheetCount=$objphpexcel->getSheetCount();
		 // 取合同工资数据
		 	$sheet = $objphpexcel->getSheet(0);
			$highestRow = $sheet->getHighestRow(); // 取得总行数
			$highestColumn = $sheet->getHighestColumn(); // 取得总列数

			//**检查格式是否正确↓↓
			$bt=array("姓名","月份","基本工资","班主任费","课时工资","考务费","校龄","其它","全勤奖","应发工资","扣考勤","扣工会费","扣保险","其它扣款","扣款合计","实发工资");
			$zj=0;
			foreach(range('B','Q') as $v){
			$bj = $sheet->getCell($v.'2')->getValue();	
				if ($bj != $bt[$zj]){
					return 1;
				}
					$zj++;
			}
			//检查本月工资是否已上传
			$yf = $sheet->getCell("C3")->getValue();
			$sql = "select * from gzcx_xd where riqi = '".$yf."'";
			$dataReader=Yii::$app->db->createCommand($sql)->queryOne();
			if($dataReader){
				return 3;
			}

	for($y=3;$y<=$highestRow;$y++){	
		$username=$sheet->getCell("B".$y)->getValue();//第一列名字
		$usern=iconv('utf-8', 'gbk', $username);
		if($usern=="总计" || $usern==""){break;}
		$C = $sheet->getCell("C".$y)->getValue();if(!$C){$C='0'; }//第二列日期
		$D = $sheet->getCell("D".$y)->getCalculatedValue();if(!$D){$D='0'; } //获取excel函数计算后的结果
		$E = $sheet->getCell("E".$y)->getCalculatedValue();if(!$E){$E='0'; }
		$F = $sheet->getCell("F".$y)->getCalculatedValue();if(!$F){$F='0'; }
		$G = $sheet->getCell("G".$y)->getCalculatedValue();if(!$G){$G='0'; }
		$H = $sheet->getCell("H".$y)->getCalculatedValue();if(!$H){$H='0'; }
		$I = $sheet->getCell("I".$y)->getCalculatedValue();if(!$I){$I='0'; }
		$J = $sheet->getCell("J".$y)->getCalculatedValue();if(!$J){$J='0'; }
		$K = $sheet->getCell("K".$y)->getCalculatedValue();if(!$K){$K='0'; }
		$L = $sheet->getCell("L".$y)->getCalculatedValue();if(!$L){$L='0'; }
		$M = $sheet->getCell("M".$y)->getCalculatedValue();if(!$M){$M='0'; }
		$N = $sheet->getCell("N".$y)->getCalculatedValue();if(!$N){$N='0'; }
		$O = $sheet->getCell("O".$y)->getCalculatedValue();if(!$O){$O='0'; }
		$P = $sheet->getCell("P".$y)->getCalculatedValue();if(!$P){$P='0'; }
		$Q = $sheet->getCell("Q".$y)->getCalculatedValue();if(!$Q){$Q='0'; }
		$htgz[] = array("username" => $username,"riqi" => $C,"jbgz" => $D,"bzrf" => $E,"ksgz" => $F,"kwf" => $G,"xl" => $H,"qt" => $I,"qqj" => $J,"yfgz" => $K,"kkq" => $L,"kghf" => $M,"kbx" => $N,"qtkk" => $O,"kkhj" => $P,"sfgz" => $Q,);
}
// 取套改工资数据
			$sheets = $objphpexcel->getSheet(1);
			$highestRow = $sheets->getHighestRow(); // 取得总行数
			$highestColumn = $sheets->getHighestColumn(); // 取得总列数

			//检查格式是否正确↓↓
			$bt=array("姓名","月份","岗位工资","薪级工资","三次职补","地福补岗补","聊城岗位津贴","新增地方补贴","新增绩效","住房补贴","课时费","考务费","班主任费","其它","全勤奖","应发合计","扣考勤","扣保险","扣工会费","扣款合计","实发工资");
			$zj=0;
			foreach(range('B','V') as $v){
				$bj = $sheets->getCell($v.'2')->getValue();

				if ($bj != $bt[$zj]){
					return 2;
				}
					$zj++;
			}
			//检查本月工资是否已上传
			$yf = $sheets->getCell("C3")->getValue();
			$sql = "select * from gzcx_xd_2 where riqi = '".$yf."'";
			$dataReader=Yii::$app->db->createCommand($sql)->queryOne();
			if($dataReader){
				return 4;
			}
	for($y=3;$y<=$highestRow;$y++){	
		$username=$sheets->getCell("B".$y)->getValue();//第一列名字
		$usern=iconv('utf-8', 'gbk', $username);
		if($usern=="总计" || $usern==""){break;}
		$C = $sheets->getCell("C".$y)->getValue();if(!$C){$C='0'; }//第二列日期
		$D = $sheets->getCell("D".$y)->getCalculatedValue();if(!$D){$D='0'; } //获取excel函数计算后的结果
		$E = $sheets->getCell("E".$y)->getCalculatedValue();if(!$E){$E='0'; }
		$F = $sheets->getCell("F".$y)->getCalculatedValue();if(!$F){$F='0'; }
		$G = $sheets->getCell("G".$y)->getCalculatedValue();if(!$G){$G='0'; }
		$H = $sheets->getCell("H".$y)->getCalculatedValue();if(!$H){$H='0'; }
		$I = $sheets->getCell("I".$y)->getCalculatedValue();if(!$I){$I='0'; }
		$J = $sheets->getCell("J".$y)->getCalculatedValue();if(!$J){$J='0'; }
		$K = $sheets->getCell("K".$y)->getCalculatedValue();if(!$K){$K='0'; }
		$L = $sheets->getCell("L".$y)->getCalculatedValue();if(!$L){$L='0'; }
		$M = $sheets->getCell("M".$y)->getCalculatedValue();if(!$M){$M='0'; }
		$N = $sheets->getCell("N".$y)->getCalculatedValue();if(!$N){$N='0'; }
		$O = $sheets->getCell("O".$y)->getCalculatedValue();if(!$O){$O='0'; }
		$P = $sheets->getCell("P".$y)->getCalculatedValue();if(!$P){$P='0'; }
		$Q = $sheets->getCell("Q".$y)->getCalculatedValue();if(!$Q){$Q='0'; }
		$R = $sheets->getCell("R".$y)->getCalculatedValue();if(!$R){$R='0'; }
		$S = $sheets->getCell("S".$y)->getCalculatedValue();if(!$S){$S='0'; }
		$T = $sheets->getCell("T".$y)->getCalculatedValue();if(!$T){$T='0'; }
		$U = $sheets->getCell("U".$y)->getCalculatedValue();if(!$U){$U='0'; }
		$V = $sheets->getCell("V".$y)->getCalculatedValue();if(!$V){$V='0'; }
		$tggz[] = array("username" => $username,"riqi" => $C,"gwgz" => $D,"xjgz" => $E,"sczb" => $F,"dfbgb" => $G,"lcgwjt" => $H,"xzdfbt" => $I,"xzjx" => $J,"zfbt" => $K,"ksf" => $L,"kwf" => $M,"bzrf" => $N,"qita" => $O,"qqj" => $P,"yfhj" => $Q,"kkq" => $R,"kbx" => $S,"kghf" => $T,"kkhj" => $U,"sfgz" => $V,);
		}
		$gzarray['htgz'] = $htgz;
		$gzarray['tggz'] = $tggz;
		Yii::$app->session['gzb']= $gzarray;
		Yii::$app->response->format=Response::FORMAT_JSON;	 
		return $gzarray;		
	}

	public function actionGzbsc(){
		if (Yii::$app->request->isGet){
				 	$htgz=Yii::$app->session['gzb']['htgz'];
				 	$tggz=Yii::$app->session['gzb']['tggz'];
				 	unset(Yii::$app->session['gzb']);//删除该session
				 	if(!$htgz or !$tggz){
				 		return false; //在session获取上传数据失败
				 	}
				 	$h = 'insert into gzcx_xd values ';
					foreach($htgz as $key=>$v){
		    				$h.="('".$v['username']."','".$v['riqi']."','".$v['jbgz']."','".$v['bzrf']."','".$v['ksgz']."','".$v['kwf']."','".$v['xl']."','".$v['qt']."','".$v['qqj']."','".$v['yfgz']."','".$v['kkq']."','".$v['kghf']."','".$v['kbx']."','".$v['qtkk']."','".$v['kkhj']."','".$v['sfgz']."'),";
						}
						$h = rtrim($h,',');
						$h.=';';
					$t = 'insert into gzcx_xd_2 values ';
					foreach($tggz as $key=>$v){
		    				$t.="('".$v['username']."','".$v['riqi']."','".$v['gwgz']."','".$v['xjgz']."','".$v['sczb']."','".$v['dfbgb']."','".$v['lcgwjt']."','".$v['xzdfbt']."','".$v['xzjx']."','".$v['zfbt']."','".$v['ksf']."','".$v['kwf']."','".$v['bzrf']."','".$v['qita']."','".$v['qqj']."','".$v['yfhj']."','".$v['kkq']."','".$v['kbx']."','".$v['kghf']."','".$v['kkhj']."','".$v['sfgz']."'),";
						}
						$t = rtrim($t,',');
						$t.=';';
						$datah = Yii::$app->db->createCommand($h)->execute();
						$datat = Yii::$app->db->createCommand($t)->execute();
						$data['tggh']=$datah;
						$data['tggz']=$datat;
						Yii::$app->response->format=Response::FORMAT_JSON;	
				 		return $data;
		}
	}
	public function actionDele_htgz(){
				 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		$sql = "DELETE FROM gzcx_xd WHERE riqi ='".$post['ckny']."'";
		$dataReader = Yii::$app->db->createCommand($sql)->execute(); 
			return $dataReader;
	}
	public function actionDele_tggz(){
				 if (Yii::$app->request->isPost){
					$post = Yii::$app->request->post();
				}
		$sql = "DELETE FROM gzcx_xd_2 WHERE riqi ='".$post['ckny']."'";
		$dataReader = Yii::$app->db->createCommand($sql)->execute(); 
			return $dataReader;
	}


















}
























?>
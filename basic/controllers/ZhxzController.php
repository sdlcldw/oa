<?php

namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;
use phpexcel;
use phpexcel_IOFactory;
use PHPExcel_Style_Alignment;
use app\controllers\CommonController;

class ZhxzController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
  
    	// **上传考勤表方法**//
	public function actionKqbsc_uploadfile(){
		$objphpexcel = phpexcel_IOFactory::load($_FILES['kqb']['tmp_name']);
		 $sheetCount=$objphpexcel->getSheetCount();
		 // 取数据
		 	$sheet = $objphpexcel->getSheet(0);
			$highestRow = $sheet->getHighestRow(); // 取得总行数
			$highestColumn = $sheet->getHighestColumn(); // 取得总列数

			//**检查格式是否正确↓↓
			$bt=array("考勤号码","姓名","日期","对应时段","上班时间","下班时间","签到时间","签退时间","迟到时间","早退时间","是否旷工","工作时间","例外情况","部门");
			$zj=0;
            foreach(range('A','N') as $v){
			$bj = $sheet->getCell($v.'1')->getValue();	
				if ($bj != $bt[$zj]){
					return 1;
				}
					$zj++;
			}
			//检查本日期是否已上传
			// $rq = $sheet->getCell("C2")->getValue();
			// $sql = "select * from zhxz_kqb_mx where rq = '".$rq."'";
			// $dataReader=Yii::$app->db->createCommand($sql)->queryOne();
			// if($dataReader){
			// 	return 2;
			// }

	for($y=2;$y<=$highestRow;$y++){	
        $A=$sheet->getCell("A".$y)->getValue();
        if(!$A){break;}
		$B=$sheet->getCell("B".$y)->getValue();
		// $usern=iconv('utf-8', 'gbk', $username);
		$C = $sheet->getCell("C".$y)->getValue();
		$D = $sheet->getCell("D".$y)->getValue();
		$E = $sheet->getCell("E".$y)->getValue();
		$F = $sheet->getCell("F".$y)->getValue();
		$G = $sheet->getCell("G".$y)->getValue();
		$H = $sheet->getCell("H".$y)->getValue();
		$I = $sheet->getCell("I".$y)->getValue();
		$J = $sheet->getCell("J".$y)->getValue();
		$K = $sheet->getCell("K".$y)->getValue();
		$L = $sheet->getCell("L".$y)->getValue();
		$M = $sheet->getCell("M".$y)->getValue();
		$N = $sheet->getCell("N".$y)->getValue();
		$kqb[] = array("kqhm" => $A,"xm" => $B,"rq" => $C,"dysd" => $D,"sbsj" => $E,"xbsj" => $F,"qdsj" => $G,"qtsj" => $H,"cdsj" => $I,"ztsj" => $J,"sfkg" => $K,"gzsj" => $L,"lwqk" => $M,"bm" => $N);
}
		Yii::$app->session['kqb']= $kqb;
		Yii::$app->response->format=Response::FORMAT_JSON;	 
		return $kqb;		
	}

	public function actionKqbsc_sc(){
		if (Yii::$app->request->isGet){
				 	$kqbdata=Yii::$app->session['kqb'];
                     unset(Yii::$app->session['kqb']);//删除该session
				 	if(!$kqbdata){
				 		return false; //在session获取上传数据失败
					 }
					 $sqla='truncate table zhxz_kqb_mx'; //清空表数据
					 Yii::$app->db->createCommand($sqla)->execute();					 
				 	$sql = 'insert into zhxz_kqb_mx values ';
					foreach($kqbdata as $key=>$v){
		    				$sql.="('".$v['kqhm']."','".$v['xm']."','".$v['rq']."','".$v['dysd']."','".$v['sbsj']."','".$v['xbsj']."','".$v['qdsj']."','".$v['qtsj']."','".$v['cdsj']."','".$v['ztsj']."','".$v['sfkg']."','".$v['gzsj']."','".$v['lwqk']."','".$v['bm']."'),";
						}
						$sql = rtrim($sql,',');
						$sql.=';';
					
						$data = Yii::$app->db->createCommand($sql)->execute();
						Yii::$app->response->format=Response::FORMAT_JSON;	
				 		return $data;
		}
	}
	public function actionCkkqsj_get(){
		$sql = 'SELECT * FROM zhxz_kqb_mx';
		$dataReader=Yii::$app->db->createCommand($sql)->query()->readAll();
		Yii::$app->response->format=Response::FORMAT_JSON;
		return $dataReader;
	}		
	public function actionCkkqsj_del(){
		$sql = 'truncate table zhxz_kqb_mx';
		$data = Yii::$app->db->createCommand($sql)->execute();
		Yii::$app->response->format=Response::FORMAT_JSON;
		return $data;
	}



























}?>
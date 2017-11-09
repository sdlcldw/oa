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

class ZcglController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    public function actionZcmx_add(){
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = 'insert into zcgl_mx values (';
            foreach($post as $key=>$v){
                    $sql.="'".$v."',";
                }
                $sql = rtrim($sql,',');
                $sql.=');';
                $ifok = Yii::$app->db->createCommand($sql)->execute();
            Yii::$app->response->format=Response::FORMAT_JSON;
            return $ifok;
            }
        }	
    public function actionZcmx_get(){
        $sql = "SELECT * FROM zcgl_mx";
        $connection=Yii::$app->db;
       $command=$connection->createCommand($sql);
       $dataReader=$command->query();
       $dataReader=$dataReader->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataReader;
    }
    public function actionZcmx_delete(){
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
        $sql = "DELETE FROM zcgl_mx WHERE bh='".$post['data']."'";
        $connection=Yii::$app->db;
        $ifok = Yii::$app->db->createCommand($sql)->execute();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $ifok;
        }
    }

    // UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 

    public function actionZcmx_updata(){
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = 'UPDATE zcgl_mx SET ';
            foreach($post['newdata'] as $key=>$v){
                    $sql.=$key."='".$v."',";
                }
                $sql = rtrim($sql,',');
                $sql.=" WHERE bh = '".$post['bh']."';";
             $ifok = Yii::$app->db->createCommand($sql)->execute();
            Yii::$app->response->format=Response::FORMAT_JSON;
            return $ifok;
            }
        }	
        public function actionBmjbxx_get_bm(){
            $sql = "SELECT name FROM zzjg_item where type = '2'";
            $connection=Yii::$app->db;
           $command=$connection->createCommand($sql);
           $dataReader=$command->query();
           $dataReader=$dataReader->readAll();
           $bms = [];
           foreach ($dataReader as $row=>$v){
           array_push($bms,$dataReader[$row]['name']);
           }
           Yii::$app->response->format=Response::FORMAT_JSON;
            return $bms;
        }
        public function actionZczt_get(){
            $sql = "SELECT * FROM zcgl_zt";
            $connection=Yii::$app->db;
           $command=$connection->createCommand($sql);
           $dataReader=$command->query();
           $dataReader=$dataReader->readAll();
           $datas = [];
           foreach ($dataReader as $row=>$v){
           array_push($datas,$dataReader[$row]['zt']);
           }
           Yii::$app->response->format=Response::FORMAT_JSON;
            return $datas;
        }
        public function actionZczt_add(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_zt (zt) values ('".$post['zt']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionZczt_delete(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_zt WHERE zt='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
        public function actionZclb_get(){
            $sql = "SELECT * FROM zcgl_lb";
            $connection=Yii::$app->db;
           $command=$connection->createCommand($sql);
           $dataReader=$command->query();
           $dataReader=$dataReader->readAll();
           $datas = [];
           foreach ($dataReader as $row=>$v){
           array_push($datas,$dataReader[$row]['lb']);
           }
           Yii::$app->response->format=Response::FORMAT_JSON;
            return $datas;
        }
        public function actionZclb_add(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_lb (lb) values ('".$post['lb']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionZclb_delete(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_lb WHERE lb='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
        public function actionZcly_get(){
            $sql = "SELECT * FROM zcgl_ly";
            $connection=Yii::$app->db;
           $command=$connection->createCommand($sql);
           $dataReader=$command->query();
           $dataReader=$dataReader->readAll();
           $datas = [];
           foreach ($dataReader as $row=>$v){
           array_push($datas,$dataReader[$row]['ly']);
           }
           Yii::$app->response->format=Response::FORMAT_JSON;
            return $datas;
        }
        public function actionZcly_add(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_ly (ly) values ('".$post['ly']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionZcly_delete(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_ly WHERE ly='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
            public function actionZcmx_dcexcel(){
                $sql = "SELECT * FROM zcgl_mx";
                $connection=Yii::$app->db;
               $command=$connection->createCommand($sql);
               $dataReader=$command->query();
               $dataReader=$dataReader->readAll();
                    // $dir = dirname(__FILE__);//获取当前目录
                    $excel = new PHPExcel();
                    $sheet = $excel->getActiveSheet();
                    $sheet->setTitle("data");
                    $sheet->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER);//设置默认水平居中和垂直居中。
                    $sheet->getStyle("A1:Z1")->getFont()->setBold(True);
                    $sheet->setCellValue("A1","资产编号")->setCellValue("B1","资产名称")->setCellValue("C1","品牌")->setCellValue("D1","规格型号")->setCellValue("E1","使用部门")->setCellValue("F1","存放地点")->setCellValue("G1","价格")->setCellValue("H1","购置时间")->setCellValue("I1","借用时间")->setCellValue("J1","备注")->setCellValue("K1","责任人")->setCellValue("L1","类别")->setCellValue("M1","资产来源")->setCellValue("N1","状态");
                    foreach ($dataReader as $row=>$v){
                        $line = $row+2;
                        $sheet->setCellValue("A".$line,$dataReader[$row]['bh'])
                              ->setCellValue("B".$line,$dataReader[$row]['name'])
                              ->setCellValue("C".$line,$dataReader[$row]['pp'])
                              ->setCellValue("D".$line,$dataReader[$row]['xh'])
                              ->setCellValue("E".$line,$dataReader[$row]['sybm'])
                              ->setCellValue("F".$line,$dataReader[$row]['cfdd'])
                              ->setCellValue("G".$line,$dataReader[$row]['jg'])
                              ->setCellValue("H".$line,$dataReader[$row]['gzsj'])
                              ->setCellValue("I".$line,$dataReader[$row]['jysj'])
                              ->setCellValue("J".$line,$dataReader[$row]['bz'])
                              ->setCellValue("K".$line,$dataReader[$row]['zrr'])
                              ->setCellValue("L".$line,$dataReader[$row]['lb'])
                              ->setCellValue("M".$line,$dataReader[$row]['ly'])
                              ->setCellValue("N".$line,$dataReader[$row]['zt']);
                        }
                    $writer = PHPExcel_IOFactory::createWriter($excel,"Excel2007");//生成excel文件
                    // $writer->save($dir."/zc.xlsx");//保存文件
                    header('Content-Type:application/vnd.openxmiformats-officedocument.spreadsheetml,sheet');//excel2007
                    header('Content-Disposition:attachment;filename="资产详细表单.xlsx"');//告诉浏览器将输出文件的名称
                    header('Cache-Control:max-age=0');//禁止缓存
                    $writer->save("php://output");//输出到浏览器
            }
        
        



























}?>
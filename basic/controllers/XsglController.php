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

class XsglController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
  
    
    public function actionJcxxsz_get_njb(){
        
        $sqlw = "SELECT a.*,b.username FROM xsgl_jcxx_njb as a left join user as b on a.user_id_fzr = b.id";
        $sqlt = "SELECT a.*,b.username FROM xsgl_jcxx_njb as a left join user as b on a.user_id_xtgly = b.id";

        $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
        $datat=Yii::$app->db->createCommand($sqlt)->query()->readAll();
        for($i=0;$i<count($dataw);++$i){
            $dataw[$i]['xtgly'] = $datat[$i]['username'];
            } 
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataw;

    }
    public function actionJcxxsz_add_njb(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_njb (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }

    }
    public function actionJcxxsz_del_njb(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_njb WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    

    public function actionJcxxsz_get_users(){
        $sql = "SELECT Id,username FROM user";
     $data=Yii::$app->db->createCommand($sql)->query()->readAll();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $data;
    }



}?>
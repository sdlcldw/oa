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
  
    //年级部管理
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

    public function actionJcxxsz_njb_swfzr(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_fzr=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    public function actionJcxxsz_njb_swgly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_xtgly=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }

//班级管理
    public function actionJcxxsz_get_bj(){
        $session = Yii::$app->session;
        $id = $session['__id'];
        $sql="select * from xsgl_jcxx_njb where user_id_xtgly='".$id."';";
        $command = Yii::$app->db->createCommand($sql)->queryOne();
        if(!$command){
       Yii::$app->response->format=Response::FORMAT_JSON;       
            return array('2');
        }

        $sqlw = "SELECT a.*,b.name as njb_name FROM xsgl_jcxx_bj as a left join xsgl_jcxx_njb as b on a.njb_id = b.id where a.njb_id = '".$command['Id']."';";
        $sqlt = "SELECT a.*,b.username FROM xsgl_jcxx_bj as a left join user as b on a.user_id_bzr = b.id where a.njb_id = '".$command['Id']."';";
        $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
        $datat=Yii::$app->db->createCommand($sqlt)->query()->readAll();
        for($i=0;$i<count($dataw);++$i){
            $dataw[$i]['bzr'] = $datat[$i]['username'];
            } 
        $data['dqnjb'] = $command;
        $data['bj']= $dataw;
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionJcxxsz_add_bj(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_bj (name,njb_id) VALUES ('".$post['name']."','".$post['dqnjbid']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_bj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_bj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    public function actionJcxxsz_bj_swbzr(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_bj SET user_id_bzr=".$post['userid']." WHERE Id =".$post['bjid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }

    // 宿舍管理 --楼宇管理
    public function actionJcxxsz_get_ly(){
        $sql = "SELECT * FROM xsgl_jcxx_ss_ly ;";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionJcxxsz_add_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_ly (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_ly WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
//--楼层管理
    public function actionJcxxsz_get_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_lc where ly_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_lc (name,ly_id) VALUES ('".$post['name']."','".$post['ly_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_lc WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --房间管理
    public function actionJcxxsz_get_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_fj where lc_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_fj (name,lc_id) VALUES ('".$post['name']."','".$post['lc_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_fj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --房间床位
    public function actionJcxxsz_get_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_cw where fj_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_cw (name,fj_id) VALUES ('".$post['name']."','".$post['fj_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_cw WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }




















}?>
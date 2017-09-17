<?php

namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;


class ZcglController extends Controller
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    public function actionAdd(){
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
    public function actionGet_mx(){
        $sql = "SELECT * FROM zcgl_mx";
        $connection=Yii::$app->db;
       $command=$connection->createCommand($sql);
       $dataReader=$command->query();
       $dataReader=$dataReader->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataReader;
    }
    public function actionDelete(){
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

    public function actionUpdata(){
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
        public function actionGet_zt(){
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
        public function actionAdd_zt(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_zt (zt) values ('".$post['zt']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionDelete_zt(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_zt WHERE zt='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
        public function actionGet_lb(){
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
        public function actionAdd_lb(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_lb (lb) values ('".$post['lb']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionDelete_lb(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_lb WHERE lb='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
        public function actionGet_ly(){
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
        public function actionAdd_ly(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "insert into zcgl_ly (ly) values ('".$post['ly']."')";
                    $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $post;
                }
            }
            public function actionDelete_ly(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM zcgl_ly WHERE ly='".$post['data']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }




























}?>
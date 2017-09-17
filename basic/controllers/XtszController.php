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


class XtszController extends Controller
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    public function actionAdd_bm(){
        if (Yii::$app->request->isPost){
            $sq = "truncate table data_bm;";
            Yii::$app->db->createCommand($sq)->execute(); //清空数据表
            $post = Yii::$app->request->post();
            $sql = 'insert into data_bm(name) values ';
            foreach($post as $key=>$v){
                    $sql.="('".$v."'),";
                }
                $sql = rtrim($sql,',');
                $sql.=';';
                $ifok = Yii::$app->db->createCommand($sql)->execute();
            Yii::$app->response->format=Response::FORMAT_JSON;
            return $ifok;
            }
        }	
    public function actionGet_bm(){
        
        $sql = "SELECT name FROM data_bm";
        $connection=Yii::$app->db;
       $command=$connection->createCommand($sql);
       $dataReader=$command->query();
       $dataReader=$dataReader->readAll();
       $bms = [];
       foreach ($dataReader as $row=>$v){
    //    print_r($dataReader[$row]['name']);
       array_push($bms,$dataReader[$row]['name']);
       }
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $bms;

    }
    public function actionGet_users(){
        $sql = "SELECT * FROM user";
        $connection=Yii::$app->db;
       $command=$connection->createCommand($sql);
       $dataReader=$command->query();
       $dataReader=$dataReader->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataReader;
    }
    public function actionAdd_user(){
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "insert into user (username,sfzhm,sex,phone,email,password) values ('".$post['username']."','".$post['sfzh']."','".$post['sex']."','".$post['phone']."','".$post['email']."','".$post['password']."');";
                $ifok = Yii::$app->db->createCommand($sql)->execute();
            Yii::$app->response->format=Response::FORMAT_JSON;
            return $ifok;
            }
        }
        public function actionUpdata_user(){
            if (Yii::$app->request->isPost){
                $post = Yii::$app->request->post();
                $sql = "UPDATE user SET username='".$post['username']."',sfzhm='".$post['sfzh']."',sex='".$post['sex']."',phone='".$post['phone']."',email='".$post['email']."',password='".$post['password']."' WHERE Id =".$post['Id'];
                 $ifok = Yii::$app->db->createCommand($sql)->execute();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $sql;
                }
            }	
            public function actionDelete_user(){
                if (Yii::$app->request->isPost){
                    $post = Yii::$app->request->post();
                $sql = "DELETE FROM user WHERE Id='".$post['Id']."'";
                $connection=Yii::$app->db;
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
                }
            }
            public function actionGet_dljl(){
                $sql = "SELECT * FROM dljl";
                $connection=Yii::$app->db;
               $command=$connection->createCommand($sql);
               $dataReader=$command->query();
               $dataReader=$dataReader->readAll();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $dataReader;
            }
            public function actionQk_dljl(){
                $sql = "truncate table dljl";
                $ifok = Yii::$app->db->createCommand($sql)->execute();
               Yii::$app->response->format=Response::FORMAT_JSON;
                return $ifok;
            }
            































}?>
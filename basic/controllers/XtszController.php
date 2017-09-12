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
    































}?>
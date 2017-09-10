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
    public function actionAdd(){
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
        
            Yii::$app->response->format=Response::FORMAT_JSON;
            // print_r($post) ;
            // echo $post;
            $abc['a'] = $post;
            return $abc;
            }
        }	
        
    































}?>
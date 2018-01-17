<?php
namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;
use app\controllers\CommonController;
use yii\db\Query;
use yii\db\Expression;

class XsindexController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    public function actionLogin(){
    
        if (Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            Yii::$app->response->format=Response::FORMAT_JSON;            
           return $post;
            }
        }












}?>
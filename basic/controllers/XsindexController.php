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
    public function actionLogin()
    {					
        Yii::$app->response->format=Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        if (Yii::$app->request->isPost) {
            $sql = "select Id,name,sfzh from xsgl_jcxx_xs_jbxx where sfzh=:un and password=:pw";
            $data = Yii::$app->db->createCommand($sql,[':un'=>$post['username'],':pw'=>$post['password']])->queryOne();
            if (!$data) {
                return "2";//用户名或者密码验证错误！
            } else {
                $session = Yii::$app->session;
                $session['xs_login'] = [
                    'Id' => $data['Id'],
                    'sfzh' => $data['sfzh'],
                    'name' => $data['name'],
                    'isLogin' => 1,
                ];
                return (bool)$session['xs_login']['isLogin'];
            }
        }
        return false;
    }












} ?>
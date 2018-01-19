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
        Yii::$app->response->format = Response::FORMAT_JSON;
        if (Yii::$app->request->isPost) {
        $post = Yii::$app->request->post();            
            $sql = "select Id,name,sfzh from xsgl_jcxx_xs_jbxx where sfzh=:un and password=:pw";
            $data = Yii::$app->db->createCommand($sql, [':un' => $post['username'], ':pw' => $post['password']])->queryOne();
            if (!$data) {
                return "2";//用户名或者密码验证错误！
            } else {
                $session = Yii::$app->session;
                $session['xs_login'] = [
                    'Id' => $data['Id'],
                    // 'sfzh' => $data['sfzh'],
                    // 'name' => $data['name'],
                    'isLogin' => 1,
                ];
                return (bool)$session['xs_login']['isLogin'];
            }
        }
        return false;
    }
    public function actionIslogin()
    {
        if (Yii::$app->session['xs_login']['isLogin'] === 1) {
            return "1";
        }
        return "2";
    }
    public function actionGetxsinfo()
    {
        $session = Yii::$app->session;
        $id = $session['xs_login']['Id'];
        $sql = "Select * from xsgl_jcxx_xs_jbxx where Id=" . $id;
        $xsinfo = Yii::$app->db->createCommand($sql)->queryOne();;
        Yii::$app->response->format = Response::FORMAT_JSON;
        return $xsinfo;
    }
    public function actionLogout()
    {
        Yii::$app->session->removeAll();
        Yii::$app->session->destroy();
        if (!isset(Yii::$app->session['xs_login']['isLogin'])) {
            return "1";
        }
        return "2";
    }
    public function actionKsxk_get(){
        $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.kssj,a.jssj,a.zt,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.zt = '1';";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionKsxk_ck(){
        if (Yii::$app->request->isPost) {
        $post = Yii::$app->request->post();            
        $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.js,a.jsjs,a.kssj,a.jssj,a.zt,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.Id = :Id;";
        $data=Yii::$app->db->createCommand($sql,[':Id'=>$post['id']])->queryOne();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }
    }






} ?>
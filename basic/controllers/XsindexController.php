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
            $data = Yii::$app->db->createCommand($sql, [':un' => $post['username'], ':pw' => sha1($post['password'])])->queryOne();
            if (!$data) {
                return "2";//用户名或者密码验证错误！
            } else {
                $session = Yii::$app->session;
                $session['xs_login'] = [
                    'sfzh' => $data['sfzh'],
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
        $sfzh = $session['xs_login']['sfzh'];
        $sql = "Select * from xsgl_jcxx_xs_jbxx where sfzh='" . $sfzh."';";
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

//home 模块 
public function actionHome_ssb(){
    if (Yii::$app->request->isPost) {
    $post = Yii::$app->request->post(); 
    $sfzh = Yii::$app->session['xs_login']['sfzh'];
    $sql = "select max(tjsj) as tjsj from xspt_home_ssb where xs_sfzh = :sfzh;";
    $data=Yii::$app->db->createCommand($sql,[':sfzh'=>$sfzh])->queryOne();
    if(time()-strtotime($data['tjsj']) < 24*3600){
        return '2';
    }
    $sql = "INSERT xspt_home_ssb (nr,xs_sfzh) VALUES (:nr,:sfzh)";
    $data=Yii::$app->db->createCommand($sql,['nr'=>$post['nr'],':sfzh'=>$sfzh])->execute();
    return $data;
    }
}

    //校本课程 选课
    public function actionKsxk_get(){
        $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.kssj,a.jssj,a.zt,b.username,(select count(kc_id) from xsgl_xbkc_xk c where a.Id = c.kc_id) as ybrs FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.zt = '1';";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionKsxk_ck(){
        if (Yii::$app->request->isPost) {
        $post = Yii::$app->request->post();            
        $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.js,a.jsjs,a.kssj,a.jssj,a.zt,b.username,(select count(kc_id) from xsgl_xbkc_xk c where a.Id = c.kc_id) as ybrs FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.Id = :Id;";
        $data=Yii::$app->db->createCommand($sql,[':Id'=>$post['id']])->queryOne();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }
    }
    public function actionKsxk_xk(){
        if (Yii::$app->request->isPost) {
            $post = Yii::$app->request->post();
            $sfzh = Yii::$app->session['xs_login']['sfzh'];
        $sql = "SELECT * from xsgl_xbkc_xk where xs_sfzh = :sfzh and zt=1 or zt = 2;";
        $data = Yii::$app->db->createCommand($sql,[':sfzh'=>$sfzh])->queryOne();
        if($data){
            return '2';//验证是否已选课
        }
        $sql="SELECT a.Id,a.rs,(select count(kc_id) from xsgl_xbkc_xk b where a.Id = b.kc_id) as ybrs FROM xsgl_xbkc_mx as a where a.id = :id;";
        $data = Yii::$app->db->createCommand($sql,[':id'=>$post['id']])->queryOne();
        if($data['ybrs'] >= $data['rs']){
            return '3';//该课程已报满
        }
        $sql = "INSERT xsgl_xbkc_xk (xs_sfzh,kc_id,zt) VALUES (:xs_sfzh,:kc_id,:zt)";           
        $data=Yii::$app->db->createCommand($sql,[':xs_sfzh'=> $sfzh,':kc_id'=>$post['id'],':zt'=>1])->execute();
        return $data;
    }
    }
    //获取本人参加的课程
    public function actionCjkc_get(){
        $sfzh = Yii::$app->session['xs_login']['sfzh'];
        $sql = "SELECT a.*,b.Id,b.name,b.rs,b.kssj,b.jssj,b.zt,c.username FROM xsgl_xbkc_xk a left join xsgl_xbkc_mx b on a.kc_id = b.Id left join user c on b.user_id=c.Id where a.xs_sfzh = :sfzh;";
        $data=Yii::$app->db->createCommand($sql,[':sfzh'=>$sfzh])->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }
} ?>
<?php

namespace app\controllers;

use yii\web\Controller;
use Yii;

class CommonwxController extends Controller
{
//统一权限认证
    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }
        $controller = $action->controller->id;
        $actionName = $action->id;
        
        if ($actionName == 'login' || $actionName == 'wx_login'){ //login不需验证
            return true;
        }
        $sid = Yii::$app->request->headers->get('sessionid');		
		$sql = "select openid from wx_session where skey=:sid limit 1";
		$ifcz = Yii::$app->db->createCommand($sql, [':sid' => $sid])->queryOne();
		if($ifcz){
            return true;
}else{
    echo '未登录';
         return false;
}
        // if (Yii::$app->user->can($controller. '/*')) {
        //     return true;
        // }
        // if (Yii::$app->user->can($controller. '/'. $actionName)) {
        //     return true;
        // }
        // throw new \yii\web\UnauthorizedHttpException('对不起，您没有访问'. $controller. '/'. $actionName. '的权限');
        //  return 'false';
        
    }
    public function init()
    {
   
    }
 
}

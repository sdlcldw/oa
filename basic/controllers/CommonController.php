<?php

namespace app\controllers;

use yii\web\Controller;
use Yii;

class CommonController extends Controller
{
 


    public function beforeAction($action)
    {
        // if (!parent::beforeAction($action)) {
        //     return false;
        // }
        // $controller = $action->controller->id;
        // $actionName = $action->id;
        // if (Yii::$app->admin->can($controller. '/*')) {
        //     return true;
        // }
        // if (Yii::$app->admin->can($controller. '/'. $actionName)) {
        //     return true;
        // }
        // throw new \yii\web\UnauthorizedHttpException('对不起，您没有访问'. $controller. '/'. $actionName. '的权限');
         return true;
    }

    public function init()
    {
        // var_dump(Yii::$app->controller);
        // exit;
        // 获取当前用户要访问的控制器名称和方法名称 index.php?r=admin/user/del
        // category/* caretory/add
        /*if (Yii::$app->session['admin']['isLogin'] != 1) {
            return $this->redirect(['/admin/public/login']);
        }*/
    }
}

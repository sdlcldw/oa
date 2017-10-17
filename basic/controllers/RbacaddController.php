<?php
namespace app\controllers;

use Yii;
use app\controllers\CommonController;



//一键添加所有rbac权限。
class RbacaddController extends CommonController
{

    // yii rbac/init
    // category/* category/add category/delete

    public function actionInit()
    {
        $trans = Yii::$app->db->beginTransaction();
        try {
            $dir = dirname(__FILE__);
            $controllers = glob($dir. '/*');
            $permissions = [];
            foreach ($controllers as $controller) {
                $content = file_get_contents($controller);
                preg_match('/class ([a-zA-Z]+)Controller/', $content, $match);
                $cName = $match[1];
                if($cName=='Common' || $cName=='Site'){    
                    continue;// 跳出本次循环  
                } 
                $permissions[] = strtolower($cName. '/*');
                preg_match_all('/public function action([a-zA-Z_]+)/', $content, $matches);
                foreach ($matches[1] as $aName) {
                    $permissions[] = strtolower($cName. '/'. $aName);
                }
            }
            $auth = Yii::$app->authManager;
            foreach ($permissions as $permission) {
                if (!$auth->getPermission($permission)) {
                    $obj = $auth->createPermission($permission);
                    $obj->description = $permission;
                    $auth->add($obj);
                }
            }
            $trans->commit();
            echo "import success \n";
        } catch(\Exception $e) {
            $trans->rollback();
            echo "import failed \n";
        }
    }

}
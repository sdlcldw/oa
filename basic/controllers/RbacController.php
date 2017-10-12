<?php
// namespace app\commands;
namespace app\controllers;

use yii\web\Response; 
use Yii;
use yii\web\Controller;

class RbacController extends Controller
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    public function actionAdd_js(){
        
        if(Yii::$app->request->isPost){
        $auth = Yii::$app->authManager;
        $role = $auth->createRole(null);
        $post = Yii::$app->request->post();
        $role->name = $post['name'] ;
        $role->description = $post['description'];
        $role->ruleName = empty($post['rule_name']) ? null : $post['rule_name'];
        $role->data = empty($post['data']) ? null : $post['data'];
        if($auth->add($role)){
            return true;
        }
        }
        return false;
    }
    public function actionGet_js(){
        $sql = "SELECT * FROM auth_item where type = '1'";
        $connection=Yii::$app->db;
       $command=$connection->createCommand($sql);
       $dataReader=$command->query();
       $dataReader=$dataReader->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataReader;
    }
    public function actionGet_item(){
        if(Yii::$app->request->isPost){
        $return = [];
        $return['rolesall'] = [];
        $return['permissionsall']=[];
        $return['roles'] = [];
        $return['permissions']=[];

        $jsname = Yii::$app->request->post();

        $sql = "SELECT name,description,type FROM auth_item";
        $connection=Yii::$app->db;
        $qxall=$connection->createCommand($sql)->query()->readAll();//获取所有角色和权限
        foreach ($qxall as $qx){
            // if($qx->type ==1){
                array_push($return['rolesall'],$qx);
                
            // }else{
                // $return['permissionsall'][] = $qx;            
            // }
        }
        
       
    //    $children = Yii::$app->authManager->getChildren($jsname['js']);//获取当前角色所有权限和角色
    //    foreach ($children as $obj){
    //        if($obj->type ==1){
    //            $return['roles'][] = $obj->name;
    //        }else{
    //            $return['permissions'][] = $obj->name;            
    //        }
    //    }
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $return;
        }
        
    }
    public function actionInit()
    {
        // $auth = Yii::$app->authManager;

        // // 添加 "createPost" 权限
        // $createPost = $auth->createPermission('createPost');
        // $createPost->description = 'Create a post';
        // $auth->add($createPost);

        // // 添加 "updatePost" 权限
        // $updatePost = $auth->createPermission('updatePost');
        // $updatePost->description = 'Update post';
        // $auth->add($updatePost);

        // // 添加 "author" 角色并赋予 "createPost" 权限
        // $author = $auth->createRole('author');
        // $auth->add($author);
        // $auth->addChild($author, $createPost);

        // // 添加 "admin" 角色并赋予 "updatePost" 
		// // 和 "author" 权限
        // $admin = $auth->createRole('admin');
        // $auth->add($admin);
        // $auth->addChild($admin, $updatePost);
        // $auth->addChild($admin, $author);

        // // 为用户指派角色。其中 1 和 2 是由 IdentityInterface::getId() 返回的id （译者注：user表的id）
        // // 通常在你的 User 模型中实现这个函数。
        // $auth->assign($author, 2);
        // $auth->assign($admin, 1);
    }
}
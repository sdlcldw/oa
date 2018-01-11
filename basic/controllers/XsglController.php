<?php

namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;
use phpexcel;
use phpexcel_IOFactory;
use PHPExcel_Style_Alignment;
use app\controllers\CommonController;

class XsglController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
  
    //年级部管理
    public function actionJcxxsz_get_njb(){
        $sqlw = "SELECT a.*,b.username FROM xsgl_jcxx_njb as a left join user as b on a.user_id_fzr = b.id";
        $sqlt = "SELECT a.*,b.username FROM xsgl_jcxx_njb as a left join user as b on a.user_id_xtgly = b.id";
        $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
        $datat=Yii::$app->db->createCommand($sqlt)->query()->readAll();
        for($i=0;$i<count($dataw);++$i){
            $dataw[$i]['xtgly'] = $datat[$i]['username'];
            } 
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $dataw;
    }
    public function actionJcxxsz_add_njb(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_njb (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_njb(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_njb WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    

    public function actionJcxxsz_get_users(){
        $sql = "SELECT Id,username FROM user";
     $data=Yii::$app->db->createCommand($sql)->query()->readAll();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $data;
    }

    public function actionJcxxsz_njb_swfzr(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_fzr=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    public function actionJcxxsz_njb_swgly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_xtgly=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }

//班级管理
    public function actionJcxxsz_get_bj(){
        $session = Yii::$app->session;
        $id = $session['__id'];
        $sql="select * from xsgl_jcxx_njb where user_id_xtgly='".$id."';";
        $command = Yii::$app->db->createCommand($sql)->queryOne();
        if(!$command){
       Yii::$app->response->format=Response::FORMAT_JSON;       
            return array('2');
        }

        $sqlw = "SELECT a.*,b.name as njb_name FROM xsgl_jcxx_bj as a left join xsgl_jcxx_njb as b on a.njb_id = b.id where a.njb_id = '".$command['Id']."';";
        $sqlt = "SELECT a.*,b.username FROM xsgl_jcxx_bj as a left join user as b on a.user_id_bzr = b.id where a.njb_id = '".$command['Id']."';";
        $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
        $datat=Yii::$app->db->createCommand($sqlt)->query()->readAll();
        for($i=0;$i<count($dataw);++$i){
            $dataw[$i]['bzr'] = $datat[$i]['username'];
            } 
        $data['dqnjb'] = $command;
        $data['bj']= $dataw;
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionJcxxsz_add_bj(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_bj (name,njb_id) VALUES ('".$post['name']."','".$post['dqnjbid']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_bj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_bj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    public function actionJcxxsz_bj_swbzr(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_bj SET user_id_bzr=".$post['userid']." WHERE Id =".$post['bjid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }

    // 宿舍管理 --楼宇管理
    public function actionJcxxsz_get_ly(){
        $sql = "SELECT * FROM xsgl_jcxx_ss_ly ;";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionJcxxsz_add_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_ly (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_ly WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
//--楼层管理
    public function actionJcxxsz_get_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_lc where ly_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_lc (name,ly_id) VALUES ('".$post['name']."','".$post['ly_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_lc WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --房间管理
    public function actionJcxxsz_get_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_fj where lc_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_fj (name,lc_id) VALUES ('".$post['name']."','".$post['lc_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_fj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --床位管理
    public function actionJcxxsz_get_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_cw where fj_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionJcxxsz_add_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_cw (name,fj_id) VALUES ('".$post['name']."','".$post['fj_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionJcxxsz_del_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_cw WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
// 学生基本信息管理
public function actionJcxxsz_xsjbxx_get_bj(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_bj where njb_id = '".$post['njbid']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}
public function actionJcxxsz_xsjbxx_get_ss_ly(){
    $sql = "SELECT * FROM xsgl_jcxx_ss_ly ;";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
}
public function actionJcxxsz_xsjbxx_get_ss_lc(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_lc where ly_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}    
public function actionJcxxsz_xsjbxx_get_ss_fj(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_fj where lc_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}
public function actionJcxxsz_xsjbxx_get_ss_cw(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_cw where fj_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}

public function actionJcxxsz_xsjbxx_add(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "INSERT xsgl_jcxx_xs_jbxx (name,xjh,xb,sfzh,sg,tz,mz,jg,jtzz,bj_id,sfzx,ss_cw_id,gx_1,xm_1,zzmm_1,gzdw_1,lxfs_1,gx_2,xm_2,zzmm_2,gzdw_2,lxfs_2) VALUES ('".$post['name']."','".$post['xjh']."','".$post['xb']."','".$post['sfzh']."','".$post['sg']."','".$post['tz']."','".$post['mz']."','".$post['jg']."','".$post['jtzz']."','".$post['szbj']."','".$post['sfzx']."','".$post['szss']."','".$post['gx_1']."','".$post['xm_1']."','".$post['zzmm_1']."','".$post['gzdw_1']."','".$post['lxfs_1']."','".$post['gx_2']."','".$post['xm_2']."','".$post['zzmm_2']."','".$post['gzdw_2']."','".$post['lxfs_2']."')";
        $ifok = Yii::$app->db->createCommand($sql)->execute();                   
        return $ifok;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $post;
}
}


public function actionJcxxsz_xsjbxx_get_lb(){
    $sqlw = "SELECT a.*,b.name as bj_name,c.name as njb_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
public function actionJcxxsz_xsjbxx_del(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "DELETE FROM xsgl_jcxx_xs_jbxx WHERE Id ='".$post['id']."'";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
       return $ifok;
    }
}
public function actionJcxxsz_xsjbxx_get(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.name as szbj,c.name as njb_name,d.name as szss,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.Id ='".$post['id']."'";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
        Yii::$app->response->format=Response::FORMAT_JSON;
        
         return $data;
    }
}
public function actionJcxxsz_xsjbxx_edit(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post(); 
$sql = "UPDATE xsgl_jcxx_xs_jbxx SET name='".$post['name']."',sfzh='".$post['sfzh']."',xjh='".$post['xjh']."',jg='".$post['jg']."',jtzz='".$post['jtzz']."',mz='".$post['mz']."',sfzx='".$post['sfzx']."',sg='".$post['sg']."',tz='".$post['tz']."',xb='".$post['xb']."',gx_1='".$post['gx_1']."',xm_1='".$post['xm_1']."',zzmm_1='".$post['zzmm_1']."',gzdw_1='".$post['gzdw_1']."',lxfs_1='".$post['lxfs_1']."',gx_2='".$post['gx_2']."',xm_2='".$post['xm_2']."',zzmm_2='".$post['zzmm_2']."',gzdw_2='".$post['gzdw_2']."',lxfs_2='".$post['lxfs_2']."' WHERE Id =".$post['Id'].";";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
       return $ifok;
    }
}

public function actionJcxxsz_xsjbxx_ck_get(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.name as bj_name,c.name as njb_name,d.name as cw_name,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.Id ='".$post['id']."'";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $data;
    }
}
//学生成长记录
public function actionXsczjl_zjjl_get(){
    $session = Yii::$app->session;
    $id = $session['__id'];
    $sql="select a.Id,a.name as bj_name,b.name as njb_name from xsgl_jcxx_bj as a left join xsgl_jcxx_njb as b on a.njb_id = b.id where a.user_id_bzr='".$id."';";
    $command = Yii::$app->db->createCommand($sql)->queryOne();
    if(!$command){
   Yii::$app->response->format=Response::FORMAT_JSON;       
        return array('2');
    }
    $sql = "SELECT * FROM xsgl_jcxx_xs_jbxx where bj_id = '".$command['Id']."';";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
    $datas['bm'] = $command;
    $datas['xs'] = $data;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $datas;
}
public function actionXsczjl_zjjl_add_wj(){
    
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_wj (xjh,sj,lhxf,ms,user_id_czr) VALUES ('".$post['xjh']."','".$post['sj']."','".$post['lhxf']."','".$post['ms']."','".$id."')";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $ifok;
    }
    
    }  
public function actionXsczjl_zjjl_add_ry(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_ry (xjh,sj,lhxf,ms,user_id_czr) VALUES ('".$post['xjh']."','".$post['sj']."','".$post['lhxf']."','".$post['ms']."','".$id."')";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $ifok;
    }
}    

public function actionXsczjl_ckjl_get_njb(){
    $sql = "SELECT * FROM xsgl_jcxx_njb";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
}

public function actionXsczjl_ckjl_get_bj(){
    if(Yii::$app->request->isPost){  
    $post = Yii::$app->request->post();        
    $sql = "SELECT * FROM xsgl_jcxx_bj where njb_id ='".$post['id']."';";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}
public function actionXsczjl_ckjl_xsxx_bj(){
    if(Yii::$app->request->isPost){  
    $post = Yii::$app->request->post();        
    $sql = "SELECT * FROM xsgl_jcxx_xs_jbxx where bj_id ='".$post['id']."';";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
    if(!$data){
        return '2';
    }
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}
public function actionXsczjl_ckjl_xsxx_name(){
    if(Yii::$app->request->isPost){  
    $post = Yii::$app->request->post();        
    $sql = "SELECT * FROM xsgl_jcxx_xs_jbxx where name ='".$post['name']."';";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
    if(!$data){
        return '2';
    }
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}

public function actionXsczjl_ckjl_ckxq(){
    if(Yii::$app->request->isPost){
    $post = Yii::$app->request->post();        
    $sql = "SELECT a.*,b.name as bj_name,c.name as njb_name,d.name as cw_name,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.xjh ='".$post['xjh']."'";
    $jbxx = Yii::$app->db->createCommand($sql)->queryOne();    
    $sql = "SELECT * FROM xsgl_czjl_wj where xjh ='".$post['xjh']."';";
    $wj=Yii::$app->db->createCommand($sql)->query()->readAll();
    $sql = "SELECT * FROM xsgl_czjl_ry where xjh ='".$post['xjh']."';";
    $ry=Yii::$app->db->createCommand($sql)->query()->readAll();
    $data['jbxx'] = $jbxx;
    $data['wj'] = $wj;
    $data['ry'] = $ry;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}





















}?>
<?php

namespace app\controllers;
use yii\web\Controller;
use Yii;
use yii\web\Response; 
use yii\data\Pagination;
use phpexcel;
use phpexcel_IOFactory;
use PHPExcel_Style_Alignment;
use PHPExcel_Style_Color;
use app\controllers\CommonController;

class XsglController extends CommonController
{
    public $enableCsrfValidation = false;// ->覆盖父类的属性
    //年级部管理
    public function actionNjbsz_get(){
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
    public function actionNjbsz_add_njb(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_njb (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionNjbsz_del_njb(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_njb WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    

    public function actionNjbsz_get_users(){
        $sql = "SELECT Id,username FROM user";
     $data=Yii::$app->db->createCommand($sql)->query()->readAll();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $data;
    }

    public function actionNjbsz_njb_swfzr(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_fzr=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();

            $sql ="SELECT user_id_fzr FROM xsgl_jcxx_njb;";
            $fzr_data=Yii::$app->db->createCommand($sql)->query()->readAll();//获取所有负责人数组
            $sql = "DELETE FROM auth_assignment WHERE item_name ='njbfzr'";
            $ifok = Yii::$app->db->createCommand($sql)->execute(); //删除所有负责人角色
        
            $sqlt = "INSERT INTO auth_assignment(item_name,user_id) VALUES";
        
            foreach($fzr_data as $data){ //避免插入重复数据
                if(strstr($sqlt,"'".$data['user_id_fzr']."'")){
                    continue; 
                }
                $sqlt.= "('njbfzr','". $data['user_id_fzr']."'),";
            }
            $sqlt = rtrim($sqlt,',');
            $ifok = Yii::$app->db->createCommand($sqlt)->execute();//设置所有负责人角色
            return 1;
         }
        }
    public function actionNjbsz_njb_swgly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post(); 
    $sql = "UPDATE xsgl_jcxx_njb SET user_id_xtgly=".$post['userid']." WHERE Id =".$post['njbid'].";";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
          

           $sql ="SELECT user_id_xtgly FROM xsgl_jcxx_njb;";
           $gly_data=Yii::$app->db->createCommand($sql)->query()->readAll();//获取所有管理员数组
       
           $sql = "DELETE FROM auth_assignment WHERE item_name ='njbgly'";
           $ifok = Yii::$app->db->createCommand($sql)->execute(); //删除所有管理员角色
       
           $sqlt = "INSERT INTO auth_assignment(item_name,user_id) VALUES";
       
           foreach($gly_data as $data){ //避免插入重复数据
               if(strstr($sqlt,"'".$data['user_id_xtgly']."'")){
                   continue; 
               }
               $sqlt.= "('njbgly','". $data['user_id_xtgly']."'),";
           }
           $sqlt = rtrim($sqlt,',');
           $ifok = Yii::$app->db->createCommand($sqlt)->execute();//设置所有gly角色
           return 1;
        }
    }

//班级管理
    public function actionBjsz_get_bj(){
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

    public function actionBjsz_add_bj(){
        
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_bj (name,njb_id) VALUES ('".$post['name']."','".$post['dqnjbid']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionBjsz_del_bj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_bj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    
    public function actionBjsz_bj_swbzr(){ //设为班主任
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
  
    $sql = "UPDATE xsgl_jcxx_bj SET user_id_bzr=".$post['userid']." WHERE Id =:id;";
            $ifok = Yii::$app->db->createCommand($sql,[':id'=>$post['bjid']])->execute();//设置本班班主任

    $sql ="SELECT user_id_bzr FROM xsgl_jcxx_bj;";
    $bzr_data=Yii::$app->db->createCommand($sql)->query()->readAll();//获取所有班主任数组

    $sql = "DELETE FROM auth_assignment WHERE item_name ='bzr'";
    $ifok = Yii::$app->db->createCommand($sql)->execute(); //删除所有班主任角色

    $sqlt = "INSERT INTO auth_assignment(item_name,user_id) VALUES";

    foreach($bzr_data as $data){ //避免插入重复数据
        if(strstr($sqlt,"'".$data['user_id_bzr']."'")){
            continue; 
        }
        $sqlt.= "('bzr','". $data['user_id_bzr']."'),";
    }
    $sqlt = rtrim($sqlt,',');
    $ifok = Yii::$app->db->createCommand($sqlt)->execute();//设置所有班主任角色
    return '3';
        }
    }


    public function actionBjsz_get_users(){
        $sql = "SELECT Id,username FROM user";
     $data=Yii::$app->db->createCommand($sql)->query()->readAll();
                Yii::$app->response->format=Response::FORMAT_JSON;
                return $data;
    }

    // 宿舍管理 --楼宇管理
    public function actionSssz_get_ly(){
        $sql = "SELECT * FROM xsgl_jcxx_ss_ly ;";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
    }

    public function actionSssz_add_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_ly (name) VALUES ('".$post['name']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionSssz_del_ly(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_ly WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
//--楼层管理
    public function actionSssz_get_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_lc where ly_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionSssz_add_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_lc (name,ly_id) VALUES ('".$post['name']."','".$post['ly_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionSssz_del_lc(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_lc WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --房间管理
    public function actionSssz_get_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_fj where lc_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionSssz_add_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_fj (name,lc_id) VALUES ('".$post['name']."','".$post['lc_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionSssz_del_fj(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_fj WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
    // --床位管理
    public function actionSssz_get_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();            
            $lyid= $post['id'];
        $sql = "SELECT * FROM xsgl_jcxx_ss_cw where fj_id = ".$lyid.";";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
       Yii::$app->response->format=Response::FORMAT_JSON;
        return $data;
        }
    }
    public function actionSssz_add_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "INSERT xsgl_jcxx_ss_cw (name,fj_id) VALUES ('".$post['name']."','".$post['fj_id']."')";
            $ifok = Yii::$app->db->createCommand($sql)->execute();                   
           return $ifok;
        }
    }
    public function actionSssz_del_cw(){
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $sql = "DELETE FROM xsgl_jcxx_ss_cw WHERE Id ='".$post['id']."'";
            $ifok = Yii::$app->db->createCommand($sql)->execute();
           return $ifok;
        }
    }
// 学生基本信息管理
public function actionXsjbxx_get_bj(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_bj where njb_id = '".$post['njbid']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}
public function actionXsjbxx_get_ss_ly(){
    $sql = "SELECT * FROM xsgl_jcxx_ss_ly ;";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
}
public function actionXsjbxx_get_ss_lc(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_lc where ly_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}    
public function actionXsjbxx_get_ss_fj(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_fj where lc_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}
public function actionXsjbxx_get_ss_cw(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
    $sqlw = "SELECT * FROM xsgl_jcxx_ss_cw where fj_id = '".$post['id']."';";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
}

public function actionXsjbxx_add(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "INSERT xsgl_jcxx_xs_jbxx (name,cz_xjh,xb,sfzh,sg,tz,mz,jg,jtzz,bj_id,sfzx,ss_cw_id,gx_1,xm_1,zzmm_1,gzdw_1,lxfs_1,gx_2,xm_2,zzmm_2,gzdw_2,lxfs_2,password) VALUES (:name,:cz_xjh,:xb,:sfzh,:sg,:tz,:mz,:jg,:jtzz,:szbj,:sfzx,:szss,:gx_1,:xm_1,:zzmm_1,:gzdw_1,:lxfs_1,:gx_2,:xm_2,:zzmm_2,:gzdw_2,:lxfs_2,:password)";
        $ifok = Yii::$app->db->createCommand($sql,[':name'=>$post['name'],':cz_xjh'=>$post['xjh'],':xb'=>$post['xb'],':sfzh'=>$post['sfzh'],':sg'=>$post['sg'],':tz'=>$post['tz'],':mz'=>$post['mz'],':jg'=>$post['jg'],':jtzz'=>$post['jtzz'],':szbj'=>$post['szbj'],':sfzx'=>$post['sfzx'],':szss'=>$post['szss'],':gx_1'=>$post['gx_1'],':xm_1'=>$post['xm_1'],':zzmm_1'=>$post['zzmm_1'],':gzdw_1'=>$post['gzdw_1'],':lxfs_1'=>$post['lxfs_1'],':gx_2'=>$post['gx_2'],':xm_2'=>$post['xm_2'],':zzmm_2'=>$post['zzmm_2'],':gzdw_2'=>$post['gzdw_2'],':lxfs_2'=>$post['lxfs_2'],':password'=>sha1(substr($post['sfzh'],-6))])->execute();                   
        return $ifok;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $post;
}
}


public function actionXsjbxx_get_lb(){
    $sqlw = "SELECT a.*,b.name as bj_name,c.name as njb_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
public function actionXsjbxx_del(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "DELETE FROM xsgl_jcxx_xs_jbxx WHERE Id ='".$post['id']."'";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
       return $ifok;
    }
}
public function actionXsjbxx_get(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.name as szbj,c.name as njb_name,d.name as szss,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.Id ='".$post['id']."'";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
        Yii::$app->response->format=Response::FORMAT_JSON;
        
         return $data;
    }
}
public function actionXsjbxx_edit(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post(); 
$sql = "UPDATE xsgl_jcxx_xs_jbxx SET name='".$post['name']."',sfzh='".$post['sfzh']."',xjh='".$post['xjh']."',jg='".$post['jg']."',jtzz='".$post['jtzz']."',mz='".$post['mz']."',sfzx='".$post['sfzx']."',sg='".$post['sg']."',tz='".$post['tz']."',xb='".$post['xb']."',gx_1='".$post['gx_1']."',xm_1='".$post['xm_1']."',zzmm_1='".$post['zzmm_1']."',gzdw_1='".$post['gzdw_1']."',lxfs_1='".$post['lxfs_1']."',gx_2='".$post['gx_2']."',xm_2='".$post['xm_2']."',zzmm_2='".$post['zzmm_2']."',gzdw_2='".$post['gzdw_2']."',lxfs_2='".$post['lxfs_2']."' WHERE Id =".$post['Id'].";";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
       return $ifok;
    }
}

public function actionXsjbxx_ck_get(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.name as bj_name,c.name as njb_name,d.name as cw_name,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.Id ='".$post['id']."'";
        $data=Yii::$app->db->createCommand($sql)->query()->readAll();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $data;
    }
}

public function actionXsjbxx_demo_excel(){
    $sql = "SELECT a.*,b.name as njb_name FROM xsgl_jcxx_bj as a left join xsgl_jcxx_njb as b on a.njb_id = b.id";
    $connection=Yii::$app->db;
   $command=$connection->createCommand($sql);
   $dataReader=$command->query();
   $dataReader=$dataReader->readAll();
        // $dir = dirname(__FILE__);//获取当前目录
        $excel = new PHPExcel();
        $sheet = $excel->getActiveSheet();
        $sheet->setTitle("学生信息");
        $sheet->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER);//设置默认水平居中和垂直居中。
        $sheet->getStyle("A1:Z2")->getFont()->setBold(True);
        $sheet->getStyle("A1:Z2")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED); 
        $sheet->getStyle("A1:Z1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);//水平居右 
        $sheet->setCellValue("A1","格式要求：1.红色表头不许修改，只需按表头格式在第3行开始填写、粘贴学生信息即可。2.请确保信息完整，姓名、身份证、班级为必填项。3.班级处填写班级对应的Id号（在班级id表查）4.宿舍可为空");
        $sheet->setCellValue("A2","姓名")->setCellValue("B2","学籍号_初中")->setCellValue("C2","性别")->setCellValue("D2","身份证号")->setCellValue("E2","身高")->setCellValue("F2","体重")->setCellValue("G2","民族")->setCellValue("H2","籍贯")->setCellValue("I2","家庭住址")->setCellValue("J2","所在班级")->setCellValue("K2","是否住校（是或否）")->setCellValue("L2","关系")->setCellValue("M2","姓名")->setCellValue("N2","政治面貌")->setCellValue("O2","工作单位")->setCellValue("P2","联系方式")->setCellValue("Q2","关系")->setCellValue("R2","姓名")->setCellValue("S2","政治面貌")->setCellValue("T2","工作单位")->setCellValue("U2","联系方式");
       $excel->createSheet();//创建sheet
       $excel->setActiveSheetIndex(1);//设置活动sheet
        $sheett = $excel->getActiveSheet();//获取当前活动sheet
        $sheett->setTitle("班级Id表");
        $sheett->setCellValue("A1","班级Id")->setCellValue("B1","年级部")->setCellValue("C1","班级");
        foreach ($dataReader as $row=>$v){
            $line = $row+2;
            $sheett->setCellValue("A".$line,$dataReader[$row]['Id'])
                   ->setCellValue("B".$line,$dataReader[$row]['njb_name'])
                   ->setCellValue("C".$line,$dataReader[$row]['name']);
            }
            $excel->setActiveSheetIndex(0);//设置活动sheet
        $writer = PHPExcel_IOFactory::createWriter($excel,"Excel2007");//生成excel文件
        // $writer->save($dir."/zc.xlsx");//保存文件
        header('Content-Type:application/vnd.openxmiformats-officedocument.spreadsheetml,sheet');//excel2007
        header('Content-Disposition:attachment;filename="学生信息excel导入模板.xlsx"');//告诉浏览器将输出文件的名称
        header('Cache-Control:max-age=0');//禁止缓存
        $writer->save("php://output");//输出到浏览器
}
public function actionXsjbxx_up_excel(){
    Yii::$app->response->format=Response::FORMAT_JSON;
          $objphpexcel = phpexcel_IOFactory::load($_FILES['excel']['tmp_name']);
           $sheetCount=$objphpexcel->getSheetCount();
           // 取数据
               $sheet = $objphpexcel->getSheet(0);
              $highestRow = $sheet->getHighestRow(); // 取得总行数
              $highestColumn = $sheet->getHighestColumn(); // 取得总列数
  
              //**检查格式是否正确↓↓
              $bt=array("姓名","学籍号_初中","性别","身份证号","身高","体重","民族","籍贯","家庭住址","所在班级","是否住校（是或否）","关系","姓名","政治面貌","工作单位","联系方式","关系","姓名","政治面貌","工作单位","联系方式");
              $zj=0;
              foreach(range('A','U') as $v){
              $bj = $sheet->getCell($v.'2')->getValue();	
                  if ($bj != $bt[$zj]){
                      return ['rt' => 'gs','data'=> '表头格式错误，请按模板要求修改后再试'];
                  }
                      $zj++;
              }
    $sql = 'insert into xsgl_jcxx_xs_jbxx values ';
      for($y=3;$y<=$highestRow;$y++){
        if(!$sheet->getCell("A".$y)->getValue()){break;}
        $d=$sheet->getCell("D".$y)->getValue();
        if(strlen($d)!=18){
            return ['rt' => 'gs','data'=> '身份证号错误：行号'.$y];
        }
        
        $sql.="('','"
        .$sheet->getCell("A".$y)->getValue()."','"
        .$sheet->getCell("B".$y)->getValue()."','"
        .$sheet->getCell("C".$y)->getValue()."','"
        .$d."','"
        .$sheet->getCell("E".$y)->getValue()."','"
        .$sheet->getCell("F".$y)->getValue()."','"
        .$sheet->getCell("G".$y)->getValue()."','"
        .$sheet->getCell("H".$y)->getValue()."','"
        .$sheet->getCell("Y".$y)->getValue()."','"
        .$sheet->getCell("J".$y)->getValue()."','"
        .$sheet->getCell("K".$y)->getValue()."','','"
        .$sheet->getCell("L".$y)->getValue()."','"
        .$sheet->getCell("M".$y)->getValue()."','"
        .$sheet->getCell("N".$y)->getValue()."','"
        .$sheet->getCell("O".$y)->getValue()."','"
        .$sheet->getCell("P".$y)->getValue()."','"
        .$sheet->getCell("Q".$y)->getValue()."','"
        .$sheet->getCell("R".$y)->getValue()."','"
        .$sheet->getCell("S".$y)->getValue()."','"
        .$sheet->getCell("T".$y)->getValue()."','"
        .$sheet->getCell("U".$y)->getValue()."','"
        .sha1(substr($d,-6))."'),";
    }
    $sql = rtrim($sql,',');
    $sql.=';'; 
      $data = Yii::$app->db->createCommand($sql)->execute();
      return ['rt' => 'cg','data'=> $data];	
}


//学生成长记录
public function actionZjjl_get(){
    Yii::$app->response->format=Response::FORMAT_JSON;
    $session = Yii::$app->session;
    $id = $session['__id'];

    $sql="select a.sfzh,a.name,a.xb,b.name as bj,c.name as njb from xsgl_jcxx_xs_jbxx a left join xsgl_jcxx_bj b on a.bj_id=b.Id left join xsgl_jcxx_njb c on b.njb_id=c.Id where bj_id in (SELECT Id FROM xsgl_jcxx_bj where njb_id in (select Id from xsgl_jcxx_njb where user_id_xtgly = :id));"; //
    $dataw=Yii::$app->db->createCommand($sql,[':id'=>$id])->query()->readAll();
    if(!empty($dataw)){  //如果不为空则为系统管理员
        $data['sf'] = '年级部系统管理员';
        $data['czfw'] = '年级部全体学生';
        $data['xs'] = $dataw;
        return $data;
    }else{
    $sql="select a.Id,a.name as bj_name,b.name as njb_name from xsgl_jcxx_bj as a left join xsgl_jcxx_njb as b on a.njb_id = b.id where a.user_id_bzr='".$id."';";
    $command = Yii::$app->db->createCommand($sql)->queryOne();
    $sql = "SELECT a.sfzh,a.name,a.xb,b.name as bj,c.name as njb FROM xsgl_jcxx_xs_jbxx a left join xsgl_jcxx_bj b on a.bj_id=b.Id left join xsgl_jcxx_njb c on b.njb_id=c.Id where a.bj_id ='".$command['Id']."';";
    $datat=Yii::$app->db->createCommand($sql)->query()->readAll();
    $data['sf'] = $command['njb_name']."—".$command['bj_name']."班主任";
    $data['czfw'] = $command['njb_name']."—".$command['bj_name'].'全体学生';
    $data['xs'] = $datat;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
       

  
}
public function actionZjjl_add_wj(){
    
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sj = gmdate('Y-m-d',strtotime($post['sj']) + 8*3600); //将标准时间转换为东八区时间
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_wj (sfzh,sj,lhxf,ms,user_id_czr) VALUES (:sfzh,:sj,:lhxf,:ms,:id)";
        $ifok = Yii::$app->db->createCommand($sql,[':sfzh'=>$post['sfzh'],':sj'=>$sj,':lhxf'=>$post['lhxf'],':ms'=>$post['ms'],':id'=>$id])->execute();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $ifok;
    }
    }  
public function actionZjjl_add_ry(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sj = gmdate('Y-m-d',strtotime($post['sj']) + 8*3600); //将标准时间转换为东八区时间        
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_ry (sfzh,sj,lhxf,ms,user_id_czr) VALUES (:sfzh,:sj,:lhxf,:ms,:id)";
        $ifok = Yii::$app->db->createCommand($sql,[':sfzh'=>$post['sfzh'],':sj'=>$sj,':lhxf'=>$post['lhxf'],':ms'=>$post['ms'],':id'=>$id])->execute();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $ifok;
    }
}    

public function actionCkjl_get_njb(){
    $sql = "SELECT * FROM xsgl_jcxx_njb";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
}

public function actionCkjl_get_bj(){
    if(Yii::$app->request->isPost){  
    $post = Yii::$app->request->post();        
    $sql = "SELECT * FROM xsgl_jcxx_bj where njb_id ='".$post['id']."';";
    $data=Yii::$app->db->createCommand($sql)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}
public function actionCkjl_xsxx_bj(){
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
public function actionCkjl_xsxx_name(){
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

public function actionCkjl_ckxq(){
    if(Yii::$app->request->isPost){
    $post = Yii::$app->request->post();        
    $sql = "SELECT a.*,b.name as bj_name,c.name as njb_name,d.name as cw_name,e.name as fj_name,f.name as lc_name,g.name as ly_name FROM xsgl_jcxx_xs_jbxx as a left join xsgl_jcxx_bj as b on a.bj_id = b.id left join xsgl_jcxx_njb as c on b.njb_id = c.id left join xsgl_jcxx_ss_cw as d on a.ss_cw_id = d.id left join xsgl_jcxx_ss_fj as e on d.fj_id = e.id left join xsgl_jcxx_ss_lc as f on e.lc_id = f.id left join xsgl_jcxx_ss_ly as g on f.ly_id = g.id WHERE a.sfzh = :sfzh";
    $jbxx = Yii::$app->db->createCommand($sql,[':sfzh'=>$post['sfzh']])->queryOne();    
    $sql = "SELECT * FROM xsgl_czjl_wj where sfzh = :sfzh;";
    $wj=Yii::$app->db->createCommand($sql,[':sfzh'=>$post['sfzh']])->query()->readAll();
    $sql = "SELECT * FROM xsgl_czjl_ry where sfzh = :sfzh;";
    $ry=Yii::$app->db->createCommand($sql,[':sfzh'=>$post['sfzh']])->query()->readAll();
    $data['jbxx'] = $jbxx;
    $data['wj'] = $wj;
    $data['ry'] = $ry;
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $data;
    }
}

//校本课程 
public function actionKcsz_get_lb(){
    $sqlw = "SELECT a.Id,a.name,a.user_id,a.rs,a.kssj,a.jssj,a.zt,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id;";
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
public function actionKcsz_add(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $kssj = gmdate('Y-m-d',strtotime($post['kksj'][0]) + 8*3600); //将标准时间转换为东八区时间
        $jssj = gmdate('Y-m-d',strtotime($post['kksj'][1]) + 8*3600); //将标准时间转换为东八区时间
        $sql = "INSERT xsgl_xbkc_mx (name,js,user_id,jsjs,rs,kssj,jssj,zt) VALUES (:name,:js,:jsid,:jsjs,:rs,:kssj,:jssj,:zt)";
        $ifok = Yii::$app->db->createCommand($sql,[':name'=>$post['name'],':js'=>$post['js'],':jsid'=>$post['jsid'],':jsjs'=>$post['jsjs'],':rs'=>$post['rs'],':kssj'=>$kssj,':jssj'=>$jssj,':zt'=>$post['zt']])->execute();                   
       return $ifok;
    }
}
public function actionKcsz_del(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "DELETE FROM xsgl_xbkc_mx WHERE Id ='".$post['Id']."'";
        $ifok = Yii::$app->db->createCommand($sql)->execute();                   
       return $ifok;
    }
}
public function actionKcsz_up(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "UPDATE xsgl_xbkc_xk SET zt=:zt WHERE kc_id =:kc_id;";  
        $ifok = Yii::$app->db->createCommand($sql,[':zt'=>$post['zt'],':kc_id'=>$post['Id']])->execute();              
        $kssj = gmdate('Y-m-d',strtotime($post['kksj'][0]) + 8*3600); //将标准时间转换为东八区时间
        $jssj = gmdate('Y-m-d',strtotime($post['kksj'][1]) + 8*3600); //将标准时间转换为东八区时间
        $sql = "UPDATE xsgl_xbkc_mx SET name=:name,js=:js,user_id=:jsid,jsjs=:jsjs,rs=:rs,kssj=:kssj,jssj=:jssj,zt=:zt WHERE Id =:Id;";
        $ifok = Yii::$app->db->createCommand($sql,[':name'=>$post['name'],':js'=>$post['js'],':jsid'=>$post['jsid'],':jsjs'=>$post['jsjs'],':rs'=>$post['rs'],':kssj'=>$kssj,':jssj'=>$jssj,':zt'=>$post['zt'],':Id'=>$post['Id']])->execute();                   
       return $ifok;
    }
}
public function actionKcsz_bj(){
   Yii::$app->response->format=Response::FORMAT_JSON;   
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.Id = :id;";
        $command = Yii::$app->db->createCommand($sql,[':id'=>$post['id']])->queryOne();                  
       return $command;
    }
}
public function actionKcsz_get_users(){ 
   $sql = "SELECT Id,username FROM user";
   $data=Yii::$app->db->createCommand($sql)->query()->readAll();
              Yii::$app->response->format=Response::FORMAT_JSON;
              return $data;
}

//选课结果
public function actionXkjg_xsmd_get(){
    if(Yii::$app->request->isPost){
   Yii::$app->response->format=Response::FORMAT_JSON;           
        $post = Yii::$app->request->post();
      $sql="SELECT a.kc_id,a.zt,b.name,b.xb,c.name bj,d.name njb from xsgl_xbkc_xk a left join xsgl_jcxx_xs_jbxx b on a.xs_id = b.Id left join xsgl_jcxx_bj c on b.bj_id = c.Id left join xsgl_jcxx_njb d on c.njb_id = d.Id where a.kc_id =:id;";
    $data=Yii::$app->db->createCommand($sql,[':id'=>$post['id']])->query()->readAll();
        return $data;
    
    
    }
 }

 public function actionXkjg_dcall(){
    $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.zt,b.username,(select count(kc_id) from xsgl_xbkc_xk c where a.Id = c.kc_id) as ybrs FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.zt = '1';";
   $kcdata=Yii::$app->db->createCommand($sql)->query()->readAll();//获取所有选课状态课程
   $excel = new PHPExcel();
   foreach ($kcdata as $row=>$v){
       $sql = "SELECT a.kc_id,a.zt,b.name,b.xb,c.name bj,d.name njb from xsgl_xbkc_xk a left join xsgl_jcxx_xs_jbxx b on a.xs_id = b.Id left join xsgl_jcxx_bj c on b.bj_id = c.Id left join xsgl_jcxx_njb d on c.njb_id = d.Id where a.kc_id =:id;";
        $xsmddata=Yii::$app->db->createCommand($sql,[':id'=>$kcdata[$row]['Id']])->query()->readAll();//获取当前课程学生名单
        if($row != 0){
            $excel->createSheet();//创建sheet
            $excel->setActiveSheetIndex($row);//设置活动sheet
        }
        $sheet = $excel->getActiveSheet();
        $sheet->setTitle($kcdata[$row]['name']);
        $sheet->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER);//设置默认水平居中和垂直居中。
        $sheet->getStyle("A1:E2")->getFont()->setBold(True);
        $sheet->mergeCells('A1:E1');
        $sheet->getStyle("A1")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED); 
        $sheet->getColumnDimension('A')->setWidth('15');
        $sheet->getColumnDimension('B')->setWidth('20');
        $sheet->getColumnDimension('C')->setWidth('20');
        $sheet->getColumnDimension('D')->setWidth('20');
        $sheet->getColumnDimension('E')->setWidth('20');
        $sheet->setCellValue("A1","课程名称：".$kcdata[$row]['name']."        讲师：".$kcdata[$row]['username']."       人数上限：".$kcdata[$row]['rs']."        报名人数：".$kcdata[$row]['ybrs']);
        $sheet->setCellValue("A2","序号")->setCellValue("B2","学生姓名")->setCellValue("C2","学生性别")->setCellValue("D2","所在年级部")->setCellValue("E2","所在班级");
        foreach ($xsmddata as $row=>$v){
            $line = $row+3;
            $sheet->setCellValue("A".$line,$row+1)
                  ->setCellValue("B".$line,$xsmddata[$row]['name'])
                  ->setCellValue("C".$line,$xsmddata[$row]['xb'])
                  ->setCellValue("D".$line,$xsmddata[$row]['njb'])
                  ->setCellValue("E".$line,$xsmddata[$row]['bj']);
            }
    }
        $excel->setActiveSheetIndex(0);//设置活动sheet    
        $writer = PHPExcel_IOFactory::createWriter($excel,"Excel2007");//生成excel文件
        // $writer->save($dir."/zc.xlsx");//保存文件
        header('Content-Type:application/vnd.openxmiformats-officedocument.spreadsheetml,sheet');//excel2007
        header('Content-Disposition:attachment;filename="xbkc.xlsx"');//告诉浏览器将输出文件的名称
        header('Cache-Control:max-age=0');//禁止缓存
        $writer->save("php://output");//输出到浏览器

}

public function actionXkjg_dcone(){
   Yii::$app->response->format=Response::FORMAT_JSON;           
    $get = Yii::$app->request->get();
    $sql = "SELECT a.Id,a.name,a.user_id,a.rs,a.zt,b.username,(select count(kc_id) from xsgl_xbkc_xk c where a.Id = c.kc_id) as ybrs FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.Id = :id;";
    $kcdata=Yii::$app->db->createCommand($sql,[':id'=>$get['d']])->queryOne();//获取当前课程信息

       $sql = "SELECT a.kc_id,a.zt,b.name,b.xb,c.name bj,d.name njb from xsgl_xbkc_xk a left join xsgl_jcxx_xs_jbxx b on a.xs_id = b.Id left join xsgl_jcxx_bj c on b.bj_id = c.Id left join xsgl_jcxx_njb d on c.njb_id = d.Id where a.kc_id =:id;";
        $xsmddata=Yii::$app->db->createCommand($sql,[':id'=>$get['d']])->query()->readAll();//获取当前课程学生名单
        $excel = new PHPExcel();
        $sheet = $excel->getActiveSheet();
        $sheet->setTitle($kcdata['name']);
        $sheet->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::VERTICAL_CENTER);//设置默认水平居中和垂直居中。
        $sheet->getStyle("A1:E2")->getFont()->setBold(True);
        $sheet->mergeCells('A1:E1');
        $sheet->getStyle("A1")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED); 
        $sheet->getColumnDimension('A')->setWidth('15');
        $sheet->getColumnDimension('B')->setWidth('20');
        $sheet->getColumnDimension('C')->setWidth('20');
        $sheet->getColumnDimension('D')->setWidth('20');
        $sheet->getColumnDimension('E')->setWidth('20');
        $sheet->setCellValue("A1","课程名称：".$kcdata['name']."        讲师：".$kcdata['username']."       人数上限：".$kcdata['rs']."        报名人数：".$kcdata['ybrs']);
        $sheet->setCellValue("A2","序号")->setCellValue("B2","学生姓名")->setCellValue("C2","学生性别")->setCellValue("D2","所在年级部")->setCellValue("E2","所在班级");
        foreach ($xsmddata as $row=>$v){
            $line = $row+3;
            $sheet->setCellValue("A".$line,$row+1)
                  ->setCellValue("B".$line,$xsmddata[$row]['name'])
                  ->setCellValue("C".$line,$xsmddata[$row]['xb'])
                  ->setCellValue("D".$line,$xsmddata[$row]['njb'])
                  ->setCellValue("E".$line,$xsmddata[$row]['bj']);
            }
    
        $excel->setActiveSheetIndex(0);//设置活动sheet    
        $writer = PHPExcel_IOFactory::createWriter($excel,"Excel2007");//生成excel文件
        // $writer->save($dir."/zc.xlsx");//保存文件
        header('Content-Type:application/vnd.openxmiformats-officedocument.spreadsheetml,sheet');//excel2007
        header('Content-Disposition:attachment;filename="xbkc.xlsx"');//告诉浏览器将输出文件的名称
        header('Cache-Control:max-age=0');//禁止缓存
        $writer->save("php://output");//输出到浏览器
}










}?>
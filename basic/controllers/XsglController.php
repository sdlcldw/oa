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

public function actionJcxxsz_xsjbxx_demo_excel(){
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
public function actionJcxxsz_xsjbxx_up_excel(){
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
        .$sheet->getCell("U".$y)->getValue()."'),";
    }
    $sql = rtrim($sql,',');
    $sql.=';'; 
      $data = Yii::$app->db->createCommand($sql)->execute();
      return ['rt' => 'cg','data'=> $data];	
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
        $sj = gmdate('Y-m-d',strtotime($post['sj']) + 8*3600); //将标准时间转换为东八区时间
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_wj (sfzh,sj,lhxf,ms,user_id_czr) VALUES ('".$post['sfzh']."','".$sj."','".$post['lhxf']."','".$post['ms']."','".$id."')";
        $ifok = Yii::$app->db->createCommand($sql)->execute();
        Yii::$app->response->format=Response::FORMAT_JSON;
         return $ifok;
    }
    }  
public function actionXsczjl_zjjl_add_ry(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sj = gmdate('Y-m-d',strtotime($post['sj']) + 8*3600); //将标准时间转换为东八区时间        
        $id = Yii::$app->session['__id'];
        $sql = "INSERT xsgl_czjl_ry (sfzh,sj,lhxf,ms,user_id_czr) VALUES ('".$post['sfzh']."','".$sj."','".$post['lhxf']."','".$post['ms']."','".$id."')";
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

//校本课程 
public function actionKcsz_get_lb(){
    $sqlw = "SELECT a.*,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id;"; 
    $dataw=Yii::$app->db->createCommand($sqlw)->query()->readAll();
   Yii::$app->response->format=Response::FORMAT_JSON;
    return $dataw;
}
public function actionKcsz_add(){
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "INSERT xsgl_xbkc_mx (name,js,user_id,jsjs) VALUES ('".$post['name']."','".$post['js']."','".$post['jsid']."','".$post['jsjs']."')";
        $ifok = Yii::$app->db->createCommand($sql)->execute();                   
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
        $sql = "UPDATE xsgl_xbkc_mx SET name='".$post['name']."',js='".$post['js']."',user_id='".$post['jsid']."',jsjs='".$post['jsjs']."' WHERE Id ='".$post['Id']."';";
        $ifok = Yii::$app->db->createCommand($sql)->execute();                   
       return $ifok;
    }
}
public function actionKcsz_bj(){
   Yii::$app->response->format=Response::FORMAT_JSON;   
    if(Yii::$app->request->isPost){
        $post = Yii::$app->request->post();
        $sql = "SELECT a.*,b.username FROM xsgl_xbkc_mx as a left join user as b on a.user_id = b.Id where a.Id = '".$post['id']."';";
        $command = Yii::$app->db->createCommand($sql)->queryOne();                  
       return $command;
    }
}
public function actionKcsz_get_users(){
   Yii::$app->response->format=Response::FORMAT_JSON;   
    return $this->actionJcxxsz_get_users();
}













}?>
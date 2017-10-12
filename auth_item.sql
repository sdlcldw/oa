# Host: localhost  (Version: 5.5.47)
# Date: 2017-10-12 11:06:06
# Generator: MySQL-Front 5.3  (Build 1.27)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

#
# Source for table "auth_item"
#

DROP TABLE IF EXISTS `auth_item`;
CREATE TABLE `auth_item` (
  `name` varchar(64) NOT NULL,
  `type` int(11) NOT NULL,
  `description` varchar(64) DEFAULT '',
  `rule_name` varchar(64) DEFAULT NULL,
  `data` text,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `type` (`type`),
  CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='储存角色或权限的表';

#
# Data for table "auth_item"
#

INSERT INTO `auth_item` VALUES ('admin',1,'管理员',NULL,NULL,1490838682,1490838682),('cjjf',2,'财务平台_春季缴费',NULL,NULL,NULL,NULL),('cwpt',2,'一级菜单_财务平台',NULL,NULL,NULL,NULL),('cwry',1,'财务人员',NULL,NULL,NULL,NULL),('gzbsc',2,'财务平台_工资表上传',NULL,NULL,NULL,NULL),('gzbwh',2,'财务平台_工资表维护',NULL,NULL,NULL,NULL),('gzjf',2,'财务平台_高中缴费',NULL,NULL,NULL,NULL),('jfzl',2,'财务平台_缴费总览',NULL,NULL,NULL,NULL),('nanss',2,'学生管理_男生宿舍',NULL,NULL,NULL,NULL),('pujs',1,'普通教师',NULL,NULL,1490838681,1490838681),('sjfx',2,'财务平台_数据分析',NULL,NULL,NULL,NULL),('txxx',2,'创建新生_填写信息',NULL,NULL,NULL,NULL),('wdzs',2,'学生管理_我的招生',NULL,NULL,NULL,NULL),('xsgl',2,'一级菜单_学生管理',NULL,NULL,NULL,NULL),('xtsz',2,' 系统设置',NULL,NULL,NULL,NULL),('xxsh',2,'学生管理_信息审核',NULL,NULL,NULL,NULL),('zcgl',2,'资产管理',NULL,NULL,NULL,NULL),('zcgly',1,'资产管理员',NULL,NULL,NULL,NULL),('zszl',2,'财务平台_招生总览',NULL,NULL,NULL,NULL);

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

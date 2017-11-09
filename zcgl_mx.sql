# Host: qdm169738687.my3w.com  (Version 5.1.48-log)
# Date: 2017-11-09 10:21:14
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "zcgl_mx"
#

DROP TABLE IF EXISTS `zcgl_mx`;
CREATE TABLE `zcgl_mx` (
  `bh` varchar(24) NOT NULL DEFAULT '' COMMENT '资产编号',
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '资产名称',
  `pp` varchar(24) NOT NULL DEFAULT '' COMMENT '品牌',
  `xh` varchar(24) NOT NULL DEFAULT '' COMMENT '型号规格',
  `sybm` varchar(24) NOT NULL DEFAULT '' COMMENT '使用部门',
  `cfdd` varchar(24) NOT NULL DEFAULT '' COMMENT '存放地点',
  `jg` varchar(24) NOT NULL DEFAULT '' COMMENT '价格',
  `gzsj` varchar(24) NOT NULL DEFAULT '' COMMENT '购置时间',
  `jysj` varchar(24) NOT NULL DEFAULT '' COMMENT '借用时间',
  `bz` varchar(128) NOT NULL DEFAULT '' COMMENT '备注',
  `zrr` varchar(24) NOT NULL DEFAULT '' COMMENT '责任人',
  `lb` varchar(24) NOT NULL DEFAULT '' COMMENT '类别',
  `ly` varchar(24) NOT NULL DEFAULT '' COMMENT '资产来源',
  `zt` varchar(24) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`bh`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='资产明细';

#
# Data for table "zcgl_mx"
#


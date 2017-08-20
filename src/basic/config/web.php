<?php

$params = require(__DIR__ . '/params.php');
$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'uisyicdwl',
            // 'parsers' => [  
            //       'application/json' => 'yii\web\JsonParser',  //添加后能解析JSON数据
            //     ]  
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => require(__DIR__ . '/db.php'),
        'authManager' => [
                'class' => 'yii\rbac\DbManager',
                'itemTable' => 'auth_item',
                'itemChildTable' => 'auth_item_child',
                'assignmentTable' => 'auth_assignment',
                'ruleTable' => 'auth_rule',
        ],
        /*
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        */
      //   'urlManager' => [  
      //       'enablePrettyUrl' => true,//是否优化url，即路径化1  
      //       'showScriptName' => false,//是否省略index.php  
      //       'enableStrictParsing' => false,//是否严格解析请求，在enablePrettyUrl使用时才起作用  
      //       'rules' => [  
      //       [       
      // 'class' => 'yii\rest\UrlRule', //这一句是必须添加的，因为urlManager类中默认是  
      // 'controller' => ['cesi','v1/login'],//设置RESTful的api，设置module id为v1下的控制器table，login为api  
      //       ],  
      //     ],  
      //   ],   
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;

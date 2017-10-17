//*********************************
//左侧菜单控制程序
//*********************************
// $.ajaxSetup({cache:false}); // true ajax缓存关闭
$(document).on("click",".menu_1",function(){//修改成这样的写法  
    		$(this).siblings().next('.menu_1_2').slideUp();
			 $(this).next('.menu_1_2').slideToggle(); // 打开/关闭二级菜单
			$(this). addClass('active') // 设置点击菜单样式
					.siblings('div').removeClass('active') 
					var ys = $(this).prevAll('.menu_1').eq(0)//获取当前上一个菜单
					var as=(ys[0]);
					if(as){
						ys.addClass('menu_prev')
					.siblings().not(ys).removeClass('menu_prev');
					}else{
					$(this).siblings().removeClass('menu_prev');
					$(this).removeClass('menu_prev');
					}
					$(this).siblings().children('.out').removeClass('active_2');
  });
$(document).on("click",".out",function(){//修改成这样的写法 
$(this). addClass('active_2')
			.siblings('div').removeClass('active_2');
});
//**********************************
//整体页面控制程序
//**********************************
function ckkz(){
	$("body").css("height",$(window).height());
    $(".right,.left").css("height",$(window).height()-100);
	$(".menu_ul").css("height",$(window).height()-100-232);
}
// 文档加载完自动执行
// $(document).ready(function() {
// 	setTimeout(ckkz(),3000);
 
// });
$(window).resize(function () {
    ckkz();
});

//*******************************
//顶部控制程序。
//*******************************
// 点击顶部按钮，载入左侧菜单
// function enterPages(a){
//  $(".menu2").load("tpl/left_"+a+".html");
// }
   // 鼠标经过变换样式
function menuOver(obj) {
    var imgObj = $(obj).find("img");
    imgObj.attr("src", imgObj.attr("hoverSrc"));
}
// 鼠标离开恢复
function menuOut(obj) {
    var imgObj = $(obj).find("img");
    imgObj.attr("src", imgObj.attr("normalSrc"));
}
// 提示框
function tsk(ts)
{
    $("#jgk").append("<div style='letter-spacing:2px;' id='myAlert' class='alert alert-danger fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'>&times;</button><strong>"+ts+"</strong>");
    setTimeout("$('#myAlert').remove()",2000)
}


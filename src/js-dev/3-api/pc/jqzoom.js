/*
 <div class="jqzoom" data-size="4">
	<!--大图-->
		<div class=" jqzoom-img" >
			<img class="orderdtl-l-img" src="./images/板块图片2.png" alt="大图" />
			</div>
			<div class=" jqzoom-content">
				<div class="jqzoom-content-wrap">
					<!-- 左右按钮 -->
				<button class="left-btn" type="button">
					<span class="glyphicon glyphicon-menu-left"></span>
				</button>

				<button class="right-btn" type="button">
					<span class="glyphicon glyphicon-menu-right"></span>
				</button>
				<!--小图列表-->
				<ul class=" clearfix jqzoom-content-imgs ">
					<li><img src="./images/板块图片2.png" alt="小图" /></li>
					<li><img src="./images/板块图片3.png" alt="小图" /></li>
					<li><img src="./images/板块图片4.png" alt="小图" /></li>
					<li><img src="./images/板块图片5.png" alt="小图" /></li>
					<li><img src="./images/板块图片5.png" alt="小图" /></li>
					</ul>
				</div>
			</div>
	</div>
 * 
 * */

namespace.extend(rootObj, "api").jqzoom = (function($) {
	
	var _init = function() {
	
		//缩列图
		$(".jqzoom-content-imgs img").hover(function() {
			
			$(".jqzoom-img img").attr("src", $(this).attr("src")).hide().show();
			var p= $(this).parents(".jqzoom");
			$(".jqzoom-content-imgs li",p).removeClass("active");
			$(this).parents("li").addClass("active");

		});
		
		var list = {};
		list.index = 0;
         var _size=$(".jqzoom").attr("data-size")||4;
		list.df = _size;
		list.size = $(".jqzoom-content-imgs li").size();


		list.wdith = $(".jqzoom-content-imgs  li").outerWidth(true);
		$(".jqzoom-content-imgs ").width(list.size * list.wdith);

		$(".jqzoom-content").on("mouseenter", function() {

			if(list.size > list.df) {

				lr_btn_ff();
			}

		});

		function lr_btn_ff() {

			if(list.index === 0) {
				$(".left-btn").hide();
			} else {
				$(".left-btn").show();
			}

			if(list.index + list.df >= list.size) {
				$(".right-btn").hide();
			} else {
				$(".right-btn").show();
			}
		}
		$(".jqzoom-content").on("mouseleave", function() {

			$(this).find(".left-btn").hide();
			$(this).find(".right-btn").hide();

		});

		$(".right-btn").click(function() {
			if(list.index + list.df >= list.size) {
				return;
			}
			list.index++;
			$(".jqzoom-content-imgs").animate({

				left: "-=" + list.wdith
			}, 400)

			lr_btn_ff();
		});

		$(".left-btn").click(function() {
			if(list.index === 0) {
				return;
			}
			list.index--;
			$(".jqzoom-content-imgs").animate({

				left: "+=" + list.wdith
			}, 400)

			lr_btn_ff();
		});

	}


	return {
		init: _init
	}

})(window.jQuery);
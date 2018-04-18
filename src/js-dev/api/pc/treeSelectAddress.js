/*
 
 	<div class=" tree-address-big ">
			<input class="form-control rd-no vd-item tree-address-btn" name="addr" vd-req vd-req-msg="所在地区不能为空" type="text" placeholder="输入所在地区" id="addr" />
					<div class="tree-address tab-big">
						<ul class="tree-address-ttl tab-ttl clearfix">
							<li class="tab-item active" data-target=".address1">省</li>
							<li class="tab-item" data-target=".address2">市</li>
							<li class="tab-item" data-target=".address3">区</li>
						</ul>
						<div class="tab-content">
						<ul class="tree-address-1 tab-content-item active clearfix address1">

						</ul>
						<ul class="tree-address-2 tab-content-item clearfix address2">

						</ul>

						<ul class="tree-address-3 tab-content-item clearfix address3">

						</ul>
				</div>

			</div>
	<span class="vd-req "></span>
	</div>
							
 * */

/*三联联动地址*/
var treeSelectAddress = (function() {

	function _init() {
		getProvince();

		var listCity = [];
		var result="";
		var result2="";
		// 获取省
		function getProvince() {
			
			var province = $(".tree-address-1");
			var city = $(".tree-address-2");
			var district = $(".tree-address-3");
			var list = cityData3; // 三联地址库
			var docFragment = document.createDocumentFragment();

			var patternObj = [{
					key: "a-g",
					val: /a|b|c|d|e|f|g/
				},
				{
					key: "h-k",
					val: /h|i|g|k/
				},
				{
					key: "l-s",
					val: /l|m|n|o|p|q|r|s/
				},
				{
					key: "t-z",
					val: /t|u|v|w|x|y|z/
				}
			];

			for(var i = 0; i < patternObj.length; i++) {
				list2 = common.list.where(list, function(item) {
					return item.py && item.py.search(new RegExp(patternObj[i].val)) >= 0;
				});

				var h4 = document.createElement("h4");
				h4.innerText = patternObj[i].key.toUpperCase();
				docFragment.appendChild(h4);
				var ul = document.createElement("ul");
				for(var index in list2) {
					var li = document.createElement("li");
					li.innerText = list2[index].text;
					li.setAttribute("data-value", list2[index].value);
					ul.appendChild(li);
				}
				docFragment.appendChild(ul);
			}

			province.append(docFragment);

			$("li", province).click(function() {
				result="";
				$(city).html("");
				$(district).html("");
				$("li", province).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				result=text;
				
				// 市
				var p = $(this).parents(".tree-address");
				$(".tree-address-ttl .tab-item ", p).eq(1).trigger("click");

				// 添加市区
				getCity(value);

			});

		};

		// 获取市
		function getCity(val) {
			var city = $(".tree-address-2");
			var district = $(".tree-address-3");
			var list = cityData3; // 三联地址库
			val = typeof val === "string" ? val : "";
			val = $.trim(val);
			var city = $(".tree-address-2");
			list2 = common.list.where(list, function(item) {
				return item.value === val;
			});

			var list3 = list2 && list2[0] && list2[0].children;
			listCity = list3;
			docFragment = document.createDocumentFragment();
			for(var index in list3) {
				var li = document.createElement("li");
				li.innerText = list3[index].text;
				li.setAttribute("data-value", list3[index].value);
				docFragment.appendChild(li);
			}

			city.append(docFragment);
			//alert(JSON.stringify(list2));

			$("li", city).click(function() {
				$("li", city).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
					result2=	result+"-"+text;
					$(this).parents(".tree-address-big").find(".tree-address-btn").val(result2);

				// 市
				var p = $(this).parents(".tree-address");
				$(".tree-address-ttl .tab-item", p).eq(2).click();

				// 添加区域
				getDistrict(value);

			});

		};

		// 获取区
		function getDistrict(val) {
			var district = $(".tree-address-3");
			val = typeof val === "string" ? val : "";
			val = $.trim(val);

			$(district).html("");

			var list2 = common.list.where(listCity, function(item) {
				return item.value === val;
			});

			var list3 = list2 && list2[0] && list2[0].children;
			docFragment = document.createDocumentFragment();
			for(var index in list3) {
				var li = document.createElement("li");
				li.innerText = list3[index].text;
				li.setAttribute("data-value", list3[index].value);
				docFragment.appendChild(li);
			}

			district.append(docFragment);

			$("li", district).click(function(event) {
				event.stopPropagation();
				$("li", district).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				var result3=	result2+"-"+text;
				result3= result3.replace(/-$/,"");
				$(this).parents(".tree-address-big").find(".tree-address-btn").val(result3);
				$(this).parents(".tree-address-big").find(".tree-address").hide();
			

			});
		};

	}
	

	$(function() {
		// 地址焦点移开
		$(".tree-address-btn").focus(function() {
			$(this).blur();
		})
		// 点击显示
		$(".tree-address-big").click(function(event) {
			event.stopPropagation();
			$(".tree-address-big").find(".tree-address").hide();
			var treeAddress = $(this).find(".tree-address");
			treeAddress.show();
			$(document).one("click", function() {
				treeAddress.hide();
			});
		});
	})

	return {
		init: _init
	}
})();
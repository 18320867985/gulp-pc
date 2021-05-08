var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	公共类库
 */

;
(function () {

	"use strict";
	// 冲突common兼容

	var _common = window.common = window.Common = window.com;

	/**创建Common对象**/
	var Common = window.com = window.common = window.Common = function () {};

	// 添加扩展extend
	Common.extend = function (obj) {
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {

			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
	};

	// string  trim
	Common.extend({
		trim: function trim(txt) {
			var str = "";
			txt = typeof txt === "string" ? txt : "";
			str = txt.replace(/^\s*|\s*$/img, "");
			return str;
		}
	});

	/**url对象**/
	Common.extend({

		url: {
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			getQueryString: function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},

			//从WebAPI获取日期json数据 转换成日期时间戳
			jsonToDate: function jsonToDate(apidate) {
				var txts = apidate.replace("/Date(", "").replace(")/", "");
				return parseInt(Common.trim(txts));
			},

			// 取当前页面名称(不带后缀名)
			getPageName: function getPageName() {
				var a = location.href;
				var b = a.split("/");
				var c = b.slice(b.length - 1, b.length).toString(String).split(".");
				return c.slice(0, 1);
			},

			//取当前页面名称(带后缀名)
			getPageNameExention: function getPageNameExention() {
				var strUrl = location.href;
				var arrUrl = strUrl.split("/");
				var strPage = arrUrl[arrUrl.length - 1];
				return strPage;
			}

		}
	});

	/**绑定自定义事件**/
	Common.extend({
		events: {
			events: {},

			// bind events
			on: function on(eventName, fn) {
				this.events[eventName] = this.events[eventName] || [];
				this.events[eventName].push(fn);
			},
			off: function off(eventName, fn) {
				if (arguments.length === 1) {

					this.events[eventName] = [];
				} else if (arguments.length === 2) {
					var $events = this.events[eventName] || [];
					for (var i = 0; i < $events.length; i++) {
						if ($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}
					}
				}
			},
			emit: function emit(eventName, data) {

				if (this.events[eventName]) {
					for (var i = 0; i < this.events[eventName].length; i++) {
						this.events[eventName][i](data);
					}
				}
			}
		}
	});

	/**array的扩展方法**/
	Common.extend({
		list: {

			// min value
			min: function min(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_min = 0;
				var isOne = true;
				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_min = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp < _array_min) {
							_array_min = _temp;
						}
					}
				}

				return _array_min;
			},

			// max value
			max: function max(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_max = 0;

				var isOne = true;
				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_max = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp > _array_max) {
							_array_max = _temp;
						}
					}
				}

				return _array_max;
			},

			// data where
			where: function where(data, fn) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}
				var _arrs = [];
				if (data.constructor === Array) {

					if (typeof fn !== "function") {
						return data;
					}
					for (var i = 0; i < data.length; i++) {

						if (fn(data[i])) {
							_arrs.push(data[i]);
						}
					}
				}

				return _arrs;
			},

			// data map
			map: function map(data, fn) {
				data = data || [];
				var arrs = [];
				if (data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}

				if (data.constructor === Array) {

					if (typeof fn !== "function") {
						return data;
					}

					for (var i = 0; i < data.length; i++) {

						arrs[i] = fn(data[i]) || data[i];
					}
				}

				return arrs;
			},

			//  data first
			first: function first(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					return data[0];
				} else {
					return null;
				}
			},

			//  data last
			last: function last(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					return data[data.length - 1];
				} else {
					return null;
				}
			},

			//  data  slice
			slice: function slice(data, startIndex, endIndex) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					startIndex = typeof startIndex === "number" ? startIndex : 0;
					endIndex = typeof endIndex === "number" ? endIndex : 0;
					var _arrs = [];
					for (var i = startIndex; i < data.length; i++) {

						if (i < endIndex) {
							_arrs.push(data[i]);
						}
					}

					return _arrs;
				} else {
					return [];
				}
			},

			//  sort
			sort: function sort(data, fn) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {

					Array.prototype.sort.call(data, fn);

					return data;
				} else {
					return [];
				}
			},

			//  reverse
			reverse: function reverse(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {

					Array.prototype.reverse.call(data);

					return data;
				} else {
					return [];
				}
			},

			//  sum
			sum: function sum(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					for (var i = 0; i < data.length; i++) {

						var _num = Number(data[i]);
						_num = isNaN(_num) ? 0 : _num;
						_sum = _sum + _num;
					}

					return _sum;
				} else {
					return 0;
				}
			},

			//  avg
			avg: function avg(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					for (var i = 0; i < data.length; i++) {

						var _num = Number(data[i]);
						_num = isNaN(_num) ? 0 : _num;
						_sum = _sum + _num;
					}

					return _sum / data.length;
				} else {
					return 0;
				}
			},

			//  splice
			splice: function splice(data, startIndex, endIndex) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					Array.prototype.splice.call(data, startIndex, endIndex);

					return data;
				} else {
					return [];
				}
			},

			//  not repeat
			notRepeat: function notRepeat(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}

				if (data.length <= 0) {
					return [];
				}
				var temp = [];
				temp.push(data[0]);
				for (var i = 1; i < data.length; i++) {

					var test = data[i];
					var isOk = true;
					for (var y = 0; y < temp.length; y++) {

						var test2 = temp[y];
						if (test === test2) {

							isOk = false;
							break;
						}
					}

					if (isOk) {
						temp.push(test);
					}
				}

				return temp;
			},
			// index
			index: function index(data, fn) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}

				if (data.length <= 0) {
					return [];
				}

				if (typeof fn === "function") {
					for (var i = 0; i < data.length; i++) {
						if (fn(data[i])) {
							return i;
						}
					}
				}
				return -1;
			}

		}

	});

	// cookie
	Common.extend({
		cookie: {

			setCookie: function setCookie(cookieName, cookieValue, expiresDate) {
				cookieName = cookieName || "";
				if (cookieName == "") {
					return;
				}
				cookieValue = cookieValue || "";
				var dt = new Date();
				expiresDate = typeof expiresDate === "number" ? expiresDate : 0;
				dt.setDate(dt.getDate() + expiresDate);
				var expires = dt;
				document.cookie = encodeURIComponent(Common.trim(cookieName)) + "=" + encodeURIComponent(cookieValue) + ";expires=" + expires;
			},

			getCookie: function getCookie(cookieName) {

				cookieName = cookieName || "";
				if (cookieName == "") {
					return;
				}

				var cookies = Common.cookie.getAllCookie();

				return cookies[cookieName];
			},

			getAllCookie: function getAllCookie() {

				var strs = document.cookie.split(new RegExp(";\\s*"));
				var obj = {};
				for (var i = 0; i < strs.length; i++) {

					var strs2 = strs[i].split("=");
					try {
						var _name = decodeURIComponent(strs2[0]);
						var _val = decodeURIComponent(strs2[1]);
						obj[_name] = _val;
					} catch (e) {}
				}

				return obj;
			},

			removeCookie: function removeCookie(cookieName) {

				Common.cookie.setCookie(cookieName, "", -1);
			}

		}

	});

	// localStorage 与 sessionStorage
	Common.extend({

		localStorage: {

			// localStorage存值永久有效
			setItem: function setItem(item, value) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}

				localStorage.setItem(Common.trim(item), JSON.stringify(value));
			},

			// localStorage取值
			getItem: function getItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				var data = JSON.parse(localStorage.getItem(Common.trim(item)));
				return data;
			},

			//localStorage删除指定键对应的值
			removeItem: function removeItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				localStorage.removeItem(Common.trim(item));
			},
			clear: function clear() {
				localStorage.clear();
			}

		},

		sessionStorage: {

			// sessionStorage 
			setItem: function setItem(item, value) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}

				sessionStorage.setItem(Common.trim(item), JSON.stringify(value));
			},

			// sessionStorage 取值
			getItem: function getItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				var data = JSON.parse(sessionStorage.getItem(Common.trim(item)));
				return data;
			},

			// sessionStorage 删除指定键对应的值
			removeItem: function removeItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				sessionStorage.removeItem(Common.trim(item));
			},

			clear: function clear() {
				sessionStorage.clear();
			}

		}

	});
})();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*鸭式变形法*/
// 定义接口
function Interface(interName, props) {
    if (arguments.length !== 2) {
        throw new Error("parameter length must is two");
    }
    if (typeof interName !== "string") {
        throw new Error("interName must is string");
    }
    this.interName = interName;
    this.props = [];
    if ((typeof props === "undefined" ? "undefined" : _typeof(props)) === "object" && props.constructor === Array) {

        for (var i in props) {
            if (typeof props[i] === "string") {
                this.props.push(props[i]);
            }
        }
    }
}

// 检查是否实现接口
Interface.check = function (obj) {
    if (arguments.length < 2) {
        throw new Error("arguments  length must  is two");
    }
    // 遍历接口
    for (var i = 1; i < arguments.length; i++) {
        var inter = arguments[i];
        if (inter.constructor !== Interface) {
            throw new Error("not Interface type ");
        }
        for (var y in inter.props) {
            var propName = inter.props[y];

            if (!obj[propName]) {
                throw new Error(" Interface " + inter.interName + "  not implemented  properties name is " + propName);
            }
        }
    }

    return true;
};

/*实现例子*/

//// 创建接口 Icat
//var Icat = new Interface("Icat", ["add", "get"]);

//// 创建类 Cat 并实现Icat接口
//var Cat = function (name) {
//    this.name = name;
//    this.constructor.prototype.add = function () {
//        alert("add");
//    }
//    this.constructor.prototype.get = function () {
//        alert("get");
//    }

//    // 检查是否实现接口
//    Interface.check(this, Icat);
//}

//var cat1 = new Cat();
//cat1.add();
var rootName = "hqs"; // 顶级命名空间
var rootObj = window[rootName] = {};

var namespace = {}; // 
namespace.extend = function (ns, nsString) {
	if (typeof nsString !== "string") {
		throw new Error("nsString must string type");
	}
	var parent = ns;
	var arrs = nsString.split(".");
	for (var i = 0; i < arrs.length; i++) {
		var prop = arrs[i];
		if (typeof ns[prop] === "undefined") {
			parent[prop] = {};
		}
		parent = parent[prop];
	}

	return parent;
};

/*namespace.extend(rootObj, "api").bsDate=(function(){})()*/
/*
 * 默认js
 * 添加 class="bs-date " 
	<input type="text" class="form-control bs-date " value="" placeholder="订单开始时间" />
 * 
 */

namespace.extend(rootObj, "api").bsDate = function ($) {

	var _init = function _init() {
		// bs 日历插件
		$('.bs-date').datetimepicker({

			format: "yyyy-mm-dd  ", //'yyyy-mm-dd hh:ii'
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			minView: 3 //选择日期
			//forceParse :true  //转换格式

		});

		//日期不准输入
		$('.bs-date').focus(function () {

			$(this).blur();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
/**
 * iframe
 * **/

namespace.extend(rootObj, "api").iframe = function ($) {

	// 设置iframe 高度
	var _setHeight = function _setHeight() {
		var windows_h = parseInt($("body").height()) + 10;

		$(window.parent.document).find(".parent-window").css("height", 0).css("height", windows_h);
	};

	return {
		setHeight: _setHeight
	};
}(window.jQuery);
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

namespace.extend(rootObj, "api").jqzoom = function ($) {

	var _init = function _init() {

		//缩列图
		$(".jqzoom-content-imgs img").hover(function () {

			$(".jqzoom-img img").attr("src", $(this).attr("src")).hide().show();
			var p = $(this).parents(".jqzoom");
			$(".jqzoom-content-imgs li", p).removeClass("active");
			$(this).parents("li").addClass("active");
		});

		var list = {};
		list.index = 0;
		var _size = $(".jqzoom").attr("data-size") || 4;
		list.df = _size;
		list.size = $(".jqzoom-content-imgs li").size();

		list.wdith = $(".jqzoom-content-imgs  li").outerWidth(true);
		$(".jqzoom-content-imgs ").width(list.size * list.wdith);

		$(".jqzoom-content").on("mouseenter", function () {

			if (list.size > list.df) {

				lr_btn_ff();
			}
		});

		function lr_btn_ff() {

			if (list.index === 0) {
				$(".left-btn").hide();
			} else {
				$(".left-btn").show();
			}

			if (list.index + list.df >= list.size) {
				$(".right-btn").hide();
			} else {
				$(".right-btn").show();
			}
		}
		$(".jqzoom-content").on("mouseleave", function () {

			$(this).find(".left-btn").hide();
			$(this).find(".right-btn").hide();
		});

		$(".right-btn").click(function () {
			if (list.index + list.df >= list.size) {
				return;
			}
			list.index++;
			$(".jqzoom-content-imgs").animate({

				left: "-=" + list.wdith
			}, 400);

			lr_btn_ff();
		});

		$(".left-btn").click(function () {
			if (list.index === 0) {
				return;
			}
			list.index--;
			$(".jqzoom-content-imgs").animate({

				left: "+=" + list.wdith
			}, 400);

			lr_btn_ff();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
/**延迟加载**/

/**
 * 延迟加载
 *  * <img class="load-lazy"
 * 	src="images/Home/lazy.jpg"
 * alt="新品上市图片"
 * data-src="images/Home/板块图片1.png"
 * > 
 * */
namespace.extend(rootObj, "api").lazy = function ($) {

	var _init = function _init() {

		var window_h = $(window).height();

		$(window).scroll(function () {

			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(window).scrollTop() >= img_h && $(window).scrollTop() < img_h2) {

						// set src
						var _src = $(this).attr("src") || "";
						var _src2 = $(this).attr("data-src") || "";
						if (_src.trim() !== _src2.trim()) {

							// is support animate
							if ($(this).animate) {
								$(this).attr("src", $(this).attr("data-src")).animate({

									"opacity": 0.8
								}, 400).animate({

									"opacity": 1
								}, 400);
							} else {
								$(this).attr("src", $(this).attr("data-src"));
							}
						}
					}
				});
			}, 400);
		});
	};

	var _reset = function _reset() {

		$(".load-lazy").each(function () {
			$(this).attr("src", $(this).attr("data-src"));
		});
	};

	return {
		init: _init,
		reset: _reset
	};
}(window.jQuery || window.Zepto);

/*
					 滚动监听
					 <body data-spy="spy" data-target=".index-slide-pwr>
						 
						 <div class="index-slide-pwr">

                            <ul class="">
                                <li class="spy-itm"><a href="#lv0">今日指数</a></li>
                                <li  class="active spy-itm"><a href="#lv1">价格对比</a></li>
                                <li class="spy-itm"> <a href="#lv2">行业讯息</a></li>
                                <li class="spy-itm"><a href="#lv3">价格走势</a></li>
                                <li class="spy-itm"><a href="#lv4">合作伙伴</a></liclass="spy-item">
                                <!--<li  class="spy-itm"><a href="#lv-5">友情链接</a></li>-->

                                <li class="btn-top"><a href="javascript:;">顶部</a></li>


                            </ul>
                         </div>
					 </body>
				 */

(function ($) {

        var obj = {

                init: function init(top) {

                        var _top = Number(top);
                        _top = isNaN(_top) ? 0 : _top;

                        this.offsetTop = _top;
                        this.bindEvent(this.offsetTop);
                        this.onLoad();
                        this.onReset();
                },

                offsetTop: 0,

                setOffsetTop: function setOffsetTop(top) {
                        this.offsetTop = typeof top === "number" ? top : 0;
                },

                onReset: function onReset() {

                        $(window).resize(function () {
                                this.scrollList();
                                this.scroll(this.offsetTop);
                        }.bind(this));
                },

                onLoad: function onLoad() {

                        var $this = this;
                        $(function () {

                                $this.scrollList();
                                $this.scroll($this.offsetTop);
                        });
                },

                selector: function selector() {
                        var _tagget = $("[data-spy=spy]").attr("data-target");
                        return $(_tagget);
                },

                bindEvent: function bindEvent(top) {

                        this.selector().find(".spy-itm  a").click(function () {

                                // animation
                                var $this = $(this);
                                var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
                                $("body,html").stop().animate({
                                        scrollTop: _top
                                }, 250);
                        });
                },
                setTimeoutId: 0,
                scroll: function scroll(top) {

                        var ff = this.getScrollList;
                        var p = this.selector();
                        var $this = this;
                        $(window).on("scroll", function () {

                                $this.setTimeoutId = setTimeout(function () {
                                        clearTimeout($this.setTimeoutId);
                                        var arrs = ff || [];

                                        for (var i = 0; i < arrs.length; i++) {
                                                var item = arrs[i];
                                                var m1 = parseInt(item.top); //- parseInt(top);
                                                var m2 = parseInt(item.maxTop); //- parseInt(top);
                                                if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {

                                                        p.find(".spy-itm").removeClass("active");
                                                        $("[href=" + item.selector + "]").parent().addClass("active");

                                                        break;
                                                }
                                        }
                                }, 250);
                        });
                },

                scrollList: function scrollList() {

                        var objs = [];

                        var _offsetTop = this.offsetTop;
                        var els = this.selector().find(".spy-itm");
                        for (var i = 0; i < els.length; i++) {

                                var a = $(els[i]).find("a"); //.attr("href") || "";

                                if (a[0].hasAttribute("href")) {
                                        var _el = a.attr("href");

                                        var obj = {};
                                        var _top = Math.floor($(_el).offset().top) - _offsetTop;

                                        var maxTop = 0;
                                        if (i < els.length - 1) {
                                                var _el2 = $(els[i + 1]).find("a").attr("href");
                                                maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
                                        } else {
                                                maxTop = Math.floor($(document).height());
                                        }

                                        obj.selector = _el;
                                        obj.top = _top;
                                        obj.maxTop = maxTop;
                                        objs.push(obj);
                                }
                        }

                        return this.getScrollList = objs;
                },

                getScrollList: []

        };

        window.spy = obj;
})($);
/*
		 滚动监听
		 <body data-spy="spy" data-target="#scroll_ttl">
			 
			 <aside id="scroll_ttl">

				<ul>
					<li class="active">
						<a href="#banner_1">1</a>
					</li>
					<li>
						<a href="#banner_2">2</a>
					</li>
					<li>
						<a href="#banner_3">3</a>
					</li>
				</ul>

			</aside>
		 </body>
	 */
namespace.extend(rootObj, "api").scroll = function ($) {

	var obj = {

		init: function init(top) {

			var _top = Number(top);
			_top = isNaN(_top) ? 0 : _top;

			this.offsetTop = _top;
			this.bindEvent(this.offsetTop);
			this.onLoad();
			this.onReset();
		},

		offsetTop: 0,

		setOffsetTop: function setOffsetTop(top) {
			this.offsetTop = typeof top === "number" ? top : 0;
		},

		onReset: function onReset() {

			$(window).resize(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},
		onLoad: function onLoad() {

			$(window).load(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
				$("body,html").stop().animate({
					scrollTop: _top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top); //- parseInt(top);
					var m2 = parseInt(item.maxTop); //- parseInt(top);
					if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {
						//alert(item.selector)
						p.find("ul li").removeClass("active");
						$("[href=" + item.selector + "]").parent().addClass("active");
						return false;
					}
				});
			});
		},

		scrollList: function scrollList() {

			var objs = [];

			var _offsetTop = this.offsetTop;
			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {

				var _el = $(els[i]).find("a").attr("href");

				if (_el) {

					var obj = {};
					var _top = Math.floor($(_el).offset().top) - _offsetTop;

					var maxTop = 0;
					if (i < els.length - 1) {
						var _el2 = $(els[i + 1]).find("a").attr("href");
						maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
					} else {
						maxTop = Math.floor($(document).height());
					}

					obj.selector = _el;
					obj.top = _top;
					obj.maxTop = maxTop;
					objs.push(obj);
				}
			}

			return this.getScrollList = objs;
		},

		getScrollList: []

	};

	return {
		init: function init(top) {
			obj.init(top);
		},
		setOffsetTop: function setOffsetTop(top) {
			obj.setOffsetTop(top);
		}
	};
}(window.jQuery || window.Zepto);
/*

三级联动地址

<select id="address_1"  >
	<option value="">==省份==</option>
</select>
<select id="address_2"  >
	<option value="">==省份==</option>
</select>
<select id="address_3"  >
	<option value="">==省份==</option>
</select>
var el_select1 = document.getElementById("address_1");
var el_select2 = document.getElementById("address_2");
var el_select3 = document.getElementById("address_3");

 * */

namespace.extend(rootObj, "api").threeAddress = function () {

	var _init = function _init(v1, v2, v3) {
		var el_select1 = document.getElementById("address_1");
		var el_select2 = document.getElementById("address_2");
		var el_select3 = document.getElementById("address_3");
		var select_data2 = [];

		v1 = v1 || "省区";
		v2 = v2 || "市区";
		v3 = v3 || "县城";

		//  一级地址
		for (var i in cityData3) {

			var el_option = document.createElement("option");
			el_option.value = cityData3[i].text.toString();
			el_option.innerText = cityData3[i].text.toString();
			el_select1.insertBefore(el_option, null);
		}

		// 二级地址 change event
		el_select1.addEventListener("change", function (e) {
			e = e || event;

			select_data2 = getBYcityValue(cityData3, e.target.value);
			el_select2.innerHTML = "";
			var el_empty = document.createElement("option");
			el_empty.innerText = v2;
			el_select2.insertBefore(el_empty, null);
			for (var i2 in select_data2) {
				var el_option = document.createElement("option");
				el_option.value = select_data2[i2].text.toString();
				el_option.innerText = select_data2[i2].text.toString();

				el_select2.insertBefore(el_option, null);
			}

			// 恢复三级
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
		});

		// 三级地址 change event
		el_select2.addEventListener("change", function (e) {
			e = e || event;

			var l3 = getBYcityValue(select_data2, e.target.value);
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
			for (var i3 in l3) {
				var el_option = document.createElement("option");
				el_option.value = l3[i3].text.toString();
				el_option.innerText = l3[i3].text.toString();
				el_select3.insertBefore(el_option, null);
			}
		});

		function getBYcityValue(objs, val) {

			for (var name in objs) {
				if (objs[name].text.trim() === val.trim()) {
					return objs[name].children || [];
				}
			}
		}
	};

	return {
		init: _init
	};
}();
/*
 三级地址
 * 
 * <div class="form-group form-inline">
 * 
	<label for="">year</label>

	<select class="form-control" name="" id="date-year" data-start="1970" data-text="==选择年份==">

	</select>
	<label for="">Month</label>

	<select class="form-control" name="" id="date-month" data-text="==选择月份==">

	</select>
	<label for="">date</label>

	<select class="form-control" name="" id="date-day" data-text="==选择天数==">

	</select>

	</div>
 * 
 * */

namespace.extend(rootObj, "api").threeDate = function () {

	var _init = function _init() {

		var _year = document.getElementById("date-year");
		var _month = document.getElementById("date-month");
		var _day = document.getElementById("date-day");

		createYear();

		_year.onchange = function () {
			var v = _year.value || "";

			if (v == "") {
				createMonth(0);
				createday(0);
			} else {
				createMonth(12);
				createday(0);
			}
		};

		_month.onchange = function () {
			var y = _year.value || "";
			if (y == "") {
				return;
			}
			var m = _month.value || "";
			if (m == "") {
				createday(0);
				return;
			}
			y = Number(y);
			m = Number(m);
			var d = 0;
			switch (m) {
				case 1:
					d = 31;
					break;
				case 2:
					d = 30;
					if (y % 400 == 0 || y % 4 == 0 && y % 100 != 0) {
						//document.write(num + "是闰年。");
						d = 29;
					} else {
						//document.write(num + "是平年。");
						d = 28;
					}

					break;
				case 3:
					d = 31;
					break;
				case 4:
					d = 30;
					break;
				case 5:
					d = 31;
					break;
				case 6:
					d = 30;
					break;
				case 7:
					d = 31;
					break;
				case 8:
					d = 31;
					break;
				case 9:
					d = 30;
					break;
				case 10:
					d = 31;
					break;
				case 11:
					d = 30;
					break;
				case 12:
					d = 31;
					break;
			}

			createday(d);
		};

		function createYear() {

			var fragment = document.createDocumentFragment();

			var startid = _year.getAttribute("data-start") || 1970;
			var _yearName = _year.getAttribute("data-text") || "==选择年份==";
			startid = Number(startid);
			startid = isNaN(startid) ? 1970 : startid;

			var fragment = document.createDocumentFragment();
			var endId = new Date().getFullYear();

			var _notOption = document.createElement("option");
			_notOption.innerText = _yearName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);

			for (; startid <= endId; endId--) {
				var _option = document.createElement("option");
				_option.innerText = endId;
				_option.value = endId;
				fragment.appendChild(_option);
			}
			_year.innerHTML = "";
			_year.appendChild(fragment);
		}

		function createMonth(max) {

			//max=max.constructor===Number?max:12;
			var fragment = document.createDocumentFragment();
			var _monthName = _month.getAttribute("data-text") || "==选择月份==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _monthName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for (var m = 0; m < max; m++) {
				var _option = document.createElement("option");
				_option.innerText = m + 1;
				_option.value = m + 1;
				fragment.appendChild(_option);
			}
			_month.innerHTML = "";
			_month.appendChild(fragment);
		}

		function createday(max) {

			var fragment = document.createDocumentFragment();
			var _dayName = _day.getAttribute("data-text") || "==选择天数==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _dayName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for (var d = 0; d < max; d++) {
				var _option = document.createElement("option");
				_option.innerText = d + 1;
				_option.value = d + 1;
				fragment.appendChild(_option);
			}
			_day.innerHTML = "";
			_day.appendChild(fragment);
		}
	};

	return {
		init: _init
	};
}();
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

	   // 三联联动地址点击触发自定义事件
      $(document).on("treeSelectAddress-select", function (event, el) {
            alert(el.innerText)
      });
      
 * */

/*三联联动地址*/
namespace.extend(rootObj, "api").treeSelectAddress = function () {

	function _init() {

		getProvince();

		var listCity = [];
		var result = "";
		var result2 = "";
		// 获取省
		function getProvince() {

			var province = $(".tree-address-1");
			var list = cityData3; // 三联地址库
			var docFragment = document.createDocumentFragment();

			var patternObj = [{
				key: "a-g",
				val: /a|b|c|d|e|f|g/
			}, {
				key: "h-k",
				val: /h|i|j|k/
			}, {
				key: "l-s",
				val: /l|m|n|o|p|q|r|s/
			}, {
				key: "t-z",
				val: /t|u|v|w|x|y|z/
			}];

			for (var i = 0; i < patternObj.length; i++) {
				list2 = common.list.where(list, function (item) {
					return item.py && item.py.search(new RegExp(patternObj[i].val)) >= 0;
				});

				var h4 = document.createElement("h4");
				h4.innerText = patternObj[i].key.toUpperCase();
				docFragment.appendChild(h4);
				var ul = document.createElement("ul");
				for (var index in list2) {
					var li = document.createElement("li");
					li.innerText = list2[index].text;
					li.setAttribute("data-value", list2[index].value);
					ul.appendChild(li);
				}
				docFragment.appendChild(ul);
			}

			province.append(docFragment);

			$(".tree-address-1 li").click(function () {
				result = "";
				var p = $(this).parents(".tree-address-big");
				var province = $(".tree-address-1", p);
				var city = $(".tree-address-2", p);
				var district = $(".tree-address-3", p);
				city.html("");
				district.html("");

				$("li", province).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				result = text;

				// 市
				$(".tree-address-ttl .tab-item ", p).eq(1).trigger("click");

				// 添加市区
				getCity(value, city);
			});
		};

		// 获取市
		function getCity(val, city) {

			var p = $(city).parents(".tree-address-big");
			//var province=$(".tree-address-1",p);
			var city = $(".tree-address-2", p);
			var district = $(".tree-address-3", p);

			var list = cityData3; // 三联地址库
			val = typeof val === "string" ? val : "";
			val = $.trim(val);
			list2 = common.list.where(list, function (item) {
				return item.value === val;
			});

			var list3 = list2 && list2[0] && list2[0].children;
			listCity = list3;
			docFragment = document.createDocumentFragment();
			for (var index in list3) {
				var li = document.createElement("li");
				li.innerText = list3[index].text;
				li.setAttribute("data-value", list3[index].value);
				docFragment.appendChild(li);
			}

			city.append(docFragment);
			//alert(JSON.stringify(list2));

			$("li", city).click(function () {
				$("li", city).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				result2 = result + "-" + text;
				$(this).parents(".tree-address-big").find(".tree-address-btn").val(result2);

				// 市
				var p = $(this).parents(".tree-address");
				$(".tree-address-ttl .tab-item", p).eq(2).click();

				//点击触发自定义事件
				$(this).trigger("treeSelectAddress-select", [this]);

				// 添加区域
				getDistrict(value, district);
			});
		};

		// 获取区
		function getDistrict(val, district) {

			val = typeof val === "string" ? val : "";
			val = $.trim(val);

			$(district).html("");

			var list2 = common.list.where(listCity, function (item) {
				return item.value === val;
			});

			var list3 = list2 && list2[0] && list2[0].children;
			docFragment = document.createDocumentFragment();
			for (var index in list3) {
				var li = document.createElement("li");
				li.innerText = list3[index].text;
				li.setAttribute("data-value", list3[index].value);
				docFragment.appendChild(li);
			}

			district.append(docFragment);

			$("li", district).click(function (event) {
				event.stopPropagation();
				$("li", district).removeClass("active");
				$(this).addClass("active");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				var result3 = result2 + "-" + text;
				result3 = result3.replace(/-$/, "");
				$(this).parents(".tree-address-big").find(".tree-address-btn").val(result3);
				$(this).parents(".tree-address-big").find(".tree-address").hide();

				//点击触发自定义事件
				$(this).trigger("treeSelectAddress-select", [this]);
			});
		};
	}

	$(function () {
		// 地址焦点移开
		$(".tree-address-btn").focus(function () {
			$(this).blur();
		});
		// 点击显示
		$(".tree-address-big").click(function (event) {
			event.stopPropagation();
			$(".tree-address-big").find(".tree-address").hide();
			var treeAddress = $(this).find(".tree-address");
			treeAddress.show();
			$(document).one("click", function () {
				treeAddress.hide();
			});
		});
	});

	return {
		init: _init
	};
}();


/*check按钮组件
 * 
 * 
 * <ul>
 * 	<li class="check-btn"> 
 * 		<a class="check-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="check-btn"> 
 * 		<a class="check-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 选中点击事件
		$(".check-btn").on("check_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".check-btn").on("check_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
 * 
 * */

+function ($) {

	$(".check-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("check_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("check_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
//  draggale
+function ($) {

	//  draggale
	$.fn.extend({
		draggale: function draggale(option) {
			option = option || {};
			option.handle = option.handle || this;
			$box = this;
			$(option.handle).on("mousedown", function (event) {
				event.preventDefault();
				event.stopPropagation();
				$this = this;
				$this.bl = false;
				if (!$this.bl) {
					this.bl = true;
					var _offset_top = parseInt($($box).offset().top);
					var _offset_left = parseInt($($box).offset().left);
					var _w = parseInt($($box).outerWidth());
					var _h = parseInt($($box).outerHeight());
					var _window_w = parseInt($(window).width());
					var _window_h = parseInt($(window).height());
					var _space_left = event.clientX - _offset_left;
					var _space_top = event.clientY - _offset_top;
					$($this).css("cursor", "move");

					$(document).on("mousemove", function (event2) {

						var _left = event2.clientX - _space_left;
						var _top = event2.clientY - _space_top;

						// 左边
						_left = _left <= 0 ? 0 : _left;
						_left = _left >= _window_w - _w ? _window_w - _w : _left;

						// 上边
						_top = _top <= 0 ? 0 : _top;
						_top = _top >= _window_h - _h ? _window_h - _h : _top;
						$($box).css({
							left: _left,
							top: _top,
							margin: 0
						});
					});

					$(document).on("mouseup", function (event) {
						$(document).off("mousemove");
						$(document).off("mouseup");
						$this.bl = false;
						$($this).css("cursor", "default");
					});
				}
			});

			$(window).resize(function () {

				var _offset_top = parseInt($($box).offset().top);
				var _offset_left = parseInt($($box).offset().left);
				var _w = parseInt($($box).outerWidth());
				var _h = parseInt($($box).outerHeight());
				var _window_w = parseInt($(window).width());
				var _window_h = parseInt($(window).height());
				var _left = _offset_left + _w >= _window_w ? _window_w - _w : _offset_left;
				var _top = _offset_top + _h >= _window_h ? _window_h - _h : _offset_top;
				if (_offset_left <= 0) {
					_left = 0;
				}
				if (_offset_top <= 0) {
					_top = 0;
				}
				$($box).css({
					left: _left,
					top: _top,
					margin: 0
				});
			});
		}

	});
}(window.jQuery);

// 使用方法
//			$(".draggale").draggale({
//				handle: ".draggale-ttl"
//			});
//
/*
 * 消息框
  
 	1.confirm 确认框
  
  <div class="message">
			<div class="message-mask"></div>
			<div class="confirm-box">
				<h4 class="ttl">
				是否要确认删除数据?
			</h4>
				<button class="ok confirm-btn" type="button">确认</button>
				<button class="cancel confirm-btn" type="button">取消</button>
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).confirm("", function() {
			console.log(this)
			},function(){})
		});

	});
	
	
	2.alert 
 	<div class="message">
			<div class="message-mask"></div>
			<div class="alertt-box">
				<h4 class="ttl alert">
				没有选择数据!
			</h4>
				<button class="ok message-box-btn alert" type="button">确认</button>
				
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).alert("没有选择数据!");

	});
 * */

(function () {

	//  confirm
	jQuery.fn.extend({

		confirm: function confirm(mess, okfun, cancelfun, obj) {
			if (!arguments.length >= 2) {

				throw new Error("property is must two");
			}
			obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";

			this.each(function (i, v) {

				mess = mess || "是否确认删除数据?";
				$(".message").remove();

				// 创建message
				var message = document.createElement("div");
				message.setAttribute("class", "message");
				var message_mask = document.createElement("div");
				message_mask.setAttribute("class", "message-mask");

				var message_box = document.createElement("div");
				message_box.setAttribute("class", "confirm-box");

				var ttl = document.createElement("h4");
				ttl.setAttribute("class", "ttl");
				ttl.innerText = mess;

				var ok_btn = document.createElement("button");
				ok_btn.setAttribute("type", "button");
				ok_btn.setAttribute("class", "ok confirm-btn");
				ok_btn.innerText = _okText;

				var cancel_btn = document.createElement("button");
				cancel_btn.setAttribute("type", "button");
				cancel_btn.setAttribute("class", "cancel confirm-btn");
				cancel_btn.innerText = _cancelText;

				message_box.appendChild(ttl);
				message_box.appendChild(ok_btn);
				message_box.appendChild(cancel_btn);
				message.appendChild(message_mask);
				message.appendChild(message_box);

				var elm = document.body || document.documentElement;
				elm.appendChild(message);

				$(".message").fadeIn();
				$(".message").on("click", ".confirm-btn.ok", function (e) {

					if (typeof okfun === "function") {
						$(".message").remove();
						okfun.call(v);
					}
				});

				$(".message").on("click", ".confirm-btn.cancel", function (e) {

					if (typeof cancelfun === "function") {

						cancelfun.call(v);
					}
					$(".message").remove();
				});
			});
		}

	});

	//  confirm
	jQuery.extend({
		confirm: function confirm(mess, okfun, cancelfun, obj) {
			if (!arguments.length >= 2) {

				throw new Error("property is must two");
			}
			obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";

			mess = mess || "是否确认删除数据?";
			$(".message").remove();

			// 创建message
			var message = document.createElement("div");
			message.setAttribute("class", "message");
			var message_mask = document.createElement("div");
			message_mask.setAttribute("class", "message-mask");

			var message_box = document.createElement("div");
			message_box.setAttribute("class", "confirm-box");

			var ttl = document.createElement("h4");
			ttl.setAttribute("class", "ttl");
			ttl.innerText = mess;

			var ok_btn = document.createElement("button");
			ok_btn.setAttribute("type", "button");
			ok_btn.setAttribute("class", "ok confirm-btn");
			ok_btn.innerText = _okText;

			var cancel_btn = document.createElement("button");
			cancel_btn.setAttribute("type", "button");
			cancel_btn.setAttribute("class", "cancel confirm-btn");
			cancel_btn.innerText = _cancelText;

			message_box.appendChild(ttl);
			message_box.appendChild(ok_btn);
			message_box.appendChild(cancel_btn);
			message.appendChild(message_mask);
			message.appendChild(message_box);

			var elm = document.body || document.documentElement;
			elm.appendChild(message);

			$(".message").fadeIn();
			$(".message").on("click", ".confirm-btn.ok", function (e) {

				if (typeof okfun === "function") {
					$(".message").remove();
					okfun();
				}
			});

			$(".message").on("click", ".confirm-btn.cancel", function (e) {

				if (typeof cancelfun === "function") {
					cancelfun();
				}
				$(".message").remove();
			});
		}

	});

	//  alert
	jQuery.fn.extend({

		alert: _alert
	});

	//  alert
	jQuery.extend({

		alert: _alert
	});

	function _alert(mess, obj) {

		obj = obj || {};
		var _okText = obj.ok || "确定";

		mess = mess || "没有选择数据！";
		$(".message").remove();

		// 创建message
		var message = document.createElement("div");
		message.setAttribute("class", "message");
		var message_mask = document.createElement("div");
		message_mask.setAttribute("class", "message-mask");

		var message_box = document.createElement("div");
		message_box.setAttribute("class", "alert-box");

		var ttl = document.createElement("h4");
		ttl.setAttribute("class", "ttl");
		ttl.innerText = mess;

		var ok_btn = document.createElement("button");
		ok_btn.setAttribute("type", "button");
		ok_btn.setAttribute("class", "ok alert-btn");
		ok_btn.innerText = _okText;

		message_box.appendChild(ttl);
		message_box.appendChild(ok_btn);
		message.appendChild(message_mask);
		message.appendChild(message_box);

		var elm = document.body || document.documentElement;
		elm.appendChild(message);

		$(".message").fadeIn();
		$(".message").on("click", ".alert-btn.ok", function (e) {
			$(".message").remove();
		});
	}

	//  info
	jQuery.fn.extend({
		info: _info
	});

	//  info
	jQuery.extend({
		info: _info
	});

	function _info(mess, type) {

		mess = mess || "信息提示框";
		$(".messageinfo").remove();
		var _class = "default";
		if (typeof type === "number") {
			switch (type) {
				case 0:
					_class = "default";
					break;
				case 1:
					_class = "success";
					break;
				case 2:
					_class = "warning";
					break;
				case 3:
					_class = "danger";
					break;
				default:
					_class = "default";
			}
		} else if (typeof type === "string") {
			switch (type) {
				case "default":
					_class = "default";
					break;
				case "success":
					_class = "success";
					break;
				case "warning":
					_class = "warning";
					break;
				case "danger":
					_class = "danger";
					break;
				default:
					_class = "default";
			}
		}

		// 创建message
		var message = document.createElement("div");
		message.setAttribute("class", "messageinfo");

		var message_box = document.createElement("div");
		message_box.setAttribute("class", "info-box");

		var ttl = document.createElement("h4");
		ttl.setAttribute("class", "ttl " + _class);
		ttl.innerText = mess;

		message_box.appendChild(ttl);
		message.appendChild(message_box);

		var elm = document.body || document.documentElement;
		elm.appendChild(message);

		$(".messageinfo").fadeIn(600);
		var setTimeoutId = setTimeout(function () {
			$(".messageinfo").fadeOut().queue(function () {
				$(".messageinfo").remove();
				clearTimeout(setTimeoutId);
			});

			//alert()
		}, 1500);
	}
})();
/*
  
<div class="number" >
   <button class="minus btn" type="button">-</button>
<input class="num" type="number" value="1" data-min="0" data-max="9999" data-step="1" />
<button class="plus btn" type="button">+</button>
  
</div>

 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(document).on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

			//minus
			$(document).on("click", ".minus", function (e) {
						e.stopPropagation();
						e.preventDefault();

						var p = $(this).parents(".number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						//			var max=Number($(".num",p).attr("data-max"));
						//				max=window.isNaN(max)?9999:max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v > min ? v - step : min;

						if (v <= min) {
									v = min;
						}

						$(".num", p).val(v);

						//点击触发自定义事件
						$(this).trigger("number_click", [this]);
			});

			//plus
			$(document).on("click", ".plus", function (e) {
						e.stopPropagation();
						e.preventDefault();
						var p = $(this).parents(".number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v < max ? v + step : max;

						if (v >= max) {
									v = max;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("number_click", [this]);
			});

			// value
			$(document).on("blur", ".num", function (e) {
						var p = $(this).parents(".number");
						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						if (v > max) {
									v = max;
						}

						if (v < min) {
									v = min;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("number_click", [this]);
			});
}(window.jQuery || window.Zepto);

/*****数字框组件end******/
/*****单选按钮组件**
 * 
 * 
 * <div class="radio-btn">             
   <div class="radio-btn-item active">盆</div>
   <div class="radio-btn-item">箱</div>
   <div class="radio-btn-item">斤</div>
   <div class="radio-btn-item">米</div>
   </div>
 * 
 *  
   // 单选按钮点击触发自定义事件
   $(".radio-btn").on("radio_click",function(event,el){
   	
   });
   
 * ****/

+function ($) {

  $(".radio-btn-item").on("click", function () {
    var p = $(this).parents(".radio-btn");
    $(".radio-btn-item", p).removeClass("active");
    $(this).addClass("active");

    //点击触发自定义事件
    $(this).trigger("radio_click", [this]);
  });
}(window.jQuery || window.Zepto);
/*
 * 标签选项卡
 * 
 * <div class="tab-big">
 * 
	 <div class="tab-ttl">
         <a class="tab-item active" data-target="#form_a">
                            塑胶原料
             </a>
           <a class="tab-item"  data-target="#form_b">
                            改性塑料
            </a>
          <a class=" tab-item"  data-target="#form_c">
                            环保再生
            </a>
            <a class="tab-item"  data-target="#form_d">
                            塑料助剂
         </a>

    </div>
      
     <div class="fabu-form tab-content ">
                
           <!--塑胶原料-->
           <div class="form tab-content-item active" id="form_a">-塑胶原料</div>
              <!--塑胶原料2-->
           <div class="form tab-content-item " id="form_b">-塑胶原料2</div>
              <!--塑胶原料3-->
           <div class="form tab-content-item " id="form_c">-塑胶原料3</div>
              <!--塑胶原料4-->
           <div class="form tab-content-item " id="form_d">-塑胶原料4</div>
 *          
 *    </div>
 * 
 * </div>
 * 
 * 
 * 		//点击事件
		$(".tab-item").on("tab_select",function(event,element){			
			//element 当前点击的元素	
			
		});
 * 
 * */

+function ($) {

  // 选项卡tag-box tap 新的
  $(".tab-big .tab-ttl .tab-item").on("click", function (e) {

    e.preventDefault();
    var p = $(this).parents(".tab-big");
    p.find(".tab-ttl .tab-item").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("data-target");
    $(".tab-content", p).find(".tab-content-item").removeClass("active");
    $(".tab-content", p).find(target).addClass("active");

    // 点击触发自定义事件 
    $(this).trigger("tab_select", [this]);
  });
}(window.jQuery || window.Zepto);


namespace.extend(rootObj, "page").index = function () {

	return {};
}();
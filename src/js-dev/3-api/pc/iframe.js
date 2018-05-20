/**
 * iframe
 * **/

namespace.extend(rootObj, "api").iframe = (function($) {
	
	// 设置iframe 高度
	var _setHeight = function() {
		var windows_h=parseInt( $("body").height())+10;

		$(window.parent.document).find(".parent-window").css("height",0).css("height",windows_h);
		
	}
	
	return {
		setHeight:_setHeight
	}

})(window.jQuery);



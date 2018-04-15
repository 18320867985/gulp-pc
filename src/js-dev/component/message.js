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

(function() {
	
	//  confirm
	jQuery.fn.extend({
		
		confirm: function(mess, okfun, cancelfun,obj) {
			if(!arguments.length >= 2) {

					throw new Error("prop is min three");
				}
			obj=obj||{};
			var _okText=obj.ok||"确认";
			var _cancelText=obj.cancel||"取消";
			
			this.each(function(i, v) {
				
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
				$(".message").on("click", ".confirm-btn.ok", function(e) {

					if(typeof okfun === "function") {
						okfun.call(v);
					}
					$(".message").fadeOut().remove();
				});

				$(".message").on("click", ".confirm-btn.cancel", function(e) {

					if(typeof cancelfun === "function") {
						cancelfun.call(v);
					}
					$(".message").fadeOut().remove();
				});

			});
		},

	});
	
	
	//  alert
	jQuery.fn.extend({
		
		alert: function(mess,obj) {
			
			obj=obj||{};
			var _okText=obj.ok||"确定";
		
			this.each(function(i, v) {
				
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
				$(".message").on("click", ".alert-btn.ok", function(e) {

					$(".message").fadeOut().remove();
				});

				
			});
		},

	});
	
	
	
})();
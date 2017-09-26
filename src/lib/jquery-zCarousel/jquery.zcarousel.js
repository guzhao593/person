$.fn.zCarousel=function(options){
		// 属性
		var defaults = {
			// 宽高
			width:320,
			height:320,

			// 自动轮播
			autoPlay:true,

			// 显示小图
			showSmall:true,

			// 显示左右按钮
			showButton:true,

			// 是否显示页码
			showPage:false,

			// 播放间隔
			duration:3000,

			// 轮播类型：fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
			type:'vertical',

			// 默认显示图片索引
			index:0
		}
		// 这里的this,jquery对象
		this.each(function(){
			//这里的this为DOM节点
			var $this = $(this);
			if(options.width === '100%'){
				options.width = $this.width();
			}
			var opt = $.extend({},defaults,options);
			var carousel = {
				init:function(){
					// 生成html结构
					var $ul = $('<ul/>');
					if(opt.choice){
						$ul.html(opt.choice.map(function(item,idx){
								return `<li><a href=''>
                                <div class="choice_fl">
                                    <img src="${opt.imgs[idx]}">
                                </div>
                                <div class="choice_fr">
                                    <p class="choice_flags"></p>
                                    <h2 class="choice_tit">${item.choiceTitle}</h2>
                                    <p class="subtitle">${item.subTitle}</p>
                                    <div class="choice_price clearfix">
                                        <span class="fl y_price">
                                            <i>¥</i>${item.flyPrice}
                                        </span>
                                        <span class="fl y_sale_price">
                                            <p class="i_pos_abs">
                                                <em class="i_tag i_zj">直降</em>
                                            </p>
                                            <span class="or_p">平日价</span>
                                            <em class="line_price">
                                                <i>&yen;</i>
                                                ${item.linePrice}
                                            </em>
                                        </span>
                                    </div>
                                    <div class="choice_comment clearfix">
                                        <div class="comment_img">
                                            <img src="img/head_img.jpg" width="28" height="28">
                                        </div>
                                        <div class="comment_rt">
                                            <p class="comment_name">${item.commentName}</p>
                                            <p class="commnet_privew">${item.commnetPrivew}</p>
                                        </div>
                                    </div>
                                </div>
                            	</a></li>`;
						}).join(''));
					}else{
							$ul.html(opt.imgs.map(function(item){
								if(typeof(item) == 'string'){
										return `<li><img src="${item}"/></li>`;
									}else if(typeof(item) == 'object'){
										return `<li><a><i>10:00</i><img src="${item.img1}"/></a><a><i>10:00</i><img src="${item.img2}"/></a><a><i>10:00</i><img src="${item.img3}"/></a></li>`;
									}
							}).join(''));
						
					}
					$this.append($ul);
					$this.find('li').eq(0).clone(true,true).appendTo($this.find('ul'));
					// 添加插件样式
					$this.addClass('zcarousel');
					$ul.addClass(opt.type);
					if(opt.type === 'horizontal'){
						$ul.width(opt.width*(opt.imgs.length+1));
						$ul.children().css({width:opt.width,height:opt.height});
					}else if(opt.type === 'fade'){
						$ul.css({
							width:opt.width,
							height:opt.height
						});
					}
					// 设置宽高
					$this.css({
						width:opt.width,
						height:opt.height
					});
					// 页码
					if(opt.showPage){
						var $page = $('<div/>').addClass('page');
						// 重复生成span标签
						var page_html = '<span></span>'.repeat(opt.imgs.length);
						$page.html(page_html);
						$page.appendTo($this);
					}else if(opt.showSmall){
						var $small = $('<div/>').addClass('small');
						if(opt.smallDown){
							$small.html(opt.imgs.map(function(item,idx){
								return `<span><i></i><img src="${item}" idx='${idx}'/></span>`;
							}).join(""));
							$small.css({
								bottom:'-90px',
								transform:'translateX(0)',
								left:0,
								zIndex:10
							});
							$small.appendTo($this);
							$small.width(opt.imgs.length*$small.children().outerWidth(true)).height(90);
						}else{
							var $cloneUl = $ul.clone().removeClass().attr('style','');
							$cloneUl.appendTo($small);
							$small.appendTo($this);
							$small.width(opt.imgs.length*66);
						}
						$small.on('mouseover','img',function(){
							opt.index = Number($(this).attr('idx'));
							carousel.move();
							
						})
					}
					// 左右按钮
					if(opt.showButton){
						if(opt.mainWidth){
							var $btnPrev = $('<span/>').addClass('btn-prev').css('left',(opt.width-opt.mainWidth)/2).hide().css('background',opt.btnBackground[0]);
							if(opt.btnLeft){
								$btnPrev.css('left',opt.btnLeft);
							}
							var $btnNext = $('<span/>').addClass('btn-next').css('right',(opt.width-opt.mainWidth)/2).hide().css('background',opt.btnBackground[1]);
							if(opt.btnRight){
								$btnNext.css('right',opt.btnRight);
							}
							if(opt.btnWidth && opt.btnHeight){
								$btnPrev.width(opt.btnWidth).height(opt.btnHeight);
								$btnNext.width(opt.btnWidth).height(opt.btnHeight);
							}
						}else{
							var $btnPrev = $('<span/>').addClass('btn-prev').html('&lt;').css('background',opt.btnBackground[0]);
							var $btnNext = $('<span/>').addClass('btn-next').html('&gt;').css('background',opt.btnBackground[1]);
						}
						$this.on('mouseenter',function(){
							$btnPrev.stop(true).fadeIn('slow');
							$btnNext.stop(true).fadeIn('slow');
						}).on('mouseleave',function(){
							$btnPrev.stop(true).fadeOut('slow');
							$btnNext.stop(true).fadeOut('slow');
						});
						$this.append([$btnNext,$btnPrev]);
					}
					// 自动轮播
					if(opt.autoPlay){
						this.start();
						// $this.trigger('mouseleave');
						$this.on('mouseenter',()=>{
							this.stop();
						}).on('mouseleave',()=>{
							this.start();
						})
					}
					$(window).blur(()=>{
						this.stop();
					}).focus(()=>{
						this.start();
					});
					// 点击页码
					$this.on('click','.page span',function(){
						opt.index = $(this).index();
						carousel.move();
					})
					// 左右按钮
					.on('click','.btn-prev',function(){
						opt.index--;
						carousel.move();
					}).on('click','.btn-next',function(){
						opt.index++;
						carousel.move();
					});
					// 显示当前图片
					this.move();
				},
				move:function(){
					// 处理index值
					
					var $ul = $this.find('ul');
					var $small = $this.find('.small');
					// 动画属性
					var params = {};
					// 水平垂直
					if(opt.type === 'vertical'){
						if(opt.index>=(opt.imgs.length+1)){
							opt.index = 1;
							$ul.css('top',0);
						}else if(opt.index<0){
							opt.index = opt.imgs.length;
						}
						params.top = -opt.index*opt.height;
						$ul.stop(true).animate(params);
					}else if(opt.type === 'horizontal'){
						console.log(opt.index)
						if(opt.index>=(opt.imgs.length+1)){
							opt.index = 1;
							$ul.css('left',0);
						}else if(opt.index<0){
							opt.index = opt.imgs.length-1;
							$ul.css('left',-$ul.width()/$ul.children().length*($ul.children().length-1));
						}
						params.left = -opt.index*opt.width;
						$ul.stop(true).animate(params);
					}
					// 淡入淡出
					else if(opt.type === 'fade'){
						if(opt.index>=opt.imgs.length){
							opt.index = 0;
						}else if(opt.index<0){
							opt.index = opt.imgs.length-1;
						}
						$ul.children().eq(opt.index).stop(true).animate({opacity:1}).siblings('li').stop(true).animate({opacity:0});
					}
					// 高亮显示页码
					if(opt.showPage){
						$this.find('.page').children().eq(opt.index%opt.imgs.length).addClass('active').siblings('span').removeClass();
					}
					if(opt.smallDown){
						$small.find('i').css('display','none').eq(opt.index).css('display','block');
					}
				},
				stop:function(){
					clearInterval(opt.timer);
				},
				start:function(){
					clearInterval(opt.timer);
					opt.timer = setInterval(function(){
						opt.index++;
						this.move();
					}.bind(this),opt.duration);
				}
			}
			carousel.init();
		});
		// 为了链式调用
		return this;
		}

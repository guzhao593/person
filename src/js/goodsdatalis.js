/* 
* @Author: Marte
* @Date:   2017-09-26 09:17:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 18:06:57
*/

require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html',function(){
            $('.guiding a').removeClass('hover').eq(2).addClass('hover');
        });
        $('#footer').load('../html/footer.html');
        $('.sidebar').load('../html/slider.html');
        com.slider();
        var id = location.search.slice(1);
        $.get('../api/goodsdatalis.php?'+id,function(data,status){
                if(status == 'success'){
                    var goodsData = JSON.parse(data)[0];
                    var opt = {
                        box:$('.sh-goods-gallery'),
                        imgs:goodsData.showimgurl.split(','),
                        bigImgs:goodsData.bigimgurl.split(','),
                        index:0
                    }
                    var Gallery = {
                        init:function(){
                            $this = opt.box;
                            $ul = $('<ul/>');
                            $ul.html(opt.imgs.map(function(item){
                                return `<li><img src="${item}"></li>`;
                            }).join(''));
                            $ul.appendTo($this.find('.items'));
                            $ul.children().first().addClass('active');
                           this.show(opt.index);
                           $('.prev').click(()=>{
                                opt.index--;
                                this.move();
                           });
                           $('.next').click(()=>{
                                opt.index++;
                                this.move();
                           });
                           $ul.on('click','li',function(){
                                $(this).addClass('active').siblings().removeClass('active');
                                Gallery.show($(this).index());
                           });

                           return this;

                        },
                        move:function(){
                            if(opt.index<0){
                                opt.index = 0;
                            }else if(opt.index>=opt.imgs.length){
                                opt.index = opt.imgs.length-1;
                            }
                            var left = -opt.index*$ul.children().first().outerWidth(true);
                            $ul.stop(true).animate({left:left},'fast');
                            return this;
                        },
                        show:function(idx){
                            $('#addCartImg').attr('src',opt.imgs[idx]).attr('data-big',opt.bigImgs[idx]);
                            $('.lens a').attr('href',opt.imgs[idx]);
                            return this;
                        }
                    }
                    Gallery.init();
                    var Jqzoom ={
                        init:function(){
                            $this = $('.jqzoom');
                            $this.mouseenter(()=>{
                                this.show();
                                $this.mousemove((e)=>{
                                                    var left =e.clientX - $this.offset().left +window.scrollX - $('.jqZoomPup').width()/2;
                                                    var top =e.clientY- $this.offset().top + window.scrollY - $('.jqZoomPup').height()/2;
                                                    if(left<0){
                                                        left = 0;
                                                    }else if(left >=  
                                                        $this.width()-$('.jqZoomPup').width()){
                                                        left = $this.width() -$('.jqZoomPup').width();
                                                    }
                                                    if(top<0){
                                                        top = 0;
                                                    }else if(top >=  
                                                        $this.height()-$('.jqZoomPup').height()){
                                                        top = $this.height() -$('.jqZoomPup').height();
                                                    }
                                                    $('.jqZoomPup').css({
                                                        left:left,
                                                        top:top
                                                    });
                                                    
                                                    $('.zoomdiv').children().css({
                                                        position:'absolute',
                                                        left:-left*this.ratio,
                                                        top:-top*this.ratio
                                                    });
                                                })
                            }).mouseleave(()=>{
                                this.remove();
                            });
                            return this;
                        },
                        show:function(){
                            var $bigBox = $('<div/>').addClass('zoomdiv').css({
                                display:'block',
                                left:450,
                                top:0
                            });
                            $bigBox.appendTo($this.parent());
                            var bigImgUrl = $this.children().attr('data-big');
                            var $bigImg = $('<img/>').attr('src',bigImgUrl);
                            $bigImg.appendTo($bigBox);
                            $bigImg[0].onload = ()=>{
                                this.ratio = $('.zoomdiv').find('img').width()/$('.jqzoom').width();
                                var $min = $('<div/>').addClass('jqZoomPup').css({
                                    width:$('.jqzoom').width()/this.ratio,
                                    height:$('.jqzoom').height()/this.ratio,
                                    visibility:'visible',
                                    opacity:0.4
                                });
                                 $min.appendTo($this);
                                
                            }
                            return this;
                        },
                        remove:function(){
                            $('.jqZoomPup').remove();
                            $('.zoomdiv').remove();
                        }
                    }
                    Jqzoom.init();


                    //将商品详细数据写入到页面
                    $('.sh-crumbs').html(
                            `当前位置：
                        <a href="../index.html" >首页</a>
                        <code>></code>
                        <a href="html/goodslist.html">${goodsData.mainclass}</a>
                        <code>></code>
                        <a href="html/goodslist.html">${goodsData.subclass}</a>
                        <code>></code> ${goodsData.brand}  ${goodsData.name}${goodsData.spec}`
                        );
                    $('.country-brand a').text(goodsData.brand);
                    $('.sh-goods-parameters h1').text(`${goodsData.brand}  ${goodsData.name}${goodsData.spec}`);
                    $('.description').text(goodsData.descipt);
                    $('#size span').html(`<i></i>${goodsData.spec}`);
                    $('.price').html(`<i>￥</i>${goodsData.price}`);
                    $('.row').eq(0).find('.details').text(goodsData.name);
                    $('.row').eq(1).find('.details').text(goodsData.brand);
                    $('.row').eq(2).find('.details').text(goodsData.addtime);
                    $('.row').eq(3).find('.details').text(goodsData.spec);
                    $('.pic p').html(goodsData.datalisimgurl.split(',').map(function(item){
                        return `<img   class="lazy-loading" src="${item}" />`;
                    }));
                    //点击加减按纽
                    com.btnNum();
                             
                        
                }
        });
    })
})
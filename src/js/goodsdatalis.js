/* 
* @Author: Marte
* @Date:   2017-09-26 09:17:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 22:41:15
*/

require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html',function(){
            $('.guiding a').removeClass('hover').eq(2).addClass('hover');
        });
        $('#footer').load('../html/footer.html');

        var opt = {
            box:$('.sh-goods-gallery'),
            imgs:['../img/food_001/food_001_1.jpg','../img/food_001/food_001_2.jpg','../img/food_001/food_001_3.jpg','../img/food_001/food_001_4.jpg','../img/food_001/food_001_5.jpg','../img/food_001/food_001_1.jpg','../img/food_001/food_001_2.jpg','../img/food_001/food_001_3.jpg','../img/food_001/food_001_4.jpg','../img/food_001/food_001_5.jpg'],
            bigImgs:['../img/food_001/food_001_1_big.jpg','../img/food_001/food_001_2_big.jpg','../img/food_001/food_001_3_big.jpg','../img/food_001/food_001_4_big.jpg','../img/food_001/food_001_5_big.jpg','../img/food_001/food_001_1_big.jpg','../img/food_001/food_001_2_big.jpg','../img/food_001/food_001_3_big.jpg','../img/food_001/food_001_4_big.jpg','../img/food_001/food_001_5_big.jpg'],
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
                return this;
            }
        }
        Gallery.init();
        var Jqzoom ={
            init:function(){
                $this = $('.jqzoom');
                $this.mouseenter(()=>{
                    this.show();
                }).mousemove((e)=>{
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
                    var ratio = $('.zoomdiv').width()/$('.jqzoom').width();
                    $('.zoomdiv').children().css({
                        position:'absolute',
                        left:-left*ratio,
                        top:-top*ratio
                    });
                }).mouseleave(()=>{
                    this.remove();
                });
                return this;
            },
            show:function(){
                var $min = $('<div/>').addClass('jqZoomPup').css({
                    width:50,
                    height:50,
                    visibility:'visible',
                    opacity:0.4
                });
                $min.appendTo($this);
                var $bigBox = $('<div/>').addClass('zoomdiv').css({
                    display:'block',
                    left:450,
                    top:0
                });
                $bigBox.appendTo($this.parent());
                var bigImgUrl = $this.children().attr('data-big');
                var $bigImg = $('<img/>').attr('src',bigImgUrl);
                $bigImg.appendTo($bigBox);
                return this;
            },
            remove:function(){
                $('.jqZoomPup').remove();
                $('.zoomdiv').remove();
            }
        }
        Jqzoom.init();
    })
})
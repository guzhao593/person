/* 
* @Author: Marte
* @Date:   2017-09-24 17:35:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 18:07:31
*/

define(['jquery'],function($){
    return {
        slider:function(){
            $('.sidebar').on('mouseover','li',function(){
                $('.sidebar').find('li').removeClass('hover');
                $(this).addClass('hover');
            }).mouseout(function(){
                $('.sidebar').find('li').removeClass('hover');
            });
            $('.fly-care').click(function(){
                if($('.show-care').hasClass('show')){
                    $('.sidebox').animate({right:-270},400);
                    setTimeout(function(){
                        $('.show-care').removeClass('show').addClass('hide');
                    },400)
                }else if( $('.sidebox').css('right') == '-270px' && $('.show-care').hasClass('hide')){
                    $('.sidebox').animate({right:0},400);
                    $('.show-care').removeClass('hide').addClass('show');
                }else if( $('.sidebox').css('right') == '0px' && $('.show-care').hasClass('hide')){
                    $('.show-care').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
                }
                var viewData = [];
                var cookies = document.cookie;
                if(cookies.length>0){
                    cookies = cookies.split(';');
                    cookies.forEach(function(item){
                        var temp = item.split('=');
                        if(temp[0] == 'viewData'){
                            viewData = JSON.parse(temp[1]);
                        }
                    })
                }

                if(viewData.length == 0){
                    $('.empty').css('display','block').next().css('display','none');
                }else{
                    console.log($('.show-goods'))
                    $('.show-goods').css('display','block').css('height',window.innerHeight-61+'px').prev().css('display','none');
                    console.log(window.innerHeight);
                    $('.show-goods').html(viewData.map(function(item){
                        return `<div class="goods-box clearfix">
                                    <a href="html/goodsdatalis.html?id=${item.id}">
                                        <img src="${item.imgurl}" alt="">
                                        <p>${item.title}</p>
                                        <p>${item.price}</p>
                                        <i></i>
                                    </a>

                                </div>`;
                    }).join(''));
                }

            });
            $('.fly-cart').click(function(){
                if($('.show-cart').hasClass('show')){
                    $('.sidebox').animate({right:-270},400);
                    setTimeout(function(){
                        $('.show-cart').removeClass('show').addClass('hide');
                    },400)
                }else if( $('.sidebox').css('right') == '-270px' && $('.show-cart').hasClass('hide')){
                    $('.sidebox').animate({right:0},400);
                    $('.show-cart').removeClass('hide').addClass('show');
                }else if( $('.sidebox').css('right') == '0px' && $('.show-cart').hasClass('hide')){
                    $('.show-cart').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
                }
            });
            $('.side-content h3 i').click(function(){
                $('.sidebox').animate({right:-270},400);
                setTimeout(()=>{
                    $(this).parent().parent().removeClass('show').addClass('hide');
                },400);
            });
            $('.fly-return').click(function(){
                var times = setInterval(function(){
                    var y = window.scrollY;
                    var speed = Math.ceil(y/8);
                    if(y<=0){
                        clearInterval(times);
                    }
                    if(speed<=5){
                        speed = 5;
                    }
                    window.scrollTo(0,y-speed);
                },20)
            });
        },
        btnNum:function(){
            var input = $('#goodsNumber .box input');
            input.prev().addClass('limit').siblings().removeClass('limit');
            $('#goodsNumber .box').on('click','a,input',function(){
                if($(this).text() == '-'){
                    input.val(input.val()*1-1);
                    if(input.val() < 1){
                        input.val(1);
                        $('#errNum').css('display','block').html(`<i></i>最少购买1件`).fadeOut(4000);
                    }
                }
                if($(this).text() == '+'){
                    input.val(input.val()*1+1);
                    if(input.val() > 6){
                         input.val(6);
                         $('#errNum').css('display','block').html(`<i></i>限购6件`).fadeOut(3000);
                    }
                }
                if($(this).attr('type') == 'text'){
                    var temp=$(this).val();
                    $(this).focus(function(){
                        temp = $(this).val();
                        console.log(temp);
                    }).blur(function(){
                        if(isNaN($(this).val()*1)){
                            $(this).val(temp);
                            $('#errNum').css('display','block').html(`<i></i>数量必须为数字`).fadeOut(3000);
                        }else if($(this).val()*1 <1){
                            $(this).val(1);
                        }else if($(this).val()*1 >6){
                            $(this).val(6);
                        }
                        if(input.val()*1 <= 1){
                            input.prev().addClass('limit').siblings().removeClass('limit');
                        }else if(input.val()*1 >= 6){
                            input.next().addClass('limit').siblings().removeClass('limit');
                        }else{
                            input.siblings().removeClass('limit');
                        }
                    })
                }
                if(input.val()*1 <= 1){
                    input.prev().addClass('limit').siblings().removeClass('limit');
                }else if(input.val()*1 >= 6){
                    input.next().addClass('limit').siblings().removeClass('limit');
                }else{
                    input.siblings().removeClass('limit');
                }
            })
            return this;
        },
        parabola:function(){
            function Parabola(){
                this.init();
            }
            Parabola.prototype = {
                constructor:Parabola,
                init:function(){
                    var addBtn = $('.sh-shopping-cart');
                    addBtn.click(()=>{
                        var src = $('.items li.active img').attr('src');
                        this.img = $('<img/>').attr('src',src).addClass('parabola').appendTo(addBtn);
                        this.move();
                        return this;
                    });
                },
                move:function(){
                    var targetTop = $('.fly-cart').offset().top-window.scrollY;
                    var targetLeft = $('.fly-cart').offset().left-window.scrollX;
                    var js = 0;
                    var para = setInterval(()=>{
                        var imgTop = this.img.offset().top-window.scrollY;
                        var imgLeft = this.img.offset().left-window.scrollX;
                        var xSpeed = (targetLeft -imgLeft)/10;
                        xSpeed  = xSpeed <3 ? xSpeed = 3 : xSpeed ;
                        var ySpeed =(imgTop - 0)/3.2;
                        imgLeft += xSpeed;
                        if(imgLeft >= targetLeft){
                            clearInterval(para);
                            this.remove();
                        }
                        ySpeed  = ySpeed <1 ? ySpeed = 1 : ySpeed ;
                        if(ySpeed > 1 && js == 0){
                            imgTop -= ySpeed;
                        }
                        if(ySpeed <= 1 || js >0){
                            js++;
                            ySpeed = js*.7;
                            imgTop +=ySpeed;
                            if(imgTop>= targetTop){
                                imgTop = targetTop;
                            }
                        }
                        this.img.offset({
                            left:imgLeft+window.scrollX,
                            top:imgTop+window.scrollY
                        });
                    },30);
                    return this;
                },
                remove:function(){
                    this.img.remove();
                    return this;
                }
            }
            return new Parabola();
        }
    }
});
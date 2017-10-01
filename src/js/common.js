/* 
* @Author: Marte
* @Date:   2017-09-24 17:35:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 18:07:31
*/

define(['jquery'],function($){
    return {
        slider:function(){
            var Slider = {
                init:function(){
                    var self = this;
                    self.showCartGoods();
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
                            cookies = cookies.split('; ');
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
                            $('.show-goods').css('display','block').css('height',window.innerHeight-61+'px').prev().css('display','none');
                            $('.show-goods').html(viewData.map(function(item){
                                return `<div class="goods-box clearfix">
                                            <a href="html/goodsdatalis.html?id=${item.id}">
                                                <img src="${item.imgurl}" alt="">
                                                <p>${item.title}</p>
                                                <p>￥${item.price}</p>
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
                        
                        self.showCartGoods();
                    });
                    $('.show-goods').mouseover(function(){
                        $('.goods-box .delbtn').click(function(){
                            var cartData = [];
                            var cookies = document.cookie;
                            if(cookies.length>0){
                                cookies = cookies.split('; ');
                                cookies.forEach(function(item){
                                    var temp = item.split('=');
                                    if(temp[0] == 'cartData'){
                                        cartData = JSON.parse(temp[1]);
                                    }
                                })
                            }
                            cartData.forEach(function(item,idx){
                                if(item.id == $(this).parents('.goods-box').attr('data-id')*1){
                                    cartData.splice(idx,1);
                                }
                            }.bind(this));
                            var date = new Date();
                            date.setDate(date.getDate() +100);
                            document.cookie = 'cartData='+JSON.stringify(cartData)+';path=/;expires='+date.toUTCString();
                            self.showCartGoods();
                        });
                    })
                   
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
                    return this;
                },
                showCartGoods:function(){
                            var cartData = [];
                            var cookies = document.cookie;
                            if(cookies.length>0){
                                cookies = cookies.split('; ');
                                cookies.forEach(function(item){
                                    var temp = item.split('=');
                                    if(temp[0] == 'cartData'){
                                        cartData = JSON.parse(temp[1]);
                                    }
                                })
                            }
                            if(cartData.length == 0){
                                $('.empty').css('display','block').next().css('display','none');
                                $('.gocart').css('display','none');
                            }else{
                                $('.gocart').css('display','block');
                                $('.show-cart .show-goods').css('display','block').css('height',window.innerHeight-142+'px').prev().css('display','none');
                                $('.show-goods').html(cartData.map(function(item){
                                    return `<div class="goods-box clearfix" data-id="${item.id}">
                                                <a href="html/goodsdatalis.html?id=${item.id}">
                                                    <img src="${item.imgurl}" alt="">
                                                    <p>${item.title}</p>
                                                    <p><span>￥${item.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${item.qty}件</b></p>
                                                    <i></i>
                                                </a>
                                                <span class="delbtn">&times;</span>
                                            </div>`;
                                }).join(''));
                            }
                            var totalMoney = 0;
                            var totalQty = 0;
                            cartData.forEach(function(item){
                                totalMoney += item.qty*item.price;
                                totalQty += item.qty;
                            });
                            $('.gocart p span').text(`￥${totalMoney}.00`);
                            $('.cart-num').text(totalQty);
                            return this;
                }
            }
            return Slider;
        },
        btnNum:function($ele,cart){
            var self = this;
            $ele.each(function(){
                let $ele = $(this)
                let input = $ele.find('input');
                input.prev().addClass('limit').siblings().removeClass('limit');
                $ele.on('click','a,input',function(e){
                    if($(this).text() == '-'){
                        input.val(input.val()*1-1);
                        console.log(input.val());
                        if(input.val() < 1){
                            input.val(1);
                            $ele.next().css('display','block').html(`<i></i>最少购买1件`).fadeOut(4000);
                        }
                        changeNum();
                    }
                    if($(this).text() == '+'){
                        input.val(input.val()*1+1);
                        console.log(input.val());
                        if(input.val() > 6){
                             input.val(6);
                             $ele.next().css('display','block').html(`<i></i>限购6件`).fadeOut(3000);
                        }
                        changeNum();
                    }
                    if($(this).attr('type') == 'text'){
                        var temp=$(this).val();
                        $(this).focus(function(){
                            temp = $(this).val();
                        }).blur(function(){
                            if(isNaN($(this).val()*1)){
                                $(this).val(temp);
                                $ele.next().css('display','block').html(`<i></i>数量必须为数字`).fadeOut(3000);
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
                            changeNum();
                        })
                    }
                    if(input.val()*1 <= 1){
                        input.prev().addClass('limit').siblings().removeClass('limit');
                    }else if(input.val()*1 >= 6){
                        input.next().addClass('limit').siblings().removeClass('limit');
                    }else{
                        input.siblings().removeClass('limit');
                    }
                    function changeNum(){
                        if(cart=='cart'){
                            console.log(333);
                            var cartData = [];
                            var cookies = document.cookie;
                            if(cookies.length>0){
                                cookies = cookies.split('; ');
                                cookies.forEach(function(item){
                                    var temp = item.split('=');
                                    if(temp[0] == 'cartData'){
                                        cartData = JSON.parse(temp[1]);
                                    }
                                })
                            }
                            cartData.forEach(function(item){
                                if(item.id == $ele.parents('.cart_form').attr('data-id')){
                                    item.qty = input.val()*1;
                                }
                            });
                            var date = new Date();
                            date.setDate(date.getDate() + 100);
                            document.cookie ='cartData='+JSON.stringify(cartData)+';path=/;expires=' +date.toUTCString();
                            self.slider().showCartGoods();
                            self.cartshow();
                        }
                    }
                })
            });
            return this;
        },
        parabola:function(){
            function Parabola(){
                this.init();
            }
            Parabola.prototype = {
                constructor:Parabola,
                init:function(){
                    var src = $('.items li.active img').attr('src');
                    this.img = $('<img/>').attr('src',src).addClass('parabola').appendTo($('.sh-shopping-cart'));
                    this.move();
                    return this;
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
        },
        addCart:function(idNum,goodsData){
            var $this = $('.sh-shopping-cart');
            $this.click(()=>{
                var cartData = [];
                var cookies = document.cookie;
                if(cookies.length>0){
                    cookies = cookies.split('; ');
                    cookies.forEach(function(item){
                        var temp = item.split('=');
                        if(temp[0] == 'cartData'){
                            cartData = JSON.parse(temp[1]);
                        }
                    })
                }

                var qty = Number($('#goodsNumberInput').val());
                var has = false;
                cartData.forEach((item)=>{
                    if(item.id == idNum){
                        has = true;
                        item.qty += qty;
                        if(item.qty>6){
                            item.qty = 6;
                            alert('你购买的数量已经达到限购的数量6件！');
                        }else{
                            this.parabola();
                            
                        }
                    }
                });
                if(!has){
                    this.parabola();
                    cartData.push({
                        id:idNum,
                        imgurl:goodsData.imgurl,
                        title:goodsData.name,
                        price:goodsData.price,
                        qty:qty
                    });
                }
                var date = new Date();
                date.setDate(date.getDate() + 100);
                document.cookie ='cartData='+JSON.stringify(cartData)+';path=/;expires=' +date.toUTCString();
                this.slider().showCartGoods();
                this.topcart();
                
            });
            return this;
        },
        topcart:function(){
            var Topcart = {
                init:function(){
                    var self = this;
                    var $this = $('.hidecar .carlist');
                    var cartData = [];
                    var cookies = document.cookie;
                    if(cookies.length>0){
                        cookies = cookies.split('; ');
                        cookies.forEach(function(item){
                            var temp = item.split('=');
                            if(temp[0] == 'cartData'){
                                cartData = JSON.parse(temp[1]);
                            }
                        })
                    }
                    if(cartData.length>0){
                        $('.gocart').css('display','block');
                        console.log($('.carlist .show-goods'));
                        $('.carlist .show-goods').css('display','block').prev().css('display','none');
                        $('.show-goods').html(cartData.map(function(item){
                            return `<div class="goods-box clearfix" data-id="${item.id}">
                                        <a href="html/goodsdatalis.html?id=${item.id}">
                                            <img src="${item.imgurl}" alt="">
                                            <p>${item.title}</p>
                                            <p><span>￥${item.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${item.qty}件</b></p>
                                            <i></i>
                                        </a>
                                        <span class="delbtn">&times;</span>
                                    </div>`;
                        }).join(''));
                    }else{
                        $('.empty').css('display','block').next().css('display','none');
                        $('.gocart').css('display','none');
                    }
                }
            }
            return Topcart.init();
        },
        cartshow:function(){
            var cartData = [];
            var cookies = document.cookie;
            if(cookies.length>0){
                cookies = cookies.split('; ');
                cookies.forEach(function(item){
                    var temp = item.split('=');
                    if(temp[0] == 'cartData'){
                        cartData = JSON.parse(temp[1]);
                    }
                })
            }
            if(cartData.length > 0){
                $('.cartlist ul').html(cartData.map(function(item){
                    var sumTotal = item.price*item.qty;
                    return `<li class="cart_form clearfix" data-id="${item.id}">
                                <div class="shopping_con">
                                    <div class="c_meg">
                                        <dl>
                                            <dt>
                                            <a href="html/goodsdatalis.html?id=${item.id}"><img src="${item.imgurl}" width="78" height="78"></a>
                                            </dt>
                                            <dd>
                                                <p class="m_tit">
                                                    <a href="html/goodsdatalis.html?id=${item.id}">${item.title}</a>
                                                </p>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="c_price">
                                        <p class="c_price_num">¥<i>${item.price}</i></p>
                                    </div>
                                    <div class="c_quantity">
                                        <div class="c_amount clearfix">
                                            <a>-</a>
                                            <input type="text" name="amt" value="${item.qty}">
                                            <a>+</a>
                                        </div>
                                        <span  class="err-info" style="display: none;"><i></i></span>
                                    </div>
                                    <div class="c_sum">
                                        <p>¥<i>${sumTotal}</i></p>
                                    </div>
                                    <div class="c_action">
                                        <i class="i_del">删除</i>
                                    </div>
                                    <div class="c_check">
                                        <input type="checkbox">
                                    </div>
                                </div>
                            </li>`;
                }).join('')).find('.c_amount input').each(function(){
                var inp = $(this);
                if(inp.val()*1 <= 1){
                    inp.prev().addClass('limit').siblings().removeClass('limit');
                }else if(inp.val()*1 >= 6){
                    inp.next().addClass('limit').siblings().removeClass('limit');
                }else{
                    inp.siblings().removeClass('limit');
                }
            });
            }
            return this;
        }
    }
});
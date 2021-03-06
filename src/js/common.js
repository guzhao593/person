/* 
* @Author: Marte
* @Date:   2017-09-24 17:35:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-08 22:30:28
*/

define(['jquery'],function($){
    return {
        //首页热门产品显示
        showhotgoods:function(){
            var Showhotgoods={
                init:function(){
                    $.get('../api/goodslist.php?totalnum=hot&page=1',function(data,status){
                        if(status == 'success'){
                            var dataReceive = data.split('&');
                            var dataTotal = JSON.parse(dataReceive[0])[0][0];
                            var showNum = 30;
                            var goodsData = JSON.parse(dataReceive[1]);
                            var $goodsBox = $('.golbal_list');
                            $goodsBox.html('');
                            var $ul = $('<ul/>');
                            $ul.html(goodsData.map(function(item){
                                return `<li>
                                        <div class="goods_box">
                                            <div class="goods_img_box">
                                                <a href="html/goodsdatalis.html?id=${item.id}" >
                                                    <img alt="${item.brand} ${item.name}${item.spec}" class="lazy-loading" src="${item.imgurl}">
                                                </a>
                                            </div>
                                            <p class="goods_box_tit c_clearfix">
                                                <a href="html/goodsdatalis.html?id=${item.id}">${item.brand} ${item.name}${item.spec}</a>
                                            </p>
                                            <div class="goods_yen">
                                                <span class="fl goods_price">
                                                    <i>&yen;</i>${item.price}
                                                </span>
                                                <span class="fl sale_price">
                                                    <p class="i_pos_abs"></p>
                                                </span>
                                                <span class="fr purchased">
                                                    <i>${item.salenum}人</i>已购买
                                                </span>
                                            </div>
                                        </div>
                                        <div class="tax_box_bt">
                                            <span class="fr time_rt">距结束仅剩 
                                                <span class="time_rest" data-attr={"endTime":"2018,05,30,10,06,14"}></span>
                                            </span>
                                        </div>
                                    </li>`;
                            }).join(''));
                            $ul.appendTo($goodsBox);
                        }
                    });
                }
            }
            return Showhotgoods.init();
        },
        //搜索功能
        search:function(){
            var Search={
                init:function(){
                    var self = this;
                    $('#search').keyup(function(){
                        if($(this).val().trim() !== ''){
                            self.show($(this).val());
                        }
                    });
                    $(document).on('mouseover',function(e){
                        if(!$(e.target).parents().hasClass('search')){
                            $('.keywords').css('display','none');
                        }
                    })
                },
                show:function(val){
                    $.get('../api/search.php?value='+val,function(data,status){
                        if(status == 'success'){
                            var searchData = JSON.parse(data);
                            $('.keywords').html(searchData.map(function(item,idx){
                                if(idx>=10){
                                    return;
                                }
                                return `<li><a href="html/goodsdatalis.html?id=${item.id}">${item.name}</a></li>`;
                            }).join(''));
                            if($('.keywords').html().trim() != ''){
                                $('.keywords').css('display','block');
                            }
                        }
                    });
                }
            }
            return Search.init();
        },
        //顶部公告滚动
        topnotice:function(){
            var height = $('.notice_top ul').children().height();
            setInterval(function(){
                $('.notice_top ul').animate({marginTop:-height},500,function(){
                    $(this).css('margin-top','0px').children().eq(0).clone().appendTo($(this));
                    $(this).children().eq(0).remove();
                });
            },3000);
        },
        //送货地址选择
        shiptoaddress:function(){
            var Shiptoaddress = {
                init:function(){
                    var self = this;
                    $('.store-select').mouseover(function(e){
                        if($('.content').css('display') == 'block'){
                            return false;
                        }
                        $('.content').css('display','block');
                        if($('.store-select .text').text() == '请选择'){
                            self.province();
                        }
                    });
                    $('.cls').click(function(){
                         $('.content').css('display','none');
                    });
                    $('.mt').on('click','li',function(){
                        if($(this).index() == 0){
                            $('.tab-content').css('display','none').eq($(this).index()).css('display','block');
                            $('.mt').children().eq($(this).index()).addClass('curr').siblings().removeClass('curr');
                        };
                        if($(this).index() == 1){
                            $('.tab-content').css('display','none').eq($(this).index()).css('display','block');
                            $('.mt').children().eq($(this).index()).addClass('curr').siblings().removeClass('curr');
                        };
                        if($(this).index() == 2){
                            $('.tab-content').css('display','none').eq($(this).index()).css('display','block');
                            $('.mt').children().eq($(this).index()).addClass('curr').siblings().removeClass('curr');
                        };
                    });
                    $('#stock_province_item').on('click','a',function(){
                        $(this).parents('.tab-content').find('a').removeClass('curr');
                        $(this).addClass('curr');
                        $('.mt').children().eq(0).find('em').text($(this).text());
                        $('.mt').children().eq(1).find('em').text('请选择');
                        $('.mt').children().eq(2).css('display','none');
                        $('.mt').children().eq(1).css('display','block').addClass('curr').siblings().removeClass('curr');
                        self.city($(this).attr('data-value'));
                    })
                    $('#stock_city_item').on('click','a',function(){
                        $(this).parents('.tab-content').find('a').removeClass('curr');
                        $(this).addClass('curr');
                        $('.mt').children().eq(1).find('em').text($(this).text());
                        $('.mt').children().eq(2).css('display','block').find('em').text('请选择');
                        $('.mt').children().eq(2).addClass('curr').siblings().removeClass('curr');
                        self.area($(this).attr('data-value'));
                    })
                    $('#stock_area_item').on('click','a',function(){
                        $(this).parents('.tab-content').find('a').removeClass('curr');
                        $(this).addClass('curr');
                        $('.mt').children().eq(2).find('em').text($(this).text());
                        $('.mt').children().eq(2).addClass('curr').siblings().removeClass('curr');
                        $('.content').css('display','none');
                        $('.store-select .text').text($('.mt').children().eq(0).find('em').text()+$('.mt').children().eq(1).find('em').text()+$('.mt').children().eq(2).find('em').text());
                    })
                },
                province:function(){
                    $('.tab-content').css('display','none');
                    $('.mt').children().css('display','none').eq(0).css('display','block');
                    $('#stock_province_item').css('display','block');
                    $.get('../api/goodsdatalis.php?province=all',function(data,status){
                        if(status == 'success'){
                            var province = JSON.parse(data);
                            $('#stock_province_item').html(province.map(function(item){
                                var className = '';
                                if(item.province.length == 4){
                                    className = 'col4';
                                }else if(item.province.length >4 && item.province.length <=8){
                                    className = 'col3';
                                }
                                
                                return `<li class="${className}">
                                            <a data-value="${item.provinceid}">${item.province}</a>
                                        </li>`;
                                })
                            );
                        }
                    });
                },
                city:function(provinceid){
                    $('.tab-content').css('display','none');
                    $('#stock_city_item').css('display','block');

                    $.get('../api/goodsdatalis.php?city='+provinceid,function(data,status){
                        if(status == 'success'){
                            var city = JSON.parse(data);
                            $('#stock_city_item').html(city.map(function(item){
                                var className = '';
                                if(item.city.length == 4){
                                    className = 'col4';
                                }else if(item.city.length >4 && item.city.length <=8){
                                    className = 'col3';
                                }else if(item.city.length >8){
                                    className = 'col2';
                                }
                                
                                return `<li class="${className}">
                                            <a data-value="${item.cityid}">${item.city}</a>
                                        </li>`;
                                })
                            );
                        }
                    });
                },
                area:function(cityid){
                    $('.tab-content').css('display','none');
                    $('#stock_area_item').css('display','block');
                    $.get('../api/goodsdatalis.php?area='+cityid,function(data,status){
                        if(status == 'success'){
                            var city = JSON.parse(data);
                            $('#stock_area_item').html(city.map(function(item){
                                var className = '';
                                if(item.area.length == 4){
                                    className = 'col4';
                                }else if(item.area.length >4 && item.area.length <=8){
                                    className = 'col3';
                                }else if(item.area.length >8){
                                    className = 'col2';
                                }
                                
                                return `<li class="${className}">
                                            <a data-value="${item.areaid}">${item.area}</a>
                                        </li>`;
                                })
                            );
                        }
                    });
                }
            }
            return Shiptoaddress.init();
        },
        //详情页大家都在看,同类商品
        watching:function(show,selector,showclass){
            $.get('../api/goodsdatalis.php?'+show+'='+showclass,function(data,status){
                if(status == 'success'){
                    var goodsData = JSON.parse(data);
                    var $watchingBox = $(selector);
                    $watchingBox.html(goodsData.map(function(item){
                        return `<li>
                                    <a href="html/goodsdatalis.html?id=${item.id}">
                                        <img src="${item.imgurl}">
                                        <span class="title">${item.name}*${item.spec}</span>
                                        <span>
                                            <span><i>￥</i>${item.price}</span>
                                        </span>
                                    </a>
                                </li>`;
                    }).join(''));
                }
            });
        },
        //详情页评论
        comment:function(){
            var Comment = {
                init:function(){
                    var self = this;
                    self.goodBad = 'all';
                    //每页显示评论数量
                    var showNum = 10;
                    //当前页面数
                    var page = 1;
                    self.showcomment('allfirst',1,function(){
                        self.showpage(page,showNum);
                    });
                    //滑动及点击时星星的显示
                    $('.comment-star-box').on('mouseover','span',function(){
                        var num = $(this).attr('data-num')-1;
                        $('.star').removeClass('star-hover');
                        $('.star').each(function(idx){
                            if(idx>num){
                                return;
                            }
                            $(this).addClass('star-hover');
                        });
                        $(this).click(function(){
                            $('.star').removeClass('star-active');
                            $('.star').each(function(idx){
                                if(idx>num){
                                    return;
                                }
                                $(this).addClass('star-active');
                            });
                        });
                    }).on('mouseout','span',function(){
                        $('.star').removeClass('star-hover');
                    });
                    //提交评论
                    $('.comment-submit').click(function(){
                        if($('textarea').val().trim() == ''){
                            $('.etips').css('display','block').text('评论不能为空');
                            return;
                        }
                        $('.etips').css('display','none');
                        var commentUserName = '';
                        var commentContent = $('textarea').val().trim();
                        var commentStar = $('.star-active').length;
                        if($('.username').length>0){
                            commentUserName = $('.username a').text();
                        }else{
                            commentUserName = '游客'+Date.now();
                        }
                        $.get('../api/comment.php?commentUserName='+commentUserName+'&commentContent='+commentContent+'&commentStar='+commentStar,function(data,status){
                            if(status == 'success'){
                                if(data){
                                    $('.etips').css('display','block').text('评价提交成功').fadeOut(3000);
                                    $('.star').removeClass('star-active');
                                    $('textarea').val('');
                                    page = 1;
                                    self.goodBad ='allfirst';
                                    self.showcomment(self.goodBad,page,function(){
                                        self.showpage(page,showNum);
                                    });
                                }
                            }
                        });
                    });
                    //评论分类
                    $('.select-comment').on('click','input,span',function(){
                        if($(this).is('#all') | $(this).is('.allifno')){
                            page = 1;
                            self.goodBad ='all';
                            self.showcomment(self.goodBad,page,function(){
                                self.showpage(page,showNum);
                            });
                            
                        }
                        if($(this).is('#good') | $(this).is('.goodifno')){
                            page = 1;
                            self.goodBad ='good';
                            self.showcomment(self.goodBad,page,function(){
                                self.showpage(page,showNum);
                            });
                        }
                        if($(this).is('#middle') | $(this).is('.middleifno')){
                            page = 1;
                            self.goodBad ='middle';
                            self.showcomment(self.goodBad,page,function(){
                                self.showpage(page,showNum);
                            });
                        }
                        if($(this).is('#bad') | $(this).is('.badifno')){
                            page = 1;
                            self.goodBad ='bad';
                            self.showcomment(self.goodBad,page,function(){
                                self.showpage(page,showNum);
                            });
                        }
                    });
                    $('.pagebox').on('click','a,li',function(){
                        //显示的最大页数
                        var lastPage = Math.ceil(self.commentTotal/showNum);
                        if($(this).is('.first')){
                            self.showcomment(self.goodBad,1);

                            page = 1;
                            self.showpage(page,showNum);
                        }
                        if($(this).is('.last')){
                            self.showcomment(self.goodBad,lastPage);
                            page =lastPage;
                            self.showpage(page,showNum);
                        }
                        if($(this).is('.prevpage')){
                            page--;
                            if(page<1){
                                page =1;
                            }
                            self.showcomment(self.goodBad,page);
                            self.showpage(page,showNum);
                        }
                        if($(this).is('.nextpage')){
                            page++;
                            if(page>lastPage){
                                page =lastPage;
                            }
                            self.showcomment(self.goodBad,page);
                            self.showpage(page,showNum);
                        }
                        if($(this).is('li')){
                            page = Number($(this).text());
                            self.showcomment(self.goodBad,page);
                            self.showpage(page,showNum);
                        }
                    });
                    return this;
                },
                showcomment:function(good,page,fn){
                    var self = this;
                    $.get('../api/comment.php?comment='+good+'&page='+page,function(data,status){
                        if(status == 'success'){
                            var commentData = data.split('&');
                            self.commentTotal =JSON.parse(commentData[0])[0][0]*1;
                            if(good == 'allfirst'){
                                self.commentGood = JSON.parse(commentData[2])[0][0]*1;
                                self.commentMiddle = JSON.parse(commentData[3])[0][0]*1;
                                self.commentBad = JSON.parse(commentData[4])[0][0]*1;
                                self.commentAll = self.commentGood+self.commentMiddle+self.commentBad;
                                $('#all').prop('checked',true);
                            }
                            var commentShow = JSON.parse(commentData[1]);
                            $('.comment-list').html(commentShow.map(function(item){
                                return `<li class="clearfix">
                                                <div class="descrption">
                                                    <p class="text">
                                                        ${item.content}
                                                    </p>
                                                    <p class="datetime">${item.time}</p>
                                                </div>
                                                <div class="attr">
                                                    <p>&nbsp;</p>
                                                    <p>&nbsp;</p>
                                                </div>
                                                <div class="author">
                                                    <span>${item.username}</span>
                                                    <i class="comment-star comment-star-${item.star}"></i>
                                                </div>
                                            </li>`;
                            }).join(''));
                            $('#flcomments').text(`(${self.commentAll})`);
                            $('#allifno').text(`全部评论(${self.commentAll})`);
                            $('#goodifno').text(`好评(${self.commentGood})`);
                            $('#middleifno').text(`中评(${self.commentMiddle})`);
                            $('#badifno').text(`差评(${self.commentBad})`);
                        }
                        if(fn){
                            fn(); 
                        }
                    });
                    return this;
                },
                showpage:function(page,showNum){
                    var self = this;
                    var pageul = $('.pagebox ul');
                    var lastPage = Math.ceil(self.commentTotal/showNum);
                    console.log(self.commentTotal);
                    if(lastPage<=6){
                        pageul.children().css('display','none');
                        pageul.children().each(function(idx){
                            if(idx<lastPage){
                                $(this).css('display','block').text(idx+1);
                            }
                        });
                    }else{
                        pageul.children().css('display','block');
                        var bigNum =pageul.children().eq(4).text()*1;
                        var smallNum = pageul.children().eq(1).text()*1;
                        if(page == bigNum+1 && page <= lastPage-1){
                            if(page == lastPage-1){
                                pageul.children().each(function(){
                                    bigNum++;
                                    $(this).text(bigNum-4);
                                })
                            }else{
                                pageul.children().each(function(){
                                    bigNum++;
                                    $(this).text(bigNum-3);
                                })
                            }
                        }
                        if(page == bigNum && page < lastPage-1){
                            pageul.children().each(function(){
                                bigNum++;
                                $(this).text(bigNum-4);
                            })
                        }
                        if(page == smallNum && page>2){
                            pageul.children().each(function(){
                                smallNum++;
                                $(this).text(smallNum-3);
                            })  
                        }
                        if(page == smallNum-1 && page>1){
                            pageul.children().each(function(){
                                smallNum++;
                                $(this).text(smallNum-3);
                            })  
                        } 
                    }
                    if(page == 1){
                        $('.first').addClass('active').siblings('a').removeClass('active');
                        if(lastPage>6){
                            var temp = page-1; 
                            pageul.children().each(function(){
                                temp++;
                                $(this).text(temp);
                            })
                        }
                    }else if(page ==  lastPage){
                        if(lastPage>6){
                            var temp = page-6;
                            pageul.children().each(function(){
                                temp++;
                                $(this).text(temp);
                            });
                        }
                        $('.last').addClass('active').siblings('a').removeClass('active');
                    }else if(page != 1 && page!=lastPage){
                        $('.first').removeClass('active').siblings('a').removeClass('active');
                    }
                    pageul.children().each(function(){
                        if($(this).text() == page){
                            $(this).addClass('active').siblings().removeClass('active');
                            return;
                        }
                    });
                }
            }
            return Comment.init();
        },
        //详情页吸顶菜单
        suctiontopmenu:function(goodsData){
            $('.tab-select a').each(function(){
                var url = location.href+'#'+$(this).attr('data-scroll');
                $(this).attr('href',url);
            });
            $('.tab-select a').click(function(){
                $(this).addClass('active').siblings().removeClass('active');
            });
            $(window).scroll(function(){
                var showTopHeight = $('.sh-goods-details').offset().top;
                if($(window).scrollTop() >showTopHeight){
                    $('.tab').addClass('fixed-bar');
                    $('.ext').css('display','block');
                    $('#ext_size').text(goodsData.spec);
                    $('#ext_color').text(goodsData.color);
                    $('#ext_num').text(`数量：${$('#goodsNumberInput').val()}`);
                }else{
                    $('.tab').removeClass('fixed-bar');
                    $('.ext').css('display','none');
                }
            });
        },
        //固定侧边栏
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
                            $('.show-care .show-goods').css('display','block').css('height',window.innerHeight-61+'px').prev().css('display','none');
                            $('.show-care .show-goods').html(viewData.map(function(item){
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
        //商品数量加减
        btnNum:function($ele,cart){
            var self = this;
            $ele.each(function(){
                var $ele = $(this);
                var input = $ele.find('input');
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
        //点击购买时抛物线动画
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
                        imgLeft += xSpeed;
                        var ySpeed =(imgTop - 0)/3.2;
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
        //增加商品到购物车
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
        //顶部购物车
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
        //购物页面订单显示
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
            var goodsQty = 0;
            var totalAll = 0;
            if(cartData.length > 0){
                    $('.cartlist ul').html(cartData.map(function(item){
                        var sumTotal = item.price*item.qty;
                        goodsQty+=item.qty;
                        totalAll+=sumTotal;
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
                                            <input type="checkbox" name="select" checked="checked">
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
            }else{
                $('.cartlist ul').html(`<li class="empty">你的购物车是空的</li>`);
            }
            $('.c_piece i').text(goodsQty);
            $('.fix_piece i').text(goodsQty);
            $('.totalall').text(totalAll);
            $('.c_paid i').text(totalAll);
            return this;
        },
        //购物车订单发生改变时
        cartchange:function(){
            var self = this;
            var Cart = {
                init:function(){
                    var $this = this;
                    var delBtn = $('.i_del');
                    delBtn.click(function(){
                        $this.delete($(this));
                    });
                    var $select = $('[name=select]');
                    var $selectAll = $('[name=allselect]');
                    $('#main').on('click','input,div',function(){
                        if($(this).attr('name') == 'select'){
                            $(this).prop('checked');
                            var checkedQty = 0;
                            $select.each(function(){
                                if(this.checked){
                                    checkedQty++;
                                }
                            })
                            $this.showTotal();
                            if(checkedQty == $select.length){
                                $selectAll.prop('checked',true);
                            }else{
                                $selectAll.prop('checked',false);
                            }
                        }
                        if($(this).attr('name') == 'allselect'){
                            $(this).prop('checked');
                            $selectAll.prop('checked',$(this).prop('checked'));
                            $select.prop('checked',$(this).prop('checked'));
                            $this.showTotal();
                        }
                        if($(this).hasClass('b_del')){
                            $select.each(function(){
                                if(this.checked){
                                    $this.delete($(this)); 
                                }
                            })
                        }
                    });
                    return this;
                },
                delete:function($ele){
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
                        if(item.id == $ele.parents('.cart_form').attr('data-id')){
                            cartData.splice(idx,1);
                        }
                    });
                    var date = new Date();
                    date.setDate(date.getDate() + 100);
                    document.cookie ='cartData='+JSON.stringify(cartData)+';path=/;expires=' +date.toUTCString();
                    self.slider().showCartGoods();
                    self.cartshow();
                },
                showTotal:function(){
                    var totalAll = 0;
                    var goodsQty = 0;
                    $('input[name=select]').prop('checked',function(idx,item){
                        if(item == true){
                            totalAll += $(this).parent().prev().prev().find('i').text()*1;
                            goodsQty += $(this).parent().prev().prev().prev().find('input').val()*1;
                        }
                    });
                    $('.totalall').text(totalAll);
                    $('.c_paid i').text(totalAll);
                    $('.c_piece i').text(goodsQty);
                    $('.fix_piece i').text(goodsQty);
                }
            }
            return Cart.init();
        },
        //注册页面
        register:function(){
            var Reg = {
                init:function(){
                    var self = this;
                    var $userClass = $('.phonereg');
                    self.$userClass = $userClass;
                    inputtest($userClass);
                    self.verifycode($('.verifycode'));
                    $('.container').on('click','li,input,a',function(){
                        if($(this).hasClass('regnav1')){
                                $userClass = $('.phonereg');
                                $userClass.find('.regk,.yhm_text1').val('');
                                $userClass.find('.ztips,.etips').css('display','none');
                                self.$userClass = $userClass;
                                self.verifycode($('.verifycode'));
                                inputtest($userClass);
                                $('.phonereg').css('display','block').next().css('display','none');
                                $(this).addClass('on').next().removeClass('on').find('span').removeClass('icon6').addClass('icon3');
                                $(this).find('span').removeClass('icon1').addClass('icon4');
                        }
                        if($(this).hasClass('regnav2')){
                                $userClass = $('.TVactive');
                                $userClass.find('.regk,.yhm_text1').val('');
                                $userClass.find('.ztips,.etips').css('display','none');
                                self.$userClass = $userClass;
                                self.verifycode($('.verifycode'));
                                inputtest($userClass);
                                $('.phonereg').css('display','none').next().css('display','block');
                                $(this).addClass('on').prev().removeClass('on').find('span').removeClass('icon4').addClass('icon1');
                                $(this).find('span').removeClass('icon3').addClass('icon6');
                        }
                        //更换验证码
                        if($(this).hasClass('code_refresh')){
                            self.verifycode(self.$userClass.find('.verifycode'));
                        }
                        if($(this).hasClass('ymasage')){
                            self.$userClass.find('.ymasagecode').css({
                                display:'inline-block',
                                fontSize:'14px'
                            }).text('5秒后收到');
                            var second = 0;
                            var timer = setInterval(function(){
                                second++;
                                if(second >= 5){
                                    clearInterval(timer);
                                    self.$userClass.find('.ymasagecode').css('fontSize','18px');
                                    self.verifycode(self.$userClass.find('.ymasagecode'));
                                    return;
                                }
                                self.$userClass.find('.ymasagecode').text(`${5-second}秒后收到`);
                            },1000);  
                        }
                        if($(this).hasClass('registsubmit')){
                            self.submit(self.$userClass);
                        }
                   
                    })


                    function inputtest(){
                        //手机注册，输入手机号
                        $userClass.find('.text1').focus(function(){
                            self.showborder($(this),true);
                            $(this).next().addClass('ztips').removeClass('etips').css('display','block').text('请输入常用手机号，避免忘记');
                        }).blur(function(){
                            self.showborder($(this),false);
                            var val_user = $(this).val().trim();
                            if(val_user == ''){
                                $(this).next().addClass('etips').removeClass('ztips').text('手机号码不能为空');
                            }else if(!self.judge('tel',val_user)){
                                $(this).next().addClass('etips').removeClass('ztips').text('你的输入的手机号码有误！请重新输入');
                            }
                        })
                        //输入验证码
                        $userClass.find('.text2').focus(function(){
                            self.showborder($(this),true);
                            $(this).next().next().addClass('ztips').removeClass('etips').css('display','block').text('请输入验证码,不区分大小写');
                        }).blur(function(){
                            self.showborder($(this),false);
                            var  val_code = $(this).val().trim();
                            if(val_code == ''){
                                $(this).next().next().addClass('etips').removeClass('ztips').text('验证码不能为空');
                            }else if(self.judge('code',val_code)){
                                $(this).next().next().addClass('ztips').removeClass('etips').text('验证码输入正确');
                            }else{
                                $(this).next().next().addClass('etips').removeClass('ztips').text('验证码输入错误,请重新输入');
                            }
                        });
                        //设置密码
                        $userClass.find('.text3').focus(function(){
                            self.showborder($(this),true);
                            $(this).next().addClass('ztips').removeClass('etips').css('display','block').text('6-20位字符，可使用字母、数字或符号的组合');
                        }).blur(function(){
                            self.showborder($(this),false);
                            var  val_password = $(this).val().trim();
                            if(val_password == ''){
                                $(this).next().addClass('etips').removeClass('ztips').text('密码不能为空');
                            }else if(self.judge('password',val_password)){
                                $(this).next().addClass('ztips').removeClass('etips').text('密码格式正确');
                            }else{
                                $(this).next().addClass('etips').removeClass('ztips').text('密码输入格式有误,请重新输入');
                            }
                        });
                        
                        $userClass.find('.text4').focus(function(){
                            self.showborder($(this),true);
                            $(this).next().addClass('ztips').removeClass('etips').css('display','block').text('请再次输入密码');
                        }).blur(function(){
                            self.showborder($(this),false);
                            var  val_passwordAgain = $(this).val().trim();
                            if(val_passwordAgain == ''){
                                $(this).next().addClass('etips').removeClass('ztips').text('密码不能为空');
                            }else if(self.judge('passwordagain',val_passwordAgain)){
                                $(this).next().addClass('ztips').removeClass('etips').text('两次密码相同');
                            }else{
                                $(this).next().addClass('etips').removeClass('ztips').text('两次密码输入不相同，请再次确认密码！');
                            }
                        });
                        $userClass.find('.text5').focus(function(){
                            self.showborder($(this),true);
                            if($('.ymasagecode').css('display') == 'none'){
                                $(this).next().next().addClass('etips').removeClass('ztips').css('display','block').text('请点击获取短信验证码');
                            }else{
                                $(this).next().next().addClass('ztips').removeClass('etips').css('display','block').text('请输入短信验证码');
                            }
                        }).blur(function(){
                            self.showborder($(this),false);
                            var  val_ymasagecode = $(this).val().trim();
                            if(val_ymasagecode == ''){
                                $(this).next().next().addClass('etips').removeClass('ztips').text('短信验证码不能为空');
                            }else if(self.judge('ymasagecode',val_ymasagecode)){
                                $(this).next().next().addClass('ztips').removeClass('etips').text('短信验证码输入正确');
                            }else{
                                $(this).next().next().addClass('etips').removeClass('ztips').text('短信验证码输入不正确，请重新输入！');
                            }
                        });
                    }
                        
                },
                showborder:function($ele,boolean){
                    if(boolean){
                        $ele.css('border-color','rgb(95, 193, 0)');
                    }else{
                        $ele.css('border-color','rgb(162, 162, 162)');
                    }
                },
                judge:function(thing,val){
                    var self = this;
                    if(thing == 'tel'){
                        if(/^1[3|4|5|8][0-9]\d{8}$/.test(val)){
                            $.get('../api/register.php?usernametest='+val,function(data,status){
                                if(status == 'success'){
                                    if(data != '[]'){
                                        self.$userClass.find('.text1').next().addClass('etips').removeClass('ztips').text('你的手机号码已经注册过了！');
                                    }else{
                                        self.$userClass.find('.text1').next().addClass('ztips').css('display','block').text('恭喜您,你的手机号码可以注册').removeClass('etips');
                                    }
                                }
                            })
                            return true;
                        }else{
                            return false;
                        }
                    }
                    if(thing == 'code'){
                        if(val.toLowerCase() == self.$userClass.find('.verifycode').text().toLowerCase()){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    if(thing == 'password'){
                        if(/^[\S]{6,20}$/.test(val)){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    if(thing == 'passwordagain'){
                        if(val === self.$userClass.find('.text3').val().trim()){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    if(thing == 'ymasagecode'){
                        if(val === self.$userClass.find('.ymasagecode').text().toLowerCase()){
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                verifycode:function($ele){
                    var codeArr = [];
                    for(var i = 48 ; i<=122;i++){
                        codeArr.push(String.fromCharCode(i));
                        if(i == 57){
                            i= 64;
                        }
                        if(i == 90){
                            i = 96;
                        }
                    }
                    var codeStr = '';
                    for(var j = 0; j<4;j++){
                        codeStr += codeArr[Math.floor(Math.random()*codeArr.length)];
                    }
                    $ele.text(codeStr);
                    return this;
                },
                submit:function($ele){
                    var emptyJs = 0;
                    $ele.find('.regk,.yhm_text1').each(function(){
                        if($(this).val().trim() == ''){
                            return emptyJs=1;
                        }
                    });
                    if(emptyJs == 1){
                        return $ele.find('.submittips').css('display','block').text('输入不能有空，请确认无误！');
                    }
                    if($ele.find('.etips').length >0){
                        return $ele.find('.submittips').css('display','block').text($ele.find('.etips').get(0).innerText);
                    }
                    if(!$ele.find('.checkx').prop('checked')){
                        return $ele.find('.submittips').css('display','block').text('请勾选我已阅读并同意《优品惠用户服务承诺》');
                    }
                    $.get('../api/register.php?username='+$ele.find('.text1').val().trim()+'&password='+$ele.find('.text3').val().trim(),function(data,status){
                        if(status == 'success'){
                            if(data){
                                document.cookie = 'username='+ $ele.find('.text1').val().trim()+ ';path=/';
                                $('.land_con').html(`<p class='success'>恭喜您，注册成功！<a href="">点击返回首页</a></p>`);
                            }
                        }
                    });
                }
            }
            return Reg.init();
        },
        //登录后显示
        showlogin:function(){
            var cookies = document.cookie.split('; ');
            cookies.forEach(function(item){
                var temp = item.split('=');
                if(temp[0] == 'username'){
                    if(temp[1] != ''){
                        $('.h_register').addClass('username').removeClass('h_register').html(`<a>${temp[1]}</a>`);
                        $('.h_login').addClass('exit').removeClass('h_login').html(`<a>退出</a>`);
                        $('.slide-login-btn').html(`<a>${temp[1]}</a>`);
                    }
                }
                $('.top-nav-tool').on('mouseover','span',function(){
                    if($(this).hasClass('exit')){
                        $(this).click(function(){
                            document.cookie = 'username='+ ';path=/';
                            $(this).addClass('h_login').removeClass('exit').html(`<a href="html/login.html">登录</a>`);
                            $('.username').addClass('h_register').removeClass('username').html(`<a href="html/register.html">注册</a>`);
                            $('.slide-login-btn').html('你好！请<a href="html/login.html">登录</a>|<a href="html/register.html">注册</a>');
                        });
                    }
                });
            });
        },
        //登录页面
        login:function(){
            var cookies = document.cookie.split('; ');
            cookies.forEach(function(item){
                var temp = item.split('=');
                if(temp[0] == 'usernamesave'){
                    $('.text1').val(temp[1]);
                }
            });
            $('#button').click(function(){
                $('.text1').next().css('display','none');
                $('.text2').next().css('display','none');
                if($('.text1').val().trim() == ''){
                    $('.text1').next().css('display','block').text('用户名不能为空');
                    return;
                }
                if($('.text2').val().trim() == ''){
                    $('.text1').next().css('display','none');
                    $('.text2').next().css('display','block').text('密码不能为空');
                    return;
                }
                $.get('../api/login.php?username='+$('.text1').val().trim(),function(data,status){
                    if(status == 'success'){
                        var data = JSON.parse(data);
                        console.log(data);
                        if(data.length == 0){
                            $('.text1').next().css('display','block').text('用户名不存在');
                        }else{
                            if(data[0].password != $('.text2').val().trim()){
                                $('.text2').next().css('display','block').text('密码不正确');
                            }else{
                                if($('.checkbox').prop('checked')){
                                    var date = new Date();
                                    date.setDate(date.getDate() + 30);
                                    document.cookie = 'usernamesave='+ $('.text1').val().trim() +';expires='+date.toUTCString();
                                }
                                    document.cookie = 'username='+ $('.text1').val().trim() +';path=/';
                                    window.location = '../index.html';
                            }
                        }
                        
                    }
                });
                
            });
        }
    }
});
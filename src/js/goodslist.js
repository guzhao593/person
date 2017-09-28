/* 
* @Author: Marte
* @Date:   2017-09-27 09:59:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-28 23:03:13
*/
require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html',function(){
            $('.guiding a').removeClass('hover').eq(2).addClass('hover');
        });
        $('#footer').load('../html/footer.html');
        $.get('../api/goodslist.php?page=1&totalnum=id',function(data,status){
            var page = 1
            var field="id";
            if(status == 'success'){
                selectShowGoods(data,field);
                $('.filter_goods').on('click','span',function(){
                    page = 1;
                    if($(this).text() == '销量'){
                        console.log(8888);
                        $.get('../api/goodslist.php?page='+page+'&totalnum=salenum',function(data,status){
                            var field="salenum";
                            if(status == 'success'){
                                selectShowGoods(data,field);
                                }
                    })
                    }
                })
                function selectShowGoods(data,field){
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
                                            <a href="goodsdatalis.html?id=${item.id}" >
                                                <img alt="${item.brand} ${item.name}${item.spec}" class="lazy-loading" src="${item.imgurl}">
                                            </a>
                                        </div>
                                        <p class="goods_box_tit c_clearfix">
                                            <a href="goodsdatalis.html?id=${item.id}">${item.brand} ${item.name}${item.spec}</a>
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
                        turnPage(dataTotal,showNum,field);
                    }
                    //翻页
                function turnPage(dataTotal,showNum,field){
                        showPage();
                        //单击首页按纽时
                        $('.first').click(function(){
                            $('.first').addClass('active').siblings('a').removeClass('active');
                            page = 1;
                            showPage();
                            $.get('../api/goodslist.php?page='+page+'&totalnum='+field,function(data,status){
                                console.log(data);
                                showGoods(data,status);
                            })
                        })
                        //单击末页按纽时
                        $('.last').click(function(){
                            $('.last').addClass('active').siblings('a').removeClass('active');
                            page = Math.ceil(dataTotal/showNum);
                            showPage();
                            $.get('../api/goodslist.php?page='+page+'&totalnum='+field,function(data,status){
                                showGoods(data,status);
                            })
                        })
                        //单击前一页按纽时
                        $('.prevpage').click(function(){
                            $('.prevpage').addClass('active').siblings('a').removeClass('active');
                            page--;
                            if(page<1){
                                page = 1;
                            }
                            showPage();
                            $.get('../api/goodslist.php?page='+page+'&totalnum='+field,function(data,status){
                                showGoods(data,status);
                            })
                        })
                        //单击前一页按纽时
                        $('.nextpage').click(function(){
                            $('.nextpage').addClass('active').siblings('a').removeClass('active');
                            page++;
                            if(page>Math.ceil(dataTotal/showNum)){
                                page = Math.ceil(dataTotal/showNum);
                            }
                            showPage();
                            $.get('../api/goodslist.php?page='+page+'&totalnum='+field,function(data,status){
                                showGoods(data,status);
                            })
                        })
                        $('.pagebox ul').on('click','li',function(){
                            page = $(this).text();
                            showPage();
                            $.get('../api/goodslist.php?page='+page+'&totalnum='+field,function(data,status){
                                showGoods(data,status);
                            })
                        })
                    //翻页时产品通过get显示
                    function showGoods(data,status){
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
                                                        <a href="goodsdatalis.html?id=${item.id}" >
                                                            <img alt="${item.brand} ${item.name}${item.spec}" class="lazy-loading" src="${item.imgurl}">
                                                        </a>
                                                    </div>
                                                    <p class="goods_box_tit c_clearfix">
                                                        <a href="goodsdatalis.html?id=${item.id}">${item.brand} ${item.name}${item.spec}</a>
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
                    }
                    //翻页时翻页按纽的显示
                    function showPage(){
                        var pageul = $('.pagebox ul');
                        var bigNum =pageul.children().eq(4).text();
                        var smallNum = pageul.children().eq(1).text();
                        // console.log(bigNum);
                        // console.log(smallNum);
                        if(page == bigNum && page < Math.floor(dataTotal/showNum)){
                            pageul.children().each(function(){
                                bigNum++;
                                $(this).text(bigNum-4);
                            })
                        }
                        if(page == smallNum && page>2){
                            pageul.children().each(function(){
                                smallNum++;
                                console.log(smallNum);
                                $(this).text(smallNum-3);
                            })  
                        }

                        if(page == 1){
                            $('.first').addClass('active').siblings('a').removeClass('active');
                            var temp = page-1; 
                            pageul.children().each(function(){
                                temp++;
                                $(this).text(temp);
                            })
                        }else if(page ==  Math.ceil(dataTotal/showNum)){
                                var temp = page-6;
                            pageul.children().each(function(){
                                temp++;
                                $(this).text(temp);
                            })
                            $('.last').addClass('active').siblings('a').removeClass('active');
                        } 
                        pageul.children().each(function(){
                                if($(this).text() == page){
                                    $(this).addClass('active').siblings().removeClass('active');
                                    return;
                                }
                            });
                    }
                }
            }
            })
    })
})
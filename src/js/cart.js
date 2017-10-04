require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html .top-nav',function(){
            com.showlogin();
        });
        $('#footer').load('../html/footer.html');
        $('.sidebox').load('../html/slider.html',function(){
            com.slider().init();
            com.cartshow();
            com.showlogin();
        });
        $('.cartlist ul').mouseover(function(e){
            if(e.target.parentNode.className.toLowerCase() == 'c_amount clearfix'){
                $(e.target).click(function(){
                    com.btnNum($('.c_amount'),'cart');
                }).mouseout(function(){
                    $(this).off();
                });
            }
            com.cartchange();
        })
        $(window).scroll(function(){
            var carHeight = $('#footer').offset().top -window.innerHeight-51;
            if($(window).scrollTop()>50 && $(window).scrollTop() < carHeight){
                $('.fixed_balance').css('display','block');
                $('.fixed_bt').css({
                    position:'fixed',
                    bottom:'0px',
                    left:'0px',
                    width:'100%',
                    zIdex:100
                });
            }else if($(window).scrollTop()<=50 || $(window).scrollTop() >= carHeight){
                $('.fixed_balance').css('display','none');
                $('.fixed_bt').css({
                    position:'static'
                });
            }
        });
    });
});

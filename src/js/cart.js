require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#footer').load('../html/footer.html');
        $('.sidebox').load('../html/slider.html',function(){
            com.slider().init();
        });
        com.cartshow();
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
            console.log($(window).scrollTop()<=50 || $(window).scrollTop() >= carHeight);
            if($(window).scrollTop()>50 && $(window).scrollTop() < carHeight){
                $('.fixed_bt').css({
                    position:'fixed',
                    bottom:'0px',
                    left:'0px',
                    width:'100%',
                    zIdex:100
                });
                $('.fixed_balance').css('display','block');
            }else if($(window).scrollTop()<=50 || $(window).scrollTop() >= carHeight){
                $('.fixed_bt').css({
                    position:'static'
                });
                $('.fixed_balance').css('display','none');
            }
        });
    });
});

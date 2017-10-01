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
        		});
        	}
        })
        
    });
});

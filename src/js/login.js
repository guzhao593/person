require(['config'],function(){
    require(['jquery','common'],function($,com){
    	$('#header').load('../html/header.html .top-nav',function(){
    		com.showlogin();
            com.topnotice();
    	});
        $('#footer').load('../html/footer.html');
        $('.sidebox').load('../html/slider.html',function(){
            com.slider().init();
            com.showlogin();
        });
        com.login();

    });
});
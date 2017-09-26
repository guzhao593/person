/* 
* @Author: Marte
* @Date:   2017-09-25 21:14:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 09:20:33
*/

require(['config'],function(){
    require(['jquery','common'],function($,com){
        $('#header').load('../html/header.html',function(){
            $('.guiding a').removeClass('hover').eq(2).addClass('hover');
        });
        $('#footer').load('../html/footer.html');
    })
})
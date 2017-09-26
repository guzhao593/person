/* 
* @Author: Marte
* @Date:   2017-09-26 09:17:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 09:21:20
*/

require(['config'],function(){
    require(['jquery','zcarousel','common'],function($,z,com){
        $('#header').load('../html/header.html',function(){
            $('.guiding a').removeClass('hover').eq(2).addClass('hover');
        });
        $('#footer').load('../html/footer.html');
    })
})
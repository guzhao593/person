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
        }
    }
});
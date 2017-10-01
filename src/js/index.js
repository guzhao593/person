/* 
* @Author: Marte
* @Date:   2017-09-24 17:35:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 16:18:01
*/

require(['config'],function(){
    require(['jquery','zCarousel','common'],function($,z,com){
            $('#header').load('html/header.html');
            $('#footer').load('html/footer.html');
            $('.sidebox').load('html/slider.html',function(){
                com.slider().init();
                com.topcart();
            });
            
            $('.main-carousel').zCarousel({
                imgs:['img/banner_1.jpg','img/banner_2.jpg'],
                index:0,
                type:'horizontal',
                showPage:true,
                showButton:true,
                duration:4000,
                autoPlay:true,
                width:'100%',
                height:340,
                mainWidth:1000,
                btnBackground:['url(../../css/img/scroll.png) no-repeat -92px -76px','url(../../css/img/scroll.png) no-repeat -92px 0']
            });
            var dayChoice = [
                {
                    choiceTitle:"恩济堂 轻火秋梨膏·370g*5瓶",
                    subTitle:"恩济堂轻火秋梨膏方便携带，干净卫生。",
                    flyPrice:106,
                    linePrice:148,
                    commentName:"188****5681",
                    commnetPrivew:"今天收到，马上开箱查看是否有损坏，挺好的每瓶都完好，口感也不错。满意！继续观注。"
                },
                {
                    choiceTitle:"一叶子 植物酵素多效净肤·41片",
                    subTitle:"采用加入碳粉的膜布，植物纤维，温和舒爽，纤维多孔性，有效吸附毛孔中的污物，柔软贴服，增加精华吸...",
                    flyPrice:269,
                    linePrice:299,
                    commentName:"138****9991",
                    commnetPrivew:"不错，很成功的一次购物，下次还来光顾！"
                },
                {
                    choiceTitle:"韩京姬 蒸汽清洁器SIC-3500W 清洁无死角",
                    subTitle:"高温蒸汽 快速溶解地板污渍，快速出蒸汽，方便家具底死角清洁，1.9kg轻便机身，减轻手腕负担，...",
                    flyPrice:339,
                    linePrice:399,
                    commentName:"138****1112",
                    commnetPrivew:"不错，很好的东西，下次还来光顾！"
                },
                {
                    choiceTitle:"银生 G18K金流年似水淡水珍珠耳钉",
                    subTitle:"淡水珍珠+G18K金配件，双珠设计，款式时尚，呈现不一样的气质，增添耳畔的迷人风采！",
                    flyPrice:499,
                    linePrice:599,
                    commentName:"138****0321",
                    commnetPrivew:"实事求是地说，珍珠有划痕、有小坑，没有象图片那么完美，总的说还是挺漂亮的。"
                }
            ];
            $('.daychoice').zCarousel({
                imgs:['img/day_1.jpg','img/day_2.jpg','img/day_3.jpg','img/day_4.jpg'],
                index:0,
                type:'fade',
                showPage:false,
                showButton:true,
                btnWidth:26,
                btnHeight:45,
                duration:4000,
                autoPlay:true,
                width:698,
                height:305,
                showSmall:true,
                smallDown:true,
                mainWidth:698,
                btnBackground:['url(../../css/img/icons.png) no-repeat 0 -46px','url(../../css/img/icons.png) no-repeat -28px -46px'],
                choice:dayChoice
            });
            $('.foreshow_list').zCarousel({
                imgs:[{img1:'img/tvshow_1.jpg',img2:'img/tvshow_2.jpg',img3:'img/tvshow_3.jpg'},{img1:'img/tvshow_4.jpg',img2:'img/tvshow_5.jpg',img3:'img/tvshow_6.jpg'},{img1:'img/tvshow_7.jpg',img2:'img/tvshow_8.jpg',img3:'img/tvshow_9.jpg'},{img1:'img/tvshow_10.jpg',img2:'img/tvshow_11.jpg',img3:'img/tvshow_12.jpg'},{img1:'img/tvshow_13.jpg',img2:'img/tvshow_14.jpg',img3:'img/tvshow_15.jpg'}],
                index:0,
                type:'horizontal',
                showPage:false,
                showButton:true,
                btnWidth:26,
                btnHeight:46,
                duration:4000,
                autoPlay:true,
                width:270,
                height:80,
                showSmall:false,
                smallDown:false,
                mainWidth:270,
                btnBackground:['url(../../css/img/icons.png) no-repeat -56px -46px','url(../../css/img/icons.png) no-repeat -77px -46px']
            });
    })
})

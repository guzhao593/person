/* 
* @Author: Marte
* @Date:   2017-09-24 17:37:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 10:59:00
*/

require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zCarousel':'../lib/jquery-zCarousel/jquery.zcarousel'
    },
    shim:{
        'zCarousel':['jquery']
    }
})
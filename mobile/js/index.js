// 金萱 justfont api
/*var _jf = _jf || [];
_jf.push(['_eventPreload', function () {
    //載入前觸發事件
}]);

_jf.push(['_eventActived', function () {
    //成功觸發事件
}]);

_jf.push(['_eventInactived', function () {
    //失敗觸發事件
    _jf.flush();
}]);*/

var indexCtrl = {
    init: function(){     
        var $this = this;
        var endTime = new Date('2/6/2017');
        $this.scrollPage();

        /* 2017-01-12 Jeffery 加GA */
        /*$('.redbutton.gotogame button').on('click',function(event){
            event.preventDefault();
            location.href = 'game.html';
        });*/
        $('.redbutton.gotogame button, .kvdiv img:first-child').on('click',function(event){
            event.preventDefault();
            
            /* 2017-01-23 Jeffery 加上活動結束判斷 */
            if(new Date() >= endTime){
                alert('活動已結束，仍可製作春聯！');
            }
            trackWaitJump('to_game','game.html');
        });

        $('.wrapper footer .gotop').on('click',function(event){
            event.preventDefault();
            gaclick('go_top');
            $('html, body').stop().animate({
                scrollTop: 0
            }, 1000);
        });

        setTimeout(function(){
            $('.loadingwrap').fadeOut('fast');
        }, 350);
    },
    scrollPage: function(){
        var $this = this;
        var indexFG = true;
        var thebestFG = true;
        var spokesmanFG = true;
        var bloggerFG = true;
        var userexperienceFG = true;
        var videoFG = true;
        var navIndex = 0;

        $(window).on('scroll', function(){
            var height = $(window).height() / 5;
            if($('.index').offset().top - height < $(window).scrollTop()){
                navIndex = 0;
                if(indexFG){
                    indexFG = !indexFG;
                    gaclick('page_index');
                }
            }
            if($('.thebest').offset().top - height < $(window).scrollTop()){
                navIndex = 1;
                if(thebestFG){
                    thebestFG = !thebestFG;
                    gaclick('page_thebest');
                }
            }
            if($('.spokesman').offset().top - height < $(window).scrollTop()){
                navIndex = 2;
                navIndex = 2;
                if(spokesmanFG){
                    spokesmanFG = !spokesmanFG;
                    gaclick('page_spokesman');
                }
            }
            if($('.blogger').offset().top - height < $(window).scrollTop()){
                navIndex = 3;
                if(bloggerFG){
                    bloggerFG = !bloggerFG;
                    gaclick('page_blogger');
                }
            }
            if($('.userexperience').offset().top - height < $(window).scrollTop()){
                navIndex = 4;
                if(userexperienceFG){
                    userexperienceFG = !userexperienceFG;
                    gaclick('page_userexperience');
                }
            }
            if($('.video').offset().top - height < $(window).scrollTop()){
                navIndex = 5;
                if(videoFG){
                    videoFG = !videoFG;
                    gaclick('page_video');
                }
            }
        });
    }
}

$(function(){
    indexCtrl.init();
    gapage('0_index');
});
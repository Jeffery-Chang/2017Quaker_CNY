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
        //var initImg = $('.desktopkv img');
        var endTime = new Date('2/6/2017');

        $('body, html').css('overflow','hidden');

        $this.initObj();
        $this.scrollPage();

        gapage('0_index');

        $('.redbutton.gotogame button, .wrapper footer .gotop, .maintxt p, .maintxt h1, .kv img').css('cursor','pointer');
        /* 2017-01-12 Jeffery 加GA */
        /*$('.redbutton.gotogame button').on('click',function(event){
            event.preventDefault();
            location.href = 'game.html';
        });*/
        $('.redbutton.gotogame button, .maintxt p, .maintxt h1, .kv img').on('click',function(event){
            event.preventDefault();
            
            /* 2017-01-23 Jeffery 加上活動結束判斷 */
            if(new Date() >= endTime){
                alert('活動已結束，仍可製作春聯！');
            }
            trackWaitJump('to_game','game.html');
        });

        $('.wrapper footer .gotop').on('click',function(event){
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: 0
            }, 1000);
        });

        $('.tab li').on('click',function(event){
            event.preventDefault();
            $this.updataNav('TAB',$(this).index());
        });

        /*initImg.on('load',function(){
            $('body, html').css('overflow','');
            $('.loadingwrap').fadeOut('fast');
        });*/
        setTimeout(function(){
            $('body, html').css('overflow','');
            $('.loadingwrap').fadeOut('fast');
        }, 350);

        setInterval(function(){
            $('.desktopkv, .mobilekv').toggleClass('changeIMG');
        }, 7000);
    },
    updataNav: function(type, index){
        var navIndex = index;
        var navClass = '';

        if(type !== 'TAB'){
            $('.tab li').removeClass('current');
            $('.tab li').eq(navIndex).addClass('current');
        }else{
            switch (navIndex){
                case 0:
                    navClass = 'index';
                    break;
                case 1:
                    navClass = 'thebest';
                    break;
                case 2:
                    navClass = 'spokesman';
                    break;
                case 3:
                    navClass = 'blogger';
                    break;
                case 4:
                    navClass = 'userexperience';
                    break;
                case 5:
                    navClass = 'video';
                    break;
            }
            
            gaclick('menu_'+navClass);

            $('html, body').stop().animate({
                scrollTop: $('.' + navClass).offset().top - $(window).height() / 15
            }, 750);
        }
    },
    initObj: function(){
        // word all
        TweenMax.set($('section h2 img'),{
            y       : "-=100" ,
            opacity : 0
        });

        // thebest
        TweenMax.set($('.bestlist li:eq(0)'),{
            x       : "-=200" ,
            opacity : 0
        });
        TweenMax.set($('.bestlist li:eq(1)'),{
            x       : "+=200" ,
            opacity : 0
        });
        TweenMax.set($('.bestlist li:eq(2), .thebest .product_can'),{
            x       : "-=200" ,
            opacity : 0
        });

        // spokesman
        TweenMax.set($('.spokesman .person'),{
            x       : "-=100",
            opacity : 0
        });
        TweenMax.set($('.spokesman .allprodutcimg'),{
            y       : "-=200",
            opacity : 0
        });
        TweenMax.set($('.spokesman .allproduct_txt'),{
            opacity : 0
        });

        // blogger
        TweenMax.set($('.blogger .bloglist li'),{
            x       : "-=200",
            opacity : 0
        });

        // userexperience
        // $('.userexperience .userlist li').css('transform-origin','left bottom');
        TweenMax.set($('.userexperience .userlist li'),{
            y   : "-=100",
            opacity : 0
        });
    },
    scrollPage: function(){
        var $this = this;
        var indexFG = true;
        var thebestFG = true;
        var spokesmanFG = true;
        var bloggerFG = true;
        var userexperienceFG = true;
        var videoFG = true;
        /*var word_indexFG = true;
        var word_thebestFG = true;
        var word_spokesmanFG = true;
        var word_bloggerFG = true;
        var word_userexperienceFG = true;
        var word_videoFG = true;*/
        var navIndex = 0;

        $(window).on('scroll', function(){
            var height = $(window).height() / 4;
            var wordHeight = $(window).height() / 2;
            if($('.index').offset().top - height < $(window).scrollTop()){
                navIndex = 0;
                if(indexFG){
                    indexFG = !indexFG;
                    gaclick('page_index');
                }
            }

            // thebest
            /*if($('.thebest').offset().top - wordHeight < $(window).scrollTop() && word_thebestFG){
                word_thebestFG = !word_thebestFG;

                TweenMax.to($('.thebest .calligraphy'), .5, {
                    y       : "+=100" ,
                    opacity : 1
                });
            }*/
            if($('.thebest').offset().top - height < $(window).scrollTop()){
                navIndex = 1;
                if(thebestFG){
                    thebestFG = !thebestFG;
                    gaclick('page_thebest');

                    TweenMax.to($('.thebest h2 img'), .5, {
                        y       : "+=100" ,
                        opacity : 1       ,
                        onComplete: function () {
                            TweenMax.to($('.bestlist li:eq(0)'), .5, {
                                x       : "+=200" ,
                                opacity : 1
                            });
                            TweenMax.to($('.bestlist li:eq(1)'), .5, {
                                x       : "-=200" ,
                                opacity : 1
                            });
                            TweenMax.to($('.bestlist li:eq(2), .thebest .product_can'), .5, {
                                x       : "+=200" ,
                                opacity : 1
                            });
                        }
                    });
                }
            }

            // spokesman
            /*if($('.spokesman').offset().top - wordHeight < $(window).scrollTop() && word_spokesmanFG){
                word_spokesmanFG = !word_spokesmanFG;
                TweenMax.to($('.spokesman .calligraphy'), .5, {
                    y       : "+=100" ,
                    opacity : 1
                });
            }*/
            if($('.spokesman').offset().top - height < $(window).scrollTop()){
                navIndex = 2;
                if(spokesmanFG){
                    spokesmanFG = !spokesmanFG;
                    gaclick('page_spokesman');

                    TweenMax.to($('.spokesman h2 img'), .5, {
                        y       : "+=100" ,
                        opacity : 1       ,
                        onComplete: function () {
                            TweenMax.to($('.spokesman .person'), .5, {
                                x       : "+=100",
                                opacity : 1
                            });
                            TweenMax.to($('.spokesman .allprodutcimg'), .5, {
                                y       : "+=200",
                                opacity : 1
                            });
                            TweenMax.to($('.spokesman .allproduct_txt'), 1, {
                                opacity : 1
                            });
                        }
                    });
                }
            }

            // blogger
            /*if($('.blogger').offset().top - wordHeight < $(window).scrollTop() && word_bloggerFG){
                word_bloggerFG = !word_bloggerFG;
                TweenMax.to($('.blogger .calligraphy'), .5, {
                    y       : "+=100" ,
                    opacity : 1
                });
            }*/
            if($('.blogger').offset().top - height < $(window).scrollTop()){
                navIndex = 3;
                if(bloggerFG){
                    bloggerFG = !bloggerFG;
                    gaclick('page_blogger');

                    TweenMax.to($('.blogger h2 img'), .5, {
                        y       : "+=100" ,
                        opacity : 1       ,
                        onComplete: function () {
                            TweenMax.staggerTo($('.blogger .bloglist li'), .5, {
                                x       : "+=200" ,
                                opacity : 1
                            }, .2);
                        }
                    });
                }
            }

            // userexperience
            /*if($('.userexperience').offset().top - wordHeight < $(window).scrollTop() && word_userexperienceFG){
                word_userexperienceFG = !word_userexperienceFG;
                TweenMax.to($('.userexperience .calligraphy'), .5, {
                    y       : "+=100" ,
                    opacity : 1
                });
            }*/
            if($('.userexperience').offset().top - height < $(window).scrollTop()){
                navIndex = 4;
                if(userexperienceFG){
                    userexperienceFG = !userexperienceFG;
                    gaclick('page_userexperience');

                    TweenMax.to($('.userexperience h2 img'), .5, {
                        y       : "+=100" ,
                        opacity : 1       ,
                        onComplete: function () {
                            TweenMax.staggerTo($('.userexperience .userlist li'), .8, {
                                y   : "+=100",
                                opacity : 1
                            }, .3);
                        }
                    });
                }
            }

            // video
            /*if($('.video').offset().top - wordHeight < $(window).scrollTop() && word_videoFG){
                word_videoFG = !word_videoFG;
                TweenMax.to($('.video .calligraphy'), .5, {
                    y       : "+=100" ,
                    opacity : 1
                });
            }*/
            if($('.video').offset().top - height < $(window).scrollTop()){
                navIndex = 5;
                if(videoFG){
                    videoFG = !videoFG;
                    gaclick('page_video');

                    TweenMax.to($('.video h2 img'), .5, {
                        y       : "+=100" ,
                        opacity : 1       ,
                        onComplete: function () {
                            $('.moviebox').fadeIn('fast');
                        }
                    });
                }
            }

            $this.updataNav('SCROLL',navIndex);
        });
    }
}

$(function(){
    indexCtrl.init();
});
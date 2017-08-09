var menuCtrl = {
    init: function(){
        var menuAgent = navigator.userAgent;
        var mobile_fg = menuAgent.indexOf('iPhone') != -1 || menuAgent.indexOf('Android') != -1 || menuAgent.indexOf('Windows Phone') != -1;
        var awardTime = new Date('2/10/2017');
        
        /* 2017-02-09 Jeffery 更新得獎資訊 */
        if(new Date() >= awardTime){
            $('header nav li:eq(3), .menubox li:eq(3)').after('<li><a href="#">得獎名單</a></li>');
            $('.popbg').after('<!--popupwrap--><div class="awardwrap"><div class="awardlist"><div class="gotop"><div class="close"><span></span><span></span></div></div><h2 class="calligraphy">得獎名單</h2><div class="awardcontent"><h3>恭喜獲得桂格養氣人蔘禮盒乙盒 (共六名)</h3><div class="rulelist"><ul><li class="redlist">姓名</li><li class="redlist">電話</li><li>謝x雲</li><li>0917599xxx</li><li>陳x芬</li><li>0977537xxx</li><li>張x閔</li><li>0983876xxx</li><li>林x雰</li><li>0928766xxx</li><li>林x文</li><li>0963907xxx</li><li>宋x娟</li><li>0975472xxx</li></ul></div><p>活動小組將依報名資料通知得獎者，敬請請留意。</p></div></div></div>');
        }

        $('#bur').on('click',function(event){
            event.preventDefault();
            $('#menu').toggleClass("turn");
        });

        $('header nav li, .menubox li').on('click',function(event){

            var menuIndex = $(this).index();
            
            //if(menuIndex !== 2 || menuIndex !== 3) event.preventDefault();

            switch (menuIndex){
                case 0:
                    event.preventDefault();
                    location.href = 'index.html';
                    break;
                case 1:
                    event.preventDefault();
                    gaclick('meun_regulations');
                    $('.popbg, .rulewrap').fadeIn('fast');


                    if (mobile_fg) {
                        $('.wrapper').css('overflow','hidden');
                    }

                    break;
                case 2:
                    gaclick('go_fanpage');
                    $(this).find('a').attr('target','_blank').attr('href','https://www.facebook.com/quaker.healthylife/posts/1429265170452229');
                    break;
                case 3:
                    gaclick('clicks_order');
                    break;
                case 4:
                    $('.popbg, .awardwrap').fadeIn('fast');
                    break;
            }
        });

        $('.sb-checkbox p b').css('cursor','pointer');
        $('.rulewrap .rule .gotop, .sb-checkbox p b, .awardwrap .awardlist .gotop').on('click', function () {
            $('.popbg, .rulewrap, .awardwrap').fadeOut('fast');
            
            if (mobile_fg) {
                $('.wrapper').css('overflow','');
            }
        });
    }
}

$(function(){
    menuCtrl.init();
});
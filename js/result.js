(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

var useragent = navigator.userAgent;
var pageUrl = location.href;
if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 || useragent.indexOf('Windows Phone') != -1) {
    if(pageUrl.indexOf('mobile') > 0){

    }else{
        pageUrl = pageUrl.replace('2017_cny/','2017_cny/mobile/');
        location.href = pageUrl;
    }
}else{
    if(pageUrl.indexOf('mobile') > 0){
        pageUrl = pageUrl.replace('mobile/','');
        location.href = pageUrl;
    }else{

    }
}

// 金萱 justfont api
var _jf = _jf || [];
_jf.push(['_eventPreload', function () {
    //載入前觸發事件
}]);

_jf.push(['_eventActived', function () {
    //成功觸發事件
}]);

_jf.push(['_eventInactived', function () {
    //失敗觸發事件
    _jf.flush();
}])

/* 2017-01-12 Jeffery 調整導result頁 */
var fbInfo = {
    thisSiteUrl: 'http://tonicdrink.sfworldwide.com/event/2017_cny/',
    thisSiteGuid: '',
    appID: '1139972609434384',
    share_u: 'http://tonicdrink.sfworldwide.com/event/2017_cny/result.html',
    title: '桂格QUAKER  | 分享春聯 抽養氣人蔘禮盒',
    fb_des: '這就是人蔘R～今年的好運氣，靠桂格幫你補氣！分享人蔘春聯，就抽養氣人蔘禮盒。春節送口碑第一、護肝認證的桂格，讓你成為人蔘勝利組！',
    pic: 'http://tonicdrink.sfworldwide.com/event/2017_cny/img/user_result/',
    redirect_uri: ''
}

var resultCtrl = {
    thisSiteUrl: 'http://tonicdrink.sfworldwide.com/event/2017_cny/',
    init: function(){
        var $this = this;
        var picID = $.getUrlParam('guid');
        var fbBack = $.getUrlParam('fb_back');
        var FFindex = $.getUrlParam('FFindex');
        
        var endTime = new Date('2/6/2017');

        gapage('2_result');

        if(picID !== '' && picID !== undefined && picID !== null){
            /* 2017-01-13 Jeffery for firefox */
            if(FFindex !== '' && FFindex !== undefined && FFindex !== null){
                $('.resultkv').html('<img src="'+$this.thisSiteUrl+'img/firefox/result_0'+FFindex+'.png">');
                fbInfo.pic = $this.thisSiteUrl + 'img/firefox/result_0' + FFindex + '.png';
                fbInfo.share_u = fbInfo.share_u + '?fb_back=1&guid=' + picID;
                fbInfo.share_u = fbInfo.share_u + '?fb_back=1&guid=' + picID + '&FFindex=' + FFindex;
            }else{
                $('.resultkv').html('<img src="'+$this.thisSiteUrl+'img/user_result/'+picID+'.png">');
                fbInfo.pic = fbInfo.pic + picID + '.png';
                fbInfo.share_u = fbInfo.share_u + '?fb_back=1&guid=' + picID;
            }

            /* 2017-01-12 Jeffery 調整導result頁 */
            fbInfo.thisSiteGuid = picID;
            fbInfo.redirect_uri = fbInfo.redirect_uri + '?guid=' + picID;

            $('.sharebutton').show();
            $('.newbutton').hide();
        }

        if(fbBack !== '' && fbBack !== undefined && fbBack !== null){
            gaclick('share_tracking');

            /* 2017-01-12 Jeffery 調整導result頁 */
            $('.sharebutton').hide();
            $('.newbutton').show();
        }

        //分享按鈕
        $('.sharebutton button').on('click',function(){
            /* 2017-01-12 Jeffery 調整導result頁 */
            var share_fb = 'https://www.facebook.com/dialog/feed?' +
                "app_id=" + fbInfo.appID +
                "&display=popup&caption" +
                "&link=" + encodeURIComponent(fbInfo.share_u) +
                //"&redirect_uri=" + encodeURIComponent(fbInfo.redirect_uri) +
                "&name=" + encodeURIComponent(fbInfo.title) +
                "&description=" + encodeURIComponent(fbInfo.fb_des) +
                "&picture=" + encodeURIComponent(fbInfo.pic);

            window.open(share_fb, 'sharer', 'toolbar=0,status=0,width=626,height=436');

            /* 2017-01-23 Jeffery 加上活動結束判斷 */
            if(new Date() >= endTime){
            
            }else{
                trackWaitJump('fb_share','form.html?guid=' + picID);
            }
        });

        $('.choosetype li').on('click',function(){
            var downIndex = $(this).index();
            var imgPath = '';

            if(downIndex === 0){
                if(FFindex !== '' && FFindex !== undefined && FFindex !== null){
                    imgPath = 'img/firefox/spring_0'+FFindex+'.png';
                    window.open($this.thisSiteUrl + imgPath);
                }else{
                    imgPath = 'user_resultCP/';
                    window.open($this.thisSiteUrl + 'img/' + imgPath + picID + '.png');
                }
            }else if(downIndex === 1){
                if(FFindex !== '' && FFindex !== undefined && FFindex !== null){
                    imgPath = 'img/firefox/spring_m0'+FFindex+'.png';
                    window.open($this.thisSiteUrl + imgPath);
                }else{
                    imgPath = 'user_resultCPm/';
                    window.open($this.thisSiteUrl + 'img/' + imgPath + picID + '.png');
                }
            }

            gaclick('print');
        });
    }
}

$(function(){
    resultCtrl.init();
});
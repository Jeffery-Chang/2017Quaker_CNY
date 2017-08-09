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

var canvas_gamekv = document.getElementById('canvas_gamekv');
var canvas_gamekv_ctx = canvas_gamekv.getContext('2d');
var templeft = null;
var tempright = null;
var tempMleft = null;
var tempMright = null;

var fbInfo = {
    thisSiteUrl: 'http://tonicdrink.sfworldwide.com/event/2017_cny/',
    thisSiteGuid: '',
    appID: '1139972609434384',
    share_u: 'http://tonicdrink.sfworldwide.com/event/2017_cny/mobile/result.html',
    title: '桂格QUAKER  | 分享春聯 抽養氣人蔘禮盒',
    fb_des: '這就是人蔘R～今年的好運氣，靠桂格幫你補氣！分享人蔘春聯，就抽養氣人蔘禮盒。春節送口碑第一、護肝認證的桂格，讓你成為人蔘勝利組！',
    pic: 'http://tonicdrink.sfworldwide.com/event/2017_cny/img/user_result/',
    redirect_uri: 'http://tonicdrink.sfworldwide.com/event/2017_cny/mobile/form.html'
}

/* 2017-01-13 Jeffery for firefox */
var FFinfo = {
    index: 1
}

var gameCtrl = {
    init: function(){
        var $this = this;
        gapage('1_game');

        canvas_gamekv.width = $('#img_gamekv').width();
        canvas_gamekv.height = $('#img_gamekv').height();
        canvas_gamekv_ctx.drawImage(document.getElementById('img_gamekv'), 0, 0, canvas_gamekv.width, canvas_gamekv.height);

        // 上聯 打字連動
        $('#input_coupletLeft').on('focusout', function () {
            $('#coupletLeft').html($this.addSpace($(this).val()));
        });

        // 下聯 打字連動
        $('#input_coupletRight').on('focusout', function () {
            $('#coupletRight').html($this.addSpace($(this).val()));
        });

        // 即時預覽
        $('.preview').on('click', function () {
            _jf.flush();

            _jf.push(['_eventActived', function () {
                //成功觸發事件
                canvas_gamekv_ctx.clearRect(0, 0, canvas_gamekv.width, canvas_gamekv.height);
                canvas_gamekv_ctx.drawImage(document.getElementById('img_gamekv'), 0, 0, canvas_gamekv.width, canvas_gamekv.height);
                $('#input_coupletLeft').focus();
                $('#input_coupletRight').focus().blur();
                $this.PrintTo();
            }]);
        });

        // 隨機
        $('.redbutton:eq(0) a').on('click', function () {
            $(this).find('button').attr('disabled',true);
            var cnt = Math.floor(Math.random() * 30);
            $('#input_coupletLeft').val(randomList[cnt].right).focus();
            $('#input_coupletRight').val(randomList[cnt].left).focus().blur();
            $('#coupletRight').html(randomList[cnt].right);
            $('#coupletLeft').html(randomList[cnt].left);
            $(".preview").click();
        });

        // 送出
        $('.redbutton:eq(1) a').on('click', function () {
            var textLeft = $.trim($('#input_coupletLeft').val());
            var textRight = $.trim($('#input_coupletRight').val());

            if(textLeft === '' || textRight === ''){
                alert('請先輸入或用隨機產生上/下聯文字'); 
                return;
            }
            if(!$("#check1").prop("checked")) {
                alert('請先詳閱相關活動辦法'); 
                return;
            }

            $('.game.firstcontent').fadeOut('slow', function () {
                $('.loadingcontent').fadeIn('fast');
                $this.MmakePCcanvas($this.MmakePCcanvasM);
            });
        });

        /* 2017-01-12 Jeffery 調整導result頁 */
        // 分享按鈕
        /*$('.sharebutton button').on('click', function () {
            var share_fb = 'https://www.facebook.com/dialog/feed?' +
                "app_id=" + fbInfo.appID +
                "&display=popup&caption" +
                "&link=" + encodeURIComponent(fbInfo.share_u) +
                "&redirect_uri=" + encodeURIComponent(fbInfo.redirect_uri) +
                "&name=" + encodeURIComponent(fbInfo.title) +
                "&description=" + encodeURIComponent(fbInfo.fb_des) +
                "&picture=" + encodeURIComponent(fbInfo.pic);

            window.open(share_fb, 'sharer', 'toolbar=0,status=0,width=626,height=436');

            trackWaitJump('fb_share', "result.html?guid=" + fbInfo.thisSiteGuid);
        });*/

        // 下載
        $('.printbutton').on('click',function(){
            $('.choosetype').toggle();
        });

        // 下載類別
        $('.choosetype li').on('click',function(){
            var downIndex = $(this).index();
            var imgPath = '';

            if(downIndex === 0){
                imgPath = 'user_resultCP/';
            }else if(downIndex === 1){
                imgPath = 'user_resultCPm/';
            }

            window.open(fbInfo.thisSiteUrl + 'img/' + imgPath + fbInfo.thisSiteGuid + '.png');

            gaclick('print');
        });

        setTimeout(function(){
            _jf.flush();

            _jf.push(['_eventActived', function () {
                $this.PrintTo();
            }]);
        }, 500);

    },
    addSpace: function(word){
        if(word === '' || word === null || word === undefined) return '';
        var $this = this;
        var wordLen = word.length;
        var newWord = '';

        switch(wordLen){
            case 1:
                newWord = '　　　 ' + word;
                break;
            case 2:
                newWord = '　　　' + word;
                break;
            case 3:
                newWord = '　　 ' + word;
                break;
            case 4:
                newWord = '　　' + word;
                break;
            case 5:
                newWord = '　 ' + word;
                break;
            case 6:
                newWord = '　' + word;
                break;
            case 7:
                newWord = '&nbsp;' + word;
                break;
            case 8:
                newWord = word;
                break;
        }
        return newWord;
    },
    PrintTo: function(){
        var $this = this;
        var ratio = $('#img_gamekv').height() * 0.08;
        var lessNUM = 0;
        var targetLeft = $("#coupletLeft");
        var targetRight = $("#coupletRight");

        $('#coupletRight').css('font-size', ratio + 'px');
        $('#coupletLeft').css('font-size', ratio + 'px');

        var leftX = canvas_gamekv.width / 100 * 4;
        var leftY = canvas_gamekv.height / 100 * 21;
        var rightX = canvas_gamekv.width / 100 * 91.5; 
        var rightY = canvas_gamekv.height / 100 * 21; 

        setTimeout(function () {
            html2canvas(targetLeft, {
                onrendered: function (leftcanvas) {
                    templeft = leftcanvas;
                    canvas_gamekv_ctx.drawImage(leftcanvas, leftX, leftY, leftcanvas.width, leftcanvas.height);

                    html2canvas(targetRight, {
                        onrendered: function (rightcanvas) {
                            tempright = rightcanvas;
                            canvas_gamekv_ctx.drawImage(rightcanvas, rightX, rightY, rightcanvas.width, rightcanvas.height);
                            $('.redbutton:eq(0) a button').attr('disabled',false);
                        }
                    });
                }
            });
        }, 500);
    },
    MmakePCcanvas: function(cb){
        if (cb === void 0) { cb = null; }

        var $this = this;
        var targetLeft = $("#coupletLeft");
        var targetRight = $("#coupletRight");

        targetLeft.css('font-size', '100px');
        targetRight.css('font-size', '100px');

        html2canvas(targetLeft, {
            onrendered: function (leftcanvas) {
                templeft = leftcanvas;

                setTimeout(function(){
                    html2canvas(targetRight, {
                        onrendered: function (rightcanvas) {
                            tempright = rightcanvas;
                            if (cb) cb();
                        }
                    });
                }, 300);
            }
        });
    },
    MmakePCcanvasM: function(){
        var $this = this;
        var targetLeft = $("#coupletLeft");
        var targetRight = $("#coupletRight");

        targetLeft.css('font-size', '50px');
        targetRight.css('font-size', '50px');

        html2canvas(targetLeft, {
            onrendered: function (leftcanvas) {
                tempMleft = leftcanvas;

                setTimeout(function(){
                    html2canvas(targetRight, {
                        onrendered: function (rightcanvas) {
                            tempMright = rightcanvas;
                            gameCtrl.endSend();
                        }
                    });
                }, 300);
            }
        });
    },
    endSend: function(){
        var $this = this;
        var randomResult = ['Office', 'Hotpot', 'Sofa', 'Gift'];
        var rnd = Math.floor(Math.random() * randomResult.length);

        $this.makeRCanvas(rnd, $this.saveCouplet);

        setTimeout(function () {
            $('#canvas_Result').css('width', '100%');
            $('#canvas_Result').css('height', 'auto');
        }, 300);
    },
    drawRotated: function(degrees, canvas, ctx, image){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.width / 2);
        ctx.restore();
    },
    create: function(type, right, left, src, lx, ly, rx, ry, callback){
        var img = document.createElement('img');
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var scale = 1;

        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function () {
            if(type === 'pc'){
                c.width = img.width / 3;
                c.height = img.height / 3;
            }else if(type === 'm'){
                c.width = img.width / 3;
                c.height = img.height / 3;
            }

            ctx.drawImage(img, 0, 0, c.width, c.height);
            ctx.drawImage(right, rx, ry, right.width * scale, right.height * scale);
            ctx.drawImage(left, lx, ly, left.width * scale, left.height * scale);
            callback(c);
        };
        img.src = src;
    },
    makeRCanvas: function(num, cb){
        if (cb === void 0) { cb = null; }

        var $this = this;
        var img_Result = document.getElementById('img_Result');
        var img_Result_src;
        var left_rc_x, left_rc_y, left_rc_angle, left_rc_font;
        var right_rc_x, right_rc_y, right_rc_angle, righy_rc_font;

        var canvas_Result = document.getElementById('canvas_Result');
        var canvas_Result_ctx = canvas_Result.getContext('2d');
        canvas_Result.width = 1500;
        canvas_Result.height = 875;

        var canvas_CoupletRight = document.getElementById('canvas_CoupletRight');
        var canvas_CoupletRight_ctx = canvas_CoupletRight.getContext('2d');
        var canvas_CoupletLeft = document.getElementById('canvas_CoupletLeft');
        var canvas_CoupletLeft_ctx = canvas_CoupletLeft.getContext('2d');

        switch(num){
            case 0:
                img_Result.src = "../img/result/office.png";
                left_rc_x = (canvas_Result.width * 0.2380);
                left_rc_y = (canvas_Result.height * 0.2175);
                left_rc_angle = 4.8;
                left_rc_font = '40.5px';

                right_rc_x = (canvas_Result.width * 0.6725);
                right_rc_y = (canvas_Result.height * 0.2625);
                right_rc_angle = 4.8;
                righy_rc_font = '42px';
                break;
            case 1:
                img_Result.src = "../img/result/hotpot.png";
                left_rc_x = 742.5;
                left_rc_y = (canvas_Result.height * 0.205);
                left_rc_angle = -7.25;
                left_rc_font = '36px';

                right_rc_x = 1018;
                right_rc_y = 185;
                right_rc_angle = -8.75;
                righy_rc_font = '36px';
                break;
            case 2:
                img_Result.src = "../img/result/sofa.png";
                left_rc_x = 645;
                left_rc_y = 250;
                left_rc_angle = 28;
                left_rc_font = '40.5px';

                right_rc_x = 1235;
                right_rc_y = 465;
                right_rc_angle = 22;
                righy_rc_font = '42px';
                break;
            case 3:
                img_Result.src = "../img/result/gift.png";
                left_rc_x = 330;
                left_rc_y = 195;
                left_rc_angle = 2;
                left_rc_font = '45px';

                right_rc_x = 680;
                right_rc_y = 205;
                right_rc_angle = 1.3;
                righy_rc_font = '45px';
                break;
        }

        img_Result.onload = function () {
            canvas_Result_ctx.drawImage(img_Result, 0, 0, canvas_Result.width, canvas_Result.height);

            $('#coupletLeft').css('font-size', left_rc_font);
            $('#coupletRight').css('font-size', righy_rc_font);

            html2canvas(document.getElementById('coupletLeft'), {
                onrendered: function (leftcanvas) {
                    canvas_CoupletLeft.width = leftcanvas.height * 2;
                    canvas_CoupletLeft.height = leftcanvas.height * 2;
                    canvas_CoupletLeft_ctx.drawImage(leftcanvas, canvas_CoupletLeft.width / 2 - leftcanvas.width / 2, canvas_CoupletLeft.height / 2 - leftcanvas.width / 2);
                    $this.drawRotated(left_rc_angle, canvas_CoupletLeft, canvas_CoupletLeft_ctx, leftcanvas);

                    canvas_Result_ctx.drawImage(canvas_CoupletLeft, (-canvas_CoupletLeft.width / 2) + left_rc_x, (-canvas_CoupletLeft.height / 2) + left_rc_y, canvas_CoupletLeft.width, canvas_CoupletLeft.height);

                    html2canvas(document.getElementById('coupletRight'), {
                        onrendered: function (rightcanvas) {
                            canvas_CoupletRight.width = rightcanvas.height * 2;
                            canvas_CoupletRight.height = rightcanvas.height * 2;
                            canvas_CoupletRight_ctx.drawImage(rightcanvas, canvas_CoupletRight.width / 2 - rightcanvas.width / 2, canvas_CoupletRight.height / 2 - rightcanvas.width / 2);
                            $this.drawRotated(right_rc_angle, canvas_CoupletRight, canvas_CoupletRight_ctx, rightcanvas);

                            canvas_Result_ctx.drawImage(canvas_CoupletRight, (-canvas_CoupletRight.width / 2) + right_rc_x, (-canvas_CoupletRight.height / 2) + right_rc_y, canvas_CoupletRight.width, canvas_CoupletRight.height);

                            if (cb) cb();
                        }
                    });
                }
            });
        }
    },
    saveCouplet: function(){
        var canvas_ToProcess = document.getElementById('canvas_Result');
        var canvas_ToProcessCTX = canvas_ToProcess.getContext('2d');

        setTimeout(function () {
            gameCtrl.create('pc', tempright,templeft, '../img/print/pc.png', 125, 165, 370, 165, function (pcR) {
                var tempPC = pcR.toDataURL().split(',')[1];

                gameCtrl.create('m', tempMright,tempMleft, '../img/print/m.png', 285, 385, 390, 385, function (mR) {
                    var tempM = mR.toDataURL().split(',')[1];
                    setTimeout(function () {
                        gameCtrl.SendData(
                            $('#input_coupletRight').val(),
                            $('#input_coupletLeft').val(),
                            canvas_ToProcess.toDataURL().split(',')[1],
                            tempPC,
                            tempM
                        );
                    }, 200);
                });
            });
        }, 200);
    },
    SendData: function(CRight, CLeft, storgeBase64, storgeCP, storgeCPm){
        
        /* 2017-01-13 Jeffery for firefox */
        var isFF = "false";
        if(firefox && (firefox !== undefined && firefox !== null && firefox !== '')){
            isFF = "true";
        }else{
            isFF = "false";
        }
        
        $.ajax({
            async: false,
            type: "POST",
            url: '../api/SendData.ashx',
            dataType: 'json',
            data: {
                CRight: CRight,
                CLeft: CLeft,
                storgeBase64: storgeBase64,
                storgeCP: storgeCP,
                storgeCPm: storgeCPm,
                isFF: isFF.toString()
            },
            success: function (data) {
                if (data.err === null){
                    /* 2017-01-12 Jeffery 調整導result頁 */
                    if(firefox){
                        window.location = "result.html?guid=" + data.resguid + '&FFindex=' + FFinfo.index;
                    }else{
                        window.location = "result.html?guid=" + data.resguid;
                    }
                    /*$('.loadingcontent').fadeOut('fast',function(){
                        $('.result.firstcontent').fadeIn('slow');
                        fbInfo.thisSiteGuid = data.resguid;
                        fbInfo.pic = fbInfo.pic + data.resguid + '.png';
                        fbInfo.share_u = fbInfo.share_u + '?fb_back=1&guid=' + data.resguid;
                        fbInfo.redirect_uri = fbInfo.redirect_uri + '?guid=' + data.resguid;
                    });*/
                }else if(data.err === 'err'){
                    alert('系統繁忙，請稍候再試');
                }
            }
        });
    }
}

window.onload = function () {
    gameCtrl.init();
};
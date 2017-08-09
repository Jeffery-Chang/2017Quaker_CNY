(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

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
}]);

var fbInfo = {
    thisSiteUrl: 'http://tonicdrink.sfworldwide.com/event/2017_cny/',
    thisSiteGuid: '',
    pcDownload: '',
    mDownload: '',
    appID: '1139972609434384',
    share_u: 'http://tonicdrink.sfworldwide.com/event/2017_cny/result.html',
    title: '桂格QUAKER  | 分享春聯 抽養氣人蔘禮盒',
    fb_des: '這就是人蔘R～今年的好運氣，靠桂格幫你補氣！分享人蔘春聯，就抽養氣人蔘禮盒。春節送口碑第一、護肝認證的桂格，讓你成為人蔘勝利組！',
    pic: 'http://tonicdrink.sfworldwide.com/event/2017_cny/img/user_result/',
    redirect_uri: 'http://tonicdrink.sfworldwide.com/event/2017_cny/form.html'
}

/* 2017-01-13 Jeffery for firefox */
var FFinfo = {
    index: 1
}

//init
function doFirst() {
    gapage('1_game');

    //Game Canvas
    var canvas_gamekv = document.getElementById('canvas_gamekv');
    var canvas_gamekv_ctx = canvas_gamekv.getContext('2d');

    var templeft = null;
    var tempright = null;
    var tempMleft = null;
    var tempMright = null;

    canvas_gamekv.width = $('#img_gamekv').width();
    canvas_gamekv.height = $('#img_gamekv').height();
    canvas_gamekv_ctx.drawImage(document.getElementById('img_gamekv'), 0, 0, canvas_gamekv.width, canvas_gamekv.height);

    //即時預覽
    $("#btnPreview").on('click', function () {
        _jf.flush();

        _jf.push(['_eventActived', function () {
            //成功觸發事件
            canvas_gamekv_ctx.clearRect(0, 0, canvas_gamekv.width, canvas_gamekv.height);
            canvas_gamekv_ctx.drawImage(document.getElementById('img_gamekv'), 0, 0, canvas_gamekv.width, canvas_gamekv.height);
            $('#input_coupletLeft').focus();
            $('#input_coupletRight').focus().blur();
            PrintTo();
        }]);
    });

    //隨機
    $('.redbutton:eq(0) a').on('click', function () {
        /* 2017-01-13 Jeffery for firefox */
        if(firefox){
            var firefox_rnd = Math.floor(Math.random() * 4) + 1;
            var old_cnt = $('.firefoxImg').attr('src').split('game_0')[1].split('.')[0];
            var new_cnt = Math.floor(Math.random() * 4) + 1;

            while(old_cnt == new_cnt){
                new_cnt = Math.floor(Math.random() * 4) + 1;
            }

            FFinfo.index = new_cnt;
            $('.firefoxImg').attr('src','img/firefox/game_0'+new_cnt+'.png');
        }else{
            $(this).find('button').attr('disabled',true);
            var cnt = Math.floor(Math.random() * 30);
            $('#input_coupletLeft').val(randomList[cnt].right).focus();
            $('#input_coupletRight').val(randomList[cnt].left).focus().blur();
            $("#btnPreview").click();
        }
    });

    //送出
    $('.redbutton:eq(1) a').on('click', function () {
        /* 2017-01-13 Jeffery for firefox */
        if(firefox){
            $('.wrap_game').fadeOut('slow', function () {
                $('.loadingcontent').fadeIn('fast');
                SendData('','','','','');
            });
        }else{
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

            $('.wrap_game').fadeOut('slow', function () {
                $('.loadingcontent').fadeIn('fast');
                MmakePCcanvas(MmakePCcanvasM);
            });
        }
    });

    function endSend(){
        var randomResult = [makeRCanvas_Office, makeRCanvas_Hotpot, makeRCanvas_Sofa, makeRCanvas_Gift];
        var rnd = Math.floor(Math.random() * randomResult.length);
        randomResult[rnd](saveCouplet);

        setTimeout(function () {
            $('#canvas_Result').css('width', '100%');
            $('#canvas_Result').css('height', 'auto');
        }, 300);
    }

    // 字少補空白
    function addSpace(word){
        if(word === '' || word === null || word === undefined) return '';
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
    }

    //上聯 打字連動
    $('#input_coupletLeft').on('focusout', function () {
        $('#coupletLeft').html(addSpace($(this).val()));
    });

    //下聯 打字連動
    $('#input_coupletRight').on('focusout', function () {
        $('#coupletRight').html(addSpace($(this).val()));
    });

    /* 2017-01-12 Jeffery 調整導result頁 */
    //分享按鈕
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

        gaclick('fb_share');
    });*/

    $('.choosetype li').on('click',function(){
        var downIndex = $(this).index();
        var imgPath = '';
        /*var imgLink,imgName,imgHref;

        if(downIndex === 0){
            imgLink = document.getElementById("Desktop");
            imgName = 'Desktop';
            imgHref = fbInfo.pcDownload;
        }else if(downIndex === 1){
            imgLink = document.getElementById("Mobile");
            imgName = 'Mobile';
            imgHref = fbInfo.mDownload;
        }

        imgLink.download = imgName + ".jpg";
        imgLink.href = imgHref;*/

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
            PrintTo();
        }]);
    }, 500)

    //建立春聯圖
    function create(type, right, left, src, lx, ly, rx, ry, callback) {
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
    };

    //Reasult Canvas _ Office
    function makeRCanvas_Office(cb) {
        if (cb === void 0) { cb = null; }

        var img_Result = document.getElementById('img_Result');
        img_Result.src = "img/result/office.png";
        //init canvas_Result
        var canvas_Result = document.getElementById('canvas_Result');
        var canvas_Result_ctx = canvas_Result.getContext('2d');
        canvas_Result.width = 1500;
        canvas_Result.height = 875;

        //init canvas_CoupletRight
        var canvas_CoupletRight = document.getElementById('canvas_CoupletRight');
        var canvas_CoupletRight_ctx = canvas_CoupletRight.getContext('2d');

        //init canvas_CoupletLeft
        var canvas_CoupletLeft = document.getElementById('canvas_CoupletLeft');
        var canvas_CoupletLeft_ctx = canvas_CoupletLeft.getContext('2d');

        //When img loadend
        img_Result.onload = function () {
            //Draw Result 底圖
            canvas_Result_ctx.drawImage(img_Result, 0, 0, canvas_Result.width, canvas_Result.height);

            //Reset Span font-size
            $('#coupletRight').css('font-size', '41px')
            $('#coupletLeft').css('font-size', '41px')

            //把春聯coupletLeft畫成Canvas 再把它旋轉 之後貼到 canvas_Result
            html2canvas(document.getElementById('coupletLeft'), {
                onrendered: function (leftcanvas) {

                    canvas_CoupletLeft.width = leftcanvas.height * 2;
                    canvas_CoupletLeft.height = leftcanvas.height * 2;
                    canvas_CoupletLeft_ctx.drawImage(leftcanvas, canvas_CoupletLeft.width / 2 - leftcanvas.width / 2, canvas_CoupletLeft.height / 2 - leftcanvas.width / 2);
                    drawRotated(4.83, canvas_CoupletLeft, canvas_CoupletLeft_ctx, leftcanvas);

                    canvas_Result_ctx.drawImage(canvas_CoupletLeft, (-canvas_CoupletLeft.width / 2.07) + (canvas_Result.width * 0.22875), (-canvas_CoupletLeft.height / 2) + (canvas_Result.height * 0.21542), canvas_CoupletLeft.width, canvas_CoupletLeft.height);

                    //把春聯coupletRight畫成Canvas 再把它旋轉 之後貼到 canvas_Result
                    html2canvas(document.getElementById('coupletRight'), {
                        onrendered: function (rightcanvas) {

                            canvas_CoupletRight.width = rightcanvas.height * 2
                            canvas_CoupletRight.height = rightcanvas.height * 2
                            canvas_CoupletRight_ctx.drawImage(rightcanvas, canvas_CoupletRight.width / 2 - rightcanvas.width / 2, canvas_CoupletRight.height / 2 - rightcanvas.width / 2);
                            drawRotated(4.75, canvas_CoupletRight, canvas_CoupletRight_ctx, rightcanvas);

                            //console.log((-canvas_CoupletRight.width / 2) + 183, (-canvas_CoupletRight.height / 2) + 102, canvas_Result.width, canvas_Result.height);

                            canvas_Result_ctx.drawImage(canvas_CoupletRight, (-canvas_CoupletRight.width / 2.08) + (canvas_Result.width * 0.66667), (-canvas_CoupletRight.height / 2) + (canvas_Result.height * 0.267), canvas_CoupletRight.width, canvas_CoupletRight.height);


                            //console.log(canvas_Result.toDataURL())
                            if (cb) cb();
                        }
                    });
                }
            });
        }
    }

    //Reasult Canvas _ Hotpot
    function makeRCanvas_Hotpot(cb) {
        if (cb === void 0) { cb = null; }

        var img_Result = document.getElementById('img_Result');
        img_Result.src = "img/result/hotpot.png";
        //init canvas_Result
        var canvas_Result = document.getElementById('canvas_Result');
        var canvas_Result_ctx = canvas_Result.getContext('2d');
        canvas_Result.width = 1500;
        canvas_Result.height = 875;

        //init canvas_CoupletRight
        var canvas_CoupletRight = document.getElementById('canvas_CoupletRight');
        var canvas_CoupletRight_ctx = canvas_CoupletRight.getContext('2d');

        //init canvas_CoupletLeft
        var canvas_CoupletLeft = document.getElementById('canvas_CoupletLeft');
        var canvas_CoupletLeft_ctx = canvas_CoupletLeft.getContext('2d');

        //When img loadend
        img_Result.onload = function () {
            //Draw Result 底圖
            canvas_Result_ctx.drawImage(img_Result, 0, 0, canvas_Result.width, canvas_Result.height);

            //Reset Span font-size
            $('#coupletRight').css('font-size', '36px')
            $('#coupletLeft').css('font-size', '36px')

            //把春聯coupletLeft畫成Canvas 再把它旋轉 之後貼到 canvas_Result
            html2canvas(document.getElementById('coupletLeft'), {
                onrendered: function (leftcanvas) {
                    canvas_CoupletLeft.width = leftcanvas.height * 2
                    canvas_CoupletLeft.height = leftcanvas.height * 2
                    canvas_CoupletLeft_ctx.drawImage(leftcanvas, canvas_CoupletLeft.width / 2 - leftcanvas.width / 2, canvas_CoupletLeft.height / 2 - leftcanvas.width / 2);
                    drawRotated(-7.25, canvas_CoupletLeft, canvas_CoupletLeft_ctx, leftcanvas);

                    //console.log((-canvas_CoupletRight.width / 2) + 183, (-canvas_CoupletRight.height / 2) + 102, canvas_Result.width, canvas_Result.height);

                    canvas_Result_ctx.drawImage(canvas_CoupletLeft, (-canvas_CoupletLeft.width / 2) + 740, (-canvas_CoupletLeft.height / 2) + (canvas_Result.height * 0.2), canvas_CoupletLeft.width, canvas_CoupletLeft.height);

                    //把春聯coupletRight畫成Canvas 再把它旋轉 之後貼到 canvas_Result
                    html2canvas(document.getElementById('coupletRight'), {
                        onrendered: function (rightcanvas) {
                            canvas_CoupletRight.width = rightcanvas.height * 2;
                            canvas_CoupletRight.height = rightcanvas.height * 2;
                            canvas_CoupletRight_ctx.drawImage(rightcanvas, canvas_CoupletRight.width / 2 - rightcanvas.width / 2, canvas_CoupletRight.height / 2 - rightcanvas.width / 2);
                            drawRotated(-8.75, canvas_CoupletRight, canvas_CoupletRight_ctx, rightcanvas);

                            canvas_Result_ctx.drawImage(canvas_CoupletRight, (-canvas_CoupletRight.width / 2) + 1015, (-canvas_CoupletRight.height / 2) + 185, canvas_CoupletRight.width, canvas_CoupletRight.height);

                            if (cb) cb();
                        }
                    });
                }
            });
        }
    }

    //Reasult Canvas _ Sofa
    function makeRCanvas_Sofa(cb) {
        if (cb === void 0) { cb = null; }

        var img_Result = document.getElementById('img_Result');
        img_Result.src = "img/result/sofa.png";
        //init canvas_Result
        var canvas_Result = document.getElementById('canvas_Result');
        var canvas_Result_ctx = canvas_Result.getContext('2d');
        canvas_Result.width = 1500;
        canvas_Result.height = 875;

        //init canvas_CoupletRight
        var canvas_CoupletRight = document.getElementById('canvas_CoupletRight');
        var canvas_CoupletRight_ctx = canvas_CoupletRight.getContext('2d');

        //init canvas_CoupletLeft
        var canvas_CoupletLeft = document.getElementById('canvas_CoupletLeft');
        var canvas_CoupletLeft_ctx = canvas_CoupletLeft.getContext('2d');

        //When img loadend
        img_Result.onload = function () {
            //Draw Result 底圖
            canvas_Result_ctx.drawImage(img_Result, 0, 0, canvas_Result.width, canvas_Result.height);

            //Reset Span font-size
            $('#coupletRight').css('font-size', '41px')
            $('#coupletLeft').css('font-size', '41px')

            //把春聯coupletLeft畫成Canvas 再把它旋轉 之後貼到 canvas_Result
            html2canvas(document.getElementById('coupletLeft'), {
                onrendered: function (leftcanvas) {
                    canvas_CoupletLeft.width = leftcanvas.height * 2;
                    canvas_CoupletLeft.height = leftcanvas.height * 2;
                    canvas_CoupletLeft_ctx.drawImage(leftcanvas, canvas_CoupletLeft.width / 2 - leftcanvas.width / 2, canvas_CoupletLeft.height / 2 - leftcanvas.width / 2);
                    drawRotated(28, canvas_CoupletLeft, canvas_CoupletLeft_ctx, leftcanvas);

                    canvas_Result_ctx.drawImage(canvas_CoupletLeft, (-canvas_CoupletLeft.width / 2) + 645, (-canvas_CoupletLeft.height / 2) + 250, canvas_CoupletLeft.width, canvas_CoupletLeft.height);

                    //把春聯coupletRight畫成Canvas 再把它旋轉 之後貼到 canvas_Result
                    html2canvas(document.getElementById('coupletRight'), {
                        onrendered: function (rightcanvas) {
                            canvas_CoupletRight.width = rightcanvas.height * 2;
                            canvas_CoupletRight.height = rightcanvas.height * 2;
                            canvas_CoupletRight_ctx.drawImage(rightcanvas, canvas_CoupletRight.width / 2 - rightcanvas.width / 2, canvas_CoupletRight.height / 2 - rightcanvas.width / 2);
                            drawRotated(22, canvas_CoupletRight, canvas_CoupletRight_ctx, rightcanvas);

                            canvas_Result_ctx.drawImage(canvas_CoupletRight, (-canvas_CoupletRight.width / 2) + 1230, (-canvas_CoupletRight.height / 2) + 470, canvas_CoupletRight.width, canvas_CoupletRight.height);

                            if (cb) cb();
                        }
                    });

                }
            });
        }
    }

    //Reasult Canvas _ Gift
    function makeRCanvas_Gift(cb) {
        if (cb === void 0) { cb = null; }

        var img_Result = document.getElementById('img_Result');
        img_Result.src = "img/result/gift.png";
        //init canvas_Result
        var canvas_Result = document.getElementById('canvas_Result');
        var canvas_Result_ctx = canvas_Result.getContext('2d');
        canvas_Result.width = 1500;
        canvas_Result.height = 875;

        //init canvas_CoupletRight
        var canvas_CoupletRight = document.getElementById('canvas_CoupletRight');
        var canvas_CoupletRight_ctx = canvas_CoupletRight.getContext('2d');

        //init canvas_CoupletLeft
        var canvas_CoupletLeft = document.getElementById('canvas_CoupletLeft');
        var canvas_CoupletLeft_ctx = canvas_CoupletLeft.getContext('2d');

        //When img loadend
        img_Result.onload = function () {
            //Draw Result 底圖
            canvas_Result_ctx.drawImage(img_Result, 0, 0, canvas_Result.width, canvas_Result.height);

            //Reset Span font-size
            $('#coupletRight').css('font-size', '46px')
            $('#coupletLeft').css('font-size', '45px')

            //把春聯coupletLeft畫成Canvas 再把它旋轉 之後貼到 canvas_Result
            html2canvas(document.getElementById('coupletLeft'), {
                onrendered: function (leftcanvas) {
                    canvas_CoupletLeft.width = leftcanvas.height * 2
                    canvas_CoupletLeft.height = leftcanvas.height * 2
                    canvas_CoupletLeft_ctx.drawImage(leftcanvas, canvas_CoupletLeft.width / 2 - leftcanvas.width / 2, canvas_CoupletLeft.height / 2 - leftcanvas.width / 2);
                    drawRotated(2, canvas_CoupletLeft, canvas_CoupletLeft_ctx, leftcanvas);

                    canvas_Result_ctx.drawImage(canvas_CoupletLeft, (-canvas_CoupletLeft.width / 2) + 330, (-canvas_CoupletLeft.height / 2) + 195, canvas_CoupletLeft.width, canvas_CoupletLeft.height);

                    //把春聯coupletRight畫成Canvas 再把它旋轉 之後貼到 canvas_Result
                    html2canvas(document.getElementById('coupletRight'), {
                        onrendered: function (rightcanvas) {
                            canvas_CoupletRight.width = rightcanvas.height * 2
                            canvas_CoupletRight.height = rightcanvas.height * 2
                            canvas_CoupletRight_ctx.drawImage(rightcanvas, canvas_CoupletRight.width / 2 - rightcanvas.width / 2, canvas_CoupletRight.height / 2 - rightcanvas.width / 2);
                            drawRotated(1.3, canvas_CoupletRight, canvas_CoupletRight_ctx, rightcanvas);

                            canvas_Result_ctx.drawImage(canvas_CoupletRight, (-canvas_CoupletRight.width / 2) + 680, (-canvas_CoupletRight.height / 2) + 205, canvas_CoupletRight.width, canvas_CoupletRight.height);

                            if (cb) cb();
                        }
                    });
                }
            });
        }
    }

    //旋轉Canvas //Result Office
    function drawRotated(degrees, canvas, ctx, image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(degrees * Math.PI / 180);
        //          console.log(canvas.width, canvas.height);
        //672
        //          ctx.scale(0.52, 0.52);
        ctx.drawImage(image, -image.width / 2, -image.width / 2);
        ctx.restore();
    }

    //使用html2canvas  將span製成圖 再刷到canvas_gamekv上面
    function PrintTo() {
        var ratio = $('#img_gamekv').height() * 0.080152;
        var lessNUM = 0;
        var targetLeft = $("#coupletLeft");
        var targetRight = $("#coupletRight");

        $('#coupletRight').css('font-size', ratio + 'px');
        $('#coupletLeft').css('font-size', ratio + 'px');

        /*if ($('#img_gamekv').width() < 800) {
            lessNUM = (800 - $('#img_gamekv').width()) * 0.0416667;
        }*/
        var leftX = canvas_gamekv.width / 100 * 3.5;
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
        }, 200)
    }

    // 手機版以pc字體轉canvas
    function MmakePCcanvas(cb){
        if (cb === void 0) { cb = null; }
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
    }

    function MmakePCcanvasM(){
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
                            endSend();
                        }
                    });
                }, 300);
            }
        });
    }

    //Save Couplet
    function saveCouplet() {
        var canvas_ToProcess = document.getElementById('canvas_Result');
        var canvas_ToProcessCTX = canvas_ToProcess.getContext('2d');

        var smallCanvasImg = document.createElement('img');
        var smallCanvas = document.createElement('canvas');
        smallCanvas.width = 600;
        smallCanvas.height = 350;
        var smallCanvasCtx = smallCanvas.getContext("2d");
        var saveSmallData;
        smallCanvasCtx.drawImage(canvas_ToProcess, 0, 0,  smallCanvas.width, smallCanvas.height);
        saveSmallData = canvas_ToProcess.toDataURL().split(',')[1]

        create('pc', tempright,templeft, 'img/print/pc.png', 125, 165, 370, 165, function (pcR) {
            var tempPC = pcR.toDataURL().split(',')[1];
            fbInfo.pcDownload = pcR.toDataURL();
            create('m', tempMright,tempMleft, 'img/print/m.png', 285, 385, 390, 385, function (mR) {
                var tempM = mR.toDataURL().split(',')[1];
                fbInfo.mDownload = mR.toDataURL();
                SendData(
                    $('#input_coupletRight').val(),
                    $('#input_coupletLeft').val(),
                    saveSmallData,
                    tempPC,
                    tempM
                );
            });
        });
    }

    //    使用canvas對大圖片進行壓縮
    function compress(img) {
        $('#storgeBase64').val('');
        var initSize = img.src.length;

        var width = 800;
        var height = 600;

        var ratio;

        canvas.width = width;
        canvas.height = height;


        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, width, height);

        //  drawImageIOSFix(ctx, img, 0, 0, width, height);
        var ndata = canvas.toDataURL();
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

        return ndata;
    }

    // ajax 上傳資料 並接收回傳的guid
    function SendData(CRight, CLeft, storgeBase64, storgeCP, storgeCPm) {

        /* 2017-01-13 Jeffery for firefox */
        var isFF = "false";
        if(firefox !== undefined && firefox !== null && firefox !== '' && firefox){
            isFF = "true";
        }else{
            isFF = "false";
        }

        $.ajax({
            async: false,
            type: "POST",
            url: 'api/SendData.ashx',
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
                if (data.err == null){
                    /* 2017-01-12 Jeffery 調整導result頁 */
                    if(firefox){
                        window.location = "result.html?guid=" + data.resguid + '&FFindex=' + FFinfo.index;
                    }else{
                        window.location = "result.html?guid=" + data.resguid;
                    }

                    /*$('.loadingcontent').fadeOut('fast',function(){
                        $('.wrap_result').fadeIn('slow');
                    });

                    fbInfo.thisSiteGuid = data.resguid;
                    fbInfo.pic = fbInfo.pic + data.resguid + '.png';
                    fbInfo.share_u = fbInfo.share_u + '?fb_back=1&guid=' + data.resguid;
                    fbInfo.redirect_uri = fbInfo.redirect_uri + '?guid=' + data.resguid;

                    //分享按鈕
                    $('.sharebutton button').on('click', function () {
                        window.location = "result.html?guid=" + data.resguid;
                    });*/
                }

                if (data.err == 'err'){
                    alert('err')
                }
            }
        });
    }
}


window.onload = function () {
    doFirst();
};
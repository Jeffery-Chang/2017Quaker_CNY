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
}])

var formCtrl = {
    init: function(){
        var $this = this;

        gapage('3_form');

        $('.redbutton a button').on('click', function () {
            var text_name = $('.forminput:eq(0) input').val();
            var text_number = $('.forminput:eq(1) input').val();
            var text_email = $('.forminput:eq(2) input').val();

            if($.trim(text_name) === ''){
                alert('請輸入姓名');
                $('.forminput:eq(0) input').focus();
                return;
            }
            if($.trim(text_number) === ''){
                alert('請輸入電話');
                $('.forminput:eq(1) input').focus();
                return;
            }
            if($.trim(text_email) === ''){
                alert('請輸入E-mail');
                $('.forminput:eq(2) input').focus();
                return;
            }

            if(!$("#check1").prop("checked")) {
                alert('請先詳閱相關活動辦法'); 
                return;
            }

            $this.updateData(text_name, text_number, text_email, $.getUrlParam('guid'));
        });
    },
    updateData: function(name, number, email, upguid){
        $.ajax({
            async: false,
            type: "POST",
            url: 'api/UpdateData.ashx',
            dataType: 'json',
            data: {
                name: name,
                number: number,
                email: email,
                upguid: upguid
            }
            ,success: function (data) {
                if (data.err == null) {
                    $('.formcontent').eq(0).fadeOut('slow',function(){
                        $('.formcontent').eq(1).fadeIn('slow');
                    });
                }
                if (data.err == 'err') {
                    alert('err')
                }
            }
        });
    }
}

$(function(){
    formCtrl.init();
});
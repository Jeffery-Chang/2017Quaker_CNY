(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-84534393-2', 'auto');


var useragent = navigator.userAgent;
var isM = "pc_";
if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 || useragent.indexOf('Windows Phone') != -1) {
    isM = 'm_'
}else{
    isM = 'pc_'
}

function gapage(page) {
    ga('send', 'pageview', isM + page);
}

function gaclick(evt) {
    ga('send', 'event', 'click', isM + evt);
}

function trackWaitJump(someurl, url) {
    setTimeout(function () {
        location.href = url;
    }, 100);
    gaclick(someurl);
}
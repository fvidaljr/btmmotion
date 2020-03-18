$(document).ready(function(){
    console.log($("body").height());
    console.log($(window).height());
    console.log($("footer"));
    console.log($(window).width());

    if ($("body").height() <= $(window).height() ) {
        $("footer").css({
            "position":"absolute",
            "bottom":"0px",
            "width":"100%"
        })
    }

});
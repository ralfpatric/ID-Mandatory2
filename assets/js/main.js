/* Created by Johannes & Ralf. */

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    console.log("Page loaded and ready.");

    //If page is loaded while not at the top
    var iSearchH = $("#search").outerHeight(true);
    var iToTop = $(document).scrollTop();

    if(iToTop >= iSearchH){
        $("aside").css("top", 0)
    } else {
        var iTotal = iSearchH - iToTop;
        $("aside").css("top", iTotal)
    }


    // EVENTS
    $(".payment-button button").click(function(){
        $("#payment").css("display", "flex");
    });

    $(".payment").click(function(){
        $("#payment").css("display", "flex");
    });

    $(document).click(function(event) {
        if($(event.target).closest('#payment').length && !$(event.target).closest('.sectionwrapper').length){
            $("#payment").css("display", "none");
        }
    });

    $(document).scroll(function(){
        setAsideMargin();
    });

    $("#search form").submit(function (e) {
        e.preventDefault();
        $("#results").fadeIn(500);
        $("aside").fadeIn(500);
        $("footer").fadeIn(500);
        $(".payment-button").fadeIn(500);
        $('html, body').animate({
            scrollTop: $("#results").offset().top
        }, 750);
    });

    $(".result-item").click(function(){
        $(".result-item").removeClass("active");
        $(this).addClass("active");
    });

    $(".fa-arrow-down").click(function(){
        console.log("Customize me! (Later)");
    });

    //FUNCTIONALITY
    function setAsideMargin(){
        var iSearchHeight = $("#search").outerHeight(true);
        var iCurrentHeight = $(document).scrollTop();
        var iDetermine = iSearchHeight - iCurrentHeight;

        if(iDetermine < 0){
            $("aside").css("top", 0)
        } else {
            $("aside").css("top", iDetermine)
        }
    }
});

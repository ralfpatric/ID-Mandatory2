/* Created by Johannes & Ralf. */

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    console.log("Page loaded and ready.");


    // EVENTS
    $(".payment-button button").click(function(){
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

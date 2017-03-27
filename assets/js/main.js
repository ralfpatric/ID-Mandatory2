/* Created by Johannes & Ralf. */

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    console.log("Page loaded and ready.");

    $(".payment-button button").click(function(){
        $("#payment").css("display", "flex");
    });

    $(document).click(function(event) {
        if($(event.target).closest('#payment').length && !$(event.target).closest('.sectionwrapper').length){
            $("#payment").css("display", "none");
        }
    });
});

/* Created by Johannes & Ralf. */

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    console.log("Page loaded and ready.");

    $(".payment-button button").click(function(){
        $("#payment").css("display", "flex");
    });

    $("#payment .fa").click(function(){
        $("#payment").css("display", "none");
    });

    $("#payment").click(function(){
        $("#payment").css("display", "none");
    });
});

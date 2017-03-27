/* Created by Johannes & Ralf. */

console.log("Stuff.");

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    $(".payment-button button").click(function(){
        console.log("wot");
        $("#payment").css("display", "flex");
    });
});

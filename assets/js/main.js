/* Created by Johannes & Ralf. */

jQuery("document").ready(function(){
    var $ = jQuery.noConflict();

    console.log("Page loaded and ready.");

    var bLoggedIn = false;

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
        displayPayment();
    });

    $(".payment").click(function(){
        displayPayment();
    });

    $(".seat-button button").click(function(){
        $(".plane-wrap").css("display", "flex");
    });

    $(".close-seat").click(function(){
        $(".plane-wrap").css("display", "none");
    });

    $(document).click(function(event) {
        if($(event.target).closest('#payment').length && !$(event.target).closest('.sectionwrapper').length){
            $("#payment").css("display", "none");
        }
    });

    $(document).scroll(function(){
        setAsideMargin();
        setAsideFocus(window);
    });

    $("#search form").submit(function (e) {
        e.preventDefault();
        $("#results").fadeIn(500);
        $("aside").fadeIn(500);
        $("footer").fadeIn(500);
        $("#passengers").fadeIn(500);
        $(".payment-button").fadeIn(500);
        $(".seat-button").fadeIn(500);
        $('html, body').animate({
            scrollTop: $("#results").offset().top
        }, 750);
    });

    $(".result-item").click(function(){
        if(!$(this).hasClass("active")){
            $(".result-item").removeClass("active");
            $(".result-item *").removeClass("details-active");
            $(this).addClass("active");
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 750);
        }
    });

    $(".destinations").click(function(){
        $('html, body').animate({
            scrollTop: $("#results").offset().top
        }, 750);
    });

    $(".passengers").click(function(){
        $('html, body').animate({
            scrollTop: $("#passengers").offset().top
        }, 750);
    });

    $(".fa-arrow-down").click(function(){
        $(this).parent().parent().parent().next().toggleClass("details-active");
    });

    $(".r-i-top-details-1, .r-i-top-details-2, .r-i-top-details-3").click(function(e){
        var oTarget = e.currentTarget;
        $(".r-i-top-details *").removeClass("active-details");
        setTimeout(function(){
            $(oTarget).addClass("active-details");
        }, 50);
        var targetPrice = $(oTarget).parent().parent();
        targetPrice = $(targetPrice).find(".ri-right h3");
        var sPrice = $(targetPrice[0]).text();
        sPrice = sPrice.split(" ");
        iPrice = Number(sPrice[0]);

        if($(oTarget).hasClass("r-i-top-details-1")){
            iPrice = iPrice * 0.8;
        } else if($(oTarget).hasClass("r-i-top-details-2")){
            iPrice = iPrice * 1.2;
        } else if($(oTarget).hasClass("r-i-top-details-3")){
            iPrice = iPrice * 1.5;
        }

        iPrice = Math.round(iPrice);

        var sNewPrice = "" + iPrice + " DKK";
        $(targetPrice[0]).text(sNewPrice);
    });

    $(".r-i-bottom-details-1, .r-i-bottom-details-2, .r-i-bottom-details-3").click(function(e){
        var oTarget = e.currentTarget;
        $(".r-i-bottom-details *").removeClass("active-details");
        setTimeout(function(){
            $(oTarget).addClass("active-details");
        }, 50);
        var targetPrice = $(oTarget).parent().parent();
        targetPrice = $(targetPrice).find(".ri-right h3");
        var sPrice = $(targetPrice[1]).text();
        sPrice = sPrice.split(" ");
        iPrice = Number(sPrice[0]);

        if($(oTarget).hasClass("r-i-bottom-details-1")){
            iPrice = iPrice * 0.8;
        } else if($(oTarget).hasClass("r-i-bottom-details-2")){
            iPrice = iPrice * 1.2;
        } else if($(oTarget).hasClass("r-i-bottom-details-3")){
            iPrice = iPrice * 1.5;
        }

        iPrice = Math.round(iPrice);

        var sNewPrice = "" + iPrice + " DKK";
        $(targetPrice[1]).text(sNewPrice);
    });

    $(document).on("click", ".log-out", function(){
        logout();
    });

    $(document).on("click", ".user-profile", function(){
        showProfile();
    });

    $(document).on("click", ".login", function(){
        showLogin();
    });

    $(document).on("click", ".register", function(){
        showRegister();
    });

    $(document).on("click", "#modal-close", function(){
        $("#modal").removeClass("modal-shown").addClass("modal-hidden");
        $("#modal-action").removeClass("hidden");
        $("#modal-form").removeClass("hidden");
        $("#modal-profile-content").addClass("hidden");
        $("#modal-login-form").addClass("hidden");
        $("#modal-registration-form").addClass("hidden");
    });

    $(document).on("click", ".modal-login-check", function(){
        var sName = $("#modal-login-email").val();
        var sPassword = $("#modal-login-password").val();
        login(sName, sPassword);
    });

    $(document).on("click", ".modal-registration", function(){
        var sFirstName = $("#modal-reg-fname").val();
        var sLastName = $("#modal-reg-lname").val();
        var sPassword = $("#modal-reg-password").val();
        var iPhone = $("#modal-reg-phone").val();
        var sEmail = $("#modal-reg-email").val();
        var sCountry = $("#modal-reg-country").val();
        var bSubscribe = $("#modal-reg-newsletter").prop( "checked" );
        var bPrivacy = $("#modal-reg-privacy").prop( "checked" );
        createAccount(sFirstName, sLastName, iPhone, sEmail, sPassword, sCountry, bSubscribe, bPrivacy);
    });


    $("input[type=date]").change(function(){
        console.log("remove class");
        $(".dateclass").removeClass('placeholderclass');
    });

    $("#passengers-selector").change(function(){
        iNrPassenger = $("#passengers-selector").val();
        generatePassTemplate();
    });

    $('.seat input[type=checkbox]').change(function(){

        var iNrAllowedSeats = $(".seat input[type='checkbox']:checked").length;

        console.log(iNrAllowedSeats);
        console.log(iNrPassenger);

        if (iNrAllowedSeats > iNrPassenger) {
            $(this).prop('checked', false);
            iNrAllowedSeats = iNrAllowedSeats-1;
            //alert("allowed only 3");
            console.log(iNrAllowedSeats);
            console.log(iNrPassenger);
        }
    });

    $("#pay-now-btn").click(function(e){
        e.preventDefault();
        $("#payment").css("display", "none");
        $("#confirmation").css("display", "flex");

        var sHtml = "<h2>Payment Confirmed</h2>";
        sHtml += "<h3>Booking#: u7824578</h3>";
        sHtml += "<h4>Travel Dates</h4>";
        sHtml += "<p>Departure: " + departureDate;
        sHtml += "<p>Return: " + returnDate;
        sHtml += "<h4>Passengers</h4>";

        var iPassengers = $(".passengers .bottom p").length;
        var oPassengers = $(".passengers .bottom p");

        for(var i = 0; i < iPassengers; i++){
            sHtml += "<p>"+$(oPassengers[i]).text();+"</p>";
        }

        sHtml += "<p>A copy of this confirmation has been sent to your registered email address.</p>";

        $("#conf-middle").empty().append(sHtml);
    });

    $("#conf-close").click(function(e){
        e.preventDefault();
        location.reload();
    });

    var departureDate = "";
    var returnDate = "";

    $('#departure input[type="date"]').change(function(){
        departureDate = new Date(this.value);
        departureDate = departureDate.getDate() + "/" + (departureDate.getMonth() + 1) + "/" + departureDate.getFullYear();
    });

    $('#return input[type="date"]').change(function(){
        returnDate = new Date(this.value);
        returnDate = returnDate.getDate() + "/" + (returnDate.getMonth() + 1) + "/" + returnDate.getFullYear();
    });












    //FUNCTIONALITY
    function setAsideMargin(){
        var iSearchHeight = $("#search").outerHeight(true);
        var iCurrentHeight = $(document).scrollTop();
        var iDetermine = iSearchHeight - iCurrentHeight;
        var iBodyWidth = $("body").outerWidth(true);

        if(iBodyWidth > 425) {
            if (iDetermine < 0) {
                $("aside").css("top", 0)
            } else {
                $("aside").css("top", iDetermine)
            }
        }
    }

    function setAsideFocus(oWindow){
        var winHeight = $(oWindow).height();
        var winScrollTop = $(oWindow).scrollTop();

        $("section").each(function(index){
            var elemHeight = $(this).height();
            var elementTop = $(this).position().top;

            if (elementTop < winScrollTop + winHeight && winScrollTop < elementTop + elemHeight) {
                if ($(this).attr("id") == "results") {
                    $("aside *").removeClass("current");
                    $("aside div.destinations").addClass("current");
                } else if($(this).attr("id") == "passengers"){
                    $("aside *").removeClass("current");
                    $("aside div.passengers").addClass("current");
                }
            } else {
                $(this).removeClass("current");
            }
        });
    }

    function displayPayment() {
        $("#payment").css("display", "flex");

        $("aside *").removeClass("current");
        $("aside div.payment").addClass("current");
    }

    function createAccount(sFirstName, sLastName, iPhone, sEmail, sPassword, sCountry, bSubscribe, bPrivacy){
        var jAccount = {};
        jAccount.fname = sFirstName;
        jAccount.lname = sLastName;
        jAccount.name = jAccount.fname + " " + jAccount.lname;
        jAccount.password = sPassword;
        jAccount.phone = iPhone;
        jAccount.email = sEmail;
        jAccount.country = sCountry;
        jAccount.subscribed = bSubscribe;
        jAccount.privacy = bPrivacy;

        localStorage.sjAccount = JSON.stringify(jAccount);
        $("#modal-action").removeClass();
        $("#modal-registration-form").addClass("hidden");
        $("#modal").addClass("modal-hidden").removeClass("modal-shown");
    }

    function login(sEmail, sPassword){
        var jAccount = {};
        jAccount.email = sEmail;
        jAccount.password = sPassword;

        if(localStorage.sjAccount) {
            var jAccountFromLocal = JSON.parse(localStorage.sjAccount);
            if(jAccount.email == jAccountFromLocal.email && jAccount.password == jAccountFromLocal.password){
                console.log("Logged in successfully!");
                $("#modal-action").removeClass();
                $("#modal-login-form").addClass("hidden");
                $("#modal").addClass("modal-hidden").removeClass("modal-shown");
                handleLogin();
                bLoggedIn = true;
                addValue();
            } else {
                console.log("Login credentials incorrect.");
            }
        } else {
            console.log("Account not found.");
        }
    }

    function handleLogin(){
        $("#navbutton1").text("Log out").addClass("log-out").removeClass("login");
        $("#navbutton2").text("Profile").addClass("user-profile").removeClass("register");
    }

    function logout(){
        console.log("Logged out.");
        bLoggedIn = false;
        $(".log-out").text("Login").addClass("login").removeClass("log-out");
        $(".user-profile").text("Register").addClass("register").removeClass("user-profile");
        RemoveValue();
    }

    function showProfile(){
        var jAccount = JSON.parse(localStorage.sjAccount);
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("User Profile: " + jAccount.name);
        $("#modal-action").addClass("hidden");
        $("#modal-form").addClass("hidden");
        var sHtml = "<p>First name: "+jAccount.fname+"</p>";
        sHtml += "<p>Last name: "+jAccount.lname+"</p>";
        sHtml += "<p>Email: "+jAccount.email+"</p>";
        sHtml += "<p>Phone: "+jAccount.phone+"</p>";
        sHtml += "<p>Country: "+jAccount.country+"</p>";
        sHtml += "<p>Newsletter: ";
        if(jAccount.subscribed){
            sHtml += "Yes";
        } else {
            sHtml += "No";
        }
        sHtml += "</p>";
        $("#modal-profile-content").empty().removeClass("hidden").append(sHtml);
    }

    function showRegister(){
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("Registration");
        $("#modal-action").text("Register").addClass("modal-registration");
        $("#modal-registration-form").removeClass();
    }

    function showLogin(){
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("Login");
        $("#modal-action").text("Login").addClass("modal-login-check");
        $("#modal-login-form").removeClass();
    }

    function addValue(){
        var jAccount = JSON.parse(localStorage.sjAccount);
        console.log("Value added!");
        $('#pass-fname-input1').val(jAccount.fname);
        $('#pass-lname-input1').val(jAccount.lname);
        $('#pass-phone-input1').val(jAccount.phone);
    }

    function RemoveValue(){
        console.log("Value removed!");
        $('#pass-fname-input1').val("");
        $('#pass-lname-input1').val("");
        $('#pass-phone-input1').val("");
    }

    function generatePassTemplate(){
        for (var i = 0; i<iNrPassenger-1; i++) {
            $("#new-cont").append(sPassGeneration);
        }
    }

    setInterval(function(){
        $("div.destinations .top h3").empty();
        if($("#results>.sectionwrapper>.active").length > 0){
            var sTop1 = $("div.result-item.active .r-i-top .ri-l-left h3").text() + " - ";
            var sTop2 = $("div.result-item.active .r-i-top .ri-m-left h3").text();
            var sText1 = "" + sTop1 + sTop2;
            $("div.destinations .top h3").text(sText1);

            var sTop3 = $("div.result-item.active .r-i-bottom .ri-l-left h3").text() + " - ";
            var sTop4 = $("div.result-item.active .r-i-bottom .ri-m-left h3").text();
            var sText2 = "" + sTop3 + sTop4;
            $("div.destinations .bottom h3").text(sText2);

            var targetPrice = $("div.result-item.active").find(".ri-right h3");
            var sPrice1 = $(targetPrice[0]).text();
            var sPrice2 = $(targetPrice[1]).text();
            sPrice1 = sPrice1.split(" ");
            iPrice1 = Number(sPrice1[0]);
            sPrice2 = sPrice2.split(" ");
            iPrice2 = Number(sPrice2[0]);
            var iFinalPrice = iPrice1 + iPrice2;

            var sPriceText = "" + iFinalPrice + " DKK";
            $("h2.total-price .price").text(sPriceText);
        }

        if($(".passenger-item").length > 0){
            var iLength = $(".passenger-item").length;
            var oItem = $(".passenger-item");
            var sHtml = "";
            for(var i = 0; i < iLength; i++){
                if($(oItem[i])){

                }
                var fname = $(oItem[i]).find(".pass-fname").find("input").val();
                var lname = $(oItem[i]).find(".pass-lname").find("input").val();
                sHtml += "<p>"+fname+" "+lname+"</p>";
            }

            $("div.passengers div.bottom").empty().append(sHtml);
        }
    }, 500);
});



//TEMPLATES

var sPassGeneration = `<div class="passenger-item">
                            <i class="fa fa-user-circle-o" aria-hidden="true"></i>

                            <div class="passenger-details">
                                <div class="pass-fname">
                                    <label>Name</label>
                                    <input type="text" name="origin" class="pass-fname-input" value="" autocomplete="off">
                                </div>

                                <div class="pass-lname">
                                    <label>Last Name</label>
                                    <input type="text" name="destination" class="pass-lname-input" value="" autocomplete="off">
                                </div>

                                <div class="pass-phone">
                                    <label >Phone Number</label>
                                    <input type="text" name="destination" class="pass-phone-input" value="" autocomplete="off">
                                </div>
                            </div>
                        </div>`;

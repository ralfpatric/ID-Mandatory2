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
        $(".result-item").removeClass("active");
        $(this).addClass("active");
    });

    $(".fa-arrow-down").click(function(){
        console.log("Customize me! (Later)");
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
});

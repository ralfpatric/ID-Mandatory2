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
    });

    $(document).on("click", ".modal-login-check", function(){
        var sName = $("#modal-name").val();
        var sPassword = $("#modal-password").val();
        login(sName, sPassword);
    });

    $(document).on("click", ".modal-registration", function(){
        var sName = $("#modal-name").val();
        var sPassword = $("#modal-password").val();
        createAccount(sName, sPassword);
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

    function createAccount(sName, sPassword){
        var jAccount = {};
        jAccount.name = sName ;
        jAccount.password = sPassword;

        var sjAccount = JSON.stringify(jAccount);
        localStorage.sjAccount = sjAccount;
        $("#modal-action").removeClass();
        $("#modal").addClass("modal-hidden").removeClass("modal-shown");
    }

    function login(sName, sPassword){
        var jAccount = {};
        jAccount.name = sName ;
        jAccount.password = sPassword;

        if(localStorage.sjAccount) {
            var jAccountFromLocal = JSON.parse(localStorage.sjAccount);
            if(jAccount.name == jAccountFromLocal.name && jAccount.password == jAccountFromLocal.password){
                console.log("Logged in successfully!");
                bLoggedIn = true;
                $("#modal-action").removeClass();
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
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("User Profile");
        $("#modal-action").addClass("hidden");
        $("#modal-form").addClass("hidden");
        $("#modal-profile-content").removeClass("hidden");
    }

    function showRegister(){
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("Registration");
        $("#modal-action").text("Register").addClass("modal-registration");
    }

    function showLogin(){
        $("#modal").removeClass("modal-hidden").addClass("modal-shown");
        $("#modal-title").text("Login");
        $("#modal-action").text("Login").addClass("modal-login-check");
    }

    setTimeout(function(){
        logout();
    }, 5000);
});

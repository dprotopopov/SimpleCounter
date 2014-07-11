
$(function() {
    var startupView = "View1";

    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    if (DevExpress.devices.real().platform === "win8") {
        $("body").css("background-color", "#000");
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.splashscreen.hide();
        document.addEventListener("backbutton", onBackButton, false);
    }

    function onBackButton() {
        DevExpress.hardwareBackButton.fire();
    }

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !SimpleCounter.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
        case "tizen":
            tizen.application.getCurrentApplication().exit();
            break;
        case "android":
            navigator.app.exitApp();
            break;
        case "win8":
            window.external.Notify("DevExpress.ExitApp");
            break;
        }
    }

    SimpleCounter.app = new DevExpress.framework.html.HtmlApplication({
        namespace: SimpleCounter,
        layoutSet: DevExpress.framework.html.layoutSets[SimpleCounter.config.layoutSet],
        navigation: SimpleCounter.config.navigation
    });

    $(window).unload(function() {
        SimpleCounter.app.saveState();
    });

    SimpleCounter.app.router.register(":view/:id", { view: startupView, id: undefined });
    SimpleCounter.app.navigatingBack.add(onNavigatingBack);
    SimpleCounter.app.navigate();

    SimpleCounter.app.viewShown.add(function(args) {
        var viewModel = args.viewInfo.model;
        if (typeof viewModel.viewShown != 'undefined') viewModel.viewShown();
    });
});
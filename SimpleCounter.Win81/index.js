
$(function() {
    var startupView = "View1";


    SimpleCounter.app = new DevExpress.framework.html.HtmlApplication({
        namespace: SimpleCounter,
        layoutSet: DevExpress.framework.html.layoutSets[SimpleCounter.config.layoutSet],
        navigation: SimpleCounter.config.navigation
    });

    $(window).unload(function() {
        SimpleCounter.app.saveState();
    });

    SimpleCounter.app.router.register(":view/:id", { view: startupView, id: undefined });
    SimpleCounter.app.navigate();
});
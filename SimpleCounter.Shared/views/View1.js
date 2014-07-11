(function(app) {

    app.View1 = function(params) {
        var viewModel = {
            //  Put the binding properties here
            value: 0,
            speed: 100,
            onClick: function() {
                this.update(++this.value);
                if (typeof navigator != 'undefined' && typeof navigator.notification != 'undefined' && typeof navigator.notification.vibrate != 'undefined') {
                    // Shake that device!
                    navigator.notification.vibrate(this.speed);
                } else {
                    // Not supported
                } 
            },
            viewWidth: ko.computed(function() { return $(window).width(); }),
            viewHeight: ko.computed(function() { return $(window).height(); }),
            itemWidth: ko.computed(function() { return ($(window).width() - 5 * 22) / 4; }),
            itemHeight: ko.computed(function() { return ($(window).height() - 2 * 22) / 1; }),
            fontSize: ko.observable("1em"),
            viewShown: function() {
                this.resize();
                this.update(this.value);
                window.setTimeout(function() {
                    $("#toastContainer1").dxToast('instance').show();
                }, 500);
                window.setTimeout(function() {
                    $("#toastContainer2").dxToast('instance').show();
                }, 4000);
            },
            onHold: function() {
                this.actionSheetVisible(true);
            },
            actionSheetVisible: ko.observable(false),
            actionSheetData: [
                { text: "Reset", clickAction: function() { viewModel.update(viewModel.value = 0); } },
                { text: "Undo", clickAction: function() { viewModel.update(viewModel.value ? (--viewModel.value) : (viewModel.value = 0)); } }
            ],
            // Animation of a single 
            scrollNumber: function($n1, $n2, value) {
                if ($n1.hasClass('show')) {
                    $n2.removeClass('hidden-down')
                        .css('top', '-100%')
                        .text(value)
                        .stop()
                        .animate({ top: 0 }, this.speed, function() {
                            $n2.addClass('show');
                        });
                    $n1.stop().animate({ top: "100%" }, this.speed, function() {
                        $n1.removeClass('show')
                            .addClass('hidden-down');
                    });
                } else {
                    $n1.removeClass('hidden-down')
                        .css('top', '-100%')
                        .text(value)
                        .stop()
                        .animate({ top: 0 }, this.speed, function() {
                            $n1.addClass('show');
                        });
                    $n2.stop().animate({ top: "100%" }, this.speed, function() {
                        $n2.removeClass('show')
                            .addClass('hidden-down');
                    });
                }
            },
            resize: function() {
                var $dummy = $(".dummy");
                var em = { width: parseInt($dummy.width()), height: parseInt($dummy.height()) };
                this.fontSize(Math.min(
                    parseInt(viewModel.itemWidth()) / em.width,
                    parseInt(viewModel.itemHeight()) / em.height
                ) + "em");
                $(".number").css("font-size", this.fontSize());
                $(".counter").css("height", this.fontSize());
                var $section = $('section');
                var diff = Math.max(this.viewHeight() - $section.height(), 0);
                var padding = Math.floor(diff / 2) + 'px';
                $section.css({ 'padding-top': padding, 'padding-bottom': padding });
            },
            // If changed update a part (day, hours, minutes, seconds) of counter
            update: function(value) {
                var cn = viewModel.getCounterNumbers(value);
                var $counter = $('.counter');
                ["units", "tens", "hundreds", "thousands"].forEach(function(item) {
                    if ($counter.find('.number.' + item + '.show').html() != cn[item]) {
                        var $n1 = $('.n1.' + item, $counter);
                        var $n2 = $('.n2.' + item, $counter);
                        viewModel.scrollNumber($n1, $n2, cn[item]);
                    }
                });
            },
            getCounterNumbers: function(value) {
                var result = {};
                ["units", "tens", "hundreds", "thousands"].forEach(function(item) {
                    result[item] = value % 10;
                    value = Math.floor(value / 10);
                });
                return result;
            },
        };

        return viewModel;
    };
})(SimpleCounter)
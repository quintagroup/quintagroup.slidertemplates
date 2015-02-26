$.fn.qgCarousel = function() {

    var base = $(this);

    $(".qg-carousel").css("display", "block");
    $(".qg-wrapper .qg-item:first-child").addClass("active");
    $("<div class=\"qg-buttons\"><div class=\"qg-prev\">prev</div><div class=\"qg-next\">next</div></div>").insertAfter(base.children(".qg-wrapper-outer"));

    var widthWrapperOuter = base.width();

    function widthCalculate() {
        var item = base.find(".qg-item");
        var itemNoActive = base.find(".qg-item:not(.active)");
        var itemActive = base.find(".qg-item.active");
        var itemBeforeActive = item.index(itemActive);

        if ($(window).width() >= 768) {
            var activeWidth = widthWrapperOuter * 0.6;
            var itemWidth = widthWrapperOuter * 0.2;
            var imageWidth = widthWrapperOuter * 0.375;
            var wrapperWidthDescktop = activeWidth * (item.length);
            item.css({
                'width': itemWidth
            });
            item.find(".item-visual").css({
                'height': imageWidth
            })
            itemActive.css({
                'width': activeWidth
            });
            var pixels = -(itemBeforeActive * (itemWidth));
            item.parent().css({
                'width': wrapperWidthDescktop
            });
            item.parent().css(doTransform(pixels));
            var imgItem = itemNoActive.find('.item-visual').width();
            item.find(".image-block").css({
                'width': imgItem,
                'height': imgItem
            });
            itemActive.find(".image-block").css({
                'width': imageWidth,
                'height': imageWidth
            });
        } else if ($(window).width() >= 480) {
            var wrapperWidthPhone = widthWrapperOuter * item.length;
            item.css({
                'width': widthWrapperOuter,
                'height': widthWrapperOuter * 3 / 2
            });
            var pixels = -(itemBeforeActive * widthWrapperOuter);
            item.parent().css({
                'width': wrapperWidthPhone + 100
            });
            item.parent().css(doTransform(pixels));
            item.find(".image-block").css({
                'width': widthWrapperOuter,
                'height': widthWrapperOuter
            });
        } else {
            var wrapperWidthPhone = widthWrapperOuter * item.length;
            item.css({
                'width': widthWrapperOuter,
                'height': widthWrapperOuter * 2
            });
            var pixels = -(itemBeforeActive * widthWrapperOuter);
            item.parent().css(doTransform(pixels));
            item.parent().css({
                'width': wrapperWidthPhone + 100
            });
            item.find(".image-block").css({
                'width': widthWrapperOuter,
                'height': widthWrapperOuter
            });
        };
    };

    function next() {
        var item = base.find(".qg-item");
        var itemNoActive = base.find(".qg-item:not(.active)");
        var itemActive = base.find(".qg-item.active");
        var imgItem = itemNoActive.find('.item-visual').width();

        if ($(window).width() >= 768) {
            var activeWidth = widthWrapperOuter * 0.6;
            var itemWidth = widthWrapperOuter * 0.2;
            var imageWidth = widthWrapperOuter * 0.375;

            if (itemActive.is(':last-child')) {
                itemActive.removeClass("active");
                item.first().addClass("active");
                var pixels = 0;
                base.find('.qg-wrapper').css(doTransform(pixels));
                base.find(".qg-item.active").css({
                    'width': activeWidth
                });
                base.find('.qg-item:not(.active) .image-block').css({
                    'width': imgItem,
                    'height': imgItem
                });
                base.find('.qg-item.active .image-block').css({
                    'width': imageWidth,
                    'height': imageWidth
                });
                setTimeout(function() {
                    base.find(".qg-item.active").nextAll().css({
                        'width': itemWidth
                    });
                }, 1000);
            } else {
                itemActive.next().css({
                    'width': activeWidth
                });
                itemActive.next().find('.itemBody').fadeIn();
                itemActive.css({
                    'width': itemWidth
                });
                var pixels = (-item.index(itemActive) - 1) * (itemWidth);
                item.parent().css(doTransform(pixels));
                itemActive.removeClass("active").next().addClass("active");
                base.find('.qg-item:not(.active) .image-block').css({
                    'width': imgItem,
                    'height': imgItem
                });
                base.find('.qg-item.active .image-block').css({
                    'width': imageWidth,
                    'height': imageWidth
                });
            };
        } else if ($(window).width() >= 480) {
            if (itemActive.is(':last-child')) {
                itemActive.removeClass("active");
                item.first().addClass("active");
                var pixels = 0;
                base.find('.qg-wrapper').css(doTransform(pixels));
            } else {
                itemActive.removeClass("active").next().addClass("active");
                var ind = base.find(itemActive).index() + 1;
                var pixels = -widthWrapperOuter * ind;
                base.find('.qg-wrapper').css(doTransform(pixels));
            };
        } else {
            if (itemActive.is(':last-child')) {
                itemActive.removeClass("active");
                item.first().addClass("active");
                var pixels = 0;
                base.find('.qg-wrapper').css(doTransform(pixels));
            } else {
                itemActive.removeClass("active").next().addClass("active");
                var ind = base.find(itemActive).index() + 1;
                var pixels = (-widthWrapperOuter) * ind;
                base.find('.qg-wrapper').css(doTransform(pixels));
            };
        }
    }

    function prev() {
        var item = base.find(".qg-item");
        var itemNoActive = base.find(".qg-item:not(.active)");
        var itemActive = base.find(".qg-item.active");
        var imgItem = itemNoActive.find('.item-visual').width();

        if ($(window).width() >= 768) {
            var activeWidth = widthWrapperOuter * 0.6;
            var itemWidth = widthWrapperOuter * 0.2;
            var imageWidth = widthWrapperOuter * 0.375;
            var wrapperWidthDescktop = (itemWidth) * (base.find(".qg-item").length + 2);

            if (base.find(".qg-item.active").is(':first-child')) {
                base.find(".qg-item.active").removeClass("active");
                base.find(".qg-item").last().addClass("active");
                base.find(".qg-item").last().css({
                    'width': activeWidth
                });
                base.find(".qg-item").first().css({
                    'width': itemWidth
                });
                var pixels = -wrapperWidthDescktop + activeWidth;
                base.find('.qg-wrapper').css(doTransform(pixels));
                base.find('.qg-item:not(.active) .image-block').css({
                    'width': imgItem,
                    'height': imgItem
                });
                base.find('.qg-item.active .image-block').css({
                    'width': imageWidth,
                    'height': imageWidth
                });
            } else {
                base.find(".qg-item.active").prev().css({
                    'width': activeWidth
                });
                base.find(".qg-item.active").css({
                    'width': itemWidth
                });
                base.find(".qg-item.active").removeClass("active").prev().addClass("active");
                var pixels = -base.find(".qg-item").index(base.find(".qg-item.active")) * (itemWidth);
                base.find('.qg-wrapper').css(doTransform(pixels));
                base.find('.qg-item:not(.active) .image-block').css({
                    'width': imgItem,
                    'height': imgItem
                });
                base.find('.qg-item.active .image-block').css({
                    'width': imageWidth,
                    'height': imageWidth
                });
            };
        } else if ($(window).width() >= 480) {
            var wrapperWidthPhone = widthWrapperOuter * (base.find(".qg-item").length);
            if (base.find(".qg-item.active").is(':first-child')) {
                base.find(".qg-item.active").removeClass("active");
                base.find(".qg-item").last().addClass("active");
                var pixels = -wrapperWidthPhone + widthWrapperOuter;
                base.find('.qg-wrapper').css(doTransform(pixels));
            } else {
                base.find(".qg-item.active").removeClass("active").prev().addClass("active");
                var pixels = -base.find(".qg-item").index(base.find(".qg-item.active")) * widthWrapperOuter;
                base.find('.qg-wrapper').css(doTransform(pixels));
            };
            base.find(".qg-item").css({
                'width': widthWrapperOuter
            });
        } else {
            var wrapperWidthPhone = (widthWrapperOuter) * (base.find(".qg-item").length);
            if (base.find(".qg-item.active").is(':first-child')) {
                base.find(".qg-item.active").removeClass("active");
                base.find(".qg-item").last().addClass("active");
                var pixels = -wrapperWidthPhone + (widthWrapperOuter);
                base.find('.qg-wrapper').css(doTransform(pixels));
            } else {
                base.find(".qg-item.active").removeClass("active").prev().addClass("active");
                var pixels = -base.find(".qg-item").index(base.find(".qg-item.active")) * (widthWrapperOuter);
                base.find('.qg-wrapper').css(doTransform(pixels));
            };
            base.find(".qg-item").css({
                'width': widthWrapperOuter
            });
        };
    }

    function touchEffect() {
        var is_down = false,
            x_origine = 0,
            y_origine = 0;
        var widthWrapperOuter = base.find(".qg-carousel").width();
        var itemWidthDescktop = widthWrapperOuter / 5;
        base.find(".qg-wrapper").on("touchstart", function(event) {
            x_origine = event.originalEvent.targetTouches[0].clientX;
            is_down = true;
            base.addClass("grabbing");
            $(window).on("touchmove", function(event) {
                var temp_x = event.originalEvent.changedTouches[0].clientX;
                var x_diff = temp_x - x_origine;
                if (x_diff > 5 || x_diff < -5) {
                    if (is_down) {
                        var tempPositionDesc = base.find(".qg-item.active").index() * (-base.find(".qg-item:not(active)").width() - 30);
                        var tempPositionPhone = base.find(".qg-item.active").index() * (-base.find(".qg-item:not(active)").width());
                        if ($(window).width() >= 768) {
                            var pixels = x_diff + tempPositionDesc;
                            base.find(".qg-wrapper").css({
                                '-webkit-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-moz-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-o-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-ms-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                'transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                "-webkit-transition": "all",
                                "-moz-transition": "all",
                                "transition": "all 0s"
                            });
                        } else {
                            var pixels = x_diff + tempPositionPhone;
                            base.find(".qg-wrapper").css({
                                '-webkit-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-moz-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-o-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                '-ms-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                'transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                                "-webkit-transition": "all",
                                "-moz-transition": "all",
                                "transition": "all 0s"
                            });
                        }
                        event.preventDefault();
                    }
                };
            });

            $(window).bind("touchend", function(event) {
                if (is_down) {
                    var temp_x = event.originalEvent.changedTouches[0].clientX;
                    is_down = false;
                    var wrapperWidth = base.find(".qg-wrapper-outer").width() / 10;
                    var itemWidth = base.find(".qg-wrapper-outer").width();
                    var tempPosition = base.find(".qg-item.active").index() * (-base.find(".qg-item:not(active)").width());
                    if (temp_x - x_origine < 0) {
                        if (-(temp_x - x_origine) < wrapperWidth) {
                            if ($(window).width() >= 768) {
                                base.find(".qg-wrapper").css({
                                    'left': tempPosition
                                });
                            } else {
                                var pixels = base.find(".qg-item.active").index() * (-base.find(".qg-item:not(active)").width());
                                base.find(".qg-wrapper").css(doTransform(pixels));
                            }
                        } else {
                            next();
                        };
                    } else {
                        if (temp_x - x_origine < wrapperWidth) {
                            if ($(window).width() >= 768) {
                                base.find(".qg-wrapper").css({
                                    'left': tempPosition
                                });
                            } else {
                                var pixels = base.find(".qg-item.active").index() * (-base.find(".qg-item:not(active)").width());
                                base.find(".qg-wrapper").css(doTransform(pixels));
                            }
                        } else {
                            prev();
                        }
                    }
                    base.removeClass("grabbing");
                }
            });
        });
    }

    function doTransform(pixels) {
        return {
            '-webkit-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
            '-moz-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
            '-o-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
            '-ms-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
            'transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
        }
    };

    base.find(".qg-next").click(function(event) {
        $(".qg-item").stop();
        next();
    });

    base.find(".qg-prev").click(function(event) {
        prev();
    });

    widthCalculate();
    touchEffect()

    $(window).resize(function() {
        widthCalculate();
    });
}

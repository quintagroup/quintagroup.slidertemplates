if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {

        init : function (options, el) {

            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);
            base.buildControls();
            base.onStartup();

        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.qgControls = $("<div class=\"qg-controls\"/>").toggleClass("clickable").appendTo(base.$elem);
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"qg-buttons ng-collection-buttons\"/>");
            base.qgControls.append(buttonsWrapper);
               
            base.buttonPrev = $("<button/>", {
                "class" : "qg-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<button/>", {
                "class" : "qg-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);
        },

        onStartup : function () {
            var base = this;
                nextButton = base.$elem.find(".qg-next");
                prevButton = base.$elem.find(".qg-prev");
            base.$elem.find(".qg-wrapper").css({"display":"block"});
            base.$elem.find(".qg-item:first-child").addClass("active");
            base.calculateWidth();
            base.response();
            base.touchEffect();
            nextButton.click(function(event) {
                base.next();
            });
            prevButton.click(function(event) {
                base.prev();
            });
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.calculateWidth();
                    });
                }
            };
            $(window).resize(base.resizer);
        },

        calculateWidth : function () {
            var base = this,
                item = base.$elem.find(".qg-item"),
                itemActive = base.$elem.find(".qg-item.active"),
                widthWrapperOuter = base.$elem.width(),
                itemBeforeActive = item.index(itemActive);
            
            if ($(window).width() >= 768) {
                var activeWidth = widthWrapperOuter * 0.6,
                    itemWidth = widthWrapperOuter * 0.2,
                    imageWidth = widthWrapperOuter * 0.375,
                    wrapperWidthDescktop = activeWidth * (item.length);
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
                item.parent().css(base.doTransform(pixels));
                item.find(".image-block").css({
                    'width': itemWidth-30,
                    'height': itemWidth-30
                    });
                itemActive.find(".image-block").css({
                    'width': imageWidth,
                    'height': imageWidth
                    });
            } else if ($(window).width() >= 480) {
                var wrapperWidthPhone = widthWrapperOuter * item.length;
                item.css({
                    'width': widthWrapperOuter
                    });
                var pixels = -(itemBeforeActive * widthWrapperOuter);
                item.parent().css({
                    'width': wrapperWidthPhone + 100
                    });
                item.parent().css(base.doTransform(pixels));
                item.find(".image-block").css({
                    'width':widthWrapperOuter*2/3,
                    'height':widthWrapperOuter*2/3
                    });
                item.find(".item-visual").css({
                    'height':widthWrapperOuter*2/3
                    });
            } else {
                var wrapperWidthPhone = widthWrapperOuter * item.length;
                item.css({
                    'width': widthWrapperOuter,
                    });
                var pixels = -(itemBeforeActive * widthWrapperOuter);
                item.parent().css(base.doTransform(pixels));
                item.parent().css({
                    'width': wrapperWidthPhone + 100
                    });
                item.find(".image-block").css({
                    'width': widthWrapperOuter,
                    'height': widthWrapperOuter
                    });
                var pixels = -(itemBeforeActive*(widthWrapperOuter+15));
                item.find(".item-visual").css({'height':'auto'})
            };
        },

        next : function () {
            var base = this,
                widthWrapperOuter = base.$elem.width(),
                item = base.$elem.find(".qg-item"),
                itemActive = base.$elem.find(".qg-item.active"),
                itemNoActive = base.$elem.find(".qg-item:not(.active)"),
                imgItem = itemNoActive.find('.item-visual').width();

            if ($(window).width() >= 768) {
                var activeWidth = widthWrapperOuter * 0.6;
                var itemWidth = widthWrapperOuter * 0.2;
                var imageWidth = widthWrapperOuter * 0.375;

                if (itemActive.is(':last-child')) {
                    itemActive.removeClass("active");
                    item.first().addClass("active");
                    var pixels = 0;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                    base.$elem.find(".qg-item.active").css({
                        'width': activeWidth
                        });
                    base.$elem.find('.qg-item:not(.active) .image-block').css({
                        'width': imgItem,
                        'height': imgItem
                        });
                    base.$elem.find('.qg-item.active .image-block').css({
                        'width': imageWidth,
                        'height': imageWidth
                        });
                    setTimeout(function() {
                        base.$elem.find(".qg-item.active").nextAll().css({
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
                    item.parent().css(base.doTransform(pixels));
                    itemActive.removeClass("active").next().addClass("active");
                    base.$elem.find('.qg-item:not(.active) .image-block').css({
                        'width': imgItem,
                        'height': imgItem
                    });
                    base.$elem.find('.qg-item.active .image-block').css({
                        'width': imageWidth,
                        'height': imageWidth
                    });
                };
            } else if ($(window).width() >= 480) {
                if (itemActive.is(':last-child')) {
                    itemActive.removeClass("active");
                    item.first().addClass("active");
                    var pixels = 0;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                } else {
                    itemActive.removeClass("active").next().addClass("active");
                    var ind = base.$elem.find(itemActive).index() + 1;
                    var pixels = -widthWrapperOuter * ind;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                };
            } else {
                if (itemActive.is(':last-child')) {
                    itemActive.removeClass("active");
                    item.first().addClass("active");
                    var pixels = 0;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                } else {
                    itemActive.removeClass("active").next().addClass("active");
                    var ind = base.$elem.find(itemActive).index() + 1;
                    var pixels = (-widthWrapperOuter) * ind;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                };
            }
        },

        prev : function () {
            var base = this,
                widthWrapperOuter = base.$elem.width(),
                item = base.$elem.find(".qg-item"),
                itemNoActive = base.$elem.find(".qg-item:not(.active)"),
                itemActive = base.$elem.find(".qg-item.active"),
                imgItem = itemNoActive.find('.item-visual').width();

            if ($(window).width() >= 768) {
                var activeWidth = widthWrapperOuter * 0.6,
                    itemWidth = widthWrapperOuter * 0.2,
                    imageWidth = widthWrapperOuter * 0.375,
                    wrapperWidthDescktop = (itemWidth) * (base.$elem.find(".qg-item").length + 2);

                if (base.$elem.find(".qg-item.active").is(':first-child')) {
                    base.$elem.find(".qg-item.active").removeClass("active");
                    base.$elem.find(".qg-item").last().addClass("active");
                    base.$elem.find(".qg-item").last().css({
                        'width': activeWidth
                        });
                    base.$elem.find(".qg-item").first().css({
                        'width': itemWidth
                        });
                    var pixels = -wrapperWidthDescktop + activeWidth;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                    base.$elem.find('.qg-item:not(.active) .image-block').css({
                        'width': imgItem,
                        'height': imgItem
                        });
                    base.$elem.find('.qg-item.active .image-block').css({
                        'width': imageWidth,
                        'height': imageWidth
                        });
                } else {
                    base.$elem.find(".qg-item.active").prev().css({
                        'width': activeWidth
                        });
                    base.$elem.find(".qg-item.active").css({
                        'width': itemWidth
                        });
                    base.$elem.find(".qg-item.active").removeClass("active").prev().addClass("active");
                    var pixels = -base.$elem.find(".qg-item").index(base.$elem.find(".qg-item.active")) * (itemWidth);
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                    base.$elem.find('.qg-item:not(.active) .image-block').css({
                        'width': imgItem,
                        'height': imgItem
                        });
                    base.$elem.find('.qg-item.active .image-block').css({
                        'width': imageWidth,
                        'height': imageWidth
                    });
                };
            } else if ($(window).width() >= 480) {
                var wrapperWidthPhone = widthWrapperOuter * (base.$elem.find(".qg-item").length);
                if (base.$elem.find(".qg-item.active").is(':first-child')) {
                    base.$elem.find(".qg-item.active").removeClass("active");
                    base.$elem.find(".qg-item").last().addClass("active");
                    var pixels = -wrapperWidthPhone + widthWrapperOuter;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                } else {
                    base.$elem.find(".qg-item.active").removeClass("active").prev().addClass("active");
                    var pixels = -base.$elem.find(".qg-item").index(base.$elem.find(".qg-item.active")) * widthWrapperOuter;
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                };
                base.$elem.find(".qg-item").css({
                    'width': widthWrapperOuter
                    });
            } else {
                var wrapperWidthPhone = (widthWrapperOuter) * (base.$elem.find(".qg-item").length);
                if (base.$elem.find(".qg-item.active").is(':first-child')) {
                    base.$elem.find(".qg-item.active").removeClass("active");
                    base.$elem.find(".qg-item").last().addClass("active");
                    var pixels = -wrapperWidthPhone + (widthWrapperOuter);
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                } else {
                    base.$elem.find(".qg-item.active").removeClass("active").prev().addClass("active");
                    var pixels = -base.$elem.find(".qg-item").index(base.$elem.find(".qg-item.active")) * (widthWrapperOuter);
                    base.$elem.find('.qg-wrapper').css(base.doTransform(pixels));
                };
                base.$elem.find(".qg-item").css({
                    'width': widthWrapperOuter
                });
            };
        },

        touchEffect : function () {
            var base = this,
                is_down = false,
                x_origine = 0,
                y_origine = 0;
                var widthWrapperOuter = base.$elem.find(".qg-carousel").width();
                var itemWidthDescktop = widthWrapperOuter / 5;
            base.$elem.find(".qg-wrapper").on("touchstart", function(event) {
                x_origine = event.originalEvent.targetTouches[0].clientX;
                is_down = true;
                base.$elem.addClass("grabbing");

                console.log('widthWrapperOuter ' + widthWrapperOuter);
                console.log('' + itemWidthDescktop);

                $(window).on("touchmove", function(event) {
                    var temp_x = event.originalEvent.changedTouches[0].clientX;
                    var x_diff = temp_x - x_origine;
                    if (x_diff > 5 || x_diff < -5) {
                        if (is_down) {
                            var tempPositionDesc = base.$elem.find(".qg-item.active").index() * (-base.$elem.find(".qg-item:not(active)").width() - 30);
                            var tempPositionPhone = base.$elem.find(".qg-item.active").index() * (-base.$elem.find(".qg-item:not(active)").width());
                            if ($(window).width() >= 768) {
                                var pixels = x_diff + tempPositionDesc;
                                base.$elem.find(".qg-wrapper").css({
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
                                base.$elem.find(".qg-wrapper").css({
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
                        var item = base.$elem.find(".qg-item"),
                            notActiveItem = base.$elem.find(".qg-item:not(active)"),
                            wrapper = base.$elem.find(".qg-wrapper-outer"),
                            wrapperWidth = wrapper.width() / 10,
                            itemWidth = wrapper.width(),
                            tempPosition = item.index(item.hasClass(".active")) * (-notActiveItem.width());
                        

                        console.log(wrapperWidth)
                        console.log(itemWidth)
                        console.log(tempPosition)
                        console.log(temp_x)

                        if (temp_x - x_origine < 0) {
                            if (-(temp_x - x_origine) < wrapperWidth) {
                                if ($(window).width() >= 768) {
                                    base.$elem.find(".qg-wrapper").css({
                                        'left': tempPosition
                                    });
                                } else {
                                    var pixels = base.$elem.find(".qg-item.active").index() * (-base.$elem.find(".qg-item:not(active)").width());
                                    base.$elem.find(".qg-wrapper").css(base.doTransform(pixels));
                                }
                            } else {
                                base.next();
                            };
                        } else {
                            if (temp_x - x_origine < wrapperWidth) {
                                if ($(window).width() >= 768) {
                                    base.$elem.find(".qg-wrapper").css({
                                        'left': tempPosition
                                    });
                                } else {
                                    var pixels = base.$elem.find(".qg-item.active").index() * (-base.$elem.find(".qg-item:not(active)").width());
                                    base.$elem.find(".qg-wrapper").css(base.doTransform(pixels));
                                }
                            } else {
                                base.prev();
                            }
                        }
                        base.$elem.removeClass("grabbing");
                    }
                });
            });
        },

        doTransform :function  (pixels) {
            return {
                '-webkit-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                '-moz-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                '-o-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                '-ms-transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
                'transform': 'translate3d(' + pixels + 'px, 0px, 0px)',
            }
        },
    };

    $.fn.qgCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "qgCarousel", carousel);
        });
    };

}(jQuery, window, document));
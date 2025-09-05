var cPartnerzy = {
    elementInViewport: function (el) {
        var offset = el.offset();
        var top = offset.top;
        var left = offset.left;
        var width = offset.left + el.width();
        var height = offset.top + el.height();

        return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
                );
    },
    init: function () {
        jQuery(window).bind('scroll', function (e) {
            jQuery('ul.logaspn li:not(.loaded) img').each(function () {
                var el = jQuery(this);
                if (cPartnerzy.elementInViewport(el)) {
                    var pic = new Image();
                    pic.onload = function(){
                        el.css({'background-image': 'url(' + el.attr('data-image') + ')'}).closest('li').addClass('loaded');
                    };
                    pic.src = el.attr('data-image');
                }
            });
        }).trigger('scroll');
        return this;
    }
};
var cMain = {
    last_social_container: 0,
    przetworzSzablon: function (html, parametry) {
        var txt = html;
        for (var x in parametry) {
            var re = new RegExp('{{' + x + '}}', 'g');
            txt = txt.replace(re, parametry[x]);
        }
        return txt;
    },
    toggleLiveLista: function (id) {
        var divek = jQuery('#' + id);
        if (divek.css('display') == 'none') {
            divek.show();
            jQuery('#h3-' + id).removeClass('zwiniety');
        } else {
            divek.hide();
            jQuery('#h3-' + id).addClass('zwiniety');
        }
    },
    initClock: function () {
        var zegar = jQuery('div.zegarspeedway');
        if (zegar.length > 0) {
            var data_do = new Date(zegar.attr('data-data'));
            var data_server = new Date(zegar.attr('data-server'));
            var data_od = new Date();
            var roznica = data_od - data_server;
            setInterval(function () {
                var data_od = new Date() - roznica;
                var s = (data_do - data_od) / 1000;
                if (s < 0) {
                    s = 0;
                }
                var days = Math.floor(s / (3600 * 24));
                s = s - days * 3600 * 24;
                var hours = Math.floor(s / 3600);
                s = s - hours * 3600;
                var min = Math.floor(s / 60);
                s = s - min * 60;
                var sek = Math.floor(s);
                jQuery('.d', zegar).text(days);
                jQuery('.h', zegar).text(String("00" + hours).slice(-2));
                jQuery('.m', zegar).text(String("00" + min).slice(-2));
                jQuery('.s', zegar).text(String("00" + sek).slice(-2));
            }, 500)
        }
        return this;
    },
    inicjuj_girls_menu: function () {
        $(function () {
            if ($('#sec-girls-menu').length > 0) {
                // grab the initial top offset of the navigation 
                var sticky_navigation_offset_top = $('#sec-girls-menu').offset().top;

                // our function that decides weather the navigation bar should have "fixed" css position or not.
                var sticky_navigation = function () {
                    var scroll_top = $(window).scrollTop(); // our current vertical position from the top

                    // if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
                    if (scroll_top > sticky_navigation_offset_top) {
                        $('#sec-girls-menu').css({'position': 'fixed', 'top': 0, 'left': 50});
                    } else {
                        $('#sec-girls-menu').css({'position': 'relative', 'left': 0});
                    }
                };

                // run our function on load
                sticky_navigation();

                // and run it again every time you scroll
                $(window).scroll(function () {
                    sticky_navigation();
                });

                // NOT required:
                // for this demo disable all links that point to "#"
                /*$('a[href="#"]').click(function(event){ 
                 event.preventDefault(); 
                 });*/
            }
        });
        return this;
    },
    body_hider: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        jQuery('body').bind('click', function () {
            jQuery('#results-sezony-drop, #events-sezony-drop, #tickets-drop-events').css({
                'display': 'none'
            });
            jQuery('.stats-filter .visible').removeClass('visible');
            jQuery(this).unbind('click');
        });
        return this;
    },
    inicjuj_wyniki_eventy_toggle: function () {
        jQuery('.results-drop').click(function (e) {
            jQuery('#results-sezony-drop').toggle();
            cMain.body_hider(e);
        });
        jQuery('.events-drop').click(function (e) {
            jQuery('#events-sezony-drop').toggle();
            cMain.body_hider(e);
        });
        jQuery('.tickets-drop').click(function (e) {
            jQuery('#tickets-drop-events').toggle();
            cMain.body_hider(e);
        });
        return this;
    },
    schowaj_numerki: function () {
        jQuery(document).ready(function () {
            jQuery('.sezon-2013-hide').hide();
        });
    },
    pokazEventy: function (id_sezonu) {
        jQuery('#events-sezony-drop').hide();
        jQuery('#tickets-drop-events').hide();
        jQuery('.events-cont').hide();
        jQuery('.sezon-events-' + id_sezonu).show();
        var nazwa = jQuery('.events-drop-sezon-div-' + id_sezonu).attr('nazwa-sezonu');
        jQuery('#events-drop-sezon').text(nazwa);
        jQuery('#results-drop-sezon').text(nazwa);
    },
    pokazRundeWSezonie: function (numer_rundy) {
        jQuery('.results-div').hide();
        jQuery('.runda-' + numer_rundy).show();
        jQuery('#results-sezony-drop').hide();
        jQuery('.results-cont').show();
        jQuery('#klasyfikacja-sezonu .podium').hide();
    },
    pokazKlasyfikacjeSezonu: function () {
        var shash = window.location.hash.substring(1);
        if (shash.substr(0, 5) == 'runda') {
            var liczba = shash.substr(5, 1);
            var runda = parseInt(liczba);
            //alert(runda);
            cMain.pokazRundeWSezonie(runda);
        } else {
            jQuery('.results-div').hide();
            jQuery('.results-klasyfikacja-div').show();
            jQuery('#results-sezony-drop').hide();
            jQuery('.results-cont').show();
            jQuery('#klasyfikacja-sezonu .podium').show();
        }
    },
    inicjuj_zawodnik_bio_toggle: function () {
        jQuery('.riders-drop').click(function () {
            jQuery('#sezony-drop').toggle();
        });
        jQuery('.bio-toggle').click(function () {
            var rid = jQuery(this).attr("data-rider-id");
            var sezon = jQuery(this).attr("data-sezon-nazwa");
            var idik = sezon + '-' + rid;
            //jQuery('#zawodnik-bio-'+idik).toggle();
            if (jQuery('#zawodnik-bio-' + idik).css('display') == 'none') {
                jQuery('#zawodnik-bio-' + idik).show();
                jQuery(this).addClass("bio_rozwiniety");
            } else {
                jQuery('#zawodnik-bio-' + idik).hide();
                jQuery(this).removeClass("bio_rozwiniety");
            }
        });
        return this;
    },
    resize_Kwadratow: function () {
        if (jQuery(window).width() < 1200) {
            jQuery('.galerie_box').css("height",
                    (parseInt(jQuery('.galerie_box').width()) / 2) + 'px');
            jQuery('.data_tekst_div').css("margin-top",
                    (parseInt(jQuery('.galerie_box').width()) / 4) + 'px');
            jQuery('#album div.foto > a').css("height",
                    (parseInt(jQuery('#album div.foto > a').width())) + 'px');
            jQuery('#baner_bilety').css("height",
                    (parseInt(jQuery('#baner_bilety').width()) * 1.11) + 'px');
            if (jQuery(window).width() < 768) {
                jQuery('#galeria > a').css("height",
                        (parseInt(jQuery('#galeria > a').width()) / 2) + 'px');
            } else {
                jQuery('#galeria > a').css("height",
                        (parseInt(jQuery('#galeria > a img').width())) + 'px');
            }
        } else {
            jQuery('.galerie_box').css("height", "295px");
            jQuery('.data_tekst_div').css("margin-top", "160px");
            //jQuery('#album div.foto > a').css("height", "170px");
            jQuery('#baner_bilety').css("height", "300px");
            jQuery('#galeria > a').css("height", "300px");
        }
    },
    pokazKwadraty: function () {
        // galerie box - resize
        $(window).resize(function () {
            cMain.resize_Kwadratow();
        });
        this.resize_Kwadratow();
        return this;
    },
    pokazRiders: function (sezon_nazwa) {
        $('.sezony-wybor-lista').each(function () {
            var nazwa_iter = $(this).attr("data-nazwa-sezonu");
            if (nazwa_iter == sezon_nazwa) {
                $('#riders-box-' + nazwa_iter).show();
                $('#sezony-drop').hide();
                $('#riders-drop-sezon').text(sezon_nazwa);
            } else {
                $('#riders-box-' + nazwa_iter).hide();
            }
        });
    },
    pokazResultsRok: function (sezon_nazwa) {
        $('.sezony-wybor-lista').each(function () {
            var nazwa_iter = $(this).attr("data-nazwa-sezonu");
            if (nazwa_iter == sezon_nazwa) {
                $('#results-box-' + nazwa_iter).show();
                $('#resuls-sezony-drop').hide();
                $('#results-drop-sezon').text(sezon_nazwa);
            } else {
                $('#results-box-' + nazwa_iter).hide();
            }
        });
    },
    pokazStatek: function (nr) {
        for (var i = 1; i <= 3; i++) {
            if (i != nr) {
                jQuery('#header-statowy-' + i).removeClass("active");
                jQuery('#box-zawodnikow-' + i).hide();
            } else {
                jQuery('#header-statowy-' + i).addClass("active");
                jQuery('#box-zawodnikow-' + i).show();
            }
        }
        return this;
    },
    inicjuj_menu_mobi: function () {
        $('.menuMobiActive').click(function () {
            if ($('#mobi_menu').css('display') == 'none') {
                $('#mobi_menu').show();
                $('header > nav').addClass('mobiActive');
            } else {
                $('#mobi_menu').hide();
                $('header > nav').removeClass('mobiActive');
            }
        });
        jQuery('header nav > ul > li:first-child > button').bind('click', function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            var div = jQuery('#change_to_strip');
            if (div.hasClass('expanded')) {
                div.removeClass('expanded');
            } else {
                div.addClass('expanded');
            }
            return false;
        });
        return this;
    },
    inicjuj_wyszukiwarka: function () {
        jQuery('.searchActive').click(function () {
            if (jQuery('section#search').css('display') == 'none') {
                jQuery('section#search').show();
                jQuery('section#search input[type="text"]').click(function () {
                    if (jQuery(this).val() == 'Wpisz szukaną frazę…') {
                        jQuery(this).val('');
                    }
                });
            } else {
                jQuery('section#search input[type="text"]').val('Wpisz szukaną frazę…');
                jQuery('section#search').css('display', 'none');
            }
            return false;
        });
        return this;
    },
    inicjuj_newsletter: function () {
        return this;
    },
    inicjuj_splitTable: function () {
        var isChrome = /Chrome/.test(navigator.userAgent);
        jQuery(window).bind('resize', function () {
            jQuery('.splitTable').each(function () {
                var that = jQuery(this);
                var parent = that.parent();
                if (that.width() > parent.outerWidth()) {
                    var after_column_no = that.attr('data-split-after');
                    var width = 0;
                    var columns = jQuery('thead:first-of-type > tr:first-child > th', that);
                    if (columns.length == 0) {
                        var columns = jQuery('tr:first-of-type > th', that);
                    }
                    var x = 0;
                    columns.each(function () {
                        var col = jQuery(this);
                        width += col.outerWidth();
                        if (false) {
                            width -= 2;
                        }
                        x++;
                        if (x == after_column_no) {
                            return false;
                        }
                    });
                    var big_table = jQuery('<table />').attr('class', that.attr('class')).html(that.html()).removeClass('splitTable');
                    var left_table = jQuery('<table />').attr('class', that.attr('class')).html(that.html()).removeClass('splitTable');
                    var right_table = jQuery('<table />').attr('class', that.attr('class')).html(that.html()).removeClass('splitTable');
                    var left_container = jQuery('<div />').append(jQuery('<div />').append(left_table).css({
                        'width': width + 'px',
                    }));
                    var right_container = jQuery('<div />').append(right_table).css({
                        'overflow-x': 'hidden',
                        'cursor': 'ew-resize'
                    });
                    var containerfull = jQuery('<div />', {'class': 'splitTableContainerFull'}).append(big_table).append(right_container).prop('fullWidth', that.width());
                    var container = jQuery('<div />', {'class': 'splitTableContainer'}).append(left_container).append(right_container);
                    var containerall = jQuery('<div />', {'class': 'splitTableAll'}).append(containerfull).append(container);
                    containerall.insertBefore(that);
                    right_container.mCustomScrollbar({
                        'theme': 'red',
                        'axis': 'x'
                    });
                    jQuery('[data-toggle="tooltip"]', container).tooltip({
                        container: 'body'
                    });
                    that.remove();
                }
            });
            jQuery('.splitTableAll').each(function () {
                var that = jQuery(this);
                var full = jQuery('.splitTableContainerFull', that);
                var split = jQuery('.splitTableContainer', that);
                if(that.width() >= full.prop('fullWidth')){
                    full.css('display', 'block');
                    split.css('display', 'none');
                } else {
                    full.css('display', 'none');
                    split.css('display', 'block');
                }
            });
        })
        setTimeout(function(){
            jQuery(window).trigger('resize');
        }, 200);
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            jQuery(window).trigger('resize');
        });
        //alert(isChrome);
        return this;
    },
    inicjuj_menu: function () {
        var header = jQuery('body > header');
        var nav = jQuery('> nav', header);
        var div = jQuery('<div />', {'class': 'navPlaceHolder'});
        div.css('height', nav.height()+'px');
        div.insertAfter(nav);
        jQuery(window).bind('scroll', function () {
            var originalTop = div.position().top;
            var top = jQuery(this).scrollTop();
            if (top >= originalTop) {
                header.addClass('movetop');
            } else {
                header.removeClass('movetop');
            }
            var fi = $(window).scrollTop()/10 % Math.PI;
            jQuery('#buyticket i').css({ transform: 'rotate(' + fi + 'rad)' });
        });
        return this;
    },
    inicjuj_dropdown: function () {
        jQuery('[data-dropdownmenu_activator="1"]').each(function () {
            var button = jQuery(this);
            button.prop('otwarty', false).bind('click', function (e) {
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                var button = jQuery(this);
                var dropdown = jQuery(button.attr('data-dropdownmenu'));
                var ul = jQuery('> ul', dropdown);
                if (this.otwarty) {
                    ul.css('display', 'none');
                    this.otwarty = false;
                } else {
                    jQuery(document).trigger('click');
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    this.otwarty = true;
                    ul.css('display', 'block');
                    if (button.attr('data-dropdownmenu_bind') == '1') {
                        var pos = button.position();
                        var left = (pos.left + button.outerWidth());
                        if ((left - ul.outerWidth()) < 0) {
                            left = ul.outerWidth();
                        }
                        ul.parent().css({
                            'left': left + 'px'
                        });
                    }
                }
                return false;
            });
        });
        jQuery(document).bind('click', function (e) {
            jQuery('.dropdownmenu > ul').css('display', 'none')
            jQuery('[data-dropdownmenu_activator="1"]').prop('otwarty', false);
        });
        return this;
    },
    inicjuj_galerie_video_glowna: function () {
        if (jQuery('div#main-video-gallery').length) {

            jQuery('div#main-video-gallery div.box, div#main-gallery div.box').mouseenter(function (e) {
                jQuery(this).delay(200).queue(function () {
                    jQuery(this).addClass('zoom');
                    jQuery(this).children('a').children('span').fadeIn(300);

                });
            }).mouseleave(function (e) {
                jQuery(this).clearQueue();
                jQuery(this).removeClass('zoom');
                jQuery(this).children('a').children('span').fadeOut(300);

            });
        }
        return this;
    },
    inicjuj_slider_glowna: function () {
        var mainSlider = jQuery('.main-slider').bxSlider({
            slideWidth: 1200,
            minSlides: 1,
            maxSlides: 1,
            slideMargin: 0,
            onSliderLoad: function () {
                jQuery('.main-slider>li:not(.bx-clone)').eq(0).addClass('active-slide');
                jQuery('ul.main-slider li.active-slide span.main-slider-text').show(300);
            },
            onSlideAfter: function (jQueryslideElement, oldIndex, newIndex) {
                jQuery('.main-slider li').removeClass('active-slide');
                jQuery(jQueryslideElement).addClass('active-slide');
                jQuery('ul.main-slider li span.main-slider-text').hide();
                jQuery('ul.main-slider li.active-slide span.main-slider-text').show(300);
            }
        });

        jQuery('.bx-wrapper').css({'width': '100%'});
        jQuery('.bx-wrapper').css({'max-width': 'none'});
        return this;
    },
    inicjuj_taby: function (element) {
        jQuery('.tabbed', jQuery(element)).tabsRWD();
        return this;
    },
    inicjuj_fancybox: function () {
        jQuery(".fancybox").fancybox();
        return this;
    },
    inicjuj_sondy: function () {
        jQuery('.sonda .chartwell.pies').each(function () {
            var chart = new Chart(this);
            chart.draw();
        });
        return this;
    },
    inicjuj_girls: function () {
        var map = jQuery('map[name="girls-map"]');
        var section = jQuery('section#sec-girls');
        if (section.length > 0) {
            var girlname = jQuery('<span />', {'class': 'girlname'}).appendTo(section);

            jQuery('area', map).bind('mouseenter', function () {
                var that = jQuery(this);
                section.addClass(that.attr('data-class'));
                girlname.addClass(that.attr('data-class')).text(that.attr('data-name'));

            }).bind('mouseleave', function () {
                var that = jQuery(this);
                section.removeClass(that.attr('data-class'));
                girlname.removeClass(that.attr('data-class'));
            });
        }
        return this;
    },
    last_id_twitter: 0,
    last_id_insta: 0,
    social: function () {
        var main = this;
        var kontener = jQuery('#social_media >div:first-child >div');
        if (kontener.prop('pokazujdalej')) {
            kontener.prop('pokazujdalej', false);
            jQuery.ajax({
                url: '/social',
                type: 'post',
                data: {'last_id_twitter': main.last_id_twitter, 'last_id_insta': main.last_id_insta},
                dataType: 'json',
                success: function (html) {
                    jQuery.each(html.tweety, function (idx, element) {
                        jQuery('>div:nth-child(' + (main.last_social_container + 1) + ')', kontener).append(element.html);
                        main.last_social_container = (main.last_social_container + 1) % 3;
                    });
                    main.last_id_insta = html.last_id_insta;
                    main.last_id_twitter = html.last_id_twitter;
                    kontener.prop('pokazujdalej', true);
                }
            });
        }
        return this;
    },
    inicjujSocial: function () {
        var main = this;
        var kontener = jQuery('#social_media >div:first-child >div').prop('pokazujdalej', true);
        this.social();
        jQuery('#social_media >div:first-child').scroll(function () {
            var that = jQuery(this);
            var ile = jQuery('>div', that).width() - that.scrollLeft() - that.width();
            if (ile < 40) {
                main.social();
            }
        });
        jQuery('#social_media >button:first-of-type').prop('dirorder', 0);
        jQuery('#social_media >button:last-of-type').prop('dirorder', 1);
        jQuery('#social_media >button').bind('click', function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            var that = jQuery(this);
            var social = jQuery('#social_media >div:first-child');
            var unit_width = jQuery('>div >div >div', social).outerWidth(true);
            var dest_width = social.scrollLeft();
            if (that.prop('dirorder') == 0) {
                if (dest_width <= unit_width) {
                    dest_width = 0;
                } else {
                    dest_width -= unit_width;
                }
            } else {
                var cur_width = jQuery('>div', social).width() - that.width();
                if (dest_width >= cur_width) {
                    dest_width = cur_width;
                } else {
                    dest_width += unit_width;
                }
            }
            social.animate({
                'scrollLeft': dest_width
            }, 200, function () {
                social.trigger('scroll');
            });
            return false;
        });
        return this;
    },
    inicjuj_zawodnikow_stat: function () {
        var staty = jQuery('#new-stats-bar');
        if (staty.length > 0) {
            var divabso = jQuery('.topstats > div', staty);
            var count = jQuery('>div', divabso).length;
            var oile = 281;
            var width = count * oile;
            divabso.css('width', width + 'px');
            if (width > staty.width()) {
                staty.addClass('scrollable');
            }
            var semafor = false;
            jQuery('>.prev', staty).bind('click', function () {
                if (!semafor) {
                    var pos = divabso.position();
                    if (pos.left < 0) {
                        semafor = true;
                        divabso.animate({'left': (pos.left + oile) + 'px'}, 200, function () {
                            semafor = false
                        });
                    }
                }
            });
            jQuery('>.next', staty).bind('click', function () {
                if (!semafor) {
                    var pos = divabso.position();
                    var width = pos.left + divabso.width();

                    if (width > divabso.parent().width()) {
                        semafor = true;
                        divabso.animate({'left': (pos.left - oile) + 'px'}, 200, function () {
                            semafor = false
                        });
                    }
                }
            });
        }
        return this;
    },
    inicjuj: function () {
        this.inicjuj_wyszukiwarka()
                .inicjuj_slider_glowna()
                .inicjuj_newsletter()
                .inicjuj_menu()
                .inicjuj_menu_mobi()
                .inicjuj_dropdown()
                .inicjuj_wyniki_eventy_toggle()
                .inicjuj_zawodnik_bio_toggle()
                .inicjuj_galerie_video_glowna()
                .inicjuj_taby('body')
                .inicjuj_fancybox()
                .AJAX_for_anchors('body')
                .inicjuj_sondy()
                .inicjuj_girls()
                .inicjuj_girls_menu()
                .inicjuj_zawodnikow_stat()
                .inicjuj_splitTable()
                .initClock()
                .inicjujSocial();
        return this;
    },
    AJAX_open_curtain: function (el) {
        var curtain = jQuery('#ajax_curtain');
        if (curtain.length == 0) {
            curtain = jQuery('<div />', {id: 'ajax_curtain'}).appendTo('body');
        }
        curtain.css({
            top: el.position.top + 'px',
            left: el.position.left + 'px',
            width: el.width() + 'px',
            height: el.height() + 'px',
        });
        return this;
    },
    AJAX_close_curtain: function () {
        jQuery('#ajax_curtain').remove();
        return this;
    },
    AJAX_for_anchors: function (el) {
        var element = jQuery(el);
        jQuery('a[data-ajax="1"]', element).each(function () {
            var a = jQuery(this);
            a.bind('click', function (e) {
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                var a = jQuery(this);
                var doc = jQuery('body');
                if (a.attr('data-element')) {
                    doc = jQuery(a.attr('data-element'));
                }
                cMain.AJAX_open_curtain(doc);
                jQuery.ajax({
                    'url': a.attr('href'),
                    'dataType': 'json',
                    'success': function (json) {
                        document.title = json.title;
                        if (history && history.pushState) {
                            history.pushState({"content": json.content, 'beforeEnd': json.beforeEnd, "pageTitle": json.title}, json.title, a.attr('href'));
                        }
                        doc.html(json.content + json.beforeEnd);
                        cMain.AJAX_for_anchors(doc);
                        cMain.AJAX_close_curtain();
                    }
                });
                return false;
            });
        });
        return this;
    }
};

function str_replace(string, search, replace) {
    return string.split(search).join(replace);
}
jQuery.fn.tabsRWD = function (options) {
    var checkSize = function () {
        jQuery('.ui-tabbed-rwd').each(function () {
            var tabsElement = jQuery(this);
            var liWidth = tabsElement.prop('liWidth');
            if (liWidth > tabsElement.width()) {
                jQuery('div.ui-tabs-nav').css('display', 'block');
                jQuery('ul.ui-tabs-nav').css('display', 'none');
            } else {
                jQuery('div.ui-tabs-nav').css('display', 'none');
                jQuery('ul.ui-tabs-nav').css('display', 'block');
            }
        });
    };
    this.each(function () {
        var that = jQuery(this).addClass('ui-tabbed-rwd');
        if (!options) {
            options = {};
        }
        options.create = function (event, ui) {
            var div = jQuery('<div />', {'class': 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'}).css('display', 'none');
            var select = jQuery('<select />');
            var width = 0;
            jQuery('>ul.ui-tabs-nav > li', that).each(function () {
                var li = jQuery(this);
                width+=li.outerWidth(true);
                var option = jQuery('<option />').text(jQuery('a', li).text());
                option.attr('value', li.attr('aria-labelledby'));
                select.append(option);
                jQuery('a', li).bind('click', function(e){
                    var that = jQuery(this);
                    jQuery('>div.ui-tabs-nav select', that.parent().parent().parent()).val(that.parent().attr('aria-labelledby'));
                });
            });
            select.bind('change', function(e){
                var that = jQuery(this);
                jQuery('>ul.ui-tabs-nav > li[aria-labelledby="'+that.val()+'"] a', that.parent().parent()).trigger('click');
            });
            div.append(select);
            that.prepend(div);
            that.prop('liWidth', width);
            checkSize();
        };
        that.tabs(options);
        jQuery(window).bind('resize', function (e) {
            checkSize();
        });
    });
}

jQuery(document).ready(function () {
    cMain.inicjuj();
});
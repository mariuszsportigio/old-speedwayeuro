var cCalendar = {
    KIERUNEK_WCZESNIEJ: 0,
    KIERUNEK_POZNIEJ: 1,
    aktualny_max: 0,
    aktualny_min: 0,
    ile_przed: 0,
    ile_po: 0,
    data_przed: '',
    data_po: '',
    ilosc_elementow: 0,
    ilosc_do_pobrania: 5,
    szerokosc_elementu: 200,
    pokazUkryjStrzalki: function(kalendarz) {
        if (this.aktualny_min <= 0 && this.ile_przed == 0) {
            jQuery('img#prev', kalendarz).css('visibility', 'hidden');
        } else {
            jQuery('img#prev', kalendarz).css('visibility', 'visible');
        }
        if (this.aktualny_max >= this.ilosc_elementow && this.ile_po == 0) {
            jQuery('img#next', kalendarz).css('visibility', 'hidden');
        } else {
            jQuery('img#next', kalendarz).css('visibility', 'visible');
        }
        return this;
    },
    poprzedni: function(kalendarz) {
        if (this.aktualny_min > 0) {
            jQuery('#wrapper #calendar', kalendarz).stop().animate({
                'left': '+=' + cCalendar.szerokosc_elementu + 'px'
            });
            this.aktualny_min--;
            this.aktualny_max--;
            this.pokazUkryjStrzalki(kalendarz);
        }
        return this;
    },
    nastepny: function(kalendarz) {
        if (this.aktualny_max < this.ilosc_elementow) {
            jQuery('#wrapper #calendar', kalendarz).stop().animate({
                'left': '-=' + cCalendar.szerokosc_elementu + 'px'
            });
            this.aktualny_min++;
            this.aktualny_max++;
            this.pokazUkryjStrzalki(kalendarz);
        }
        return this;
    },
    przetworzJSON: function(json, kierunek, kalendarz) {
        var calendarBox = jQuery('#calendarBox').html();
        var calendarBoxInside = jQuery('#calendarBoxInside').html();
        var ilosc = 0;
        var html = '';
        for (var x in json.elements) {
            var tmp = '';
            for (var i in json.elements[x]) {
                var el = json.elements[x][i];
                tmp += calendarBoxInside.replace('%godzina', el.godzina).replace('%nazwa', el.nazwa);
            }
            html += calendarBox.replace('%data', x).replace('%inside', tmp);
            ilosc ++;
        }
        this.ilosc_elementow += ilosc;
        var calendar = jQuery('#wrapper #calendar', kalendarz);
        if(kierunek == this.KIERUNEK_WCZESNIEJ){
            calendar.html(html + calendar.html()).css({
                'left': '-=' + (ilosc*cCalendar.szerokosc_elementu) + 'px'
            });
            this.aktualny_min+=ilosc;
            this.aktualny_max+=ilosc;
            this.ile_przed = json.count_next;
            this.data_przed = json.data;
            this.poprzedni(kalendarz);
        } else {
            calendar.html(calendar.html()+html);
            this.ile_po = json.count_next;
            this.data_po = json.data;
            this.nastepny(kalendarz);
        }
        return this;
    },
    init: function() {
        var kalendarz = jQuery('section#main-calendar');
        if (kalendarz.length) {
            this.ilosc_elementow = jQuery('#wrapper .box', kalendarz).length;
            this.aktualny_max = (this.ilosc_elementow > 5) ? 5 : this.ilosc_elementow;
            this.ile_przed = kalendarz.data('ile_przed');
            this.ile_po = kalendarz.data('ile_po');
            this.data_przed = kalendarz.data('przed');
            this.data_po = kalendarz.data('po');
            jQuery('img#prev', kalendarz).click(function() {
                if (cCalendar.aktualny_min == 0 && cCalendar.ile_przed > 0) {
                    jQuery.ajax({
                        'url': '/json/calendar/' + cCalendar.data_przed + '/' + cCalendar.KIERUNEK_WCZESNIEJ + '/' + cCalendar.ilosc_do_pobrania,
                        'type': 'post',
                        'dataType': 'json',
                        'success': function(json) {
                            cCalendar.przetworzJSON(json, cCalendar.KIERUNEK_WCZESNIEJ, kalendarz);
                        }
                    });
                } else {
                    cCalendar.poprzedni(kalendarz);
                }
            });

            jQuery('section#main-calendar img#next').click(function() {
                if (cCalendar.aktualny_max >= cCalendar.ilosc_elementow && cCalendar.ile_po > 0) {
                    jQuery.ajax({
                        'url': '/json/calendar/' + cCalendar.data_po + '/' + cCalendar.KIERUNEK_POZNIEJ + '/' + cCalendar.ilosc_do_pobrania,
                        'type': 'post',
                        'dataType': 'json',
                        'success': function(json) {
                            cCalendar.przetworzJSON(json, cCalendar.KIERUNEK_POZNIEJ, kalendarz);
                        }
                    });
                } else {
                    cCalendar.nastepny(kalendarz);
                }
            });

        }
    }
};
cCalendar.init();

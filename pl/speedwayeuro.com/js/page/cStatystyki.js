var cStatystyki = {
    url : '',
    order : 'pts',
    orderasc : 0,
    sezon_id : 0,
    event_id : 0,
    rider1 : 0,
    rider2 : 0,
    rider3 : 0,
    rider4 : 0,
    templates : {},
    getStats: function(){
        var tbody = jQuery('table#statystyki tbody');
        var h2h = jQuery('.head2head');
        var data = {
            'sezon_id' : cStatystyki.sezon_id,
            'order' : cStatystyki.order,
            'orderasc' : cStatystyki.orderasc,
            'event_id' : cStatystyki.event_id,
            'h2h' : [cStatystyki.rider1, cStatystyki.rider2, cStatystyki.rider3, cStatystyki.rider4]
        };
        jQuery.ajax({
            'url' : cStatystyki.url,
            'data' : data,
            'type' : 'post',
            'dataType' : 'json',
            success: function(json){
                tbody.empty();
                h2h.empty();
                for(var x = 0; x<json.stats.length; x++){
                    var html = cMain.przetworzSzablon(cStatystyki.templates['statsrow'].html(), json.stats[x]);
                    tbody.append(jQuery(html));
                }
                var htmls = {};
                var templates = ['riders', 'events', 'heats', 'pts', 'ptsheat', 'ptsevent', 'm1', 'm2', 'm3', 'm4', 'd', 'u', 'w', 't'];
                if(json.h2h.length > 0){
                    for(var i = 0; i < json.h2h.length; i++){
                        for(var x = 0; x < templates.length; x++){
                            var tpl = 'h2h'+templates[x];
                            if(!htmls[templates[x]]){
                                htmls[templates[x]] = '';
                            }
                            htmls[templates[x]] += cMain.przetworzSzablon(cStatystyki.templates[tpl].html(), json.h2h[i]);
                        }
                    }
                    h2h.append(jQuery(cMain.przetworzSzablon(cStatystyki.templates['h2h'].html(), htmls)));
                }
            }
        });
    },
    init : function(opts){
        cStatystyki.url = opts.url;
        cStatystyki.sezon_id = opts.sezon_id;
        jQuery('script[type="text/template"]').each(function(){
            var that = jQuery(this);
            cStatystyki.templates[that.attr('id')] = that.clone(true);
        });
        jQuery('table#statystyki thead th').bind('click', function(){
            var that = jQuery(this);
            if(!that.hasClass('actual')){
                jQuery('th', that.parent()).removeClass('actual');
                cStatystyki.order = that.attr('data-order');
                cStatystyki.orderasc = 0;
                that.removeClass('desc');
                that.addClass('actual');
            } else {
                if(cStatystyki.orderasc == 0){
                    cStatystyki.orderasc = 1;
                    that.addClass('desc');
                } else {
                    cStatystyki.orderasc = 0;
                    that.removeClass('desc');
                }
            }
            cStatystyki.getStats();
        });
        jQuery('.stats-filter button').bind('click', function(e){
            if(e && e.preventDefault){
                e.preventDefault();
            }
            var that = jQuery(this);
            var rel = that.attr('data-rel');
            var ul = jQuery('ul',that.parent());
            if(ul.hasClass('visible')){
                ul.removeClass('visible');
            } else {
                jQuery('.stats-filter ul').removeClass('visible');
                ul.addClass('visible');
                cMain.body_hider();
            }
            return false;
        });
        jQuery('.stats-filter ul li').bind('click', function(e){
            var that = jQuery(this);
            var ul = that.parent();
            cStatystyki[that.attr('data-rel')] = that.attr('data-id');
            ul.removeClass('visible');
            jQuery('button', ul.parent()).text(that.text());
            cStatystyki.getStats();
        });
        cStatystyki.getStats();
    }
}
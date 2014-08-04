(function ($) {
    "use strict";
    var tableContentAlign = function () {
        return tableContentAlign.init.apply(this, arguments);
    };


    $.extend(tableContentAlign, {

        options: {
            bottomAlignSelect : '.bottom'
        },

        element: undefined,

        init: function (element, options) {
            if (element === undefined) return;

            this.element = element;
            this.options = $.extend(this.options, options);
            this.aligmentElement = this.options.bottomAlignSelect;

            this.setAlign();
            element.data('tableContentAlign', this);
            return this;
        },
        test: function(){
            console.log('fire test method');
        },
        setAlign: function () {
            var me = this,
                td = this.element.find('td');
                this.element.find('.wrapper-bottom').css('height', 'auto');
                var padding = parseInt(td.first().css('padding-top')) + parseInt(td.first().css('padding-bottom')),
                    height = td.first().height() - padding;
            td.each(function(){
                var $this = $(this),
                    $alignElement = $this.find(me.aligmentElement);
                if ($alignElement.length > 0){

                    $alignElement.css({'position': 'absolute', 'bottom': '0', left: 0, right: 0});
                    var $html  = $this.html(),
                        isSetWrapper = $this.find('.wrapper-bottom').length > 0,
                        $wrapper = isSetWrapper ? $this.find('.wrapper-bottom') : $('<div class="wrapper-bottom"></div>');
                    $wrapper.css({'height': height, 'position': 'relative'});

                    $this.html('');
                    $this.append($wrapper);
                    if (isSetWrapper)
                        return;

                    $wrapper.append($html);
                }
            });
        }
    });

    return $.fn.tableContentAlign = function (options) {
        if (this.data('tableContentAlign')){
            return this.data('tableContentAlign');
        }else{
            return tableContentAlign.init(this, options);
        }
    };

})($);

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

            return this;
        },

        setAlign: function () {
            var me = this,
                td = this.element.find('td'),
                height = td.first().outerHeight();

            td.each(function(){
                var $this = $(this),
                    $alignElement = $this.find(me.aligmentElement);
                if ($alignElement.length > 0){

                    $alignElement.css({'position': 'absolute', 'bottom': '0', left: 0, right: 0});
                    var $html  = $this.html(),
                        $wrapper = $('<div class="wrapper-bottom"></div>');
                    $wrapper.css({'height': height, 'position': 'relative'});

                    $this.html('');
                    $this.append($wrapper);
                    $wrapper.append($html);
                }
            });
        }
    });

    return $.fn.tableContentAlign = function (options) {
        return tableContentAlign.init(this, options);
    };

})($);

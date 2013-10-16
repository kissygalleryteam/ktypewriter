/*
combined files : 

gallery/ktypewriter/1.0/index

*/
/**
 * @fileoverview 
 * @author 紫英<ziying.wzc@taobao.com>
 * @module ktypewriter
 **/
KISSY.add('gallery/ktypewriter/1.0/index',function (S, Node,Base) {

    var EMPTY = '';
    var $ = Node.all;

    /**
     * 
     * @class Ktypewriter
     * @constructor
     * @extends Base
     */
    function Ktypewriter(comConfig) {
        var self = this;
        //调用父类构造函数
        Ktypewriter.superclass.constructor.call(self, comConfig);
        self.init();
    }

    S.extend(Ktypewriter, Base, /** @lends Ktypewriter.prototype*/{

        init: function(){
            var words = this.get('words');
            if(S.isArray(words) && words.length){

                var delay = this.get('delay');
                var cursor = this.get('cursor');
                var $container = this.get('container');
                var callback = this.get('callback');

                if(!$container || !$container.length) return;

                function type_next_character(i) {
                    $container.html( words.slice(0, i + 1).join('') + cursor );
                    if (words.length >= i) {
                        setTimeout(function() {
                            type_next_character(i+1);
                        }, delay);
                    } else {
                        callback && callback();
                    }
                }
                type_next_character(0);
            }
        }

    }, {
        ATTRS : /** @lends Ktypewriter*/{
            container: {
                setter: function(el){
                    return $(el);
                }
            },
            words: {
                value: []
            },
            cursor: {
                value: ''
            },
            delay: {
                value: 1,
                getter: function(v){
                    return parseFloat(v) * 1000;
                }
            },
            callback: {
                value: function(){}
            }
        }
    });
    return Ktypewriter;
}, {
    requires: [
        'node',
        'base'
    ]
});





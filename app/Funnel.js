define([], function(){
    "user strict";
    return function() {
        var _self = this;
        var getMax = function( array ){
            return Math.max.apply( Math, array );
        };
        var getMin = function( array ){
            return Math.min.apply( Math, array );
        };

    }
});
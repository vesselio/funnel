// [
//     {
//         name : 'signup flow',
//         data : [10000, 9000, 5000, 1000, 500]
//     }
// ]
define([], function(){
    "use strict";
    return function(data) {
        var _self = this;
        _self.canvas = null;
        _self.context = null;
        
        var setupContext = function(){
            _self.context = _self.canvas.getContext('2d');
            _self.context.fillStyle = "#000000";
            _self.context.strokeStyle = "#000000";
            return _self.context;
        };
        var getMax = function( array ) {
            return Math.max.apply( Math, array );
        };
        // var getMin = function( array ) {
        //     return Math.min.apply( Math, array );
        // };
        var setupCanvas = function() {
            _self.canvas = document.createElement('canvas');
            setupContext();
            return _self.canvas;
        };
        // ["Horizontal", "Vertical"]
        // [0,0], [300,0], [250, 150], [50, 150]
        var drawSection = function( points ) {
            _self.context.beginPath();
            _self.context.moveTo(0, 0);
            for(var i = 0, l = points.length; i < l; i++){
                _self.context.lineTo(points[i][0],points[i][1]);
            }
            _self.context.closePath();
            _self.context.fill();
        };
        var appendCanvas = function() {
            return document.getElementsByTagName('body')[0].appendChild(_self.canvas);
        };
        var calculatePoints = function(funnel){
            var sectionCount = _self.canvas.height / funnel.data.length;
            var sortedData = funnel.data.sort( function( a,b ){ return b-a; } );
            var highest = getMax(sortedData);

            sortedData.forEach(function(el, i){
                var TL = calculateTopLeft(i, sectionCount, el, highest);
                var TR = calculateTopRight(i, sectionCount, el, highest);
                var BR = calculateBottomRight(i, sectionCount, el, highest);
                var BL = calculateBottomLeft(i, sectionCount, el, highest);
                
                drawSection([TL, TR, BR, BL]);
            });
        };
        var calculateTopLeft = function(index, count, value, max){
            var x = (_self.canvas.width - ((value / max) * _self.canvas.width)) / 2;
            var y = (_self.canvas.height/index) * count;
            return [x, y];
        };
        var calculateTopRight = function(index, count, value, max){
            var x = ((_self.canvas.width - ((value / max) * _self.canvas.width)) / 2) + (value / max) * _self.canvas.width;
            var y = (_self.canvas.height/index) * count;
            return [x, y];
        };
        var calculateBottomRight = function(index, count, value, max){
            var x = ((_self.canvas.width - ((value / max) * _self.canvas.width)) / 2) + (value / max) * _self.canvas.width;
            var y = (_self.canvas.height/index) * (count+1);
            return [x, y];
        };
        var calculateBottomLeft = function(index, count, value, max){
            var x = ((_self.canvas.width - ((value / max) * _self.canvas.width)) / 2) + (value / max) * _self.canvas.width;
            var y = (_self.canvas.height/index) * (count+1);
            return [x, y];
        };
        var init = function( data ) {
            setupCanvas();
            drawSection( data );
            calculatePoints(data);
            appendCanvas();
        };

        init( data );
    };
});
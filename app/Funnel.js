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
        

        // Canvs maintence
        var setupCanvas = function() {
            _self.canvas = document.createElement('canvas');
            setupContext();
            return _self.canvas;
        };
        var setupContext = function(){
            _self.context = _self.canvas.getContext('2d');
            _self.context.fillStyle = "#000000";
            _self.context.strokeStyle = "#000000";
            return _self.context;
        };
        // ["Horizontal", "Vertical"]
        // [0,0], [300,0], [250, 150], [50, 150]
        var drawSection = function( points ) {
            _self.context.beginPath();
            for(var i = 0, l = points.length; i < l; i++){
                console.log(points[i]);
                if(i===0){
                    _self.context.moveTo(points[i][0],points[i][1]);
                }
                else{
                    _self.context.lineTo(points[i][0],points[i][1]);
                }
                
            }
            _self.context.closePath();
            _self.context.fill();
        };
        var appendCanvas = function() {
            return document.getElementsByTagName('body')[0].appendChild(_self.canvas);
        };

        // Data maintence
        var getMax = function( array ) {
            return Math.max.apply( Math, array );
        };
        var calculateX = function(value, isLeft, canvasWidth, highest){
            var temp = null;
            var getHorizontalLength = function(value, highest){
                var temp = value/highest * canvasWidth;
                return temp;
            };
            var getHorizontalOffset = function(canvasWidth, horizontalLength){
                return (canvasWidth - horizontalLength) / 2;
            };

            if(isLeft){
                temp = getHorizontalOffset(canvasWidth, getHorizontalLength(value, highest));
                return temp;
            }
            else{
                temp = canvasWidth - getHorizontalOffset(canvasWidth, getHorizontalLength(value, highest));
                return temp;
            }
        };
        var calculateY = function(i, valueCount, isTop){
            var trapazoidCount = valueCount-1;
            var sectionHeight = _self.canvas.height / trapazoidCount;

            if(isTop){
                return (i + (-1)) * sectionHeight;
            }
            else{
                return i * sectionHeight;
            }
        };
        var getCorners = function(i, value, highest, valueCount, previousValue){
            var corners = [];
            corners.push([ calculateX(previousValue, true, _self.canvas.width, highest), calculateY(i, valueCount, true) ]);
            corners.push([ calculateX(previousValue, false, _self.canvas.width, highest), calculateY(i, valueCount, true) ]);
            corners.push([ calculateX(value, false, _self.canvas.width, highest), calculateY(i, valueCount, false) ]);
            corners.push([ calculateX(value, true, _self.canvas.width, highest), calculateY(i, valueCount, false) ]);

            return corners;
        };
        var makeFunnel = function(values){
            var sortedData = values.data.sort( function( a,b ){ return b-a; } );
            var highest = getMax(sortedData);
            var valueCount = values.data.length;
            var previousValue = null;

            sortedData.forEach(function(value, i){
                if(i === 0){
                    previousValue = value;
                }
                else{
                    var corners = getCorners(i, value, highest, valueCount, previousValue);
                    drawSection(corners);
                    previousValue = value;
                }
            });
        };

        var init = function( data ) {
            setupCanvas();
            makeFunnel(data);
            appendCanvas();
        };
        init( data );
    };
});
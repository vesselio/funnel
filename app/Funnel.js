// [
//     {
//         name : 'signup flow',
//         data : [10000, 9000, 5000, 1000, 500]
//     }
// ]
define([], function(){
    "use strict";
    return function(target, data, options) {
        var _self = this;
        _self.canvas = null;
        _self.context = null;
        _self.sortedData = data.data.length ? data.data.sort( function( a,b ){ return b-a; } ) : [];
        _self.valueCount = _self.sortedData.length;
        _self.sections = [];

        function Section(i, value, topValue, maxValue) {
            var _sect = this;
            _sect.topvalue = topValue;
            _sect.bottomValue = this.value = value;
            _sect.corners = [];

            var calculateX = function(value, isLeft, canvasWidth){
                var temp = null;
                var getHorizontalLength = function(value){
                    var temp = value/maxValue * canvasWidth;
                    return temp;
                };
                var getHorizontalOffset = function(canvasWidth, horizontalLength){
                    return (canvasWidth - horizontalLength) / 2;
                };

                if(isLeft){
                    temp = getHorizontalOffset(canvasWidth, getHorizontalLength(value, maxValue));
                    return temp;
                }
                else{
                    temp = canvasWidth - getHorizontalOffset(canvasWidth, getHorizontalLength(value, maxValue));
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
            var getCorners = function(i, value, valueCount, topValue){
                _sect.corners.push([ calculateX(topValue, true, _self.canvas.width), calculateY(i, valueCount, true) ]);
                _sect.corners.push([ calculateX(topValue, false, _self.canvas.width), calculateY(i, valueCount, true) ]);
                _sect.corners.push([ calculateX(value, false, _self.canvas.width), calculateY(i, valueCount, false) ]);
                _sect.corners.push([ calculateX(value, true, _self.canvas.width), calculateY(i, valueCount, false) ]);

                return _sect.corners;
            };
            getCorners(i, value, _self.valueCount, _sect.topvalue);
            return _sect;
        }

        var getMax = function(array) {
            return Math.max.apply( Math, array );
        };
        var setupCanvas = function(options) {
            _self.canvas = document.createElement('canvas');

            for (var prop in options) {
                if(options.hasOwnProperty(prop)){
                    _self.canvas[prop] = options[prop];
                }
            }
            return _self.canvas;
        };
        var setupContext = function() {
            _self.context = _self.canvas.getContext('2d');
            _self.context.fillStyle = "#000000";
            _self.context.strokeStyle = "#000000";
            return _self.context;
        };
        var drawSection = function( points ) {
            _self.context.beginPath();
            for(var i = 0, l = points.length; i < l; i++){
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
        var drawSections = function() {
            for(var i = 0, l = _self.sections.length; i < l; i++){
                drawSection(_self.sections[i]['corners']);
            }
        };
        var appendCanvas = function(target) {
            return target.appendChild(_self.canvas);
        };
        var updateSections = function() {
            var previousValue = null;
            var maxValue = getMax(_self.sortedData);

            for(var i = 0, l = _self.valueCount; i < l; i++ ){
                var value = _self.sortedData[i];
                if(i === 0){
                    previousValue = value;
                }
                else{
                    var section = new Section(i, value, previousValue, maxValue);

                    _self.sections.push(section);
                    previousValue = value;
                }
            }
        };
        var init = function() {
            var data = arguments[0] ? arguments[0] : [];
            var options = arguments[1] ? arguments[1] : {};

            setupCanvas(options);
            setupContext();
            updateSections();
            drawSections();
            appendCanvas(target);
        };

        init(data, options);
        return _self;
    };
});
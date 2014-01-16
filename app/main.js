// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "Funnel"], function($, Funnel) {
    var target = document.getElementById('body');
    var data1 = {
        name : 'signup flow1',
        data : [100, 90, 70, 10]
    };
    var options = {
        height : 500, 
        width : 500 
    };

    var funnel1 = new Funnel(target, data1, options);
});

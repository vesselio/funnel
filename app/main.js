// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "Funnel"], function($, Funnel) {
    var data1 = {
        name : 'signup flow1',
        data : [100, 90, 70, 10]
    };
    var data2 = {
        name : 'signup flow2',
        data : [100, 30, 25, 20]
    };
    var options = { height : 400, width : 300 };

    var funnel1 = new Funnel(data1, options);
    var funnel2 = new Funnel(data2, options);
});

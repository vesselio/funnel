// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "Funnel"], function($, Funnel) {
    var data = {
        name : 'signup flow',
        data : [100, 90, 70, 10]
    };
    var options = { height : 400, width : 300 };
    var funnel = new Funnel(data, options);
});

// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "Funnel"], function($, Funnel) {
    var data = {
        name : 'signup flow',
        data : [10000, 9000, 5000, 800]
    };
    var funnel = new Funnel(data);
});

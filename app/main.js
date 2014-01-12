// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "Funnel"], function($, Funnel) {
  $('body').append('jQuery ' + $.fn.jquery + ' loaded!');
  var funnel = new Funnel();
  return funnel;
});

var Backbone, plugin, _;

_ = require('underscore');

Backbone = require('backbone');

Backbone.$ = require('jquery');

plugin = require('plugin');

module.exports = Backbone.View.extend({
  template: require('./template'),
  initialize: function() {
    var underscoreTest;
    underscoreTest = _.last([0, 1, 2, 'hi mom!']);
    return this.render();
  },
  render: function() {
    this.$el.html(this.template({
      description: 'Starter Gulp + Browserify project to demonstrate some common tasks:',
      tools: ['CommonJS bundling and watching', 'Working with multiple bundles', 'Factoring out shared dependencies', 'Live reloading across devices', 'JS transforms and compiling', 'CSS preprocessing: node-sass (Lightning fast libsass!)', 'Iconfont generation', 'Image optimization', 'Non common-js plugins with common-js dependencies', 'Using modules already bundled with other modules']
    }));
    return plugin();
  }
});
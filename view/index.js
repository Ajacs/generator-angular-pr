'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, '../templates/common'));

  if (typeof this.env.options.appPath === 'undefined') {
    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  var name = this.name.toLowerCase().split('.');
  this.modulePath= name.slice(0, name.length - 1).join('/');
  this.moduleName = path.basename(name[name.length-1]);
  // moduleFullName e.g. ultra.components.directives.firstTimeExperience
  this.moduleFullName = this._.camelize((this.appname + '.' + this.name).split('-').join(' '));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.template(
    'app/views/view.html',
    path.join(
      this.env.options.appPath,
      this.modulePath,
      this.moduleName + '.html'
    )
  );

};

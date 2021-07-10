/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var appTasks = require('./../FooBarFrontend/gulp/_app-tasks');
Object.keys(appTasks).forEach((task) => {
	exports[task] = appTasks[task];
});
Package.describe({
	summary: "This is an object to create your own dependent objects, outside of using Meteor Sessions."
});

Package.on_use(function (api, where) {
	api.add_files('lib/Object.identical.js', 'client');
	api.add_files('simple-dependency-object.js', 'client');
	api.export('SimpleDep', 'client');
});

/*
Package.on_test(function (api) {
  api.use('simple-dependency-object');

  api.add_files('simple-dependency-object_tests.js', ['client']);
});
*/
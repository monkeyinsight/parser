var Parser = require('./parser.js'),
	paths = require('./parse.json');

for (var i = 0; i < paths.length; i++) {
	var parser = new Parser(paths[i].id, paths[i].url, paths[i].regexp, function (data, id) {
		console.log(id + ': ' + data[1]);
	});

	parser.request();
}
var urlparser = require('url'),
    http = require('http');

function Parser(id, url, regexp, callback) {
    this.id = id;
    this.path = urlparser.parse(url);
    this.regexp = new RegExp(regexp, 'i');
    this.callback = callback;
}

Parser.prototype.request = function () {
    var self = this,
        options = {
            host: this.path.host,
            path: this.path.pathname
        };

    this.req = http.request(options, function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var matches = str.match(self.regexp);
            return self.callback(matches, self.id);
        });
    });
    this.req.end();
}

module.exports = Parser;
var url = require('url');


module.exports = function (req, res, next, data) {
    var options = data.options;
    var hostArr = req.headers.host.split(':');
    var parsedUrl = url.parse(req.url, true);

    if (options.headers) {
        for (var p in options.headers) {
            req.headers[p] = options.headers[p];
        }
        options.headers = undefined;
        delete options['headers'];
    }

    hostArr[0] = options.hostname || hostArr[0];
    hostArr[1] = options.port || hostArr[1] || 80;

    parsedUrl.host = req.headers.host = hostArr.join(':');

    for (var p in options) {
        parsedUrl[p] = options[p];
    }

    req.url = url.format(parsedUrl);
    next();
};
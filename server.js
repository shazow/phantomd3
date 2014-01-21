var webserver = require('webserver');
var webpage = require('webpage');


var PORT = 8000;


function renderElement(page, selector) {
    var clipRect = page.evaluate(function(selector) {
        return document.querySelector(selector).getBoundingClientRect();
    }, selector);

    page.clipRect = {
        top:    clipRect.top,
        left:   clipRect.left,
        width:  clipRect.width,
        height: clipRect.height
    };

    var pic = page.renderBase64('png');

    console.log("Rendered image of size: " + clipRect.width + 'x' + clipRect.height + " (" + pic.length + " bytes)");

    return pic;
};


console.log("Starting server on port " + PORT + ".");
webserver.create().listen(PORT, function(request, response) {
    console.log(request.method + ' ' + request.url);

    if (request.method != 'POST' || request.url != '/') {
        response.statusCode = 404;
        response.close();
        return;
    }

    // TODO: Add some kind of security here?
    var render_fn = request.post && request.post['src'];
    var page = webpage.create();

    page.open('shell.html', function(status) {
        if (render_fn) {
            this.evaluate(new Function(render_fn));
        }

        var r = renderElement(this, '#viewport');

        if (r) {
            response.statusCode = 200;
            response.headers = {
                'Cache': 'no-cache',
                'Content-Type': 'image/png'
            };
            response.setEncoding('binary');
            response.write(atob(r));
        } else {
            response.statusCode = 500;
            response.write("No image rendered after evaluating: \n" + render_fn);
        }

        response.close();
        this.close();
    });
});

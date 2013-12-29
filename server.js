var webserver = require('webserver');
var webpage = require('webpage');


var PORT = 8000;


function renderElement(page, selector) {
    page.clipRect = page.evaluate(function(selector) {
        return document.querySelector(selector).getBoundingClientRect();
    }, selector);

    var pic = page.renderBase64('png');
    return pic;
};


console.log("Starting server on port " + PORT + ".");
webserver.create().listen(PORT, function(request, response) {
    // TODO: Add some kind of security here?
    console.log("Enter");
    var render_fn = request.post && request.post['src'];
    var page = webpage.create();

    page.open('d3shell.html', function(status) {
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
            response.write(atob(this.renderBase64('png')));
        } else {
            response.statusCode = 500;
            response.write("Something went wrong.");
        }

        response.close();
        this.close();
    });
});

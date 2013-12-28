var webserver = require('webserver');
var webpage = require('webpage');

// TODO: Do this inside of the request and chain events?
var page = webpage.create();
page.open('./d3shell.html');

function render_element(page, selector) {
    var prevClipRect = page.clipRect;

    page.clipRect = page.evaluate(function(selector) {
        return document.querySelector(selector).getBoundingClientRect();
    }, selector);

    page.render('foo.png');

    //var pic = page.renderBase64('png');
    page.clipRect = prevClipRect;
    //return pic;
};

webserver.create().listen(8000, function(request, response) {
    // TODO: Add some kind of security here?
    page.evaluate(new Function(request.postRaw));

    console.log("Rendering... ");
    var r = render_element(page, '#viewport');
    console.log("Done.");

    if (r) {
        response.statusCode = 200;
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'image/png'
        };
        response.setEncoding('binary');
        response.write(atob(page.renderBase64('png')));
    } else {
        response.statusCode = 500;
        response.write("Something went wrong.");
    }

    response.close();

    // FIXME: Close the page to avoid memory leaks?
    //page.close();
});

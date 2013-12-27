// Via https://gist.github.com/3176500
function renderElement(page, selector) {
    var prevClipRect = page.clipRect;

    page.clipRect = page.evaluate(function(selector) {
        return document.querySelector(selector).getBoundingClientRect();
    }, selector);


    page.render('foo.png');
    //var pic = page.renderBase64('png');
    //page.clipRect = prevClipRect;
    //return pic;
}

if (module && module.exports) module.exports = renderElement;

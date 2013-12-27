// Via http://stackoverflow.com/questions/11632748/svg-to-png-server-side-using-node-js
var page = require('webpage').create(),
    renderElement = require('./renderElement.js'),
    Routes = require('./Routes.js'),
    app = new Routes();

page.viewportSize = {width: 1000, height: 1000};
page.open('./d3shell.html');

app.post('/', function(req, res) {
    page.evaluate(new Function(req.post.d3));
    var pic = renderElement(page, '#Viewport');
    res.send(pic);
});

app.listen(8000);

console.log('Listening on port 8000.');

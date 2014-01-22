Render d3 charts within PhantomJS.

(Prototype, only mildly functional.)



## Usage

1. `make serve` to start the PhantomJS server.
2. Open `example.html` in your browser and submit for an example image.
3. Profit.


## How it works

Client `POST` JavaScript instructions for rendering a chart with D3 and/or NVD3.

The PhantomJS server receives the request (in `server.js`) and evaluates the
instructions, then renders the contents of `#viewport` into a PNG and returns
it as a binary HTTP response.

This lets your other servers request all kinds of fancy charts to be rendered
by PhantomD3 server, then get the response and save it wherever is convenient.

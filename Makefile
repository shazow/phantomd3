start:
	phantomjs server.js

request:
	curl -F d3=@renderExample.js localhost:8000

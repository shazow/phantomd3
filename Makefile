serve:
	phantomjs server.js

request:
	curl -vv -d @example_request.js localhost:8000
	open foo.png

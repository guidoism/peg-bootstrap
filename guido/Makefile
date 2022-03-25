.PHONY: kragen.js
kragen.js: 
	node kragen.js > /tmp/stage1.js
	js-beautify --end-with-newline --brace-style=end-expand /tmp/stage1.js > /tmp/stage1b.js
	diff kragen.js /tmp/stage1b.js

.PHONY: c
c:
	node c1.js > /tmp/c2.js
	js-beautify --end-with-newline --brace-style=end-expand /tmp/c2.js > /tmp/c2b.js
	node /tmp/c2b.js

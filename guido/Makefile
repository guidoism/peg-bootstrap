.PHONY: kragen.js
kragen.js: 
	node kragen.js > /tmp/stage1.js
	js-beautify --end-with-newline --brace-style=end-expand /tmp/stage1.js > /tmp/stage1b.js
	diff kragen.js /tmp/stage1b.js

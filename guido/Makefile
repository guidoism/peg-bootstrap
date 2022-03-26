.PHONY: kragen.js
kragen.js: 
	node kragen.js > /tmp/stage1.js
	js-beautify --end-with-newline --brace-style=end-expand /tmp/stage1.js > /tmp/stage1b.js
	diff kragen.js /tmp/stage1b.js

.PHONY: c
c:
	node c0.js c0.peg > /tmp/c1.js
	js-beautify --end-with-newline --brace-style=end-expand /tmp/c1.js > /tmp/c1b.js
	node /tmp/c1b.js c2.peg | clang-format -style='{IndentWidth: 4}' > /tmp/c2.c


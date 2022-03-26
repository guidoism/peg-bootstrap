.PHONY: all
all:
	node 0.js a.peg | js-beautify --end-with-newline --brace-style=end-expand - > 1.js
	diff 0.js 1.js
	#node /tmp/c1b.js c2.peg | clang-format -style='{IndentWidth: 4}' > /tmp/c2.c


.PHONY: all
all:
	node 0.js a.peg | js-beautify --end-with-newline --brace-style=end-expand - > 1.js
	node 1.js a.peg | js-beautify --end-with-newline --brace-style=end-expand - > 2.js
	node 2.js b.peg | js-beautify --end-with-newline --brace-style=end-expand - > 3.js
	node 3.js c.peg | js-beautify --end-with-newline --brace-style=end-expand - > 4.js
	node 4.js d.peg | clang-format -style='{IndentWidth: 4}' > 5.c



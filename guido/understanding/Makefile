.PHONY: all
all:
	node 0.js a.peg | js-beautify --end-with-newline --brace-style=end-expand - > 1.js
	node 1.js a.peg | js-beautify --end-with-newline --brace-style=end-expand - > 2.js
	node 2.js b.peg | js-beautify --end-with-newline --brace-style=end-expand - > 3.js
	node 3.js c.peg | js-beautify --end-with-newline --brace-style=end-expand - > 4.js
	#echo "#include \"head.h\"" > 5.c
	#node 4.js d.peg | clang-format -style='{IndentWidth: 4}' >> 5.c
	#clang -std=c11 5.c -o 5.out
	#echo "#include \"head.h\"" > 6.c
	#./5.out d.peg | clang-format -style='{IndentWidth: 4}' >> 6.c
	#diff 5.c 6.c
	clang -std=c11 5.c -o 5.out && ./5.out d.peg

literate:
	node 0.js literate.a.peg | sed -e 's/parse_sentence/parse_grammar/g' | js-beautify --end-with-newline --brace-style=end-expand - > literate.1.js
	node literate.1.js literate.a.peg | js-beautify --end-with-newline --brace-style=end-expand - > literate.2.js
	node literate.2.js literate.a.peg | js-beautify --end-with-newline --brace-style=end-expand - > literate.3.js
	#diff literate.2.js literate.3.js
	node literate.3.js literate.b.peg | js-beautify --end-with-newline --brace-style=end-expand - > literate.4.js
	#diff literate.3.js literate.4.js
	node literate.4.js literate.b.peg | js-beautify --end-with-newline --brace-style=end-expand - > literate.5.js
	node literate.4.js literate.b.peg | js-beautify --end-with-newline --brace-style=end-expand - > literate.6.js
	diff literate.5.js literate.6.js

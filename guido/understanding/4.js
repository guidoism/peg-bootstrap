// This is from a template in b.peg
function parse_sp(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = literal(input, state.pos, ' ');
    if (state) {}

    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, '\n');
        if (state) {}

        if (!state) {
            state = stack.pop();
            state = literal(input, state.pos, '\t');
            if (state) {}

        }
        else {
            stack.pop();
        }
    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse__(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_sp(input, state.pos);
    if (state) {
        state = parse__(input, state.pos);
        if (state) {}
    }

    if (!state) {
        state = stack.pop();

    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_rule(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state) var n = state.val;
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = literal(input, state.pos, '<-');
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    state = parse_choice(input, state.pos);
                    if (state) var body = state.val;
                    if (state) {
                        state = literal(input, state.pos, '.');
                        if (state) {
                            state = parse__(input, state.pos);
                            if (state) {
                                if (state) state.val = (`// This is from a template in c.peg
               State parse_${n}(str input, int pos) {
                     State state = { .pos=pos, .valid=true };
                     Stack stack = { 0 };
                     // Not sure where this body is coming from
                     ${body}
                     return state;
                }`);
                            }
                        }
                    }
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_sentence(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse__(input, state.pos);
    if (state) {
        state = parse_rule(input, state.pos);
        if (state) var r = state.val;
        if (state) {
            state = parse_sentence(input, state.pos);
            if (state) var g = state.val;
            if (state) {
                if (state) state.val = (`${r}\n${g}`);
            }
        }
    }

    if (!state) {
        state = stack.pop();
        state = parse__(input, state.pos);
        if (state) {
            state = parse_rule(input, state.pos);
            if (state) var r = state.val;
            if (state) {
                if (state) state.val = (`// This is from a template in c.peg, variable r is next:
                ${r}
                // This is from a template in c.peg, just finished with variable r
                State parse_char(str input, int pos) {
                  if (pos >= len(input)) return null();
                  return (State){ .pos=pos+1, .val=input[pos], valid=true };
                }
                State literal(str input, int pos, str string) {
                  if (strncmp(&input[pos], string, len(string) == 0)) {
                    return { .pos=pos+len(string), .val=string, .valid=true };
                  } else return null();
                }
                
                str = read(argv[1]);
                State out = parse_sentence(src, 0);                
                printf("%s\n", out.val);
                    
                `);
            }
        }

    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_meta(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = literal(input, state.pos, '!');
    if (state) {}

    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, '\'');
        if (state) {}

        if (!state) {
            state = stack.pop();
            stack.push(state);
            state = literal(input, state.pos, '<-');
            if (state) {}

            if (!state) {
                state = stack.pop();
                stack.push(state);
                state = literal(input, state.pos, '/');
                if (state) {}

                if (!state) {
                    state = stack.pop();
                    stack.push(state);
                    state = literal(input, state.pos, '.');
                    if (state) {}

                    if (!state) {
                        state = stack.pop();
                        stack.push(state);
                        state = literal(input, state.pos, '(');
                        if (state) {}

                        if (!state) {
                            state = stack.pop();
                            stack.push(state);
                            state = literal(input, state.pos, ')');
                            if (state) {}

                            if (!state) {
                                state = stack.pop();
                                stack.push(state);
                                state = literal(input, state.pos, ':');
                                if (state) {}

                                if (!state) {
                                    state = stack.pop();
                                    state = literal(input, state.pos, '->');
                                    if (state) {}

                                }
                                else {
                                    stack.pop();
                                }
                            }
                            else {
                                stack.pop();
                            }
                        }
                        else {
                            stack.pop();
                        }
                    }
                    else {
                        stack.pop();
                    }
                }
                else {
                    stack.pop();
                }
            }
            else {
                stack.pop();
            }
        }
        else {
            stack.pop();
        }
    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_name(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_namechar(input, state.pos);
    if (state) var c = state.val;
    if (state) {
        state = parse_name(input, state.pos);
        if (state) var n = state.val;
        if (state) {
            if (state) state.val = (c + n);
        }
    }

    if (!state) {
        state = stack.pop();
        state = parse_namechar(input, state.pos);
        if (state) {}

    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_namechar(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_meta(input, state.pos);

    if (state) {
        stack.pop();
        state = null;
    }
    else {
        state = stack.pop();
    }
    if (state) {
        stack.push(state);
        state = parse_sp(input, state.pos);

        if (state) {
            stack.pop();
            state = null;
        }
        else {
            state = stack.pop();
        }
        if (state) {
            state = parse_char(input, state.pos);
            if (state) {}
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_term(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_labeled(input, state.pos);
    if (state) {}

    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = parse_nonterminal(input, state.pos);
        if (state) {}

        if (!state) {
            state = stack.pop();
            stack.push(state);
            state = parse_string(input, state.pos);
            if (state) {}

            if (!state) {
                state = stack.pop();
                stack.push(state);
                state = parse_negation(input, state.pos);
                if (state) {}

                if (!state) {
                    state = stack.pop();
                    state = parse_parenthesized(input, state.pos);
                    if (state) {}

                }
                else {
                    stack.pop();
                }
            }
            else {
                stack.pop();
            }
        }
        else {
            stack.pop();
        }
    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_nonterminal(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state) var n = state.val;
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            if (state) state.val = (`  state = parse_${n}(input, state.pos);\n`);
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_labeled(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state) var label = state.val;
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = literal(input, state.pos, ':');
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    state = parse_term(input, state.pos);
                    if (state) var value = state.val;
                    if (state) {
                        if (state) state.val = (`${value} if (state.valid) str ${label} = state.val;\n`);
                    }
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_sequence(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_term(input, state.pos);
    if (state) var foo = state.val;
    if (state) {
        state = parse_sequence(input, state.pos);
        if (state) var bar = state.val;
        if (state) {
            if (state) state.val = (`${foo}  if (state.valid) { ${bar} }\n`);
        }
    }

    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = parse_result_expression(input, state.pos);
        if (state) {}

        if (!state) {
            state = stack.pop();
            if (state) state.val = ('');

        }
        else {
            stack.pop();
        }
    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_string(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = literal(input, state.pos, '\'');
    if (state) {
        state = parse_stringcontents(input, state.pos);
        if (state) var s = state.val;
        if (state) {
            state = literal(input, state.pos, '\'');
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    if (state) state.val = (`  state = literal(input, state.pos, "${s}");\n`);
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_stringcontents(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    stack.push(state);
    state = literal(input, state.pos, '\\');

    if (state) {
        stack.pop();
        state = null;
    }
    else {
        state = stack.pop();
    }
    if (state) {
        stack.push(state);
        state = literal(input, state.pos, '\'');

        if (state) {
            stack.pop();
            state = null;
        }
        else {
            state = stack.pop();
        }
        if (state) {
            state = parse_char(input, state.pos);
            if (state) var c = state.val;
            if (state) {
                state = parse_stringcontents(input, state.pos);
                if (state) var s = state.val;
                if (state) {
                    if (state) state.val = (c + s);
                }
            }
        }
    }

    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, '\\');
        if (state) var b = state.val;
        if (state) {
            state = parse_char(input, state.pos);
            if (state) var c = state.val;
            if (state) {
                state = parse_stringcontents(input, state.pos);
                if (state) var s = state.val;
                if (state) {
                    if (state) state.val = (b + c + s);
                }
            }
        }

        if (!state) {
            state = stack.pop();
            if (state) state.val = ('');

        }
        else {
            stack.pop();
        }
    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_choice(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    state = parse_sequence(input, state.pos);
    if (state) var a = state.val;
    if (state) {
        state = literal(input, state.pos, '/');
        if (state) {
            state = parse__(input, state.pos);
            if (state) {
                state = parse_choice(input, state.pos);
                if (state) var b = state.val;
                if (state) {
                    if (state) state.val = (`  push(state);
                      ${a}
                      if (!state.valid) {
                        state = pop();
                        ${b}
                      } else { pop(); }`);
                }
            }
        }
    }

    if (!state) {
        state = stack.pop();
        state = parse_sequence(input, state.pos);
        if (state) {}

    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg
function parse_negation(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = literal(input, state.pos, '!');
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_term(input, state.pos);
            if (state) var t = state.val;
            if (state) {
                if (state) state.val = (`push(state);
                  ${t}
                  if (state.valid) {
                    pop();
                    state = null();
                  } else { state = pop(); }`);
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_result_expression(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = literal(input, state.pos, '->');
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_expr(input, state.pos);
            if (state) var result = state.val;
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    if (state) state.val = (`if (state.valid) state.val = ${result};\n`);
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_expr(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = literal(input, state.pos, '(');
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_exprcontents(input, state.pos);
            if (state) var e = state.val;
            if (state) {
                state = literal(input, state.pos, ')');
                if (state) {
                    if (state) state.val = (`(${e})`);
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg
function parse_exprcontents(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    stack.push(state);
    stack.push(state);
    stack.push(state);
    state = literal(input, state.pos, '(');

    if (state) {
        stack.pop();
        state = null;
    }
    else {
        state = stack.pop();
    }
    if (state) {
        stack.push(state);
        state = literal(input, state.pos, ')');

        if (state) {
            stack.pop();
            state = null;
        }
        else {
            state = stack.pop();
        }
        if (state) {
            state = parse_char(input, state.pos);
            if (state) {}
        }
    }

    if (!state) {
        state = stack.pop();
        state = parse_expr(input, state.pos);
        if (state) {}

    }
    else {
        stack.pop();
    }
    if (state) var c = state.val;
    if (state) {
        state = parse_exprcontents(input, state.pos);
        if (state) var e = state.val;
        if (state) {
            if (state) state.val = (c + e);
        }
    }

    if (!state) {
        state = stack.pop();
        if (state) state.val = ('');

    }
    else {
        stack.pop();
    }
    return state;
}
// This is from a template in b.peg, variable r is next:
// This is from a template in b.peg
function parse_parenthesized(input, pos) {
    var state = {
        pos: pos
    };
    var stack = [];
    // Not sure where this body is coming from
    state = literal(input, state.pos, '(');
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_choice(input, state.pos);
            if (state) var body = state.val;
            if (state) {
                state = literal(input, state.pos, ')');
                if (state) {
                    state = parse__(input, state.pos);
                    if (state) {
                        if (state) state.val = (body);
                    }
                }
            }
        }
    }

    return state;
}
// This is from a template in b.peg, just finished with variable r
function parse_char(input, pos) {
    if (pos >= input.length) return null;
    return {
        pos: pos + 1,
        val: input.charAt(pos)
    };
}

function literal(input, pos, string) {
    if (input.substr(pos, string.length) === string) {
        return {
            pos: pos + string.length,
            val: string
        };
    }
    else return null;
}
var fs = require('fs');
var grammarfile = process.argv.slice(2)[0];
fs.readFile(grammarfile, function(err, data) {
    if (err) {
        throw err;
    }
    var out = parse_sentence(data.toString(), 0);
    console.log(out.val);
});

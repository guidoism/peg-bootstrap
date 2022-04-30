function parse_sp(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = literal(input, state.pos, " ");
    if (state) {}
    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, "\n");
        if (state) {}
        if (!state) {
            state = stack.pop();
            state = literal(input, state.pos, "\t");
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

function parse__(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
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

function parse_rule(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = parse_name(input, state.pos);
    if (state) {
        vars["n"] = state.val;
    }
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = literal(input, state.pos, "<-");
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    state = parse_choice(input, state.pos);
                    if (state) {
                        vars["body"] = state.val;
                    }
                    if (state) {
                        state = literal(input, state.pos, ".");
                        if (state) {
                            state = parse__(input, state.pos);
                            if (state) {
                                if (state) {
                                    state.val = (format(["function parse_",
                                        vars["n"],
                                        "(input, pos) { let state = { pos: pos }; let stack = []; ",
                                        "let vars = {}",
                                        vars["body"],
                                        " return state; }"
                                    ]));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return state;
}

function parse_grammar(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = parse__(input, state.pos);
    if (state) {
        state = parse_rule(input, state.pos);
        if (state) {
            vars["r"] = state.val;
        }
        if (state) {
            state = parse_grammar(input, state.pos);
            if (state) {
                vars["g"] = state.val;
            }
            if (state) {
                if (state) {
                    state.val = (format([vars["r"], " ", vars["g"]]));
                }
            }
        }
    }
    if (!state) {
        state = stack.pop();
        state = parse__(input, state.pos);
        if (state) {
            state = parse_rule(input, state.pos);
            if (state) {
                vars["r"] = state.val;
            }
            if (state) {
                if (state) {
                    state.val = (format(["// This is from a template in peg.org:\n", vars["r"],
                        ` function parse_char(input, pos) {
     if (pos >= input.length) return null;
     return { pos: pos + 1, val: input.charAt(pos) };
   }
   function literal(input, pos, string) {
     if (input.substr(pos, string.length) === string) {
       return { pos: pos + string.length, val: string };
     } else return null;
   }
   let format = (parts) => parts.join('')
   var fs = require(\'fs\');
   var grammarfile = process.argv.slice(2)[0];
   fs.readFile(grammarfile, function(err, data) {
       if (err) {
	   throw err; 
       }
       var out = parse_grammar(data.toString(), 0);
       console.log(out.val);
   });`
                    ]));
                }
            }
        }
    }
    else {
        stack.pop();
    }
    return state;
}

function parse_meta(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = literal(input, state.pos, "!");
    if (state) {}
    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, "\'");
        if (state) {}
        if (!state) {
            state = stack.pop();
            stack.push(state);
            state = literal(input, state.pos, "<-");
            if (state) {}
            if (!state) {
                state = stack.pop();
                stack.push(state);
                state = literal(input, state.pos, "/");
                if (state) {}
                if (!state) {
                    state = stack.pop();
                    stack.push(state);
                    state = literal(input, state.pos, ".");
                    if (state) {}
                    if (!state) {
                        state = stack.pop();
                        stack.push(state);
                        state = literal(input, state.pos, "(");
                        if (state) {}
                        if (!state) {
                            state = stack.pop();
                            stack.push(state);
                            state = literal(input, state.pos, ")");
                            if (state) {}
                            if (!state) {
                                state = stack.pop();
                                stack.push(state);
                                state = literal(input, state.pos, ":");
                                if (state) {}
                                if (!state) {
                                    state = stack.pop();
                                    state = literal(input, state.pos, "->");
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

function parse_name(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = parse_namechar(input, state.pos);
    if (state) {
        vars["c"] = state.val;
    }
    if (state) {
        state = parse_name(input, state.pos);
        if (state) {
            vars["n"] = state.val;
        }
        if (state) {
            if (state) {
                state.val = (format([vars["c"], vars["n"]]));
            }
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

function parse_namechar(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
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

function parse_term(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
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

function parse_nonterminal(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = parse_name(input, state.pos);
    if (state) {
        vars["n"] = state.val;
    }
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            if (state) {
                state.val = (format(["state = parse_", vars["n"], "(input, state.pos);"]));
            }
        }
    }
    return state;
}

function parse_labeled(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = parse_name(input, state.pos);
    if (state) {
        vars["label"] = state.val;
    }
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = literal(input, state.pos, ":");
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    state = parse_term(input, state.pos);
                    if (state) {
                        vars["value"] = state.val;
                    }
                    if (state) {
                        if (state) {
                            state.val = (format([vars["value"],
                                " if (state) { vars[\"",
                                vars["label"],
                                "\"] = state.val; }"
                            ]));
                        }
                    }
                }
            }
        }
    }
    return state;
}

function parse_sequence(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = parse_term(input, state.pos);
    if (state) {
        vars["foo"] = state.val;
    }
    if (state) {
        state = parse_sequence(input, state.pos);
        if (state) {
            vars["bar"] = state.val;
        }
        if (state) {
            if (state) {
                state.val = (format([vars["foo"],
                    " if (state) { ",
                    vars["bar"],
                    " } "
                ]));
            }
        }
    }
    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = parse_result_expression(input, state.pos);
        if (state) {}
        if (!state) {
            state = stack.pop();
            if (state) {
                state.val = ("");
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

function parse_string(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "\'");
    if (state) {
        state = parse_stringcontents(input, state.pos);
        if (state) {
            vars["s"] = state.val;
        }
        if (state) {
            state = literal(input, state.pos, "\'");
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    if (state) {
                        state.val = (format(["state = literal(input, state.pos, \"",
                            vars["s"],
                            "\");"
                        ]));
                    }
                }
            }
        }
    }
    return state;
}

function parse_stringcontents(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    stack.push(state);
    state = literal(input, state.pos, "\\");
    if (state) {
        stack.pop();
        state = null;
    }
    else {
        state = stack.pop();
    }
    if (state) {
        stack.push(state);
        state = literal(input, state.pos, "\'");
        if (state) {
            stack.pop();
            state = null;
        }
        else {
            state = stack.pop();
        }
        if (state) {
            state = parse_char(input, state.pos);
            if (state) {
                vars["c"] = state.val;
            }
            if (state) {
                state = parse_stringcontents(input, state.pos);
                if (state) {
                    vars["s"] = state.val;
                }
                if (state) {
                    if (state) {
                        state.val = (format([vars["c"], vars["s"]]));
                    }
                }
            }
        }
    }
    if (!state) {
        state = stack.pop();
        stack.push(state);
        state = literal(input, state.pos, "\\");
        if (state) {
            vars["b"] = state.val;
        }
        if (state) {
            state = parse_char(input, state.pos);
            if (state) {
                vars["c"] = state.val;
            }
            if (state) {
                state = parse_stringcontents(input, state.pos);
                if (state) {
                    vars["s"] = state.val;
                }
                if (state) {
                    if (state) {
                        state.val = (format([vars["b"], vars["c"], vars["s"]]));
                    }
                }
            }
        }
        if (!state) {
            state = stack.pop();
            if (state) {
                state.val = ("");
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

function parse_choice(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    state = parse_sequence(input, state.pos);
    if (state) {
        vars["a"] = state.val;
    }
    if (state) {
        state = literal(input, state.pos, "/");
        if (state) {
            state = parse__(input, state.pos);
            if (state) {
                state = parse_choice(input, state.pos);
                if (state) {
                    vars["b"] = state.val;
                }
                if (state) {
                    if (state) {
                        state.val = (format(["stack.push(state); ",
                            vars["a"],
                            " if (!state) {state = stack.pop(); ",
                            vars["b"],
                            "} else { stack.pop(); }"
                        ]));
                    }
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

function parse_negation(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "!");
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_term(input, state.pos);
            if (state) {
                vars["t"] = state.val;
            }
            if (state) {
                if (state) {
                    state.val = (format([" stack.push(state);",
                        vars["t"],
                        "if (state) { stack.pop(); state = null; }",
                        "else { state = stack.pop(); }"
                    ]));
                }
            }
        }
    }
    return state;
}

function parse_result_expression(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "->");
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_expr(input, state.pos);
            if (state) {
                vars["result"] = state.val;
            }
            if (state) {
                state = parse__(input, state.pos);
                if (state) {
                    if (state) {
                        state.val = (format(["if (state) { state.val = ",
                            vars["result"],
                            "; }"
                        ]));
                    }
                }
            }
        }
    }
    return state;
}

function parse_expr(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "(");
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_exprcontents(input, state.pos);
            if (state) {
                vars["e"] = state.val;
            }
            if (state) {
                state = literal(input, state.pos, ")");
                if (state) {
                    if (state) {
                        state.val = (format(["(", vars["e"], ")"]));
                    }
                }
            }
        }
    }
    return state;
}

function parse_exprcontents(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    stack.push(state);
    stack.push(state);
    stack.push(state);
    state = literal(input, state.pos, "(");
    if (state) {
        stack.pop();
        state = null;
    }
    else {
        state = stack.pop();
    }
    if (state) {
        stack.push(state);
        state = literal(input, state.pos, ")");
        if (state) {
            stack.pop();
            state = null;
        }
        else {
            state = stack.pop();
        }
        if (state) {
            stack.push(state);
            state = parse_location(input, state.pos);
            if (state) {}
            if (!state) {
                state = stack.pop();
                state = parse_char(input, state.pos);
                if (state) {}
            }
            else {
                stack.pop();
            }
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
    if (state) {
        vars["c"] = state.val;
    }
    if (state) {
        state = parse_exprcontents(input, state.pos);
        if (state) {
            vars["e"] = state.val;
        }
        if (state) {
            if (state) {
                state.val = (format([vars["c"], vars["e"]]));
            }
        }
    }
    if (!state) {
        state = stack.pop();
        if (state) {
            state.val = ("");
        }
    }
    else {
        stack.pop();
    }
    return state;
}

function parse_location(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "§");
    if (state) {
        state = parse_name(input, state.pos);
        if (state) {
            vars["n"] = state.val;
        }
        if (state) {
            if (state) {
                state.val = ("POOP");
            }
        }
    }
    return state;
} // This is from a template in peg.org:
function parse_parenthesized(input, pos) {
    let state = {
        pos: pos
    };
    let stack = [];
    let vars = {}
    state = literal(input, state.pos, "(");
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            state = parse_choice(input, state.pos);
            if (state) {
                vars["body"] = state.val;
            }
            if (state) {
                state = literal(input, state.pos, ")");
                if (state) {
                    state = parse__(input, state.pos);
                    if (state) {
                        if (state) {
                            state.val = (format([vars["body"]]));
                        }
                    }
                }
            }
        }
    }
    return state;
}

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
let format = (parts) => parts.join('')
var fs = require('fs');
var grammarfile = process.argv.slice(2)[0];
fs.readFile(grammarfile, function(err, data) {
    if (err) {
        throw err;
    }
    var out = parse_grammar(data.toString(), 0);
    console.log(out.val);
});

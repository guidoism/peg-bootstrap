function parse_sp(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    state = literal(input, state.pos, " ");
    if (state) {}
    if (!state) {
        state = pop();
        push(state);
        state = literal(input, state.pos, "\n");
        if (state) {}
        if (!state) {
            state = pop();
            state = literal(input, state.pos, "\t");
            if (state) {}
        }
        else {
            pop();
        }
    }
    else {
        pop();
    }
    return state;
}

function parse__(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    state = parse_sp(input, state.pos);
    if (state) {
        state = parse__(input, state.pos);
        if (state) {}
    }
    if (!state) {
        state = pop();
    }
    else {
        pop();
    }
    return state;
}

function parse_rule(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                                        getvar("n"),
                                        "(pos) { ",
                                        "let fn = ", nextfn(), "; ",
                                        "let state = { pos: pos, valid: true }; ",
                                        "let getvar = (k) => getvar_(fn, pos, k); ",
                                        "let setvar = (k, v) => setvar_(fn, pos, k, v); ",
                                        getvar("body"),
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
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
                    state.val = (format([getvar("r"), " ", getvar("g")]));
                }
            }
        }
    }
    if (!state) {
        state = pop();
        state = parse__(input, state.pos);
        if (state) {
            state = parse_rule(input, state.pos);
            if (state) {
                vars["r"] = state.val;
            }
            if (state) {
                if (state) {
                    state.val = (format(["// This is from a template in peg.org:\n", getvar("r"),
                        ` function parse_char(pos) {
     if (pos >= input.length) return { valid: false };
     return { pos: pos + 1, val: input.charAt(pos), valid: true };
   }
   function literal(pos, string) {
     if (input.substr(pos, string.length) === string) {
       return { pos: pos + string.length, val: string, valid: true };
     } else return { valid: false };
   }

   let fnnum = 0
   let nextfn = () => {
     fnnum += 1
     return fnnum
   }
   let input = ""

   let varkey = (fn, pos, k) => [fn, pos, k].join('-')
   let getvar_ = (fn, pos, k) => {
     let kk = varkey(fn, pos, k)
     let i = varbuf.length - 1
     while (i >= 0) {
       if (varbuf[i][0] === kk) {
         let h = varbuf[i][1]
         return getstr(h)
       }
       i -= 1
     }
     return null
   }
   let setvar_ = (fn, pos, k, v) => {
     let kk = varkey(fn, pos, k)
     let h = storestr(v)
     varbuf.push([kk, h])
   }
   let storestr = (s) => {
     let handle = strbuf.length
     strbuf.push(s.length)
     s.split('').map(c => {
       strbuf.push(c)
     })
     return handle
   }
   let getstr = (h) => {
     let len = strbuf[h]
     return strbuf.slice(h+1, h+1+len).join('')
   }

   let stack = []
   let varbuf = []
   let strbuf = []

   let push = (o) => stack.push(o)
   let pop = () => stack.pop()

   let format = (parts) => {
     return parts.join('')
   }

   var fs = require(\'fs\');
   var grammarfile = process.argv.slice(2)[0];
   fs.readFile(grammarfile, function(err, data) {
       if (err) {
           throw err; 
       }
       input = data.toString()
       var out = parse_grammar(0);
       console.log(out.val);
       console.warn('strbuf size:', strbuf.length)
       console.warn('varbuf size:', varbuf.length)
   });`
                    ]));
                }
            }
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_meta(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    state = literal(input, state.pos, "!");
    if (state) {}
    if (!state) {
        state = pop();
        push(state);
        state = literal(input, state.pos, "\'");
        if (state) {}
        if (!state) {
            state = pop();
            push(state);
            state = literal(input, state.pos, "<-");
            if (state) {}
            if (!state) {
                state = pop();
                push(state);
                state = literal(input, state.pos, "/");
                if (state) {}
                if (!state) {
                    state = pop();
                    push(state);
                    state = literal(input, state.pos, ".");
                    if (state) {}
                    if (!state) {
                        state = pop();
                        push(state);
                        state = literal(input, state.pos, "(");
                        if (state) {}
                        if (!state) {
                            state = pop();
                            push(state);
                            state = literal(input, state.pos, ")");
                            if (state) {}
                            if (!state) {
                                state = pop();
                                push(state);
                                state = literal(input, state.pos, ":");
                                if (state) {}
                                if (!state) {
                                    state = pop();
                                    state = literal(input, state.pos, "->");
                                    if (state) {}
                                }
                                else {
                                    pop();
                                }
                            }
                            else {
                                pop();
                            }
                        }
                        else {
                            pop();
                        }
                    }
                    else {
                        pop();
                    }
                }
                else {
                    pop();
                }
            }
            else {
                pop();
            }
        }
        else {
            pop();
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_name(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
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
                state.val = (format([getvar("c"), getvar("n")]));
            }
        }
    }
    if (!state) {
        state = pop();
        state = parse_namechar(input, state.pos);
        if (state) {}
    }
    else {
        pop();
    }
    return state;
}

function parse_namechar(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    state = parse_meta(input, state.pos);
    if (state) {
        pop();
        state = null;
    }
    else {
        state = pop();
    }
    if (state) {
        push(state);
        state = parse_sp(input, state.pos);
        if (state) {
            pop();
            state = null;
        }
        else {
            state = pop();
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    state = parse_labeled(input, state.pos);
    if (state) {}
    if (!state) {
        state = pop();
        push(state);
        state = parse_nonterminal(input, state.pos);
        if (state) {}
        if (!state) {
            state = pop();
            push(state);
            state = parse_string(input, state.pos);
            if (state) {}
            if (!state) {
                state = pop();
                push(state);
                state = parse_negation(input, state.pos);
                if (state) {}
                if (!state) {
                    state = pop();
                    state = parse_parenthesized(input, state.pos);
                    if (state) {}
                }
                else {
                    pop();
                }
            }
            else {
                pop();
            }
        }
        else {
            pop();
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_nonterminal(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    state = parse_name(input, state.pos);
    if (state) {
        vars["n"] = state.val;
    }
    if (state) {
        state = parse__(input, state.pos);
        if (state) {
            if (state) {
                state.val = (format(["state = parse_", getvar("n"), "(state.pos);"]));
            }
        }
    }
    return state;
}

function parse_labeled(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                            state.val = (format([getvar("value"),
                                " if (state.valid) {",
                                " setvar(\"", getvar("label"), "\", state.val);",
                                " }"
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
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
                state.val = (format([getvar("foo"),
                    " if (state.valid) { ",
                    getvar("bar"),
                    " } "
                ]));
            }
        }
    }
    if (!state) {
        state = pop();
        push(state);
        state = parse_result_expression(input, state.pos);
        if (state) {}
        if (!state) {
            state = pop();
            if (state) {
                state.val = ("");
            }
        }
        else {
            pop();
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_string(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                        state.val = (format(["state = literal(state.pos, \"",
                            getvar("s"),
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    push(state);
    state = literal(input, state.pos, "\\");
    if (state) {
        pop();
        state = null;
    }
    else {
        state = pop();
    }
    if (state) {
        push(state);
        state = literal(input, state.pos, "\'");
        if (state) {
            pop();
            state = null;
        }
        else {
            state = pop();
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
                        state.val = (format([getvar("c"), getvar("s")]));
                    }
                }
            }
        }
    }
    if (!state) {
        state = pop();
        push(state);
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
                        state.val = (format([getvar("b"), getvar("c"), getvar("s")]));
                    }
                }
            }
        }
        if (!state) {
            state = pop();
            if (state) {
                state.val = ("");
            }
        }
        else {
            pop();
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_choice(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
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
                        state.val = (format(["push(state); ",
                            getvar("a"),
                            " if (!state.valid) { state = pop(); ",
                            getvar("b"),
                            "} else { pop(); }"
                        ]));
                    }
                }
            }
        }
    }
    if (!state) {
        state = pop();
        state = parse_sequence(input, state.pos);
        if (state) {}
    }
    else {
        pop();
    }
    return state;
}

function parse_negation(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                    state.val = (format([" push(state);",
                        getvar("t"),
                        "if (state.valid) { pop(); state.valid = false; }",
                        "else { state = pop(); }"
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                        state.val = (format(["if (state.valid) { state.val = ",
                            getvar("result"),
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                        state.val = (format(["(", getvar("e"), ")"]));
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
    push(state);
    push(state);
    push(state);
    state = literal(input, state.pos, "(");
    if (state) {
        pop();
        state = null;
    }
    else {
        state = pop();
    }
    if (state) {
        push(state);
        state = literal(input, state.pos, ")");
        if (state) {
            pop();
            state = null;
        }
        else {
            state = pop();
        }
        if (state) {
            push(state);
            state = parse_location(input, state.pos);
            if (state) {}
            if (!state) {
                state = pop();
                state = parse_char(input, state.pos);
                if (state) {}
            }
            else {
                pop();
            }
            if (state) {}
        }
    }
    if (!state) {
        state = pop();
        state = parse_expr(input, state.pos);
        if (state) {}
    }
    else {
        pop();
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
                state.val = (format([getvar("c"), getvar("e")]));
            }
        }
    }
    if (!state) {
        state = pop();
        if (state) {
            state.val = ("");
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_location(input, pos) {
    let state = {
        pos: pos
    };
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
    let vars = {};
    let getvar = (k) => vars[k];
    let setvar = (k, v) => {
        vars[k] = v;
    };
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
                            state.val = (format([getvar("body")]));
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

let fnnum = 0
let nextfn = () => {
    fnnum += 1
    return fnnum
}
let stack = []
let push = (o) => stack.push(o)
let pop = () => stack.pop()

let format = (parts) => {
    return parts.join('')
}
var fs = require('fs');
var grammarfile = process.argv.slice(2)[0];
fs.readFile(grammarfile, function(err, data) {
    if (err) {
        throw err;
    }
    var out = parse_grammar(data.toString(), 0);
    console.log(out.val);
});

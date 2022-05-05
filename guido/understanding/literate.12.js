function parse_sp(pos) {
    let fn = 1;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = literal(state.pos, " ");
    if (state.valid) {}
    if (!state.valid) {
        state = pop();
        push(state);
        state = literal(state.pos, "\n");
        if (state.valid) {}
        if (!state.valid) {
            state = pop();
            state = literal(state.pos, "\t");
            if (state.valid) {}
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

function parse__(pos) {
    let fn = 2;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_sp(state.pos);
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {}
    }
    if (!state.valid) {
        state = pop();
    }
    else {
        pop();
    }
    return state;
}

function parse_rule(pos) {
    let fn = 3;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = parse_name(state.pos);
    if (state.valid) {
        setvar("n", state.val);
    }
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = literal(state.pos, "<-");
            if (state.valid) {
                state = parse__(state.pos);
                if (state.valid) {
                    state = parse_choice(state.pos);
                    if (state.valid) {
                        setvar("body", state.val);
                    }
                    if (state.valid) {
                        state = literal(state.pos, ".");
                        if (state.valid) {
                            state = parse__(state.pos);
                            if (state.valid) {
                                if (state.valid) {
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

function parse_grammar(pos) {
    let fn = 4;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse__(state.pos);
    if (state.valid) {
        state = parse_rule(state.pos);
        if (state.valid) {
            setvar("r", state.val);
        }
        if (state.valid) {
            state = parse_grammar(state.pos);
            if (state.valid) {
                setvar("g", state.val);
            }
            if (state.valid) {
                if (state.valid) {
                    state.val = (format([getvar("r"), " ", getvar("g")]));
                }
            }
        }
    }
    if (!state.valid) {
        state = pop();
        state = parse__(state.pos);
        if (state.valid) {
            state = parse_rule(state.pos);
            if (state.valid) {
                setvar("r", state.val);
            }
            if (state.valid) {
                if (state.valid) {
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

function parse_meta(pos) {
    let fn = 5;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = literal(state.pos, "!");
    if (state.valid) {}
    if (!state.valid) {
        state = pop();
        push(state);
        state = literal(state.pos, "\'");
        if (state.valid) {}
        if (!state.valid) {
            state = pop();
            push(state);
            state = literal(state.pos, "<-");
            if (state.valid) {}
            if (!state.valid) {
                state = pop();
                push(state);
                state = literal(state.pos, "/");
                if (state.valid) {}
                if (!state.valid) {
                    state = pop();
                    push(state);
                    state = literal(state.pos, ".");
                    if (state.valid) {}
                    if (!state.valid) {
                        state = pop();
                        push(state);
                        state = literal(state.pos, "(");
                        if (state.valid) {}
                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = literal(state.pos, ")");
                            if (state.valid) {}
                            if (!state.valid) {
                                state = pop();
                                push(state);
                                state = literal(state.pos, ":");
                                if (state.valid) {}
                                if (!state.valid) {
                                    state = pop();
                                    state = literal(state.pos, "->");
                                    if (state.valid) {}
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

function parse_name(pos) {
    let fn = 6;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_namechar(state.pos);
    if (state.valid) {
        setvar("c", state.val);
    }
    if (state.valid) {
        state = parse_name(state.pos);
        if (state.valid) {
            setvar("n", state.val);
        }
        if (state.valid) {
            if (state.valid) {
                state.val = (format([getvar("c"), getvar("n")]));
            }
        }
    }
    if (!state.valid) {
        state = pop();
        state = parse_namechar(state.pos);
        if (state.valid) {}
    }
    else {
        pop();
    }
    return state;
}

function parse_namechar(pos) {
    let fn = 7;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_meta(state.pos);
    if (state.valid) {
        pop();
        state.valid = false;
    }
    else {
        state = pop();
    }
    if (state.valid) {
        push(state);
        state = parse_sp(state.pos);
        if (state.valid) {
            pop();
            state.valid = false;
        }
        else {
            state = pop();
        }
        if (state.valid) {
            state = parse_char(state.pos);
            if (state.valid) {}
        }
    }
    return state;
}

function parse_term(pos) {
    let fn = 8;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_labeled(state.pos);
    if (state.valid) {}
    if (!state.valid) {
        state = pop();
        push(state);
        state = parse_nonterminal(state.pos);
        if (state.valid) {}
        if (!state.valid) {
            state = pop();
            push(state);
            state = parse_string(state.pos);
            if (state.valid) {}
            if (!state.valid) {
                state = pop();
                push(state);
                state = parse_negation(state.pos);
                if (state.valid) {}
                if (!state.valid) {
                    state = pop();
                    state = parse_parenthesized(state.pos);
                    if (state.valid) {}
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

function parse_nonterminal(pos) {
    let fn = 9;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = parse_name(state.pos);
    if (state.valid) {
        setvar("n", state.val);
    }
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            if (state.valid) {
                state.val = (format(["state = parse_", getvar("n"), "(state.pos);"]));
            }
        }
    }
    return state;
}

function parse_labeled(pos) {
    let fn = 10;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = parse_name(state.pos);
    if (state.valid) {
        setvar("label", state.val);
    }
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = literal(state.pos, ":");
            if (state.valid) {
                state = parse__(state.pos);
                if (state.valid) {
                    state = parse_term(state.pos);
                    if (state.valid) {
                        setvar("value", state.val);
                    }
                    if (state.valid) {
                        if (state.valid) {
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

function parse_sequence(pos) {
    let fn = 11;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_term(state.pos);
    if (state.valid) {
        setvar("foo", state.val);
    }
    if (state.valid) {
        state = parse_sequence(state.pos);
        if (state.valid) {
            setvar("bar", state.val);
        }
        if (state.valid) {
            if (state.valid) {
                state.val = (format([getvar("foo"),
                    " if (state.valid) { ",
                    getvar("bar"),
                    " } "
                ]));
            }
        }
    }
    if (!state.valid) {
        state = pop();
        push(state);
        state = parse_result_expression(state.pos);
        if (state.valid) {}
        if (!state.valid) {
            state = pop();
            if (state.valid) {
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

function parse_string(pos) {
    let fn = 12;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "\'");
    if (state.valid) {
        state = parse_stringcontents(state.pos);
        if (state.valid) {
            setvar("s", state.val);
        }
        if (state.valid) {
            state = literal(state.pos, "\'");
            if (state.valid) {
                state = parse__(state.pos);
                if (state.valid) {
                    if (state.valid) {
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

function parse_stringcontents(pos) {
    let fn = 13;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    push(state);
    state = literal(state.pos, "\\");
    if (state.valid) {
        pop();
        state.valid = false;
    }
    else {
        state = pop();
    }
    if (state.valid) {
        push(state);
        state = literal(state.pos, "\'");
        if (state.valid) {
            pop();
            state.valid = false;
        }
        else {
            state = pop();
        }
        if (state.valid) {
            state = parse_char(state.pos);
            if (state.valid) {
                setvar("c", state.val);
            }
            if (state.valid) {
                state = parse_stringcontents(state.pos);
                if (state.valid) {
                    setvar("s", state.val);
                }
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format([getvar("c"), getvar("s")]));
                    }
                }
            }
        }
    }
    if (!state.valid) {
        state = pop();
        push(state);
        state = literal(state.pos, "\\");
        if (state.valid) {
            setvar("b", state.val);
        }
        if (state.valid) {
            state = parse_char(state.pos);
            if (state.valid) {
                setvar("c", state.val);
            }
            if (state.valid) {
                state = parse_stringcontents(state.pos);
                if (state.valid) {
                    setvar("s", state.val);
                }
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format([getvar("b"), getvar("c"), getvar("s")]));
                    }
                }
            }
        }
        if (!state.valid) {
            state = pop();
            if (state.valid) {
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

function parse_choice(pos) {
    let fn = 14;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    state = parse_sequence(state.pos);
    if (state.valid) {
        setvar("a", state.val);
    }
    if (state.valid) {
        state = literal(state.pos, "/");
        if (state.valid) {
            state = parse__(state.pos);
            if (state.valid) {
                state = parse_choice(state.pos);
                if (state.valid) {
                    setvar("b", state.val);
                }
                if (state.valid) {
                    if (state.valid) {
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
    if (!state.valid) {
        state = pop();
        state = parse_sequence(state.pos);
        if (state.valid) {}
    }
    else {
        pop();
    }
    return state;
}

function parse_negation(pos) {
    let fn = 15;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "!");
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = parse_term(state.pos);
            if (state.valid) {
                setvar("t", state.val);
            }
            if (state.valid) {
                if (state.valid) {
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

function parse_result_expression(pos) {
    let fn = 16;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "->");
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = parse_expr(state.pos);
            if (state.valid) {
                setvar("result", state.val);
            }
            if (state.valid) {
                state = parse__(state.pos);
                if (state.valid) {
                    if (state.valid) {
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

function parse_expr(pos) {
    let fn = 17;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "(");
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = parse_exprcontents(state.pos);
            if (state.valid) {
                setvar("e", state.val);
            }
            if (state.valid) {
                state = literal(state.pos, ")");
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format(["(", getvar("e"), ")"]));
                    }
                }
            }
        }
    }
    return state;
}

function parse_exprcontents(pos) {
    let fn = 18;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    push(state);
    push(state);
    push(state);
    state = literal(state.pos, "(");
    if (state.valid) {
        pop();
        state.valid = false;
    }
    else {
        state = pop();
    }
    if (state.valid) {
        push(state);
        state = literal(state.pos, ")");
        if (state.valid) {
            pop();
            state.valid = false;
        }
        else {
            state = pop();
        }
        if (state.valid) {
            push(state);
            state = parse_location(state.pos);
            if (state.valid) {}
            if (!state.valid) {
                state = pop();
                state = parse_char(state.pos);
                if (state.valid) {}
            }
            else {
                pop();
            }
            if (state.valid) {}
        }
    }
    if (!state.valid) {
        state = pop();
        state = parse_expr(state.pos);
        if (state.valid) {}
    }
    else {
        pop();
    }
    if (state.valid) {
        setvar("c", state.val);
    }
    if (state.valid) {
        state = parse_exprcontents(state.pos);
        if (state.valid) {
            setvar("e", state.val);
        }
        if (state.valid) {
            if (state.valid) {
                state.val = (format([getvar("c"), getvar("e")]));
            }
        }
    }
    if (!state.valid) {
        state = pop();
        if (state.valid) {
            state.val = ("");
        }
    }
    else {
        pop();
    }
    return state;
}

function parse_location(pos) {
    let fn = 19;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "§");
    if (state.valid) {
        state = parse_name(state.pos);
        if (state.valid) {
            setvar("n", state.val);
        }
        if (state.valid) {
            if (state.valid) {
                state.val = ("POOP");
            }
        }
    }
    return state;
} // This is from a template in peg.org:
function parse_parenthesized(pos) {
    let fn = 21;
    let state = {
        pos: pos,
        valid: true
    };
    let getvar = (k) => getvar_(fn, pos, k);
    let setvar = (k, v) => setvar_(fn, pos, k, v);
    state = literal(state.pos, "(");
    if (state.valid) {
        state = parse__(state.pos);
        if (state.valid) {
            state = parse_choice(state.pos);
            if (state.valid) {
                setvar("body", state.val);
            }
            if (state.valid) {
                state = literal(state.pos, ")");
                if (state.valid) {
                    state = parse__(state.pos);
                    if (state.valid) {
                        if (state.valid) {
                            state.val = (format([getvar("body")]));
                        }
                    }
                }
            }
        }
    }
    return state;
}

function parse_char(pos) {
    if (pos >= input.length) return {
        valid: false
    };
    return {
        pos: pos + 1,
        val: input.charAt(pos),
        valid: true
    };
}

function literal(pos, string) {
    if (input.substr(pos, string.length) === string) {
        return {
            pos: pos + string.length,
            val: string,
            valid: true
        };
    }
    else return {
        valid: false
    };
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
    return strbuf.slice(h + 1, h + 1 + len).join('')
}

let stack = []
let varbuf = []
let strbuf = []

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
    input = data.toString()
    var out = parse_grammar(0);
    console.log(out.val);
    console.warn('strbuf size:', strbuf.length)
    console.warn('varbuf size:', varbuf.length)
});

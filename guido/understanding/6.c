#include "head.h"
// This is from a template in d.peg (1)
State parse_sp(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    Variables vars = {0};
    // Not sure where this body is coming from
    push(state);
    state = literal(input, state.pos, " ");
    if (state.valid) {
    }

    if (!state.valid) {
        state = pop();
        push(state);
        state = literal(input, state.pos, "\n");
        if (state.valid) {
        }

        if (!state.valid) {
            state = pop();
            state = literal(input, state.pos, "\t");
            if (state.valid) {
            }

        } else {
            pop();
        }
    } else {
        pop();
    }
    return state;
}
// This is from a template in d.peg (1)
State parse__(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    Variables vars = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse_sp(input, state.pos);
    if (state.valid) {
        state = parse__(input, state.pos);
        if (state.valid) {
        }
    }

    if (!state.valid) {
        state = pop();

    } else {
        pop();
    }
    return state;
}
// This is from a template in d.peg (1)
State parse_rule(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    Variables vars = {0};
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state.valid) {
        remember("n", state.val);
    }
    if (state.valid) {
        state = parse__(input, state.pos);
        if (state.valid) {
            state = literal(input, state.pos, "<-");
            if (state.valid) {
                state = parse__(input, state.pos);
                if (state.valid) {
                    state = parse_choice(input, state.pos);
                    if (state.valid) {
                        remember("body", state.val);
                    }
                    if (state.valid) {
                        state = literal(input, state.pos, ".");
                        if (state.valid) {
                            state = parse__(input, state.pos);
                            if (state.valid) {
                                if (state.valid) {
                                    state.val = (format(
                                        "// This is from a template in d.peg "
                                        "(1)\n"
                                        "State parse_${n}(str input, int pos) "
                                        "{\n"
                                        "      State state = { .pos=pos, "
                                        ".valid=true };\n"
                                        "      Stack stack = { 0 };\n"
                                        "      Variables vars = { 0 };\n"
                                        "      // Not sure where this body is "
                                        "coming from\n"
                                        "      ${body}\n"
                                        "      return state;\n"
                                        "}",
                                        &vars));
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
// This is from a template in d.peg (1)
State parse_sentence(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    Variables vars = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse__(input, state.pos);
    if (state.valid) {
        state = parse_rule(input, state.pos);
        if (state.valid) {
            remember("r", state.val);
        }
        if (state.valid) {
            state = parse_sentence(input, state.pos);
            if (state.valid) {
                remember("g", state.val);
            }
            if (state.valid) {
                if (state.valid) { state.val = (format("${r}\n// This is from a template in d.peg (1)
State parse_meta(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        state = literal(input, state.pos, "!");
                        if (state.valid) {
                        }

                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = literal(input, state.pos, "\'");
                            if (state.valid) {
                            }

                            if (!state.valid) {
                                state = pop();
                                push(state);
                                state = literal(input, state.pos, "<-");
                                if (state.valid) {
                                }

                                if (!state.valid) {
                                    state = pop();
                                    push(state);
                                    state = literal(input, state.pos, "/");
                                    if (state.valid) {
                                    }

                                    if (!state.valid) {
                                        state = pop();
                                        push(state);
                                        state = literal(input, state.pos, ".");
                                        if (state.valid) {
                                        }

                                        if (!state.valid) {
                                            state = pop();
                                            push(state);
                                            state =
                                                literal(input, state.pos, "(");
                                            if (state.valid) {
                                            }

                                            if (!state.valid) {
                                                state = pop();
                                                push(state);
                                                state = literal(input,
                                                                state.pos, ")");
                                                if (state.valid) {
                                                }

                                                if (!state.valid) {
                                                    state = pop();
                                                    push(state);
                                                    state = literal(
                                                        input, state.pos, ":");
                                                    if (state.valid) {
                                                    }

                                                    if (!state.valid) {
                                                        state = pop();
                                                        state = literal(
                                                            input, state.pos,
                                                            "->");
                                                        if (state.valid) {
                                                        }

                                                    } else {
                                                        pop();
                                                    }
                                                } else {
                                                    pop();
                                                }
                                            } else {
                                                pop();
                                            }
                                        } else {
                                            pop();
                                        }
                                    } else {
                                        pop();
                                    }
                                } else {
                                    pop();
                                }
                            } else {
                                pop();
                            }
                        } else {
                            pop();
                        }
                        return state;
}
// This is from a template in d.peg (1)
State parse_name(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        state = parse_namechar(input, state.pos);
                        if (state.valid) {
                            remember("c", state.val);
                        }
                        if (state.valid) {
                            state = parse_name(input, state.pos);
                            if (state.valid) {
                                remember("n", state.val);
                            }
                            if (state.valid) {
                                if (state.valid) {
                                    state.val = (format("${c}${n}", &vars));
                                }
                            }
                        }

                        if (!state.valid) {
                            state = pop();
                            state = parse_namechar(input, state.pos);
                            if (state.valid) {
                            }

                        } else {
                            pop();
                        }
                        return state;
}
// This is from a template in d.peg (1)
State parse_namechar(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        state = parse_meta(input, state.pos);

                        if (state.valid) {
                            pop();
                            state = null();
                        } else {
                            state = pop();
                        }
                        if (state.valid) {
                            push(state);
                            state = parse_sp(input, state.pos);

                            if (state.valid) {
                                pop();
                                state = null();
                            } else {
                                state = pop();
                            }
                            if (state.valid) {
                                state = parse_char(input, state.pos);
                                if (state.valid) {
                                }
                            }
                        }

                        return state;
}
// This is from a template in d.peg (1)
State parse_term(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        state = parse_labeled(input, state.pos);
                        if (state.valid) {
                        }

                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = parse_nonterminal(input, state.pos);
                            if (state.valid) {
                            }

                            if (!state.valid) {
                                state = pop();
                                push(state);
                                state = parse_string(input, state.pos);
                                if (state.valid) {
                                }

                                if (!state.valid) {
                                    state = pop();
                                    push(state);
                                    state = parse_negation(input, state.pos);
                                    if (state.valid) {
                                    }

                                    if (!state.valid) {
                                        state = pop();
                                        state = parse_parenthesized(input,
                                                                    state.pos);
                                        if (state.valid) {
                                        }

                                    } else {
                                        pop();
                                    }
                                } else {
                                    pop();
                                }
                            } else {
                                pop();
                            }
                        } else {
                            pop();
                        }
                        return state;
}
// This is from a template in d.peg (1)
State parse_nonterminal(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        state = parse_name(input, state.pos);
                        if (state.valid) {
                            remember("n", state.val);
                        }
                        if (state.valid) {
                            state = parse__(input, state.pos);
                            if (state.valid) {
                                if (state.valid) {
                                    state.val =
                                        (format(" state = parse_${n}(input, "
                                                "state.pos);\n",
                                                &vars));
                                }
                            }
                        }

                        return state;
}
// This is from a template in d.peg (1)
State parse_labeled(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        state = parse_name(input, state.pos);
                        if (state.valid) {
                            remember("label", state.val);
                        }
                        if (state.valid) {
                            state = parse__(input, state.pos);
                            if (state.valid) {
                                state = literal(input, state.pos, ":");
                                if (state.valid) {
                                    state = parse__(input, state.pos);
                                    if (state.valid) {
                                        state = parse_term(input, state.pos);
                                        if (state.valid) {
                                            remember("value", state.val);
                                        }
                                        if (state.valid) {
                                            if (state.valid) {
                                                state.val = (format(
                                                    "${value} if (state.valid) "
                                                    "{ remember(\"${label}\", "
                                                    "state.val); } \n",
                                                    &vars));
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        return state;
}
// This is from a template in d.peg (1)
State parse_sequence(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        state = parse_term(input, state.pos);
                        if (state.valid) {
                            remember("foo", state.val);
                        }
                        if (state.valid) {
                            state = parse_sequence(input, state.pos);
                            if (state.valid) {
                                remember("bar", state.val);
                            }
                            if (state.valid) {
                                if (state.valid) {
                                    state.val = (format(
                                        "${foo} if (state.valid) { ${bar} }\n",
                                        &vars));
                                }
                            }
                        }

                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = parse_result_expression(input, state.pos);
                            if (state.valid) {
                            }

                            if (!state.valid) {
                                state = pop();
                                if (state.valid) {
                                    state.val = ("");
                                }

                            } else {
                                pop();
                            }
                        } else {
                            pop();
                        }
                        return state;
}
// This is from a template in d.peg (1)
State parse_string(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        state = literal(input, state.pos, "\'");
                        if (state.valid) {
                            state = parse_stringcontents(input, state.pos);
                            if (state.valid) {
                                remember("s", state.val);
                            }
                            if (state.valid) {
                                state = literal(input, state.pos, "\'");
                                if (state.valid) {
                                    state = parse__(input, state.pos);
                                    if (state.valid) {
                                        if (state.valid) {
                                            state.val = (format(
                                                " state = literal(input, "
                                                "state.pos, \"${s}\");\n",
                                                &vars));
                                        }
                                    }
                                }
                            }
                        }

                        return state;
}
// This is from a template in d.peg (1)
State parse_stringcontents(str input, int pos) {
                        State state = {.pos = pos, .valid = true};
                        Stack stack = {0};
                        Variables vars = {0};
                        // Not sure where this body is coming from
                        push(state);
                        push(state);
                        state = literal(input, state.pos, "\\");

                        if (state.valid) {
                            pop();
                            state = null();
                        } else {
                            state = pop();
                        }
                        if (state.valid) {
                            push(state);
                            state = literal(input, state.pos, "\'");

                            if (state.valid) {
                                pop();
                                state = null();
                            } else {
                                state = pop();
                            }
                            if (state.valid) {
                                state = parse_char(input, state.pos);
                                if (state.valid) {
                                    remember("c", state.val);
                                }
                                if (state.valid) {
                                    state =
                                        parse_stringcontents(input, state.pos);
                                    if (state.valid) {
                                        remember("s", state.val);
                                    }
                                    if (state.valid) {
                                        if (state.valid) {
                                            state.val =
                                                (format("${c}${s}", &vars));
                                        }
                                    }
                                }
                            }
                        }

                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = literal(input, state.pos, "\\");
                            if (state.valid) {
                                remember("b", state.val);
                            }
                            if (state.valid) {
                                state = parse_char(input, state.pos);
                                if (state.valid) {
                                    remember("c", state.val);
                                }
                                if (state.valid) {
                                    state =
                                        parse_stringcontents(input, state.pos);
                                    if (state.valid) {
                                        remember("s", state.val);
                                    }
                                    if (state.valid) {
                                        if (state.valid) { state.val = (format("if (state.valid) { state.val = (""); }
${c}${
                                                s}", &vars)); }
                                        }
                                    }
                                }

                                if (!state.valid) {
                                    state = pop();
                                    $ { b }
                                } else {
                                    pop();
                                }
                            } else {
                                pop();
                            }
                            return state;
                        }
                        // This is from a template in d.peg (1)
                        State parse_choice(str input, int pos) {
                            State state = {.pos = pos, .valid = true};
                            Stack stack = {0};
                            Variables vars = {0};
                            // Not sure where this body is coming from
                            push(state);
                            state = parse_sequence(input, state.pos);
                            if (state.valid) {
                                remember("a", state.val);
                            }
                            if (state.valid) {
                                state = literal(input, state.pos, "/");
                                if (state.valid) {
                                    state = parse__(input, state.pos);
                                    if (state.valid) {
                                        state = parse_choice(input, state.pos);
                                        if (state.valid) {
                                            remember("b", state.val);
                                        }
                                        if (state.valid) {
                                            if (state.valid) {
                                                state.val = (format(
                                                    "  push(state);\n"
                                                    "${a}\n"
                                                    "if (!state.valid) {\n"
                                                    "  state = pop();\n"
                                                    "   state = parse_sequence(input, state.pos);
                                                    if (state.valid) {}
\n "
    "} else { pop(); }",
                                                    &vars));
                                            }
                                        }
                                    }
                                }
                            }

                            if (!state.valid) {
                                state = pop();
                                $ { b }
                            } else {
                                pop();
                            }
                            return state;
                        }
                        // This is from a template in d.peg (1)
                        State parse_negation(str input, int pos) {
                            State state = {.pos = pos, .valid = true};
                            Stack stack = {0};
                            Variables vars = {0};
                            // Not sure where this body is coming from
                            state = literal(input, state.pos, "!");
                            if (state.valid) {
                                state = parse__(input, state.pos);
                                if (state.valid) {
                                    state = parse_term(input, state.pos);
                                    if (state.valid) {
                                        remember("t", state.val);
                                    }
                                    if (state.valid) {
                                        if (state.valid) {
                                            state.val = (format(
                                                "push(state);\n"
                                                "${t}\n"
                                                "if (state.valid) {\n"
                                                "  pop();\n"
                                                "  state = null();\n"
                                                "} else { state = pop(); }",
                                                &vars));
                                        }
                                    }
                                }
                            }

                            return state;
                        }
                        // This is from a template in d.peg (1)
                        State parse_result_expression(str input, int pos) {
                            State state = {.pos = pos, .valid = true};
                            Stack stack = {0};
                            Variables vars = {0};
                            // Not sure where this body is coming from
                            state = literal(input, state.pos, "->");
                            if (state.valid) {
                                state = parse__(input, state.pos);
                                if (state.valid) {
                                    state = parse_expr(input, state.pos);
                                    if (state.valid) {
                                        remember("result", state.val);
                                    }
                                    if (state.valid) {
                                        state = parse__(input, state.pos);
                                        if (state.valid) {
                                            if (state.valid) {
                                                state.val =
                                                    (format("if (state.valid) "
                                                            "{ state.val = "
                                                            "${result}; }\n",
                                                            &vars));
                                            }
                                        }
                                    }
                                }
                            }

                            return state;
                        }
                        // This is from a template in d.peg (1)
                        State parse_expr(str input, int pos) {
                            State state = {.pos = pos, .valid = true};
                            Stack stack = {0};
                            Variables vars = {0};
                            // Not sure where this body is coming from
                            state = literal(input, state.pos, "(");
                            if (state.valid) {
                                state = parse__(input, state.pos);
                                if (state.valid) {
                                    state =
                                        parse_exprcontents(input, state.pos);
                                    if (state.valid) {
                                        remember("e", state.val);
                                    }
                                    if (state.valid) {
                                        state = literal(input, state.pos, ")");
                                        if (state.valid) {
                                            if (state.valid) { state.val = (format("(", &vars))${e});
                                            }
                                        }
                                    }
                                }
                            }

                            return state;
                        }
                        // This is from a template in d.peg (1)
                        State parse_exprcontents(str input, int pos) {
                            State state = {.pos = pos, .valid = true};
                            Stack stack = {0};
                            Variables vars = {0};
                            // Not sure where this body is coming from
                            push(state);
                            push(state);
                            push(state);
                            state = literal(input, state.pos, "(");

                            if (state.valid) {
                                pop();
                                state = null();
                            } else {
                                state = pop();
                            }
                            if (state.valid) {
                                push(state);
                                state = literal(input, state.pos, ")");

                                if (state.valid) {
                                    pop();
                                    state = null();
                                } else {
                                    state = pop();
                                }
                                if (state.valid) {
                                    state = parse_char(input, state.pos);
                                    if (state.valid) {
                                    }
                                }
                            }

                            if (!state.valid) {
                                state = pop();
                                state = parse_expr(input, state.pos);
                                if (state.valid) {
                                }

                            } else {
                                pop();
                            }
                            if (state.valid) {
                                remember("c", state.val);
                            }
                            if (state.valid) {
                                state = parse_exprcontents(input, state.pos);
                                if (state.valid) {
                                    remember("e", state.val);
                                }
                                if (state.valid) {
                                    if (state.valid) {
                                        state.val =
                                            (format("${c}", &vars) ${e});
                                    }
                                }
                            }

                            if (!state.valid) {
                                state = pop();
                                if (state.valid) {
                                    state.val = ("");
                                }

                            } else {
                                pop();
                            }
                            return state;
                        }
                        FAILED replace ", &vars)); }
 }
                }
            }

            if (!state.valid) {
                state = pop();
                state = parse__(input, state.pos);
                if (state.valid) {
                    state = parse_rule(input, state.pos);
                    if (state.valid) {
                        remember("r", state.val);
                    }
                    if (state.valid) {
                        if (state.valid) {
                            state.val = (format(
                                "// This is from a template in d.peg (2), "
                                "variable r is next:\n"
                                " ${r}\n"
                                " // This is from a template in d.peg, just "
                                "finished with variable r\n"
                                " State parse_char(str input, int pos) {\n"
                                "   if (pos >= len(input)) return null();\n"
                                "   return (State){ .pos=pos+1, "
                                ".val=copy(&input[pos], 1), .valid=true };\n"
                                " }\n"
                                " State literal(str input, int pos, str "
                                "string) {\n"
                                "   if (strncmp(&input[pos], string, "
                                "len(string)) == 0) {\n"
                                "     return (State){ .pos=pos+len(string), "
                                ".val=string, .valid=true };\n"
                                "   } else return null();\n"
                                " }\n"
                                " State literal(str input, int pos, char* "
                                "string) {\n"
                                "   str s = gb_make_string(string);\n"
                                "   if (strncmp(&input[pos], s, strlen(s)) == "
                                "0) {\n"
                                "     return (State){ .pos=pos+len(s), .val=s, "
                                ".valid=true };\n"
                                "   } else return null();\n"
                                " }\n"
                                "int main(int argc, char ** argv) {\n"
                                " str src = read(argv[1]);\n"
                                " State out = parse_sentence(src, 0);\n"
                                " printf(\"%s\\n\", out.val);\n }",
                                &vars));
                        }
                    }
                }

            } else {
                pop();
            }
            return state;
        }
        $ { g }

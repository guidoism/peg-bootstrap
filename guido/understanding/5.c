#include "head.h"

// This is from a template in c.peg
State parse_sp(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
// This is from a template in c.peg
State parse__(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
// This is from a template in c.peg
State parse_rule(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state.valid) {
        str n = state.val;
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
                        str body = state.val;
                    }
                    if (state.valid) {
                        state = literal(input, state.pos, ".");
                        if (state.valid) {
                            state = parse__(input, state.pos);
                            if (state.valid) {
                                if (state.valid) {
				  state.val = format2(
                                        "// This is from a template in d.peg\n"
                                        "State parse_%s(str input, int pos) {\n"
                                        "      State state = { .pos=pos, "
                                        ".valid=true };\n"
                                        "      Stack stack = { 0 };\n"
                                        "      // Not sure where this body is "
                                        "coming from\n"
                                        "      %s\n"
                                        "      return state;\n"
                                        "}",
                                        n, body);
                                };
                            }
                        }
                    }
                }
            }
        }
    }

    return state;
}
// This is from a template in c.peg
State parse_sentence(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse__(input, state.pos);
    if (state.valid) {
        state = parse_rule(input, state.pos);
        if (state.valid) {
            str r = state.val;
        }
        if (state.valid) {
            state = parse_sentence(input, state.pos);
            if (state.valid) {
                str g = state.val;
            }
            if (state.valid) {
                if (state.valid) {
                    state.val = (format2("%s\n%s", r, g))
                };
            }
        }
    }

    if (!state.valid) {
        state = pop();
        state = parse__(input, state.pos);
        if (state.valid) {
            state = parse_rule(input, state.pos);
            if (state.valid) {
                str r = state.val;
            }
            if (state.valid) {
                if (state.valid) { state.val = (format1("// This is from a template in d.peg, variable r is next:\n"
               " %s\n"
               " // This is from a template in d.peg, just finished with variable r\n"
               " State parse_char(str input, int pos) {\n"
               "   if (pos >= len(input)) return null();\n"
               "   return (State){ .pos=pos+1, .val=input[pos], valid=true };\n"
               " }\n"
               " State literal(str input, int pos, str string) {\n"
               "   if (strncmp(&input[pos], string, len(string) == 0)) {\n"
               "     return { .pos=pos+len(string), .val=string, .valid=true };\n"
               "   } else return null();\n"
               " }\n"
               " \n"
               " str = read(argv[1]);\n"
               " State out = parse_sentence(src, 0);\n"
               " printf(\"%s\\n\", out.val);\n"
               ", r)
            )
                };
            }
        }

    } else {
        pop();
    }
    return state;
}
// This is from a template in c.peg
State parse_meta(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
                        state = literal(input, state.pos, "(");
                        if (state.valid) {
                        }

                        if (!state.valid) {
                            state = pop();
                            push(state);
                            state = literal(input, state.pos, ")");
                            if (state.valid) {
                            }

                            if (!state.valid) {
                                state = pop();
                                push(state);
                                state = literal(input, state.pos, ":");
                                if (state.valid) {
                                }

                                if (!state.valid) {
                                    state = pop();
                                    state = literal(input, state.pos, "->");
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
// This is from a template in c.peg
State parse_name(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse_namechar(input, state.pos);
    if (state.valid) {
        str c = state.val;
    }
    if (state.valid) {
        state = parse_name(input, state.pos);
        if (state.valid) {
            str n = state.val;
        }
        if (state.valid) {
            if (state.valid) {
                state.val = (format2("%s%s", c, n))
            };
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
// This is from a template in c.peg
State parse_namechar(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
// This is from a template in c.peg
State parse_term(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
                    state = parse_parenthesized(input, state.pos);
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
// This is from a template in c.peg
State parse_nonterminal(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state.valid) {
        str n = state.val;
    }
    if (state.valid) {
        state = parse__(input, state.pos);
        if (state.valid) {
            if (state.valid) {
                state.val =
                    (format1(" state = parse_%s(input, state.pos);\n", n))
            };
        }
    }

    return state;
}
// This is from a template in c.peg
State parse_labeled(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    state = parse_name(input, state.pos);
    if (state.valid) {
        str label = state.val;
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
                        str value = state.val;
                    }
                    if (state.valid) {
                        if (state.valid) {
                            state.val = (format2("%s if (state.valid) { str %s "
                                                 "= state.val; } \n",
                                                 value, label))
                        };
                    }
                }
            }
        }
    }

    return state;
}
// This is from a template in c.peg
State parse_sequence(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse_term(input, state.pos);
    if (state.valid) {
        str foo = state.val;
    }
    if (state.valid) {
        state = parse_sequence(input, state.pos);
        if (state.valid) {
            str bar = state.val;
        }
        if (state.valid) {
            if (state.valid) {
                state.val = (format2("%s if (state.valid) { %s }\n", foo, bar))
            };
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
                state.val = ("")
            };

        } else {
            pop();
        }
    } else {
        pop();
    }
    return state;
}
// This is from a template in c.peg
State parse_string(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    state = literal(input, state.pos, "\'");
    if (state.valid) {
        state = parse_stringcontents(input, state.pos);
        if (state.valid) {
            str s = state.val;
        }
        if (state.valid) {
            state = literal(input, state.pos, "\'");
            if (state.valid) {
                state = parse__(input, state.pos);
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format1(
                            " state = literal(input, state.pos, \"%s\");\n", s))
                    };
                }
            }
        }
    }

    return state;
}
// This is from a template in c.peg
State parse_stringcontents(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
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
                str c = state.val;
            }
            if (state.valid) {
                state = parse_stringcontents(input, state.pos);
                if (state.valid) {
                    str s = state.val;
                }
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format2("%s%s", c, s))
                    };
                }
            }
        }
    }

    if (!state.valid) {
        state = pop();
        push(state);
        state = literal(input, state.pos, "\\");
        if (state.valid) {
            str b = state.val;
        }
        if (state.valid) {
            state = parse_char(input, state.pos);
            if (state.valid) {
                str c = state.val;
            }
            if (state.valid) {
                state = parse_stringcontents(input, state.pos);
                if (state.valid) {
                    str s = state.val;
                }
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format3("%s%s%s", b, c, s))
                    };
                }
            }
        }

        if (!state.valid) {
            state = pop();
            if (state.valid) {
                state.val = ("")
            };

        } else {
            pop();
        }
    } else {
        pop();
    }
    return state;
}
// This is from a template in c.peg
State parse_choice(str input, int pos) {
    State state = {.pos = pos, .valid = true};
    Stack stack = {0};
    // Not sure where this body is coming from
    push(state);
    state = parse_sequence(input, state.pos);
    if (state.valid) {
        str a = state.val;
    }
    if (state.valid) {
        state = literal(input, state.pos, "/");
        if (state.valid) {
            state = parse__(input, state.pos);
            if (state.valid) {
                state = parse_choice(input, state.pos);
                if (state.valid) {
                    str b = state.val;
                }
                if (state.valid) {
                    if (state.valid) { state.val = (format2("  push(state);
                      %s
                      if (!state.valid) {
                            state = pop();
                            % s
                      } else {
                            pop(); }", a, b)) };
                    }
                }
            }
        }

        if (!state.valid) {
            state = pop();
            state = parse_sequence(input, state.pos);
            if (state.valid) {
            }

        } else {
            pop();
        }
        return state;
    }
    // This is from a template in c.peg
    State parse_negation(str input, int pos) {
        State state = {.pos = pos, .valid = true};
        Stack stack = {0};
        // Not sure where this body is coming from
        state = literal(input, state.pos, "!");
        if (state.valid) {
            state = parse__(input, state.pos);
            if (state.valid) {
                state = parse_term(input, state.pos);
                if (state.valid) {
                    str t = state.val;
                }
                if (state.valid) {
                    if (state.valid) { state.val = (format1("push(state);
                  %s
                  if (state.valid) {
                            pop();
                            state = null();
                  } else {
                            state = pop(); }", t)) };
                    }
                }
            }

            return state;
        }
        // This is from a template in c.peg
        State parse_result_expression(str input, int pos) {
            State state = {.pos = pos, .valid = true};
            Stack stack = {0};
            // Not sure where this body is coming from
            state = literal(input, state.pos, "->");
            if (state.valid) {
                state = parse__(input, state.pos);
                if (state.valid) {
                    state = parse_expr(input, state.pos);
                    if (state.valid) {
                        str result = state.val;
                    }
                    if (state.valid) {
                        state = parse__(input, state.pos);
                        if (state.valid) {
                            if (state.valid) {
                                state.val = (format1(
                                    "if (state.valid) { state.val = %s; }\n",
                                    result))
                            };
                        }
                    }
                }
            }

            return state;
        }
        // This is from a template in c.peg
        State parse_expr(str input, int pos) {
            State state = {.pos = pos, .valid = true};
            Stack stack = {0};
            // Not sure where this body is coming from
            state = literal(input, state.pos, "(");
            if (state.valid) {
                state = parse__(input, state.pos);
                if (state.valid) {
                    state = parse_exprcontents(input, state.pos);
                    if (state.valid) {
                        str e = state.val;
                    }
                    if (state.valid) {
                        state = literal(input, state.pos, ")");
                        if (state.valid) {
                            if (state.valid) {
                                state.val = (format1("(%s)", e))
                            };
                        }
                    }
                }
            }

            return state;
        }
        // This is from a template in c.peg
        State parse_exprcontents(str input, int pos) {
            State state = {.pos = pos, .valid = true};
            Stack stack = {0};
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
                str c = state.val;
            }
            if (state.valid) {
                state = parse_exprcontents(input, state.pos);
                if (state.valid) {
                    str e = state.val;
                }
                if (state.valid) {
                    if (state.valid) {
                        state.val = (format2("%s%s", c, e))
                    };
                }
            }

            if (!state.valid) {
                state = pop();
                if (state.valid) {
                    state.val = ("")
                };

            } else {
                pop();
            }
            return state;
        }
        // This is from a template in c.peg, variable r is next:
        // This is from a template in c.peg
        State parse_parenthesized(str input, int pos) {
            State state = {.pos = pos, .valid = true};
            Stack stack = {0};
            // Not sure where this body is coming from
            state = literal(input, state.pos, "(");
            if (state.valid) {
                state = parse__(input, state.pos);
                if (state.valid) {
                    state = parse_choice(input, state.pos);
                    if (state.valid) {
                        str body = state.val;
                    }
                    if (state.valid) {
                        state = literal(input, state.pos, ")");
                        if (state.valid) {
                            state = parse__(input, state.pos);
                            if (state.valid) {
                                if (state.valid) {
                                    state.val = (body)
                                };
                            }
                        }
                    }
                }
            }

            return state;
        }
        // This is from a template in c.peg, just finished with variable r
        State parse_char(str input, int pos) {
            if (pos >= len(input))
                return null();
            return (State){.pos = pos + 1, .val = input[pos], valid = true};
        }
        State literal(str input, int pos, str string) {
            if (strncmp(&input[pos], string, len(string) == 0)) {
                return {.pos = pos + len(string), .val = string, .valid = true};
            } else
                return null();
        }

        str = read(argv[1]);
        State out = parse_sentence(src, 0);
        printf("%s\n", out.val);

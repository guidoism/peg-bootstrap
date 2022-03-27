#include "head.h"
// This is from a template in c.peg
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
// This is from a template in c.peg, variable r is next:
// This is from a template in c.peg
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

#include "gb_string.h"
#include <stdbool.h>
#include <stdio.h>

typedef gbString str;

typedef struct State {
  int pos;
  str val;
  bool valid;
  // TODO: Add a hash table for variables to be used later since C
  // scoping rules don't make the existing code work?
} State;

typedef struct Stack {
  State items[16];
  int top;
} Stack;

#define push(state) stack.items[++stack.top] = state
#define pop() stack.items[stack.top--]
#define newstr(n) gb_make_string_length("", n)

// TODO: Figure out how to use macros to make these shorter
str format1(const char * fmt, const char * a) {
  size_t n = strlen(fmt) + strlen(a);
  str s = newstr(n);
  if (snprintf(s, n, fmt, a) > 0)
    return s;
  return NULL;
}

str format2(const char * fmt, const char * a, const char * b) {
  size_t n = strlen(fmt) + strlen(a) + strlen(b);
  str s = newstr(n);
  if (snprintf(s, n, fmt, a, b) > 0)
    return s;
  return NULL;
}

str format3(const char * fmt, const char * a, const char * b, const char * c) {
  size_t n = strlen(fmt) + strlen(a) + strlen(b) + strlen(c);
  str s = newstr(n);
  if (snprintf(s, n, fmt, a, b, c) > 0)
    return s;
  return NULL;
}

// TODO: Figure out how to make these automatically
State parse_sp(str input, int pos);
State parse__(str input, int pos);
State parse_rule(str input, int pos);
State parse_sentence(str input, int pos);
State parse_meta(str input, int pos);
State parse_name(str input, int pos);
State parse_namechar(str input, int pos);
State parse_term(str input, int pos);
State parse_nonterminal(str input, int pos);
State parse_labeled(str input, int pos);
State parse_sequence(str input, int pos);
State parse_string(str input, int pos);
State parse_stringcontents(str input, int pos);
State parse_choice(str input, int pos);
State parse_negation(str input, int pos);
State parse_result_expression(str input, int pos);
State parse_expr(str input, int pos);
State parse_exprcontents(str input, int pos);
State parse_parenthesized(str input, int pos);
State parse_char(str input, int pos);
State literal(str input, int pos, str string);


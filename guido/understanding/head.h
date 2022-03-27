#include "gb_string.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef gbString str;

typedef struct State {
  int pos;
  str val;
  bool valid;
  // TODO: Add a hash table for variables to be used later since C
  // scoping rules don't make the existing code work? Because we
  // blast through the existing state over and over maybe this won't
  // work right away. We could instead create a new variable at the
  // top of each function that holds variables for the duration of
  // the function. It doesn't even need to hold the names, just the
  // values in order -- As long as we use them the same order then
  // we can format them in the same way. This should also make the
  // varidic format functions easier to write.
} State;

typedef struct Stack {
  State items[16];
  int top;
} Stack;

typedef struct OldVariable {
  str name;
  str value;
  struct Variable* next;
} OldVariable;

typedef struct Variables {
  str names[16];
  str values[16];
  size_t n;
} Variables;

#define push(state) stack.items[++stack.top] = state
#define pop() stack.items[stack.top--]
#define newstr(n) gb_make_string_length("", n)
#define len(s) gb_string_length(s)
//#define remember(k, v) { Variable* var = (Variable*)malloc(sizeof(Variable)); \
//  var->name = gb_make_string(k); var->value = gb_make_string(v); }
#define remember(k, v) { vars.names[vars.n] = gb_make_string(k); \
  vars.values[vars.n] = gb_make_string(v); \
  vars.n += 1; }

// Replace first occurence of ${key} with value
str replace(str src, str key, str value) {
  str s = newstr(len(src) + len(value));
  str needle = newstr(len(key) + 3);
  sprintf(needle, "${%s}", key);
  char * loc = strstr(src, needle);
  if (!loc) return gb_make_string("FAILED replace");
  size_t i = loc - src;
  strncpy(s, src, i);
  strncpy(s + i, value, len(value));
  strcpy(s + i + len(value), src + i + len(needle));
  return s;
}

/*
str format(const char * fmt, Variable * variables) {
  //for (Variable * v = variables; v; v = v.next) {
  //  format1()
  //}
  
  //size_t n = strlen(fmt);
  //for (Variable * v = variables; v; v = v.next) {
  //  n += strlen(v.value);
  //}
  //str s = gb_make_string_length(fmt, n);
  //for (Variable * v = variables; v; v = v.next) {
  //}
  return NULL;
}
*/

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


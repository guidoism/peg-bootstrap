#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#define GB_STRING_IMPLEMENTATION
#include "gb_string.h"

typedef gbString str;

typedef struct State {
  int pos;
  str val;
  bool valid;
} State;

typedef struct Stack {
  State items[16];
  int top;
} Stack;

typedef struct Variables {
  str names[16];
  str values[16];
  size_t key_locations[16];
  size_t n;
  int size_diff;
} Variables;

typedef struct StringSlice {
  char * start;
  char * end;
} StringSlice;

#define push(state) stack.items[++stack.top] = state
#define pop() stack.items[stack.top--]
#define newstr(n) gb_make_string_length("", n)
#define copy(s, n) gb_make_string_length(s, n)
#define len(s) gb_string_length(s)
#define remember(k, v) { vars.names[vars.n] = gb_make_string(k); \
  vars.values[vars.n] = gb_make_string(v); \
  vars.size_diff += vars.values[vars.n] - vars.names[vars.n]; \
  vars.n += 1; }
#define null() (State){.valid=false}

str make_key(str name) {
  str s = gb_make_string_length("", len(name) + 3);
  sprintf(s, "${%s}", name);
  return s;
}

str read(const char * filename) {
  FILE* f = fopen(filename, "r");
  str s = gb_make_string("");
  char buf[4096];
  while (true) {
    //printf("\tGUIDO 0.1\n");
    int n = fread(&buf, 1, 4096, f);
    //printf("\tGUIDO 0.2\n");
    if (n > 0) {
      //printf("\tGUIDO 0.3: n = %d\n", n);
      s = gb_append_string_length(s, buf, n);
      //printf("\tGUIDO 0.4: s = %s\n", s);
    }
    else {
      return s;
    }
  }
}

/*
// Replace first occurence of ${key} with value
str replace(str src, str key, str value) {
  //str s = newstr(len(src) + len(value));
  //printf("Making resulting string length %zu + %zu\n", len(src), len(value));
  str s = gb_make_string_length("", len(src) + len(value));
  str needle = newstr(len(key) + 3);
  sprintf(needle, "${%s}", key);
  //printf("Looking for \"%s\"\n", needle);
  char * loc = strstr(src, needle);
  if (!loc) return gb_make_string("FAILED replace");
  size_t i = loc - src;
  //printf("Found at location %zu\n", i);
  strncpy(s, src, i);
  //printf("Replaced: \"%s\"\n", s);
  strncpy(s + i, value, len(value));
  //printf("Replaced: \"%s\"\n", s);
  strcpy(s + i + len(value), src + i + len(needle));
  //printf("Replaced: \"%s\"\n", s);
  return s;
}
*/

/*
int key_pattern(char * s) {
  int i = 0;
  int state = 0;
  while (s[i] != '\0') {
    if (s[i] == '$') {
      state = 1;
      i += 1;
      continue;
    }
    if (state == 1 && s[i] == '{') {
      state = 2;
      i += 1;
      continue;
    }
    // Only lower case ascii letters for variables
    if (state == 2 && s[i] >= 97 && s[i] <= 122) {
      state = 3;
      i += 1;
      continue;
    }
    if (state == 3 && 
    
  }
  return 0;
}
*/

str format(char * fmt, Variables * vars) {
  // This is tricky because we need to make sure we don't recursively
  // replace variables, i.e. we need to ignore the variable names in
  // the variable values.
  printf("fmt = \"%s\"\n", fmt);
  //str s = newstr(strlen(fmt) + vars->size_diff);
  int i = 0;
  int j = 0;
  while (fmt[i]) {
    printf("%c\n", fmt[i]);
    if (fmt[i] == '$' && fmt[i+1] == '{') {
      i += 2;
      int a = i;
      while (fmt[i] != '}') {
	printf("Key: %c\n", fmt[i]);
	i += 1;
      }
      int b = i;
      i += 1;
      continue;
    }
    printf("Not a key so we are saving '%c'\n", fmt[i]);
    //s[j++] = fmt[i++];
    i++;
  }
  //return s;

  /*
  for (int i = 0; fmt[i] != 0; i++) {
    if (fmt[i] == '$' && fmt[i+1] == '{') {
      // key start is i
      // key end is 
    }
  }
  */


  
  /*
  // And with this current implemenation the variables need to be in
  // order that they were put into.
  str dest = gb_make_string_length("", strlen(fmt) + vars->size_diff);
  char * prev_end = fmt;
  int i = 0;
  int j = 0;
  for (size_t i = 0; i < vars->n; i++) {
    str key = make_key(vars->names[i]);
    str value = vars->values[i];
    char * loc = strstr(fmt, key);
    slices[j++] = { .start = prev_end, .end = loc };
    slices[j++] = { .start = value, .end = value + len(value) };
    prev_end = loc + len(key);
  }

  return dest;
  */

  /*  
  str needle = newstr(64);
  int starts[32];
  int ends[32];
  char * start = fmt;
  int length = strlen(fmt);
  for (size_t i = 0; i < vars->n; i++) {
    str key = vars->names[i];
    int j = sprintf(needle, "${%s}", key);
    char * loc = strstr(start, needle);
    starts[i] = loc - fmt;
    ends[i] = loc - fmt + j;
    start = fmt + ends[i];
    length += len(vars->values[i]);
    printf("%d %d\n", starts[i], ends[i]);
  }

  str s = gb_make_string_length("", length);
  strncpy(s, fmt, starts[0]);
  for (size_t i = 0; i < vars->n; i++) {
    strcpy(s+starts[i], vars->values[i]);
  }
  //strcpy(s, fmt + ends[vars->n]);
  return s;
  */

  
  //printf("Formating with \"%s\"\n", fmtstr);
  //for (size_t i = 0; i < vars->n; i++) {
    //printf("name : \"%s\"\n", vars->names[i]);
    //printf("value: \"%s\"\n", vars->values[i]);
    //s = replace(s, vars->names[i], vars->values[i]);
  //}
  //return s;
}

/*
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
*/

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

/*

 */

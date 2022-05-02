#include <stdio.h>
#include <string.h>

void hex(const void* data, size_t size) {
  char ascii[17];
  size_t i, j;
  ascii[16] = '\0';
  for (i = 0; i < size; ++i) {
    printf("%02X ", ((unsigned char*)data)[i]);
    if (((unsigned char*)data)[i] >= ' ' && ((unsigned char*)data)[i] <= '~') {
      ascii[i % 16] = ((unsigned char*)data)[i];
    } else {
      ascii[i % 16] = '.';
    }
    if ((i+1) % 8 == 0 || i+1 == size) {
      printf(" ");
      if ((i+1) % 16 == 0) {
        printf("|  %s \n", ascii);
      } else if (i+1 == size) {
        ascii[(i+1) % 16] = '\0';
        if ((i+1) % 16 <= 8) {
          printf(" ");
        }
        for (j = (i+1) % 16; j < 16; ++j) {
          printf("   ");
        }
        printf("|  %s \n", ascii);
      }
    }
  }
}

static int pos = 0;
static char buf[65536];

// Intern string based on null terminator
int64_t intern(char * s) {
  int handle = pos;
  for (int i = 0; s[i]; i++, pos++) {
    buf[pos] = s[i];
  }
  buf[pos++] = 0;
  return handle;
}

// One that stores the size instead
int64_t intern2(char * s) {
  int64_t handle = pos;
  int len = strlen(s);
  memcpy(&buf[pos], &len, 4);
  pos += 4;
  memcpy(&buf[pos], s, len);
  pos += len;
  return handle;
}

/*
// Concat and intern, returning handle
int64_t strcat2(int64_t a, int64_t b) {
  int x;
  memcpy(&x, &buf[a], 4);
  int y;
  memcpy(&y, &buf[a], 4);
  int z = x + y;
  printf("%d %d\n", x, y);
  memcpy(buf+pos, &z, 4);
  memcpy(buf+pos+4, buf+a+4, x);
  memcpy(buf+pos+4+x, buf+b+4, y);
  pos = 4 + 4 + x + y;
}
*/

// TODO: A version of concat that takes an array of handles
int64_t strcat3(int64_t* handles, int n) {
  int64_t handle = pos;
  int total_len = 0;
  for (int i = 0; i < n; i++) {
    int64_t h = handles[i];
    int len;
    memcpy(&len, &buf[h], 4);
    memcpy(&buf[pos+4+total_len], &buf[h+4], len);
    total_len += len;
  }
  memcpy(buf+pos, &total_len, 4);
  pos += (4 + total_len);
  return handle;
}

// TODO: Store short strings in handle itself

int main() {
  memset(&buf, 0, 65536);
  int64_t i = intern2("guido ");
  int64_t j = intern2("enrico ");
  int64_t k = intern2("bartolucci");

  int64_t handles[] = { i, j, k };
  int64_t h = strcat3(handles, 3);
  int64_t handles2[] = { h };
  strcat3(handles2, 1);

  hex(&buf, 128);
}

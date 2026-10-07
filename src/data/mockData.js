// Mock data and system call documentation for BackupSync OSSP Project

export const PROJECT_INFO = {
  title: "BACKUPSYNC",
  subtitle: "Linux File Backup & Synchronization System",
  course: "Operating Systems and Systems Programming (25CS2104E)",
  academicYear: "2026–27, Term-I",
  teamNo: "Team No. 12",
  section: "Section 22",
  members: [
    { name: "Sai Krishna", id: "2520090156", role: "Core Algorithm & System Calls" },
    { name: "Navaneeth", id: "2520090218", role: "Directory Traversal & Metadata Parsing" },
    { name: "Chaithanya", id: "2520090099", role: "File I/O & Performance Benchmarking" }
  ],
  faculty: "Ragupathi.M",
  sourceDirDefault: "/home/user/Documents",
  backupDirDefault: "/home/user/Backup",
  bufferSize: "4096 bytes (4 KB)",
  comparisonKeys: "st_size + st_mtime",
  syncDirection: "SOURCE → BACKUP (One-Way Incremental Sync)"
};

export const INITIAL_FILES = [
  {
    id: 1,
    name: "thesis_draft.docx",
    status: "MODIFIED",
    sourceSize: "2.4 MB",
    backupSize: "2.1 MB",
    sourceSizeRaw: 2516582,
    backupSizeRaw: 2202009,
    sourceModified: "2026-09-30 10:32:14",
    backupModified: "2026-09-30 09:45:00",
    action: "Copy",
    reason: "Source timestamp is newer (10:32 > 09:45) & size changed"
  },
  {
    id: 2,
    name: "budget_2026.xlsx",
    status: "MODIFIED",
    sourceSize: "1.2 MB",
    backupSize: "1.1 MB",
    sourceSizeRaw: 1258291,
    backupSizeRaw: 1153433,
    sourceModified: "2026-09-30 11:10:05",
    backupModified: "2026-09-30 10:15:30",
    action: "Copy",
    reason: "Source timestamp is newer (11:10 > 10:15)"
  },
  {
    id: 3,
    name: "notes_week12.txt",
    status: "MODIFIED",
    sourceSize: "24 KB",
    backupSize: "21 KB",
    sourceSizeRaw: 24576,
    backupSizeRaw: 21504,
    sourceModified: "2026-09-30 12:05:40",
    backupModified: "2026-09-30 11:30:12",
    action: "Copy",
    reason: "Source size mismatched (24KB != 21KB)"
  },
  {
    id: 4,
    name: "photo.jpg",
    status: "UNCHANGED",
    sourceSize: "3.2 MB",
    backupSize: "3.2 MB",
    sourceSizeRaw: 3355443,
    backupSizeRaw: 3355443,
    sourceModified: "2026-09-30 09:20:00",
    backupModified: "2026-09-30 09:20:00",
    action: "Skip",
    reason: "Timestamps and sizes match exactly"
  },
  {
    id: 5,
    name: "report.pdf",
    status: "UNCHANGED",
    sourceSize: "850 KB",
    backupSize: "850 KB",
    sourceSizeRaw: 870400,
    backupSizeRaw: 870400,
    sourceModified: "2026-09-30 08:45:10",
    backupModified: "2026-09-30 08:45:10",
    action: "Skip",
    reason: "Timestamps and sizes match exactly"
  },
  {
    id: 6,
    name: "kernel_module_notes.c",
    status: "NEW",
    sourceSize: "14 KB",
    backupSize: "--",
    sourceSizeRaw: 14336,
    backupSizeRaw: 0,
    sourceModified: "2026-09-30 12:30:00",
    backupModified: "File does not exist in backup",
    action: "Copy",
    reason: "Backup file missing (stat() returned ENOENT)"
  },
  {
    id: 7,
    name: "presentation_slides.pptx",
    status: "MODIFIED",
    sourceSize: "18.5 MB",
    backupSize: "16.2 MB",
    sourceSizeRaw: 19398656,
    backupSizeRaw: 16986931,
    sourceModified: "2026-09-30 12:45:18",
    backupModified: "2026-09-30 08:10:00",
    action: "Copy",
    reason: "Source timestamp is newer (12:45 > 08:10)"
  },
  {
    id: 8,
    name: "lab_experiment_results.csv",
    status: "UNCHANGED",
    sourceSize: "512 KB",
    backupSize: "512 KB",
    sourceSizeRaw: 524288,
    backupSizeRaw: 524288,
    sourceModified: "2026-09-30 07:15:00",
    backupModified: "2026-09-30 07:15:00",
    action: "Skip",
    reason: "Timestamps and sizes match exactly"
  },
  {
    id: 9,
    name: "ossp_assignment2.tar.gz",
    status: "MODIFIED",
    sourceSize: "4.8 MB",
    backupSize: "4.2 MB",
    sourceSizeRaw: 5033164,
    backupSizeRaw: 4404019,
    sourceModified: "2026-09-30 11:50:22",
    backupModified: "2026-09-30 10:00:00",
    action: "Copy",
    reason: "Source timestamp is newer"
  }
];

export const SYSTEM_CALLS = [
  {
    name: "open()",
    purpose: "Opens a file and returns a file descriptor integer referencing the open file description in kernel space.",
    syntax: "int open(const char *pathname, int flags, mode_t mode);",
    role: "Used to open source files in read-only mode (O_RDONLY) and destination backup files in write-only/create mode (O_WRONLY | O_CREAT | O_TRUNC).",
    header: "<fcntl.h>",
    returns: "File Descriptor (int >= 0) on success, -1 on error with errno set.",
    codeSnippet: `int src_fd = open(src_path, O_RDONLY);\nint dst_fd = open(dst_path, O_WRONLY | O_CREAT | O_TRUNC, 0644);`
  },
  {
    name: "read()",
    purpose: "Attempts to read up to count bytes from file descriptor fd into the buffer starting at buf.",
    syntax: "ssize_t read(int fd, void *buf, size_t count);",
    role: "Reads data from the source file descriptor in 4096-byte (4KB) chunks during file copying.",
    header: "<unistd.h>",
    returns: "Number of bytes read (0 indicates EOF), -1 on error.",
    codeSnippet: `char buf[4096];\nssize_t bytes_read = read(src_fd, buf, sizeof(buf));`
  },
  {
    name: "write()",
    purpose: "Writes up to count bytes from the buffer starting at buf to the file referred to by the file descriptor fd.",
    syntax: "ssize_t write(int fd, const void *buf, size_t count);",
    role: "Writes copied data buffer chunks into the backup file descriptor.",
    header: "<unistd.h>",
    returns: "Number of bytes written, -1 on error.",
    codeSnippet: `if (write(dst_fd, buf, bytes_read) != bytes_read) {\n    perror("write");\n}`
  },
  {
    name: "close()",
    purpose: "Closes a file descriptor, so that it no longer refers to any file and may be reused.",
    syntax: "int close(int fd);",
    role: "Releases opened file descriptors and flushes internal kernel I/O buffers for both source and destination.",
    header: "<unistd.h>",
    returns: "0 on success, -1 on error.",
    codeSnippet: `close(src_fd);\nclose(dst_fd);`
  },
  {
    name: "stat()",
    purpose: "Retrieves file metadata information about a file, pointed to by pathname, into a struct stat structure.",
    syntax: "int stat(const char *pathname, struct stat *statbuf);",
    role: "Used to extract st_size (file size in bytes) and st_mtime (last modification time) for change detection comparison.",
    header: "<sys/stat.h>",
    returns: "0 on success, -1 if file missing (ENOENT) or inaccessible.",
    codeSnippet: `struct stat st_src, st_dst;\nstat(src_path, &st_src);\nstat(dst_path, &st_dst);\nif (st_src.st_mtime > st_dst.st_mtime || st_src.st_size != st_dst.st_size) {\n    // Copy required\n}`
  },
  {
    name: "opendir()",
    purpose: "Opens a directory stream corresponding to the directory named by name.",
    syntax: "DIR *opendir(const char *name);",
    role: "Used to open the source directory stream for entry-by-entry traversal.",
    header: "<dirent.h>",
    returns: "Pointer to DIR structure on success, NULL on error.",
    codeSnippet: `DIR *dir = opendir(source_dir_path);\nif (!dir) {\n    perror("opendir");\n    return -1;\n}`
  },
  {
    name: "readdir()",
    purpose: "Returns a pointer to a dirent structure representing the next directory entry in the directory stream.",
    syntax: "struct dirent *readdir(DIR *dirp);",
    role: "Iterates through entries in the source directory to discover files and ignore special entries (. and ..).",
    header: "<dirent.h>",
    returns: "Pointer to struct dirent on success, NULL on reaching end of directory stream or error.",
    codeSnippet: `struct dirent *entry;\nwhile ((entry = readdir(dir)) != NULL) {\n    if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) continue;\n    printf("Found file: %s\\n", entry->d_name);\n}`
  }
];

export const PERFORMANCE_DATA = [
  { files: "50 Files", fullBackup: 0.18, incremental: 0.05, speedup: "3.6x" },
  { files: "100 Files", fullBackup: 0.35, incremental: 0.08, speedup: "4.38x" },
  { files: "250 Files", fullBackup: 0.90, incremental: 0.13, speedup: "6.92x" },
  { files: "500 Files", fullBackup: 1.85, incremental: 0.22, speedup: "8.41x" }
];

export const TEST_CASES = [
  {
    id: "TEST 01",
    title: "New file added to source directory",
    scenario: "Source contains new file 'kernel_module_notes.c' which does not exist in destination backup.",
    systemCalls: ["stat() -> ENOENT", "open()", "read()", "write()", "close()"],
    expected: "File stat() fails with ENOENT. System triggers open() & write() to create copy.",
    result: "PASS",
    details: "1 file created in backup directory successfully."
  },
  {
    id: "TEST 02",
    title: "Existing file modified in source directory",
    scenario: "Source file 'thesis_draft.docx' has st_mtime updated from 09:45 to 10:32.",
    systemCalls: ["stat() source", "stat() backup", "open()", "read()", "write()", "close()"],
    expected: "st_src.st_mtime > st_dst.st_mtime evaluates to TRUE. File overwrites backup.",
    result: "PASS",
    details: "Backup file replaced with updated 2.4 MB version."
  },
  {
    id: "TEST 03",
    title: "Unchanged file re-run",
    scenario: "Re-executing BackupSync without making any changes to 'photo.jpg'.",
    systemCalls: ["stat() source", "stat() backup"],
    expected: "Timestamps and sizes match identically. System bypasses open/read/write pipeline.",
    result: "PASS",
    details: "File skipped in 0.0001 seconds without I/O overhead."
  },
  {
    id: "TEST 04",
    title: "Invalid / missing source path",
    scenario: "Executing command with non-existent source directory path '/invalid/path'.",
    systemCalls: ["opendir() -> NULL"],
    expected: "opendir() returns NULL. Program prints perror(\"opendir\") and safely terminates.",
    result: "PASS",
    details: "Clean error exit with status code -1."
  },
  {
    id: "TEST 05",
    title: "Permission-denied file access",
    scenario: "Source directory contains file with mode 000 (no read permissions for current user).",
    systemCalls: ["open() -> EACCES"],
    expected: "open() returns -1 with errno = EACCES. Error logged and sync continues for next files.",
    result: "PASS",
    details: "Error logged gracefully; remaining 127 files synchronized without crash."
  },
  {
    id: "TEST 06",
    title: "Empty source directory",
    scenario: "Executing sync on an empty directory containing no user files.",
    systemCalls: ["opendir()", "readdir() -> NULL", "closedir()"],
    expected: "readdir() returns NULL immediately. Summary reports '0 files scanned, nothing to sync'.",
    result: "PASS",
    details: "Synchronization complete with 0 copies and 0 errors."
  }
];

export const C_SOURCE_FILES = {
  "src/main.c": `/*
 * BackupSync - Linux File Backup & Synchronization System Using System Calls
 * Course: OSSP (25CS2104E) | Team No. 12
 * File: main.c
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "../include/backupsync.h"

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Usage: %s <source_directory> <backup_directory>\\n", argv[0]);
        return EXIT_FAILURE;
    }

    const char *src_dir = argv[1];
    const char *dst_dir = argv[2];

    printf("=====================================================\\n");
    printf("  BACKUPSYNC - Linux File Synchronization System\\n");
    printf("=====================================================\\n");
    printf("Source: %s\\nBackup: %s\\n\\n", src_dir, dst_dir);

    clock_t start_time = clock();
    
    SyncStats stats = {0, 0, 0, 0};
    
    // Step 1: Scan and synchronize source directory entries
    if (scan_and_sync_directory(src_dir, dst_dir, &stats) != 0) {
        fprintf(stderr, "Error during directory synchronization.\\n");
        return EXIT_FAILURE;
    }

    clock_t end_time = clock();
    double elapsed_time = (double)(end_time - start_time) / CLOCKS_PER_SEC;

    printf("\\nSynchronization complete.\\n");
    printf("-----------------------------------------------------\\n");
    printf("Files Scanned : %d\\n", stats.scanned);
    printf("Files Copied  : %d\\n", stats.copied);
    printf("Files Skipped : %d\\n", stats.skipped);
    printf("Errors        : %d\\n", stats.errors);
    printf("Elapsed Time  : %.2f seconds\\n", elapsed_time);
    printf("=====================================================\\n");

    return EXIT_SUCCESS;
}`,

  "src/scan.c": `/*
 * File: scan.c
 * Directory traversal using opendir() and readdir() system call wrappers
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include "../include/backupsync.h"

int scan_and_sync_directory(const char *src_dir, const char *dst_dir, SyncStats *stats) {
    // Open directory stream using POSIX opendir()
    DIR *dir = opendir(src_dir);
    if (!dir) {
        perror("[ERROR] opendir failed for source path");
        return -1;
    }

    struct dirent *entry;
    char src_filepath[1024];
    char dst_filepath[1024];

    // Read entries sequentially using readdir()
    while ((entry = readdir(dir)) != NULL) {
        // Skip current (.) and parent (..) directory entries
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
            continue;
        }

        stats->scanned++;
        
        snprintf(src_filepath, sizeof(src_filepath), "%s/%s", src_dir, entry->d_name);
        snprintf(dst_filepath, sizeof(dst_filepath), "%s/%s", dst_dir, entry->d_name);

        // Check metadata and decide whether copy is needed
        int decision = check_if_copy_needed(src_filepath, dst_filepath);

        if (decision == COPY_NEEDED) {
            printf("[COPY] Syncing: %s -> %s\\n", entry->d_name, dst_filepath);
            if (copy_file(src_filepath, dst_filepath) == 0) {
                stats->copied++;
            } else {
                stats->errors++;
            }
        } else if (decision == NO_COPY_NEEDED) {
            printf("[SKIP] Unchanged: %s\\n", entry->d_name);
            stats->skipped++;
        } else {
            fprintf(stderr, "[ERROR] Metadata check failed for: %s\\n", entry->d_name);
            stats->errors++;
        }
    }

    closedir(dir);
    return 0;
}`,

  "src/compare.c": `/*
 * File: compare.c
 * File metadata inspection using stat() system call
 */

#include <stdio.h>
#include <sys/stat.h>
#include <errno.h>
#include "../include/backupsync.h"

int check_if_copy_needed(const char *src_path, const char *dst_path) {
    struct stat st_src, st_dst;

    // Fetch source file metadata using stat()
    if (stat(src_path, &st_src) != 0) {
        perror("[ERROR] stat() source file");
        return ERROR_METADATA;
    }

    // Fetch destination file metadata using stat()
    if (stat(dst_path, &st_dst) != 0) {
        // If destination file does not exist (ENOENT), a copy is required
        if (errno == ENOENT) {
            return COPY_NEEDED;
        }
        perror("[ERROR] stat() backup file");
        return ERROR_METADATA;
    }

    // Core Decision Rule:
    // Copy if source size differs OR source modification time is newer
    if (st_src.st_size != st_dst.st_size || st_src.st_mtime > st_dst.st_mtime) {
        return COPY_NEEDED;
    }

    return NO_COPY_NEEDED;
}`,

  "src/copy.c": `/*
 * File: copy.c
 * File copy implementation using open(), read(), write(), and close() system calls
 */

#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>
#include "../include/backupsync.h"

#define BUFFER_SIZE 4096

int copy_file(const char *src_path, const char *dst_path) {
    // System Call 1: open() source file for reading
    int in_fd = open(src_path, O_RDONLY);
    if (in_fd < 0) {
        perror("[ERROR] open() source file");
        return -1;
    }

    // System Call 2: open() destination file for writing (create if non-existent, truncate if exists)
    int out_fd = open(dst_path, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (out_fd < 0) {
        perror("[ERROR] open() destination file");
        close(in_fd);
        return -1;
    }

    char buffer[BUFFER_SIZE];
    ssize_t bytes_read, bytes_written;

    // System Calls 3 & 4: read() from source and write() to backup in 4KB chunks
    while ((bytes_read = read(in_fd, buffer, sizeof(buffer))) > 0) {
        bytes_written = write(out_fd, buffer, bytes_read);
        if (bytes_written != bytes_read) {
            perror("[ERROR] write() failed during file copy");
            close(in_fd);
            close(out_fd);
            return -1;
        }
    }

    if (bytes_read < 0) {
        perror("[ERROR] read() failed");
    }

    // System Calls 5 & 6: close() both file descriptors
    close(in_fd);
    close(out_fd);

    return (bytes_read < 0) ? -1 : 0;
}`,

  "include/backupsync.h": `/*
 * Header File: backupsync.h
 */

#ifndef BACKUPSYNC_H
#define BACKUPSYNC_H

#define COPY_NEEDED 1
#define NO_COPY_NEEDED 0
#define ERROR_METADATA -1

typedef struct {
    int scanned;
    int copied;
    int skipped;
    int errors;
} SyncStats;

// Function Prototypes
int scan_and_sync_directory(const char *src_dir, const char *dst_dir, SyncStats *stats);
int check_if_copy_needed(const char *src_path, const char *dst_path);
int copy_file(const char *src_path, const char *dst_path);

#endif // BACKUPSYNC_H`,

  "Makefile": `# Makefile for BackupSync (Linux Build System)
CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -Iinclude
TARGET = backupsync

SRCS = src/main.c src/scan.c src/compare.c src/copy.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f src/*.o $(TARGET)

.PHONY: all clean`,

  "README.md": `# BACKUPSYNC - Linux File Backup & Synchronization System

OSSP Course Project (25CS2104E) - Team 12 (Section 22)

## Overview
BackupSync is an efficient, incremental file synchronization utility built natively in C using POSIX/Linux system calls (\`open\`, \`read\`, \`write\`, \`close\`, \`stat\`, \`opendir\`, \`readdir\`).

## Compilation & Usage
\`\`\`bash
# Compile using GCC
make

# Run synchronization (Source -> Backup)
./backupsync ~/Documents ~/Backup
\`\`\`
`
};

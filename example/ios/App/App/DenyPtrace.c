//
//  DenyPtrace.c
//  App
//
//  Created by ashoka on 2022/2/14.
//

// 阻止 gdb/lldb 调试
// 调用 ptrace 设置参数 PT_DENY_ATTACH，如果有调试器依附，则会产生错误并退出

#include <stdio.h>
#import <dlfcn.h>
#import <sys/types.h>
#import <sys/stat.h>
#import <unistd.h>
#import <sys/sysctl.h>
#import <assert.h>
#import <stdlib.h>

typedef int (*ptrace_ptr_t)(int _request, pid_t _pid, caddr_t _addr, int _data);

#ifndef PT_DENY_ATTACH
    #define PT_DENY_ATTACH 31
#endif

// 通过 sysctl 查询 ptrace
int isDebugger(void) {
    /**
     1. int *   查询信息的数组
     2. u_int   数组中数据类型的大小
     3. void *  接收信息的结构体的指针
     4. size_t *    接收信息的结构体的大小
     5.6. 默认传0，依据前面的参数决定传参
     */
    int name[4];    // 放字节码，查询的信息
    name[0] = CTL_KERN; // 查询内核
    name[1] = KERN_PROC;    // 查询进程
    name[2] = KERN_PROC_PID;    // 传递的参数是进程的ID(PID)
    name[3] = getpid(); // 提供PID
    
    struct kinfo_proc info; // 接收进程信息的结构体
    size_t info_size = sizeof(info);
    
    int err = sysctl(name, 4, &info, &info_size, 0, 0);
    assert(err == 0);
    
    return (info.kp_proc.p_flag & P_TRACED);
}

#ifndef DEBUG

void anti_gdb_debug(void) {
    void *handle = dlopen(0, RTLD_GLOBAL | RTLD_NOW);
    ptrace_ptr_t ptrace_ptr = dlsym(handle, "ptrace");
    ptrace_ptr(PT_DENY_ATTACH, 0, 0, 0);
    dlclose(handle);
    
    syscall(26, 31, 0, 0, 0);
    
    if (isDebugger() == 1) {
        exit(1);
    }
}

#else

void anti_gdb_debug(void) {}

#endif

int checkJailBroken(void) {
    char *JbPaths[] = {
        "/Applications/Cydia.app",
        "/Library/MobileSubstrate",
        "/var/lib/cydia,"
        "/usr/sbin/sshd",
        "/bin/bash",
        "/etc/apt",
        "/User/Applications/"
    };
    
    for (int i = 0; i < sizeof(JbPaths) / sizeof(char *); i++) {
        struct stat stat_info;
        if (0 == stat(JbPaths[i], &stat_info)) {
            return 1;
        }
    }
    return 0;
}

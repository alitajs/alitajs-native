//
//  main.swift
//  App
//
//  Created by ashoka on 2022/2/14.
//

import Foundation
import UIKit

autoreleasepool {
    anti_gdb_debug()
    UIApplicationMain(CommandLine.argc, UnsafeMutableRawPointer(CommandLine.unsafeArgv).bindMemory(to: UnsafeMutablePointer<Int8>.self, capacity: Int(CommandLine.argc)), nil, NSStringFromClass(AppDelegate.self))
}

//
//  AlitaWebViewController.swift
//  AlitaIOS
//
//  Created by ashoka on 2022/1/5.
//

import Capacitor

@objc open class AlitaWebViewController: CAPBridgeViewController {
    public private(set) var serverURL: String?;
    public private(set) var appURL: URL?
    public private(set) var configURL: URL?
    public private(set) var cordovaConfiguration: URL?
    // MARK: - Initialization
    public convenience init() {
        self.init(serverURL: nil)
    }
    
    @objc public init(serverURL: String?) {
        self.serverURL = serverURL
        super.init(nibName: nil, bundle: nil)
    }
    
    @objc public init(appURL: URL?, configURL: URL?, cordovaConfiguration: URL?) {
        self.appURL = appURL
        self.configURL = configURL
        self.cordovaConfiguration = cordovaConfiguration
        super.init(nibName: nil, bundle: nil)
    }
    
    @objc public init(serverURL: String?, appURL: URL?, configURL: URL?, cordovaConfiguration: URL?) {
        self.serverURL = serverURL
        self.appURL = appURL
        self.configURL = configURL
        self.cordovaConfiguration = cordovaConfiguration
        super.init(nibName: nil, bundle: nil)
    }
    
    public required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    open override func instanceDescriptor() -> InstanceDescriptor {
        let descriptor: InstanceDescriptor
        let alitaBundle = Bundle(for: AlitaWebViewController.self);
        if self.appURL != nil || self.serverURL != nil {
            // 如果 configURL 为空，那么使用 AlitaIOS 内置的 capacitor.config.json
            self.configURL = self.configURL ?? alitaBundle.url(forResource: "capacitor.config", withExtension: "json")
            // 如果 cordovaConfiguration 为空，那么使用 AlitaIOS 内置的 config.xml
            self.cordovaConfiguration = self.cordovaConfiguration ?? alitaBundle.url(forResource: "config", withExtension: "xml")
            // 如果 appURL 对应的文件夹不存在，那么使用 AlitaIOS 内置的 public 文件夹
            self.appURL = self.appURL ?? alitaBundle.url(forResource: "public", withExtension: nil)
            if self.appURL != nil && FileManager.default.fileExists(atPath: self.appURL!.path) {
                descriptor = InstanceDescriptor(at: self.appURL!, configuration: self.configURL, cordovaConfiguration: self.cordovaConfiguration)
            } else {
                descriptor = super.instanceDescriptor()
            }
        } else {
            descriptor = super.instanceDescriptor()
        }
        if let serverURL = self.serverURL {
            descriptor.serverURL = serverURL
        }
        return descriptor
    }
}

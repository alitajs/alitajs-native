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
    
    public init(serverURL: String?) {
        self.serverURL = serverURL
        super.init(nibName: nil, bundle: nil)
    }
    
    public init(appURL: URL?, configURL: URL?, cordovaConfiguration: URL?) {
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
        if let appURL = self.appURL {
            descriptor = InstanceDescriptor(at: appURL, configuration: configURL, cordovaConfiguration: cordovaConfiguration)
        } else {
            descriptor = super.instanceDescriptor()
        }
        if let serverURL = self.serverURL {
            descriptor.serverURL = serverURL
        }
        return descriptor
    }
}

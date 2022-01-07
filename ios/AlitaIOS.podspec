#
# Be sure to run `pod lib lint AlitaIOS.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'AlitaIOS'
  s.version          = '0.1.0'
  s.summary          = 'Alita iOS SDK'
  s.description      = <<-DESC
Alita iOS SDK is a wrapper of Capacitor. Support open web through URL or custom web folder.
                       DESC
  s.homepage         = 'https://github.com/falcon11/alitajs-native/ios'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'falcon11' => 'savebtc11@gmail.com' }
  s.source           = { :git => 'https://github.com/falcon11/alitajs-native.git', :tag => s.version.to_s }
  s.ios.deployment_target = '12.0'
  s.source_files = 'AlitaIOS/Classes/**/*'
  s.resources = [
    'AlitaIOS/Assets/public',
    'AlitaIOS/Assets/capacitor.config.json',
    'AlitaIOS/Assets/config.xml'
  ]
  s.dependency 'Capacitor', '>= 3.3.3'
  s.dependency 'CapacitorActionSheet'
  s.dependency 'CapacitorAppLauncher'
  s.dependency 'CapacitorApp'
  s.dependency 'CapacitorBrowser'
  s.dependency 'CapacitorCamera'
  s.dependency 'CapacitorClipboard'
  s.dependency 'CapacitorDevice'
  s.dependency 'CapacitorDialog'
  s.dependency 'CapacitorFilesystem'
  s.dependency 'CapacitorGeolocation'
  s.dependency 'CapacitorKeyboard'
  s.dependency 'CapacitorLocalNotifications'
  s.dependency 'CapacitorNetwork'
  s.dependency 'CapacitorPushNotifications'
  s.dependency 'CapacitorShare'
  s.dependency 'CapacitorStatusBar'
  s.dependency 'CapacitorStorage'
  s.dependency 'CapacitorToast'
end

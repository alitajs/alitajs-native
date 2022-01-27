---
order: 4
---

# ios 原生项目集成

## 添加依赖

```ruby
# AlitaIOS 包括了基础 Capacitor 库，定制的 WebViewController，及官方的插件
pod 'AlitaIOS'
# 下面添加除 AlitaIOS 内置外的插件
...
```

## 修改 AppDelegate

如果出现 `AppDelegate` 同名的错误，修改主工程中 `AppDelegate` 类名.

在 `AppDelegate` 中视情况添加如下修改，有使用到相关功能加下，否则可不用加。

```swift
import Capacitor

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    // Called when the app was launched with a url. Feel free to add additional processing here,
    // but if you want the App API to support tracking app url opens, make sure to keep this call
    return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
}

func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    // Called when the app was launched with an activity, including Universal Links.
    // Feel free to add additional processing here, but if you want the App API to support
    // tracking app url opens, make sure to keep this call
    return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
}

override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)

    let statusBarRect = UIApplication.shared.statusBarFrame
    guard let touchPoint = event?.allTouches?.first?.location(in: self.window) else { return }

    if statusBarRect.contains(touchPoint) {
        NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
    }
}

func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## 打开页面

```objc
@import AlitaIOS;

AlitaWebViewController *vc = [[AlitaWebViewController alloc] initWithServerURL:@"http://192.168.1.8:8000"];
[self presentViewController:vc animated:YES completion:nil];
```

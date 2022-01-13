# 怎么运行 `example` 工程

下面介绍两种运行 `example` 工程的方法

## 方法 1

```sh
yarn
yarn build
yarn start
cd example
yarn
npx umi native init --all
```

修改 `capacitor.config.ts` 文件

```js
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iwhale.app',
  appName: 'App',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.8:8000', // url 里 ip 改成本机 ip
    cleartext: true,
  },
};

export default config;
```

同步插件到原生工程

```sh
npx umi native sync
```

用 IDE 打开 `example` 下对应的原生工程，并运行。或者运行下面命令运行原生工程

```sh
npx umi native run ios/android
```

## 方法 2

在项目根目录

```sh
yarn
yarn start
```

### ios

```sh
cd ios/Example
pod install
```

修改 `AppDelegate.swift`

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    // 如果在真机运行，将下面 localhost 改成
    window?.rootViewController = AlitaWebViewController(serverURL: "http://localhost:8000")
    return true
}
```

然后用 Xcode 打开 `AlitaIOS.xcworkspace`，运行工程

### android

TODO

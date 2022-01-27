---
order: 6
---

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

```sh
cd android/AlitaAndroid
```

用 `Android Studio` 打开工程

修改 `MainActivity.java`

```java
public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
    findViewById(R.id.main_button).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, AlitaJsActivity.class);
        // 将下面 ip 改成电脑 ip
        intent.putExtra("serverUrl", "http://10.128.3.84:8000");
        startActivity(intent);
      }
    });
  }
}
```

然后在 `Android Studio` 运行工程

# 编写自己的插件

本文介绍下怎么开发一个插件

## 创建 app

```sh
npm init @capacitor/plugin
```

进入插件目录，运行 `yarn`，安装依赖

## 定义插件提供的方法

修改 `src/definitions.ts`

在下面的例子中，添加了 `openMap` 的方法，一般方法参数是个 `options` 对象，里面有真正的参数，这里 `options` 里有 `latitude` 和 `longtitude` 两个参数。`OpenMapOptions` 是对 `options` 的描述，方便开发时能提供智能提示。

```ts
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
+  /**
+   * Opens the map at a given location.
+   *
+   * @since 1.1.0
+   */
  openMap(options: OpenMapOptions): Promise<void>;
}

export interface OpenMapOptions {
+  /**
+   * The latitude at which to open the map.
+   */
  latitude: number;
+  /**
+   * The longitude at which to open the map.
+   */
  longitude: number;
}
```

在 `src/web.ts` 里实现该方法

```js
import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
   // 其他方法

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // 方法实现，如果该方法在纯浏览器环境需要，那么要在这添加实现逻辑，否则可以抛出错误 throw this.unimplemented('该方法在浏览器没有现实.');
+  }
 }
```

在 `android` 工程中实现该方法，`android/src/main/[nested folders]/EchoPlugin.java`:

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // 更多实现

  call.resolve();
}
```

在 `ios` 工程中现实该方法， `ios/Plugin/EchoPlugin.swift`：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getNumber("latitude")
  let longitude = call.getNumber("longitude")

  // 更多实现

  call.resolve()
}
```

> 注意方法前面加 `@objc` 前缀

`ios` 还需要在 `.m` 文件中注册要提供给 `web` 的方法， `ios/Plugin/EchoPlugin.m`：

```objc
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(openMap, CAPPluginReturnPromise);
)
```

## 本地测试

```sh
cd example
yarn create alita .
yarn
yarn add ..
```

然后参考 [快速开始](./quick-start) 教程，初始化原生项目，使用测试该插件

## 文档生成

```sh
yarn docgen
```

以上命令会自动修改 `README.md` 生产 `api` 文档。

## 发布

发布之前先改下版本号

```sh
npm version 1.x.x -m "chore: release %s"
```

上面命令会将 `package.json` 版本号修改为 `1.x.x`，同时打 `tag`。

如果该插件要发布到 `npm`，那么可以运行:

```sh
npm publish --access public
```

如果公司内部有 `npm` 仓库，那么可以将 `npm` 源改成公司内部源，然后运行上面命令。

否则，提交代码时，要先运行 `yarn build`，然后将 `dist` 一起提交到 `git`。安装插件时，通过 `git` 地址加 `tag` 进行安装。

## 更多文档

以上只是简单的插件创建流程，如果有其他疑问，可以查看更[详细文档](https://capacitorjs.com/docs/plugins/creating-plugins)

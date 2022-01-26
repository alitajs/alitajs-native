# 快速开始

## 创建 `alita` 项目

```sh
yarn create alita my-alita-app
cd my-alita-app
yarn
```

## 安装 `alita-native` 插件

```sh
yarn add alita-native
```

修改 `config/config.ts`

```js
import { defineConfig } from 'alita';

export default defineConfig({
  ...
  plugins: ['alita-native'],
  ...
});
```

## 初始化原生工程

```js
npx alita native init --all
```

上面命令会初始化 `android` 和 `ios` 原生项目，并安装[常用的原生插件](./plugins)。

如果出现了 `Could not find the web assets directory: ./dist.` 这报错不用管，因为我们现在还没运行 `yarn build` 生成 `dist`。

## 启用 `live reload`

`live reload` 功能可以帮助本地开发在机子运行时，页面会在修改代码后实时刷新。

修改 `capacitor.config.json` 文件，添加 `server` 配置，

```json
{
  "appId": "com.alita.capacitor",
  "appName": "MyAlitaApp",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "url": "http://192.168.1.8:8000", // 192.168.1.8 改成自己本机 ip，如果用 127.0.0.1 或者 localhost 在 安卓没法运行。如果生产也是部署在服务端，则改成服务端地址。
    "cleartext": true
  }
}
```

## 启动 `alita` 开发环境

```sh
yarn start
```

## 编译 `h5` 项目

由于一些命令会用到编译产物，所以先编译下

```sh
yarn build
```

## 启动 `ios`

只能在苹果系统上运行

```sh
npx alita native run ios
```

运行上面命令会提示选择模拟器，选择自己想用的模拟器运行

如果想通过 `xcode` 运行，那么要先运行下面命令，将原生插件同步到原生工程里，然后再通过 `xcode` 运行项目

```sh
npx alita native sync ios
```

## 启动 `android`

```sh
npx alita native run android
```

运行上面命令会提示选择模拟器，选择自己想用的模拟器运行

如果想通过 `Android Studio` 运行，那么需要先运行下面命令，将原生插件同步到原生工程里，然后通过 `Android` 运行项目

```sh
npx alita native sync ios
```

**推荐先通过 `Android Studio` 运行一次，提高直接命令行运行成功率**

## 使用原生插件

可以在 `package.json` 里的 `dependencies` 看到所有原生插件，原生插件的包名一般以 `@capacitor/` 或 `@capacitor-community/` 开头，还有一些我们开发的插件，以 `@alitajs/` 开头。可以到 [plugins.md](./plugins) 插件目前常用的一些插件。当然，也可以自己从网上找一些其他插件，可能并不是以这些前缀开头。

这里以 `@capacitor/device` 插件为例介绍下插件怎么使用。

一般使用插件时，都要先看下插件文档介绍，我们可以在 [https://capacitorjs.com/docs/apis](https://capacitorjs.com/docs/apis) 找到常用的一些插件文档，`device` 插件文档就在这里面。其他插件自行到插件开源地址查看文档。

假设我们现在需要获取设备信息，那么添加如下代码

```js
import React, { FC, useState, useEffect } from 'react';
import { Device, DeviceInfo } from '@capacitor/device';
import styles from './index.less';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();
  const getDeviceInfo = async () => {
    const deviceInfo = await Device.getInfo();
    setDeviceInfo(deviceInfo);
  };
  useEffect(() => {
    getDeviceInfo();
  }, []);
  return <div className={styles.center}>{JSON.stringify(deviceInfo, null, 2)}</div>;
};

export default HomePage;
```

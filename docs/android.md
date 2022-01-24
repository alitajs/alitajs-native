# android 原生项目集成

## 开发

开发一般是跟原生项目分开，在 `alita` 项目集成 `alita-native`，然后初始化 `ios` 和 `android` 平台，添加插件进行开发。等开发完成，如果有需要集成到原有的原生项目，才需要下面步骤。

## 1. `build.gradle` 添加依赖

```sh
implementation 'io.github.alitajs:alitaJsAndroid:1.0.0'
```

## 2. 拷贝配置文件

`AndroidManifest.xml` 修改：

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths"></meta-data>
</provider>
```

## 3. 拷贝资源文件

拷贝安卓工程中的 `capacitor.config.json`、`capacitor.plugins.json` 到 `assets` 目录

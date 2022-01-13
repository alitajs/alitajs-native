package com.alitajs.capacitorandroid;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.capacitorjs.plugins.actionsheet.ActionSheetPlugin;
import com.capacitorjs.plugins.app.AppPlugin;
import com.capacitorjs.plugins.applauncher.AppLauncherPlugin;
import com.capacitorjs.plugins.browser.BrowserPlugin;
import com.capacitorjs.plugins.camera.CameraPlugin;
import com.capacitorjs.plugins.clipboard.ClipboardPlugin;
import com.capacitorjs.plugins.device.DevicePlugin;
import com.capacitorjs.plugins.dialog.DialogPlugin;
import com.capacitorjs.plugins.filesystem.FilesystemPlugin;
import com.capacitorjs.plugins.geolocation.GeolocationPlugin;
import com.capacitorjs.plugins.keyboard.KeyboardPlugin;
import com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin;
import com.capacitorjs.plugins.network.NetworkPlugin;
import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.capacitorjs.plugins.share.SharePlugin;
import com.capacitorjs.plugins.statusbar.StatusBarPlugin;
import com.capacitorjs.plugins.storage.StoragePlugin;
import com.capacitorjs.plugins.toast.ToastPlugin;
import com.getcapacitor.BridgeFragment;
import com.getcapacitor.CapConfig;

public class AlitaJsFragment extends BridgeFragment {

  public static AlitaJsFragment newInstance(String serverUrl) {
    AlitaJsFragment fragment = new AlitaJsFragment();
    Bundle args = new Bundle();
    args.putString("serverUrl", serverUrl);
    fragment.setArguments(args);
    return fragment;
  }

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    initPlugins();
    setConfig(new CapConfig.Builder(getActivity()).setServerUrl(getServerUrl()).create());
    return super.onCreateView(inflater, container, savedInstanceState);
  }

  public void initPlugins() {
    addPlugin(ActionSheetPlugin.class);
    addPlugin(AppPlugin.class);
    addPlugin(AppLauncherPlugin.class);
    addPlugin(BrowserPlugin.class);
    addPlugin(CameraPlugin.class);
    addPlugin(ClipboardPlugin.class);
    addPlugin(DevicePlugin.class);
    addPlugin(DialogPlugin.class);
    addPlugin(FilesystemPlugin.class);
    addPlugin(GeolocationPlugin.class);
    addPlugin(KeyboardPlugin.class);
    addPlugin(LocalNotificationsPlugin.class);
    addPlugin(NetworkPlugin.class);
    addPlugin(SharePlugin.class);
    addPlugin(PushNotificationsPlugin.class);
    addPlugin(StatusBarPlugin.class);
    addPlugin(StoragePlugin.class);
    addPlugin(ToastPlugin.class);
  }

  public String getServerUrl() {
    try {
      if (getArguments() != null) {
        return getArguments().getString("serverUrl");
      }
      return "";
    } catch (Exception e) {
      e.printStackTrace();
      return "";
    }
  }
}

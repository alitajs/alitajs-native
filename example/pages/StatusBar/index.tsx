import React from 'react';
import { StatusBar, Style, Animation } from '@capacitor/status-bar';
import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    const statusBarTapHandler = () => {
      alert('status bar tapped');
    };
    window.addEventListener('statusTap', statusBarTapHandler);
    return () => {
      window.removeEventListener('statusTap', statusBarTapHandler);
    };
  }, []);
  const setOverlaysWebView = async () => {
    try {
      await StatusBar.setOverlaysWebView({ overlay: true });
    } catch (error) {
      alert(error);
    }
  };
  const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark });
  };
  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
  };
  const hideStatusBar = async () => {
    await StatusBar.hide({ animation: Animation.Fade });
  };
  const showStatusBar = async () => {
    await StatusBar.show({ animation: Animation.Slide });
  };
  return (
    <div className="page">
      <div>
        <button onClick={setOverlaysWebView}>SetOverlaysWebView</button>
      </div>
      <div>
        <button onClick={setStatusBarStyleDark}>SetStatusBarStyleDark</button>
        <button onClick={setStatusBarStyleLight}>SetStatusBarStyleLight</button>
      </div>
      <div>
        <button onClick={hideStatusBar}>Hide Status Bar</button>
        <button onClick={showStatusBar}>Show Status Bar</button>
      </div>
    </div>
  );
};

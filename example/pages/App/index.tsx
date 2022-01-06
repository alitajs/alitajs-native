import React, { FC, useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import styles from './index.css';

export default () => {
  const [status, setStatus] = useState('');
  const [appUrlOpen, setAppUrlOpen] = useState({});
  const checkAppLaunchUrl = async () => {
    const { url } = (await App.getLaunchUrl()) || {};

    alert('App opened with URL: ' + url);
  };
  useEffect(() => {
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
      setStatus('App state changed. Is active?: ' + isActive);
    });

    App.addListener('appUrlOpen', data => {
      console.log('App opened with URL:', data);
      setStatus('App opened with URL:' + data);
      setAppUrlOpen(data);
      checkAppLaunchUrl();
    });

    App.addListener('appRestoredResult', data => {
      console.log('Restored state:', data);
      setStatus('Restored state:' + data);
    });
    return () => {
      App.removeAllListeners();
    };
  }, []);
  return (
    <div className={styles.normal}>
      <strong>App Status</strong>
      <div>{status}</div>
      <strong>App opened with URL</strong>
      <div>{JSON.stringify(appUrlOpen, null, 2)}</div>
    </div>
  );
};

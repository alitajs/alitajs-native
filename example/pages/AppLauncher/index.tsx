import React, { FC, useEffect } from 'react';
import { AppLauncher } from '@capacitor/app-launcher';
import styles from './index.css';

export default () => {
  const checkCanOpenUrl = async () => {
    const { value } = await AppLauncher.canOpenUrl({
      url: 'map://?ll=50.894967,4.341626',
    });

    alert(`Can open url: ${value}`);
  };

  const openMap = async () => {
    await AppLauncher.openUrl({
      url: 'https://maps.apple.com/?ll=50.894967,4.341626',
    });
  };
  const openMessage = async () => {
    await AppLauncher.openUrl({
      url: 'sms:1-408-555-1212',
    });
  };
  useEffect(() => {
    checkCanOpenUrl();
  }, []);
  return (
    <div className="page">
      <div>
        <button onClick={openMap}>Open Map</button>
        <a>https://maps.apple.com/?ll=50.894967,4.341626</a>
      </div>
      <div>
        <button onClick={openMessage}>Open Message</button>
        <a>sms:1-408-555-1212</a>
      </div>
    </div>
  );
};

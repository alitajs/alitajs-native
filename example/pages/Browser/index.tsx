import React from 'react';
import { Browser } from '@capacitor/browser';

export default () => {
  const capacitorURL = 'https://capacitorjs.com';
  const openWeb = () => {
    Browser.open({ url: capacitorURL, toolbarColor: '#F10000' });
  };
  return (
    <div className="page">
      <div>
        <button onClick={openWeb}>Open Web</button>
        <div>
          <span>{capacitorURL}</span>
        </div>
      </div>
    </div>
  );
};

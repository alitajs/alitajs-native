import React from 'react';
import { Share } from '@capacitor/share';

export default () => {
  const share = async () => {
    try {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'https://alitajs.com/',
        dialogTitle: 'Share with buddies',
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="page">
      <div>
        <button onClick={share}>Share</button>
      </div>
    </div>
  );
};

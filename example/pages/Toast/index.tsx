import React from 'react';
import { Toast } from '@capacitor/toast';

export default () => {
  const show = async (position: 'top' | 'center' | 'bottom') => {
    await Toast.show({ text: 'Hello AlitaIOS', position });
  };
  return (
    <div className="page">
      <div>
        <button onClick={() => show('top')}>Show Top</button>
        <button onClick={() => show('center')}>Show Center</button>
        <button onClick={() => show('bottom')}>Show Bottom</button>
      </div>
    </div>
  );
};

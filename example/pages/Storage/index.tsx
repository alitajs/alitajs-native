import React from 'react';
import { Storage } from '@capacitor/storage';
import { useEffect } from 'react';
import { useState } from 'react';

export default () => {
  const [nameValue, setNameValue] = useState({});
  useEffect(() => {
    Storage.configure({ group: 'AlitaIOS' });
  }, []);
  const setName = async () => {
    await Storage.set({ key: 'name', value: 'AlitaIOS' });
  };
  const getName = async () => {
    const result = await Storage.get({ key: 'name' });
    setNameValue(result);
  };
  const clear = async () => {
    await Storage.clear();
  };
  const removeName = async () => {
    await Storage.remove({ key: 'name' });
  };
  return (
    <div className="page">
      <div>
        <button onClick={setName}>Set Name AlitaIOS</button>
        <button onClick={clear}>Clear</button>
        <button onClick={removeName}>Remove Name</button>
      </div>
      <div>
        <button onClick={getName}>Get Name</button>
      </div>
      <div>
        <code>{JSON.stringify(nameValue, null, 2)}</code>
      </div>
    </div>
  );
};

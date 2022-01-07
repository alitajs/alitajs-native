import React, { useState } from 'react';
import { Clipboard } from '@capacitor/clipboard';

export default () => {
  const [value, setValue] = useState('');
  const write = async () => {
    await Clipboard.write({ string: 'Hello Alita' });
  };
  const read = async () => {
    const result = await Clipboard.read();
    setValue(result.value);
  };
  return (
    <div className="page">
      <div>Write 'Hello Alita' to Clipboard</div>
      <button onClick={write}>Write</button>
      <button onClick={read}>Read Clipboard</button>
      <div>Clipboard Value: {value}</div>
    </div>
  );
};

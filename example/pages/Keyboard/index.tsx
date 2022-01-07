import React from 'react';
import { Keyboard } from '@capacitor/keyboard';
import { useEffect } from 'react';

export default () => {
  const showKeyboard = async () => {
    try {
      await Keyboard.show();
    } catch (error: any) {
      alert(error.message);
    }
  };
  const hideKeyboard = async () => {
    await Keyboard.hide();
  };
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', info => {
      console.log('keyboard will show with height:', info.keyboardHeight);
    });

    Keyboard.addListener('keyboardDidShow', info => {
      console.log('keyboard did show with height:', info.keyboardHeight);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboard will hide');
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log('keyboard did hide');
    });
    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);
  return (
    <div className="page">
      <div>
        <button onClick={showKeyboard}>Show Keyboard(Android only)</button>
      </div>
      <div>
        <button onClick={hideKeyboard}>Hide Keyboard</button>
      </div>
      <input type={'text'} />
    </div>
  );
};

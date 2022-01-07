import React from 'react';
import { Dialog } from '@capacitor/dialog';
import { useState } from 'react';

export default () => {
  const [inputText, setInputText] = useState({});
  const [confirmResult, setConfirmResult] = useState({});
  const handleAlert = async () => {
    await Dialog.alert({
      title: 'title',
      message: 'message',
      buttonTitle: 'button',
    });
  };
  const handlePrompt = async () => {
    const result = await Dialog.prompt({
      title: 'title',
      message: 'message',
      okButtonTitle: 'OK',
      cancelButtonTitle: 'Cancel',
      inputPlaceholder: 'input placeholder',
      inputText: 'hello alita',
    });
    setInputText(result);
  };
  const handleConfirm = async () => {
    const result = await Dialog.confirm({
      title: 'title',
      message: 'message',
      okButtonTitle: 'OK',
      cancelButtonTitle: 'Cancel',
    });
    setConfirmResult(result);
  };
  return (
    <div className="page">
      <button onClick={handleAlert}>Alert</button>
      <button onClick={handlePrompt}>Prompt</button>
      <button onClick={handleConfirm}>Confirm</button>
      <div>
        <strong>Prompt Result</strong>
        <code>{JSON.stringify(inputText, null, 2)}</code>
      </div>
      <div>
        <strong>Confirm Result</strong>
        <code>{JSON.stringify(confirmResult, null, 2)}</code>
      </div>
    </div>
  );
};

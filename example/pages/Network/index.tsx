import React from 'react';
import { Network } from '@capacitor/network';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default () => {
  const [status, setStatus] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});
  const removeRef = useRef<() => Promise<void>>();
  useEffect(() => {
    Network.addListener('networkStatusChange', status => {
      setCurrentStatus(status);
    }).then(({ remove }) => {
      removeRef.current = remove;
    });
    return () => {
      removeRef.current?.();
    };
  }, []);
  const getStatus = async () => {
    const status = await Network.getStatus();
    setStatus(status);
  };
  return (
    <div className="page">
      <div>
        <button onClick={getStatus}>Get Status</button>
      </div>
      <div>
        <code>{JSON.stringify(status, null, 2)}</code>
      </div>
      <h3>Current Status</h3>
      <div>
        <code>{JSON.stringify(currentStatus, null, 2)}</code>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';

export default () => {
  const [deviceId, setDeviceId] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});
  const [batteryInfo, setBatteryInfo] = useState({});
  const [languageCode, setLangugeCode] = useState({});
  const logDeviceInfo = async () => {
    const info = await Device.getInfo();

    console.log(info);
    setDeviceInfo(info);
  };

  const logBatteryInfo = async () => {
    const info = await Device.getBatteryInfo();

    console.log(info);
    setBatteryInfo(info);
  };
  const getDeviceId = async () => {
    const deviceId = await Device.getId();
    setDeviceId(deviceId);
  };
  const getLanguageCode = async () => {
    const result = await Device.getLanguageCode();
    setLangugeCode(result);
  };
  useEffect(() => {
    logDeviceInfo();
    logBatteryInfo();
    getDeviceId();
    getLanguageCode();
  }, []);
  return (
    <div className="page">
      <h3>DeviceId</h3>
      <code>{JSON.stringify(deviceId, null, 2)}</code>
      <h3>Device Info</h3>
      <code>{JSON.stringify(deviceInfo, null, 2)}</code>
      <h3>Battery Info</h3>
      <code>{JSON.stringify(batteryInfo, null, 2)}</code>
      <h3>Language Code</h3>
      <code>{JSON.stringify(languageCode, null, 2)}</code>
    </div>
  );
};

import React from 'react';
import {
  PushNotifications,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { useEffect } from 'react';
import { useState } from 'react';

export default () => {
  const [registerStatus, setRegisterStatus] = useState({});
  const [notification, setNotification] = useState<PushNotificationSchema>();
  useEffect(() => {
    PushNotifications.addListener('registration', status => {
      setRegisterStatus(status);
    });
    PushNotifications.addListener('registrationError', error => {
      setRegisterStatus(error);
    });
    PushNotifications.addListener('pushNotificationReceived', notification => {
      setNotification(notification);
    });
    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);
  const register = async () => {
    const permissions = await PushNotifications.checkPermissions();
    if (permissions.receive !== 'granted') {
      const permissions = await PushNotifications.requestPermissions();
      if (permissions.receive !== 'granted') {
        alert('Permission denied');
        return;
      }
    }
    await PushNotifications.register();
  };
  return (
    <div className="page">
      <div>
        <button onClick={register}>Register</button>
      </div>
      <h3>Register Status</h3>
      <div>
        <code>{JSON.stringify(registerStatus, null, 2)}</code>
      </div>
      <h3>Notification</h3>
      <div>
        <code>{notification && JSON.stringify(notification, null, 2)}</code>
      </div>
    </div>
  );
};

import React from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useEffect } from 'react';
import { useState } from 'react';

let notificationId = 1;

export default () => {
  const [notification, setNotification] = useState({});
  const schedule = async () => {
    let at = new Date();
    at = new Date(
      at.getFullYear(),
      at.getMonth(),
      at.getDate(),
      at.getHours(),
      at.getMinutes(),
      at.getSeconds() + 5,
    );
    const result = await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Hello Alita',
          body: 'this is body',
          id: notificationId++,
          schedule: { at },
        },
      ],
    });
    console.log('result', result);
  };
  useEffect(() => {
    LocalNotifications.checkPermissions().then(result => {
      console.log('checkPermissions', result);
      if (result.display !== 'granted') {
        LocalNotifications.requestPermissions().then(result => {
          console.log('requestPermissions', result);
        });
      }
    });
    LocalNotifications.addListener(
      'localNotificationReceived',
      notification => {
        setNotification(notification);
      },
    );
    return () => {
      LocalNotifications.removeAllListeners();
    };
  }, []);
  return (
    <div className="page">
      <div>
        <button onClick={schedule}>Add Local Notification(5s)</button>
      </div>
      <h3>Received Notification</h3>
      <code>{JSON.stringify(notification, null, 2)}</code>
    </div>
  );
};

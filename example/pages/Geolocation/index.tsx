import React, { useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import { useRef } from 'react';

export default () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [watchPositionResult, setWatchPositionResult] = useState<any>({});
  const watchId = useRef('');
  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
    setCurrentPosition(coordinates);
  };
  const watchPosition = async () => {
    const id = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (result, err) => {
        if (!err) {
          setWatchPositionResult(result);
        }
      },
    );
    watchId.current = id;
  };
  useEffect(() => {
    watchPosition();
    return () => {
      Geolocation.clearWatch({ id: watchId.current });
    };
  }, []);
  return (
    <div className="page">
      <div>
        <button onClick={printCurrentPosition}>Current Location</button>
      </div>
      <code>{JSON.stringify(currentPosition, null, 2)}</code>
      <h3>Watch Position</h3>
      <code>{JSON.stringify(watchPositionResult || {}, null, 2)}</code>
    </div>
  );
};

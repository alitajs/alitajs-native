import React from 'react';
import { useHistory, Helmet } from 'umi';
import styles from './index.css';

const plugins = [
  'Action Sheet',
  'App',
  'App Launcher',
  'Browser',
  'Camera',
  'Clipboard',
  'Device',
  'Dialog',
  'Filesystem',
  'Geolocation',
  'Keyboard',
  'Local Notification',
  'Network',
  'Push Notification',
  'Share',
  'Status Bar',
  'Storage',
  'Toast',
];

export default () => {
  const history = useHistory();
  const handleClick = (plugin: string) => {
    history.push(`/${plugin.replace(/\s/g, '')}`);
  };
  return (
    <div className={styles.normal}>
      <ul>
        {plugins.map(plugin => {
          return (
            <li
              key={plugin}
              className={styles.cell}
              onClick={() => handleClick(plugin)}
            >
              {plugin}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

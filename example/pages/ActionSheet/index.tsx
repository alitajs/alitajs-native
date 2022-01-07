import React from 'react';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import styles from './index.css';

export default () => {
  const handleClick = async () => {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });

    console.log('Action Sheet result:', result);
  };
  return (
    <div className={styles.normal}>
      <button onClick={handleClick}>Open Action Sheet</button>
    </div>
  );
};

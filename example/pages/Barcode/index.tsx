import React, { FC } from 'react';
import { BarcodeScanner, ScanResult } from '@alitajs/barcode';
import styles from './index.less';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [scanResult, setScanResult] = React.useState<ScanResult>();
  const startScan = async () => {
    try {
      const permissionStatus = await BarcodeScanner.checkPermission({ force: true });
      if (permissionStatus.granted) {
        const result = await BarcodeScanner.scanCode();
        setScanResult(result);
      } else {
        const goSettings = confirm('没有权限，去设置打开');
        goSettings && BarcodeScanner.openAppSettings();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div className={styles.center}>
      <div>
        <button onClick={startScan}>startScan</button>
      </div>
      <div>
        <code>{scanResult?.content}</code>
      </div>
    </div>
  );
};

export default HomePage;

import React, { FC, useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { Http } from '@alitajs/http';
import { FileViewer, Image } from '@alitajs/fileviewer';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Toast } from 'antd-mobile';

const ImagesURLs: Image[] = [
  {
    url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/spots-flying-off-dalmation-dog-gandee-vasan.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/lord-of-all-i-survey-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/showing-off-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/dachshund-looking-up-gandee-vasan.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/anyone-out-there-by-jake-p-johnson.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/nice-pool-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/laguna-beach-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/donald-leas-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/chapin-family-slim-aarons.jpg',
  },
  {
    url: 'https://render.fineartamerica.com/images/rendered/square-dynamic/small/images/artworkimages/mediumlarge/2/lion-lying-on-couch-side-view-matthias-clamer.jpg',
  },
];

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [url, setUrl] = useState(
    'https://www2.deloitte.com/content/dam/Deloitte/cn/Documents/consumer-business/deloitte-cn-cb-brand-customer-experience-in-now-consumer-zh-210507.pdf',
  );

  const [filePath, setFilePath] = useState('');
  const exitListenerRef = useRef<any>();

  const addPhotoViewerExitListener = async () => {
    let exitListener = null;
    exitListener = await (FileViewer as any).addListener('jeepCapPhotoViewerExit', (e: any) => {
      const keys = Object.keys(e);
      let args: any[] = [];
      if (keys.includes('result')) {
        args = [...args, e.result];
        if (e.result && keys.includes('imageIndex')) {
          args = [...args, e.imageIndex];
        } else {
          args = [...args, null];
        }
      }
      if (keys.includes('message')) {
        args = [...args, e.message];
      } else {
        args = [...args, null];
      }
      console.log('jeepCapPhotoViewerExit', args);
    });
    exitListenerRef.current = exitListener;
  };

  useEffect(() => {
    addPhotoViewerExitListener();
    return () => {
      if (exitListenerRef.current) {
        exitListenerRef.current.remove();
      }
    };
  }, []);
  const startDownload = async () => {
    const fileName = url.split('/').pop();
    const dir = 'Download';
    const path = `Download/${fileName}`;
    try {
      await Filesystem.mkdir({ path: dir, directory: Directory.ExternalStorage });
    } catch (error) {}
    try {
      await Filesystem.deleteFile({ path: path, directory: Directory.ExternalStorage });
    } catch (error: any) {}
    try {
      Toast.show({ icon: 'loading', duration: 0 });
      const result = await Http.downloadFile({
        filePath: path,
        fileDirectory: Directory.ExternalStorage,
        url: url,
      });
      setFilePath(result.path || '');
      Toast.clear();
    } catch (error: any) {
      Toast.clear();
      alert(error.message);
    }
  };
  const openDocument = async () => {
    try {
      Toast.show({ icon: 'loading', duration: 0 });
      await FileViewer.openDocument({ filePath: filePath });
      Toast.clear();
    } catch (error: any) {
      alert(error.message);
      Toast.clear();
    }
  };
  const showImages = () => {
    FileViewer.previewImage({ images: ImagesURLs, startFrom: 0 });
  };
  return (
    <div className={styles.page}>
      <div className={styles.item}>
        <label style={{ display: 'block' }}>文件地址</label>
        <input
          className={styles.input}
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>
      </div>
      <div style={{ paddingTop: 10 }}>
        <button onClick={startDownload}>下载文件</button>
        <button onClick={openDocument}>打开文件</button>
      </div>
      <div className={styles.item}>
        <label>本地路径</label>
        <code>{filePath}</code>
      </div>
      <div>
        <button onClick={showImages}>预览图片</button>
      </div>
    </div>
  );
};

export default HomePage;

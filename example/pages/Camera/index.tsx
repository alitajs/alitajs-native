import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

export default () => {
  const [photo, setPhoto] = useState<any>();
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    setPhoto(image);
  };
  const pickPhoto = async () => {
    try {
      const images = await Camera.pickImages({ quality: 90 });
      setPhoto(images.photos[0]);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="page">
      <div>
        <button onClick={takePhoto}>Take Photo</button>
      </div>
      <div>
        <button onClick={pickPhoto}>Pick Photo</button>
      </div>
      <img src={photo?.webPath} style={{ width: 100, height: 100 }} />
    </div>
  );
};

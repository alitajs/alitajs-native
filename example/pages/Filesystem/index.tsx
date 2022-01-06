import React, { useState, useRef } from 'react';
import {
  Filesystem,
  Directory,
  Encoding,
  WriteFileResult,
} from '@capacitor/filesystem';

export default () => {
  const [file, setFile] = useState<any>({});
  const writeFileResult = useRef<WriteFileResult>();
  const mkdir = async () => {
    await Filesystem.mkdir({
      path: 'secrets',
      directory: Directory.Documents,
      recursive: true,
    });
  };
  const writeSecretFile = async () => {
    const result = await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: 'This is a test',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log(result);
    writeFileResult.current = result;
  };

  const readSecretFile = async () => {
    try {
      const contents = await Filesystem.readFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log('secrets:', contents);
      setFile(contents);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteSecretFile = async () => {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
  };

  const readFilePath = async () => {
    try {
      // Here's an example of reading a file with a full file path. Use this to
      // read binary data (base64 encoded) from plugins that return File URIs, such as
      // the Camera.
      const contents = await Filesystem.readFile({
        path: writeFileResult.current?.uri || '',
      });

      console.log('data:', contents);
      setFile(contents);
    } catch (error) {}
  };

  return (
    <div className="page">
      <div>
        <button onClick={mkdir}>Mkdir</button>
        <button onClick={writeSecretFile}>Write File</button>
        <button onClick={readSecretFile}>Read File</button>
        <button onClick={deleteSecretFile}>Delete File</button>
        <button onClick={readFilePath}>ReadFilePath(base64)</button>
      </div>
      <h4>File Content</h4>
      <code>{file.data || ''}</code>
    </div>
  );
};

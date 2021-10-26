import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';

import './App.css';

// File Parameters
const maxFileCount = '10';
const maxFileSize = 15000000; // 25000000 bytes or 25mb
const allowedFileTypes = 'image/jpeg, image/jpg, image/png';

export default function App() {
  const [isSelectedFiles, setIsSelectedFiles] = useState([]);

  // Will parse selected files
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Creates and array and spreads previous state of files list with already parsed info
      let allowedFileList = [...isSelectedFiles];

      acceptedFiles.forEach((file) => {
        const fileType = file.name.split('.').pop();
        const fileName = file.name;
        const fileSize = file.size;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

        // Parses file info
        reader.onload = () => {
          allowedFileList.push({
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            fileContent: reader.result.split(',')[1],
          });
        };
      });
      setIsSelectedFiles(allowedFileList);
    },
    [isSelectedFiles]
  );

  const {
    // acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: allowedFileTypes,
    maxFiles: maxFileCount,
    maxSize: maxFileSize,
  });

  // WEIRD ISSUE
  // if below map function is set to acceptedFiles.map... when DOM automatically refreshes and displays a list of files, but if set to map a state of isSelectedFiles then DOM rerenders/refreshes on right mouse click anywhere in DOM or browser
  // The reason is why i need this is person can add one files after another and previous file will not get erased
  let selectedFiles = isSelectedFiles.map((file, key) => {
    return (
      <div className="mtm-files-list" key={key}>
        <p>
          {key + 1}. {file.fileName}
        </p>
        <p
          onClick={() => {
            // deleteFileSelection(key);
            // list.splice(key, 1);
            // setIsTempList(list);
            // setIsSelectedFiles(list);
          }}>
          ❌
        </p>
      </div>
    );
  });

  // const deleteFileSelection = (index) => {
  //   const tempFileList = [...isSelectedFiles];
  //   tempFileList.splice(index, 1);
  //   setIsSelectedFiles(tempFileList);
  // };

  const filesSubmit = () => {
    console.log('Files Submitted', isSelectedFiles);
  };

  return (
    <div className="App App-header">
      <div className="mtm-wrapper-file-upload">
        <div {...getRootProps()} className="mtm-wrapper-file-upload">
          <input {...getInputProps()} />

          {isDragActive ? (
            <p className="mtm-file-upload-dropzone">Drop the files here.</p>
          ) : (
            <p className="mtm-file-upload-clickzone">
              Drag and drop files here or click to select files.
            </p>
          )}
        </div>

        <div className="mtm-file-upload-title">{selectedFiles}</div>

        <button
          onClick={() => {
            filesSubmit();
          }}>
          Submit
        </button>
      </div>
    </div>
  );
}

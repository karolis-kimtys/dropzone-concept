import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import pdf from './assets/PDF.svg';
import doc from './assets/DOC.svg';
import docx from './assets/DOCX.svg';

import './App.css';

const maxFileCount = 3;
const maxFileSize = 5000000;
const allowedFileTypes = '.jpg, .jpeg, .png, .doc, .docx, .pdf';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSelectedFiles, setIsSelectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      let allowedFileList = [...isSelectedFiles];

      acceptedFiles.forEach((file) => {
        setIsLoaded(false);
        const fileType = file.name.split('.').pop();
        const fileName = file.name;
        const fileSize = file.size;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

        reader.onload = function () {
          allowedFileList.push({
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            fileContent: reader.result.split(',')[1],
          });

          setIsSelectedFiles(allowedFileList);

          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        };
      });
    },
    [isSelectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes,
    maxFiles: maxFileCount,
    maxSize: maxFileSize,
  });

  let selectedFiles = isSelectedFiles.map((file, key) => {
    const list = [...isSelectedFiles];
    return (
      isLoaded && (
        <div className="mtm-files-list" key={key}>
          <p className="mtm-selected-file-name">
            {key + 1}. {file.fileName}
          </p>
          <img
            className="mtm-selected-file-image"
            src={
              file.fileType === 'pdf'
                ? pdf
                : file.fileType === 'doc'
                ? doc
                : file.fileType === 'docx'
                ? docx
                : `data:image/jpeg;base64,${file.fileContent}`
            }
            alt=""
          />
          <p
            className="mtm-selected-file-delete"
            onClick={() => {
              deleteFileSelection(key);
              list.splice(key, 1);
              setIsSelectedFiles(list);
              console.log(`File ${file.fileName} has been deleted.`);
            }}>
            ❌
          </p>
        </div>
      )
    );
  });

  const deleteFileSelection = (index) => {
    const tempFileList = [...isSelectedFiles];
    tempFileList.splice(index, 1);
    setIsSelectedFiles(tempFileList);
  };

  const filesSubmit = () => {
    console.log('Files Submitted', isSelectedFiles);
  };

  return (
    <div className="App App-header">
      <h2>React Dropzone MOD</h2>
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

        {isSelectedFiles.length > maxFileCount && (
          <div>Too many files selected.</div>
        )}

        <button
          disabled={isSelectedFiles.length > maxFileCount}
          onClick={() => {
            filesSubmit();
          }}>
          Submit
        </button>
      </div>
    </div>
  );
}

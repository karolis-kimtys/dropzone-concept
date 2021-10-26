import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import './App.css';

export default function App() {
  // // File Parameters
  // const maxFileCount = '10';
  // const maxFileSize = 15000000; // 25000000 bytes or 25mb
  // const allowedFileTypes = 'image/jpeg, image/jpg, image/png';

  const [isSelectedFiles, setIsSelectedFiles] = useState([]);

  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     let allowedFileList = [...isSelectedFiles];
  //     acceptedFiles.forEach((file) => {
  //       const fileType = file.name.split('.').pop();
  //       const fileName = file.name;
  //       const fileSize = file.size;

  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);

  //       reader.onerror = function (error) {
  //         console.log('Error: ', error);
  //       };

  //       reader.onload = () => {
  //         allowedFileList.push({
  //           fileName: fileName,
  //           fileType: fileType,
  //           fileSize: fileSize,
  //           fileContent: reader.result.split(',')[1],
  //         });
  //       };
  //     });

  //     // console.log(newDataObject);
  //     setIsSelectedFiles(allowedFileList);
  //   },
  //   [isSelectedFiles]
  // );

  // const {
  //   acceptedFiles,
  //   getRootProps,
  //   getInputProps,
  //   isDragActive,
  //   fileRejections,
  // } = useDropzone({
  //   onDrop,
  //   accept: allowedFileTypes,
  //   maxFiles: maxFileCount,
  //   maxSize: maxFileSize,
  // });

  // let selectedFiles;

  // setTimeout(() => {
  //   selectedFiles = isSelectedFiles.map((file, key) => {
  //     console.log(file);
  //     return (
  //       <div className="mtm-files-list" key={key}>
  //         <p>
  //           {key + 1}. {file.fileName}
  //         </p>
  //         <p
  //           onClick={() => {
  //             // deleteFileSelection(key);
  //             // list.splice(key, 1);
  //             // setIsTempList(list);
  //             // setIsSelectedFiles(list);
  //           }}>
  //           ❌
  //         </p>
  //       </div>
  //     );
  //   });
  // }, 2000);

  // const update = setIsTempList(1);

  // const deleteFileSelection = (index) => {
  //   const tempFileList = [...isSelectedFiles];
  //   tempFileList.splice(index, 1);
  //   setIsSelectedFiles(tempFileList);
  // };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
    status === 'done' && handleFiles(meta);
  };

  let filesObject = [];

  const handleFiles = useCallback(
    (acceptedFiles) => {
      filesObject.push(acceptedFiles);
      let parsedFilesObject = [...isSelectedFiles];
      const read = new FileReader();
      read.readAsDataURL(acceptedFiles);
      console.log('====================================');
      console.log(read.result);
      console.log('====================================');

      Object.values(filesObject).forEach((file) => {
        console.log('🚀 - file: App.js - line 105 - file', file);
        const fileType = file.name.split('.').pop();
        const fileName = file.name;
        const fileSize = file.size;

        const reader = new FileReader();

        reader.readAsDataURL(new Blob([JSON.stringify(file)]));

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

        reader.onload = () => {
          parsedFilesObject.push({
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            fileContent: reader.result,
          });
        };
      });

      setIsSelectedFiles(parsedFilesObject);
    },
    [filesObject, isSelectedFiles]
  );

  const filesSubmit = () => {
    console.log(isSelectedFiles);
  };

  const maxFileCount = 5;
  const maxFileSize = 5000000;
  const allowedTypes = '.pdf, .jpg, .jpeg, .png, .doc, .docx';

  return (
    <div className="App App-header">
      <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={maxFileCount}
        inputContent={`Drop ${maxFileCount} Files`}
        inputWithFilesContent={(files) => `${maxFileCount - files.length} more`}
        // submitButtonDisabled={(files) => files.length < 3}
        accept={allowedTypes}
        maxSizeBytes={maxFileSize}
      />

      <div className="mtm-wrapper-file-upload">
        {/* <div {...getRootProps()} className="mtm-wrapper-file-upload">
          <input {...getInputProps()} />

          {isDragActive ? (
            <p className="mtm-file-upload-dropzone">Drop the files here.</p>
          ) : (
            <p className="mtm-file-upload-clickzone">
              Drag and drop files here or click to select files.
            </p>
          )}
        </div> */}

        {/* <div className="mtm-file-upload-title">
          {isUpdate && selectedFiles}Files
        </div> */}

        {/* 
        {isSelectedFiles.map((file, key) => {
          return (
            <div className="mtm-files-list" key={key}>
              <p>
                {key + 1}. {file.fileName}
              </p>
              <p>❌</p>
            </div>
          );
        })} */}

        {/* {isTempList.length === 0 ? (
          Object.keys(fileRejections).length > 0 ? (
            <p className="noselect">Too many files selected.</p>
          ) : (
            <p className="noselect">Maximum 2 files are allowed.</p>
          )
        ) : (

        )} */}

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

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Upload, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import firebase from "../constants/firebase";
import 'firebase/storage';

const Ebooks = () => {
  const [pdfList, setPdfList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchPDFList();
  }, []);

  const fetchPDFList = async () => {
    const storageRef = firebase.storage().ref();
    const filesRef = storageRef.child('/ebooks');

    try {
      const filesSnapshot = await filesRef.listAll();
      const fileList = await Promise.all(
        filesSnapshot.items.map(async (file) => {
          const downloadUrl = await file.getDownloadURL();
          return {
            key: file.name,
            name: file.name,
            downloadUrl,
          };
        })
      );
      setPdfList(fileList);
    } catch (error) {
      console.error('Error fetching PDF list:', error);
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`pdfs/${selectedFile.name}`);

      setUploading(true);
      setUploadProgress(0);

      const uploadTask = fileRef.put(selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
          message.error('Error uploading file. Please try again.');
        },
        () => {
          setUploadProgress(100);
          setUploadedFileName(selectedFile.name);
          message.success('File uploaded successfully!');
          fetchPDFList(); // Refresh PDF list
          setUploading(false);
          setModalVisible(false);
        }
      );
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" href={record.downloadUrl} target="_blank" rel="noopener noreferrer">
          Download
        </Button>
      ),
    },
  ];

  return (
    <div>
      {uploadedFileName && <p>Uploaded file: {uploadedFileName}</p>}

      <Button type="primary" onClick={() => setModalVisible(true)}>
        Upload PDF
      </Button>

      <Table columns={columns} dataSource={pdfList} />

      <Modal
        title="Upload PDF"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={handleUpload}
            loading={uploading}
            disabled={!selectedFile}
          >
            {uploading ? 'Uploading' : 'Upload'}
          </Button>,
        ]}
      >
        <Upload beforeUpload={handleFileChange} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Select PDF</Button>
        </Upload>
        {uploading && <Progress percent={uploadProgress} />}
      </Modal>
    </div>
  );
};

export default Ebooks;

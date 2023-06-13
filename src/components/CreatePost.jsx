import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../constants/firebase";


const CreatePost = ({ visible, onCancel, onPostCreated }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const createPost = async (values) => {
    try {
      const imageFile = fileList[0];
      const imageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytes(imageRef, imageFile);

      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);
      const newPost = { ...values, image: { name: imageFile.name }, imageUrl };
      await addDoc(collection(db, "posts"), newPost);
      form.resetFields();
      setFileList([]);
      onPostCreated();
      message.success("Post created successfully.");
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post.");
    }
  };

  const handleFileUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Create Post"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={createPost}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload.Dragger
            multiple={false}
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleFileUpload}
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to upload</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePost;

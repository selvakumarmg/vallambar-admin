import React from "react";
import { Form, Input, Button, Radio, message, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../constants/firebase";
import "../styles/alliance.css";

const CreateAliance = ({ visible, onCancel, onAlianceCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const {
      name,
      gender,
      photo,
      age,
      qualification,
      address,
      contactNumber,
      height,
      weight,
      profession,
    } = values;

    try {
      const imageFile = photo[0]; // Get the first file from the array

      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytes(storageRef, imageFile);

      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);

      const newPost = {
        name,
        gender,
        age,
        qualification,
        address,
        contactNumber,
        height,
        weight,
        profession,
        imageUrl, // Store the URL in the Firestore document
      };

      await addDoc(collection(db, "alliance"), newPost);
      form.resetFields();
      message.success("Post created successfully.");
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post.");
    }
  };

  return (
    <div>
      <Modal
        title="Create Post"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          className="alliance-form"
          initialValues={{
            gender: "male", // Set default value for gender
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Photo"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: "Please upload a photo",
              },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} size="small">
                Upload Photo
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please enter your age",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Qualification"
            name="qualification"
            rules={[
              {
                required: true,
                message: "Please enter your qualification",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please enter your contact number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Height"
            name="height"
            rules={[
              {
                required: true,
                message: "Please enter your height",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[
              {
                required: true,
                message: "Please enter your weight",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Profession"
            name="profession"
            rules={[
              {
                required: true,
                message: "Please enter your profession",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAliance;

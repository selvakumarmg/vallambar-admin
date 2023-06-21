import React, { useState, useEffect } from 'react';
import { List, Card, Button, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import firebase from '../constants/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const { Item } = Form;

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const snapshot = await firebase.firestore().collection('advertisements').get();
        const advertisementList = snapshot.docs.map((doc) => doc.data());
        setAdvertisements(advertisementList);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleAddAdvertisement = async () => {
    try {
      await form.validateFields();
  
      const fileList = form.getFieldValue('image');
  
      if (fileList && fileList.length > 0 && fileList[0].thumbUrl) {
        const newAdvertisement = {
          image: fileList[0].thumbUrl,
          name: form.getFieldValue('name'),
          offer: form.getFieldValue('offer'),
          price: form.getFieldValue('price'),
        };
  
        const advertisementsRef = collection(firebase.firestore(), 'advertisements');
        await addDoc(advertisementsRef, newAdvertisement);
  
        setAdvertisements([...advertisements, newAdvertisement]);
        form.resetFields();
        setModalVisible(false);
        message.success('Advertisement added successfully!');
      } else {
        message.error('Please upload an image for the advertisement.');
      }
    } catch (error) {
      console.error('Error adding advertisement:', error);
      message.error('Error adding advertisement. Please try again.');
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalVisible(true)}
      >
        Add Advertisement
      </Button>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={advertisements}
        renderItem={(advertisement) => (
          <List.Item>
            <Card
              cover={<img alt={advertisement.name} src={advertisement.image} />}
            >
              <Card.Meta
                title={advertisement.name}
                description={
                  <>
                    <p>Offer: {advertisement.offer}</p>
                    <p>Price: {advertisement.price}</p>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Add Advertisement"
        visible={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleAddAdvertisement}
        okText="Add"
      >
        <Form form={form}>
          <Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            </Upload>
          </Item>

          <Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Item>

          <Item
            name="offer"
            label="Offer"
            rules={[{ required: true, message: 'Please enter the offer' }]}
          >
            <Input />
          </Item>

          <Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the price' },
              {
                pattern: /^(?:0|[1-9]\d{0,2}(?:,\d{3})*(?:\.\d{2})?)$/,
                message: 'Invalid price format',
              },
            ]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Advertisements;

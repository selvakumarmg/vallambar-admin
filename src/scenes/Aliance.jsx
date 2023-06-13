import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebase';

const Aliance = () => {
  const [alliances, setAlliances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAlliances();
  }, []);

  const fetchAlliances = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'alliance'));
      const allianceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlliances(allianceData);
    } catch (error) {
      console.error('Error fetching alliances:', error);
    }
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
    },
  ];
  

  const onAlianceCreated = () => {
    setIsModalVisible(false);
    fetchAlliances();
  };

  return (
    <div>
      <h2>Alliance List</h2>
      {/* <Button type="primary" onClick={() => setIsModalVisible(true)}>
        New Post
      </Button>
      <Aliance
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onPostCreated={onAlianceCreated}
      /> */}
      <Table dataSource={alliances} columns={columns} />
    </div>
  );
};

export default Aliance;

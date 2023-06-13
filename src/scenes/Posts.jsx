import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../constants/firebase";
import CreatePost from '../components/CreatePost'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const post = {
            id: doc.id,
            ...doc.data(),
          };
          if (post.imageUrl) {
            const imageUrl = await getDownloadURL(ref(storage, post.imageUrl));
            return { ...post, imageUrl };
          }
          return post;
        })
      );
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts.");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Post"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      ),
    },
  ];

  const handlePostCreated = () => {
    setIsModalVisible(false);
    fetchPosts();
  };

  return (
    <div>
      <h1>Posts</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        New Post
      </Button>
      <CreatePost
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onPostCreated={handlePostCreated}
      />
      <Table dataSource={posts} columns={columns} rowKey="id" />
    </div>
  );
};

export default Posts;

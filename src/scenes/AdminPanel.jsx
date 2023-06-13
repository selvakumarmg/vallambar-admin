import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPWz3y_yUC6-5yIrOzX9p0emPcIpVnbCQ",
  authDomain: "vallambarsamugam-60850.firebaseapp.com",
  databaseURL: "https://vallambarsamugam-60850-default-rtdb.firebaseio.com",
  projectId: "vallambarsamugam-60850",
  storageBucket: "vallambarsamugam-60850.appspot.com",
  messagingSenderId: "1068295389486",
  appId: "1:1068295389486:web:06cbc2df88a3c20fda7abf",
  measurementId: "G-XL4VNGZR4K"
};

firebase.initializeApp(firebaseConfig);

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [alliances, setAlliances] = useState([]);

  useEffect(() => {
    const postsRef = firebase.database().ref('posts');
    postsRef.on('value', (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.keys(postsData).map((key) => ({
          id: key,
          ...postsData[key],
        }));
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
    });

    const alliancesRef = firebase.database().ref('alliances');
    alliancesRef.on('value', (snapshot) => {
      const alliancesData = snapshot.val();
      if (alliancesData) {
        const alliancesArray = Object.keys(alliancesData).map((key) => ({
          id: key,
          ...alliancesData[key],
        }));
        setAlliances(alliancesArray);
      } else {
        setAlliances([]);
      }
    });
  }, []);

  const createPost = (title, content) => {
    const postsRef = firebase.database().ref('posts');
    const newPostRef = postsRef.push();
    newPostRef.set({
      title,
      content,
    });
  };

  const updatePost = (id, title, content) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    postRef.update({
      title,
      content,
    });
  };

  const createAlliance = (name, description) => {
    const alliancesRef = firebase.database().ref('alliances');
    const newAllianceRef = alliancesRef.push();
    newAllianceRef.set({
      name,
      description,
    });
  };

  const updateAlliance = (id, name, description) => {
    const allianceRef = firebase.database().ref(`alliances/${id}`);
    allianceRef.update({
      name,
      description,
    });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/alliances">Alliances</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/posts" element={<PostsList posts={posts} />} />
          <Route path="/posts/:id" element={<EditPost />} />
          <Route path="/alliances" element={<AlliancesList alliances={alliances} />} />
          <Route path="/alliances/:id" element={<EditAlliance />} />
        </Routes>
      </div>
    </Router>
  );
};

const PostsList = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EditPost = () => {
  return (
    <div>
      <h2>Edit Post</h2>
      {/* Add form fields for editing post */}
    </div>
  );
};

const AlliancesList = ({ alliances }) => {
  return (
    <div>
      <h2>Alliances</h2>
      <ul>
        {alliances.map((alliance) => (
          <li key={alliance.id}>
            <h3>{alliance.name}</h3>
            <p>{alliance.description}</p>
            <Link to={`/alliances/${alliance.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EditAlliance = () => {
  return (
    <div>
      <h2>Edit Alliance</h2>
      {/* Add form fields for editing alliance */}
    </div>
  );
};

export default AdminPanel;

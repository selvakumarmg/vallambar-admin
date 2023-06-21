import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { auth } from '../constants/firebase';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../services/redux/reducers/AuthReducer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const { user } = userCredential;
      message.success('LoggedIn Successfully');
      console.log("user", user)
      dispatch(login());
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Form initialValues={{ email: 'abc@gmail.com', password: '123456' }} name="login" onFinish={onFinish} className="login-container">
      <h2 className="login-title">Login</h2>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
        className="login-form-item"
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        className="login-form-item"
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="login-form-button">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Posts from "./Posts";
import Aliance from "./Aliance";
import '../styles/dashboard.css';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOption, setSelectedOption] = useState("dashboard");

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuSelect = ({ key }) => {
    setSelectedOption(key);
  };

  const renderContent = () => {
    switch (selectedOption) {
      // case "dashboard":
      //   return <Dashboard />;
      case "analytics":
        return <Aliance />;
      case "posts":
      default:
        return <Posts />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={[selectedOption]}
          onSelect={handleMenuSelect}
        >
          <Menu.Item key="analytics" icon={<BarChartOutlined />}>
            Aliance
          </Menu.Item>
          <Menu.Item key="posts" icon={<FileOutlined />}>
            Posts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <img
            onClick={toggleMenu}
            src={require("../assets/menu.png")}
            className="menu-icon"
          />
        </Header>
        <Content style={{ margin: "16px" }}>
        {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

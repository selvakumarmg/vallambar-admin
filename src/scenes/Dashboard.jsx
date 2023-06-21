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
import Ebooks from "./Ebooks";
import Advertisements from "./Advertisement";

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
      case "ebook":
        return <Ebooks />;
      case "aliance":
        return <Aliance />;
      case "adv":
        return <Advertisements />;
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
          <Menu.Item key="aliance" icon={<BarChartOutlined />}>
            Aliance
          </Menu.Item>
          <Menu.Item key="posts" icon={<FileOutlined />}>
            Posts
          </Menu.Item>
          <Menu.Item key="ebook" icon={<FileOutlined />}>
            Ebooks
          </Menu.Item>
          <Menu.Item key="adv" icon={<FileOutlined />}>
            Advertisment
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

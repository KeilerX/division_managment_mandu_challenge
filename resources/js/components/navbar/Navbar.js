import React, { Component } from 'react';
import { Menu, Avatar } from 'antd';
import { ShoppingOutlined, QuestionCircleOutlined, NotificationOutlined } from '@ant-design/icons';
import './Navbar.css';

export class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu className='header' mode="horizontal" defaultSelectedKeys={['organization']}>
          <Menu.Item className='logo'>mandü</Menu.Item>
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="organization">Organización</Menu.Item>
          <Menu.Item key="models">Modelos</Menu.Item>
          <Menu.Item key="tracking">Seguimiento</Menu.Item>
          <Menu.Item key="bag"><ShoppingOutlined /></Menu.Item>
          <Menu.Item key="question"><QuestionCircleOutlined /></Menu.Item>
          <Menu.Item key="notifications"><NotificationOutlined /></Menu.Item>
          <Menu.Item key="profile">
            <Avatar className="avatar" size="large" gap={4}>A</Avatar>
            Administrador
          </Menu.Item>            
        </Menu>
      </div>
    );
  }
};

export default Navbar;
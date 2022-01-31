import 'antd/dist/antd.css';
import './App.css'
import { Navbar } from './navbar/Navbar';
import { Organization } from './organization/Organization';
import { Layout, Row } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const { Header, Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <div>
        <Header className='nav-bar'><Navbar /></Header>
        <Row justify='center' className='content'>
          <Content>
            <Organization />
          </Content>
        </Row>
      </div>
    );
  }
}

if(document.getElementById('app')) {
  ReactDOM.render(<App/>, document.getElementById('app'));
}

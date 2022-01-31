import React, { useState } from 'react';
import { Radio, Row, Col, Input, Select } from 'antd';
import './DivisionTab.css';

const { Search } = Input;
const { Option } = Select;

export const DivisionTab = ({ columns, setSelectedColumn, setSearchText }) => {
  const [radio, setRadio] = useState('list');
  const [column, setColumn] = useState('default');
  const handleRadioChange = e => {
    setRadio(e.target.value);
  }
  const handleColumnChange = value => {
    setColumn(value);
    setSelectedColumn(value);
  }
  const onSearch = value => {
    setSearchText(value);
  }

  return (
    <div>
      <Row>
        <Col flex={1}>
          <Radio.Group onChange={handleRadioChange} value={radio}>
            <Radio.Button value="list">Listado</Radio.Button>
            <Radio.Button value="tree">Árbol</Radio.Button>
          </Radio.Group>
        </Col>
        <Col flex={0}>
          <Select defaultValue={column} onChange={handleColumnChange} className='dropdown'>
            {columns && columns.map(
              c => <Option key={c.key}>{c.value}</Option>)}
          </Select>
          <Search placeholder="Buscar" onSearch={onSearch} className='search-input' allowClear/>
        </Col>
      </Row>
    </div>
  );
};
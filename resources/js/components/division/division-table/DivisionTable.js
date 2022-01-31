import React, { Component, useEffect, useState } from 'react';
import { Table } from 'antd';
import './DivisionTable.css';

export const DivisionTable = ({
    data,
    divisionFilterList,
    superiorDivisionFilterList,
    levelFilterList,
    setSortColumn, 
    setSortValue, 
    setFilterColumn,
    setFilterValue,
    setCurrentPage,
    setPageSize,
    currentPage,
    totalItems,
    pageSize,
    }) => {
  
  const [pagination, setPagination] = useState({current: 1, pageSize: 10});
  const [loading, setLoading] = useState(false);
  useEffect(() =>{
    fetch({ pagination });
  }, []);

  useEffect(() => {
    if(pageSize && totalItems) {
      setPagination({ current: currentPage, pageSize: pageSize, total: totalItems });
    console.log("pag", pagination);
    }
  }, [pageSize, totalItems, totalItems, currentPage]);
  

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    console.log(params)
    setLoading(true);
    setCurrentPage(params.pagination.current);
    setPageSize(params.pagination.pageSize);
    if(params.sortField && params.sortOrder) {
      setSortColumn(params.sortField);
      setSortValue(params.sortOrder == 'descend' ? 'desc' : 'asc');
    }
    if(params.name && params.name.length > 0) {
      setFilterColumn('name');
      setFilterValue(params.name);
    } else if (params.level && params.level.length > 0) {
      setFilterColumn('level');
      setFilterValue(params.level);
    } else {
      setFilterColumn(null);
      setFilterValue(null);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

    const columns = [
      {
        title: 'División',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        filters: divisionFilterList
      },
      {
        title: 'División superior',
        dataIndex: ['superior_division', 'name'],
        key: 'superior_division',
      },
      {
        title: 'Colaboradores',
        dataIndex: 'collaborators',
        key: 'collaborators',
        sorter: true,
      },
      {
        title: 'Nivel',
        dataIndex: 'level',
        key: 'level',
        filters: levelFilterList,
        sorter: true,
      },
      {
        title: 'Subdivisiones',
        dataIndex: 'subdivisions',
        key: 'subdivisions',
        sorter: true,
      },
      {
        title: 'Embajadores',
        dataIndex: 'ambassador_name',
        key: 'ambassador_name',
        render: (ambassador_name) => (
          <p>{ambassador_name ? ambassador_name : ''}</p>           
        ),
      },
    ];
    
    return (
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
    );
};
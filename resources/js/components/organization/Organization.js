import React, { useState, useEffect } from 'react';
import { DivisionTab } from '../division/division-tab/DivisionTab';
import { DivisionTable } from '../division/division-table/DivisionTable';
import { Typography, Tabs } from 'antd';
import BACKEND_URL from '../../url';

const { Title } = Typography;
const { TabPane } = Tabs;
const columns = [
  { key: 'default', value: 'Columnas' },
  { key: 'name', value: 'División' },
  { key: 'collaborators', value: 'Colaboradores' },
  { key: 'level', value: 'Nivel' },
  { key: 'ambassador_name', value: 'Embajadores' },
]

export const Organization = () => {
  const [divisionList, setDivisionList] = useState([]);
  const [divisionFilterList, setDivisionFilterList] = useState([]);
  const [superiorDivisionFilterList, setSuperiorDivisionFilterList] = useState([]);
  const [levelFilterList, setLevelFilterList] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [pages, setPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  useEffect(async () => {
    try {
      let res1 = await fetch(`${BACKEND_URL}/api/filters?type=name`, {
        method: 'GET'
      });
      let data1 = await res1.json();
      const newArray1 = [];
      data1.map(function(f) {
        newArray1.push({
          value: f.name,
          text: f.name
        })
      });
      setDivisionFilterList(newArray1);

      let res2 = await fetch(`${BACKEND_URL}/api/filters?type=superior_division_id`, {
        method: 'GET'
      });
      let data2 = await res2.json();
      const newArray2 = [];
      data2.map(function(f) {
        f.superior_division && newArray2.push({
          value: f.superior_division.name,
          text: f.superior_division.name
        })
      });
      setSuperiorDivisionFilterList(newArray2);

      let res3 = await fetch(`${BACKEND_URL}/api/filters?type=level`, {
        method: 'GET'
      });
      let data3 = await res3.json();
      const newArray3 = [];
      data3.map(function(f) {
        newArray3.push({
          value: f.level,
          text: f.level
        })
      });
      setLevelFilterList(newArray3);

      console.log(`Searching current: ${currentPage}, pageSize: ${pageSize}`)
      let resDivisionList = await fetch(`${BACKEND_URL}/api/divisions?page=${currentPage}&size=${pageSize}`, {
        method: 'GET'
      });
      let dataDivisionList = await resDivisionList.json();
      setDivisionList(dataDivisionList.data);
      setTotalItems(dataDivisionList.total);
    } catch (error) {
      console.log('Error al buscar la lista de filtros');
    }
  }, []);

  useEffect(async () => {
    let searchQuery = '';
    console.log("page", currentPage)
    console.log("page size", pageSize)
    if(sortColumn && sortValue) {
      console.log("sort column", sortColumn)
      console.log("sort value", sortValue)
      searchQuery = searchQuery + `sort_by=${sortColumn}&sort_type=${sortValue}&`;
    }
    if(currentPage && pageSize) {
      searchQuery = searchQuery + `page=${currentPage}&size=${pageSize}&`
    }
    if(filterColumn && filterValue && (!selectedColumn || !searchText)) {
      console.log("1")
      try {
        console.log("filter col", filterColumn)
        console.log("filter value", filterValue)
        searchQuery = searchQuery + `type=${filterColumn}&value=${filterValue}`;
        console.log("Se buscará ", searchQuery);
        let resDivisionList = await fetch(`${BACKEND_URL}/api/filter-data?${searchQuery}`, {
          method: 'GET'
        });
        let dataDivisionList = await resDivisionList.json();
        setDivisionList(dataDivisionList.data);
        setTotalItems(dataDivisionList.total);
      } catch (error) {
        console.log('Error al buscar');
      }
    } else if(selectedColumn && searchText && selectedColumn != 'default') {
        console.log("2")
        try {
          console.log("selected col", selectedColumn)
          console.log("search text", searchText)
          searchQuery = searchQuery + `type=${selectedColumn}&value=${searchText}`;
          console.log("Se buscará ", searchQuery);
          let resDivisionList = await fetch(`${BACKEND_URL}/api/search?${searchQuery}`, {
            method: 'GET'
          });
          let dataDivisionList = await resDivisionList.json();
          setDivisionList(dataDivisionList.data);
          setTotalItems(dataDivisionList.total);
        } catch (error) {
          console.log('Error al buscar');
        }
    } else {
      console.log("3")
      try {
        if(searchQuery.charAt(searchQuery.length - 1) === '&') {
          searchQuery = searchQuery.slice(0, -1);
        }
        console.log("search", searchQuery)
        let resDivisionList = await fetch(`${BACKEND_URL}/api/divisions?${searchQuery}`, {
          method: 'GET'
        });
        let dataDivisionList = await resDivisionList.json();
        setDivisionList(dataDivisionList.data);
        setTotalItems(dataDivisionList.total);
        setPages(dataDivisionList.pages);
      } catch (error) {
          console.log('Error al obtener las divisiones ', error);
      }
    }
  },[filterColumn, filterValue, sortColumn, sortValue, selectedColumn, searchText, currentPage, pageSize]);

  return (
    <div>
        <Title level={4}>Organización</Title>
        <Tabs defaultActiveKey='division'>
            <TabPane tab="Divisiones" key="division">
                <DivisionTab 
                  columns={columns}
                  setSelectedColumn={setSelectedColumn}
                  setSearchText={setSearchText}
                />
                <br />
                <DivisionTable 
                  data={divisionList}
                  setFilterColumn={setFilterColumn}
                  setFilterValue={setFilterValue}
                  setSortColumn={setSortColumn}
                  setSortValue={setSortValue}
                  divisionFilterList={divisionFilterList}
                  superiorDivisionFilterList={superiorDivisionFilterList}
                  levelFilterList={levelFilterList}
                  setCurrentPage={setCurrentPage}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  totalItems={totalItems}
                  pageSize={pageSize}
                />
            </TabPane>
            <TabPane tab="Colaboradores" key="collaborators"></TabPane>
        </Tabs>
    </div>
  );
};

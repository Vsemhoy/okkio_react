import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { CSRF_TOKEN, PRODMODE } from '../../../config/config';
import { TABLE_LIST_MOCK } from './components/mock/TABLELISTMOCK';
import TableListCardUt from './components/TableListCardUt';
import { useLocation } from 'react-router-dom';
import './components/style/tablelist_ut.css';
import { StarFilled } from '@ant-design/icons';
import { Input, Select } from 'antd';

import debounce from 'lodash.debounce';

  const sortOptions = [
    { value: 'name$asc', label: 'Name (A-Z)' },
    { value: 'name$desc', label: 'Name (Z-A)' },
    { value: 'sort_order$asc', label: 'Sort Order (↑)' },
    { value: 'sort_order$desc', label: 'Sort Order (↓)' },
    { value: 'published_dev$asc', label: 'Dev Published (Yes → No)' },
    { value: 'published_dev$desc', label: 'Dev Published (No → Yes)' },
    { value: 'published_prod$asc', label: 'Prod Published (Yes → No)' },
    { value: 'published_prod$desc', label: 'Prod Published (No → Yes)' },
    { value: 'has_migrations$asc', label: 'Has migrations (Yes → No)' },
    { value: 'has_migrations$desc', label:  'Has migrations (No → Yes)' },
    { value: 'updated_at$asc', label: 'Update Date (Old → New)' },
    { value: 'updated_at$desc', label: 'Update Date (New → Old)' },
    { value: 'starred$asc', label: 'Starred (Yes → No)' },
    { value: 'starred$desc', label: 'Starred (No → Yes)' },
    { value: 'color$asc', label: 'By color' },
  ];

// Оптимизированный Input компонент
const OptimizedInput = React.memo(({ value, onChange, placeholder }) => {
  return (
    <Input 
      allowClear
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});


const TableListPageUt = (props) => {
  const [baseTableList, setBaseTableList] = useState([]);
  const location = useLocation();

  const [setselectedSort, setSetselectedSort] = useState('name_asc');
  const [filterText, setFilterText] = useState('');
  const [filterName, setFilterName] = useState('');

  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });


  useEffect(() => {
    if (PRODMODE){
      get_tables(onLoadCallback);
    } else {
      setBaseTableList(TABLE_LIST_MOCK.meta);
      onLoadCallback();
    }
  }, []);


  const onLoadCallback = () => {
    const hash = location.hash; 
    if (hash){
      setTimeout(() => {
        const element = document.querySelector(`${hash}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'instant',
            block: 'center'
        });
      }
      }, 200);
    }
  }
  

  // Мемоизированный список таблиц
  const tablelist = useMemo(() => {
    return baseTableList.filter(item => {
      const matchesName = item.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesText = filterText ? 
        JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase()) : 
        true;
      return matchesName && matchesText;
    });
  }, [baseTableList, filterName, filterText]);

  useEffect(() => {
    console.log('filterName', filterName)
  }, [filterName]);

 /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка таблиц
     * @param {*} req 
     * @param {*} res 
     */
    const get_tables = async (callback, req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.get('/api/utilizare/db/tables?_token=' + CSRF_TOKEN);
          console.log('LOADED: ', response.data);
          setBaseTableList(response.data.meta);
          if (callback){
            setTimeout(() => {
              callback();
            }, 1000);
          }
          // setUserAct(response.data);
      } catch (e) {
          console.log(e)
      } finally {
      }
  }

      /**
     * Получение параметров таблицы
     * @param {*} req 
     * @param {*} res 
     */
    const get_table_params = async (table_name, req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.get('/api/utilizare/db/tabledata/' + table_name + '?_token=' + CSRF_TOKEN);
          console.log('LOADED: ', response.data);
          // setUserAct(response.data);
      } catch (e) {
          console.log(e)
      } finally {
      }
  }

  const set_bool_value = async (table, column, value, req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/db/setbooldata', 
                  {
                      data: {
                          table: table,
                          column: column,
                          value: value
                      },
                      _token: CSRF_TOKEN
                  });
                  if (response && response.data){

                  }
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
      }

        const set_color_value = async (table, value, req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/db/setcolor', 
                  {
                      data: {
                          table: table,
                          value: value
                      },
                      _token: CSRF_TOKEN
                  });
                  if (response && response.data){

                  }
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
      }

      const set_description_value = async (table, value, req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/utilizare/db/setdescription', 
                  {
                      data: {
                          table: table,
                          value: value
                      },
                      _token: CSRF_TOKEN
                  });
                  if (response && response.data){

                  }
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
      }
  /** ------------------ FETCHES END ---------------- */




  // Оптимизированные обработчики
  const handleChangeName = useCallback((ev) => {
    setFilterName(ev.target.value);
  }, []);

  const handleChangeText = useCallback((ev) => {
    setFilterText(ev.target.value);
  }, []);


// Мемоизированная сортировка
  const sortedTableList = useMemo(() => {
    const sortableItems = [...tablelist];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Для числовых полей
        const numericFields = ['sort_order'];
        // Для boolean полей
        const booleanFields = ['published_dev', 'published_prod', 'has_migrations', 'starred'];
        // Для дат
        const dateFields = ['created_at', 'updated_at'];

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Обработка null значений
        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue === null && bValue === null) return 0;

        // Специальная обработка для разных типов данных
        if (numericFields.includes(sortConfig.key)) {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }

        if (booleanFields.includes(sortConfig.key)) {
          return sortConfig.direction === 'asc'
            ? (aValue === bValue ? 0 : aValue ? -1 : 1)
            : (aValue === bValue ? 0 : aValue ? 1 : -1);
        }

        if (dateFields.includes(sortConfig.key)) {
          return sortConfig.direction === 'asc'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        // Стандартная сортировка строк
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tablelist, sortConfig]);

  // Обработчик изменения сортировки
  const handleSortChange = useCallback((value) => {
    const [key, direction] = value.split('$');
    setSortConfig({ key, direction });
  }, []);

  const handleCheckCell = (table, target, value)=>{
    console.log('target', target);
    set_bool_value(table, target, value);
      setBaseTableList(prevList => 
      prevList.map(item => 
        item.name === table ? { ...item, [target]: value } : item
      )
    );
  }

  const handleChangeColor = (table, value)=>{
    set_color_value(table, value);
    setBaseTableList(prevList => 
        prevList.map(item => 
          item.name === table ? { ...item, color: value } : item
        )
      );
  }

  const handleChangeDescr = (table, value)=> {
    set_description_value(table, value);
    setBaseTableList(prevList => 
        prevList.map(item => 
          item.name === table ? { ...item, description: value } : item
        )
      );
  }


  return (
    <div className={'ut-page-container'}>
      <div className={'ut-mw-1100'}
      >
        <div className={'ut-content-page'}
        style={{ minHeight:'calc(100vh - 100px)'}}
        
        >
        <div style={{padding: '12px'}} className={'ut-flex-space'}>
          <div>
          <OptimizedInput 
            value={filterName}
            onChange={handleChangeName}
            placeholder="Filter by name"
          />
          </div>
          <div>
          <OptimizedInput 
            value={filterText}
            onChange={handleChangeText}
            placeholder="Filter by text"
          />
          </div>
          <div>
              <Select
                defaultValue="name_asc"
                style={{ width: '100%', minWidth: '200px' }}
                onChange={handleSortChange}
                options={sortOptions}
              />
          </div>
        </div>

          <div className={'ut-table-list-stack'}>
          <div className={'ut-table-list-card'}>
            <div>
              <div>
                num
              </div>
            </div>
              <div>
              <div>
                NAME
              </div>
            </div>
            <div>
              <div>
                DESCR
              </div>
            </div>
              <div>
              <div>
                TAGS
              </div>
            </div>
              <div>
              <div>
                DEV
              </div>
            </div>
            <div>
              <div>
                PROD
              </div>
            </div>
              <div>
              <div>
                MIG
              </div>
            </div>
              <div>
              <div>
                <StarFilled />
              </div>
            </div>
              <div>
              <div>
                
              </div>
            </div>

          </div>
            {sortedTableList?.map((tabitem, index)=>(
              <TableListCardUt
              data={tabitem} 
              index={index} 
              key={tabitem.name}
                onCheckCell={handleCheckCell}
                on_save_color={handleChangeColor}
                on_save_descr={handleChangeDescr}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TableListPageUt;
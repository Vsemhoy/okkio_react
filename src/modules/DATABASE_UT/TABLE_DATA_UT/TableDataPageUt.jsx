import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { CSRF_TOKEN } from '../../../config/config';
import { Pagination, Table } from 'antd';


const TableDataPageUt = (props) => {
    const { tableName } = useParams();

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 30,
        total: 0,
    });


    useEffect(() => {
      let q = document.querySelector('body');
      q.classList.add('ut-fit-content');
    }, []);


    useEffect(() => {
        get_data(pagination.current, pagination.pageSize);
    }, [tableName]);

    const columns = data[0] 
        ? Object.keys(data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
        }))
        : [];



    /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка таблиц
     * @param {*} req 
     * @param {*} res 
     */
    const get_data = async (page = 1, pageSize = 30) => {
        try {
let response = await PROD_AXIOS_INSTANCE.post(`/api/utilizare/db/tabledata/${tableName}`, 
                {
                    
                        table: tableName,
                        page: page,
                        page_size: pageSize,
                    
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                    setData(response.data.data);
                    setLoading(false);
                    setPagination({
                    ...pagination,
                    current: response.data.current_page,
                    total: response.data.total,
                    pageSize: pageSize,
                });
                }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const set_description_value = async (table, value) => {
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





  return (
    <div className={'ut-page-container-x'}>
      <div className={'ut-minw-x'}
      >
      <div className={'ut-content-page'}
        style={{ minHeight:'calc(100vh - 100px)'}}
        
        >
        <div style={{padding: '12px', alignItems: 'center', gridGap: '22px'}} className={'ut-flex'}>
        <div>
            <Link to={`/db/tables#${tableName}`} >Back</Link>
        </div>
            <h3>Table: {tableName}</h3>
        </div>

            <div style={{padding: '0px 12px 12px 12px'}}>
            <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={(page, pageSize) => get_data(page, pageSize)}
                style={{ marginTop: '16px', textAlign: 'right' }}
            />
            </div>

            <div className='ut-table-list-stack'>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={false}
            />
            </div>
        </div>
      </div>
    </div>
   
  );
};

export default TableDataPageUt;
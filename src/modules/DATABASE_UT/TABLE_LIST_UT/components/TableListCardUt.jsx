import { Button, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROD_AXIOS_INSTANCE } from '../../../../API/API';
import { CSRF_TOKEN, PRODMODE } from '../../../../config/config';
import { TABLE_STRUCT_MOCK } from './mock/TABLELISTMOCK';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

// const TextWithBreaks = ({ text }) => (
//   <Typography.Text>
//     <span 
//       dangerouslySetInnerHTML={{ 
//         __html: text?.replace(/\n/g, '<br/>') || '' 
//       }} 
//     />
//   </Typography.Text>
// );


const AnchorTextRenderer = ({ text }) => {
  // Функция для обработки клика по якорю
  const navigate = useNavigate();
  const handleAnchorClick = useCallback((e, id) => {
    console.log('id', id)
    navigate('#'+id);
    e.preventDefault();
    const element = document.getElementById(`${id}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      // Добавляем хайлайт на 2 секунды
      element.style.backgroundColor = '#0058ff';
      element.style.outline = '2px solid #0058ff';
      setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.outline = '';
      }, 3000);
    }
  }, []);

  // Разбиваем текст и преобразуем хэштеги в ссылки
  const renderText = () => {
    if (!text) return null;
    
    return text.split(/(\s+)/).map((word, index) => {
      if (word.startsWith('#') && word.length > 1) {
        const anchorId = word.substring(1);
        return (
          <React.Fragment key={index}>
            {' '}
            <a 
              href={`#${anchorId}`} 
              onClick={(e) => handleAnchorClick(e, anchorId)}
              style={{ color: '#1890ff' }}
            >
              {word}
            </a>
          </React.Fragment>
        );
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  return (
    <Typography.Text style={{ whiteSpace: 'pre-wrap' }}>
      {renderText()}
    </Typography.Text>
  );
};


const TableListCardUt = (props) => {
    const [tableName, setTableName] = useState('initialValue');
    const [data, setData] = useState(null);

    const [tableSchema, setTableSchema] = useState(null);
    const [tableRows, settableRows] = useState([]);

    const [openedInfo, setOpenedInfo] = useState(false);

    const [currentColor, setcurrentColor] = useState(props.data?.color);
    const [currentDescr, setcurrentDescr] = useState(props.data?.description);
    const [descrEditMode, setDescrEditMode] = useState(false);

    // useEffect(() => {
    //   console.log('currentColor', currentColor);
    // }, [currentColor]);

    useEffect(() => {
      setTableName(props.data.name);
      setData(props.data);
    }, [props.data]);


    useEffect(() => {
      if (tableSchema && tableSchema[0] != null){
        let arr = [];
        for (const key in tableSchema[0]) {
            if (Object.prototype.hasOwnProperty.call(tableSchema[0], key)) {
                arr.push([{key:key, value: key === 'name' ? 'table name:' : key + ":", for: '_init'}]);
            }
        }
        for (let i = 0; i < arr.length; i++) {
            const rowKey = arr[i][0].key;
            // console.log('key', row[0].key)
            for (let t = 0; t < tableSchema.length; t++) {
                const element = tableSchema[t];
                if (element[rowKey] !== undefined)
                {
                    arr[i].push({key: rowKey, value: element[rowKey], for: element.name});
                }
            }
        }
        console.log('arr', arr)
        settableRows(arr);
      }
    }, [tableSchema]);


     /** ------------------ FETCHES ---------------- */

          /**
         * Получение параметров таблицы
         * @param {*} req 
         * @param {*} res 
         */
        const get_table_structure = async (req, res) => {
          try {
              const format_data = {
                  CSRF_TOKEN,
                  data: {
                      // ...filters,
                      // created_date: get_unix_by_datearray(filters.created_date),
                      // active_date: get_unix_by_datearray(filters.active_date)
                  }
              }
              let response = await PROD_AXIOS_INSTANCE.get('/api/utilizare/db/tablestructure/' + tableName + '?_token=' + CSRF_TOKEN);
              console.log('LOADED: ', response.data);
              // setUserAct(response.data);
              setTableSchema(response.data);
          } catch (e) {
              console.log(e)
          } finally {
          }
      }
      /** ------------------ FETCHES END ---------------- */


    const handleDoubleClick = () => {
        get_table_structure();
        setOpenedInfo(true);
    }

    const handleSingleClick = () => {
        console.log('SINGLE')
        if (!openedInfo){
            if (PRODMODE){
                get_table_structure();

            } else {
                setTableSchema(TABLE_STRUCT_MOCK);
            }
            setOpenedInfo(true);
        } else {
            setOpenedInfo(false);
        }
    }

    const handleCheckCell = (target, isDouble, value) => {
        // If value false and single click - do check
        // if value true and double click - do uncheck
        if (value === false && isDouble === false)
        {
            if (props.onCheckCell){
                props.onCheckCell(tableName, target, true);
            };
        } else if (value === true && isDouble === true){
            if (props.onCheckCell){
                props.onCheckCell(tableName, target, false);
            };
        }
    }

    const saveColor = () => {
        console.log('currentColor', currentColor)
        if (props.on_save_color){
            props.on_save_color(tableName, currentColor);
        };
    }


    const saveDescr = () => {
        setDescrEditMode(false);
        if (props.on_save_descr){
            props.on_save_descr(tableName, currentDescr);
        };
    }

  return (
    <div className={'ut-table-list-wrapper'} id={tableName}>
        <div className={'ut-table-list-card'} style={{color: currentColor}}>
            <div>
                <div>
                    {props.index}
                </div>
            </div>
            <div>
                <div className={'ut-cpointer ut-table-list-table-name'}
                    onClick={handleSingleClick}
                    onDoubleClick={handleDoubleClick}
                >
                {tableName}
                </div>
            </div>
            <div>
                {descrEditMode ? (
                    <TextArea value={currentDescr} 
                        onChange={(ev)=>{setcurrentDescr(ev.target.value)}}
                        bordered={false}
                        onBlur={saveDescr}
                        style={{minHeight: '100px'}}
                    />
                ): (
                    <div
                        className={'ut-table-list-table-descr'}
                        style={{height: '100%'}}
                        onDoubleClick={()=>{setDescrEditMode(true)}}
                    ><AnchorTextRenderer text={currentDescr} /></div>
                )}

                    
                
            </div>
            <div>
                <div>

                </div>
            </div>
            <div>
                <div className={'ut-center'} title='published on DEV'>
                    {data?.published_dev ? (
                        <span className={'ut-table-list-toggler'}
                            onClick={(ev)=>{handleCheckCell('published_dev', false, data?.published_dev)}}
                            onDoubleClick={(ev)=>{handleCheckCell('published_dev', true, data?.published_dev)}}>
                            <StarFilled />
                        </span>
                    ) : (
                        <span className={'ut-table-list-toggler ut-table-list-toggler-off'}
                            onClick={(ev)=>{handleCheckCell('published_dev', false, data?.published_dev)}}
                            onDoubleClick={(ev)=>{handleCheckCell('published_dev', true, data?.published_dev)}}>
                            <StarOutlined />
                        </span>
                    )
                    }
                </div>
            </div>
            <div>
                <div className={'ut-center'} title='published on PROD'>
                    {data?.published_prod ? (
                        <span className={'ut-table-list-toggler'}
                            onClick={(ev)=>{handleCheckCell('published_prod', false, data?.published_prod)}}
                            onDoubleClick={(ev)=>{handleCheckCell('published_prod', true, data?.published_prod)}}>
                            <StarFilled />
                        </span>
                    ) : (
                        <span className={'ut-table-list-toggler ut-table-list-toggler-off'}
                            onClick={(ev)=>{handleCheckCell('published_prod', false, data?.published_prod)}}
                            onDoubleClick={(ev)=>{handleCheckCell('published_prod', true, data?.published_prod)}}>
                            <StarOutlined />
                        </span>
                    )
                    }
                </div>
            </div>
            <div>
                <div className={'ut-center'} title='has migrations'>
                    {data?.has_migrations ? (
                        <span className={'ut-table-list-toggler'}
                            onClick={(ev)=>{handleCheckCell('has_migrations', false, data?.has_migrations)}}
                            onDoubleClick={(ev)=>{handleCheckCell('has_migrations', true, data?.has_migrations)}}
                        >
                            <StarFilled />
                        </span>
                    ) : (
                        <span className={'ut-table-list-toggler ut-table-list-toggler-off'}
                            onClick={(ev)=>{handleCheckCell('has_migrations', false, data?.has_migrations)}}
                            onDoubleClick={(ev)=>{handleCheckCell('has_migrations', true, data?.has_migrations)}}
                        >
                            <StarOutlined />
                        </span>
                    )
                    }
                </div>
            </div>
            <div>
                <div className={'ut-center'} title='Starred'>
                    {data?.starred ? (
                        <span className={'ut-table-list-toggler'}
                            onClick={(ev)=>{handleCheckCell('starred', false, data?.starred)}}
                            onDoubleClick={(ev)=>{handleCheckCell('starred', true, data?.starred)}}
                        >
                            <StarFilled />
                        </span>
                    ) : (
                        <span className={'ut-table-list-toggler ut-table-list-toggler-off'}
                            onClick={(ev)=>{handleCheckCell('starred', false, data?.starred)}}
                            onDoubleClick={(ev)=>{handleCheckCell('starred', true, data?.starred)}}
                        >
                            <StarOutlined />
                        </span>
                    )
                    }
                </div>
            </div>
            <div>
                <div>
                    <Link to={'/db/tables/' + tableName}>
                        <Button size={'small'}>data</Button>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <Input type={'color'} value={currentColor} onChange={(ev)=>{setcurrentColor(ev.target.value)}}
                        onBlur={saveColor}
                     />
                </div>
            </div>
        </div>
        {openedInfo && tableRows && (
            <div className={'ut-table-list-card-schema'}>
                <div>
                {tableRows.map((tlcRow, indexrow)=> (
                    <div
                    key={`row_${tableName}_${indexrow}`}
                    style={{display: 'grid', gridTemplateColumns: `repeat(${tlcRow.length + 1}, 1fr)`}}
                        className={'ut-tlc-row'}
                    >
                        {tlcRow.map((tlCell, incell) => (
                            <div 
                            key={`row_${tableName}_${indexrow}_${incell}`}
                            className={`ut-tlc-cell ${tlCell.key === 'name' ? 'ut-tlc-cell-head':''}`}>
                                <div>
                                    {tlCell.value}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        )}

    </div>
  );
};

export default TableListCardUt;
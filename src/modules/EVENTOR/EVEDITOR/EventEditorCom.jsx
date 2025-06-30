import React, { useEffect, useState } from 'react';

import '@mdxeditor/editor/style.css'
import { MDXEditor, headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, BlockTypeSelect, CodeMirrorEditor,
     ChangeAdmonitionType, ChangeCodeMirrorLanguage, CodeToggle, CreateLink, InsertAdmonition, InsertCodeBlock, CodeBlockNode,
      InsertImage, 
      InsertTable,
      ListsToggle,
      ShowSandpackInfo} from '@mdxeditor/editor'
import { Button, Checkbox, Col, Dropdown, Flex, Input, Modal, Row, Tooltip, Typography } from 'antd';
import './components/style/eventeditor.css';
import { DeleteOutlined, DislikeOutlined, SaveFilled, SaveOutlined } from '@ant-design/icons';


const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];


const EventEditorCom = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const [formContent, setFormContent] = useState('# Hello World');
    const [formName, setFormName] = useState('Hello Wolfd');

    const [mode, setMode] = useState('editor');

    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
      props.open? setOpenModal(true) : setOpenModal(false);
    }, [props.open]);

  return (
    <div>
     <Modal className={'ev-editor-modal'}
        title={<div className='ev-editor-modal-head'>
        <Input
            // size={'large'}
            style={{fontWeight: '600', fontSize: 'large'}}
            onChange={(ev)=>{setFormName(ev.target.value)}}
            value={formName}
            // maxLength={120}
            сount={{
            show: true,
            max: 120,
        }}
        ></Input>
            {mode === 'editor' && (
                <Button
                    size={'large'}
                    onClick={()=>{setMode('settings')}}
                >Settings</Button>
            )}
            {mode === 'settings' && (
                <Button
                    size={'large'}
                    onClick={()=>{setMode('editor')}}
                >Editor</Button>
            )}
            <Button
                size={'large'}
            >
                <span className={'evt-modal-type-trigger'}>Tp</span>
            </Button>
        </div>}
        centered
        open={props.open}
        onOk={props.onOk}
        onCancel={props.onCancel}

        footer={<div className={'mi-pa-3 mi-flex-space'}>
            <div className='mi-flex mi-grid-gap-12'>
                <Dropdown
                menu={{ items }}
                placement="topLeft"
                >
                    <Button>Drafts</Button>
                </Dropdown>
                <Tooltip title={'Save draft'}>
                <Button
                icon={<SaveOutlined />}
                type={'default'}
                ></Button></Tooltip>
                <Tooltip title={'Delete draft'}>
                <Button
                danger
                icon={<DeleteOutlined />}
                type={'default'}
                ></Button></Tooltip>
            </div>
            <div></div>
            <div className='mi-flex mi-grid-gap-12'>
            <Button
                danger
                >Delete</Button>
            <Button
                type={'default'}
                onClick={props.onCancel}
                >Close</Button>
                <Button
                icon={<SaveFilled />}
                type={'primary'}
                >Save</Button>
            </div>
        </div>}

        width={{
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '80%',
          xl: '65%',
          xxl: '50%',
        }}
      >
        <div className={'ev-editor-modal-content-wrapper'}>
            {mode === 'editor' && (
                <MDXEditor

                markdown={formContent} 
                plugins={[headingsPlugin(),
                onchange={setFormContent},
                toolbarPlugin({
            toolbarClassName: 'my-classname',
            toolbarContents: () => (
                <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertAdmonition />
                <InsertCodeBlock />
                <InsertImage />
                <InsertTable />
                <ListsToggle />
                </>
            )
            })
                ]}
                />
            )}
            {mode === 'settings' && (
            <div>
                <Row >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div style={{padding: '5px'}}>
                        <Flex vertical gap={16}>
                            <div>
                            <Typography.Text>Тег</Typography.Text>
                            <Input
                                count={{
                                show: true,
                                max: 10,
                                }}
                                defaultValue="Hello, antd!"
                            />
                            </div>

                            <div>
                            <Typography.Text>Доступ</Typography.Text>
                            <Input
                                count={{
                                show: true,
                                
                                }}
                                defaultValue="🔥🔥🔥"
                            />
                            </div>

                            <div>
                            <Typography.Text>Секция</Typography.Text>
                            <Input
                                count={{
                                show: true,
                                max: 6,
                                //   strategy: txt => runes(txt).length,
                                
                                }}
                                defaultValue="🔥 antd"
                            />
                            </div>

                            <div>
                            <Typography.Text>Комментарии</Typography.Text>
                            <Input
                                count={{
                                show: true,
                                max: 6,
                                //   strategy: txt => runes(txt).length,
                                
                                }}
                                defaultValue="Всем, определить секцией, закрыты"
                            />
                            </div>
                        </Flex>
                    </div>
                    
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div style={{padding: '5px'}}>
                    <Flex vertical gap={16}>
                        <div>
                        <Typography.Text>Проект</Typography.Text>
                        <Input
                            count={{
                            show: true,
                            max: 10,
                            }}
                            defaultValue="Hello, antd!"
                        />
                        </div>

                        <div>
                        <Typography.Text>Дата</Typography.Text>
                        <Input
                            count={{
                            show: true,
                            
                            }}
                            defaultValue="🔥🔥🔥"
                        />
                        </div>

                        <div>
                        <Typography.Text>Время</Typography.Text>
                        <Input
                            count={{
                            show: true,
                            max: 6,
                            //   strategy: txt => runes(txt).length,
                            
                            }}
                            defaultValue="🔥 antd"
                        />
                        </div>
                        
                        <div>
                            <Checkbox >Is locked</Checkbox>
                        </div>

                        <div>
                            <Checkbox >Is starred</Checkbox>
                        </div>

                    </Flex>
                    </div>
                </Col>
            </Row>


    
                </div>
            )}
        </div>
      </Modal>
    </div>
  );
};

export default EventEditorCom;
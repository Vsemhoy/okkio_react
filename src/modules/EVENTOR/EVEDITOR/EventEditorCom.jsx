import React, { useCallback, useEffect, useRef, useState } from 'react';

import '@mdxeditor/editor/style.css'
import { 
  MDXEditor, 
  headingsPlugin, 
  UndoRedo, 
  BoldItalicUnderlineToggles, 
  toolbarPlugin, 
  BlockTypeSelect, 
  CodeToggle, 
  CreateLink, 
  InsertAdmonition, 
  InsertCodeBlock, 
  InsertImage, 
  InsertTable, 
  ListsToggle,
  linkDialogPlugin,         // Для работы диалога ссылок
  imagePlugin,             // Для загрузки изображений
  tablePlugin,             // Для работы с таблицами
  listsPlugin,             // Для списков (ul/ol)
  quotePlugin,             // Для цитат (опционально)
  thematicBreakPlugin,     // Для разделителей (---)
  markdownShortcutPlugin,  // Для горячих клавиш
  diffSourcePlugin,         // Для сравнения изменений (опционально)
  codeBlockPlugin,
  codeMirrorPlugin
} from '@mdxeditor/editor';

import { Button, Checkbox, Col, DatePicker, Dropdown, Flex, Input, Modal, Row, Select, Tooltip, Typography } from 'antd';
import './components/style/eventeditor.css';
import { BorderOutlined, CarOutlined, CiCircleOutlined, DeleteOutlined, DislikeOutlined, SaveFilled, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useEventorStorage } from '../../../storage/localstorage/EventorStaorage';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';


import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { xml } from '@codemirror/lang-xml';
import { sql } from '@codemirror/lang-sql';
import { json } from '@codemirror/lang-json';

import { sass } from '@codemirror/lang-sass';
import { less } from '@codemirror/lang-less';
import { vue } from '@codemirror/lang-vue';
import { angular } from '@codemirror/lang-angular';
import { go } from '@codemirror/lang-go';

import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

import { dracula } from '@uiw/codemirror-theme-dracula';
import { LANGUAGE_MAP, PROG_LANGS } from '../../../components/Definitions/Global/Lists/ProgLangs';
import { BaseEventTypes } from '../cfg/EvTypes';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';


import Cookies from "js-cookie";


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
    const { 
        events,
        addEvent,
        getEvent,
        getEvents,
        updateEvent,
        removeEvent,

        getSection,
        getSections,
        getEvtypes,
    } = useEventorStorage();

    const [sections, setSections] = useState();

    const [itemId, setItemId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [blockAction, setBlockAction] = useState(false);

    const [formContent, setFormContent] = useState('# Hello World');
    const [formName, setFormName] = useState('Hello Wolfd');
    const [formSetDate, setFormSetDate] = useState(dayjs());
    const [formSection, setFormSection] = useState(null);
    const [formType, setFormType] = useState('SYSLWI7GB9DA6DIQKRNOGN843Y');
    const [formLocation, setFormLocation] = useState(null);
    const [formGroup, setFormGroup] = useState(null);
    const [formProject, setFormProject] = useState(null);
    const [formStatus, setFormStatus] = useState(null);
    const [formAccess, setFormAccess] = useState(null);
    const [formCommentAccess, setFormCommentAccess] = useState(null);

    const [sectionList, setSectionList] = useState([]);
    
    const [preContent, setPreContent] = useState('');

    const [mode, setMode] = useState('editor');

    const [drafts, setDrafts] = useState([]);

    const [langList, setLangList] = useState(['JavaScript']);

    useEffect(() => {
        let a =  props.sections?.map((item)=>(
            { 
                key: "sect_" + item.id ,
                label: item.name,
                value: item.id
            }
        ));
        // a?.unshift({ key: 'sect_all', label: 'All sections', id: 'ALL'});
        a?.unshift({ key: 'no_sect', label: 'No section', id: 'NULL'});
        console.log('a', a)
        if (a){
          setSectionList(a);
        };
    }, [props.open]);


    const handleChangeSection = (val) => {
        if (val == 0){
            setFormSection(null);
        } else {
            setFormSection(val);
        }
    }


    useEffect(() => {
      props.open? setOpenModal(true) : setOpenModal(false);
    }, [props.open]);


    const editorRef = useRef(null);


    useEffect(() => {
    if (editorRef.current && formContent !== editorRef.current.getMarkdown()) {
        editorRef.current.setMarkdown(formContent);
    }
    }, [formContent]);




    useEffect(() =>  {
        loadDataAction();
    }, [props.data]);


    const loadDataAction = async () => {
              if (props.data?.id){
          let loadedFromServer = false;
          // OPEN EXISTED
            console.log('props.data?.id', props.data)
            setItemId(props.data?.id);


          if (!props.data.id.includes('temp_')){
            try {
              const response = await PROD_AXIOS_INSTANCE.post('/eventor/getmyevent/' + props.data.id, 
                {}, {
                headers: {
                  'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
              });

              // console.log('response', response)
                const data = response.data.content;
                loadedFromServer = true;
                setFormSetDate(dayjs(data.setdate));
                setFormName(data.name);
                setFormContent(data.content);
                const langs = extractCodeLanguages(data.content);
                setLangList(langs);
                setFormType(data.type_id ? data.type_id : formType);
                setFormSection(data.section_id ?? 0);

            }
            catch (error) {
              console.error('Sync failed:', error);

            } finally {
              
            }
          }

          if (!loadedFromServer){
            let evt = getEvent(props.data?.id);
            console.log('evt', evt)
            if (evt){
                setFormSetDate(dayjs(evt.setdate));
                setFormName(evt.name);
                setFormContent(evt.content);
                const langs = extractCodeLanguages(evt.content);
                setLangList(langs);
                setFormType(evt.type_id ? evt.type_id : formType);
                setFormSection(evt.section_id ?? 0);
            } else {
                setFormContent('');
                setFormName('New');
                setFormSetDate(dayjs());
            }
          }

            
        } else {
          // CREATE NEW
            setItemId(null);
            console.log('props', props)
            setFormSetDate(props.data?.date);
            setFormSection(props.data?.section_id ?? 0);
            setFormName("");
            setFormContent("");
            setLangList(['JavaScript']);
            // setFormType()
            // setFormSetDate(props.date);
        }
        setBlockAction(false);
    }



    useEffect(() => {
    //   setPreContent(formContent);
    }, [formContent]);

    // const handleSaveData = () => {
    //     if (!blockAction){
    //         setBlockAction(true);
    //         if (itemId){
    //             const event = {
    //                 id: itemId,
    //                 content: formContent,
    //                 name: formName,
    //                 setdate: formSetDate.format('YYYY-MM-DD hh:mm:ss'),
    //                 createdAt: null,
    //                 updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
    //                 section: formSection ? formSection : null,
    //                 type_id: formType ? formType : null,
    //                 location: null,
    //                 project_id: null,
    //                 category_id: null,
    //                 metadata: null,
    //                 access: 1,
    //                 status: 1,
    //                 syncStatus: 'pending', // 'pending', 'synced', 'error'
    //                 serverId: null, // настоящий ID после синхронизации
    //             };
    //             updateEvent(event.id, event);
    //         } else {
    //             const event = {
    //                 id: 'temp_' + dayjs().unix(),
    //                 content: formContent,
    //                 name: formName,
    //                 setdate: formSetDate.format('YYYY-MM-DD hh:mm:ss'),
    //                 createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
    //                 updatedAt: dayjs().format('YYYY-MM-DD hh:mm:ss'),
    //                 section: formSection ? formSection : null,
    //                 type_id: formType ? formType : null,
    //                 location: null,
    //                 project_id: null,
    //                 category_id: null,
    //                 metadata: null,
    //                 access: 1,
    //                 status: 1,
    //                 syncStatus: 'pending', // 'pending', 'synced', 'error'
    //                 serverId: null, // настоящий ID после синхронизации
    //             };
    //             addEvent(event.id, event);
    //             console.log('event', event);
    //             setItemId(event.id);
    //         }
    
            
    //         setTimeout(() => {
    //             setBlockAction(false);
    //             if (props.on_change){
    //                 console.log('props', props)
    //                 props.on_change([itemId]);
    //             }
    //         }, 1500);
    //     }
    // }


  const handleSaveData = async (close = false) => {
    console.log('🔥 handleSaveData вызван', Date.now());
    if (blockAction) return;
    setBlockAction(true);

    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const tempId = itemId || 'temp_' + Date.now();

    const event = {
      id: tempId,
      content: formContent,
      name: formName,
      setdate: formSetDate.format('YYYY-MM-DD HH:mm:ss'),
      createdAt: itemId ? null : now,
      updatedAt: now,
      section_id: formSection || null,
      type_id: formType != null && formType != 0 ? formType : null,
      access: 1,
      status: 1,
      syncStatus: 'pending',
      serverId: null,
    };

    try {
      // 1. Сохраняем в локальное хранилище
      if (itemId) {
        updateEvent(tempId, event);
      } else {
        addEvent(tempId, event);
        setItemId(tempId);
      }
      console.log(Cookies.get('jwt'));
      // 2. Отправляем на сервер
      const response = await PROD_AXIOS_INSTANCE.post('/eventor/saveevent', 
        event, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('jwt')
        }
      });

      // 3. Если успех — обновляем локальное событие
      const savedEvent = response.data.content;
      if (tempId.includes('temp_')){
        removeEvent(tempId);
        addEvent(savedEvent.id, {...savedEvent, serverId: savedEvent.id,
          syncStatus: 'synced'});
      } else {

        updateEvent(tempId, {
          ...savedEvent,
          id: savedEvent.id,
          serverId: savedEvent.id,
          syncStatus: 'synced'
        });
      }

    } catch (error) {
      console.error('Sync failed:', error);
      // Оставляем в хранилище с syncStatus: 'pending'
      // Пользователь увидит: "Не синхронизировано"
    } finally {
      setTimeout(() => {
        setBlockAction(false);
        if (props.on_change) {
          props.on_change([tempId]);
          if (close === true){
            props.onCancel();
          }
        }
      }, 1300);
    }
  };


    const debounceTimeoutRef = useRef(null);

    // Оптимизированный обработчик с debounce
    const handleContentChange = useCallback((newMarkdown) => {
        // console.log('New content (debounced):', newMarkdown);
        
        // Очищаем предыдущий таймаут
        if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        }

        // Устанавливаем новый таймаут (300мс задержка)
        debounceTimeoutRef.current = setTimeout(() => {
        setFormContent(newMarkdown);

        }, 1200);
    }, []);


    // Важно: очищаем таймаут при размонтировании
    useEffect(() => {
        return () => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        };
    }, []);

   document.addEventListener('click', (ev)=> {
    if (ev.target.closest('._selectItem_sects_301')){
        console.log('ev.target', ev.target)
    }
   })


// Глобальный WeakSet, чтобы избежать дублирования
const patchedSpans = new WeakSet();

const fillLangSpans = useCallback(() => {
  const spans = document.querySelectorAll('span');
  let index = 0;

  spans.forEach((span) => {
    // Пропускаем, если уже обработан
    if (patchedSpans.has(span)) return;

    const isTargetSpan =
      (span.textContent.trim() === '' || span.classList.contains('Ololo_SPAN_Rialne')) &&
      span.closest('.mdxeditor-rich-text-editor') &&
      span.hasAttribute('aria-hidden');

    if (isTargetSpan) {
      const lang = langList[index] || 'JavaScript';
      const wrapper = document.createElement('span');
      wrapper.className = 'Ololo_SPAN_Rialne';
      wrapper.textContent = lang;
      wrapper.setAttribute('data-lang-index', index); // для отладки

      // Очищаем и вставляем
      span.innerHTML = '';
      span.appendChild(wrapper);

      patchedSpans.add(wrapper);
      patchedSpans.add(span); // чтобы не трогать этот span дважды
      index++;
    }

    // Обновление уже существующих Ololo_SPAN_Rialne (например, при изменении langList)
    if (span.classList.contains('Ololo_SPAN_Rialne')) {
      const savedIndex = parseInt(span.getAttribute('data-lang-index'), 10) || 0;
      const lang = langList[savedIndex] || 'JavaScript';
      if (span.textContent !== lang) {
        span.textContent = lang;
      }
      patchedSpans.add(span);
    }
  });
}, [langList]);




// При изменении контента — обновляем языки
useEffect(() => {
  fillLangSpans();
}, [formContent, fillLangSpans]);

// При открытии модалки — даём время на рендер, потом патчим
useEffect(() => {
  if (openModal) {
    const timer = setTimeout(() => {
      fillLangSpans();
    }, 300);
    return () => clearTimeout(timer);
  }
}, [openModal, fillLangSpans]);



  useEffect(() => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const popup = node.classList?.contains('mdxeditor-popup-container') ? node :
                       node.querySelector?.('.mdxeditor-popup-container');

          if (popup) {
            // Ждём, пока DOM попапа стабилизируется
            requestAnimationFrame(() => {
              const optionSpans = popup.querySelectorAll('[role="option"] span, [data-radix] span');
              let index = 0;

              optionSpans.forEach((span) => {
                const text = span.textContent.trim();
                // Если пустой или это функция — заменяем
                if (!text || text.includes('=>') || text === 'js' || text === 'py') {
                  const lang = PROG_LANGS[index] || 'Code';
                  span.textContent = lang;
                }
                index++;
              });
            });
          }
        }
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}, []);



useEffect(() => {
  const extractLangs = () => {
    const regex = /^```(\w+)/gm;
    const matches = [];
    let match;
    while ((match = regex.exec(formContent)) !== null) {
      const short = match[1].toLowerCase();
      matches.push(LANGUAGE_MAP[short] || short.charAt(0).toUpperCase() + short.slice(1));
    }
    return matches.length ? matches : ['JavaScript'];
  };

  setLangList(extractLangs());
}, [formContent]);


const extractCodeLanguages = (markdown) => {
  // Регулярка ловит ```js, ```python, ```html и т.д. в начале строки
  const regex = /^```(\w+)/gm;
  const languages = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const lang = match[1].toLowerCase();

    // Маппинг коротких названий на читаемые
    const langMap = {
      js: 'JavaScript',
      ts: 'TypeScript',
      md: 'Markdown',
      markdown: 'Markdown',
      cpp: 'C++',
      c: 'C',
      java: 'Java',
      python: 'Python',
      py: 'Python',
      php: 'PHP',
      rust: 'Rust',
      rs: 'Rust',
      xml: 'XML',
      sql: 'SQL',
      json: 'JSON',
      'c#': 'C#',
      cs: 'C#',
      sass: 'Sass',
      less: 'Less',
      vue: 'Vue',
      angular: 'Angular',
      go: 'Go',
      golang: 'Go',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      shell: 'Shell',
      bash: 'Bash',
      sh: 'Shell',
      yaml: 'YAML',
      yml: 'YAML',
      dockerfile: 'Dockerfile'
      // Добавь свои при необходимости
    };

    // Если есть в мапе — берём читаемое имя, иначе — делаем первую заглавной
    languages.push(langMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1));
  }

  // Если нет блоков — возвращаем fallback
  return languages.length > 0 ? languages : ['JavaScript'];
};


    useEffect(() => {
    const observer = new MutationObserver(() => {
        const ppcu = document.querySelector('.mdxeditor-popup-container');
        if (ppcu){
            const spans = ppcu.querySelectorAll('span');
            let index = 0;
            console.log('spans.length', spans.length)
            Array.from(spans).forEach(span => {
                // console.log('span', span)
                if (span.id !== null && span.id.includes('radix')){
                    // console.log('span', span, );
                    index++;
                    if (span.innerText === ""){
                        span.innerText = PROG_LANGS[index];
                    }
                }
            })
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return () => observer.disconnect();
    }, []);











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

            <Dropdown menu={{ items: BaseEventTypes.map((item)=>(
                {
                    key: item.id,
                    value: item.id,
                    label: item.name,
                    onClick: (ev)=> {setFormType(ev.key)},
                    icon: <BorderOutlined />
                }
                ))}}
                value={formType}
                // onChange={(ev)=> {console.log(ev.target.value)}}
                // onClick={(ev)=> {console.log(ev.target.value)}}
                >
                <Tooltip title={BaseEventTypes.find((item) => item.id === formType)?.name ?? "No type"}>
                <Button
                    size={'large'}
                    style={{background: BaseEventTypes.find((item) => item.id === formType)?.bgcolor, color: BaseEventTypes.find((item) => item.id === formType)?.color}}
            >
                    <span className={'evt-modal-type-trigger'}>
                    { BaseEventTypes.find((item) => item.id === formType)?.name?.substring(0,3).toUpperCase() ?? "..."}
                    </span>
                </Button>
                </Tooltip>
            </Dropdown>
        </div>}
        centered
        open={props.open}
        onOk={props.onOk}
        onCancel={props.onCancel}

        footer={<div className={'mi-pa-3 mi-flex-space'}>
            <div className='mi-flex mi-grid-gap-12'>
                {/* <Dropdown
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
                ></Button></Tooltip> */}
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
                onClick={()=>{handleSaveData(true)}}
                disabled={blockAction}
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

        style={{maxWidth: '900px'}}

      >
        <div className={'ev-editor-modal-content-wrapper'}>
            {mode === 'editor' && (
                <MDXEditor
                ref={editorRef}
                key={itemId + "_editto" || 'new_editto'}
                markdown={formContent}
                onChange={(newMarkdown) => {
                    // console.log('Content changed:', newMarkdown);
                    handleContentChange(newMarkdown);
                    // setFormContent(newMarkdown);
                    // setPreContent(newMarkdown);
                }}
                // onBlur={(newMarkdown) => {
                //     console.log('Content changed:', newMarkdown);
                //     // setFormContent(newMarkdown);
                //     // setPreContent(newMarkdown);
                // }}
           


                plugins={[
                    codeBlockPlugin({ defaultCodeBlockLanguage: 'js'}), // Базовые блоки кода
                    //  codeBlockPlugin(),
                    codeMirrorPlugin({
                        theme: dracula,
                        codeBlockLanguages: { 
                            js:      () => javascript({ jsx: true }), // Поддержка JSX
                            ts:      () => javascript({ typescript: true }), // Поддержка TypeScript
                            md:      () => markdown(),
                            cpp:     () => cpp(),
                            java:    () => java(),
                            python:  () => python(),
                            php:     () => php(),
                            rust:    () => rust(),
                            xml:     () => xml(),
                            sql:     () => sql(),
                            json:    () => json(),
                            cs:      () => cpp(), // Используем C++ парсер для C#
                            c:       () => cpp(),  // И для C
                            sass:    () => sass(),
                            less:    () => less(),
                            vue:     () => vue(),
                            angular: () => angular(),
                            go:      () => go(),
                            html:    () => html(),
                            css:     () => css(),
                            scss:    () => sass(),  // SCSS (тот же пакет, что и для SASS)

                        },
                             renderCodeBlockLanguageSelect: ({ language, onChange }) => (
                            <div>PIDAR</div>
                             )
                        })
                    ,
                    headingsPlugin({allowedHeadingLevels:[3,4,5,6]}),  // Заголовки (h1-h6)
                    listsPlugin(),             // Списки (ul/ol)
                    linkDialogPlugin(),        // Диалог вставки ссылок
                    imagePlugin(),             // Вставка изображений
                    tablePlugin(),             // Таблицы
                    quotePlugin(),             // Цитаты (>)
                    thematicBreakPlugin(),     // Горизонтальные линии (---)
                    markdownShortcutPlugin(),  // Горячие клавиши
                    diffSourcePlugin(),        // Просмотр изменений (опционально)
                    toolbarPlugin({
                    toolbarContents: () => (
                        <>
                        <UndoRedo />                     
                        <BoldItalicUnderlineToggles />   
                        <BlockTypeSelect />              
                        <CodeToggle />                   
                        <CreateLink className={'createlink'} />                   
                        <InsertImage />                  
                        <InsertTable />                  
                        <ListsToggle />                  
                        <InsertAdmonition />             
                        <InsertCodeBlock />   
                        <div className='remark-toolbar-extra-button'
                          onClick={handleSaveData}
                        ><SaveOutlined /></div>           
                        </>
                    ),
                    }),
                ]}
                contentEditableClassName="prose" // Tailwind-класс для стилизации (если нужно)
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
                            <div>
                                <Select options={sectionList} value={formSection}
                                    style={{width: '100%'}}
                                    onChange={handleChangeSection}
                                />
                            </div>
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
                        <div>
                        <DatePicker
                            value={formSetDate}
                            onChange={setFormSetDate}
                            showTime
                            style={{width: '100%'}}
                        />

                        </div>
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
import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, LockTwoTone, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Modal } from 'antd';
import './style/eventorflowdaycard.css';
import dayjs from 'dayjs';
import { MDXEditor } from '@mdxeditor/editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LANGUAGE_MAP } from '../../../../components/Definitions/Global/Lists/ProgLangs';
import { eventCardTrimContent } from '../../cfg/EventorConfig';
import { BaseEventTypes } from '../../cfg/EvTypes';

const { Meta } = Card;

const EventorFlowDayCard = (props) => {

      const [itemId, setItemId] = useState(null);
      const [blockAction, setBlockAction] = useState(false);
  
      const [trimContent, setTrimContent] = useState('');
      const [content, setContent] = useState('');
      const [name, setName] = useState('');
      const [type, setType] = useState(null);
      const [setdate, setSetdate] = useState(dayjs());

      const [baseType, setBaseType] = useState(null);

    const [openViewer, setOpenViewer] = useState(false);

    useEffect(() => {
        setItemId(props.data.id);
        setContent(props.data.content);
        setName(props.data.name);
        setSetdate(props.data.setdate);
        setType(props.data.evtype ? props.data.evtype : null);
        setTrimContent(eventCardTrimContent(props.data.content));

        

    }, [props.data]);

    useEffect(() => {
      setBaseType(BaseEventTypes.find((item)=> item.id === type));
    }, [type]);


    const handleTriggerChange = () => {
      if (props.on_change_trigger){
        props.on_change_trigger(itemId);
      }
    }


 const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Не удалось скопировать (разрешите доступ к буферу обмена)');
    }
  };

  const CodeBadge = ({code, lang}) => {
    const [copied, setCopied] = useState(false);
    let langLabel = LANGUAGE_MAP[lang] ? LANGUAGE_MAP[lang] : "code"; 

    let handleCopy = () => {
      setCopied(true);
      handleCopyCode(code);
      setTimeout(() => {
          setCopied(false);
      }, 3200);
    }

    return <div
      onClick={handleCopy}
     className={`code-badge ${copied ? "copied" : ""}`}>{langLabel}</div>
  }


  const handleOpenView = () => {
    setOpenViewer(true);
  }


  return (
    <div className={'eventor-flow-daycard'}
      
    >
    <Card
      style={{borderLeft: `${baseType?.bgcolor ? "3px solid " + baseType?.bgcolor.substring(0, 7) : ""}`}}
      onDoubleClick={handleOpenView}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREE0yciVk88jOW7mkQjULzH2jCE6Jkc_SpPoF-Oih4LL2YIB3mqSCZKpaksGGFJIMU5dg&usqp=CAU"
      //   />
      // }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" onClick={handleTriggerChange} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {name.length > 0 && (
        <Meta
          // avatar={<LockTwoTone />}
          title={<div  style={{borderBottom: '1px solid #c9c9c9'}}>{`${name ? name : ("")}`}</div>}

        />

      )}
      <br/>
      <div className={'remarkrenderer'}>

        {/* <ReactMarkdown 
           remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown> */}
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match?.[1] || 'text';

                return !inline && match ? (
                  <div>
                    <CodeBadge code={String(children).replace(/\n$/, '')} lang={lang} />
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={lang}
                      PreTag="div"
                      {...props}
                      showLineNumbers // 🔥 включаем номера
                      wrapLines       // опционально: если строки длинные
                      lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>

                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {trimContent}
          </ReactMarkdown>


      </div>
    </Card>


      <Modal 
        open={openViewer}
        title={<div className='mi-pa-6' style={{borderBottom: '1px solid #c9c9c9'}}>{name}</div>}
        onCancel={()=>{setOpenViewer(false)}}
        footer={<div>
          <Button
            onClick={()=>{setOpenViewer(false)}}
            >Close</Button>
        </div>}
      >
        <div className='mi-pa-9'>
           <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match?.[1] || 'text';

                return !inline && match ? (
                  <div>
                    <CodeBadge code={String(children).replace(/\n$/, '')} lang={lang} />
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={lang}
                      PreTag="div"
                      {...props}
                      showLineNumbers // 🔥 включаем номера
                      wrapLines       // опционально: если строки длинные
                      lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>

                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </Modal>
   

    </div>
  );
};

export default EventorFlowDayCard;
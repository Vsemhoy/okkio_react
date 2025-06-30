import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const TaskEditorModal25 = (props) => {
    const [open, setOpen] = useState(false);
    const [itemId, setItemId] = useState(null);

    const handleClose = () => {
        if (props.on_close){
            props.on_close();
        };
        setOpen(false);
    };

    const handleSave = () => {
        if (props.on_save){
            props.on_save();
        }
    };

    useEffect(() => {
        if (props.open){
            setItemId(props.task_id);
            setOpen(true);
        }
    }, [props.open]);


  return (
     <Modal
        title={"Modal 1000px width " + itemId}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={handleClose}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
  );
};

export default TaskEditorModal25;
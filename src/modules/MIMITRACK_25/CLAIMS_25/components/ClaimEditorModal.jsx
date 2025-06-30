import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
const ClaimEditorModal = (props) => {
  const [open, setOpen] = useState(false);

    useEffect(()=>{
        setOpen(props.set_open);
    },[props.set_open])

  return (
    <>

      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
export default ClaimEditorModal;
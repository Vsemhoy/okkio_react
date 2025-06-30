import { Input } from 'antd';
import React, { useEffect, useState } from 'react';


const TreeTaskEditorSettingsForm = (props) => {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      setEditMode(props.edit_mode);
    }, [props.edit_mode]);

  return (
    <div className='mi-pa-6'>
        <Input ></Input>
    </div>
  );
};

export default TreeTaskEditorSettingsForm;
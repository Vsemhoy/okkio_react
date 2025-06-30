import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, LockTwoTone, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import './style/eventorflowdaycard.css';
const { Meta } = Card;

const EventorFlowDayCard = (props) => {

  return (
    <div className={'eventor-flow-daycard'}>
    <Card

      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREE0yciVk88jOW7mkQjULzH2jCE6Jkc_SpPoF-Oih4LL2YIB3mqSCZKpaksGGFJIMU5dg&usqp=CAU"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<LockTwoTone />}
        title="Where does it come from?"

      />
      <br/>
      <div>
        {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
      </div>
    </Card>
    </div>
  );
};

export default EventorFlowDayCard;
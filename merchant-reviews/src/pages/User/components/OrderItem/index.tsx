import React from 'react';
import './style.css';

interface OrderItemProps {
  data: {
    id: string;
    statusText: string;
    orderPicUrl: string;
    channel: string;
    title: string;
    text: string[];
    type: number;
  };
}

const index: React.FC<OrderItemProps> = ({ data }) => {
  const { title, statusText, orderPicUrl, channel, text, type } = data;
  return (
    <div className="orderItem">
      <div className="orderItem__title">
        <span>{title}</span>
      </div>
      <div className="orderItem__main">
        <div className="orderItem__imgWrapper">
          <div className="orderItem__tag">{statusText}</div>
          <img alt="" className="orderItem__img" src={orderPicUrl} />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__line">{text[0]}</div>
          <div className="orderItem__line">{text[1]}</div>
        </div>
      </div>
      <div className="orderItem__bottom">
        <div className="orderItem__type">{channel}</div>
        <div>
          {type === 1 ? <div className="orderItem__btn">评价</div> : null}
          <div className="orderItem__btn">删除</div>
        </div>
      </div>
    </div>
  );
};

export default index;

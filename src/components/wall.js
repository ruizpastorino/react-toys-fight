import React from 'react';
import wallUp from '../media/img/brick-up.jpg';
import wallDown from '../media/img/brick-down.jpg'

const Wall = (props) => {
  return (
    <div className="container-fluid">
      <img className={`w-100 wall-${props.status}1`}src={wallUp} alt=""/>
      <img className={`w-100 wall-${props.status}2`}src={wallDown} alt=""/>
    </div>
  );
};

export default Wall;
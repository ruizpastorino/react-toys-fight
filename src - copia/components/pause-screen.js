import React from 'react';
import {Link} from 'react-router-dom'

const PauseScreen = (props) => {
  return (
    <div className='container bg-pause p-4 rounded border border-light'>
      <h2 className="text-blink">PAUSE</h2>
      <h3 className="hand-pointer"onClick={props.resume}>resume</h3>
      <h3 className="hand-pointer"onClick={props.restart}>restart</h3>
      <Link to='/players'>
      <h3 className="hand-pointer">select players</h3>
      </Link>
      <Link to='settings'>
      <h3 className="hand-pointer">settings</h3>
      </Link>
      <Link to='/'><h3 className="hand-pointer">exit</h3></Link>
      
    </div>
  );
};

export default PauseScreen;
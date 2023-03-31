import React from 'react';
import { useHistory } from 'react-router-dom';

const ArrowButton = ({ destination }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(destination);
  };

  return (
    <div className="arrow-button" onClick={handleClick}>
      <i className="fa fa-arrow-right"></i>
    </div>
  );
};

export default ArrowButton;

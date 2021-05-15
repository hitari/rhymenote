import React, { useEffect, useState, useCallback } from 'react';
import './index.css';

interface Props {
  alphabet: Array<string | number>;
}

const AlphabetScroll = ({ alphabet }: Props) => {
  const onClickButton = () => {
    console.log('onClickButton');
  };

  return (
    <div id="index" className="alphabet_container">
      {alphabet.map((item) => (
        <div className="item" key={item} onClick={onClickButton}>
          <span className="span">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default AlphabetScroll;

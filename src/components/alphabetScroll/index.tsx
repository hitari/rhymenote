import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import './index.css';

interface Alphabet {
  count: number;
  id: string;
}

interface Props {
  alphabetList: Alphabet[];
  handleClickButton: (e: React.MouseEvent<HTMLElement>, id: string, count: number) => void;
}

const AlphabetScroll = ({ alphabetList, handleClickButton }: Props) => {
  useEffect(() => {
    console.log('');
  }, []);

  // (e, id, count) => {
  //   e.preventDefault();
  //   if (count === 0) return;

  //   let total = 0;
  //   for (let i = 0; i < alphabetList.length; i++) {
  //     if (alphabetList[i].id === id) break;
  //     total += alphabetList[i].count;
  //   }

  //   console.log('onClickButton', count, alphabetList);
  //   window.scrollTo(0, 0);
  //   dispatch(fetchSearchMore({ page: page + 1, searchWords })
  // }

  const onClickButton = useCallback(handleClickButton, []);

  const onMouseHover = (e: React.MouseEvent<HTMLElement>) => {
    // console.log('isHover', e.currentTarget);
  };

  return (
    <div id="index" className="alphabet_container">
      {alphabetList.map((item) => (
        <div
          className={classnames({ item: item.count > 0, noitem: item.count === 0 })}
          key={item.id}
          onMouseEnter={(e) => onMouseHover(e)}
          onMouseLeave={(e) => onMouseHover(e)}
          onClick={(e) => onClickButton(e, item.id, item.count)}
        >
          <span>{item.id}</span>
        </div>
      ))}
    </div>
  );
};

export default AlphabetScroll;

import React, { useState } from 'react';
import className from 'classnames';
import deepmerge from 'deepmerge';
import { wordconvert } from '@/utils/convertUtils';

interface Character {
  char?: string;
  selected: boolean;
}

interface Word {
  cho: Character;
  jung: Character;
  jong: Character;
}

interface Props {
  id: number;
  char: string;
  selectedWord: (id: number, charSelect: Word) => void;
}

const WordItem = ({ id, char, selectedWord }: Props) => {
  const [isChoSung, setIsChoSung] = useState(false);
  const [isJungSung, setIsJungSung] = useState(false);
  const [isJongSung, setIsJongSung] = useState(false);

  const [cho, jung, jong] = wordconvert(char);

  const changeWordStatus = (id: number, status: any) => {
    selectedWord(
      id,
      deepmerge(
        {
          cho: { selected: isChoSung },
          jung: { selected: isJungSung },
          jong: { selected: isJongSung },
        },
        status
      )
    );
  };

  // 클릭 처리
  const onClickButton = (id: number, type: string, isSelected: boolean, setSung: any) => {
    setSung(!isSelected);
    changeWordStatus(id, { [type]: { selected: !isSelected } });
  };

  // Class Name 합쳐서 만들어준다.
  const makeClassName = (name: any, isSelected: boolean) => className(name, { selected: isSelected });

  return (
    <div className="box_char">
      <div
        className={makeClassName('box_cho', isChoSung)}
        onClick={() => onClickButton(id, 'cho', isChoSung, setIsChoSung)}
      >
        {cho}
      </div>
      <div
        className={makeClassName('box_jung', isJungSung)}
        onClick={() => onClickButton(id, 'jung', isJungSung, setIsJungSung)}
      >
        {jung}
      </div>
      <div
        className={makeClassName('box_jong', isJongSung)}
        onClick={() => onClickButton(id, 'jong', isJongSung, setIsJongSung)}
      >
        {jong}
      </div>
      <div
        className={makeClassName('btn_cho', isChoSung)}
        onClick={() => onClickButton(id, 'cho', isChoSung, setIsChoSung)}
      >
        초성
      </div>
      <div
        className={makeClassName('btn_jung', isJungSung)}
        onClick={() => onClickButton(id, 'jung', isJungSung, setIsJungSung)}
      >
        중성
      </div>
      <div
        className={makeClassName('btn_jong', isJongSung)}
        onClick={() => onClickButton(id, 'jong', isJongSung, setIsJongSung)}
      >
        종성
      </div>
    </div>
  );
};

export default WordItem;

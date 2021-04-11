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

  // 상태 값 리스트
  const sungData = [
    { title: cho, name: 'cho', className: 'box_cho', isSung: isChoSung, setSung: setIsChoSung },
    { title: jung, name: 'jung', className: 'box_jung', isSung: isJungSung, setSung: setIsJungSung },
    { title: jong, name: 'jong', className: 'box_jong', isSung: isJongSung, setSung: setIsJongSung },
    { title: '초성', name: 'cho', className: 'btn_cho', isSung: isChoSung, setSung: setIsChoSung },
    { title: '중성', name: 'jung', className: 'btn_jung', isSung: isJungSung, setSung: setIsJungSung },
    { title: '종성', name: 'jong', className: 'btn_jong', isSung: isJongSung, setSung: setIsJongSung },
  ];

  return (
    <div className="box_char">
      {sungData.map(({ title, name, className, isSung, setSung }) => (
        <div
          key={className}
          className={makeClassName(className, isSung)}
          onClick={() => onClickButton(id, name, isSung, setSung)}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default WordItem;

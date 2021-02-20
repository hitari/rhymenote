import React, { useState } from 'react';
import className from 'classnames';
import deepmerge from 'deepmerge';
import { wordconvert } from '../../utils/convertUtils';

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

export function WordItem({ id, char, selectedWord }: Props) {
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

  const onChoSungClicked = () => {
    console.log('onChoSungClicked', id, cho);
    setIsChoSung(!isChoSung);
    changeWordStatus(id, { cho: { selected: !isChoSung } });
  };
  const onJungSungClicked = () => {
    console.log('onJungSungClicked');
    setIsJungSung(!isJungSung);
    changeWordStatus(id, { jung: { selected: !isJungSung } });
  };
  const onjongSungClicked = () => {
    console.log('onjongSungClicked');
    setIsJongSung(!isJongSung);
    changeWordStatus(id, { jong: { selected: !isJongSung } });
  };

  return (
    <div className="box_char">
      <div className={className('box_cho', { selected: isChoSung })} onClick={onChoSungClicked}>
        {cho}
      </div>
      <div className={className('box_jung', { selected: isJungSung })} onClick={onJungSungClicked}>
        {jung}
      </div>
      <div className={className('box_jong', { selected: isJongSung })} onClick={onjongSungClicked}>
        {jong}
      </div>
      <div className={className('btn_cho', { selected: isChoSung })} onClick={onChoSungClicked}>
        초성
      </div>
      <div className={className('btn_jung', { selected: isJungSung })} onClick={onJungSungClicked}>
        중성
      </div>
      <div className={className('btn_jong', { selected: isJongSung })} onClick={onjongSungClicked}>
        종성
      </div>
    </div>
  );
}

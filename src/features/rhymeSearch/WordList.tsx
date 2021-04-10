import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import WordItem from './WordItem';
import { StringToArray } from '@/utils/stringUtils';
import { setSearchChar, setSeletedValue } from './RhymeSearchSlice';

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
  word: string;
}

const WordList = ({ word }: Props) => {
  const dispatch = useDispatch();
  const { value, convertedValue, searchWords } = useSelector((state: RootState) => state.rhymeSearch);

  const letters = StringToArray(word);

  const selectedWord = (id: number, charSelect: Word) => {
    dispatch(setSearchChar({ id, charSelect }));
  };

  return (
    <div className="word_box">
      {letters.map((char, index) => (
        <WordItem key={index} id={index} char={char} selectedWord={selectedWord} />
      ))}
    </div>
  );
};

export default WordList;

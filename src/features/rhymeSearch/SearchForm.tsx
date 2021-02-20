import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { setSearchWords, setSearchValue } from './RhymeSearchSlice';
import { StringToArray } from '../../utils/stringUtils';
import { wordconvert } from '../../utils/convertUtils';

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

export function SearchForm() {
  const dispatch = useDispatch();
  const { searchWords, value, convertedValue } = useSelector((state: RootState) => state.rhymeSearch);
  const [searchInput, setSearchInput] = useState('');
  const [prevSearchWords, setPrevSearchWords] = useState<any[]>([]);

  // 검색 문자
  const characterDecomposition = (word: string) => {
    dispatch(setSearchValue(word));
  };

  // 글자 분해
  const convertValue = (word: string) => {
    const letters = StringToArray(word);

    const searchWords = letters.map((char, index) => {
      if (char === searchInput.charAt(index)) {
        // 이전 검색 문자가 같으면 이전 값을 유지
        return prevSearchWords[index];
      }

      // 새로운 결과값
      const [cho, jung, jong] = wordconvert(char);
      return {
        cho: {
          char: cho,
          selected: false,
        },
        jung: {
          char: jung,
          selected: false,
        },
        jong: {
          char: jong,
          selected: false,
        },
      };
    });

    setPrevSearchWords(searchWords);
    dispatch(setSearchWords({ searchWords }));
  };

  const onSearchInputChanged: ChangeHandler = (e: InputEvent) => {
    setSearchInput(e.target.value);
    characterDecomposition(e.target.value);
    convertValue(e.target.value);
  };

  const onClicked = () => {
    console.log('onClicked', value, convertedValue, searchWords);
  };

  return (
    <div className="box_search">
      <h2 className="screen_out">검색</h2>
      <form id="searchForm" name="searchForm" method="post" action="./list">
        <fieldset>
          <legend>검색어 입력 폼</legend>
          <input
            type="text"
            name="searchValue"
            className="tf_search"
            title="검색어 입력"
            onChange={onSearchInputChanged}
          />
          <div className="box_set">
            <button type="button" className="btn_moum">
              모음
            </button>
            <button type="button" className="btn_reset">
              리셋
            </button>
            <label className="lab_similar" htmlFor="inpSimilar">
              ㅐ/ㅔ 여부
            </label>
            <input type="checkbox" name="inpSimilar" className="inp_similar" title="ㅐ와ㅔ 함께 검색" />
          </div>
          <button type="button" className="btn_submit" onClick={onClicked}>
            검색
          </button>
        </fieldset>
      </form>
    </div>
  );
}

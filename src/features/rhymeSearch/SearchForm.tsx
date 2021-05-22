import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import { setSearchWords, setSearchValue, setMoumWords } from './RhymeSearchSlice';
import { fetchRhymeList } from '../rhymeList/RhymeListSlice';
import { StringToArray } from '@/utils/stringUtils';
import { wordConvert } from '@/utils/convertUtils';

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

const SearchForm = () => {
  const dispatch = useDispatch();
  const { searchWords, value } = useSelector((state: RootState) => state.rhymeSearch);
  const [searchInput, setSearchInput] = useState('');

  // 글자 분해
  const convertValue = (word: string) => {
    const letters = StringToArray(word);

    const SearchWords = letters.map((char, index) => {
      if (char === searchInput.charAt(index)) {
        // 이전 검색 문자가 같으면 이전 값을 유지
        return searchWords[index];
      }

      // 새로운 결과값
      const [cho, jung, jong] = wordConvert(char);

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

    dispatch(setSearchValue(word));
    dispatch(setSearchWords({ searchWords: SearchWords }));
  };

  // 검색창 검색어 입력 및 삭제시
  const onSearchInputChanged: ChangeHandler = (e: InputEvent) => {
    setSearchInput(e.target.value);
    convertValue(e.target.value);
  };

  // 모움 버튼 클릭(후순위 개발)
  const onMoumClicked = () => {
    dispatch(setMoumWords({ searchWords }));
  };

  // 라임 선택이 아무것도 되지 않았는지 체크
  const isNotAllSeleted = () => {
    return !searchWords.some((word) => {
      const { cho, jung, jong } = word;
      return cho.selected || jung.selected || jong.selected;
    });
  };

  // 검색 버튼 클릭
  const onSearchClicked = () => {
    if (!value) {
      alert('검색어를 입력해주세요.');
      return;
    }

    if (isNotAllSeleted()) {
      alert('초,중,종성 중 아무것도 선택 되지 않았습니다.\n최소 한개 이상 선택이 되어야합니다.');
      return;
    }

    dispatch(fetchRhymeList(searchWords));
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
            <button type="button" className="btn_moum" onClick={onMoumClicked}>
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
          <button type="button" className="btn_submit" onClick={onSearchClicked}>
            검색
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchForm;

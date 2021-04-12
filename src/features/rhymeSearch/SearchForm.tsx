import React, { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import { setSearchWords, setSearchValue, setMoumWords } from './RhymeSearchSlice';
import { fetchRhymeList } from '../rhymeList/RhymeListSlice';
import { StringToArray } from '@/utils/stringUtils';
import { wordconvert } from '@/utils/convertUtils';

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

const SearchForm = () => {
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

    const sw = letters.map((char, index) => {
      if (char === searchInput.charAt(index)) {
        // 이전 검색 문자가 같으면 이전 값을 유지
        return searchWords[index];
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

    setPrevSearchWords(sw);
    dispatch(setSearchWords({ searchWords: sw }));
  };

  const onSearchInputChanged: ChangeHandler = (e: InputEvent) => {
    setSearchInput(e.target.value);
    characterDecomposition(e.target.value);
    convertValue(e.target.value);
  };

  /** 
		단일 자음 - ㄱ,ㄴ,ㄷ,ㄹ... (ㄸ,ㅃ,ㅉ은 단일자음(초성)으로 쓰이지만 단일자음으론 안쓰임) 
		rt-I/sw-J/sg-K/fr-L/fa-M/fq-N/ft-S/fx-U/fv-V/fg-X/qt-Y
	*/
  const choSungEng = [
    'r',
    'R',
    'I',
    's',
    'J',
    'K',
    'e',
    'E',
    'f',
    'L',
    'M',
    'N',
    'S',
    'U',
    'V',
    'X',
    'a',
    'q',
    'Q',
    'Y',
    't',
    'T',
    'd',
    'w',
    'W',
    'c',
    'z',
    'x',
    'v',
    'g',
  ];

  const choSungKr = [
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  /** 
		중성 - 가(ㅏ), 야(ㅑ), 뺨(ㅑ)
		hk-A/ho-B/hl-C/nj-D/np-F/nl-G/ml-H
	*/
  const jungSungEng = [
    'k',
    'o',
    'i',
    'O',
    'j',
    'p',
    'u',
    'P',
    'h',
    'A',
    'B',
    'C',
    'y',
    'n',
    'D',
    'F',
    'G',
    'b',
    'm',
    'H',
    'l',
  ];

  const jungSungKr = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
  ];

  /** 
		종성 - 가(없음), 갈(ㄹ) 천(ㄴ) 
		rt-I/sw-J/sg-K/fr-L/fa-M/fq-N/ft-S/fx-U/fv-V/fg-X/qt-Y
	*/
  const jongSungEng = [
    'r',
    'R',
    'I',
    's',
    'J',
    'K',
    'e',
    'f',
    'L',
    'M',
    'N',
    'S',
    'U',
    'V',
    'X',
    'a',
    'q',
    'k',
    't',
    'T',
    'd',
    'w',
    'c',
    'z',
    'x',
    'v',
    'g',
  ];

  const jongSungKr = [
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  const koToEn = (word: any) => {
    const verificationData = [
      { name: 'cho', enCollection: choSungEng, krCollection: choSungKr },
      { name: 'jung', enCollection: jungSungEng, krCollection: jungSungKr },
      { name: 'jong', enCollection: jongSungEng, krCollection: jongSungKr },
    ];

    const changedWord = verificationData.map(
      (item: { name: string; enCollection: string[]; krCollection: string[] }) => {
        const syllable = word[item.name];
        // 선택이 안되거나 값이 없을경우 빈값 처리
        if (!syllable.selected || !syllable.char) return '\\w';
        // -1 일때 입력받은 char을 리턴 한다.
        const num = item.krCollection.indexOf(syllable.char);
        return item.enCollection[num] || syllable.char;
      }
    );

    return changedWord;
  };

  const syllableConversion = (searchWords: any) => {
    return searchWords.map((item: any, index: number) => {
      return koToEn(item).join('');
    });
  };

  const onMoumClicked = () => {
    dispatch(setMoumWords({ searchWords }));
  };

  const onSearchClicked = () => {
    if (!value) {
      alert('빈값은 조회가 되지 않습니다.');
      return;
    }

    dispatch(fetchRhymeList(syllableConversion(searchWords).join('/')));
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

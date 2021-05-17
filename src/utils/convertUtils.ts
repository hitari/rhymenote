/**
 ASCII CODE
 - 숫자 0~9 : 48~57
 - 영문 대문자  : 65~90
 - 영문 소문자  : 97~122
 - 한글 가~힣   : 45032~55203
 - 한글 자음 : 12593~12622
 - 한글 모음 : 12623~12643
 */
//한글 초성, 중성, 종성 변환 컨버터
export function wordconvert(str: string) {
  const cCho = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
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
  const cJung = [
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
  const cJong = [
    '',
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
  let cho;
  let jung;
  let jong;

  const cnt = str.length;
  const chars = new Array(3);
  let cCode;

  for (let i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);

    //32-스페이스바면 넘어간다.
    //if (cCode === 32) { continue; }

    // 한글이 완성형이 아닌 경우
    if (cCode >= 0xac00 && cCode <= 0xd7a3) {
      cCode = str.charCodeAt(i) - 0xac00;

      jong = cCode % 28; // 종성
      jung = ((cCode - jong) / 28) % 21; // 중성
      cho = ((cCode - jong) / 28 - jung) / 21; // 초성

      //cho = cCode / (21 * 28);
      //jung = cCode % (21 * 28) / 28;
      //jong = cCode % (21 * 28) % 28;

      chars[0] = cCho[cho];
      chars[1] = cJung[jung];
      if (cJong[jong] !== '') {
        chars[2] = cJong[jong];
      } else {
        chars[2] = '';
      }
    } else {
      //자음
      if (cCode >= 12593 && cCode <= 12622) {
        chars[0] = String.fromCharCode(cCode);
        chars[1] = '';
        chars[2] = '';
        //모음
      } else if (cCode >= 12623 && cCode <= 12643) {
        chars[0] = '';
        chars[1] = String.fromCharCode(cCode);
        chars[2] = '';
        //옛한글 및 알파벳 및 특수기호
      } else {
        chars[0] = String.fromCharCode(cCode);
        chars[1] = '';
        chars[2] = '';
      }
    }
  }

  return chars;
}

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
  'ㄷ', //e
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

export function koToEn(word: any) {
  const verificationData = [
    { name: 'cho', enCollection: choSungEng, krCollection: choSungKr },
    { name: 'jung', enCollection: jungSungEng, krCollection: jungSungKr },
    { name: 'jong', enCollection: jongSungEng, krCollection: jongSungKr },
  ];

  const changedWord = verificationData.map((item: { name: string; enCollection: string[]; krCollection: string[] }) => {
    const syllable = word[item.name];
    // 선택이 안되거나 값이 없을경우 빈값 처리
    if (!syllable.selected || !syllable.char) return '\\w';
    // -1 일때 입력받은 char을 리턴 한다.
    const num = item.krCollection.indexOf(syllable.char);
    return item.enCollection[num] || syllable.char;
  });

  return changedWord;
}

export function syllableConversion(searchWords: any) {
  return searchWords.map((item: any, index: number) => {
    return koToEn(item).join('');
  });
}

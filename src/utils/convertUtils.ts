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

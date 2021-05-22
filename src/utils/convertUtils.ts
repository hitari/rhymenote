import { KO_CHOSUNG_ALPHABET, KO_JUNGSUNG_ALPHABET, KO_JONGSUNG_ALPHABET } from '@/constants/CHARACTERS';

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
export const wordConvert = (str: string) => {
  const cnt = str.length;
  const chars = new Array(3);

  for (let i = 0; i < cnt; i++) {
    let charCode = str.charCodeAt(i);

    //32-스페이스바면 넘어간다.
    //if (cCode === 32) { continue; }

    // 한글이 완성형이 아닌 경우
    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      charCode = str.charCodeAt(i) - 0xac00;

      const jong = charCode % 28; // 종성
      const jung = ((charCode - jong) / 28) % 21; // 중성
      const cho = ((charCode - jong) / 28 - jung) / 21; // 초성

      chars[0] = KO_CHOSUNG_ALPHABET[cho];
      chars[1] = KO_JUNGSUNG_ALPHABET[jung];
      if (KO_JONGSUNG_ALPHABET[jong] !== '') {
        chars[2] = KO_JONGSUNG_ALPHABET[jong];
      } else {
        chars[2] = '';
      }
    } else {
      //자음
      if (charCode >= 12593 && charCode <= 12622) {
        chars[0] = String.fromCharCode(charCode);
        chars[1] = '';
        chars[2] = '';
        //모음
      } else if (charCode >= 12623 && charCode <= 12643) {
        chars[0] = '';
        chars[1] = String.fromCharCode(charCode);
        chars[2] = '';
        //옛한글 및 알파벳 및 특수기호
      } else {
        chars[0] = String.fromCharCode(charCode);
        chars[1] = '';
        chars[2] = '';
      }
    }
  }

  return chars;
};

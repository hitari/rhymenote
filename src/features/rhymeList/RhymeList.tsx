import React, { useCallback, useState, useEffect, ReactEventHandler, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import RhymeItem from './RhymeItem';
import AlphabetScroll from '@/components/alphabetScroll';
import { useInfinteScroll } from '@/hooks/useInfinteScroll';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface Props {
  list: List[];
  fetchSearch: any;
  fetchSearchMore: any;
  dictionary: any;
  // fetchSearchMore: AsyncThunk<
  //   any,
  //   {
  //     page: number;
  //     content: string;
  //   }
  // >;
  // useDictionarySelector: useDictionarySelector;
  isTab: boolean;
}

const RhymeList = ({ list, fetchSearch, fetchSearchMore, dictionary, isTab }: Props) => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  const { searchWords, value } = useSelector((state: RootState) => state.rhymeSearch);
  const { page, hasPrevPage, hasNextPage, loading, alphabetList } = dictionary;

  const koAlphabet = [
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
  const enAlphabet = Array(29)
    .fill('')
    .map((v, i) => String.fromCharCode(65 + i));
  12593;

  // useInfinteScroll({
  //   target,
  //   onIntersect: ([{ isIntersecting, target }], observer) => {
  //     if (isIntersecting && isTab) {
  //       if (!hasNextPage) return;
  //       // console.log('Last LI', page, searchWords);
  //       const content = syllableConversion(searchWords).join('/');
  //       dispatch(fetchKoSearchMore({ page: page + 1, content }));
  //     }
  //   },
  // });

  // infinity scroll
  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasNextPage) return;
        console.log('IntersectionObserverCallback', page + 1, searchWords);
        dispatch(fetchSearchMore({ page: page + 1, searchWords }));
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target, page, searchWords, list]);

  // sticky
  useEffect(() => {
    // state 와 dispatch 이용해서 컴포넌트로 구성 변경
    const $tab = document.querySelector('.tab_result_left') || document.createElement('div');
    const $wrapSearch = document.querySelector('#wrapSearch');
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!isTab) return;
          // 검색영역 스티키 상태 제어
          if (!entry.isIntersecting) {
            $wrapSearch?.classList.add('sticky');
            return;
          }

          $wrapSearch?.classList.remove('sticky');
        });
      },
      { threshold: 0 }
    );
    observer.observe($tab);

    return () => {
      observer && observer.disconnect();
    };
  }, []);

  // 알파벳 스크롤 클릭 이벤트
  const handleAlphabetScrollClickButton = (e: React.MouseEvent<HTMLElement>, id: string, count: number) => {
    e.preventDefault();
    if (count === 0) return;
    console.log('id count', id, count);

    /**
     * 만약, ㅂ을 클릭해서 해당 위치를 알고싶으면 DB에서 해당 하는 위치 부터 찾으려면 추가 적인 리소스가 들것이다.
     * 그래서 낸 아이디어가 알파벳은 고정된 순서를 지니고 있으니, ㅂ의 순서를 찾으려면 ㄱ~ㅁ의 총 개수를 더하면
     * 그 다은 위치는 ㅂ 이라는 것에서 착안해서 해당 시작 되는 위치를 찾기 위해서 앞에 count를 합하는 방식을 넣었다.
     * */
    let offset = 0;
    for (let i = 0; i < alphabetList.length; i++) {
      if (alphabetList[i].id === id) break;
      offset += alphabetList[i].count;
    }

    window.scrollTo(0, 0);
    dispatch(fetchSearch({ page: 1, searchWords, offset }));
  };

  // 결과가 없을경우
  if (list.length === 0) return <div style={{ textAlign: 'center' }}>결과 값이 존재 하지 않습니다.</div>;

  return (
    <>
      <AlphabetScroll alphabetList={alphabetList} handleClickButton={handleAlphabetScrollClickButton} />
      <ul>
        {list.map((item) => (
          <RhymeItem key={item.no} subject={item.subject} mean={item.mean} />
        ))}
        {!hasNextPage && <li style={{ textAlign: 'center', borderBottom: 0 }}>결과가 더 이상 존재 하지 않습니다.</li>}
      </ul>
      <div ref={setTarget} style={{ height: '10px' }}></div>
    </>
  );
};

export default RhymeList;

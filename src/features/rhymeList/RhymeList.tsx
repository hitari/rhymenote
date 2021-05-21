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
        // observer.unobserve(entry.target);
        // const content = syllableConversion(searchWords).join('/');
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
          if (isTab && !entry.isIntersecting) {
            // observer.unobserve(entry.target);
            console.log('벗어남');
            $wrapSearch?.classList.add('sticky');
            // observer.unobserve(entry.target);
            // observer.observe(el);
          } else if (isTab && entry.isIntersecting) {
            console.log('접근');
            $wrapSearch?.classList.remove('sticky');
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe($tab);
    return () => {
      observer && observer.disconnect();
    };
  }, []);

  const handleClickButton = (e: React.MouseEvent<HTMLElement>, id: string, count: number) => {
    e.preventDefault();
    if (count === 0) return;

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
      <AlphabetScroll alphabetList={alphabetList} handleClickButton={handleClickButton} />
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

//String.fromCharCode(65 + i)

export default RhymeList;
{
  /* <p className="box_paging">
<strong className="num_selected">1</strong>
<a className="num_paging" data-page-id="2">
  2
</a>
<a className="btn_next num_paging" data-page-id="6">
  다음<span className="txt_arrow">▶</span>
</a>
<span className="num_total" title="전체 페이지수">
  22
</span>
</p> */
}

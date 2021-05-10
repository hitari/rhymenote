import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import RhymeItem from './RhymeItem';
import { fetchKoSearch } from './RhymeListSlice';
import { syllableConversion } from '@/utils/convertUtils';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface Props {
  list: List[];
}

const RhymeList = ({ list }: Props) => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  const { searchWords, value } = useSelector((state: RootState) => state.rhymeSearch);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // observer.unobserve(entry.target);
        console.log('Last LI', searchWords);
        const content = syllableConversion(searchWords).join('/');
        dispatch(fetchKoSearch({ page: 2, content }));
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      console.log(target);
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target);
    }

    return () => {
      console.log('end');
      observer && observer.disconnect();
    };
  }, [target, searchWords]);

  return (
    <>
      <ul>
        {list.map((item) => (
          <RhymeItem key={item.no} subject={item.subject} mean={item.mean} />
        ))}
      </ul>
      <div ref={setTarget} style={{ height: '10px' }}></div>
    </>
  );
};

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

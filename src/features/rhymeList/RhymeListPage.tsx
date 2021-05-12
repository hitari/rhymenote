import React, { useEffect, useState, useCallback } from 'react';
import { RootState } from '@/app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { fetchRhymeList } from './RhymeListSlice';
import RhymeList from './RhymeList';

const RhymeListPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.rhymeList);
  const [tab, setTab] = useState('ko');
  const koCount = 0;
  const enCount = 0;

  const onclickTab = useCallback((e) => setTab(e.currentTarget.dataset.id), [tab]);
  console.log('-----------');
  useEffect(() => {
    dispatch(fetchRhymeList({}));
  }, []);

  return (
    <article id="content">
      <div className={classnames('tab_result_left', { selected: tab === 'ko' })}>
        <a href="#" className="tit_tab" data-id="ko" onClick={onclickTab}>
          한글
          <span className="num_result" title="전체단어수">
            ({koCount})
          </span>
        </a>
      </div>
      <div className={classnames('tab_result_right', { selected: tab === 'en' })}>
        <a href="#" className="tit_tab" data-id="en" onClick={onclickTab}>
          영어
          <span className="num_result" title="전체단어수">
            ({enCount})
          </span>
        </a>
      </div>
      <section className={classnames('box_result', { selected: tab === 'ko' })}>
        <RhymeList list={list} isTab={tab === 'ko'} />
      </section>
      {/* <section className={classnames('box_result', { selected: tab === 'en' })}>
        <RhymeList list={list} isTab={tab === 'en'} />
      </section> */}
    </article>
  );
};

export default RhymeListPage;

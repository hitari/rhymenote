import React, { useState, useCallback } from 'react';
import { RootState } from '@/app/rootReducer';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { fetchKoSearch, fetchKoSearchMore, fetchEnSearchMore } from './RhymeListSlice';
import RhymeList from './RhymeList';

const RhymeListPage = () => {
  const { koDictionary, enDictionary } = useSelector((state: RootState) => state.rhymeList);
  const [tab, setTab] = useState('ko');

  const onclickTab = useCallback(
    (e) => {
      e.preventDefault();
      setTab(e.currentTarget.dataset.id);
    },
    [tab]
  );
  const isTab = (status: string) => tab === status;

  return (
    <article id="content">
      <div className={classnames('tab_result_left', { selected: isTab('ko') })}>
        <a href="" className="tit_tab" data-id="ko" onClick={onclickTab}>
          한글
          <span className="num_result" title="전체단어수">
            ({koDictionary.totalDocs})
          </span>
        </a>
      </div>
      <div className={classnames('tab_result_right', { selected: isTab('en') })}>
        <a href="" className="tit_tab" data-id="en" onClick={onclickTab}>
          영어
          <span className="num_result" title="전체단어수">
            ({enDictionary.totalDocs})
          </span>
        </a>
      </div>
      <section className={classnames('box_result', { selected: isTab('ko') })}>
        <RhymeList
          list={koDictionary.docs}
          fetchSearch={fetchKoSearch}
          fetchSearchMore={fetchKoSearchMore}
          dictionary={koDictionary}
          isTab={isTab('ko')}
        />
      </section>
      <section className={classnames('box_result', { selected: isTab('en') })}>
        <RhymeList
          list={enDictionary.docs}
          fetchSearch={fetchKoSearch}
          fetchSearchMore={fetchEnSearchMore}
          dictionary={enDictionary}
          isTab={isTab('en')}
        />
      </section>
    </article>
  );
};

export default RhymeListPage;

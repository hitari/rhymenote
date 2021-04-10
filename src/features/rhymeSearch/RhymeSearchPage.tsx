import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/rootReducer';
import SearchForm from './SearchForm';
import WordList from './WordList';
import img from '@/images/tit_rhymenote.png';

const RhymeSearchPage = () => {
  const { value } = useSelector((state: RootState) => state.rhymeSearch);

  return (
    <Fragment>
      <main id="main">
        <div id="wrapSearch">
          <div className="box_head">
            <h1 id="titRhymenote" className="tit_rhymenote">
              <img src={img} width="500" height="122" alt="Rhymenote" />
            </h1>
            <WordList word={value} />
          </div>
          <SearchForm />
        </div>
      </main>
    </Fragment>
  );
};

export default RhymeSearchPage;

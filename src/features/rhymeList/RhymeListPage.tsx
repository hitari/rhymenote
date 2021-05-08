import React, { useEffect } from 'react';
import { RootState } from '@/app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRhymeList } from './RhymeListSlice';
import RhymeList from './RhymeList';

const RhymeListPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.rhymeList);

  useEffect(() => {
    dispatch(fetchRhymeList({}));
  }, []);

  return (
    <div>
      <RhymeList list={list} />
    </div>
  );
};

export default RhymeListPage;

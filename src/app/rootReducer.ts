import { combineReducers } from '@reduxjs/toolkit';
import rhymeSearchSlice from '../features/rhymeSearch/RhymeSearchSlice';
import rhymeListSlice from '../features/rhymeList/RhymeListSlice';

const rootReducer = combineReducers({
  rhymeSearch: rhymeSearchSlice,
  rhymeList: rhymeListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

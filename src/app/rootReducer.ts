import { combineReducers } from '@reduxjs/toolkit';
import rhymeSearchSlice from '../features/rhymeSearch/RhymeSearchSlice';

const rootReducer = combineReducers({ rhymeSearch: rhymeSearchSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

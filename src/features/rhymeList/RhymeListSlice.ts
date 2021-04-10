import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRhymeList } from '@/api/rhymeAPI';
import { AppThunk } from '@/app/store';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface RhymeList {
  list: List[];
  isLoading: boolean;
  error: string | null;
}

interface Character {
  char?: string;
  selected: boolean;
}

interface Word {
  cho: Character;
  jung: Character;
  jong: Character;
}

const initialState: RhymeList = {
  list: [],
  isLoading: false,
  error: null,
};

function startLoading(state: RhymeList) {
  state.isLoading = true;
}

function loadingFailed(state: RhymeList, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export const rhymeSearchSlice = createSlice({
  name: 'rhymeSearch',
  initialState,
  reducers: {
    getListStart: startLoading,
    getListFailure: loadingFailed,
    getRhymeListSuccess(state, { payload }: PayloadAction<{ list: any[] }>) {
      const { list } = payload;
      state.list = list;
    },
  },
});

export const { getListStart, getListFailure, getRhymeListSuccess } = rhymeSearchSlice.actions;

export default rhymeSearchSlice.reducer;

//export const fetchRhymeList = (searchWords?: Word[]): AppThunk => async (dispatch) => {
export const fetchRhymeList = (searchWords?: any): AppThunk => async (dispatch) => {
  try {
    dispatch(getListStart());
    const list = await getRhymeList(searchWords);
    dispatch(getRhymeListSuccess(list));
  } catch (err) {
    dispatch(getListFailure(err.toString()));
  }
};

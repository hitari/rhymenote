import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import deepmerge from 'deepmerge';

interface Character {
  char?: string;
  selected: boolean;
}

interface Word {
  cho: Character;
  jung: Character;
  jong: Character;
}

interface RhymeSearchState {
  value: string;
  searchWords: Word[];
  convertedValue: any[];
  selectedValue: any[];
}

// {
//   cho: { char: '', selected: false },
//   jung: { char: '', selected: false },
//   jong: { char: '', selected: false },
// },

const initialState: RhymeSearchState = {
  value: '',
  searchWords: [],
  convertedValue: [],
  selectedValue: [],
};

export const rhymeSearchSlice = createSlice({
  name: 'rhymeSearch',
  initialState,
  reducers: {
    setSearchWords(state, { payload }: PayloadAction<{ searchWords: Word[] }>) {
      const { searchWords } = payload;
      state.searchWords = searchWords;
    },
    setSearchChar(state, { payload }: PayloadAction<{ id: number; charSelect: Word }>) {
      const { id, charSelect } = payload;
      state.searchWords[id] = deepmerge(state.searchWords[id], charSelect);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSeletedValue(state, { payload }: PayloadAction<{ id: number; arr: any[] }>) {
      const { id, arr } = payload;

      state.selectedValue = state.selectedValue[id];
    },
  },
});

export const { setSearchWords, setSearchChar, setSearchValue, setSeletedValue } = rhymeSearchSlice.actions;

export default rhymeSearchSlice.reducer;

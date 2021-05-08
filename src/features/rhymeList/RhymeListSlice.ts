import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getRhymeList } from '@/api/rhymeAPI';
import { AppThunk } from '@/app/store';
import { AxiosError } from 'axios';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface RhymeList {
  list: List[];
  loading: string;
  error: string | null | undefined;
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

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

const initialState: RhymeList = {
  list: [],
  loading: 'idle',
  error: null,
};

export const fetchRhymeList = createAsyncThunk(
  'rhymeSearch/fetchRhymeList',
  async (searchWords: { searchWords?: Word[] }, thunkAPI) => {
    try {
      console.log(searchWords);
      const response = await getRhymeList(searchWords);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const rhymeSearchSlice = createSlice({
  name: 'rhymeSearch',
  initialState,
  reducers: {
    getRhymeListSuccess(state, { payload }: PayloadAction<{ list: any[] }>) {
      const { list } = payload;
      state.list = list;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRhymeList.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });

    builder.addCase(fetchRhymeList.fulfilled, (state, { payload }: PayloadAction<{ list: any[] }>) => {
      const { list } = payload;
      state.loading = 'idle';
      state.list = list;
    });

    builder.addCase(fetchRhymeList.rejected, (state, action: any) => {
      state.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { getRhymeListSuccess } = rhymeSearchSlice.actions;

export default rhymeSearchSlice.reducer;

// export const fetchRhymeList = (searchWords?: any): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getListStart());
//     const list = await getRhymeList(searchWords);
//     dispatch(getRhymeListSuccess(list));
//   } catch (err) {
//     dispatch(getListFailure(err.toString()));
//   }
// };

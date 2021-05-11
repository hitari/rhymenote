import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '@/app/store';
import { AxiosError } from 'axios';
import { getRhymeList, getKoSearch } from '@/api/rhymeAPI';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface RhymeList {
  list: List[];
  docs: List[];
  totalDocs: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
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
  docs: [],
  totalDocs: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  loading: 'idle',
  error: null,
};

// 전체 검색
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

// 한글 사전 검색
export const fetchKoSearch = createAsyncThunk(
  'rhymeSearch/fetchKoSearch',
  async (payload: { page: number; content: string }, thunkAPI) => {
    try {
      const { page, content } = payload;
      console.log('rhymeSearch/fetchKoSearch', payload);
      const response = await getKoSearch(content, page);
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

// 한글 사전 검색
export const fetchKoSearchMore = createAsyncThunk(
  'rhymeSearch/fetchKoSearchMore',
  async (payload: { page: number; content: string }, thunkAPI) => {
    try {
      const { page, content } = payload;
      console.log('rhymeSearch/fetchKoSearchMore', payload);
      const response = await getKoSearch(content, page);
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
    // fetchKoSearch
    builder.addCase(fetchKoSearch.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });

    builder.addCase(fetchKoSearch.fulfilled, (state, { payload }: PayloadAction<RhymeList>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.loading = 'idle';
      state.list = list;
      state.docs = docs;
      state.totalDocs = totalDocs;
      state.page = page;
      state.totalPages = totalPages;
      state.pagingCounter = pagingCounter;
      state.hasPrevPage = hasPrevPage;
      state.hasNextPage = hasNextPage;
    });

    // fetchKoSearch
    builder.addCase(fetchKoSearchMore.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });

    builder.addCase(fetchKoSearchMore.fulfilled, (state, { payload }: PayloadAction<RhymeList>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.loading = 'idle';
      state.list = [...state.list, ...list];
      state.docs = [...state.docs, ...docs];
      state.totalDocs = totalDocs;
      state.page = page;
      state.totalPages = totalPages;
      state.pagingCounter = pagingCounter;
      state.hasPrevPage = hasPrevPage;
      state.hasNextPage = hasNextPage;
    });

    builder.addCase(fetchKoSearchMore.rejected, (state, action: any) => {
      state.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(fetchKoSearch.rejected, (state, action: any) => {
      state.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });

    // fetchRhymeList
    builder.addCase(fetchRhymeList.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });

    builder.addCase(fetchRhymeList.fulfilled, (state, { payload }: PayloadAction<RhymeList>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.loading = 'idle';
      state.list = list;
      state.docs = docs;
      state.totalDocs = totalDocs;
      state.page = page;
      state.totalPages = totalPages;
      state.pagingCounter = pagingCounter;
      state.hasPrevPage = hasPrevPage;
      state.hasNextPage = hasNextPage;
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

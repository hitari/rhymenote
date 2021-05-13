import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '@/app/store';
import { AxiosError } from 'axios';
import { getRhymeList, getKoSearch, getEnSearch } from '@/api/rhymeAPI';

interface RhymeList {
  koDictionary: Dictionary;
  enDictionary: Dictionary;
}

interface Dictionary {
  list: List[];
  docs: List[];
  totalDocs: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  loading: string;
  currentRequestId: any;
  error: string | null | undefined;
}

interface List {
  no: number;
  subject: string;
  mean: string;
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

const initialDictionary = {
  list: [],
  docs: [],
  totalDocs: 0,
  page: 0,
  totalPages: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

const initialState: RhymeList = {
  koDictionary: { ...initialDictionary },
  enDictionary: { ...initialDictionary },
};

// 전체 검색
export const fetchRhymeList = createAsyncThunk(
  'rhymeList/fetchRhymeList',
  async (searchWords: { searchWords?: Word[] }, thunkAPI: any) => {
    try {
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

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
  'rhymeList/fetchKoSearch',
  async (payload: { page: number; content: string }, thunkAPI: any) => {
    try {
      const { page, content } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      console.log('rhymeList/fetchKoSearch', payload);
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
  'rhymeList/fetchKoSearchMore',
  async (payload: { page: number; content: string }, thunkAPI: any) => {
    try {
      const { page, content } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

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

// 영어 사전 검색
export const fetchEnSearch = createAsyncThunk(
  'rhymeList/fetchEnSearch',
  async (payload: { page: number; content: string }, thunkAPI: any) => {
    try {
      const { page, content } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      console.log('rhymeList/fetchEnSearch', payload);
      const response = await getEnSearch(content, page);
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

export const fetchEnSearchMore = createAsyncThunk(
  'rhymeList/fetchEnSearchMore',
  async (payload: { page: number; content: string }, thunkAPI: any) => {
    try {
      const { page, content } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      const response = await getEnSearch(content, page);
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

export const rhymeListSlice = createSlice({
  name: 'rhymeList',
  initialState,
  reducers: {
    getRhymeListSuccess(state, { payload }: PayloadAction<{ list: any[] }>) {
      const { list } = payload;
      state.koDictionary.list = list;
    },
  },
  extraReducers: (builder) => {
    // fetchKoSearchMore
    builder.addCase(fetchKoSearch.pending, (state, action) => {
      if (state.koDictionary.loading === 'idle') {
        state.koDictionary.loading = 'pending';
        state.koDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchKoSearch.fulfilled, (state, { payload }: PayloadAction<Dictionary>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.koDictionary.loading = 'idle';
      state.koDictionary.list = list;
      state.koDictionary.docs = docs;
      state.koDictionary.totalDocs = totalDocs;
      state.koDictionary.page = page;
      state.koDictionary.totalPages = totalPages;
      state.koDictionary.pagingCounter = pagingCounter;
      state.koDictionary.hasPrevPage = hasPrevPage;
      state.koDictionary.hasNextPage = hasNextPage;
    });

    // fetchKoSearch
    builder.addCase(fetchKoSearchMore.pending, (state, action) => {
      if (state.koDictionary.loading === 'idle') {
        state.koDictionary.loading = 'pending';
        state.koDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchKoSearchMore.fulfilled, (state, { payload }: PayloadAction<Dictionary>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.koDictionary.loading = 'idle';
      state.koDictionary.list = [...state.koDictionary.list, ...list];
      state.koDictionary.docs = [...state.koDictionary.docs, ...docs];
      state.koDictionary.totalDocs = totalDocs;
      state.koDictionary.page = page;
      state.koDictionary.totalPages = totalPages;
      state.koDictionary.pagingCounter = pagingCounter;
      state.koDictionary.hasPrevPage = hasPrevPage;
      state.koDictionary.hasNextPage = hasNextPage;
    });

    builder.addCase(fetchKoSearchMore.rejected, (state, action: any) => {
      state.koDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.koDictionary.error = action.payload.errorMessage;
      } else {
        state.koDictionary.error = action.error.message;
      }
    });

    builder.addCase(fetchKoSearch.rejected, (state, action: any) => {
      state.koDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.koDictionary.error = action.payload.errorMessage;
      } else {
        state.koDictionary.error = action.error.message;
      }
    });

    // fetchRhymeList
    builder.addCase(fetchRhymeList.pending, (state, action) => {
      if (state.koDictionary.loading === 'idle') {
        state.koDictionary.loading = 'pending';
        state.koDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchRhymeList.fulfilled, (state, { payload }: PayloadAction<Dictionary>) => {
      const { list, docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.koDictionary.loading = 'idle';
      state.koDictionary.list = list;
      state.koDictionary.docs = docs;
      state.koDictionary.totalDocs = totalDocs;
      state.koDictionary.page = page;
      state.koDictionary.totalPages = totalPages;
      state.koDictionary.pagingCounter = pagingCounter;
      state.koDictionary.hasPrevPage = hasPrevPage;
      state.koDictionary.hasNextPage = hasNextPage;
    });

    builder.addCase(fetchRhymeList.rejected, (state, action: any) => {
      state.koDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.koDictionary.error = action.payload.errorMessage;
      } else {
        state.koDictionary.error = action.error.message;
      }
    });
  },
});

export const { getRhymeListSuccess } = rhymeListSlice.actions;

export default rhymeListSlice.reducer;

// export const fetchRhymeList = (searchWords?: any): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getListStart());
//     const list = await getRhymeList(searchWords);
//     dispatch(getRhymeListSuccess(list));
//   } catch (err) {
//     dispatch(getListFailure(err.toString()));
//   }
// };

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '@/app/store';
import { AxiosError } from 'axios';
import { KO_CHOSUNG_ALPHABET } from '@/constants/CHARACTERS';
import { getRhymeList, getKoSearch, getEnSearch, getKoAlphabet } from '@/api/rhymeAPI';

interface RhymeList {
  koDictionary: Dictionary;
  enDictionary: Dictionary;
}

interface Dictionary {
  docs: List[];
  totalDocs: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  loading: string;
  currentRequestId: any;
  alphabetList?: any;
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

interface Alphabet {
  count: number;
  id: string;
}

const initialKoAlphabet = [
  { count: 0, id: 'ㄱ' },
  { count: 0, id: 'ㄲ' },
  { count: 0, id: 'ㄴ' },
  { count: 0, id: 'ㄷ' },
  { count: 0, id: 'ㄸ' },
  { count: 0, id: 'ㄹ' },
  { count: 0, id: 'ㅁ' },
  { count: 0, id: 'ㅂ' },
  { count: 0, id: 'ㅃ' },
  { count: 0, id: 'ㅅ' },
  { count: 0, id: 'ㅆ' },
  { count: 0, id: 'ㅇ' },
  { count: 0, id: 'ㅈ' },
  { count: 0, id: 'ㅉ' },
  { count: 0, id: 'ㅊ' },
  { count: 0, id: 'ㅋ' },
  { count: 0, id: 'ㅌ' },
  { count: 0, id: 'ㅍ' },
  { count: 0, id: 'ㅎ' },
];

const initialDictionary = {
  docs: [],
  alphabetList: [...initialKoAlphabet],
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
  async (searchWords: Word[], thunkAPI: any) => {
    try {
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }
      console.log('rhymeList/fetchRhymeList', searchWords);
      const alphabetResponse = await getKoAlphabet(searchWords);
      const response = await getRhymeList(searchWords);
      // const alphabet = JSON.parse(JSON.stringify(initialKoAlphabet));
      const alphabet = JSON.parse(JSON.stringify(initialKoAlphabet));
      alphabetResponse.forEach((item: Alphabet) => {
        const index = KO_CHOSUNG_ALPHABET.indexOf(item.id);
        if (index === -1) return;
        alphabet[index].count = item.count;
      });
      response.alphabetList = alphabet;
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 한글 사전 검색
export const fetchKoSearch = createAsyncThunk(
  'rhymeList/fetchKoSearch',
  async (payload: { searchWords: Word[]; page: number; offset: number }, thunkAPI: any) => {
    try {
      const { searchWords, page, offset } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      console.log('rhymeList/fetchKoSearch', payload);
      const response = await getKoSearch(searchWords, page, offset);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchKoSearchMore = createAsyncThunk(
  'rhymeList/fetchKoSearchMore',
  async (payload: { searchWords: Word[]; page: number }, thunkAPI: any) => {
    try {
      const { page, searchWords } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      const response = await getKoSearch(searchWords, page);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 영어 사전 검색
export const fetchEnSearch = createAsyncThunk(
  'rhymeList/fetchEnSearch',
  async (payload: { searchWords: Word[]; page: number }, thunkAPI: any) => {
    try {
      const { page, searchWords } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      console.log('rhymeList/fetchEnSearch', payload);
      const response = await getEnSearch(searchWords, page);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEnSearchMore = createAsyncThunk(
  'rhymeList/fetchEnSearchMore',
  async (payload: { searchWords: Word[]; page: number }, thunkAPI: any) => {
    try {
      const { page, searchWords } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.koDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      const response = await getEnSearch(searchWords, page);
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
    getRhymeListSuccess(state, { payload }: PayloadAction<{ docs: any[] }>) {
      const { docs } = payload;
      state.koDictionary.docs = docs;
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
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.koDictionary.loading = 'idle';
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
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.koDictionary.loading = 'idle';
      // state.koDictionary.docs = [...state.koDictionary.docs, ...docs];
      // 페이징시 중복된 값이 넘어오는 경우가 있어서 조치(DB쪽 페이징 쪽 조치필요)
      state.koDictionary.docs = [
        ...new Set([...state.koDictionary.docs, ...docs].map((v) => JSON.stringify(v))),
      ].map((v) => JSON.parse(v));
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
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage, alphabetList } = payload;

      state.koDictionary.loading = 'idle';
      state.koDictionary.docs = docs;
      state.koDictionary.totalDocs = totalDocs;
      state.koDictionary.page = page;
      state.koDictionary.totalPages = totalPages;
      state.koDictionary.pagingCounter = pagingCounter;
      state.koDictionary.hasPrevPage = hasPrevPage;
      state.koDictionary.hasNextPage = hasNextPage;
      state.koDictionary.alphabetList = alphabetList;
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

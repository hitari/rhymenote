import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '@/app/store';
import { AxiosError } from 'axios';
import { KO_CHOSUNG_ALPHABET, EN_CAPITAL_ALPHABET } from '@/constants/CHARACTERS';
import { getRhymeList, getKoSearch, getEnSearch, getKoAlphabet, getEnAlphabet } from '@/api/rhymeAPI';

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

const makeinitialAlphabet = (alphabet: string[]) => {
  return alphabet.map((char: string) => {
    return { count: 0, id: char };
  });
};

const initialKoAlphabet = makeinitialAlphabet(KO_CHOSUNG_ALPHABET);
const initialEnAlphabet = makeinitialAlphabet(EN_CAPITAL_ALPHABET);

const initialDictionary = {
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
  koDictionary: { ...initialDictionary, alphabetList: [...initialKoAlphabet] },
  enDictionary: { ...initialDictionary, alphabetList: [...initialEnAlphabet] },
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
      const response = { koDictionary: {}, enDictionary: {} };
      console.log('rhymeList/fetchRhymeList', searchWords);
      const koAlphabetResponse = await getKoAlphabet(searchWords);
      const enAlphabetResponse = await getEnAlphabet(searchWords);
      const koDic = await getKoSearch(searchWords);
      const enDic = await getEnSearch(searchWords);
      // const alphabet = JSON.parse(JSON.stringify(initialKoAlphabet));
      let alphabet = JSON.parse(JSON.stringify(initialKoAlphabet));
      koAlphabetResponse.forEach((item: Alphabet) => {
        const index = KO_CHOSUNG_ALPHABET.indexOf(item.id);
        if (index === -1) return;
        alphabet[index].count = item.count;
      });
      koDic.alphabetList = [...alphabet];

      alphabet = JSON.parse(JSON.stringify(initialEnAlphabet));
      enAlphabetResponse.forEach((item: Alphabet) => {
        const index = EN_CAPITAL_ALPHABET.indexOf(item.id);
        if (index === -1) return;
        alphabet[index].count = item.count;
      });
      enDic.alphabetList = [...alphabet];

      response.koDictionary = koDic;
      response.enDictionary = enDic;

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
      const { searchWords, page } = payload;
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
  async (payload: { searchWords: Word[]; page: number; offset: number }, thunkAPI: any) => {
    try {
      const { searchWords, page, offset } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.enDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }

      console.log('rhymeList/fetchEnSearch', payload);
      const response = await getEnSearch(searchWords, page, offset);
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
    console.log('rhymeList/fetchEnSearchMore');
    try {
      const { page, searchWords } = payload;
      const { currentRequestId, loading } = thunkAPI.getState().rhymeList.enDictionary;
      if (loading !== 'pending' || thunkAPI.requestId !== currentRequestId) {
        return;
      }
      console.log('rhymeList/fetchEnSearchMore111111');

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
    // fetchKoSearch
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

    builder.addCase(fetchKoSearch.rejected, (state, action: any) => {
      state.koDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.koDictionary.error = action.payload.errorMessage;
      } else {
        state.koDictionary.error = action.error.message;
      }
    });

    // fetchKoSearchMore
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

    // fetchEnSearch
    builder.addCase(fetchEnSearch.pending, (state, action) => {
      if (state.enDictionary.loading === 'idle') {
        state.enDictionary.loading = 'pending';
        state.enDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchEnSearch.fulfilled, (state, { payload }: PayloadAction<Dictionary>) => {
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.enDictionary.loading = 'idle';
      state.enDictionary.docs = docs;
      state.enDictionary.totalDocs = totalDocs;
      state.enDictionary.page = page;
      state.enDictionary.totalPages = totalPages;
      state.enDictionary.pagingCounter = pagingCounter;
      state.enDictionary.hasPrevPage = hasPrevPage;
      state.enDictionary.hasNextPage = hasNextPage;
    });

    builder.addCase(fetchEnSearch.rejected, (state, action: any) => {
      state.enDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.enDictionary.error = action.payload.errorMessage;
      } else {
        state.enDictionary.error = action.error.message;
      }
    });

    // fetchEnSearchMore
    builder.addCase(fetchEnSearchMore.pending, (state, action) => {
      if (state.enDictionary.loading === 'idle') {
        state.enDictionary.loading = 'pending';
        state.enDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchEnSearchMore.fulfilled, (state, { payload }: PayloadAction<Dictionary>) => {
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = payload;
      state.enDictionary.loading = 'idle';
      // state.koDictionary.docs = [...state.koDictionary.docs, ...docs];
      // 페이징시 중복된 값이 넘어오는 경우가 있어서 조치(DB쪽 페이징 쪽 조치필요)
      state.enDictionary.docs = [
        ...new Set([...state.enDictionary.docs, ...docs].map((v) => JSON.stringify(v))),
      ].map((v) => JSON.parse(v));
      state.enDictionary.totalDocs = totalDocs;
      state.enDictionary.page = page;
      state.enDictionary.totalPages = totalPages;
      state.enDictionary.pagingCounter = pagingCounter;
      state.enDictionary.hasPrevPage = hasPrevPage;
      state.enDictionary.hasNextPage = hasNextPage;
    });

    builder.addCase(fetchEnSearchMore.rejected, (state, action: any) => {
      state.enDictionary.loading = 'idle';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.enDictionary.error = action.payload.errorMessage;
      } else {
        state.enDictionary.error = action.error.message;
      }
    });

    // fetchRhymeList
    builder.addCase(fetchRhymeList.pending, (state, action) => {
      if (state.koDictionary.loading === 'idle') {
        state.koDictionary.loading = 'pending';
        state.koDictionary.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchRhymeList.fulfilled, (state, { payload }: PayloadAction<RhymeList>) => {
      const { koDictionary, enDictionary } = payload;
      const { docs, totalDocs, page, totalPages, pagingCounter, hasPrevPage, hasNextPage } = koDictionary;

      state.koDictionary = koDictionary;
      state.koDictionary.loading = 'idle';
      state.enDictionary = enDictionary;
      state.enDictionary.loading = 'idle';
      // state.koDictionary.docs = docs;
      // state.koDictionary.totalDocs = totalDocs;
      // state.koDictionary.page = page;
      // state.koDictionary.totalPages = totalPages;
      // state.koDictionary.pagingCounter = pagingCounter;
      // state.koDictionary.hasPrevPage = hasPrevPage;
      // state.koDictionary.hasNextPage = hasNextPage;
      // state.koDictionary.alphabetList = koDictionary.alphabetList;
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

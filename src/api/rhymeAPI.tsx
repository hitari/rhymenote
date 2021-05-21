import axios from 'axios';
import api from '@/utils/urlHelper';

interface Character {
  char?: string;
  selected: boolean;
}

interface Word {
  cho: Character;
  jung: Character;
  jong: Character;
}

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface RhymeList {
  list: List[];
}

const NUM = 0;

// export async function getRhymeList(searchWords?: Word[]) {
export async function getRhymeList(searchWords: Word[], page = 1) {
  const config = {
    data: {
      offset: NUM,
      page,
      content: JSON.stringify(searchWords),
    },
  };

  const { data } = await axios.post(`${api.apiUrl}/search/`, config);
  return data;
}

export async function getRhymeSearch() {
  const url = `${api.apiUrl}/search/`;

  const { data } = await axios.get<RhymeList>(url);
  return data;
}

export async function getKoSearch(searchWords: Word[], page: number, offset = 0) {
  const config = {
    params: {
      offset,
      page,
      content: JSON.stringify(searchWords),
    },
  };

  const { data } = await axios.get(`${api.apiUrl}/search/ko/`, config);
  return data;
}

export async function getEnSearch(searchWords: Word[], page: number) {
  const config = {
    params: {
      page,
      content: JSON.stringify(searchWords),
    },
  };

  const { data } = await axios.get(`${api.apiUrl}/search/en/`, config);
  return data;
}

export async function getKoAlphabet(content: Word[]) {
  const config = {
    params: {
      content: JSON.stringify(content),
    },
  };

  const { data } = await axios.get(`${api.apiUrl}/search/ko/alphabet`, config);
  return data;
}

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

// export async function getRhymeList(searchWords?: Word[]) {
export async function getRhymeList(searchWords?: any, page = 1) {
  const config = {
    data: {
      page,
      content: searchWords,
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

export async function getKoSearch(content: string, page: number) {
  const config = {
    params: {
      page,
      content,
    },
  };

  const { data } = await axios.get(`${api.apiUrl}/search/ko/`, config);
  return data;
}

export async function getEnSearch(content: string, page: number) {
  const config = {
    params: {
      page,
      content,
    },
  };

  const { data } = await axios.get(`${api.apiUrl}/search/en/`, config);
  return data;
}

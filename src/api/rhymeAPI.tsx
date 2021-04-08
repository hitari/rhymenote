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
export async function getRhymeList(searchWords?: any) {
  const url = `${api.apiUrl}/search/`;

  const { data } = await axios.post<RhymeList>(url, {
    searchWords: searchWords,
  });

  return data;
}

export async function getRhymeSearch() {
  const url = `${api.apiUrl}/search/`;

  const { data } = await axios.get<RhymeList>(url);
  return data;
}

import axios from 'axios';
import { setSearchWords } from '@/features/rhymeSearch/RhymeSearchSlice';

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

const URL = `http://172.19.63.231:4500`;

// export async function getRhymeList(searchWords?: Word[]) {
export async function getRhymeList(searchWords?: any) {
  console.log('getRhymeList', searchWords);
  const url = `${URL}/search/`;

  // const { data } = await axios.get<RhymeList>(url);
  const { data } = await axios.post<RhymeList>(url, {
    a: 'aaaa',
    searchWords: searchWords,
  });

  return data;
}

export async function getRhymeSearch() {
  const url = `${URL}/search/`;

  const { data } = await axios.get<RhymeList>(url);
  return data;
}

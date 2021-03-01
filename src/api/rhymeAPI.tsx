import axios from 'axios';

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

export async function getRhymeList(searchWords?: Word[]) {
  const url = `http://172.26.14.196:4500/search`;

  // const { data } = await axios.get<RhymeList>(url);
  const { data } = await axios.post<RhymeList>(url, {
    a: 'dsadsadsa',
  });
  console.log('data', data);
  return data;
}

export async function getRhymeSearch() {
  const url = `http://172.26.14.196:4500/search`;

  const { data } = await axios.get<RhymeList>(url);
  console.log('data', data);
  return data;
}

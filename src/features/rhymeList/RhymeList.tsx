import React, { useCallback, useState } from 'react';
import RhymeItem from './RhymeItem';

interface List {
  no: number;
  subject: string;
  mean: string;
}

interface Props {
  list: List[];
}

const RhymeList = ({ list }: Props) => {
  return (
    <ul>
      {list.map((item) => (
        <RhymeItem key={item.no} subject={item.subject} mean={item.mean} />
      ))}
    </ul>
  );
};

export default RhymeList;

{
  /* <p className="box_paging">
<strong className="num_selected">1</strong>
<a className="num_paging" data-page-id="2">
  2
</a>
<a className="btn_next num_paging" data-page-id="6">
  다음<span className="txt_arrow">▶</span>
</a>
<span className="num_total" title="전체 페이지수">
  22
</span>
</p> */
}

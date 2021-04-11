import React from 'react';
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
  const koCount = 0;
  const enCount = 0;

  return (
    <article id="content">
      <h3 className="tab_result_left selected">
        <a href="#content" className="tit_tab">
          한글
          <span className="num_result" title="전체단어수">
            ({koCount})
          </span>
        </a>
      </h3>
      <h3 className="tab_result_right">
        <a href="#content" className="tit_tab">
          영어
          <span className="num_result" title="전체단어수">
            ({enCount})
          </span>
        </a>
      </h3>
      <section className="box_result selected">
        <ul>
          {list.map((item) => (
            <RhymeItem key={item.no} subject={item.subject} mean={item.mean} />
          ))}
        </ul>
      </section>
    </article>
  );
};

export default RhymeList;

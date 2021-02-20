import React from 'react';
import { RhymeItem } from './RhymeItem';

export function RhymeList() {
  return (
    <article id="content">
      <h3 id="tabKo" className="tab_result_left selected">
        <a href="#tabKo" className="tit_tab">
          한글
          <span className="num_result" title="전체단어수">
            (115)
          </span>
        </a>
      </h3>
      <section id="resultKo" className="box_result selected">
        <ul>
          <RhymeItem />
        </ul>
      </section>
      <h3 id="tabEng" className="tab_result_right">
        <a href="#tabEng" className="tit_tab">
          영어
          <span className="num_result" title="전체단어수">
            (20)
          </span>
        </a>
      </h3>
    </article>
  );
}

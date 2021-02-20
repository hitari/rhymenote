import React from 'react';

export function RhymeItem() {
  return (
    <li>
      <p className="txt_title">
        <strong>도범</strong>
      </p>
      <div className="txt_mean">
        <div className="mean-title">도범(盜犯)</div>
        <span className="mean-sa">「명사」</span>『법률』
        <br />
        <br />
        <span>
          <span className="mean-ex"> </span>도둑질을 함으로써 성립하는 범죄. 또는 그 범인.
          <br />
          <span className="mean-giho1">¶</span>{' '}
          <span className="mean-use">
            역시 도범 단속 기간 중인데 형사가 오토바이 한 대를 끌고 와서….≪황석영, 어둠의 자식들≫
          </span>
        </span>
      </div>
    </li>
  );
}

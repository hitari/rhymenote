import React from 'react';

interface Props {
  subject: string;
  mean: string;
}

function createMarkup(mean: string) {
  return { __html: mean };
}

const RhymeItem = ({ subject, mean }: Props) => {
  return (
    <li>
      <p className="txt_title">
        <strong>{subject}</strong>
      </p>
      <div className="txt_mean">
        <div dangerouslySetInnerHTML={createMarkup(mean)} />
      </div>
    </li>
  );
};

export default RhymeItem;

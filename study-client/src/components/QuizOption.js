import React from 'react';

import './QuizOption.scss';

export default function QuizOption({data, selected, setSelection, id}) {

  return (

    <div className={selected ? 'quiz-option quiz-option-selected' : 'quiz-option'} onClick={() => setSelection(id)}>

      <p>{data}</p>

    </div>

  );

}

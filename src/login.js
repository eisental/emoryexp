import React from 'react';
import { text_english } from './text.js';
import { ContinueButton } from './ui.js';

const texts = text_english;

export const LoginScreen = ({next, data}) => {
  const handleContinue = () => {
    data.id = document.getElementById('id_input').value;
    next();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 offset-2 breathing-top text-center">
          {text_english.login}
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <br/>
          <label>{text_english.subject_id_label}&nbsp;<input type="text" id="id_input"/><br/></label>
          <p hidden>"</p>
          <br/>
          <br/>
          <ContinueButton next={handleContinue} label={texts.continue_label}/>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { texts as allTexts } from './text.js';
import { classNames, ContinueButton } from './ui.js';


export const FinalQuestionsScreen = ({ next, data }) => {
  const texts = allTexts[data.language];
  // const [error, setError] = React.useState(null);
  // const validation_error = () => setError(texts.subject_data.validation);

  const strategyTextarea = React.useRef();
  const relationshipsTextarea = React.useRef();
  const feedbackTextarea = React.useRef();

  const saveData = () => {
    data.strategy = strategyTextarea.current.value;
    data.relationships = relationshipsTextarea.current.value;
    data.feedback = feedbackTextarea.current.value;

    next();
  };

  // const error_div = error ? (
  //   <div className="error">
  //     {error}
  //   </div>
  // ) : null;
  const rtl = data.language === "hebrew";

  return (
    <div className={classNames("container", rtl && "text-right")} dir={rtl && "rtl"}>
      <div className="row justify-content-center">
        <div className="col-md-8 breathing-top">
          {texts.finish.instructions}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          {texts.finish.strategy_question}
          <textarea className="w-100" style={{height: "100px"}} ref={strategyTextarea}></textarea>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          {texts.finish.relationships_question}
          <textarea className="w-100" style={{height: "100px"}} ref={relationshipsTextarea}></textarea>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          {texts.finish.feedback_question}
          <textarea className="w-100" style={{height: "100px"}} ref={feedbackTextarea}></textarea>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col text-center font-weight-bold">
          <br />
          <ContinueButton label={texts.continue_label} next={saveData} />
          {/* {error_div} */}
        </div>
      </div>
    </div>



  );
};

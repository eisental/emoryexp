import React from 'react';
import { text_english } from './text.js';
import { ContinueButton } from './ui.js';

const texts = text_english;

export const SubjectDataScreen = ({next, data}) => {
    const [error, setError] = React.useState(null);

    const saveData = () => {
	// validation
	// put into data object

	next();
    };

    const error_div = error ? (
	<div className="error">
          {error}
	</div>
    ) : null;

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 breathing-top">
              <p>Subject data form @ subject_data.js</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <p>The form</p>
            </div>            
          </div>
          <div className="row">
            <div className="col text-center">
              <br/>
              <ContinueButton label={texts.continue_label} next={saveData}/>
              {error_div}
            </div>
          </div>
        </div>
                 
                 
                 
    );
};

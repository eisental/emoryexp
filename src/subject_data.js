import React from 'react';
import { text_english } from './text.js';
import { ContinueButton } from './ui.js';

const texts = text_english;

export const SubjectDataScreen = ({next, data}) => {
    const [error, setError] = React.useState(null);
    const validation_error = () => setError(texts.subject_data.validation);
    
    const saveData = () => {
        const gender_male = document.getElementById('male');
        const gender_female = document.getElementById('female');
        const gender_other = document.getElementById('other');
        let gender;
        if (gender_male.checked) {
            gender = gender_male.value;
        }
        else if (gender_female.checked) {
            gender = gender_female.value;
        }
        else if (gender_other.checked) {
            gender = gender_other.value;
        }
        else {
            validation_error();
            return;
        }

        const age = document.getElementById('age_input').value;
        const musical_instrument = document.getElementById('instrument_input').value;
        const music_theory = document.getElementById('theory_input').value;

        if (age === "" || musical_instrument === "" || music_theory === "") {
            validation_error();
            return;
        }

        const activity_yes = document.getElementById('activity_yes');
        const activity_no = document.getElementById('activity_no');
        let activity;
        if (activity_yes.checked) {
            activity = activity_yes.value;
        }
        else if (activity_no.checked) {
            activity = activity_no.value;
        }
        else {
            validation_error();
            return;
        }
        
        const activity_specify = document.getElementById('activity_specify_input').value;
        if (activity_specify === "" && activity_yes.checked) {
            validation_error();
            return;
        }
        
        const acting_yes = document.getElementById('acting_yes');
        const acting_no = document.getElementById('acting_no');
        let acting;
        if (acting_yes.checked) {
            acting = acting_yes.value;
        }
        else if (acting_no.checked) {
            acting = acting_no.value;
        }
        else {
            validation_error();
            return;
        }

        data.gender = gender;
        data.age = age;
        data.musical_instrument = musical_instrument;
        data.music_theory = music_theory;
        data.activity = activity;
        data.activity_specify = activity_specify;
        data.acting = acting;
        
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
		<p>{texts.subject_data.header}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <table>
                <tbody>
                  <tr>
                    <th>{texts.subject_data.gender}</th>
                    <td>
                      <input type="radio" id="male" name="gender" value="male"/>
                      <label>{texts.subject_data.gender_male}</label>
                      <input type="radio" id="female" name="gender" value="female"/>
                      <label>{texts.subject_data.gender_female}</label>
                      <input type="radio" id="other" name="gender" value="other"/>
                      <label>{texts.subject_data.gender_other}</label>
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.age}</th>
                    <td><input type="text" id="age_input"/></td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.musical_instrument}</th>
                  <td><input type="text" id="instrument_input"/></td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.music_theory}</th>
                    <td><input type="text" id="theory_input"/></td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.musical_activity}</th>
                    <td>
                      <input type="radio" id="activity_yes" name="activity" value="yes"/>
                      <label>{texts.subject_data.yes}</label>
                      <input type="radio" id="activity_no" name="activity" value="no"/>
                      <label>{texts.subject_data.no}</label>
                    </td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.musical_activity_specify}</th>
                    <td><input type="text" id="activity_specify_input"/></td>
                  </tr>
                  <tr>
                    <th>{texts.subject_data.acting}</th>
                    <td>
                      <input type="radio" id="acting_yes" name="acting" value="yes"/>
                      <label>{texts.subject_data.yes}</label>
                      <input type="radio" id="acting_no" name="acting" value="no"/>
                      <label>{texts.subject_data.no}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col text-center font-weight-bold">
              <br/>
              {texts.subject_data.done}
              <ContinueButton label={texts.continue_label} next={saveData}/>
              {error_div}
            </div>
          </div>
        </div>
                 
                 
                 
    );
};

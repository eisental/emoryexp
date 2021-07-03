import React from 'react';
import { text_english } from './text.js';
import { ContinueButton, ComboBox } from './ui.js';

const texts = text_english;

export const LoginScreen = ({next, data}) => {
    const [error, setError] = React.useState(null);
    
    const handleContinue = () => {
        const id_input = document.getElementById('id_input');
        const group_input = document.getElementById('group_input');
        
        if (id_input.value === "" || group_input.value === "") {
            setError("Please select group and participant number.");
            return;
        }
        
        data.id = id_input.value;
        data.group = group_input.value;
        next();
    };
    
    return (
        <div className="container">
          <div className="row breathing-top">
            <div className="col-4 offset-4">
              <table>
                <tbody>
                  <tr>
                    <th>{text_english.subject_id_label}</th>
                    <td><input type="text" id="id_input"/></td>
                  </tr>
                  <tr>
                    <th>{text_english.group_label}</th>
                    <td><ComboBox id="group_input" options={texts.group_options}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col text-center breathing-top">
              <ContinueButton next={handleContinue} label={texts.continue_label}/>
              <div className="error">
                {error}
              </div>              
            </div>
          </div>
        </div>
    );
};

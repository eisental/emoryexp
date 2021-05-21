import './App.css';
import React from 'react';
import ls from 'local-storage';
import { readSessionData, writeSessionEvent, SessionEvent } from './sessions.js';
import gs from './spreadsheet_io.js';

class App extends React.Component {
    conn = {
        spreadsheet_id: '1O3uiSh1z1V2UjcxOu6FfelqUrgZRI2HNBQ2f12jjjjg',
        api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
        write_url: 'https://script.google.com/macros/s/AKfycbwQHtJwrLIE4_Ry5uDXtH1hZJg6xvUNUP-8kBqYTtGs2gENHMlbyFNE13CYXaMdx0H3vQ/exec'
    }

    steps = {
    }

    state = {
        step: 1,
        loading: false,
    }

    data = {
        id: "1",
        session_number: 1,
        trials: [],
    }

    componentDidMount() {
    }
    
    nextStep = () => {
        const { step } = this.state;
        this.setStep(step + 1);
    }

    stepWillChange = (step, new_step) => {
        return null;
    }

    setStep = (new_step) => {
        const { step } = this.state;
        if (new_step !== step) {
            const altered_step = this.stepWillChange(step, new_step);
            if (altered_step) {
                new_step = altered_step;
            }
            
            if (new_step > 2) {
                ls.set(this.ls_prefix + "step", new_step);
            }

            this.setState({step: new_step});
            this.stepChanged(new_step);            
        }
    }

    stepChanged = (step) => {
    }
    
    render() {
        return (
            <div className="container">
              <div className="row">
                <div className="col-8 offset-2 text-center">
                  Hello Emory
                </div>
              </div>
            </div>
        );
    }
}

export default App;

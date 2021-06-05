import './App.css';
import React from 'react';
import ls from 'local-storage';
import { readSessionData, writeSessionEvent, SessionEvent, does_user_sheet_exists } from './sessions.js';
import { LoadingScreen, ContinueButton, ErrorScreen, InfoScreen } from './ui.js';
import { text_english } from './text.js';
import gs from './spreadsheet_io.js';
import { blocks, block_stimuli } from './stimuli.js';
import { LoginScreen } from './login.js';
import { SubjectDataScreen } from './subject_data.js';
import { PictureSamplesScreen } from './picture_samples.js';
import { Experiment } from './experiment.js';
import { SemanticField } from './stimuli.js';

/* TODO
 * - Randomize the semantic fields list !counterbalanced! between participants!
 * - Select the correct set of pictures for the current subject
 */

const texts = text_english;

const FinishScreen = ({done_saving, data_save_error}) => {
  return (
    <div className="container">
      <div className="col-md-8 offset-md-2 finish-screen text-center">
        <h1>{texts.finish}</h1>
        <p>{done_saving ? texts.finish_success : texts.finish_wait }</p>
        <p className="alert-error">{data_save_error}</p>
      </div>
    </div>
  );
};

class App extends React.Component {
    conn = {
        spreadsheet_id: '1O3uiSh1z1V2UjcxOu6FfelqUrgZRI2HNBQ2f12jjjjg',
        api_key: 'AIzaSyDHFHbGy_GhEt1Q4FW61YYEX2jk3hZcSoQ',
        write_url: 'https://script.google.com/macros/s/AKfycbwQHtJwrLIE4_Ry5uDXtH1hZJg6xvUNUP-8kBqYTtGs2gENHMlbyFNE13CYXaMdx0H3vQ/exec'
    }

    steps = {
	LOGIN: 1,
	SUBJECT_DATA: 2,
	INTRO: 3,
	PICTURE_SAMPLES: 4,
	EXPERIMENT_BLOCKS: 5,
	FINISH: 6,
    }

    state = {
        step: 1,
        error: null,
        data_save_error: null,
        loading: false,
    }

    data = {
        trials: [],
    }

    mocked_user_props = {
        ordered_semantic_fields: SemanticField,
        picture_variant: 1,
        picture_orientation: "RIGHT",
    }
    
    componentDidMount() {
	this.data.start_time = new Date().toString();
    }
    
    nextStep = () => {
        const { step } = this.state;
        this.setStep(step + 1);
    }

    stepWillChange = (prev_step, next_step) => {
        if (prev_step === this.steps.LOGIN) {
            this.handle_login();
        }
        else if (prev_step === this.steps.SUBJECT_DATA) {
            ls.set("data", this.data);
        }
        
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
                ls.set("step", new_step);
            }

            this.setState({step: new_step});
            this.stepChanged(new_step);            
        }
    }

    stepChanged = (step) => {
        if (step === this.steps.FINISH) {
            this.save_data();
        }
    }

    check_for_subject_sheet = () => {
        return does_user_sheet_exists(this.conn, this.data.id)
            .then(sheet_exists => {
                if (sheet_exists) {
                    return true;
                }
                else {
                    this.setState({error: texts.error_no_user_sheet + this.data.id,
                                   loading: false});
                    return false;
                }
            })
            .catch(err => {
                this.setState({error: texts.error_no_connection + " (" + err + ")."});
            });
    }
    
    handle_login = () => {
        this.setState({loading: true});

        this.check_for_subject_sheet()
            .then(found_sheet => {
                if (found_sheet) {
                    readSessionData(this.conn)
                        .then(sessions => {
                            const previous_sessions = sessions.filter(e => e.id === this.data.id);
                            if (previous_sessions.length === 0) {
                                // First session. Not continued!
                                this.start_new_session(1);
                            } 
                            else {
                                // Not first session or continued session.
                                const last_session = previous_sessions[previous_sessions.length-1];
                                const last_session_number = parseInt(last_session.number);
                                if (last_session.event !== SessionEvent.SESSION_END) {
                                    // Continue session
                                    this.continue_session(last_session_number);
                                }
                                else {
                                    // Last session ended. 
                                    if (last_session_number === 2) {
                                        this.setState({error: texts.error_2nd_session_over,
                                                       loading: false});
                                    }
                                    else {
                                        // Second session
                                        this.start_new_session(2);
                                    }
                                }
                            }
                            
                            this.setState({loading: false});
                        })
                        .catch(err => {
                            this.setState({error: texts.error_no_connection + " (" + err + ")."});
                        });
                }
            });
    }

    start_new_session = (number) => {
        this.data.session_number = number;
        writeSessionEvent(this.conn, this.data, SessionEvent.SESSION_START);
        this.setState({loading: false});

        ls.clear();
        ls.set("data", this.data);

        if (number === 2 && this.state.step === this.steps.SUBJECT_DATA) {
            this.nextStep();
        }

    }

    continue_session = (number) => {
        const cont_data = ls.get("data");
        if (cont_data && cont_data.id === this.data.id) {
            this.data = cont_data;
            writeSessionEvent(this.conn, this.data, SessionEvent.SESSION_CONTINUED);
            this.setState({loading: false});

            const cont_step = ls.get("step");
            if (cont_step) {
                if (cont_step === this.steps.SUBJECT_DATA && number === 2) {
                    this.setStep(cont_step + 1);
                }
                else {
                    this.setStep(cont_step);
                }
            }
        }
        else {
            this.start_new_session(number);
        }
    }
    
    save_data = () => {
        this.data.end_time = new Date().toString();
        this.data.trials.forEach(t => {
            t.id = this.data.id;
            t.session_number = this.data.session_number;
            t.start_time = this.data.start_time;
            t.end_time = this.data.end_time;
            if (this.data.session_number === 1) {
                // copy subject data to trial
            }
        });

        const that = this;
        gs.write(this.conn, this.data.id, this.data.trials)
            .then(res => {
                that.setState({done_saving: true});
                writeSessionEvent(this.conn, this.data, SessionEvent.SESSION_END);
            })
            .catch(this.show_data_save_error);
        
    }
    
    render() {
	const { step, loading, error } = this.state;

        if (error) {
            return <ErrorScreen error={error} />;
        }
        else if (loading) {
            return <LoadingScreen />;
        }
        else {
            switch(step) {
            case this.steps.LOGIN:
                return <LoginScreen next={this.nextStep} data={this.data} key={step} />;
            case this.steps.SUBJECT_DATA:
                return <SubjectDataScreen next={this.nextStep} data={this.data} key={step} />;
            case this.steps.INTRO:
                return <InfoScreen next={this.nextStep}
                                   info={texts.introduction}
                                   continue_label={texts.continue_label}
                                   key={step} />;
            case this.steps.PICTURE_SAMPLES:
                return <PictureSamplesScreen next={this.nextStep}
                                             ordered_semantic_fields={this.mocked_user_props.ordered_semantic_fields}
                                             picture_variant={this.mocked_user_props.picture_variant}
                                             picture_orientation={this.mocked_user_props.picture_orientation}
                                             key={step} />;
            case this.steps.EXPERIMENT_BLOCKS:
                return <Experiment next={this.nextStep} data={this.data} key={step} />;
            case this.steps.FINISH:
                return <FinishScreen done_saving={this.state.done_saving} key={step} />;
            default:
                return null;
            }
        }
    }
}

export default App;

import React from 'react';
import { LoadingScreen, ContinueButton } from './ui.js';
import { text_english } from './text.js';

const texts = text_english;

const TrialUI = ({is_practice, stimuli}) => {
    
};

export class Experiment extends React.Component {
    ls_prefix = "experiment_"

    constructor({data, next}) {
        super();
        this.next = next;
        this.data = data;
    }
                
    render() {
	return (
            <div>
              <p>Experiment @ experiment.js</p>
              <ContinueButton label={texts.continue_label} next={this.next}/>
            </div>
        );
    }
}

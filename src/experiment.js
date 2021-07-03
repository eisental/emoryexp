import React from 'react';
import { LoadingScreen, ContinueButton, InfoScreen } from './ui.js';
import { text_english } from './text.js';
import { AudioController } from './audio_controller.js';
import { blocks, block_stimuli } from './stimuli.js';
import ls from 'local-storage';

const texts = text_english;

const TrialUI = ({next, play, trial_data, disable_buttons, pictures}) => {
    const select_picture = (idx) => {
        console.log(idx);
        next();
    };
    
    const imgs = pictures.map((url, i) =>
        <img src={url} alt={url} key={url} onClick={() => select_picture(i)} disabled={disable_buttons}/>
    );
    
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              {imgs}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <button onClick={play}><img src="icons8-speaker-80.png" alt="play"/></button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {texts.trial_instructions}
            </div>
          </div>
        </div>
    );
};


export class Experiment extends React.Component {
    ls_prefix = "experiment_"

    steps = {
	PRACTICE_INFO: 1,
	PRACTICE_TRIALS: 2,
	EXPERIMENT_INFO: 3,
	EXPERIMENT_BLOCKS: 4,
    }

    state = {
	step: 1,
	is_loading: false, // should be true
	is_playing: false,
    }
    
    constructor({data, exp1_recordings, next}) {
        super();
        this.next = next;
        this.data = data;

        this.block_stimuli = this.data.blocks.map(block => block_stimuli(block,
                                                                         this.data.picture_variant,
                                                                         exp1_recordings));
        console.log("block_stimlui\n", this.block_stimuli);
    }

    componentDidMount() {
	const onDoneLoading = () => {
	    console.log("Done loading audio files.");
	    this.setState({is_loading: false});
	};

        const onAudioEnded = () => {
            this.setState({is_playing: false});            
        };

        this.audio_controller = new AudioController(this.block_stimuli.flat(1).map(s => s.audio),
                                                    onDoneLoading, onAudioEnded);
    }

    nextStep = () => {
        const { step } = this.state;
        if (step === this.steps.EXPERIMENT_BLOCKS) {
            console.log(this.data);
            this.next();
        }
        else {
            const new_step = step + 1;
            ls.set(this.ls_prefix + "step", new_step);
            this.setState({step: new_step});
        }
    }
    
    render() {
        const {step, is_loading} = this.state;

        if (is_loading) {
            return <LoadingScreen />;
        }

        switch(step) {
        case this.steps.PRACTICE_INFO:
            return <InfoScreen info={texts.practice_info} continue_label={texts.continue_label} next={this.nextStep}/>;
        case this.steps.PRACTICE_TRIALS:
            return <ContinueButton next={this.nextStep}/>;
        case this.steps.EXPERIMENT_INFO:
            return <InfoScreen info={texts.experiment_info} continue_label={texts.continue_label} next={this.nextStep}/>;
        case this.steps.EXPERIMENT_BLOCKS:
            return <ContinueButton next={this.nextStep}/>;
        default:
            return null;
        }
    };
}

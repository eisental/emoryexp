import React from 'react';
import { LoadingScreen, InfoScreen, classNames } from './ui.js';
import { texts as allTexts } from './text.js';
import { AudioController } from './audio_controller.js';
import { block_stimuli, visual_stim_size } from './stimuli.js';
import { shuffleArray, randomElement, randomElements } from './randomize.js';
import ls from 'local-storage';

const TrialUI = ({ next, play, disable_play, disable_pictures, pictures, visual1_location, language }) => {
    const texts = allTexts[language];
    const select_picture = (idx) => {
        next(idx === 0);
    };

    const imgs = pictures.map((url, i) =>
        <button className="btn btn-outline-primary"
            onClick={() => select_picture(i)}
            disabled={disable_pictures}
            key={url} >
            <img src={url} alt={url} width={visual_stim_size[0]} height={visual_stim_size[1]} />
        </button>
    );

    const ordered_imgs = visual1_location === 'Left' ? imgs : [imgs[1], imgs[0]];

    return (
        <div className={classNames("container", language === "hebrew" && "text-right")} dir={language === "hebrew" && "rtl"}>
            <div className="row breathing-top justify-content-center">
                <div className="trial_imgs">
                    {ordered_imgs}
                </div>
            </div>
            <div className="row tiny-breathing-top justify-content-center">
                <div className="col-md-8 text-center">
                    <button className="btn btn-outline-success" onClick={play} disabled={disable_play}>
                        <img width="32" height="32" src="icons8-speaker-80.png" alt="play" />
                    </button>
                </div>
            </div>
            <div className="row tiny-breathing-top justify-content-center">
                <div className="col-md-8">
                    {texts.trial_instructions}
                </div>
            </div>
        </div>
    );
};


class ExperimentBlock extends React.Component {
    ls_prefix = "experiment_block_"

    state = {
        trial_idx: 0,
        play_count: 0,
    }

    constructor(props) {
        super();
        this.props = props;
        this.ls_prefix = `experiment_block${props.block_idx}_`;
        this.block_stimuli = !props.is_practice ? randomElements(props.block_stimuli, 2).concat(props.block_stimuli) : props.block_stimuli;

        console.log(`Block ${props.block_idx}. Trials:`, this.block_stimuli);

        const cont_trial_idx = ls.get(this.ls_prefix + "trial_idx");
        if (cont_trial_idx !== null) {
            this.state.trial_idx = cont_trial_idx;
            this.continued_trial = true;
            this.state.visual1_location = ls.get(this.ls_prefix + "visual1_location");
            if (!this.props.is_practice) {
                this.trial_time = props.data.trials[props.data.trials.length - 1].trial_time;
            }
        }
        else { // temp
            this.continued_trial = false;
        }
    }

    startTrial = (trial_idx) => {
        const visual1_location = randomElement(['Left', 'Right']);
        ls.set(this.ls_prefix + "visual1_location", visual1_location);

        if (!this.props.is_practice) {
            const trial_date = new Date();
            this.trial_time = trial_date.getTime();
            this.props.data.trials.push({
                trial_time: trial_date.toString(),
                trial: trial_idx
            });
        }

        this.setState({
            play_count: 0,
            trial_idx: trial_idx,
            visual1_location: visual1_location
        });

        ls.set(this.ls_prefix + "trial_idx", trial_idx);
        ls.set("data", this.props.data);
    }

    endTrial = (was_correct) => {
        const { trial_idx, visual1_location } = this.state;

        if (!this.props.is_practice && trial_idx >= 2 /* 2 practice stimuli in each block */) {
            // trial end
            const trials = this.props.data.trials;
            const stimuli = this.block_stimuli[trial_idx];

            Object.assign(trials[trials.length - 1], {
                block: this.props.block_idx,
                // block_name: this.props.data.blocks[(this.block_idx - 1) + 4 * (this.data.session - 1)].name,
                trial_duration: new Date().getTime() - this.trial_time,
                visual1_location: visual1_location,
                is_correct: was_correct,
            });
            Object.assign(trials[trials.length - 1], stimuli);

            ls.set("data", this.props.data);
        }
    }

    componentDidMount() {
        if (!this.continued_trial) {
            this.startTrial(0);

            // for testing purposes:
            // this.startTrial(this.block_stimuli.length - 2);
        }
    }

    nextTrial = (was_correct) => {
        const { trial_idx } = this.state;

        this.endTrial(was_correct);

        if (trial_idx + 1 < this.block_stimuli.length) {
            this.startTrial(trial_idx + 1);
        }
        else {
            this.props.next();
        }
    }

    playTrial = (trial_idx) => {
        const { play_count } = this.state;
        this.setState({ play_count: play_count + 1 });
        console.log("Playing", this.block_stimuli[trial_idx].audio);
        this.props.audio_controller.play(this.block_stimuli[trial_idx].audio);
        this.props.set_is_playing(true);
    }

    render() {
        const { trial_idx, visual1_location, play_count } = this.state;

        return <TrialUI
            next={this.nextTrial}
            play={() => this.playTrial(trial_idx)}
            disable_play={this.props.is_playing}
            disable_pictures={play_count === 0 || this.props.is_playing}
            pictures={this.block_stimuli[trial_idx].pictures}
            visual1_location={visual1_location}
            language={this.props.data.language} />;
    }
}

export class Experiment extends React.Component {
    ls_prefix = "experiment_"

    steps = {
        PRACTICE_INFO: 1,
        PRACTICE_TRIALS: 2,
        EXPERIMENT_INFO: 3,
        EXPERIMENT_BLOCK1: 4,
        PAUSE1: 5,
        EXPERIMENT_BLOCK2: 6,
        PAUSE2: 7,
        EXPERIMENT_BLOCK3: 8,
        PAUSE3: 9,
        EXPERIMENT_BLOCK4: 10,
    }

    state = {
        step: 1,
        is_loading: true,
        is_playing: false,
    }

    constructor({ data, exp1_recordings, next }) {
        super();
        this.next = next;
        this.data = data;
        this.exp1_recordings = exp1_recordings;
    }

    componentDidMount() {
        const cont_block_stimuli = ls.get(this.ls_prefix + "block_stimuli");

        if (cont_block_stimuli) {
            console.log("Continuing experiment block...");

            this.block_stimuli = cont_block_stimuli;
            this.practice_stimuli = ls.get(this.ls_prefix + "practice_stimuli");

            const cont_step = ls.get(this.ls_prefix + "step");
            if (cont_step)
                this.setState({ step: cont_step });
        }
        else {
            this.block_stimuli = this.data.blocks.map(
                block => block_stimuli(block, this.exp1_recordings, this.data.picture_variant));
            this.practice_stimuli = shuffleArray(this.block_stimuli.map(
                b => randomElement(b)).flat(1));

            ls.set(this.ls_prefix + "block_stimuli", this.block_stimuli);
            ls.set(this.ls_prefix + "practice_stimuli", this.practice_stimuli);
        }

        console.log("block_stimuli\n", this.block_stimuli);
        console.log("practice_stimuli\n", this.practice_stimuli);

        const first_block_idx = (this.data.session - 1) * 4;
        this.session_block_stimuli = this.block_stimuli.slice(first_block_idx, first_block_idx + 4);
        console.log("blocks for session", this.data.session, "\n", this.data.blocks.slice(first_block_idx, first_block_idx + 4));

        const onDoneLoading = () => {
            console.log("Done loading audio files.");
            this.setState({ is_loading: false });
        };

        const onAudioEnded = () => {
            this.setState({ is_playing: false });
        };

        const audio_urls = [...this.session_block_stimuli.flat(1).map(s => s.audio),
        ...this.practice_stimuli.map(s => s.audio)];
        this.audio_controller = new AudioController(audio_urls, onDoneLoading, onAudioEnded);
    }

    nextStep = () => {
        const { step } = this.state;
        if (step === this.steps.EXPERIMENT_BLOCK4) {
            this.next();
        }
        else {
            const new_step = step + 1;
            ls.set(this.ls_prefix + "step", new_step);
            this.setState({ step: new_step });
        }
    }

    render() {
        const texts = allTexts[this.data.language];
        const { step, is_loading, is_playing } = this.state;

        if (is_loading) {
            return <LoadingScreen language={this.data.language} />;
        }

        switch (step) {
            case this.steps.PRACTICE_INFO:
                return <InfoScreen info={texts.practice_info}
                    continue_label={texts.continue_label}
                    next={this.nextStep}
                    rtl={this.data.language === "hebrew"} />;
            case this.steps.PRACTICE_TRIALS:
                return <ExperimentBlock
                    next={this.nextStep}
                    data={this.data}
                    is_playing={is_playing}
                    set_is_playing={(v) => this.setState({ is_playing: v })}
                    is_practice={true}
                    block_stimuli={this.practice_stimuli}
                    block_idx={0}
                    audio_controller={this.audio_controller} />;
            case this.steps.EXPERIMENT_INFO:
                return <InfoScreen info={texts.experiment_info}
                    rtl={this.data.language === "hebrew"}
                    continue_label={texts.continue_label}
                    next={this.nextStep} />;
            case this.steps.EXPERIMENT_BLOCK1:
                return <ExperimentBlock next={this.nextStep}
                    data={this.data}
                    is_playing={is_playing}
                    set_is_playing={(v) => this.setState({ is_playing: v })}
                    is_practice={false}
                    block_stimuli={this.session_block_stimuli[0]}
                    block_idx={1}
                    audio_controller={this.audio_controller} />;
            case this.steps.PAUSE1:
                return <InfoScreen info={texts.pause}
                    continue_label={texts.continue_label}
                    rtl={this.data.language === "hebrew"}
                    next={this.nextStep} />;
            case this.steps.EXPERIMENT_BLOCK2:
                return <ExperimentBlock next={this.nextStep}
                    data={this.data}
                    is_playing={is_playing}
                    set_is_playing={(v) => this.setState({ is_playing: v })}
                    is_practice={false}
                    block_stimuli={this.session_block_stimuli[1]}
                    block_idx={2}
                    audio_controller={this.audio_controller} />;
            case this.steps.PAUSE2:
                return <InfoScreen info={texts.pause}
                    continue_label={texts.continue_label}
                    rtl={this.data.language === "hebrew"}
                    next={this.nextStep} />;
            case this.steps.EXPERIMENT_BLOCK3:
                return <ExperimentBlock next={this.nextStep}
                    data={this.data}
                    is_playing={is_playing}
                    set_is_playing={(v) => this.setState({ is_playing: v })}
                    is_practice={false}
                    block_stimuli={this.session_block_stimuli[2]}
                    block_idx={3}
                    audio_controller={this.audio_controller} />;
            case this.steps.PAUSE3:
                return <InfoScreen info={texts.pause}
                    continue_label={texts.continue_label}
                    rtl={this.data.language === "hebrew"}
                    next={this.nextStep} />;
            case this.steps.EXPERIMENT_BLOCK4:
                return <ExperimentBlock next={this.nextStep}
                    data={this.data}
                    is_playing={is_playing}
                    set_is_playing={(v) => this.setState({ is_playing: v })}
                    is_practice={false}
                    block_stimuli={this.session_block_stimuli[3]}
                    block_idx={4}
                    audio_controller={this.audio_controller} />;
            default:
                return null;
        }
    };
}

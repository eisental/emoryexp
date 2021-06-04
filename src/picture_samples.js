import React from 'react';
import { ContinueButton, InfoScreen } from './ui.js';
import { text_english } from './text.js';
import { SemanticField, semantic_field_meanings, visual_stimulus_url,
         PictureOrientation, MeaningName } from './stimuli.js';

const texts = text_english;

// TODO:
// - Randomize the semantic fields list !counterbalanced! between participants!
// - Select the correct set of pictures for the current subject
// - put current step in local storage

export const PictureSamplesScreen = ({next}) => {
    const [intro, setIntro] = React.useState(true);
    const [semanticFieldId, setSemanticFieldId] = React.useState(0);

    const picture_variant = 1;
    const picture_orientation = "RIGHT";
    
    const nextSemanticField = () => {
        setSemanticFieldId(semanticFieldId + 1);
    };
    
    const proceed_to_samples = () => {
        setIntro(false);
    };

    if (intro) {
        return <InfoScreen info={texts.picture_samples_intro}
                           continue_label={texts.continue_label}
                           next={proceed_to_samples}/>;
    }
    else {
        const semantic_field = SemanticField[semanticFieldId];
        const meanings = semantic_field_meanings[semantic_field]
            .map(m => MeaningName[m]);
        
        console.log(meanings);
        const imgs = meanings
              .map(m => visual_stimulus_url(m, picture_variant, picture_orientation))
              .map(src => <img src={src} alt={src}/>);
        
        return (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 infotext">
                  {texts.picture_samples}
                  {imgs}
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                  <br/>
                  <ContinueButton label={texts.continue_label}
                                  next={semanticFieldId === 2 ? next : nextSemanticField}/>
                </div>
                <div className="col"></div>
              </div>
            </div>
        );
    }
};

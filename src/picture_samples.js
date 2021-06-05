import React from 'react';
import { ContinueButton, InfoScreen } from './ui.js';
import { text_english } from './text.js';
import { SemanticField, semantic_field_meanings, visual_stimulus_url,
         PictureOrientation, MeaningName, visual_stim_size } from './stimuli.js';
import ls from 'local-storage';

const texts = text_english;

export const PictureSamplesScreen = ({next, ordered_semantic_fields, picture_variant, picture_orientation}) => {
    const [intro, setIntro] = React.useState(true);
    const [semanticFieldId, setSemanticFieldId] = React.useState(0);

    const ls_prefix = "picture_samples_";

    React.useEffect(() => {
        const cont_field = ls.get(ls_prefix + "semantic_field");
        
        if (cont_field !== undefined && cont_field !== null) {
            setSemanticFieldId(cont_field);
            setIntro(ls.get(ls_prefix + "in_intro"));
        }
        else {
            console.log("setting");
            ls.set(ls_prefix + "in_intro", intro);
            ls.set(ls_prefix + "semantic_field", semanticFieldId);
        }
    }, []);
    
    const nextSemanticField = () => {
        setSemanticFieldId(semanticFieldId + 1);
        ls.set(ls_prefix + "semantic_field", semanticFieldId + 1);
    };
    
    const proceed_to_samples = () => {
        setIntro(false);
        ls.set(ls_prefix + "in_intro", false);
    };

    if (intro) {
        return <InfoScreen info={texts.picture_samples_intro}
                           continue_label={texts.continue_label}
                           next={proceed_to_samples}/>;
    }
    else {
        const semantic_field = ordered_semantic_fields[semanticFieldId];
        const meanings = semantic_field_meanings[semantic_field]
            .map(m => MeaningName[m]);
        
        console.log(meanings);
        const imgs = meanings
              .map(m => visual_stimulus_url(m, picture_variant, picture_orientation))
              .map(src => <img src={src} alt={src} key={src}
                               width={visual_stim_size[0]}
                               height={visual_stim_size[1]}/>);

        return (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 infotext text-center picture_samples_imgs">
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

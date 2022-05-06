import React from 'react';
import { ContinueButton } from './ui.js';
import { text_english } from './text.js';
import { semantic_field_meanings, visual_stimulus_url, SemanticField,
         MeaningName, visual_stim_size, contrast_meanings, serial_meanings} from './stimuli.js';
import { randomElement, perm_to_seq } from './randomize.js';

import ls from 'local-storage';

const texts = text_english;

export const PictureSamplesScreen = ({next, semantic_fields_permutation, picture_variant, picture_orientation}) => {
    const [intro, setIntro] = React.useState(true);
    const [semanticFieldIdx, setSemanticFieldIdx] = React.useState(0);

    const ls_prefix = "picture_samples_";

    React.useEffect(() => {
        const cont_field = ls.get(ls_prefix + "semantic_field");
        
        if (cont_field !== undefined && cont_field !== null) {
            setSemanticFieldIdx(cont_field);
            setIntro(ls.get(ls_prefix + "in_intro"));
        }
        else {
            ls.set(ls_prefix + "in_intro", true);
            ls.set(ls_prefix + "semantic_field", 0);
        }
    }, []);
    
    const nextSemanticField = () => {
        setSemanticFieldIdx(semanticFieldIdx + 1);
        ls.set(ls_prefix + "semantic_field", semanticFieldIdx + 1);
    };
    
    const proceed_to_samples = () => {
        setIntro(false);
        ls.set(ls_prefix + "in_intro", false);
    };

    if (intro) {
        const contrast_src = visual_stimulus_url(randomElement(contrast_meanings),
                                                 picture_variant, picture_orientation);
        const contrast_img = <img src={contrast_src} alt={contrast_src} width={visual_stim_size[0]} height={visual_stim_size[1]} />;
        const serial_src = visual_stimulus_url(randomElement(serial_meanings),
                                               picture_variant, picture_orientation);
        const serial_img = <img src={serial_src} alt={serial_src}  width={visual_stim_size[0]} height={visual_stim_size[1]} />;
        
        return (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 infotext picture_imgs">
                  {texts.picture_samples.intro}
                  <div className="text-center">{contrast_img}</div>                  
                  {texts.picture_samples.other_pictures}
                  <div className="text-center">{serial_img}</div>
                  <br/>
                  {texts.picture_samples.proceed}                  
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <br/>
                  <ContinueButton label={texts.continue_label}
                                  next={proceed_to_samples}/>
                </div>
              </div>  
            </div>
        );
    }
    else {
        const perm_seq = perm_to_seq(3, semantic_fields_permutation);
        const semantic_field = SemanticField[perm_seq[semanticFieldIdx]];
        const meanings = semantic_field_meanings[semantic_field]
            .map(m => MeaningName[m]);
        
        console.log(meanings);
        const imgs = meanings
              .map(m => visual_stimulus_url(m, picture_variant, picture_orientation))
              .map(src => <img src={src} alt={src} key={src}
                               width={visual_stim_size[0]}
                               height={visual_stim_size[1]}/>);

        const instructions = semanticFieldIdx === 0 ?
              texts.picture_samples.semantic_field_first : texts.picture_samples.semantic_field;

        return (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 infotext text-center picture_imgs">
                  {instructions}
                </div>
                <div className="grid-wrapper">
                  {imgs}
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col text-center">
                  <br/>
                  <ContinueButton label={texts.continue_label}
                                  next={semanticFieldIdx === 2 ? next : nextSemanticField}/>
                </div>
                <div className="col"></div>
              </div>
            </div>
        );
    }
};

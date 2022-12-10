import { shuffleArray } from './randomize.js';

export const Medium = {
    Music: "Mu",
    Speech: "Sp",
};

export const Language = {
    English: "E",
    Hebrew: "H",
};

export const UnitSize = {
    Single: "Sn",
    Multiple: "Ml",
};

export const NovelWord = {
    Bulo: "B",
    Tepi: "T",
};

export const PictureOrientation = {
    Right: "R",
    Left: "L",
};

export const Meaning = {
    High: 1,
    Low: 2,
    Ascending: 3,
    Descending: 4,
    Large: 5,
    Small: 6,
    Growing: 7,
    Shrinking: 8,
    Near: 9,
    Far: 10,
    Approaching: 11,
    Receding: 12,
};

export const MeaningName = [
    null, "High", "Low", "Ascending", "Descending", "Large", "Small",
    "Growing", "Shrinking", "Near", "Far", "Approaching", "Receding",
];

export const SemanticField = ["Height", "Size", "Distance"];

export const semantic_field_meanings = {
    Height: [1, 2, 3, 4],
    Size: [5, 6, 7, 8],
    Distance: [9, 10, 11, 12],
};

export const semantic_field_for_meaning = (meaning) => {
    return SemanticField[Math.floor((MeaningName.indexOf(meaning) - 1) / 4)];
};

export const contrast_meanings = ["High", "Low", "Far", "Near", "Large", "Small"];
export const serial_meanings = ["Ascending", "Descending", "Approaching", "Receding", "Growing", "Shrinking"];

// Mapping between audio meaning and possible wrong answer picture meanings.
export const audio_visual_pairings = {
    High: ["Low", "Ascending"],
    Low: ["High", "Descending"],
    Ascending: ["Descending", "High"],
    Descending: ["Ascending", "Low"],
    Large: ["Small", "Growing"],
    Small: ["Large", "Shrinking"],
    Growing: ["Shrinking", "Large"],
    Shrinking: ["Growing", "Small"],
    Near: ["Far", "Approaching"],
    Far: ["Near", "Receding"],
    Approaching: ["Receding", "Near"],
    Receding: ["Approaching", "Far"],
};

export const audio_ext = ".mp3";
export const image_ext = ".jpg";

const audio_stim_dir = "stimuli/audio/";
const visual_stim_dir = "stimuli/images/";

export const visual_stim_size = [480, 270];

export const audio_stimulus_url = (medium,
    language,
    participant,
    unit_size,
    novel_word,
    picture_variant,
    picture_orientation,
    meaning) => {
    
    return audio_stim_dir + medium + "_" +
        language + "_" +
        participant + "_" +
        unit_size + "_" +
        novel_word + "_" +
        picture_variant + "_" +
        picture_orientation + "_" +
        meaning +
        audio_ext;
};

export const visual_stimulus_url = (meaning,
    picture_variant,
    picture_orientation) => {
    return visual_stim_dir + MeaningName[Meaning[meaning]] +
        picture_variant +
        picture_orientation +
        image_ext;
};

export const block_name = (m, l, u) => {
    if (m === 'Music') {
        if (l === 'English') {
            if (u === 'Single') return 'A';
            else return 'B';
        }
        else {
            if (u === 'Single') return 'C';
            else return 'D';
        }
    } else {
        if (l === 'English') {
            if (u === 'Single') return 'E';
            else return 'F';
        }
        else {
            if (u === 'Single') return 'G';
            else return 'H';
        }
    }
};

export const blocks_orders = [
    [ // 1st ordering
        { medium: 'Music', language: 'Hebrew', unit: 'Single' },
        { medium: 'Music', language: 'Hebrew', unit: 'Multiple' },
        { medium: 'Speech', language: 'Hebrew', unit: 'Single' },
        { medium: 'Speech', language: 'Hebrew', unit: 'Multiple' },
    ],

    [ // 2nd ordering
        { medium: 'Speech', language: 'Hebrew', unit: 'Single' },
        { medium: 'Speech', language: 'Hebrew', unit: 'Multiple' },
        { medium: 'Music', language: 'Hebrew', unit: 'Single' },
        { medium: 'Music', language: 'Hebrew', unit: 'Multiple' },
    ]
];

export const blocks = (data) => {
    let blocks = [];
    blocks_orders[data.blocks_order].forEach((block) => {
        const participant = data[`subject_${Medium[block.medium]}_${Language[block.language]}`];

        blocks.push({
            ...block,
            participant,
        })
    })
    return blocks;
};

// export const pilot_blocks = (data) => {
//     let blocks = [];
//     for (let unit in UnitSize) {
//         blocks.push({
//             medium: 'Music',
//             language: 'Hebrew',
//             unit_size: unit,
//             participant: 2,
//             name: block_name('Music', 'Hebrew', unit),
//         });
//     }

//     for (let unit in UnitSize) {
//         blocks.push({
//             medium: 'Speech',
//             language: 'Hebrew',
//             unit_size: unit,
//             participant: 0,
//             name: block_name('Speech', 'Hebrew', unit),
//         });
//     }

//     return shuffleArray(blocks);
// };

export const exp1_picture_params = (exp1_recordings, block, word, meaning, picture_variant) => {
    const filtered_recs = exp1_recordings.filter(r =>
        r[0] === Medium[block.medium] && r[1] === Language[block.language] && parseInt(r[2]) === block.participant && r[3] === UnitSize[block.unit] &&
        r[4] === NovelWord[word] && parseInt(r[5]) === picture_variant && parseInt(r[7]) === Meaning[meaning]);

    console.log(filtered_recs.length);
    if (filtered_recs.length === 0)
        return undefined;
    else
        return { variant: filtered_recs[0][5], orientation: filtered_recs[0][6] };
};

export const block_stimuli = (block, exp1_recordings, picture_variant) => {
    const stims = [];

    for (let meaning in Meaning)
        for (let pairing of [0, 1])
            for (let word in NovelWord) {
                let picture_params = exp1_picture_params(exp1_recordings,
                    block,
                    word,
                    meaning,
                    picture_variant);
                if (picture_params === undefined) {
                    console.log('WARNING: cant find picture orientation for:', block, word, meaning, picture_variant);
                    // Mu_H_7_Ml_T_1_*_1.mp3 is missing...
                    picture_params = exp1_picture_params(exp1_recordings, block, word, meaning, picture_variant === 1 ? 2 : 1);
                    if (picture_params === undefined) {
                        console.log('ERROR: Trying second picture variant, but cant find picture orientation for:', block, word, meaning, picture_variant);
                        continue
                    }
                }

                const { variant, orientation } = picture_params
                const s = {
                    audio: audio_stimulus_url(
                        Medium[block.medium],
                        Language[block.language],
                        block.participant,
                        UnitSize[block.unit],
                        NovelWord[word],
                        variant,
                        orientation,
                        Meaning[meaning],
                    ),
                    pictures: [
                        visual_stimulus_url(meaning,
                            variant,
                            orientation),
                        visual_stimulus_url(audio_visual_pairings[meaning][pairing],
                            variant,
                            orientation),
                    ],
                };

                Object.assign(s, {
                    exp1_subject: block.participant,
                    language: block.language,
                    medium: block.medium,
                    unit_size: block.unit,
                    non_word: word,
                    picture_set: variant,
                    picture_orientation: orientation,
                    semantic_field: semantic_field_for_meaning(meaning),
                    correct_meaning: meaning,
                    compared_meaning: audio_visual_pairings[meaning][pairing],
                });

                stims.push(s);
            }

    return shuffleArray(stims);

};
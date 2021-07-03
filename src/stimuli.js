import { randomSequence, shuffleArray } from './randomize.js';

export const Medium = {
    MUSIC: "Mu",
    SPEECH: "Sp",
};

export const Language = {
    ENGLISH: "E",
    HEBREW: "H",
};

export const UnitSize = {
    SINGLE: "Sn",
    MULTIPLE: "Ml",
};

export const NovelWord = {
    BULO: "B",
    TEPI: "T",
};

export const PictureOrientation = {
    RIGHT: "R",
    LEFT: "L",
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

export const SemanticField = ["HEIGHT", "SIZE", "DISTANCE"];

export const semantic_field_meanings = {
    HEIGHT: [1, 2, 3, 4],
    SIZE: [5, 6, 7, 8],
    DISTANCE: [9, 10, 11, 12],
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
export const image_ext = ".png";

const audio_stim_dir = "exp2021/stimuli/audio/";
const visual_stim_dir = "exp2021/stimuli/images/";

export const visual_stim_size = [162, 162];

export const audio_stimulus_url = (medium,
                                   language,
                                   participant,
                                   unit_size,
                                   novel_word,
                                   picture_variant,
                                   picture_orientation,
                                   meaning) =>
{
    return audio_stim_dir + Medium[medium] + "_" +
        Language[language] + "_" +
        participant + "_" +
        UnitSize[unit_size] + "_" +
        NovelWord[novel_word] + "_" +
        picture_variant + "_" +
        PictureOrientation[picture_orientation] + "_" +
        Meaning[meaning] +
        audio_ext;
};

export const visual_stimulus_url = (meaning,
                                    picture_variant,
                                    picture_orientation) =>
{
    return visual_stim_dir + MeaningName[Meaning[meaning]] +
        picture_variant +
        PictureOrientation[picture_orientation] +
        image_ext;
};

export const blocks = (data) => {
    let blocks = [];
    for (let medium in Medium)
        for (let lang in Language) {
            const participant = data[`subject_${Medium[medium]}_${Language[lang]}`];

            for (let unit in UnitSize) {
                blocks.push({
                    medium: medium,
                    language: lang,
                    unit_size: unit,
		    participant: participant,
                });
            }
        }
    return blocks;
};

export const exp1_picture_orientation = (exp1_recordings, unit_size, word, meaning, picture_variant, participant) => {
    const filtered_recs = exp1_recordings.filter(r =>
        r[0] === unit_size && r[2] === word && r[3] === meaning + picture_variant && parseInt(r[5]) === participant);

    if (filtered_recs.length === 0) 
        return [Array(4).fill(undefined)];    
    else
        return filtered_recs[0][4];
};

export const block_stimuli = (block, picture_variant, exp1_recordings) => {
    const stims = [];
    
    let i = 0;
    for (let meaning in Meaning)
        for (let pairing of [0, 1])
            for (let word in NovelWord) {
                const picture_orientation = exp1_picture_orientation(exp1_recordings,
                                                                     block.unit_size,
                                                                     word,
                                                                     meaning,
                                                                     picture_variant,
                                                                     block.participant);
                stims.push({
                    audio: audio_stimulus_url(
                        block.medium,
                        block.language,
                        block.participant,
                        block.unit_size,
                        word,
                        picture_variant,
                        picture_orientation,
                        meaning,
                    ),
                    pictures: [
                        visual_stimulus_url(meaning,
                                            picture_variant,
                                            picture_orientation),
                        visual_stimulus_url(audio_visual_pairings[meaning][pairing], 
                                            picture_variant,
                                            picture_orientation),
                    ],
                });
                
                i += 1;
            }
    
    return shuffleArray(stims);
    
};


export const all_audio_urls = (exp1_recs) => {
    const urls = [];

    for (let m in Medium) {
        for (let l in Language) {
            for (let p = 1; p<=8; p++) {
                for (let u in UnitSize) {
                    for (let w in NovelWord) {
                        for (let v = 1; v <= 2; v++) {
                            for (let mn in Meaning) {
                                const o = exp1_picture_orientation(exp1_recs, u, w, mn, v, p);
                                if (o !== undefined)
                                    urls.push(audio_stimulus_url(m, l, p, u, w, v, o, mn)); 
                            }
                        }
                    }
                }
            }
        }
    }

    return urls;
};

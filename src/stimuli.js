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

// Mapping between audio meaning and possible wrong answer picture meanings.
export const audio_visual_pairings = {
    HIGH: ["Low", "Ascending"],
    LOW: ["High", "Descending"],
    ASCENDING: ["Descending", "High"],
    DESCENDING: ["Ascending", "Low"],
    LARGE: ["Small", "Growing"],
    SMALL: ["Large", "Shrinking"],
    GROWING: ["Shrinking", "Large"],
    SHRINKING: ["Growing", "Small"],
    NEAR: ["Far", "Approaching"],
    FAR: ["Near", "Receding"],
    APPROACHING: ["Receding", "Near"],
    RECEDING: ["Approaching", "Far"],
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

export const blocks = (() => {
    let blocks = [];
    for (let medium in Medium)
        for (let lang in Language)
            for (let unit in UnitSize)
                blocks.push({
                    medium: medium,
                    language: lang,
                    unit_size: unit,
                });
    return blocks;
})();

export const block_stimuli = (block, participant) => {
    const stims = [];
    const picture_variants = randomSequence([1, 2], 48);
    const picture_orientations = randomSequence(Object.keys(PictureOrientation), 48);
    
    let i = 0;
    for (let meaning in Meaning)
        for (let pairing of [0, 1])
            for (let word in NovelWord) {
                stims.push({
                    audio: audio_stimulus_url(
                        block.medium,
                        block.language,
                        participant,
                        block.unit_size,
                        word,
                        picture_variants[i],
                        picture_orientations[i],
                        meaning,
                    ),
                    pictures: [
                        visual_stimulus_url(meaning,
                                            picture_variants[i],
                                            picture_orientations[i]),
                        visual_stimulus_url(audio_visual_pairings[meaning][pairing], 
                                            picture_variants[i],
                                            picture_orientations[i]),
                    ],
                });
                
                i += 1;
            }
    
    return shuffleArray(stims);
    
};

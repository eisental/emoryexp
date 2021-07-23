import React from 'react';

export const text_english = {
    continue_label: "Proceed",
    
    subject_id_label: "Participant number:",

    group_label: "Group:",

    group_options: [
        "Israeli musician",
        "Israeli non-musician",
        "American musician",
        "American non-musician",
    ],
    
    introduction:
    <React.Fragment>
      <p>
        This experiment has a single task, repeated many times. In each trial, you will see two pictures and hear a voice, singing or speaking. Your task is to select the picture that better matches, according to your subjective intuition or "feeling," what the voice seems to express.
      </p>
      <p>
        The experiment begins with a short practice session, followed by 4 "blocks" of trials. There will be pauses between blocks. The duration of each pause is self-timed. Four additional blocks will be presented in the 2nd session of the experiment, to be conducted in about a week.
      </p>
      <p>
        The duration of each session is approximately 1 hour.
      </p>
      <p>
        Press "proceed" to continue.
      </p>
    </React.Fragment>,

    subject_data: {
        header:
        <p>Thank you for your participation in this experiment. Please provide the following information:</p>,

        musical_instrument:
        <p>
          Have you studied a musical instrument formally (including vocal training)? If you have, please specity for how many years. If you have not, choose "0".
        </p>,

        music_theory:
        <p>
          Have you studied music theory formally? If you have, please specify for how many years. If you have not, choose "0".
        </p>,

        musical_activity:
        <p>
          Are you currently involved in any musical activity (excluding passive listening) professionaly or as a serious hobby? 
        </p>,

        musical_activity_specify:
        <p>
          If you are, please specify
        </p>,

        acting:
        <p>
          Have you been involved in acting (professionally or as a serious hobby)?
        </p>,

        done:
        <p>
          When done, please press "proceed"
        </p>,

        validation: "Please complete all cells before pressing proceed",
        gender: "Gender",
        gender_male: "Male",
        gender_female: "Female",
        gender_other: "Other",
        age: "Age",
        yes: "Yes",
        no: "No",
    },

    picture_samples: {
            
        intro:
        <React.Fragment>
          <p>
            Let's have a look at the pictures used in the experiment.
          </p>
          <p>
            In some pictures you see 2 objects contrasting in a particular feature. An arrow points at one of the objects. This is the object the picture referes to. The other object is presented for comparison. For instance:
          </p>
        </React.Fragment>,
        
        other_pictures:
        <p>
          Other pictures are comprised of a series of drawings, depicting a process or action. The arrows in these series denote the temporal order of the drawings.
        </p>,
        
        proceed:
        <p>
          Press "proceed" when ready to continue.
        </p>,

        semantic_field:
        <p>
          Here are additional 4 pictures used in the experiment. Please note these pictures and their relationships. Press "proceed" when ready to continue.
        </p>,

        semantic_field_first:
        <p>
          Here are 4 pictures to be used in the experiment. Please note these pictures and their relationships. Press "proceed" when ready to continue.
        </p>

    },

    practice_info:
    <React.Fragment>
      <p>
        In the following practice trials, you will see two pictures and hear a voice, singing or speaking. Your task is to select the picture that better matches, according to your subjective intuition or "feeling," what the voice seems to express.
      </p>
      <p>Please press "proceed" to begin the practice trials.</p>
    </React.Fragment>,

    trial_instructions:
    <p>
      Please click the sound icon and listen to the voice recording. After listening to the entire recording, click the picture that better matches the meaning that the voice seems to express, according to your intuition or "feeling." If you are unsure, you may listen again, by re-clicking the sound icon. Once you click one of the pictures, you will move to the next screen.
    </p>,

    experiment_info:
    <React.Fragment>
      <p>We now begin the experiment</p>
      <p>
        The experiment trials are identical to the practice trials you have just completed. In each trial, you will see two pictures with a sound icon below them. Click the sound icon and listen to the voice recording. After listening to the entire recording, click the picture that better matches the meaning that the voice seems to express, according to your intuition or "feeling." If you are unsure, you may listen again, by re-clicking the sound icon. Once you click one of the pictures, you will move to the next screen.
      </p>
      <p>
        If you have any questions regarding the procedure, please contact the experimenter now. If everything is clear, press "proceed" and the experiment will immediately begin.
      </p>
    </React.Fragment>,
    
    trial_instruction2:
    <React.Fragment>
      <p>
        Please click the picture that better matches the meaning that the voice seems to express. You may listen to the voice again, by clicking its icon.
      </p>
    </React.Fragment>,
    
    trial_confirm:
    <React.Fragment>
      <p>
        Are you sure? Click <em>yes</em> or <em>no</em>.
      </p>
    </React.Fragment>,
        
    no_confirmation:
    <React.Fragment>
      <p>
        Please try again.
      </p>
    </React.Fragment>,

    pause:
    <p>You may now take a short break. When you want to proceed, press the "proceed" box below.</p>,
   
    finish:
    <React.Fragment>
      <p>Thank you! You have completed this session.</p>
      <p>Please contact the experimenter to ensure your data is uploaded and schedule the next session.</p>
    </React.Fragment>,
    
    finish_success: "Done uploading data!",
    finish_wait: "Please wait while uploading data...",
    error_no_user_sheet: "Can't find a data sheet for participant id ",
    error_no_connection: "Can't connect. Please check your internet connection and try again.",
    error_2nd_session_over: "A participant with this participant id has already completed the experiment.",
    error_no_subject_settings:" Can't find previous settings for participant id ",
    error_occurred: "An error has occurred",
    loading: "Loading...",
};

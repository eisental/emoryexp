import React from 'react';

export const text_english = {
    login: <p>Please enter a subject id.</p>,
    subject_id_label: "Subject id:",
    continue_label: "Proceed",
    introduction:
    <React.Fragment>
      <p>
        This experiment has a single task, repeated many times. In each trial, you will see two pictures and hear a voice, singing or speaking. Your task is to select the picture that better matches according to your subjective intuition or "feeling," what the voice seems to express.
      </p>
      <p>
        The experiment begins with a short practice session, followed by 4 "blocks" of trials. Four additional blocks will be presented in the 2nd session of the experiment, to be conducted in about a week.
      </p>
    </React.Fragment>,
    
    picture_samples_intro:
    <React.Fragment>
      <p>
        Let's have a look at some of the pictures used in the experiment.
      </p>
      <p>
        In some pictures you see 2 objects varying in a particular feature associated with those objects. Other pictures are comprised of a series of drawings, depicting a process or action. The arrows in these series denote the temporal order of the drawings.        
      </p>
      <p>
        Press "proceed" when ready to continue.
      </p>
    </React.Fragment>,

    picture_samples:
    <React.Fragment>
      <p>
        Please note these pictures and their relationships. Press "proceed" when ready to continue.
      </p>
    </React.Fragment>,
    
    trial_insturction1:
    <React.Fragment>
      <p>
        Please click the sound icon and listen.
      </p>
    </React.Fragment>,
    
    trial_insturction2:
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
    
    post_practice:
    <React.Fragment>
      <p>
        If you have any questions regarding the procedure, please contact the experimenter now. If everything is clear, press "proceed".
      </p>
    </React.Fragment>,
    
    experiment_beginning:
    <React.Fragment>
      <p>
        We now begin the experiment.
      </p>
      <p>
        You will now view two pictures, and hear a voice singing or speaking. Please click the picture that better matches the meaning that the voice seems to express.
      </p>
      <p>
        You may listen to the voice again by clicking its icon.
      </p>
    </React.Fragment>,
    
    no_confirmation:
    <React.Fragment>
      <p>
        Please try again.
      </p>
    </React.Fragment>,

    finish: "Thank you for participating in the experiment!",
    finish_success: "The data was successfully saved",
    finish_wait: "Please wait while the data is being saved...",
    error_no_user_sheet: "Can't find data sheet for subject id ",
    error_no_connection: "Can't connect. Please check your internet connection and try again.",
    error_2nd_session_over: "A subject with this subject id has already participated in the experiment.",
    error_occurred: "An error has occurred",
    loading: "Loading...",
};

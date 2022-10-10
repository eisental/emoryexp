import React from 'react';

export const texts = {
  hebrew: {
    continue_label: "המשך",

    subject_id_label: "מספר נבדק:",

    group_label: "קבוצה:",

    group_options: [
      "מוזיקאי ישראלי",
      "לא-מוזיקאי ישראלי",
      "מוזיקאי אמריקאי",
      "לא-מוזיקאי אמריקאי",
    ],

    introduction:
      <React.Fragment>
        <p>
          בניסוי זה מטלה מסוג אחד שתחזור פעמים רבות: בכל שלב בניסוי תראו שני איורים ותשמעו קול (דיבור או שירה). עליכם לבחור בכל שלב את התמונה המתאימה יותר, לפי תחושתכם או האינטואיציה שלכם, למה שמבטא הקול.
        </p>
        <p>
          הניסוי יתחיל באימון קצר, שלאחריו ארבע קבוצות של מטלות. בין קבוצות המטלות תוכלו לקחת הפסקות קצרות. בסיום הניסוי תתבקשו לתת משוב קצר.
        </p>
        <p>
          משך הניסוי כ-40 דקות.
        </p>
        <p>
          לחצו ״המשך״ למעבר למסך הבא.
        </p>
      </React.Fragment>,

    subject_data: {
      header:
        <p>תודה על ההשתתפות בניסוי. אנא מלאו את הפרטים הבאים:</p>,

      musical_instrument:
        <p>
          האם למדת ביצוע מוזיקאלי (נגינה או שירה) באופן פורמלי (במוסד לחינוך מוזיקאלי או עם מורה)? אם למדת, ציין/י את מספר השנים. אם לא  בחר/י ״0״.
        </p>,

      music_theory:
        <p>
          האם למדת תיאוריה מוזיקאלית באופן פורמאלי (במוסד לחינוך מוזיקאלי או עם מורה)? אם למדת, ציין/י את מספר השנים. אם לא - בחר/י ״0״.
        </p>,

      musical_activity:
        <p>
          האם את/ה עוסק בפעילות מוזיקאלית (ביצוע, הלחנה, אלתור...) באופן מקצועי או כתחביב רציני?
        </p>,

      musical_activity_specify:
        <p>
          אם כן, אנא פרט
        </p>,

      acting:
        <p>
          האם את/ה עוסק/ת במשחק (בתיאטרון, קולנוע וכד׳) באופן מקצועי או כתחביב רציני?
        </p>,

      done:
        <p>
          לאחר שעניתם על כל השאלות לחצו ״המשך״ למעבר למסך הבא.
        </p>,

      validation: "אנא מלאו את כל הפרטים לפני לחיצה על ״המשך״",
      gender: "מין",
      gender_male: "זכר",
      gender_female: "נקבה",
      gender_other: "אחר",
      age: "גיל",
      yes: "כן",
      no: "לא",
    },

    picture_samples: {

      intro:
        <React.Fragment>
          <p>
            לפני שנתחיל, הביטו באיורים שבהם נשתמש בניסוי.
          </p>
          <p>
            בכמה מהאיורים תראו שני אובייקטים המנוגדים באחת מתכונותיהם. חץ יצביע על אחד משני אובייקטים: זהו האובייקט שאליו מתייחס האיור; האובייקט השני מוצג לשם השוואה בלבד. לדוגמה:
          </p>
        </React.Fragment>,

      other_pictures:
        <p>
          באיורים אחרים תראו סדרה של תמונות, המתארת פעולה או תהליך. החיצים בסדרה מסמנים את הסדר הכרונולוגי של האירועים המתוארים (מה קודם למה). לדוגמה:
        </p>,

      proceed:
        <p>
          לחצו ״המשך״ למעבר למסך הבא.
        </p>,

      semantic_field_first:
        <p>
          לפניכם ארבעה איורים בהם נשתמש בניסוי. שימו לב לאיורים וליחסים ביניהם.
        </p>,

      semantic_field:
        <p>
          לפניכם ארבעה איורים נוספים בהם נשתמש בניסוי. שימו לב לאיורים וליחסים ביניהם.
        </p>,
    },

    practice_info:
      <React.Fragment>
        <p>
          נתחיל בתרגול קצר. בכל אחד משלבי התרגול תראו שני איורים ותשמעו קול (דיבור או שירה). עליכם לבחור בכל שלב את התמונה המתאימה יותר, לפי תחושתכם או האינטואיציה שלכם, למה שמבטא הקול.
        </p>
        <p>לחצו ״המשך״ לתחילת האימון.</p>
      </React.Fragment>,

    trial_instructions:
      <p>
        אנא הקישו על אייקון הצליל שלמטה והקשיבו לקול המושמע. אחרי שהאזנתם להקלטה במלואה, הקישו על האיור המתאים יותר למה שמביע הקול, על פי האינטואיציה או ״תחושת הבטן״ שלכם. אם אינכם בטוחים, האזינו להקלטה שוב (הקישו שוב על האייקון). עם הלחיצה על האיור תועברו אל המסך הבא.
      </p>,

    experiment_info:
      <React.Fragment>
        <p>נתחיל עתה בניסוי עצמו</p>
        <p>
          המטלות בניסוי זהות למטלות התרגול שסיימתם זה עתה. בכל שלב בניסוי תראו שני איורים ומתחתם אייקון. הקישו על האייקון והקשיבו לקול המושמע. אחרי שהאזנתם להקלטה במלואה, הקישו על האיור המתאים יותר למה שמביע הקול, על פי האינטואיציה או ״תחושת הבטן״ שלכם. אם אינכם בטוחים, תוכלו להאזין להקלטה שוב (הקישו שוב על האייקון). הקשה על אחד האיורים תעביר אתכם אל המסך הבא.
        </p>
        <p>
          לשאלות אודות הליך הניסוי, צרו עכשיו קשר עם הנסיינים. אם ההליך ברור, הקישו ״המשך״ להתחלת הניסוי.
        </p>
      </React.Fragment>,

    pause:
      <p>תוכלו לצאת עכשיו להפסקה קצרה. להמשך הניסוי, לחצו ״המשך״.</p>,

    finish: {
      instructions: 
        <React.Fragment>
          <p className="font-weight-bold">תודה רבה על השתתפותכם בניסוי.</p>
          <p>אנא ענו על כמה שאלות הקשורות לניסוי שסיימתם זה עתה (כתבו בתיבת הטקסט שמתחת לשאלה)</p>
        </React.Fragment>,
      strategy_question: 
        <p>האם הסתמכתם על אסטרטגיה או שיטה מסוימת בבחירת הציורים המתאימים? אם כן, פרטו.</p>,
      relationships_question: 
        <p>האם הבחנתם בקשרים בין תכני הציורים לבין אופן השירה או הדיבור המתייחס אליהם? אם כן, ציינו כמה דוגמאות לקשרים כאלו.</p>,
      feedback_question:
        <p>נשמח לכל משוב נוסף על הניסוי (אם התשובה ארוכה, פרטו בדף נפרד).</p>,
      done:
        <React.Fragment>
          <p>תודה רבה על השתתפותכם בניסוי.</p> 
          <p>אנא צרו קשר עם הנסיינים.</p>
        </React.Fragment>
    },

    finish_success: "Done uploading data!",
    finish_wait: "Please wait while uploading data...",
    error_no_user_sheet: "Can't find a data sheet for participant id ",
    error_no_connection: "Can't connect. Please check your internet connection and try again.",
    error_2nd_session_over: "A participant with this participant id has already completed the experiment.",
    error_no_subject_settings: " Can't find previous settings for participant id ",
    error_occurred: "An error has occurred",
    loading: "Loading...",
  },
  english: {
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
          This experiment has a single task repeated many times. In each trial, you will see two pictures and hear a voice that is singing or speaking a word. Your task is to select the picture that best matches what the voice seems to express according to your subjective intuition or "feeling."
        </p>
        <p>
          The experiment begins with a short practice session followed by four "blocks" of trials. There will be pauses between blocks. The duration of each pause is self-timed.
        </p>
        <p>
          The duration of the experiment is approximately 40 minutes.
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
          Have you studied music performance (playing an instrument or singing) in an institution or with a teacher? If you have, please specify for how many years. If you have not, choose “0”.
        </p>,

      music_theory:
        <p>
          Have you studied music theory in an institution or with a teacher? If you have, please specify for how many years. If you have not, choose “0”.
        </p>,

      musical_activity:
        <p>
          Are you currently involved in any musical activity (e.g., music performance, music composition, music improvisation) professionally or as a serious hobby?
        </p>,

      musical_activity_specify:
        <p>
          If you are, please specify
        </p>,

      acting:
        <p>
          Are you currently involved in acting (professionally or as a serious hobby)?
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

      semantic_field_first:
        <p>
          Here are 4 pictures to be used in the experiment. Please note these pictures and their relationships. Press "proceed" when ready to continue.
        </p>,

      semantic_field:
        <p>
          Here are additional 4 pictures used in the experiment. Please note these pictures and their relationships. Press "proceed" when ready to continue.
        </p>,


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

    pause:
      <p>You may now take a short break. When you want to proceed, press the "proceed" box below.</p>,

    finish: {
      instructions: 
        <React.Fragment>
          <p>Thank you! You have completed the experiment.</p>
          <p>Please address the following questions (type in the text boxes below each question)</p>
        </React.Fragment>,
      strategy_question: 
        <p>Did you apply a system or strategy/strategies in matching sound and pictures?</p>,
      relationships_question: 
        <p>Did you notice specific relationships between vocal expression (in singing or speaking) and the meanings it depicted? Please specify.</p>,
      feedback_question:
        <p>Please write any other feedback that you believe may be significant.</p>,
      done:
        <React.Fragment>
          <p>Thanks you for participating in the experiment.</p> 
          <p>Please contact the experimenter.</p>
        </React.Fragment>
    },

    finish_success: "Done uploading data!",
    finish_wait: "Please wait while uploading data...",
    error_no_user_sheet: "Can't find a data sheet for participant id ",
    error_no_connection: "Can't connect. Please check your internet connection and try again.",
    error_2nd_session_over: "A participant with this participant id has already completed the experiment.",
    error_no_subject_settings: " Can't find previous settings for participant id ",
    error_occurred: "An error has occurred",
    loading: "Loading...",
  },
}
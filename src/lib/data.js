export const surveyQuestions = [
  [
    {
      id: "name",
      question: "What is your name?",
      type: "short",
    },
    {
      id: "age",
      question: "What is your age?",
      type: "short",
    },
    {
      id: "sex",
      question: "What is your sex?",
      type: "mcq",
      options: ["Male", "Female", "Other"],
    },
  ],
  [
    {
      id: "occupation",
      question: "What is your occupation?",
      type: "short",
    },
    {
      id: "place",
      question: "Where do you live?",
      type: "short",
    },
    {
      id: "contactNo",
      question: "What is your contact number?",
      type: "short",
    },
  ],
  [
    {
      id: "chiefComplaint",
      question: "What is your chief complaint?",
      type: "long",
    },
    {
      id: "blurringOfVision",
      question: "Are you experiencing blurring of vision?",
      type: "mcq",
      options: ["Yes", "No"],
    },
    {
      id: "photophobia",
      question: "Do you have photophobia (sensitivity to light)?",
      type: "mcq",
      options: ["Yes", "No"],
    },
  ],
  [
    {
      id: "itchingIrritation",
      question: "Are you experiencing itching or irritation in your eyes?",
      type: "mcq",
      options: ["OD (Right Eye)", "OS (Left Eye)", "No"],
    },
    {
      id: "wateringOfEyes",
      question: "Are you experiencing watering of eyes?",
      type: "mcq",
      options: ["OD (Right Eye)", "OS (Left Eye)", "No"],
    },
    {
      id: "rednessOfEyes",
      question: "Are you experiencing redness of eyes?",
      type: "mcq",
      options: ["OD (Right Eye)", "OS (Left Eye)", "No"],
    },
  ],
  [
    {
      id: "pastOcularHistory",
      question: "Do you have any past ocular history?",
      type: "multi-select",
      options: [
        "Ocular injury",
        "Ocular surgery",
        "Ocular medications",
        "Spectacles/Contact lenses",
        "None",
      ],
    },
    {
      id: "systemicHistory",
      question: "Do you have any systemic history?",
      type: "multi-select",
      options: ["Asthma", "Hypertension", "Thyroid", "TB", "None"],
    },
    {
      id: "allergicHistory",
      question: "Do you have any allergic history?",
      type: "mcq",
      options: ["Yes", "No"],
    },
  ],
  [
    {
      id: "familyHistory",
      question: "Do you have any family history of the following?",
      type: "multi-select",
      options: ["Ocular diseases", "Systemic diseases", "Spectacles", "None"],
    },
    {
      id: "personalHistory",
      question: "Personal History",
      type: "multi-select",
      options: ["Alcoholic", "Smoker", "None"],
    },
  ],
];

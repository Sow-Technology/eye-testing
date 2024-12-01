import mongoose from "mongoose";

const MedicalHistorySchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    sex: String,
    occupation: String,
    place: String,
    contactNo: String,
    chiefComplaint: String,
    blurringOfVision: String,
    photophobia: String,
    itchingIrritation: [String],
    wateringOfEyes: [String],
    rednessOfEyes: [String],
    pastOcularHistory: [String],
    systemicHistory: [String],
    allergicHistory: String,
    familyHistory: [String],
    personalHistory: [String],
    eyeMeasurements: {
      rightEye: {
        distance: { SPH: String, CYL: String, Axis: String },
        addition: { SPH: String, CYL: String, Axis: String },
        readingOnly: { SPH: String, CYL: String, Axis: String },
      },
      leftEye: {
        distance: { SPH: String, CYL: String, Axis: String },
        addition: { SPH: String, CYL: String, Axis: String },
        readingOnly: { SPH: String, CYL: String, Axis: String },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.MedicalHistory ||
  mongoose.model("MedicalHistory", MedicalHistorySchema);

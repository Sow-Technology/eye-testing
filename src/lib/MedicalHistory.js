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
        SPH: String,
        CYL: String,
        Axis: String,
        additionalPower: String, // Additional Power for the right eye
        pupillaryDistance: String, // Pupillary Distance for the right eye
        NV: String, // Near Vision for the right eye
        DV: String, // Distance Vision for the right eye
      },
      leftEye: {
        SPH: String,
        CYL: String,
        Axis: String,
        additionalPower: String, // Additional Power for the left eye
        pupillaryDistance: String, // Pupillary Distance for the left eye
        NV: String, // Near Vision for the left eye
        DV: String, // Distance Vision for the left eye
      },
      multiFocal: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MedicalHistory ||
  mongoose.model("MedicalHistory", MedicalHistorySchema);

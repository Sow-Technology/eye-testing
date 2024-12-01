"use client";
import { useState } from "react";
import Survey from "../components/Survey";
import EyeMeasurementsTable from "../components/EyeMeasurementsTable";
import SuccessMessage from "../components/SuccessMessage";
import { toast } from "sonner";
import { surveyQuestions } from "@/lib/data";

export default function Main() {
  const [currentSet, setCurrentSet] = useState(0);
  const [showEyeMeasurements, setShowEyeMeasurements] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [answers, setAnswers] = useState({});
  const [eyeMeasurements, setEyeMeasurements] = useState({
    rightEye: {
      distance: { SPH: "", CYL: "", Axis: "" },
      addition: { SPH: "", CYL: "", Axis: "" },
      readingOnly: { SPH: "", CYL: "", Axis: "" },
    },
    leftEye: {
      distance: { SPH: "", CYL: "", Axis: "" },
      addition: { SPH: "", CYL: "", Axis: "" },
      readingOnly: { SPH: "", CYL: "", Axis: "" },
    },
  });

  const handleNextSet = (ans) => {
    setAnswers((prev) => ({ ...prev, ...ans }));
    if (currentSet < surveyQuestions.length - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      setShowEyeMeasurements(true);
    }
  };

  const handleEyeMeasurementsSubmit = async (measurements) => {
    setEyeMeasurements(measurements);
    await handleSubmit();
  };

  const handleSubmit = async () => {
    toast.loading("Submitting...", {
      id: "submit",
    });
    try {
      const response = await fetch("/api/submit-medical-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...answers, eyeMeasurements }),
      });
      const resData = await response.json();

      if (resData.success) {
        toast.success("Submitted!", {
          id: "submit",
        });
        setShowSuccess(true);
      } else {
        toast.error("Failed to submit medical history", {
          id: "submit",
        });
        // throw new Error("Failed to submit medical history");
      }
    } catch (error) {
      toast.error("Failed to submit medical history", {
        id: "submit",
      });

      console.error("Error submitting medical history:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        {!showEyeMeasurements && !showSuccess && (
          <Survey
            questionSet={surveyQuestions[currentSet]}
            onNext={handleNextSet}
            progress={((currentSet + 1) / surveyQuestions.length) * 100}
          />
        )}
        {showEyeMeasurements && !showSuccess && (
          <EyeMeasurementsTable onSubmit={handleEyeMeasurementsSubmit} />
        )}
        {showSuccess && (
          <SuccessMessage reward="Your medical history has been submitted successfully." />
        )}
      </div>
    </div>
  );
}

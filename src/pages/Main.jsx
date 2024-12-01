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
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [answers, setAnswers] = useState({});
  const [eyeMeasurements, setEyeMeasurements] = useState({
    rightEye: {
      SPH: "",
      CYL: "",
      Axis: "",
      NV: "",
      DV: "",
      additionalPower: "",
      pupillaryDistance: "",
    },
    leftEye: {
      SPH: "",
      CYL: "",
      Axis: "",
      NV: "",
      DV: "",
      additionalPower: "",
      pupillaryDistance: "",
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

  const handlePreviousSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };

  const handleEyeMeasurementsSubmit = (measurements) => {
    setEyeMeasurements(measurements);
    setShowPreview(true);
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
      }
    } catch (error) {
      toast.error("Failed to submit medical history", {
        id: "submit",
      });
      console.error("Error submitting medical history:", error);
    }
  };

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        {surveyQuestions.flat().map((question) => (
          <div key={question.id} className="border-b pb-4">
            <h3 className="font-semibold">{question.question}</h3>
            <p>{renderAnswer(question, answers[question.id])}</p>
          </div>
        ))}
        <div>
          <h3 className="font-semibold">Eye Measurements</h3>
          <pre>{JSON.stringify(eyeMeasurements, null, 2)}</pre>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setShowPreview(false);
              setShowEyeMeasurements(false);
              setCurrentSet(0);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const renderAnswer = (question, answer) => {
    if (!answer) return "Not answered";
    switch (question.type) {
      case "checkbox":
        return Array.isArray(answer) ? answer.join(", ") : answer;
      default:
        return answer;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        {!showEyeMeasurements && !showPreview && !showSuccess && (
          <Survey
            questionSet={surveyQuestions[currentSet]}
            onNext={handleNextSet}
            onPrevious={handlePreviousSet}
            progress={((currentSet + 1) / surveyQuestions.length) * 100}
            initialAnswers={answers}
            currentSet={currentSet}
          />
        )}
        {showEyeMeasurements && !showPreview && !showSuccess && (
          <EyeMeasurementsTable
            onSubmit={handleEyeMeasurementsSubmit}
            initialMeasurements={eyeMeasurements}
          />
        )}
        {showPreview && !showSuccess && renderPreview()}
        {showSuccess && (
          <SuccessMessage reward="Your medical history has been submitted successfully." />
        )}
      </div>
    </div>
  );
}

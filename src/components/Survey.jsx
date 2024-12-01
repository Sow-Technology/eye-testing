import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

export default function Survey({ questionSet, onNext, progress }) {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({}); // For tracking errors

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate answers before submitting
    const newErrors = {};
    questionSet.forEach((question) => {
      if (question.type === "mcq" && !answers[question.id]) {
        newErrors[question.id] = "Please select an option.";
      }
      if (
        question.type === "multi-select" &&
        (!answers[question.id] || answers[question.id].length === 0)
      ) {
        newErrors[question.id] = "Please select at least one option.";
      }
    });

    // If no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      onNext(answers);
      setAnswers({});
      setErrors({});
    } else {
      // If there are errors, set error messages
      setErrors(newErrors);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleMultiSelectChange = (id, option, isChecked) => {
    setAnswers((prev) => {
      const currentAnswers = prev[id] ? [...prev[id]] : [];
      if (isChecked) {
        return { ...prev, [id]: [...currentAnswers, option] };
      } else {
        return {
          ...prev,
          [id]: currentAnswers.filter((item) => item !== option),
        };
      }
    });
  };

  const renderQuestionInput = (question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
            required
          />
        );
      case "long":
        return (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Your answer"
            required
          />
        );
      case "mcq":
        return (
          <div>
            <RadioGroup
              value={
                answers[question.id]?.startsWith("Other:")
                  ? "other"
                  : answers[question.id]
              }
              onValueChange={(value) => {
                if (value !== "other") {
                  handleAnswerChange(question.id, value);
                } else {
                  handleAnswerChange(question.id, "Other:");
                }
              }}
              required
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`q${question.id}-option-${index}`}
                  />
                  <Label htmlFor={`q${question.id}-option-${index}`}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors[question.id] && (
              <p className="text-red-500">{errors[question.id]}</p>
            )}
          </div>
        );
      case "multi-select":
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-2",
                  option === "Other" && "hidden"
                )}
              >
                <Checkbox
                  id={`q${question.id}-option-${index}`}
                  checked={answers[question.id]?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    handleMultiSelectChange(question.id, option, checked);
                  }}
                />
                <Label htmlFor={`q${question.id}-option-${index}`}>
                  {option}
                </Label>
              </div>
            ))}
            {/* Render "Other" option */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`q${question.id}-option-other`}
                checked={answers[question.id]?.some((item) =>
                  item.startsWith("Other:")
                )}
                onCheckedChange={(checked) => {
                  handleMultiSelectChange(question.id, "Other:", checked);
                }}
              />
              <Label htmlFor={`q${question.id}-option-other`}>Other</Label>
              {answers[question.id]?.some((item) =>
                item.startsWith("Other:")
              ) && (
                <Input
                  type="text"
                  value={
                    answers[question.id]
                      ?.find((item) => item.startsWith("Other:"))
                      ?.slice(6) || ""
                  }
                  onChange={(e) => {
                    const otherValue = e.target.value;
                    setAnswers((prev) => {
                      const updatedAnswers = (prev[question.id] || []).map(
                        (item) =>
                          item.startsWith("Other:")
                            ? `Other:${otherValue}`
                            : item
                      );
                      return { ...prev, [question.id]: updatedAnswers };
                    });
                  }}
                  placeholder="Please specify"
                />
              )}
            </div>
            {errors[question.id] && (
              <p className="text-red-500">{errors[question.id]}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Survey Questions
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-5">
          {questionSet.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle>{question.question}</CardTitle>
              </CardHeader>
              <CardContent>{renderQuestionInput(question)}</CardContent>
            </Card>
          ))}
        </div>
        <Button type="submit">Next</Button>
      </form>
      <div className="mt-4 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

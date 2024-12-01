// components/EyeMeasurementsTable.js

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EyeMeasurementsTable({ onSubmit }) {
  const [measurements, setMeasurements] = useState({
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

  const handleInputChange = (eye, type, field, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [type]: {
          ...prev[eye][type],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(measurements);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Eye Measurements
      </h2>
      <form onSubmit={handleSubmit}>
        <table className="w-full mb-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              <th className="border border-gray-300 p-2" colSpan="3">
                Right Eye
              </th>
              <th className="border border-gray-300 p-2" colSpan="3">
                Left Eye
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              <th className="border border-gray-300 p-2">SPH</th>
              <th className="border border-gray-300 p-2">CYL</th>
              <th className="border border-gray-300 p-2">Axis</th>
              <th className="border border-gray-300 p-2">SPH</th>
              <th className="border border-gray-300 p-2">CYL</th>
              <th className="border border-gray-300 p-2">Axis</th>
            </tr>
          </thead>
          <tbody>
            {["distance", "addition", "readingOnly"].map((type) => (
              <tr key={type}>
                <td className="border border-gray-300 p-2 font-semibold">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </td>
                {["rightEye", "leftEye"].map((eye) =>
                  ["SPH", "CYL", "Axis"].map((field) => (
                    <td
                      key={`${eye}-${type}-${field}`}
                      className="border border-gray-300 p-2"
                    >
                      <Input
                        type="text"
                        value={measurements[eye][type][field]}
                        onChange={(e) =>
                          handleInputChange(eye, type, field, e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}

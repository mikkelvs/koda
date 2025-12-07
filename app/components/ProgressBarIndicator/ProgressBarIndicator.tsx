import { Check } from "lucide-react";
import { ProgressBarIndicatorProps } from "./ProgressBarIndicator.types";

export default function ProgressBarIndicator({
  totalSteps,
  currentStep,
}: ProgressBarIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((step, idx) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div
            key={step}
            className="flex items-center w-full last:w-auto mt-8 mb-8"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                ${isActive ? "border-gray-600 text-gray-600" : ""}
                ${
                  !isCompleted && !isActive
                    ? "border-gray-300 text-gray-500"
                    : ""
                }
              `}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : step}
            </div>

            {idx < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300
                  ${step < currentStep ? "bg-green-500" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

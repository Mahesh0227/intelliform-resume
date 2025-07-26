import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator = ({ steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                step.completed
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : step.current
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.completed ? <Check className="h-5 w-5" /> : step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium",
                step.current ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 transition-all duration-300",
                step.completed ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
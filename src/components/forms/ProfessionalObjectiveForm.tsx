import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfessionalObjective {
  summary: string;
}

interface ProfessionalObjectiveFormProps {
  data: ProfessionalObjective;
  onUpdate: (data: ProfessionalObjective) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProfessionalObjectiveForm = ({ data, onUpdate, onNext, onBack }: ProfessionalObjectiveFormProps) => {
  const [objective, setObjective] = useState(data);
  const { toast } = useToast();

  const handleGenerateAI = () => {
    const aiSuggestions = [
      "Dynamic software engineer with expertise in full-stack development, passionate about creating innovative solutions and driving technological advancement in fast-paced environments.",
      "Results-driven professional with strong analytical skills and experience in modern web technologies, seeking to contribute to impactful projects while continuously learning and growing.",
      "Dedicated developer with a passion for clean code, user experience, and collaborative problem-solving, aiming to leverage technical skills to create meaningful digital solutions."
    ];
    
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setObjective({ ...objective, summary: randomSuggestion });
    toast({
      title: "AI Suggestion Generated",
      description: "Professional objective has been generated. Feel free to customize it!",
    });
  };

  const handleSave = () => {
    onUpdate(objective);
    onNext();
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Professional Objective
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Career Summary</Label>
          <Textarea
            id="summary"
            placeholder="Write a compelling 2-3 line summary of your career goals, strengths, and experience..."
            value={objective.summary}
            onChange={(e) => setObjective({ ...objective, summary: e.target.value })}
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground">
            Tip: Keep it concise, professional, and tailored to your target role.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleGenerateAI}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate AI Suggestion
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleSave}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
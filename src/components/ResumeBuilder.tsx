import { useState } from "react";
import { Header } from "./Header";
import { StepIndicator } from "./StepIndicator";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ResumePreview } from "./ResumePreview";
import { Button } from "./ui/button";
import { Download, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photo?: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Programming" | "Web Technologies" | "Tools" | "Soft Skills";
}

export const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: ""
  });
  
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const steps = [
    { id: 1, title: "Personal Info", completed: currentStep > 1, current: currentStep === 1 },
    { id: 2, title: "Education", completed: currentStep > 2, current: currentStep === 2 },
    { id: 3, title: "Skills", completed: currentStep > 3, current: currentStep === 3 },
    { id: 4, title: "Preview", completed: false, current: currentStep === 4 }
  ];

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export feature coming soon!",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={personalInfo}
            onUpdate={setPersonalInfo}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={education}
            onUpdate={setEducation}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={skills}
            onUpdate={setSkills}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Resume Preview</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                >
                  Edit Resume
                </Button>
                <Button
                  variant="brand"
                  onClick={handleExportPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
            <ResumePreview
              personalInfo={personalInfo}
              education={education}
              skills={skills}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Preview Toggle */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="w-full"
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`space-y-8 ${showPreview ? "hidden md:block" : ""}`}>
            {currentStep < 4 && <StepIndicator steps={steps} />}
            {renderCurrentStep()}
          </div>

          {/* Preview Section */}
          <div className={`${!showPreview ? "hidden md:block" : ""}`}>
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Live Preview</h2>
              <div className="max-h-[80vh] overflow-y-auto">
                <ResumePreview
                  personalInfo={personalInfo}
                  education={education}
                  skills={skills}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
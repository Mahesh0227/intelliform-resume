import { useState } from "react";
import { Header } from "./Header";
import { StepIndicator } from "./StepIndicator";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ProfessionalObjectiveForm } from "./forms/ProfessionalObjectiveForm";
import { WorkExperienceForm } from "./forms/WorkExperienceForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { TemplateSelectionForm } from "./forms/TemplateSelectionForm";
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

interface ProfessionalObjective {
  summary: string;
}

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  current: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  githubUrl?: string;
  liveUrl?: string;
  role: string;
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  dateObtained: string;
  expiryDate?: string;
  credentialId?: string;
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
  
  const [professionalObjective, setProfessionalObjective] = useState<ProfessionalObjective>({
    summary: ""
  });
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const steps = [
    { id: 1, title: "Personal Info", completed: currentStep > 1, current: currentStep === 1 },
    { id: 2, title: "Objective", completed: currentStep > 2, current: currentStep === 2 },
    { id: 3, title: "Experience", completed: currentStep > 3, current: currentStep === 3 },
    { id: 4, title: "Projects", completed: currentStep > 4, current: currentStep === 4 },
    { id: 5, title: "Education", completed: currentStep > 5, current: currentStep === 5 },
    { id: 6, title: "Skills", completed: currentStep > 6, current: currentStep === 6 },
    { id: 7, title: "Certifications", completed: currentStep > 7, current: currentStep === 7 },
    { id: 8, title: "Template", completed: currentStep > 8, current: currentStep === 8 },
    { id: 9, title: "Preview", completed: false, current: currentStep === 9 }
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
          <ProfessionalObjectiveForm
            data={professionalObjective}
            onUpdate={setProfessionalObjective}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <WorkExperienceForm
            data={workExperience}
            onUpdate={setWorkExperience}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <ProjectsForm
            data={projects}
            onUpdate={setProjects}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <EducationForm
            data={education}
            onUpdate={setEducation}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        );
      case 6:
        return (
          <SkillsForm
            data={skills}
            onUpdate={setSkills}
            onNext={() => setCurrentStep(7)}
            onBack={() => setCurrentStep(5)}
          />
        );
      case 7:
        return (
          <CertificationsForm
            data={certifications}
            onUpdate={setCertifications}
            onNext={() => setCurrentStep(8)}
            onBack={() => setCurrentStep(6)}
          />
        );
      case 8:
        return (
          <TemplateSelectionForm
            selectedTemplate={selectedTemplate}
            onUpdate={setSelectedTemplate}
            onNext={() => setCurrentStep(9)}
            onBack={() => setCurrentStep(7)}
          />
        );
      case 9:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Resume Preview</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(8)}
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
              professionalObjective={professionalObjective}
              workExperience={workExperience}
              projects={projects}
              education={education}
              skills={skills}
              certifications={certifications}
              selectedTemplate={selectedTemplate}
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
            {currentStep < 9 && <StepIndicator steps={steps} />}
            {renderCurrentStep()}
          </div>

          {/* Preview Section */}
          <div className={`${!showPreview ? "hidden md:block" : ""}`}>
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Live Preview</h2>
              <div className="max-h-[80vh] overflow-y-auto">
                <ResumePreview
                  personalInfo={personalInfo}
                  professionalObjective={professionalObjective}
                  workExperience={workExperience}
                  projects={projects}
                  education={education}
                  skills={skills}
                  certifications={certifications}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

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

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onUpdate: (data: WorkExperience[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const WorkExperienceForm = ({ data, onUpdate, onNext, onBack }: WorkExperienceFormProps) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>(data);

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
      current: false
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addResponsibility = (expId: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { ...exp, responsibilities: [...exp.responsibilities, ""] }
        : exp
    ));
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            responsibilities: exp.responsibilities.map((resp, i) => 
              i === index ? value : resp
            )
          }
        : exp
    ));
  };

  const removeResponsibility = (expId: string, index: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            responsibilities: exp.responsibilities.filter((_, i) => i !== index)
          }
        : exp
    ));
  };

  const handleSave = () => {
    onUpdate(experiences);
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={addExperience} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>

          {experiences.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No work experience added yet. Click "Add Experience" to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <Card key={experience.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">Experience {index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`jobTitle-${experience.id}`}>Job Title</Label>
                      <Input
                        id={`jobTitle-${experience.id}`}
                        value={experience.jobTitle}
                        onChange={(e) => updateExperience(experience.id, "jobTitle", e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${experience.id}`}
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                        disabled={experience.current}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onCheckedChange={(checked) => {
                          updateExperience(experience.id, "current", checked);
                          if (checked) {
                            updateExperience(experience.id, "endDate", "");
                          }
                        }}
                      />
                      <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Key Responsibilities</Label>
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex gap-2">
                        <Textarea
                          value={responsibility}
                          onChange={(e) => updateResponsibility(experience.id, respIndex, e.target.value)}
                          placeholder="Describe your key responsibility or achievement..."
                          className="min-h-[60px]"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeResponsibility(experience.id, respIndex)}
                          disabled={experience.responsibilities.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addResponsibility(experience.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Responsibility
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-6">
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
    </div>
  );
};
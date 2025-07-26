import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EducationForm = ({ data, onUpdate, onNext, onBack }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(
    data.length > 0 ? data : [{ id: "1", degree: "", institution: "", location: "", startDate: "", endDate: "", grade: "" }]
  );

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: ""
    };
    const updated = [...educations, newEducation];
    setEducations(updated);
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      const updated = educations.filter(edu => edu.id !== id);
      setEducations(updated);
      onUpdate(updated);
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducations(updated);
    onUpdate(updated);
  };

  const isValid = educations.every(edu => 
    edu.degree && edu.institution && edu.startDate && edu.endDate
  );

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((education, index) => (
          <div key={education.id} className="p-6 border rounded-lg bg-gradient-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Education {index + 1}</h3>
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="e.g., B.Tech Computer Science"
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University/College name"
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${education.id}`}>Location</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                  placeholder="City, State"
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`grade-${education.id}`}>Grade/CGPA</Label>
                <Input
                  id={`grade-${education.id}`}
                  value={education.grade}
                  onChange={(e) => updateEducation(education.id, "grade", e.target.value)}
                  placeholder="e.g., 8.5 CGPA or 85%"
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Start Date *</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${education.id}`}>End Date *</Label>
                <Input
                  id={`endDate-${education.id}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addEducation}
          className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={onNext} 
            variant="brand" 
            size="lg"
            disabled={!isValid}
          >
            Continue to Skills
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
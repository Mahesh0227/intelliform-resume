import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photo?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onNext: () => void;
}

export const PersonalInfoForm = ({ data, onUpdate, onNext }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>(data);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updated = { ...formData, photo: e.target?.result as string };
        setFormData(updated);
        onUpdate(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Photo Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-elegant"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:scale-110 transition-transform shadow-elegant"
            >
              <Upload className="h-3 w-3" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-muted-foreground">Upload your profile photo</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="https://github.com/yourusername"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio Website</Label>
            <Input
              id="portfolio"
              value={formData.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
              placeholder="https://yourportfolio.com"
              className="transition-all duration-300 focus:shadow-glow"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={onNext} 
            variant="brand" 
            size="lg"
            disabled={!formData.fullName || !formData.email || !formData.phone}
          >
            Continue to Education
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
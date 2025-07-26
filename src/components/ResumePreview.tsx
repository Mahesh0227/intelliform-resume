import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Globe, Github, Linkedin, MapPin, Calendar, GraduationCap } from "lucide-react";

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

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
}

export const ResumePreview = ({ personalInfo, education, skills }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-yellow-100 text-yellow-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="max-w-4xl mx-auto animate-fade-in">
      <CardContent className="p-0">
        <div className="bg-gradient-primary text-primary-foreground p-8">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            {personalInfo.photo && (
              <img
                src={personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-foreground/20"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    <span className="truncate">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span className="truncate">{personalInfo.github}</span>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="truncate">{personalInfo.portfolio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                      </div>
                      {edu.grade && (
                        <div>
                          <span className="font-medium">Grade: {edu.grade}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Skills & Technologies</h2>
              <div className="space-y-4">
                {["Programming", "Web Technologies", "Tools", "Soft Skills"].map((category) => {
                  const categorySkills = getSkillsByCategory(category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="font-semibold mb-2 text-foreground">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="outline"
                            className={`${getLevelColor(skill.level)} border`}
                          >
                            {skill.name} ({skill.level})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Placeholder sections for future features */}
          <section className="border-t pt-6">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">More sections (Projects, Experience, Certifications) coming soon!</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          <p>Generated by MR Technologies Resume Builder</p>
        </div>
      </CardContent>
    </Card>
  );
};
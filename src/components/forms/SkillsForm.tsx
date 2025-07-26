import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Code, Plus, X } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Programming" | "Web Technologies" | "Tools" | "Soft Skills";
}

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SkillsForm = ({ data, onUpdate, onNext, onBack }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(data);
  const [newSkill, setNewSkill] = useState({ name: "", level: "", category: "" });

  const addSkill = () => {
    if (newSkill.name && newSkill.level && newSkill.category) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name,
        level: newSkill.level as Skill["level"],
        category: newSkill.category as Skill["category"]
      };
      const updated = [...skills, skill];
      setSkills(updated);
      onUpdate(updated);
      setNewSkill({ name: "", level: "", category: "" });
    }
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    setSkills(updated);
    onUpdate(updated);
  };

  const getSkillsByCategory = (category: Skill["category"]) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Intermediate": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Advanced": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const categories: Skill["category"][] = ["Programming", "Web Technologies", "Tools", "Soft Skills"];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Skills & Technologies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Skill */}
        <div className="p-6 border rounded-lg bg-gradient-subtle space-y-4">
          <h3 className="text-lg font-medium">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React, Python"
                className="transition-all duration-300 focus:shadow-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillCategory">Category</Label>
              <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Level</Label>
              <Select value={newSkill.level} onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={addSkill} 
                variant="brand"
                disabled={!newSkill.name || !newSkill.level || !newSkill.category}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
        </div>

        {/* Skills by Category */}
        {categories.map(category => {
          const categorySkills = getSkillsByCategory(category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map(skill => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className={`${getLevelColor(skill.level)} px-3 py-1 text-sm flex items-center gap-2 hover:scale-105 transition-transform`}
                  >
                    {skill.name}
                    <span className="text-xs">({skill.level})</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No skills added yet. Add your first skill above!</p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={onNext} 
            variant="brand" 
            size="lg"
            disabled={skills.length === 0}
          >
            Continue to Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
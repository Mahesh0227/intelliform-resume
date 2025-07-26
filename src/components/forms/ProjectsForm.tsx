import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Code, Plus, Trash2, ArrowLeft, ArrowRight, X } from "lucide-react";

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

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProjectsForm = ({ data, onUpdate, onNext, onBack }: ProjectsFormProps) => {
  const [projects, setProjects] = useState<Project[]>(data);
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      githubUrl: "",
      liveUrl: "",
      role: ""
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, technologies: [...project.technologies, tech] }
          : project
      ));
      setNewTech({ ...newTech, [projectId]: "" });
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            technologies: project.technologies.filter((_, i) => i !== techIndex)
          }
        : project
    ));
  };

  const handleSave = () => {
    onUpdate(projects);
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={addProject} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>

          {projects.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No projects added yet. Click "Add Project" to showcase your work.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card key={project.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">Project {index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                      <Input
                        id={`title-${project.id}`}
                        value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${project.id}`}>Your Role</Label>
                      <Input
                        id={`role-${project.id}`}
                        value={project.role}
                        onChange={(e) => updateProject(project.id, "role", e.target.value)}
                        placeholder="Frontend Developer, Team Lead, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${project.id}`}
                        type="date"
                        value={project.startDate}
                        onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${project.id}`}
                        type="date"
                        value={project.endDate}
                        onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`githubUrl-${project.id}`}>GitHub URL (optional)</Label>
                      <Input
                        id={`githubUrl-${project.id}`}
                        value={project.githubUrl}
                        onChange={(e) => updateProject(project.id, "githubUrl", e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`liveUrl-${project.id}`}>Live URL (optional)</Label>
                      <Input
                        id={`liveUrl-${project.id}`}
                        value={project.liveUrl}
                        onChange={(e) => updateProject(project.id, "liveUrl", e.target.value)}
                        placeholder="https://myproject.com"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor={`description-${project.id}`}>Description</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      placeholder="Describe what the project does, its purpose, and key features..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                          {tech}
                          <button
                            onClick={() => removeTechnology(project.id, techIndex)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTech[project.id] || ""}
                        onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                        placeholder="Add technology (React, Node.js, etc.)"
                        onKeyPress={(e) => e.key === 'Enter' && addTechnology(project.id)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => addTechnology(project.id)}
                        disabled={!newTech[project.id]?.trim()}
                      >
                        Add
                      </Button>
                    </div>
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
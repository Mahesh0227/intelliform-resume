import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowLeft, ArrowRight, Check } from "lucide-react";

interface TemplateSelectionFormProps {
  selectedTemplate: string;
  onUpdate: (template: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, modern design with gradient header and elegant typography",
    preview: "bg-gradient-to-br from-primary to-primary-dark text-white",
    features: ["Gradient Header", "Modern Typography", "Clean Layout", "ATS Friendly"]
  },
  {
    id: "classic",
    name: "Classic Corporate",
    description: "Traditional corporate style with professional color scheme",
    preview: "bg-slate-600 text-white",
    features: ["Professional Colors", "Traditional Layout", "Corporate Style", "Print Friendly"]
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and creative design perfect for designers and creatives",
    preview: "bg-gradient-to-br from-purple-600 to-pink-600 text-white",
    features: ["Creative Layout", "Bold Colors", "Designer Friendly", "Visual Impact"]
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Ultra-minimal design focusing on content and readability",
    preview: "bg-gray-100 text-gray-800 border-2 border-gray-300",
    features: ["Minimal Design", "Focus on Content", "High Readability", "Clean Typography"]
  }
];

export const TemplateSelectionForm = ({ selectedTemplate, onUpdate, onNext, onBack }: TemplateSelectionFormProps) => {
  const [selected, setSelected] = useState(selectedTemplate);

  const handleSave = () => {
    onUpdate(selected);
    onNext();
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Choose Resume Template
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selected === template.id 
                  ? "ring-2 ring-primary shadow-lg" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelected(template.id)}
            >
              <CardContent className="p-4">
                <div className="relative">
                  {selected === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  {/* Template Preview */}
                  <div className={`h-32 rounded-lg mb-4 ${template.preview} flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-sm font-bold">Your Name</div>
                      <div className="text-xs opacity-75">Preview Layout</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>More templates coming soon! Each template is ATS-friendly and professionally designed.</p>
        </div>

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
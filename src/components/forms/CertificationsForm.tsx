import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  organization: string;
  dateObtained: string;
  expiryDate?: string;
  credentialId?: string;
}

interface CertificationsFormProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CertificationsForm = ({ data, onUpdate, onNext, onBack }: CertificationsFormProps) => {
  const [certifications, setCertifications] = useState<Certification[]>(data);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      dateObtained: "",
      expiryDate: "",
      credentialId: ""
    };
    setCertifications([...certifications, newCertification]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleSave = () => {
    onUpdate(certifications);
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={addCertification} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>

          {certifications.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No certifications added yet. Click "Add Certification" to showcase your credentials.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {certifications.map((certification, index) => (
                <Card key={certification.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">Certification {index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCertification(certification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`title-${certification.id}`}>Certification Title</Label>
                      <Input
                        id={`title-${certification.id}`}
                        value={certification.title}
                        onChange={(e) => updateCertification(certification.id, "title", e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`organization-${certification.id}`}>Issuing Organization</Label>
                      <Input
                        id={`organization-${certification.id}`}
                        value={certification.organization}
                        onChange={(e) => updateCertification(certification.id, "organization", e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`dateObtained-${certification.id}`}>Date Obtained</Label>
                      <Input
                        id={`dateObtained-${certification.id}`}
                        type="date"
                        value={certification.dateObtained}
                        onChange={(e) => updateCertification(certification.id, "dateObtained", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`expiryDate-${certification.id}`}>Expiry Date (optional)</Label>
                      <Input
                        id={`expiryDate-${certification.id}`}
                        type="date"
                        value={certification.expiryDate}
                        onChange={(e) => updateCertification(certification.id, "expiryDate", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`credentialId-${certification.id}`}>Credential ID (optional)</Label>
                      <Input
                        id={`credentialId-${certification.id}`}
                        value={certification.credentialId}
                        onChange={(e) => updateCertification(certification.id, "credentialId", e.target.value)}
                        placeholder="ABC123456789"
                      />
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
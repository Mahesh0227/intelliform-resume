import { Building2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-primary shadow-elegant">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">MR TECHNOLOGIES</h1>
              <p className="text-sm text-primary-foreground/80">Resume Builder</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-foreground/80">TRAININGS - PLACEMENTS - SERVICES</p>
          </div>
        </div>
      </div>
    </header>
  );
};
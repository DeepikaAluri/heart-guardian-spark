import { useState } from "react";
import { LandingPage } from "@/components/landing/LandingPage";
import { AuthForms } from "@/components/auth/AuthForms";
import { HealthDataForm, HealthData } from "@/components/health/HealthDataForm";
import { PredictionDashboard } from "@/components/dashboard/PredictionDashboard";

type AppState = 'landing' | 'auth' | 'assessment' | 'dashboard';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  const handleGetStarted = () => {
    setCurrentState('auth');
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentState('assessment');
  };

  const handleHealthDataSubmit = (data: HealthData) => {
    setHealthData(data);
    setCurrentState('dashboard');
  };

  const handleNewAssessment = () => {
    setCurrentState('assessment');
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case 'auth':
        return <AuthForms onAuthSuccess={handleAuthSuccess} />;
      
      case 'assessment':
        return <HealthDataForm onSubmit={handleHealthDataSubmit} />;
      
      case 'dashboard':
        return user && healthData ? (
          <PredictionDashboard 
            healthData={healthData}
            user={user}
            onNewAssessment={handleNewAssessment}
          />
        ) : null;
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return renderCurrentScreen();
};

export default Index;

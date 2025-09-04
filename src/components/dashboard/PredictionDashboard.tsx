import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { AlertTriangle, Heart, Shield, Activity, TrendingUp, Calendar } from "lucide-react";
import { HealthData } from "../health/HealthDataForm";

interface PredictionResult {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  prediction: string;
  confidence: number;
  factors: RiskFactor[];
}

interface RiskFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface PredictionDashboardProps {
  healthData: HealthData;
  user: { name: string; email: string };
  onNewAssessment: () => void;
}

// Mock ML prediction function
function predictHeartAttackRisk(data: HealthData): PredictionResult {
  let riskScore = 0;
  const factors: RiskFactor[] = [];

  // Age factor
  if (data.age > 65) {
    riskScore += 25;
    factors.push({ name: 'Age', impact: 'negative', description: 'Age over 65 increases risk' });
  } else if (data.age > 45) {
    riskScore += 10;
    factors.push({ name: 'Age', impact: 'negative', description: 'Middle age increases risk slightly' });
  }

  // Blood pressure
  if (data.bloodPressureSystolic > 140 || data.bloodPressureDiastolic > 90) {
    riskScore += 20;
    factors.push({ name: 'Blood Pressure', impact: 'negative', description: 'High blood pressure detected' });
  }

  // Cholesterol
  if (data.cholesterol > 240) {
    riskScore += 15;
    factors.push({ name: 'Cholesterol', impact: 'negative', description: 'High cholesterol levels' });
  } else if (data.cholesterol < 200) {
    factors.push({ name: 'Cholesterol', impact: 'positive', description: 'Healthy cholesterol levels' });
  }

  // Heart rate
  if (data.heartRate > 100 || data.heartRate < 60) {
    riskScore += 10;
    factors.push({ name: 'Heart Rate', impact: 'negative', description: 'Abnormal heart rate detected' });
  }

  // Chest pain
  if (data.chestPainType === 'typical') {
    riskScore += 30;
    factors.push({ name: 'Chest Pain', impact: 'negative', description: 'Typical angina symptoms' });
  }

  // ECG
  if (data.ecgReading !== 'normal') {
    riskScore += 15;
    factors.push({ name: 'ECG', impact: 'negative', description: 'Abnormal ECG reading' });
  }

  let riskLevel: 'low' | 'medium' | 'high';
  let prediction: string;

  if (riskScore < 30) {
    riskLevel = 'low';
    prediction = 'Low risk of heart attack. Continue healthy lifestyle.';
  } else if (riskScore < 60) {
    riskLevel = 'medium';
    prediction = 'Moderate risk detected. Consult with healthcare provider.';
  } else {
    riskLevel = 'high';
    prediction = 'High risk detected. Seek immediate medical attention.';
  }

  return {
    riskLevel,
    riskScore: Math.min(riskScore, 100),
    prediction,
    confidence: 0.85 + Math.random() * 0.1,
    factors
  };
}

// Mock historical data
const generateHistoricalData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      riskScore: Math.floor(Math.random() * 40) + 20,
      heartRate: Math.floor(Math.random() * 20) + 70,
      bloodPressure: Math.floor(Math.random() * 30) + 120,
    });
  }
  return data;
};

export function PredictionDashboard({ healthData, user, onNewAssessment }: PredictionDashboardProps) {
  const prediction = predictHeartAttackRisk(healthData);
  const historicalData = generateHistoricalData();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'default';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <Shield className="h-6 w-6" />;
      case 'medium': return <Activity className="h-6 w-6" />;
      case 'high': return <AlertTriangle className="h-6 w-6" />;
      default: return <Heart className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="medical-outline" onClick={onNewAssessment}>
            New Assessment
          </Button>
        </div>

        {/* Risk Assessment Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full bg-${getRiskColor(prediction.riskLevel)}/10`}>
                  {getRiskIcon(prediction.riskLevel)}
                </div>
                <div>
                  <CardTitle className="text-2xl">Risk Assessment Result</CardTitle>
                  <CardDescription>
                    Generated on {new Date().toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={getRiskColor(prediction.riskLevel)} className="text-lg px-4 py-2">
                {prediction.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Risk Score</span>
                  <span className="text-sm font-medium">{prediction.riskScore}%</span>
                </div>
                <Progress value={prediction.riskScore} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Model Confidence</span>
                  <span className="text-sm font-medium">{(prediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <Progress value={prediction.confidence * 100} className="h-3" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-lg font-medium">{prediction.prediction}</p>
            </div>

            {/* Risk Factors */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Risk Factors Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prediction.factors.map((factor, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      factor.impact === 'positive' 
                        ? 'border-success bg-success-light/50' 
                        : factor.impact === 'negative'
                        ? 'border-high-risk bg-high-risk-light/50'
                        : 'border-muted bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{factor.name}</span>
                      <Badge variant={factor.impact === 'positive' ? 'success' : factor.impact === 'negative' ? 'danger' : 'secondary'} className="text-xs px-2 py-1">
                        {factor.impact === 'positive' ? '↓' : factor.impact === 'negative' ? '↑' : '→'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Risk Score Trend</CardTitle>
              <CardDescription>Your risk score over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="riskScore" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.1} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
              <CardDescription>Heart rate and blood pressure trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="hsl(var(--high-risk))" 
                    strokeWidth={2}
                    name="Heart Rate" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressure" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Systolic BP" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
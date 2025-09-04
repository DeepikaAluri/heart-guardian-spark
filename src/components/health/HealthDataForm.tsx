import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Activity, User, Heart, Droplets } from "lucide-react";

interface HealthDataFormProps {
  onSubmit: (data: HealthData) => void;
}

export interface HealthData {
  age: number;
  gender: 'male' | 'female';
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  cholesterol: number;
  chestPainType: 'typical' | 'atypical' | 'non-anginal' | 'asymptomatic';
  heartRate: number;
  ecgReading: 'normal' | 'st-t-abnormal' | 'lv-hypertrophy';
  bloodSugar: number;
  exerciseInducedAngina: boolean;
}

export function HealthDataForm({ onSubmit }: HealthDataFormProps) {
  const [formData, setFormData] = useState<HealthData>({
    age: 0,
    gender: 'male',
    bloodPressureSystolic: 0,
    bloodPressureDiastolic: 0,
    cholesterol: 0,
    chestPainType: 'asymptomatic',
    heartRate: 0,
    ecgReading: 'normal',
    bloodSugar: 0,
    exerciseInducedAngina: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof HealthData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-primary-light rounded-full">
              <Activity className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Health Assessment</CardTitle>
          <CardDescription>
            Enter your health parameters for heart attack risk prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Personal Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age || ''}
                      onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => updateField('gender', value)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-high-risk" />
                  <h3 className="font-semibold">Cardiovascular Metrics</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="systolic">Systolic BP</Label>
                      <Input
                        id="systolic"
                        type="number"
                        min="60"
                        max="250"
                        placeholder="120"
                        value={formData.bloodPressureSystolic || ''}
                        onChange={(e) => updateField('bloodPressureSystolic', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="diastolic">Diastolic BP</Label>
                      <Input
                        id="diastolic"
                        type="number"
                        min="40"
                        max="150"
                        placeholder="80"
                        value={formData.bloodPressureDiastolic || ''}
                        onChange={(e) => updateField('bloodPressureDiastolic', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                    <Input
                      id="heartRate"
                      type="number"
                      min="40"
                      max="220"
                      placeholder="72"
                      value={formData.heartRate || ''}
                      onChange={(e) => updateField('heartRate', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Laboratory Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="h-5 w-5 text-warning" />
                  <h3 className="font-semibold">Laboratory Results</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                    <Input
                      id="cholesterol"
                      type="number"
                      min="100"
                      max="500"
                      placeholder="200"
                      value={formData.cholesterol || ''}
                      onChange={(e) => updateField('cholesterol', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                    <Input
                      id="bloodSugar"
                      type="number"
                      min="50"
                      max="400"
                      placeholder="100"
                      value={formData.bloodSugar || ''}
                      onChange={(e) => updateField('bloodSugar', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Clinical Assessment</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Chest Pain Type</Label>
                    <Select
                      value={formData.chestPainType}
                      onValueChange={(value) => updateField('chestPainType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="typical">Typical Angina</SelectItem>
                        <SelectItem value="atypical">Atypical Angina</SelectItem>
                        <SelectItem value="non-anginal">Non-Anginal Pain</SelectItem>
                        <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>ECG Reading</Label>
                    <Select
                      value={formData.ecgReading}
                      onValueChange={(value) => updateField('ecgReading', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="st-t-abnormal">ST-T Abnormality</SelectItem>
                        <SelectItem value="lv-hypertrophy">LV Hypertrophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Exercise-Induced Angina</Label>
                    <RadioGroup
                      value={formData.exerciseInducedAngina ? 'yes' : 'no'}
                      onValueChange={(value) => updateField('exerciseInducedAngina', value === 'yes')}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="angina-no" />
                        <Label htmlFor="angina-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="angina-yes" />
                        <Label htmlFor="angina-yes">Yes</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" variant="hero" size="xl" className="min-w-48">
                Analyze Risk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
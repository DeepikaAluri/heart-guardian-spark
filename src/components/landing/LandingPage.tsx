import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Activity, Smartphone, Bell, BarChart3, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "AI-Powered Prediction",
      description: "Advanced machine learning algorithms trained on Cleveland Heart Disease dataset for accurate risk assessment."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Continuous health parameter tracking with IoT integration for comprehensive cardiac health monitoring."
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Instant Alerts",
      description: "Immediate notifications via SMS, email, and push notifications when high risk is detected."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Health Analytics",
      description: "Detailed charts and trends of your vital signs and risk factors over time."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "HIPAA Compliant",
      description: "Bank-level security ensuring your health data privacy and protection."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Ready",
      description: "Access your health dashboard anywhere with responsive mobile design."
    }
  ];

  const stats = [
    { number: "95%", label: "Prediction Accuracy" },
    { number: "10k+", label: "Lives Protected" },
    { number: "24/7", label: "Monitoring" },
    { number: "<1s", label: "Alert Response Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                  <Heart className="h-4 w-4" />
                  AI-Powered Healthcare
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Early Heart Attack
                  <span className="text-primary block">Prediction & Alert</span>
                  System
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Advanced IoT-based health monitoring with machine learning predictions. 
                  Get early warnings before it's too late and protect what matters most.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" onClick={onGetStarted}>
                  Start Health Assessment
                </Button>
                <Button variant="medical-outline" size="xl">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-3xl transform rotate-3"></div>
              <img
                src={heroImage}
                alt="Healthcare Technology"
                className="relative rounded-2xl shadow-2xl w-full h-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Advanced Healthcare Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive system combines cutting-edge AI, IoT devices, and medical expertise
              to provide accurate heart attack risk predictions and life-saving alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg w-fit text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, fast, and accurate heart attack risk assessment in three steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Input Health Data</h3>
              <p className="text-muted-foreground">
                Enter your vital signs, medical history, and current health parameters through our secure form.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced machine learning model analyzes your data using medical algorithms and patterns.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Results & Alerts</h3>
              <p className="text-muted-foreground">
                Receive instant risk assessment with personalized recommendations and emergency alerts if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Protect Your Heart Health Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't wait for symptoms. Get early detection and peace of mind with our advanced prediction system.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Start Free Assessment
            </Button>
            <Button variant="medical-outline" size="xl">
              Contact Healthcare Provider
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              FDA Guidelines
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Trusted by Professionals
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
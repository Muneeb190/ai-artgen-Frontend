import { Type, Zap, Download } from "lucide-react";

const steps = [
  {
    icon: Type,
    title: "Enter Your Prompt",
    description: "Describe the image you want to create. Be as creative and detailed as you like.",
    step: "01"
  },
  {
    icon: Zap,
    title: "AI Generates",
    description: "Our advanced AI processes your request and creates a unique, high-quality image in seconds.",
    step: "02"
  },
  {
    icon: Download,
    title: "Download & Save",
    description: "Get your stunning artwork instantly. Download in high resolution and share with the world.",
    step: "03"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Creating stunning AI artwork has never been easier. Just follow these three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Step connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-6 z-0" />
              )}
              
              <div className="card-ai text-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center glow-effect">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
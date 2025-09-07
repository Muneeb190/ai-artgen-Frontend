import { Zap, Image, Palette, Gift } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate stunning images in seconds, not hours. Our AI processes your requests at incredible speed."
  },
  {
    icon: Image,
    title: "High Quality",
    description: "Get crisp, detailed images in high resolution. Perfect for prints, social media, or professional use."
  },
  {
    icon: Palette,
    title: "Custom Styles",
    description: "From photorealistic to artistic styles. Choose from various art styles or let AI surprise you."
  },
  {
    icon: Gift,
    title: "Free to Try",
    description: "Start creating immediately with our free tier. No credit card required to get started."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose Our <span className="text-gradient">AI Generator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of image creation with cutting-edge AI technology and user-friendly design.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="card-ai text-center group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center glow-effect group-hover:rotate-12 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Decorative dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-600/30 rounded-full animate-pulse delay-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
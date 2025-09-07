import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-blue-600/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Ready to create amazing art?
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Start Creating Your{" "}
              <span className="text-gradient">Masterpiece</span>{" "}
              Today
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to bring their imagination to life. 
              Your next great artwork is just a prompt away.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-gradient text-xl px-12 py-8 glow-effect">
              Start Creating Now
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-12 py-8 border-2 hover:bg-primary/10">
              Learn More
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full border-2 border-background" />
                <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-background" />
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-background" />
              </div>
              <span>1M+ images created</span>
            </div>
            <div className="flex items-center gap-2">
              ⭐⭐⭐⭐⭐
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Active community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
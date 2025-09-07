import { Button } from "@/components/ui/button";
import heroArtwork from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 sm:pb-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Create{" "}
                <span className="text-gradient">Stunning Art</span>{" "}
                with AI
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                Transform your imagination into breathtaking visuals. Just describe what you envision, and watch our AI bring it to life in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to='/create'>
                <Button size="lg" className="btn-gradient text-lg px-10 py-6 glow-effect">
                  Generate Your Image
                </Button>
              </Link>
              <Link to='/gallery'>
                <Button className="text-lg px-10 py-6 hover:bg-primary/10 hover:scale-105 glow-effectt bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg">
                  View Full Gallery
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Free to try</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>High resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative">
              <img
                src={heroArtwork}
                alt="AI Generated Artwork Example"
                className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl glow-effect"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-2xl -z-10" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
              ✨ AI Generated
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce delay-500">
              🚀 In Seconds
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
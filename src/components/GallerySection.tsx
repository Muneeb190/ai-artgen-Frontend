import tokyo from "@/assets/tokyo.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import oldman from "@/assets/Parisian Morning Reflection.png";
import newyork from "@/assets/Misty Night in New York.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

const galleryImages = [
  {
    src: tokyo,
    alt: "A man wandering through the rainy streets of Tokyo",
    prompt: "A man wandering through the rainy streets of Tokyo, with bright neon signs, 50mm"
  },
  {
    src: newyork,
    alt: "Cyberpunk cityscape at night",
    prompt: "A lone traveler walking through the misty streets of New York at night, glowing street food stalls and colorful neon signs reflecting off wet pavement, cinematic 50mm lens"
  },
  {
    src: gallery3,
    alt: "Cosmic portrait with galaxy patterns",
    prompt: "Portrait of cosmic being with galaxy patterns in hair"
  },
  {
    src: gallery4,
    alt: "Abstract space nebula scene",
    prompt: "Abstract space scene with colorful nebulae and stars"
  },
  {
    src: gallery1,
    alt: "Glowing crystal cave",
    prompt: "Magical crystal cave with glowing purple gems"
  },
  {
    src: oldman,
    alt: "Underwater bioluminescent scene",
    prompt: "An elderly man sitting on a wooden bench at a quiet Paris café, steam rising from a cup of coffee"
  }
];

// Helper function for downloading images
const downloadImage = async (src: string, name: string) => {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = name || "artwork";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
};


const GallerySection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Showcase <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the incredible variety of artwork our AI can create. Each image was generated from a simple text prompt.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${index === 0
                  ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                  : index === 1
                    ? "col-span-2 md:col-span-2 md:row-span-1"
                    : index === 2
                      ? "col-span-1 md:col-span-1 md:row-span-2"
                      : index === 3
                        ? "col-span-1 md:col-span-1 md:row-span-1"
                        : index === 4
                          ? "col-span-2 md:col-span-2 md:row-span-1"
                          : "col-span-1 md:col-span-1 md:row-span-1"
                }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Download Button (only visible on hover) */}
              <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md cursor-pointer"
                  onClick={() => downloadImage(image.src, image.alt)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>


              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium mb-2">Prompt:</p>
                  <p className="text-xs opacity-90 leading-relaxed">
                    "{image.prompt}"
                  </p>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-blue-600/0 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <Link to="/gallery">
            <Button className="text-lg px-10 py-6 hover:bg-primary/10 hover:scale-105 glow-effectt bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

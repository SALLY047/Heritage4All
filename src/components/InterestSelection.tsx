import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InterestSelectionProps {
  onComplete: (interests: string[]) => void;
}

const interests = [
  {
    id: "clothing",
    title: "Clothing & Costumes",
    description: "Explore intricate traditional garments",
    image: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "makeup",
    title: "Makeup & Face Painting",
    description: "Discover the art of opera makeup",
    image: "https://images.unsplash.com/photo-1720238281653-d65fe0596a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYSUyMG1ha2V1cCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MDg0NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "venue",
    title: "Venues & Theaters",
    description: "Visit historic opera houses",
    image: "https://images.unsplash.com/photo-1567740704668-1cc0fd2ca2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdGhlYXRlciUyMHZlbnVlfGVufDF8fHx8MTc2MDg0NTk3NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "history",
    title: "History & Culture",
    description: "Learn the rich heritage of opera",
    image: "https://images.unsplash.com/photo-1718928484330-2d6d74b208db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNoaW5lc2UlMjBhcnR8ZW58MXx8fHwxNzYwODQ1OTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "music",
    title: "Music & Instruments",
    description: "Experience traditional opera music",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
  },
  {
    id: "performance",
    title: "Performance & Acting",
    description: "Watch master performers in action",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
  },
];

export function InterestSelection({ onComplete }: InterestSelectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full pt-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-red-900 mb-2">What Interests You?</h1>
          <p className="text-gray-600">
            Select at least 3 topics to personalize your experience
          </p>
        </div>

        {/* Interest Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className="relative group"
            >
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[3/4] border-4 transition-all ${
                  selectedInterests.includes(interest.id)
                    ? "border-red-600 scale-95"
                    : "border-transparent"
                }`}
              >
                <ImageWithFallback
                  src={interest.image}
                  alt={interest.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <h3 className="text-white text-sm mb-1">{interest.title}</h3>
                  <p className="text-white/80 text-xs line-clamp-2">
                    {interest.description}
                  </p>
                </div>

                {/* Check Mark */}
                {selectedInterests.includes(interest.id) && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Count */}
        <div className="text-center text-gray-600 text-sm mb-4">
          {selectedInterests.length} selected
          {selectedInterests.length < 3 && ` • Select ${3 - selectedInterests.length} more`}
        </div>
      </div>

      {/* Continue Button */}
      <div className="max-w-md mx-auto w-full pb-6">
        <Button
          onClick={() => onComplete(selectedInterests)}
          disabled={selectedInterests.length < 3}
          className="w-full bg-red-600 hover:bg-red-700"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

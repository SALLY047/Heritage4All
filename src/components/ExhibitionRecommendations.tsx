import { MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ExhibitionRecommendationsProps {
  interests: string[];
  onExhibitionSelect: (exhibitionId: string) => void;
}

const exhibitions = [
  {
    id: "1",
    title: "Masterpieces of Opera Costumes",
    location: "Hong Kong Heritage Museum",
    address: "1 Man Lam Road, Sha Tin",
    distance: "2.3 km",
    duration: "45 min",
    visitors: "200+",
    tags: ["clothing", "history"],
    image: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Explore 100+ years of traditional opera costumes",
  },
  {
    id: "2",
    title: "The Art of Opera Makeup",
    location: "Xiqu Centre",
    address: "88 Austin Road West, Tsim Sha Tsui",
    distance: "5.1 km",
    duration: "60 min",
    visitors: "150+",
    tags: ["makeup", "performance"],
    image: "https://images.unsplash.com/photo-1720238281653-d65fe0596a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYSUyMG1ha2V1cCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MDg0NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Interactive makeup demonstration and history",
  },
  {
    id: "3",
    title: "Historic Opera Venues",
    location: "Sunbeam Theatre",
    address: "423 King's Road, North Point",
    distance: "3.7 km",
    duration: "30 min",
    visitors: "100+",
    tags: ["venue", "history"],
    image: "https://images.unsplash.com/photo-1567740704668-1cc0fd2ca2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdGhlYXRlciUyMHZlbnVlfGVufDF8fHx8MTc2MDg0NTk3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Tour one of Hong Kong's last traditional theaters",
  },
  {
    id: "4",
    title: "Opera Through the Ages",
    location: "Hong Kong Museum of History",
    address: "100 Chatham Road South, Tsim Sha Tsui",
    distance: "4.5 km",
    duration: "90 min",
    visitors: "300+",
    tags: ["history", "music"],
    image: "https://images.unsplash.com/photo-1718928484330-2d6d74b208db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNoaW5lc2UlMjBhcnR8ZW58MXx8fHwxNzYwODQ1OTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A comprehensive journey through opera history",
  },
];

export function ExhibitionRecommendations({
  interests,
  onExhibitionSelect,
}: ExhibitionRecommendationsProps) {
  const getRecommendedExhibitions = () => {
    return exhibitions
      .map((exhibition) => ({
        ...exhibition,
        matchScore: exhibition.tags.filter((tag) => interests.includes(tag)).length,
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendedExhibitions = getRecommendedExhibitions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 p-6 pb-24">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-red-900 mb-2">Recommended For You</h1>
          <p className="text-gray-600">
            Exhibitions based on your interests
          </p>
        </div>

        {/* Exhibition List */}
        <div className="space-y-4">
          {recommendedExhibitions.map((exhibition) => (
            <button
              key={exhibition.id}
              onClick={() => onExhibitionSelect(exhibition.id)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
            >
              {/* Image */}
              <div className="relative h-48">
                <ImageWithFallback
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Match Badge */}
                {exhibition.matchScore > 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-600 text-white">
                      {Math.round((exhibition.matchScore / interests.length) * 100)}% Match
                    </Badge>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white">{exhibition.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-gray-600 text-sm">{exhibition.description}</p>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900">{exhibition.location}</div>
                    <div className="text-gray-500 text-xs">{exhibition.address}</div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {exhibition.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {exhibition.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {exhibition.visitors}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {exhibition.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={interests.includes(tag) ? "default" : "secondary"}
                      className={interests.includes(tag) ? "bg-red-100 text-red-700" : ""}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* View Button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-red-600">View Details</span>
                  <ChevronRight className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

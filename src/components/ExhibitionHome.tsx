import { MapPin, Clock, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ExhibitionHomeProps {
  interests: string[];
  onScanExhibit: () => void;
}

const featuredExhibitions = [
  {
    id: "1",
    title: "Masterpieces of Opera Costumes",
    location: "Hong Kong Heritage Museum",
    distance: "2.3 km",
    duration: "45 min",
    tags: ["clothing", "history"],
    image: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    title: "The Art of Opera Makeup",
    location: "Xiqu Centre",
    distance: "5.1 km",
    duration: "60 min",
    tags: ["makeup", "performance"],
    image: "https://images.unsplash.com/photo-1720238281653-d65fe0596a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYSUyMG1ha2V1cCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MDg0NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function ExhibitionHome({ interests, onScanExhibit }: ExhibitionHomeProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-red-900 mb-2">Discover Opera</h1>
          <p className="text-gray-600">
            Explore exhibitions near you
          </p>
        </div>

        {/* Scan CTA */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm opacity-90">Start Your Journey</span>
              </div>
              <h2 className="text-white mb-2">Scan Exhibits with NFC</h2>
              <p className="text-white/90 text-sm">
                Tap your phone on exhibit tags to unlock exclusive content
              </p>
            </div>
          </div>
          <Button
            onClick={onScanExhibit}
            className="w-full bg-white text-red-600 hover:bg-gray-100"
          >
            Start Scanning
          </Button>
        </div>

        {/* Recommended Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Recommended for You</h2>
            <button className="text-red-600 text-sm flex items-center gap-1">
              See All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {featuredExhibitions.map((exhibition) => (
              <div
                key={exhibition.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white mb-1">{exhibition.title}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <MapPin className="h-4 w-4" />
                      {exhibition.location}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exhibition.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {exhibition.duration}
                    </div>
                  </div>

                  <div className="flex gap-2">
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-xl text-left shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-gray-900">Nearby</div>
              <p className="text-sm text-gray-500">Find close exhibitions</p>
            </button>

            <button className="bg-white p-4 rounded-xl text-left shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-gray-900">Events</div>
              <p className="text-sm text-gray-500">Upcoming shows</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

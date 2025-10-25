import { useState } from "react";
import { ArrowLeft, Video, Play, Languages, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AIVideoPlayer } from "./AIVideoPlayer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface VideoLibraryProps {
  savedExhibits: any[];
  onBack: () => void;
}

const featuredVideos = [
  {
    id: "v1",
    title: "Introduction to Cantonese Opera Heritage",
    category: "Overview",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1545947288-c22ade2af79d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3NjExNDU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    image: "https://images.unsplash.com/photo-1545947288-c22ade2af79d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwdHJhZGl0aW9uYWwlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3NjExNDU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    languages: 11,
    description: "Explore the rich history and cultural significance of Cantonese opera through this AI-narrated introduction.",
  },
  {
    id: "v2",
    title: "The Art of Traditional Costumes",
    category: "Clothing & Costumes",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    image: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    languages: 11,
    description: "Discover the intricate designs and symbolic meanings behind traditional Cantonese opera costumes.",
  },
  {
    id: "v3",
    title: "Face Painting Techniques",
    category: "Makeup & Face Painting",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1760280825762-501279acee48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwb3BlcmElMjBtYWtldXB8ZW58MXx8fHwxNzYxMTQ1ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    image: "https://images.unsplash.com/photo-1760280825762-501279acee48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwb3BlcmElMjBtYWtldXB8ZW58MXx8fHwxNzYxMTQ1ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    languages: 11,
    description: "Learn about the traditional face painting methods that define character roles in Cantonese opera.",
  },
];

export function VideoLibrary({ savedExhibits, onBack }: VideoLibraryProps) {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Show video player if video is selected
  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedVideo(null)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-gray-900">Video Library</h2>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-6">
          <AIVideoPlayer exhibit={selectedVideo} />
          
          {/* Related Videos */}
          <div className="mt-8">
            <h3 className="text-gray-900 mb-4">More Videos</h3>
            <div className="grid grid-cols-1 gap-4">
              {featuredVideos
                .filter(v => v.id !== selectedVideo.id)
                .map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="flex gap-4 bg-white rounded-xl p-3 hover:shadow-md transition-shadow text-left"
                  >
                    <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1 line-clamp-2">{video.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{video.category}</p>
                      <Badge variant="secondary" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {video.languages} Languages
                      </Badge>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredVideos = featuredVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-gray-900">Video Library</h2>
            <p className="text-sm text-gray-600">AI-narrated content in 11 languages</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4"
          />
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Languages className="h-6 w-6" />
            <h3>Minority Language Support</h3>
          </div>
          <p className="text-white/90 mb-4">
            All videos include AI-generated narration and subtitles in 11 languages, including minority languages like Teochew, Hakka, Tamil, Urdu, and more.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              粵語 Cantonese
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              潮州話 Teochew
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              客家話 Hakka
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              தமிழ் Tamil
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              اردو Urdu
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 border-white/40">
              +6 more
            </Badge>
          </div>
        </div>

        {/* Featured Videos Grid */}
        <div>
          <h3 className="text-gray-900 mb-4">Featured Videos</h3>
          <div className="grid grid-cols-1 gap-4">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all text-left group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* AI Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      ✨ AI Generated
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Globe className="h-3 w-3" />
                      {video.languages} Languages
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Video className="h-3 w-3" />
                      HD
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Your Saved Exhibits */}
        {savedExhibits.length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4">Videos from Your Collection</h3>
            <div className="grid grid-cols-1 gap-4">
              {savedExhibits.slice(0, 3).map((exhibit) => (
                <button
                  key={exhibit.id}
                  onClick={() => setSelectedVideo(exhibit)}
                  className="flex gap-4 bg-white rounded-xl p-3 hover:shadow-md transition-shadow text-left"
                >
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={exhibit.image}
                      alt={exhibit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 mb-1 line-clamp-2">{exhibit.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {exhibit.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

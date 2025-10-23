import { useState } from "react";
import { Calendar, ChevronRight, Filter } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SavedExhibitsProps {
  savedExhibits: any[];
}

export function SavedExhibits({ savedExhibits }: SavedExhibitsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "clothing", "makeup", "venue", "history"];

  const filteredExhibits =
    selectedCategory === "all"
      ? savedExhibits
      : savedExhibits.filter((ex) =>
          ex.category.toLowerCase().includes(selectedCategory)
        );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-red-900 mb-2">My Collection</h1>
          <p className="text-gray-600">
            {savedExhibits.length} exhibit{savedExhibits.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Filter by category</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-gray-300"
                }
                size="sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Exhibits List */}
        {filteredExhibits.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-2">No Exhibits Yet</h2>
            <p className="text-gray-600 mb-6">
              Start scanning NFC tags at exhibitions to build your collection
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              Start Scanning
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExhibits.map((exhibit) => (
              <button
                key={exhibit.id + exhibit.scannedAt}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={exhibit.image}
                      alt={exhibit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-gray-900 line-clamp-2">
                        {exhibit.title}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                    
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {exhibit.category}
                    </Badge>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Scanned {formatDate(exhibit.scannedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
                  {exhibit.audioNarrative && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Play audio");
                      }}
                    >
                      Play Audio
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Share");
                    }}
                  >
                    Share
                  </Button>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Statistics */}
        {savedExhibits.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6">
            <h3 className="text-gray-900 mb-4">Your Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl text-red-600 mb-1">
                  {savedExhibits.length}
                </div>
                <div className="text-xs text-gray-600">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-red-600 mb-1">
                  {new Set(savedExhibits.map((e) => e.category)).size}
                </div>
                <div className="text-xs text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-red-600 mb-1">
                  {Math.floor(Math.random() * 50) + 10}%
                </div>
                <div className="text-xs text-gray-600">Collection</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Share2,
  BookmarkCheck,
  Wand2,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { AIVideoPlayer } from "./AIVideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ExhibitDetailProps {
  exhibit: any;
  onBack: () => void;
}

export function ExhibitDetail({ exhibit, onBack }: ExhibitDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // Mock 2-minute duration
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [ttsVoiceSpeed, setTtsVoiceSpeed] = useState([1.0]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Mock AI-generated narrative subtitles
  const subtitles = [
    { start: 0, end: 5, text: "Welcome to this fascinating exhibit." },
    { start: 5, end: 12, text: `This is ${exhibit.title}, a remarkable piece from Cantonese opera heritage.` },
    { start: 12, end: 18, text: `Dating back to the ${exhibit.era || "Qing Dynasty"}, this artifact showcases...` },
    { start: 18, end: 25, text: "The intricate craftsmanship demonstrates the high artistic standards of the period." },
    { start: 25, end: 32, text: `This belongs to the ${exhibit.category} category, representing an important aspect of opera culture.` },
    { start: 32, end: 40, text: "Notice the detailed patterns and vibrant colors that were traditional markers of status." },
    { start: 40, end: 48, text: "Each element carries symbolic meaning, from prosperity to good fortune." },
    { start: 48, end: 55, text: "The preservation of such items allows us to connect with our cultural roots." },
    { start: 55, end: 65, text: "Modern technology now enables us to share these treasures with a global audience." },
    { start: 65, end: 120, text: "Thank you for exploring this piece of Cantonese opera history with us." },
  ];

  // Update current subtitle based on time
  useEffect(() => {
    if (isPlaying && showSubtitles) {
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime < sub.end
      );
      setCurrentSubtitle(currentSub?.text || "");
    } else {
      setCurrentSubtitle("");
    }
  }, [currentTime, isPlaying, showSubtitles]);

  // Handle audio playback simulation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  // Text-to-Speech functionality
  const speakDescription = () => {
    if (!isTTSEnabled) {
      setIsTTSEnabled(true);
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const text = `${exhibit.title}. ${exhibit.description || `This is a ${exhibit.category} exhibit from the Cantonese opera collection. It represents an important piece of cultural heritage, showcasing the artistic excellence and traditional craftsmanship of the era.`}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = ttsVoiceSpeed[0];
      utterance.volume = volume[0] / 100;
      utterance.lang = "en-US"; // Can be changed based on user's language preference
      
      utterance.onend = () => {
        setIsTTSEnabled(false);
      };
      
      utterance.onerror = () => {
        setIsTTSEnabled(false);
        toast.error("Text-to-speech failed");
      };
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      
      toast.success("Text-to-speech started");
    } else {
      // Stop TTS
      window.speechSynthesis.cancel();
      setIsTTSEnabled(false);
      toast.info("Text-to-speech stopped");
    }
  };

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success("AI Audio Narrative playing");
    }
  };

  const handleShare = () => {
    toast.success("Share feature coming soon!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-gray-900 line-clamp-1">{exhibit.title}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Media Tabs - Video and Image */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="video" className="gap-2">
              <Video className="h-4 w-4" />
              AI Video
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <ImageWithFallback
                src=""
                alt=""
                className="h-4 w-4"
              />
              Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="mt-0">
            {/* AI Video Player */}
            <AIVideoPlayer exhibit={exhibit} />
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={exhibit.image}
                alt={exhibit.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-600 hover:bg-red-700">
                  {exhibit.category}
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Features Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-red-600">
            <Wand2 className="h-5 w-5" />
            <h3>AI-Powered Features</h3>
          </div>

          {/* Audio Narrative Player */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Audio Narrative</span>
              <Badge variant="secondary" className="text-xs">
                AI Generated
              </Badge>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                onClick={togglePlayPause}
                className="rounded-full h-12 w-12 bg-red-600 hover:bg-red-700"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              {volume[0] === 0 ? (
                <VolumeX className="h-4 w-4 text-gray-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-gray-500" />
              )}
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 w-10 text-right">
                {volume[0]}%
              </span>
            </div>

            {/* Subtitles Toggle */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Subtitles className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">AI Subtitles</span>
              </div>
              <Switch checked={showSubtitles} onCheckedChange={setShowSubtitles} />
            </div>

            {/* Subtitle Display */}
            {showSubtitles && isPlaying && (
              <div className="bg-gray-900/90 text-white text-sm p-4 rounded-lg min-h-[60px] flex items-center justify-center text-center">
                {currentSubtitle || "..."}
              </div>
            )}
          </div>

          {/* Text-to-Speech */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Text-to-Speech</span>
              <Badge variant="secondary" className="text-xs">
                AI Voice
              </Badge>
            </div>

            {/* TTS Speed Control */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Voice Speed</span>
                <span>{ttsVoiceSpeed[0].toFixed(1)}x</span>
              </div>
              <Slider
                value={ttsVoiceSpeed}
                min={0.5}
                max={2.0}
                step={0.1}
                onValueChange={setTtsVoiceSpeed}
              />
            </div>

            <Button
              onClick={speakDescription}
              className={`w-full ${
                isTTSEnabled
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {isTTSEnabled ? "Stop Reading" : "Read Description Aloud"}
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-gray-900">About This Exhibit</h3>
          <p className="text-gray-600 leading-relaxed">
            {exhibit.description ||
              `This ${exhibit.category} exhibit represents an important piece of Cantonese opera cultural heritage. The intricate details and craftsmanship showcase the artistic excellence of traditional Chinese performing arts. Each element has been carefully preserved to maintain its historical significance and educational value.`}
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <div className="font-medium text-gray-900">{exhibit.category}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Era</div>
              <div className="font-medium text-gray-900">
                {exhibit.era || "Qing Dynasty"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Location</div>
              <div className="font-medium text-gray-900">
                {exhibit.location || "Hong Kong Heritage Museum"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Scanned</div>
              <div className="font-medium text-gray-900">
                {new Date(exhibit.scannedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Related Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-4">Related Exhibits</h3>
          <div className="text-sm text-gray-600 text-center py-8">
            Discover more items in the {exhibit.category} category
          </div>
        </div>
      </div>
    </div>
  );
}

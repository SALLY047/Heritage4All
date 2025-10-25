import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Camera, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfileSetupProps {
  onComplete: (profile: ProfileData) => void;
}

export interface ProfileData {
  username: string;
  profilePicture: string;
  features: {
    aiAudioNarrative: boolean;
    aiSubtitles: boolean;
    textToSpeech: boolean;
  };
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [features, setFeatures] = useState({
    aiAudioNarrative: true,
    aiSubtitles: true,
    textToSpeech: false,
  });

  const handleImageUpload = () => {
    // Simulate image upload
    const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username || "user"}`;
    setProfilePic(defaultAvatar);
  };

  const handleSubmit = () => {
    if (username.trim()) {
      onComplete({
        username,
        profilePicture: profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        features,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-red-900 mb-2">Set Up Your Profile</h1>
          <p className="text-gray-600">
            Personalize your opera experience
          </p>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profilePic ? (
                <ImageWithFallback
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <button
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Tap to upload photo</p>
        </div>

        {/* Username */}
        <div className="space-y-2 mb-8">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="bg-white"
          />
        </div>

        {/* Features */}
        <div className="space-y-4 bg-white p-6 rounded-xl">
          <h3 className="text-gray-900 mb-4">Enable Features</h3>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex-1">
              <div className="text-gray-900">AI Audio Narrative</div>
              <p className="text-sm text-gray-500">
                Listen to AI-generated descriptions
              </p>
            </div>
            <Switch
              checked={features.aiAudioNarrative}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, aiAudioNarrative: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex-1">
              <div className="text-gray-900">AI Subtitles</div>
              <p className="text-sm text-gray-500">
                Real-time subtitles for performances
              </p>
            </div>
            <Switch
              checked={features.aiSubtitles}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, aiSubtitles: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="text-gray-900">Text-to-Speech</div>
              <p className="text-sm text-gray-500">
                Convert text content to audio
              </p>
            </div>
            <Switch
              checked={features.textToSpeech}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, textToSpeech: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="max-w-md mx-auto w-full pb-6">
        <Button
          onClick={handleSubmit}
          disabled={!username.trim()}
          className="w-full bg-red-600 hover:bg-red-700"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

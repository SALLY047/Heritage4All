import { useState } from "react";
import { Home, Scan, BookmarkCheck, User, Video } from "lucide-react";
import { ExhibitionHome } from "./ExhibitionHome";
import { NFCScanner } from "./NFCScanner";
import { SavedExhibits } from "./SavedExhibits";
import { UserProfile } from "./UserProfile";
import { SettingsScreen } from "./SettingsScreen";
import { VideoLibrary } from "./VideoLibrary";
import type { ProfileData } from "./ProfileSetup";

interface MainAppProps {
  profile: ProfileData;
  interests: string[];
  savedExhibits: any[];
  currentLanguage: string;
  onSaveExhibit: (exhibit: any) => void;
  onUpdateProfile: (profile: ProfileData) => void;
  onUpdateLanguage: (language: string) => void;
}

type TabType = "home" | "scan" | "saved" | "videos" | "profile";

export function MainApp({ 
  profile, 
  interests, 
  savedExhibits, 
  currentLanguage,
  onSaveExhibit,
  onUpdateProfile,
  onUpdateLanguage 
}: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <SettingsScreen
        profile={profile}
        currentLanguage={currentLanguage}
        onBack={() => setShowSettings(false)}
        onUpdateProfile={onUpdateProfile}
        onUpdateLanguage={onUpdateLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
      {/* Content */}
      <div className="pb-20">
        {activeTab === "home" && (
          <ExhibitionHome interests={interests} onScanExhibit={() => setActiveTab("scan")} />
        )}
        {activeTab === "scan" && (
          <NFCScanner onExhibitScanned={onSaveExhibit} />
        )}
        {activeTab === "saved" && (
          <SavedExhibits savedExhibits={savedExhibits} />
        )}
        {activeTab === "videos" && (
          <VideoLibrary 
            savedExhibits={savedExhibits}
            onBack={() => setActiveTab("home")}
          />
        )}
        {activeTab === "profile" && (
          <UserProfile 
            profile={profile} 
            interests={interests}
            currentLanguage={currentLanguage}
            onOpenSettings={() => setShowSettings(true)}
            savedExhibitsCount={savedExhibits.length}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-around px-3 py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home" ? "text-red-600" : "text-gray-400"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("scan")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "scan" ? "text-red-600" : "text-gray-400"
            }`}
          >
            <Scan className="h-6 w-6" />
            <span className="text-xs">Scan</span>
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "videos" ? "text-red-600" : "text-gray-400"
            }`}
          >
            <Video className="h-6 w-6" />
            <span className="text-xs">Videos</span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "saved" ? "text-red-600" : "text-gray-400"
            }`}
          >
            <BookmarkCheck className="h-6 w-6" />
            <span className="text-xs">Saved</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "profile" ? "text-red-600" : "text-gray-400"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

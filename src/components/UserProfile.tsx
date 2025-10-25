import { Settings, ChevronRight, Globe, Bell, HelpCircle, LogOut } from "lucide-react";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { ProfileData } from "./ProfileSetup";

interface UserProfileProps {
  profile: ProfileData;
  interests: string[];
  currentLanguage: string;
  onOpenSettings: () => void;
  savedExhibitsCount: number;
}

const languageNames: { [key: string]: string } = {
  en: "English",
  "zh-HK": "中文",
  "zh-CN": "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  ar: "العربية",
  hi: "हिन्दी",
  th: "ไทย",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  tl: "Tagalog",
};

export function UserProfile({ profile, interests, currentLanguage, onOpenSettings, savedExhibitsCount }: UserProfileProps) {
  const interestLabels: { [key: string]: string } = {
    clothing: "Clothing & Costumes",
    makeup: "Makeup & Face Painting",
    venue: "Venues & Theaters",
    history: "History & Culture",
    music: "Music & Instruments",
    performance: "Performance & Acting",
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-red-900">Profile</h1>
          <button onClick={onOpenSettings} className="text-gray-600">
            <Settings className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={profile.profilePicture}
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{profile.username}</h2>
              <p className="text-gray-600 text-sm">Opera Enthusiast</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-red-600 mb-1">{savedExhibitsCount}</div>
              <div className="text-xs text-gray-600">Exhibits</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 mb-1">{Math.max(1, Math.ceil(savedExhibitsCount / 3))}</div>
              <div className="text-xs text-gray-600">Visits</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 mb-1">{Math.min(savedExhibitsCount, 5)}</div>
              <div className="text-xs text-gray-600">Badges</div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-gray-900 mb-4">Your Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} className="bg-red-100 text-red-700">
                {interestLabels[interest] || interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          <button 
            onClick={onOpenSettings}
            className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Settings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Language & Features</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Notifications</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl text-red-600 hover:bg-red-50 transition-colors shadow-sm">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

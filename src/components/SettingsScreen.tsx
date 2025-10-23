import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import type { ProfileData } from "./ProfileSetup";

interface SettingsScreenProps {
  profile: ProfileData;
  currentLanguage: string;
  onBack: () => void;
  onUpdateProfile: (profile: ProfileData) => void;
  onUpdateLanguage: (language: string) => void;
}

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "zh-HK", name: "Traditional Chinese", nativeName: "中文", flag: "🇭🇰" },
  { code: "zh-CN", name: "Simplified Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭" },
];

export function SettingsScreen({
  profile,
  currentLanguage,
  onBack,
  onUpdateProfile,
  onUpdateLanguage,
}: SettingsScreenProps) {
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [tempLanguage, setTempLanguage] = useState(currentLanguage);
  const [features, setFeatures] = useState(profile.features);

  const currentLangData = languages.find((l) => l.code === currentLanguage);

  const handleFeatureChange = (featureName: keyof typeof features, value: boolean) => {
    const newFeatures = { ...features, [featureName]: value };
    setFeatures(newFeatures);
    onUpdateProfile({
      ...profile,
      features: newFeatures,
    });
  };

  const handleLanguageConfirm = () => {
    onUpdateLanguage(tempLanguage);
    setShowLanguageDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-gray-900">Settings</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Language Settings */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-gray-900">Language & Region</h2>
            </div>
            
            <button
              onClick={() => setShowLanguageDialog(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentLangData?.flag}</span>
                <div className="text-left">
                  <div className="text-gray-900">Language</div>
                  <div className="text-sm text-gray-500">{currentLangData?.nativeName}</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Feature Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 mb-4">Features</h2>
            
            <div className="space-y-4">
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
                    handleFeatureChange("aiAudioNarrative", checked)
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
                    handleFeatureChange("aiSubtitles", checked)
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
                    handleFeatureChange("textToSpeech", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 mb-4">About</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">App Name</span>
                <span className="text-gray-900">Heritage4All 粵韻同遊</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="text-gray-900">1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selection Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTempLanguage(lang.code)}
                  className={`w-full p-3 rounded-lg border transition-all ${
                    tempLanguage === lang.code
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-gray-900 text-sm">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                    {tempLanguage === lang.code && (
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setTempLanguage(currentLanguage);
                setShowLanguageDialog(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLanguageConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

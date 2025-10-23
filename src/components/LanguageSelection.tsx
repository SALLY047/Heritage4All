import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

interface LanguageSelectionProps {
  onComplete: (language: string) => void;
  initialLanguage?: string;
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

export function LanguageSelection({ onComplete, initialLanguage }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full pt-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-red-900 mb-2">Choose Your Language</h1>
          <p className="text-gray-600">
            Select your preferred language for the app
          </p>
        </div>

        {/* Language Options - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: "calc(100vh - 280px)" }}>
          <div className="space-y-3 pb-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedLanguage === lang.code
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{lang.nativeName}</div>
                    <div className="text-sm text-gray-500">{lang.name}</div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="max-w-md mx-auto w-full pb-6">
        <Button
          onClick={() => onComplete(selectedLanguage)}
          className="w-full bg-red-600 hover:bg-red-700"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

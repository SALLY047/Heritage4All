import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { LanguageSelection } from "./components/LanguageSelection";
import { ProfileSetup, ProfileData } from "./components/ProfileSetup";
import { InterestSelection } from "./components/InterestSelection";
import { ExhibitionRecommendations } from "./components/ExhibitionRecommendations";
import { MainApp } from "./components/MainApp";

type OnboardingStep =
  | "login"
  | "language"
  | "profile"
  | "interests"
  | "recommendations"
  | "main";

function App() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("login");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [savedExhibits, setSavedExhibits] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("operaAppData");
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.completed) {
        setSelectedLanguage(data.language);
        setProfile(data.profile);
        setInterests(data.interests);
        setSavedExhibits(data.savedExhibits || []);
        setCurrentStep("main");
      }
    }
  }, []);

  // Save data to localStorage
  const saveToLocalStorage = (data: any) => {
    localStorage.setItem("operaAppData", JSON.stringify(data));
  };

  const handleLoginComplete = () => {
    setCurrentStep("language");
  };

  const handleLanguageComplete = (language: string) => {
    setSelectedLanguage(language);
    setCurrentStep("profile");
  };

  const handleProfileComplete = (profileData: ProfileData) => {
    setProfile(profileData);
    setCurrentStep("interests");
  };

  const handleInterestsComplete = (selectedInterests: string[]) => {
    setInterests(selectedInterests);
    setCurrentStep("recommendations");
  };

  const handleExhibitionSelect = (exhibitionId: string) => {
    // Show main app after viewing recommendations
    setShowRecommendations(false);
    setTimeout(() => {
      setCurrentStep("main");
      saveToLocalStorage({
        completed: true,
        language: selectedLanguage,
        profile,
        interests,
        savedExhibits,
      });
    }, 300);
  };

  const handleSaveExhibit = (exhibit: any) => {
    setSavedExhibits((prev) => {
      const updated = [...prev, exhibit];
      saveToLocalStorage({
        completed: true,
        language: selectedLanguage,
        profile,
        interests,
        savedExhibits: updated,
      });
      return updated;
    });
  };

  const handleUpdateProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
    saveToLocalStorage({
      completed: true,
      language: selectedLanguage,
      profile: updatedProfile,
      interests,
      savedExhibits,
    });
  };

  const handleUpdateLanguage = (language: string) => {
    setSelectedLanguage(language);
    saveToLocalStorage({
      completed: true,
      language,
      profile,
      interests,
      savedExhibits,
    });
  };

  return (
    <div className="min-h-screen">
      {currentStep === "login" && (
        <LoginScreen onLoginComplete={handleLoginComplete} />
      )}

      {currentStep === "language" && (
        <LanguageSelection onComplete={handleLanguageComplete} />
      )}

      {currentStep === "profile" && (
        <ProfileSetup onComplete={handleProfileComplete} />
      )}

      {currentStep === "interests" && (
        <InterestSelection onComplete={handleInterestsComplete} />
      )}

      {currentStep === "recommendations" && (
        <ExhibitionRecommendations
          interests={interests}
          onExhibitionSelect={handleExhibitionSelect}
        />
      )}

      {currentStep === "main" && profile && (
        <MainApp
          profile={profile}
          interests={interests}
          savedExhibits={savedExhibits}
          currentLanguage={selectedLanguage}
          onSaveExhibit={handleSaveExhibit}
          onUpdateProfile={handleUpdateProfile}
          onUpdateLanguage={handleUpdateLanguage}
        />
      )}
    </div>
  );
}

export default App;

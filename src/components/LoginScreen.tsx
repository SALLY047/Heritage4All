import { Button } from "./ui/button";
import { Chrome, Apple, Facebook } from "lucide-react";

interface LoginScreenProps {
  onLoginComplete: () => void;
}

export function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
    setTimeout(() => {
      onLoginComplete();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-4xl">粵</span>
          </div>
          <h1 className="text-red-900">Heritage4All</h1>
          <div className="text-red-700">粵韻同遊</div>
          <p className="text-gray-600">
            Discover the Art of Cantonese Opera
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 pt-8">
          <Button
            onClick={() => handleSocialLogin("Google")}
            className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => handleSocialLogin("Apple")}
            className="w-full bg-black text-white hover:bg-gray-900"
            size="lg"
          >
            <Apple className="mr-2 h-5 w-5" />
            Continue with Apple
          </Button>

          <Button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            size="lg"
          >
            <Facebook className="mr-2 h-5 w-5" />
            Continue with Facebook
          </Button>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-gray-500 pt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Scan, CheckCircle2, Info } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NFCScannerProps {
  onExhibitScanned: (exhibit: any) => void;
}

const mockExhibits = [
  {
    id: "ex1",
    title: "Ceremonial Dragon Robe",
    category: "Clothing & Costumes",
    era: "Qing Dynasty (1800s)",
    description: "An exquisite ceremonial robe worn by lead performers in traditional Cantonese opera. Features intricate embroidery with dragon motifs symbolizing power and nobility.",
    image: "https://images.unsplash.com/photo-1653039424081-9606f31d2a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW50b25lc2UlMjBvcGVyYSUyMGNvc3R1bWV8ZW58MXx8fHwxNzYwODQ1OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    details: [
      "Material: Silk brocade with gold thread",
      "Weight: 3.5 kg",
      "Colors: Red, gold, and blue representing different character roles",
      "Origin: Guangdong Province",
    ],
    audioNarrative: true,
  },
  {
    id: "ex2",
    title: "Warrior Face Paint Pattern",
    category: "Makeup & Face Painting",
    era: "Traditional Style",
    description: "Traditional Cantonese opera face painting demonstrating the 'Jing' (painted face) role. Each color and pattern represents specific character traits and emotions.",
    image: "https://images.unsplash.com/photo-1720238281653-d65fe0596a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYSUyMG1ha2V1cCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MDg0NTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    details: [
      "Red represents loyalty and bravery",
      "Black signifies integrity and toughness",
      "Application time: 2-3 hours",
      "Uses natural mineral-based pigments",
    ],
    audioNarrative: true,
  },
];

export function NFCScanner({ onExhibitScanned }: NFCScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedExhibit, setScannedExhibit] = useState<any>(null);

  const simulateScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const randomExhibit = mockExhibits[Math.floor(Math.random() * mockExhibits.length)];
      const exhibitWithTimestamp = {
        ...randomExhibit,
        scannedAt: new Date().toISOString(),
        // Add AI features metadata
        hasAudioNarrative: true,
        hasSubtitles: true,
        hasTTS: true,
        location: "Hong Kong Heritage Museum",
      };
      
      setScannedExhibit(exhibitWithTimestamp);
      setIsScanning(false);
      onExhibitScanned(exhibitWithTimestamp);
    }, 2000);
  };

  const resetScanner = () => {
    setScannedExhibit(null);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-red-900 mb-2">NFC Scanner</h1>
          <p className="text-gray-600">
            Tap your phone on exhibit NFC tags
          </p>
        </div>

        {!scannedExhibit ? (
          <>
            {/* Scanner Interface */}
            <div className="bg-white rounded-3xl p-8 mb-6 shadow-lg">
              <div className="flex flex-col items-center">
                {/* Scanner Animation */}
                <div
                  className={`relative w-48 h-48 mb-6 ${
                    isScanning ? "animate-pulse" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-red-100 rounded-full opacity-20" />
                  <div className="absolute inset-4 bg-red-200 rounded-full opacity-30" />
                  <div className="absolute inset-8 bg-red-300 rounded-full opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-24 h-24 bg-red-600 rounded-full flex items-center justify-center ${
                        isScanning ? "scale-110" : "scale-100"
                      } transition-transform`}
                    >
                      <Scan className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6">
                  <h2 className="text-gray-900 mb-2">
                    {isScanning ? "Scanning..." : "Ready to Scan"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isScanning
                      ? "Hold your phone near the NFC tag"
                      : "Tap the button below to simulate scanning"}
                  </p>
                </div>

                {/* Scan Button */}
                <Button
                  onClick={simulateScan}
                  disabled={isScanning}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  {isScanning ? "Scanning..." : "Simulate NFC Scan"}
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-blue-900 mb-1">How to scan</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Look for NFC tags near exhibits</li>
                    <li>• Hold your phone close to the tag</li>
                    <li>• Wait for the confirmation</li>
                    <li>• View detailed information instantly</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Scanned Result */
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-green-900">Exhibit Scanned!</h3>
                <p className="text-sm text-green-700">
                  Added to your saved collection
                </p>
              </div>
            </div>

            {/* Exhibit Details */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <ImageWithFallback
                  src={scannedExhibit.image}
                  alt={scannedExhibit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white/80 text-sm mb-1">
                    {scannedExhibit.category}
                  </div>
                  <h2 className="text-white">{scannedExhibit.title}</h2>
                  <div className="text-white/90 text-sm mt-1">
                    {scannedExhibit.era}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-700">{scannedExhibit.description}</p>

                <div className="border-t pt-4">
                  <h3 className="text-gray-900 mb-3">Details</h3>
                  <ul className="space-y-2">
                    {scannedExhibit.details.map((detail: string, index: number) => (
                      <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {scannedExhibit.audioNarrative && (
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Play Audio Narrative
                  </Button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={resetScanner}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Scan Another
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                View in Collection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Subtitles,
  Languages,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface VideoPlayerProps {
  exhibit: any;
  videoUrl?: string;
}

// Mock subtitle data in different languages
const subtitleTracks = {
  english: [
    { start: 0, end: 4, text: "Welcome to the Cantonese Opera Heritage Collection." },
    { start: 4, end: 8, text: "This magnificent artifact represents centuries of cultural tradition." },
    { start: 8, end: 12, text: "Notice the intricate embroidery and vibrant colors." },
    { start: 12, end: 16, text: "Each element carries deep symbolic meaning." },
    { start: 16, end: 20, text: "The craftsmanship showcases exceptional skill and artistry." },
    { start: 20, end: 24, text: "These treasures connect us to our ancestors' legacy." },
    { start: 24, end: 28, text: "Thank you for exploring this piece of cultural heritage." },
  ],
  cantonese: [
    { start: 0, end: 4, text: "歡迎嚟到粵劇文化遺產展覽。" },
    { start: 4, end: 8, text: "呢件精美嘅文物代表咗幾百年嘅文化傳統。" },
    { start: 8, end: 12, text: "留意呢啲精緻嘅刺繡同鮮豔嘅顏色。" },
    { start: 12, end: 16, text: "每個元素都蘊含深厚嘅象徵意義。" },
    { start: 16, end: 20, text: "工藝展現咗超卓嘅技巧同藝術性。" },
    { start: 20, end: 24, text: "呢啲寶藏將我哋同祖先嘅遺產聯繫埋一齊。" },
    { start: 24, end: 28, text: "多謝你探索呢件文化遺產。" },
  ],
  mandarin: [
    { start: 0, end: 4, text: "欢迎来到粤剧文化遗产展览。" },
    { start: 4, end: 8, text: "这件精美的文物代表了几百年的文化传统。" },
    { start: 8, end: 12, text: "请注意这些精致的刺绣和鲜艳的色彩。" },
    { start: 12, end: 16, text: "每个元素都蕴含深厚的象征意义。" },
    { start: 16, end: 20, text: "工艺展现了卓越的技巧和艺术性。" },
    { start: 20, end: 24, text: "这些珍品将我们与祖先的遗产联系在一起。" },
    { start: 24, end: 28, text: "感谢您探索这件文化遗产。" },
  ],
  teochew: [
    { start: 0, end: 4, text: "歡迎來到粵劇文化遺產展覽。(潮州话)" },
    { start: 4, end: 8, text: "這件精美个文物代表幾百年个文化傳統。" },
    { start: 8, end: 12, text: "請留意這啲精緻个刺繡佮鮮豔个色彩。" },
    { start: 12, end: 16, text: "逐個元素攏有深厚个象徵意義。" },
    { start: 16, end: 20, text: "工藝展現超群个技巧佮藝術性。" },
    { start: 20, end: 24, text: "這啲珍寶連接阮佮祖先个遺產。" },
    { start: 24, end: 28, text: "多謝你探索這件文化遺產。" },
  ],
  hakka: [
    { start: 0, end: 4, text: "歡迎來到粵劇文化遺產展覽。(客家话)" },
    { start: 4, end: 8, text: "這件精美个文物代表幾百年个文化傳統。" },
    { start: 8, end: 12, text: "請注意這兜精緻个刺繡同鮮豔个顏色。" },
    { start: 12, end: 16, text: "每個元素都含蓄深厚个象徵意義。" },
    { start: 16, end: 20, text: "手藝展現優秀个技巧同藝術性。" },
    { start: 20, end: 24, text: "這兜珍品連接吾等同祖先个遺產。" },
    { start: 24, end: 28, text: "感謝你探索這件文化遺產。" },
  ],
  spanish: [
    { start: 0, end: 4, text: "Bienvenido a la Colección de Patrimonio de Ópera Cantonesa." },
    { start: 4, end: 8, text: "Este magnífico artefacto representa siglos de tradición cultural." },
    { start: 8, end: 12, text: "Observe el bordado intrincado y los colores vibrantes." },
    { start: 12, end: 16, text: "Cada elemento lleva un profundo significado simbólico." },
    { start: 16, end: 20, text: "La artesanía muestra habilidad y arte excepcionales." },
    { start: 20, end: 24, text: "Estos tesoros nos conectan con el legado de nuestros ancestros." },
    { start: 24, end: 28, text: "Gracias por explorar esta pieza del patrimonio cultural." },
  ],
  french: [
    { start: 0, end: 4, text: "Bienvenue à la Collection du Patrimoine de l'Opéra Cantonais." },
    { start: 4, end: 8, text: "Cet artefact magnifique représente des siècles de tradition culturelle." },
    { start: 8, end: 12, text: "Remarquez la broderie complexe et les couleurs vibrantes." },
    { start: 12, end: 16, text: "Chaque élément porte une signification symbolique profonde." },
    { start: 16, end: 20, text: "L'artisanat démontre une compétence et un art exceptionnels." },
    { start: 20, end: 24, text: "Ces trésors nous relient à l'héritage de nos ancêtres." },
    { start: 24, end: 28, text: "Merci d'avoir exploré cette pièce du patrimoine culturel." },
  ],
  vietnamese: [
    { start: 0, end: 4, text: "Chào mừng đến với Bộ sưu tập Di sản Hát bội Quảng Đông." },
    { start: 4, end: 8, text: "Hiện vật tuyệt đẹp này đại diện cho nhiều thế kỷ truyền thống văn hóa." },
    { start: 8, end: 12, text: "Hãy chú ý đến những họa tiết thêu phức tạp và màu sắc rực rỡ." },
    { start: 12, end: 16, text: "Mỗi yếu tố mang ý nghĩa biểu tượng sâu sắc." },
    { start: 16, end: 20, text: "Tay nghề thể hiện kỹ năng và nghệ thuật đặc biệt." },
    { start: 20, end: 24, text: "Những kho báu này kết nối chúng ta với di sản tổ tiên." },
    { start: 24, end: 28, text: "Cảm ơn bạn đã khám phá di sản văn hóa này." },
  ],
  tagalog: [
    { start: 0, end: 4, text: "Maligayang pagdating sa Koleksyon ng Pamana ng Cantonese Opera." },
    { start: 4, end: 8, text: "Ang kahanga-hangang artifact na ito ay kumakatawan sa mga siglo ng tradisyong kultural." },
    { start: 8, end: 12, text: "Pansinin ang masalimuot na burda at makulay na mga kulay." },
    { start: 12, end: 16, text: "Bawat elemento ay may malalim na simbolikong kahulugan." },
    { start: 16, end: 20, text: "Ang pagkakagawa ay nagpapakita ng pambihirang kasanayan at sining." },
    { start: 20, end: 24, text: "Ang mga kayamanang ito ay nag-uugnay sa atin sa pamana ng ating mga ninuno." },
    { start: 24, end: 28, text: "Salamat sa pagtuklas ng bahaging ito ng pamana ng kultura." },
  ],
  tamil: [
    { start: 0, end: 4, text: "கான்டோனீஸ் ஓபரா பாரம்பரிய சேகரிப்புக்கு வரவேற்கிறோம்." },
    { start: 4, end: 8, text: "இந்த அற்புதமான கலைப்பொருள் பல நூற்றாண்டுகளின் கலாச்சார பாரம்பரியத்தை பிரதிநிதித்துவப்படுத்துகிறது." },
    { start: 8, end: 12, text: "சிக்கலான எம்ப்ராய்டரி மற்றும் துடிப்பான நிறங்களை கவனியுங்கள்." },
    { start: 12, end: 16, text: "ஒவ்வொரு உறுப்பும் ஆழமான குறியீட்டு அர்த்தத்தைக் கொண்டுள்ளது." },
    { start: 16, end: 20, text: "கைவினை விதிவிலக்கான திறமை மற்றும் கலையை வெளிப்படுத்துகிறது." },
    { start: 20, end: 24, text: "இந்த பொக்கிஷங்கள் நம் முன்னோர்களின் பாரம்பரியத்துடன் இணைக்கின்றன." },
    { start: 24, end: 28, text: "இந்த கலாச்சார பாரம்பரியத்தை ஆராய்ந்ததற்கு நன்றி." },
  ],
  urdu: [
    { start: 0, end: 4, text: "کانٹونیز اوپیرا ورثہ مجموعہ میں خوش آمدید۔" },
    { start: 4, end: 8, text: "یہ شاندار نمونہ صدیوں کی ثقافتی روایت کی نمائندگی کرتا ہے۔" },
    { start: 8, end: 12, text: "پیچیدہ کڑھائی اور متحرک رنگوں کو نوٹ کریں۔" },
    { start: 12, end: 16, text: "ہر عنصر گہرا علامتی معنی رکھتا ہے۔" },
    { start: 16, end: 20, text: "دستکاری غیر معمولی مہارت اور فن کو ظاہر کرتی ہے۔" },
    { start: 20, end: 24, text: "یہ خزانے ہمیں اپنے آباؤ اجداد کی میراث سے جوڑتے ہیں۔" },
    { start: 24, end: 28, text: "ثقافتی ورثے کے اس حصے کو دریافت کرنے کا شکریہ۔" },
  ],
};

const languages = [
  { code: "english", name: "English", flag: "🇬🇧" },
  { code: "cantonese", name: "粵語 Cantonese", flag: "🇭🇰" },
  { code: "mandarin", name: "普通话 Mandarin", flag: "🇨🇳" },
  { code: "teochew", name: "潮州話 Teochew", flag: "🌏" },
  { code: "hakka", name: "客家話 Hakka", flag: "🌏" },
  { code: "spanish", name: "Español", flag: "🇪🇸" },
  { code: "french", name: "Français", flag: "🇫🇷" },
  { code: "vietnamese", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "tagalog", name: "Tagalog", flag: "🇵🇭" },
  { code: "tamil", name: "தமிழ் Tamil", flag: "🇮🇳" },
  { code: "urdu", name: "اردو Urdu", flag: "🇵🇰" },
];

export function AIVideoPlayer({ exhibit, videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(28); // 28 seconds demo video
  const [volume, setVolume] = useState([80]);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedAudioTrack, setSelectedAudioTrack] = useState("english");
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Update current subtitle based on time and selected language
  useEffect(() => {
    if (showSubtitles) {
      const subtitles = subtitleTracks[selectedLanguage as keyof typeof subtitleTracks] || subtitleTracks.english;
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.start && currentTime < sub.end
      );
      setCurrentSubtitle(currentSub?.text || "");
    } else {
      setCurrentSubtitle("");
    }
  }, [currentTime, showSubtitles, selectedLanguage]);

  // Simulate video playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
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

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
    setShowControls(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Mock video preview image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover opacity-60"
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                size="icon"
                onClick={togglePlayPause}
                className="h-20 w-20 rounded-full bg-red-600 hover:bg-red-700 transition-all hover:scale-110"
              >
                <Play className="h-10 w-10 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* AI Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            ✨ AI Generated
          </Badge>
        </div>

        {/* Language Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-black/70 text-white border-white/20">
            {languages.find(l => l.code === selectedAudioTrack)?.flag} {languages.find(l => l.code === selectedAudioTrack)?.name}
          </Badge>
        </div>

        {/* Subtitles */}
        {showSubtitles && currentSubtitle && (
          <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center px-4">
            <div 
              className="bg-black/90 text-white px-6 py-3 rounded-lg max-w-[90%] text-center"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              <p className="leading-relaxed">{currentSubtitle}</p>
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/80 mt-1 px-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <Button
                size="icon"
                variant="ghost"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setVolume(volume[0] === 0 ? [80] : [0])}
                >
                  {volume[0] === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <div className="w-20 hidden sm:block">
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                  />
                </div>
              </div>

              {/* Time Display */}
              <span className="text-white text-sm hidden md:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Subtitle Language */}
              <Popover open={showLanguageMenu} onOpenChange={setShowLanguageMenu}>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Subtitle Language"
                  >
                    <Subtitles className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Subtitle Language</h3>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start mb-1 ${
                          !showSubtitles ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          setShowSubtitles(false);
                          setShowLanguageMenu(false);
                        }}
                      >
                        <span className="mr-2">❌</span>
                        Off
                      </Button>
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant="ghost"
                          className={`w-full justify-between mb-1 ${
                            selectedLanguage === lang.code && showSubtitles
                              ? "bg-red-50 text-red-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setShowSubtitles(true);
                            setShowLanguageMenu(false);
                          }}
                        >
                          <span>
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name}
                          </span>
                          {selectedLanguage === lang.code && showSubtitles && (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* Audio Track */}
              <Popover open={showAudioMenu} onOpenChange={setShowAudioMenu}>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Audio Language"
                  >
                    <Languages className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Audio Track</h3>
                    <p className="text-xs text-gray-500 mt-1">AI-Generated Narration</p>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="p-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant="ghost"
                          className={`w-full justify-between mb-1 ${
                            selectedAudioTrack === lang.code
                              ? "bg-red-50 text-red-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedAudioTrack(lang.code);
                            setShowAudioMenu(false);
                          }}
                        >
                          <span>
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name}
                          </span>
                          {selectedAudioTrack === lang.code && (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              {/* Settings */}
              <Popover open={showSettings} onOpenChange={setShowSettings}>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium">Quality</h4>
                      <Button variant="outline" className="w-full justify-between" size="sm">
                        Auto (720p)
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Speed</h4>
                      <Button variant="outline" className="w-full justify-between" size="sm">
                        Normal
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Fullscreen */}
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info Below Player */}
      <div className="bg-white p-4 space-y-3">
        <div>
          <h3 className="text-gray-900 mb-1">{exhibit.title}</h3>
          <p className="text-sm text-gray-600">
            AI-Generated Educational Content • {languages.find(l => l.code === selectedAudioTrack)?.name} Audio
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">AI Narration</Badge>
          <Badge variant="secondary">11 Languages</Badge>
          <Badge variant="secondary">HD Quality</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Minority Languages Supported
          </Badge>
        </div>
      </div>
    </div>
  );
}

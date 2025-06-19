"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  ImageIcon,
  FileText,
  Copy,
  Volume2,
  RotateCcw,
  Zap,
  X,
  Camera,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import CameraTranslation from "@/components/camera-translation";
import { useSearchParams } from "next/navigation";
import { translationAPI } from "@/utils/translationAPI";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Language = "hieroglyph" | "english" | "arabic";

interface ITranslationHistory {
  id: string;
  from: Language;
  to: Language;
  originalText: string;
  translatedText: string;
  timestamp: string;
}

const languages = [
  { value: "hieroglyph", label: "Hieroglyph" },
  { value: "english", label: "English" },
  { value: "arabic", label: "Arabic" },
];

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCXBLLr9AdkUotagl6SAHMfGZtAdUAwRp8";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export default function TranslatePage() {
  const searchParams = useSearchParams();
  const initialMode = searchParams?.get("mode") === "camera" ? "camera" : "text";
  const { toast } = useToast();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [activeTab, setActiveTab] = useState(initialMode);
  const [fromLanguage, setFromLanguage] = useState<Language>("hieroglyph");
  const [toLanguage, setToLanguage] = useState<Language>("english");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);
  const [history, setHistory] = useState<ITranslationHistory[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageTranslating, setIsImageTranslating] = useState(false);
  const [imageResult, setImageResult] = useState<any | null>(null);

  const documentInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript + " ";
            }
          }
          if (transcript) {
            setInputText((prev) => prev + transcript);
          }
        };

        recognitionInstance.onend = () => {
          setIsRecording(false);
          setRecordingTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
          setRecordingTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        setRecognition(recognitionInstance);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Load translation history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("translation_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading translation history:", error);
      }
    }
  }, []);

  // Save translation history to localStorage
  const saveHistory = (newHistory: ITranslationHistory[]) => {
    localStorage.setItem("translation_history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const createTranslationPrompt = (
    text: string,
    from: Language,
    to: Language
  ): string => {
    const prompts = {
      "hieroglyph-english": `You are an expert Egyptologist and hieroglyph translator. Translate the following hieroglyphic symbols into clear, accurate English. Provide only the translation without explanations: "${text}"`,
      "hieroglyph-arabic": `You are an expert Egyptologist and hieroglyph translator. Translate the following hieroglyphic symbols into clear, accurate Arabic. Provide only the translation without explanations: "${text}"`,
      "english-hieroglyph": `You are an expert Egyptologist. Convert the following English text into authentic hieroglyphic symbols. Use actual Unicode hieroglyphic characters. Provide only the hieroglyphic symbols without explanations: "${text}"`,
      "arabic-hieroglyph": `You are an expert Egyptologist. Convert the following Arabic text into authentic hieroglyphic symbols. Use actual Unicode hieroglyphic characters. Provide only the hieroglyphic symbols without explanations: "${text}"`,
      "english-arabic": `Translate the following English text into accurate, natural Arabic. Provide only the translation: "${text}"`,
      "arabic-english": `Translate the following Arabic text into accurate, natural English. Provide only the translation: "${text}"`,
    };

    const key = `${from}-${to}` as keyof typeof prompts;
    return prompts[key] || `Translate from ${from} to ${to}: "${text}"`;
  };

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1000,
            stopSequences: [],
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API request failed: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts
      ) {
        return data.candidates[0].content.parts[0].text.trim();
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);

      // If it's a network error or API error, provide a fallback
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error: Please check your internet connection");
      }

      throw error;
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text to translate.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);

    try {
      const prompt = createTranslationPrompt(
        inputText.trim(),
        fromLanguage,
        toLanguage
      );
      const translation = await callGeminiAPI(prompt);

      setTranslatedText(translation);

      // Add to history
      const newTranslation: ITranslationHistory = {
        id: Date.now().toString(),
        from: fromLanguage,
        to: toLanguage,
        originalText: inputText.trim(),
        translatedText: translation,
        timestamp: new Date().toLocaleString(),
      };

      const updatedHistory = [newTranslation, ...history.slice(0, 19)]; // Keep last 20 translations
      saveHistory(updatedHistory);

      toast({
        title: "Translation Complete",
        description: "Text has been successfully translated.",
      });
    } catch (error) {
      console.error("Translation error:", error);

      let errorMessage = "Unable to translate text. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Network error")) {
          errorMessage =
            "Network error: Please check your internet connection.";
        } else if (error.message.includes("API request failed: 401")) {
          errorMessage = "API authentication failed. Please check the API key.";
        } else if (error.message.includes("API request failed: 403")) {
          errorMessage =
            "API access forbidden. Please check your API permissions.";
        } else if (error.message.includes("API request failed: 429")) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        }
      }

      toast({
        title: "Translation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
    setInputText("");
    setTranslatedText("");
  };

  const handleFromLanguageChange = (value: Language) => {
    if (value === toLanguage) {
      setToLanguage(fromLanguage);
    }
    setFromLanguage(value);
    setInputText("");
    setTranslatedText("");
  };

  const handleToLanguageChange = (value: Language) => {
    if (value === fromLanguage) {
      setFromLanguage(toLanguage);
    }
    setToLanguage(value);
    setTranslatedText("");
  };

  const handleVoiceInput = () => {
    if (fromLanguage === "hieroglyph") {
      toast({
        title: "Voice Input Unavailable",
        description: "Voice input is not available for hieroglyphs.",
        variant: "destructive",
      });
      return;
    }

    if (!recognition) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setRecordingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      try {
        recognition.lang = fromLanguage === "arabic" ? "ar-SA" : "en-US";
        recognition.start();
        setIsRecording(true);

        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast({
          title: "Recording Failed",
          description: "Failed to start speech recognition.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDocumentUpload = () => {
    documentInputRef.current?.click();
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Document Processing",
        description: "Document parsing will be implemented in a future update.",
      });
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      toast({
        title: "Copied",
        description: "Translation copied to clipboard.",
      });
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      console.log("Available voices:", availableVoices.map(v => ({
        name: v.name,
        lang: v.lang,
        localService: v.localService
      })));
      setVoices(availableVoices);
    };

    // Load voices immediately if available
    loadVoices();

    // Also handle the voiceschanged event
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handlePronounce = () => {
    if (!translatedText || toLanguage === "hieroglyph") return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(translatedText);
    
    // Set language code
    utterance.lang = toLanguage === "arabic" ? "ar-SA" : "en-US";
    
    // Find the best voice for the selected language
    const voice = voices.find(
      (v) => v.lang.startsWith(toLanguage === "arabic" ? "ar" : "en") && !v.localService
    ) || voices.find(
      (v) => v.lang.startsWith(toLanguage === "arabic" ? "ar" : "en")
    );
    
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn(`No suitable voice found for ${toLanguage === "arabic" ? "Arabic" : "English"}`);
    }

    // Optimize speech parameters
    utterance.rate = 0.9; // Slightly slower than default (1.0)
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0; // Full volume

    // Error handling
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      toast({
        title: "Speech Error",
        description: "Failed to play speech. Please try again.",
        variant: "destructive",
      });
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getAvailableLanguages = (
    currentLanguage: Language,
    isTarget: boolean
  ) => {
    return languages.filter((lang) =>
      isTarget ? lang.value !== fromLanguage : lang.value !== toLanguage
    );
  };

  const handleImageTranslate = async () => {
    if (!imageFile) {
      toast({ title: "No Image Selected", description: "Please choose an image file to translate.", variant: "destructive" });
      return;
    }

    setIsImageTranslating(true);
    setImageResult(null); // Clear previous results

    try {
      // This function from your translationAPI will send the image file
      // and the direction ('left' or 'right') to your backend.
      const result = await translationAPI.translateImage(imageFile, "left"); // Assuming 'left' for now
      
      // The result is the full JSON object from your Python API
      setImageResult(result);
      
      toast({ title: "Translation Complete", description: "Image processed successfully." });

    } catch (err: any) {
      toast({ title: "Translation Failed", description: err.message || "Could not process the image.", variant: "destructive" });
    } finally {
      setIsImageTranslating(false);
    }
  };

  return (
    <div className="p-4 space-y-6 sm:mx-auto sm:p-0 sm:px-20 sm:py-12 sm:mt-20">
      <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">
        Translate
      </h1>

      <Tabs defaultValue="text" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-4">
          {/* Language Selection */}
          <div className="flex space-x-2">
            <Select
              value={fromLanguage}
              onValueChange={handleFromLanguageChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableLanguages(fromLanguage, false).map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" onClick={handleSwapLanguages}>
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Select value={toLanguage} onValueChange={handleToLanguageChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableLanguages(toLanguage, true).map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <Textarea
              placeholder="Enter text to translate"
              className="min-h-[100px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              dir={fromLanguage === "arabic" ? "rtl" : "ltr"}
            />

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                disabled={fromLanguage === "hieroglyph"}
                className={isRecording ? "border-red-500 bg-red-500/10" : ""}
              >
                <Mic className="h-4 w-4" />
                {isRecording && (
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-background border px-2 py-1 rounded-md">
                    {formatTime(recordingTime)}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDocumentUpload}
              >
                <FileText className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setInputText("")}
                disabled={!inputText.trim()}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
              >
                <Zap className="mr-2 h-4 w-4" />
                {isTranslating ? "Translating..." : "Translate"}
              </Button>
            </div>
          </div>

          {/* Output Area */}
          {translatedText && (
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Translation</h3>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePronounce}
                      disabled={toLanguage === "hieroglyph"}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  <p
                    className="text-sm break-words whitespace-pre-wrap"
                    dir={toLanguage === "arabic" ? "rtl" : "ltr"}
                  >
                    {translatedText}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Translation History */}
          {history.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-3">
                  Recent Translations
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-border pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">
                            {
                              languages.find((l) => l.value === item.from)
                                ?.label
                            }{" "}
                            →{" "}
                            {languages.find((l) => l.value === item.to)?.label}
                          </p>
                          <p
                            className="text-sm font-medium mt-1"
                            dir={item.from === "arabic" ? "rtl" : "ltr"}
                          >
                            {item.originalText}
                          </p>
                          <p
                            className="text-xs mt-1"
                            dir={item.to === "arabic" ? "rtl" : "ltr"}
                          >
                            {item.translatedText}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="camera" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-lg font-medium">Translate from an Image</h3>
              <p className="text-muted-foreground">Upload an image or take a photo of hieroglyphs.</p>

              {/* Image Preview */}
              {imagePreview && (
                <div className="aspect-video rounded-md border overflow-hidden bg-accent">
                  <img src={imagePreview} alt="Selected preview" className="w-full h-full object-contain" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* File Upload Button */}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                        setImageResult(null);
                      }
                    }}
                    className="w-full"
                  />
                </div>

                {/* Camera Capture Button */}
                <div className="flex-none">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    id="cameraInput"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                        setImageResult(null);
                        // Automatically trigger translation after capture
                        handleImageTranslate();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={async () => {
                      try {
                        // Request camera permission first
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        // Stop the stream immediately as we'll use the input element
                        stream.getTracks().forEach(track => track.stop());
                        // Trigger the file input after permission is granted
                        document.getElementById('cameraInput')?.click();
                      } catch (err) {
                        toast({
                          title: "Camera Access Error",
                          description: "Please allow camera access to use this feature.",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>

              <Button
                className="w-full max-w-sm mx-auto bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                onClick={handleImageTranslate}
                disabled={!imageFile || isImageTranslating}
              >
                <Zap className="mr-2 h-4 w-4" />
                {isImageTranslating ? "Processing..." : "Translate Image"}
              </Button>
            </CardContent>
          </Card>

          {/* Display Results */}
          {isImageTranslating && (
            <div className="text-center p-4">
              <p className="text-muted-foreground">Analyzing image, please wait...</p>
            </div>
          )}

          {imageResult && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Translation Results</h3>
                
                {/* Displaying some key fields from the Python API's response */}
                <div>
                  <Label className="text-xs text-muted-foreground">Detected Text (Summary)</Label>
                  <p className="p-3 bg-muted rounded-md text-sm">{imageResult.summary_text || "No summary available."}</p>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Bounding Boxes</Label>
                  <p className="text-sm text-muted-foreground">{imageResult.bounding_boxes?.length || 0} text areas detected.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Hidden file inputs */}
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleDocumentChange}
        className="hidden"
      />
    </div>
  );
}

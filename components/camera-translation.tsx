"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Zap, Volume2, Copy, FlipHorizontal } from "lucide-react";

export default function CameraTranslation() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const startScanning = () => {
    setIsScanning(true);
    // Simulate finding results after 2 seconds
    setTimeout(() => {
      setHasResult(true);
      setIsScanning(false);
    }, 2000);
  };

  const resetScan = () => {
    setHasResult(false);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-[3/4] sm:h-[500px] sm:aspect-auto flex items-center justify-center">
        {!isScanning && !hasResult ? (
          <div className="text-center p-6">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm mb-4">
              Gain insights into the powerful rulers of ancient Egypt.
            </p>
            <Button
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
              onClick={startScanning}
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0 bg-slate-800"
              style={{
                filter: isScanning ? "brightness(1.2)" : "brightness(0.8)",
              }}
            ></div>

            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-[#FFD700] rounded-lg relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD700] animate-scan"></div>
                </div>
              </div>
            )}

            {hasResult && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Card className="bg-background/90 backdrop-blur-sm border-[#FFD700]/30">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#FFD700]">
                        Detected Text
                      </h3>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs">𓀀𓁐𓂓𓃒𓄤</p>
                    <div className="border-t border-border pt-2">
                      <h3 className="text-sm font-medium">Translation</h3>
                      <p className="text-xs mt-1">
                        "The pharaoh commands the building of a temple"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>

      {(isScanning || hasResult) && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFlashOn(!flashOn)}
            className={flashOn ? "bg-[#FFD700]/20" : ""}
          >
            <Zap className={`h-4 w-4 ${flashOn ? "text-[#FFD700]" : ""}`} />
            <span className="ml-2">Flash</span>
          </Button>

          <Button variant="outline" size="sm">
            <FlipHorizontal className="h-4 w-4" />
            <span className="ml-2">Flip</span>
          </Button>

          {hasResult && (
            <Button variant="default" size="sm" onClick={resetScan}>
              <Camera className="h-4 w-4 mr-2" />
              Scan Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

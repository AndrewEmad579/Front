"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Camera, Languages, ShoppingBag, Glasses, Map } from "lucide-react";
import Link from "next/link";

const shimmerAnimation = `
  @keyframes letterShine {
    0%, 100% {
      color: inherit;
      text-shadow: none;
    }
    45%, 55% {
      color: #FFD700;
      text-shadow: 
        0 0 5px #FFD700,
        0 0 10px #FFD700,
        0 0 20px #B8860B;
    }
  }

  @keyframes starGlisten {
    0%, 100% {
      color: #FFD700;
      text-shadow: 0 0 5px #B8860B;
    }
    45%, 55% {
      color: #FFD700;
      text-shadow: 
        0 0 10px #FFD700,
        0 0 20px #FFD700,
        0 0 30px #FFD700,
        0 0 40px #B8860B,
        0 0 50px #FFD700,
        0 0 60px #B8860B;
    }
  }
`;

export default function Home() {
  const features = [
    {
      title: "Translate",
      description: "Translate hieroglyphs to modern languages",
      icon: Languages,
      href: "/translate",
      color: "from-primary-light to-primary-dark",
    },
    {
      title: "VR Experience",
      description: "Explore artifacts in augmented reality",
      icon: Glasses,
      href: "/vr",
      color: "from-secondary-light to-secondary-dark",
    },
    {
      title: "E-Bazaar",
      description: "Shop authentic Egyptian souvenirs",
      icon: ShoppingBag,
      href: "/bazaar",
      color: "from-accent-light to-accent-dark",
    },
    {
      title: "Sites",
      description: "Explore historical Egyptian sites",
      icon: Map,
      href: "/sites",
      color: "from-primary to-accent",
    },
  ];

  const letterSequence = {
    'A': 0,
    'E': 1,
    'G': 2,
    'Y': 3,
    'P': 4,
    'T': 5,
    'U': 6,
    'S': 7
  };

  return (
    <>
      <style>{shimmerAnimation}</style>
      <div className="container mx-auto px-4 py-8 space-y-8 sm:py-12">
        <div className="text-center space-y-4">
          <Typography
            variant="h1"
            color="primary"
            weight="bold"
            align="center"
            className="font-poppins relative inline-block"
          >
            <span className="relative z-10 flex items-center justify-center gap-[2px]">
              {'AEGYPTUS'.split('').map((letter) => (
                <span
                  key={letter}
                  className={`relative inline-block ${
                    letter === 'S' ? 'text-[#FFD700]' : ''
                  }`}
                  style={{
                    animation: letter === 'S'
                      ? 'starGlisten 5s ease-in-out infinite'
                      : `letterShine 5s ease-in-out ${letterSequence[letter as keyof typeof letterSequence] * 0.6}s infinite`,
                    transformOrigin: 'center',
                    textShadow: letter === 'S' ? '0 0 5px #B8860B' : 'none'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </Typography>
          <Typography variant="lead" align="center">
            Ancient Egypt Reimagined for the Modern World.
          </Typography>
        </div>

        <Card variant="elevated" className="overflow-hidden bg-gradient-to-b from-secondary to-secondary-dark">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/Hieroglyphs_unlocking_ancient_Egypt_hero.jpg"
              alt="Ancient Egyptian hieroglyphs"
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="relative z-10 text-center space-y-4 p-8">
            <Typography variant="h3" color="primary" weight="semibold">
              Scan Hieroglyphs
            </Typography>
            <Typography variant="muted" className="text-gray-300">
              Point your camera at hieroglyphs to instantly translate them
            </Typography>
            <Link href="/translate?mode=camera">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white mt-6"
              >
                <Camera className="mr-2 h-5 w-5" />
                Open Camera
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Typography variant="h2" weight="semibold">
            Explore Features
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title}>
                <Card
                  variant="outlined"
                  interactive
                  className="h-full"
                >
                  <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Typography variant="h4" weight="semibold">
                        {feature.title}
                      </Typography>
                      <Typography variant="muted">
                        {feature.description}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

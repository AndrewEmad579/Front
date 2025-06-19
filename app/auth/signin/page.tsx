"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signInWithGoogle, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signIn(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error('No credential received from Google');
      }
      
      console.log('Google Sign In Response:', credentialResponse);
      await signInWithGoogle(credentialResponse.credential);
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
      router.push("/");
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      let errorMessage = "Failed to sign in with Google. Please try again.";
      
      if (err.message?.includes('NetworkError')) {
        errorMessage = "Network error occurred. Please check your internet connection and try again.";
      } else if (err.message?.includes('AbortError')) {
        errorMessage = "Sign in process was interrupted. Please try again.";
      }
      
      toast({
        title: "Google sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background/50 to-background">
      {/* Egyptian-inspired decorative element */}
      <div className="w-16 h-16 mb-6">
        <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
          <path
            fill="currentColor"
            d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,3.18L19,6.3V11.22C19,12.92 18.5,14.65 17.65,16.17C16,14.94 13.26,14.5 12,14.5C10.74,14.5 8,14.94 6.35,16.17C5.5,14.65 5,12.92 5,11.22V6.3L12,3.18M12,6A3.5,3.5 0 0,0 8.5,9.5A3.5,3.5 0 0,0 12,13A3.5,3.5 0 0,0 15.5,9.5A3.5,3.5 0 0,0 12,6M12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-poppins text-center">
        Welcome Back to AEGYPTUS
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Continue your journey through ancient Egypt's wonders
      </p>

      <Card className="w-full max-w-md border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className={`pl-10 bg-background/50 border-input focus:border-primary transition-colors ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-destructive text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`pl-10 pr-10 bg-background/50 border-input focus:border-primary transition-colors ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-destructive text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </div>
              )}
              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="relative flex items-center justify-center my-6">
              <Separator className="absolute w-full bg-border" />
              <span className="relative px-2 bg-card text-xs text-muted-foreground">
                or continue with
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignIn}
                  onError={() => {
                    console.error('Google Sign In Error');
                    toast({
                      title: "Google sign in failed",
                      description: "Please try again later.",
                      variant: "destructive",
                    });
                  }}
                  useOneTap
                  type="standard"
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Egyptian-inspired decorative element */}
      <div className="flex justify-center mt-8">
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
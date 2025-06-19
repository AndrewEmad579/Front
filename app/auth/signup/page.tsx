"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const { signUp, signInWithGoogle, signInWithApple, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;

    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getPasswordStrengthText = (): { text: string; color: string } => {
    if (passwordStrength === 0)
      return { text: "No Password", color: "text-muted-foreground" };
    if (passwordStrength <= 25) return { text: "Weak", color: "text-red-500" };
    if (passwordStrength <= 50)
      return { text: "Fair", color: "text-orange-500" };
    if (passwordStrength <= 75)
      return { text: "Good", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strengthInfo = getPasswordStrengthText();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signUp(name.trim(), email, password);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to AEGYPTUS. Please sign in to continue.",
      });
      router.push("/auth/signin");
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignUp = async (credentialResponse: any) => {
    try {
      await signInWithGoogle(credentialResponse);
      toast({
        title: "Welcome to AEGYPTUS!",
        description: "You have successfully signed up with Google.",
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: "Google sign up failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignUp = async () => {
    try {
      await signInWithApple();

      toast({
        title: "Welcome to AEGYPTUS!",
        description: "You have successfully signed up with Apple.",
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: "Apple sign up failed",
        description: err.message || "This feature is not available yet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-black">
      {/* Egyptian-inspired decorative element */}
      <div className="w-16 h-16 mb-6">
        <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFD700]">
          <path
            fill="currentColor"
            d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,3.18L19,6.3V11.22C19,12.92 18.5,14.65 17.65,16.17C16,14.94 13.26,14.5 12,14.5C10.74,14.5 8,14.94 6.35,16.17C5.5,14.65 5,12.92 5,11.22V6.3L12,3.18M12,6A3.5,3.5 0 0,0 8.5,9.5A3.5,3.5 0 0,0 12,13A3.5,3.5 0 0,0 15.5,9.5A3.5,3.5 0 0,0 12,6M12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2 font-poppins text-center">
        Join the Journey Through Time
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Create your account to explore ancient Egypt's wonders
      </p>

      <Card className="w-full max-w-md border-[#FFD700]/20 bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className={`pl-10 bg-slate-800/50 border-slate-700 focus:border-[#FFD700] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className={`pl-10 bg-slate-800/50 border-slate-700 focus:border-[#FFD700] transition-colors ${
                    errors.email ? "border-red-500" : ""
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
                <div className="flex items-center gap-1 text-red-500 text-xs">
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
                  className={`pl-10 pr-10 bg-slate-800/50 border-slate-700 focus:border-[#FFD700] transition-colors ${
                    errors.password ? "border-red-500" : ""
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
                  className="absolute right-3 top-3 text-muted-foreground hover:text-[#FFD700] transition-colors"
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
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </div>
              )}

              {password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Password strength:
                    </span>
                    <span
                      className={`text-xs font-medium ${strengthInfo.color}`}
                    >
                      {strengthInfo.text}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className="h-1"
                    style={
                      {
                        background: "rgba(100, 100, 100, 0.2)",
                        "--progress-color":
                          passwordStrength <= 25
                            ? "#ef4444"
                            : passwordStrength <= 50
                            ? "#f97316"
                            : passwordStrength <= 75
                            ? "#eab308"
                            : "#22c55e",
                      } as React.CSSProperties
                    }
                  />

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      {/[A-Z]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground mr-1" />
                      )}
                      <span
                        className={
                          /[A-Z]/.test(password)
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {/[0-9]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground mr-1" />
                      )}
                      <span
                        className={
                          /[0-9]/.test(password)
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        Number
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {password.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground mr-1" />
                      )}
                      <span
                        className={
                          password.length >= 8
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        8+ characters
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {/[^A-Za-z0-9]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground mr-1" />
                      )}
                      <span
                        className={
                          /[^A-Za-z0-9]/.test(password)
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`pl-10 pr-10 bg-slate-800/50 border-slate-700 focus:border-[#FFD700] transition-colors ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-[#FFD700] transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => {
                    setAgreedToTerms(checked as boolean);
                    if (errors.terms)
                      setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="border-slate-700 data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#FFD700] hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#FFD700] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  {errors.terms}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-medium py-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="relative flex items-center justify-center my-6">
              <Separator className="absolute w-full bg-slate-700" />
              <span className="relative px-2 bg-slate-900 text-xs text-muted-foreground">
                or sign up with
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignUp}
                  onError={() => {
                    toast({
                      title: "Google sign up failed",
                      description: "Please try again later.",
                      variant: "destructive",
                    });
                  }}
                  useOneTap
                />
              </div>
              {/* Apple Sign Up Button - Temporarily Disabled
              <Button
                type="button"
                variant="outline"
                className="border-slate-700 hover:bg-slate-800 transition-colors"
                onClick={handleAppleSignUp}
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"
                  />
                </svg>
                Apple
              </Button>
              */}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#FFD700] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Egyptian-inspired decorative element */}
      <div className="flex justify-center mt-8">
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
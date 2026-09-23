"use client";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store/StoreProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(loginRequest({ email, password }));
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        setError("Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Universe Background Image */}
      <Image
        src="/universe_bg.jpg"
        alt="Universe Background"
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />

      {/* Subtle overlay to ensure form readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Glow effect behind the card content */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />

        <div className="p-8 sm:p-10 space-y-8 relative z-20">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex items-center gap-3">
              {/* <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <Sparkles className="size-6" />
              </div> */}
              <span className="font-bold text-3xl tracking-wide text-white drop-shadow-md">
                STARBOUND
              </span>
            </div>

            <div className="space-y-2 mt-2">
              <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Welcome back
              </h2>
              <p className="text-white/70 text-sm">
                Enter your credentials to access the universe.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm font-medium text-red-200 bg-red-900/50 border border-red-500/50 rounded-xl text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@starbound.app"
                  required
                  className="h-12 rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/90">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary/50 focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/30 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-white/60 pt-4">
              Don't have an account?{" "}
              <Link
                href="/contact"
                className="font-medium text-white/90 hover:text-white transition-colors"
              >
                Contact support
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

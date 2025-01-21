"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Automatically sign in after successful signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 w-full" data-testid="signup-form">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-10"
            data-testid="signup-email-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full h-10"
            data-testid="signup-password-input"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          data-testid="signup-submit-button"
        >
          <div className="w-full flex items-center justify-center">
            {loading ? (
              "Signing up..."
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Sign Up
              </>
            )}
          </div>
        </Button>
      </form>

      {error && (
        <Alert
          variant="destructive"
          className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button 
          variant="link" 
          onClick={() => router.push("/login")} 
          className="p-0"
          size="sm"
        >
          Log in
        </Button>
      </div>
    </div>
  );
} 
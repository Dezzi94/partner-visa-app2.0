"use client";

import { useToast } from "@/components/ui/use-toast";
import { useState, useCallback } from "react";

type ToastOptions = {
  successTitle?: string;
  successDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
};

interface SupabaseError {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
}

export function useWithToast<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ToastOptions = {}
) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const wrappedFn = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
      setIsLoading(true);
      try {
        const result = await fn(...args);
        toast({
          title: options.successTitle || "Success",
          description:
            options.successDescription || "Operation completed successfully",
        });
        return result;
      } catch (error) {
        console.error("Error:", error);
        let errorMessage = "An unexpected error occurred";

        if (error && typeof error === "object" && "code" in error) {
          // This is likely a Supabase error
          const supabaseError = error as SupabaseError;
          errorMessage = `${supabaseError.message} (Code: ${supabaseError.code})`;
          if (supabaseError.hint) {
            errorMessage += ` Hint: ${supabaseError.hint}`;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast({
          title: options.errorTitle || "Error",
          description: errorMessage,
          variant: "destructive",
        });
        // Instead of re-throwing the error, we return void
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [fn, toast, options]
  );

  return { wrappedFn, isLoading };
}

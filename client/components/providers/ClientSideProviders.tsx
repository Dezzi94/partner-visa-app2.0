"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useSearchParams } from "next/navigation";
import { gtmPageView } from "@/lib/gtm";

const queryClient = new QueryClient();

interface ClientSideProvidersProps {
  children: ReactNode;
}

export default function ClientSideProviders({
  children,
}: ClientSideProvidersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && pathname) {
      gtmPageView({ page_path: pathname });
    }
  }, [pathname, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

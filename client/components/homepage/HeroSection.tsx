"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { config } from "@/config";
interface HeroSectionProps {
  title: string;
  subtitle: string;
  poweredByStripeImage?: string;
  ctaLink: string;
  ctaText: string;
  ctaClassName?: string;
}

export default function HeroSection({
  title,
  subtitle,
  poweredByStripeImage,
  ctaLink,
  ctaText,
  ctaClassName,
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section
      className="py-16 bg-gray-900 text-white md:min-h-screen md:flex md:items-center md:justify-center"
      data-testid="hero-section"
    >
      <div className="px-4 mx-auto max-w-screen-lg text-center lg:py-4 lg:px-12">
        <div className="flex justify-center">
          <Image
            src={poweredByStripeImage!}
            alt="Powered by Stripe"
            width={140}
            height={35}
            className="h-auto"
          />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48">
          {subtitle}
        </p>
        <Button
          className={`bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl font-semibold w-64 h-14 text-xl ${
            ctaClassName || ""
          }`}
          onClick={() => router.push(ctaLink)}
        >
          {ctaText}
        </Button>

        {/* User Ratings Section */}
        <div className="mt-12 flex items-center justify-center">
          <div className="flex items-center">
            <div className="flex -space-x-3 mr-4">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-gray-800"
                >
                  <Image
                    src={`/testimonials/${id}.jpg`}
                    alt={`User ${id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <div className="text-lg font-semibold">
                {config.homepage.numberOfMakersShipped} makers ship faster
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

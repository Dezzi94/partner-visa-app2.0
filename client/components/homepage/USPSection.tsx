"use client";

import React from "react";
import { USP } from "@/types/config";
import { config } from "@/config";

interface USPProps {
  usps: USP[];
}

export default function USPSection({ usps }: USPProps) {
  return (
    <section
      className="pt-20 pb-40 bg-gray-50 dark:bg-gray-800 w-full"
      data-testid="usp-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose {config.name}?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full transform transition-all duration-300 scale-0 group-hover:scale-100"></div>
                <div className="relative z-10 bg-white dark:bg-gray-700 p-4 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <div className="text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 transform">
                    {usp.icon && <usp.icon className="w-8 h-8" />}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{usp.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 dark:block hidden">
        <hr className="border-gray-700 mx-auto w-1/2" />
      </div>
    </section>
  );
}

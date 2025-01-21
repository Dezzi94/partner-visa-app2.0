"use client";

import { useState } from "react";
import { FeaturesSection as FeaturesSectionType } from "@/types/config";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function FeaturesSection({
  title,
  description,
  useTabLayout = false,
  features,
}: FeaturesSectionType) {
  const [activeTab, setActiveTab] = useState(features[0].title);
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section
      className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300"
      data-testid="features-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h2>
        <p className="text-xl mb-8 text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {description}
        </p>
        {useTabLayout ? (
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(feature.title)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 border-2 ${
                    activeTab === feature.title
                      ? `bg-primary text-white border-primary dark:bg-primary/90 dark:text-black dark:border-primary/90`
                      : "bg-gray-100 text-primary border-primary hover:bg-primary hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-primary/90 dark:hover:text-white"
                  }`}
                >
                  <feature.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{feature.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg transition-colors duration-300">
              {features.map(
                (feature, index) =>
                  feature.title === activeTab && (
                    <div key={index}>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-stretch space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2">
              <Accordion type="single" collapsible className="w-full h-full">
                {features.map((feature, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger
                      onClick={() => setActiveFeature(feature)}
                      className="text-left flex items-center text-gray-900 dark:text-white transition-colors duration-300"
                    >
                      <div className="flex items-center">
                        <feature.icon className="w-6 h-6 mr-2 flex-shrink-0" />
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div
              className="w-full md:w-1/2 relative"
              style={{ height: "600px" }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeFeature.title === feature.title
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={600}
                    priority={true}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

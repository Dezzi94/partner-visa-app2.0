import Link from "next/link";
import Image from "next/image";
import { Linkedin, ExternalLink, Heart } from "lucide-react";
import { config } from "@/config";

export default function Footer() {
  const { indieMaker } = config;

  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex flex-col items-center md:items-start space-y-4 mb-6 md:mb-0">
            <Link
              href={indieMaker.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center"
            >
              <Image
                src={indieMaker.avatar}
                alt={indieMaker.name}
                width={48}
                height={48}
                className="rounded-full transition-transform group-hover:scale-105 mr-2"
              />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {indieMaker.name}
              </span>
              <ExternalLink className="ml-1 w-4 h-4" />
            </Link>
            <p className="text-sm text-center md:text-left">
              Made with{" "}
              <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> by an
              indie maker
            </p>
            <div className="flex space-x-4">
              <a
                href={indieMaker.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="lucide lucide-x"
                >
                  <path
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                    stroke="none"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">X (formerly Twitter)</span>
              </a>
              <a
                href={indieMaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <Link
                href="/our-terms-of-service"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/our-privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
            </nav>

            <a
              href="https://cursordevkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
            >
              <span className="text-lg">🪄</span>
              <span>Built with CursorDevKit</span>
            </a>

            <p className="text-xs text-center md:text-right text-muted-foreground">
              &copy; {new Date().getFullYear()} {config.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-4 border-t border-gray-300">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* left section - logo */}
        <div className="flex items-center">
          <img
            src="/images/logopathHere"
            alt="Logo"
            className="h-16" // item height adj
          />
        </div>

        {/* center section - nav */}
        <nav className="flex space-x-8 text-gray-600 font-roboto">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/" className="hover:underline">
            Sitemap
          </Link>
        </nav>

        {/* right section - github icon */}
        <a href="https://github.com/TBud15" className="ml-4">
          <img
            src="/images/icon/github-icon.svg" // github icon from public/images
            alt="GitHub"
            className="h-10" // icon height
          />
        </a>
      </div>

      {/* bottom copyright text */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © 2024 Tymur Budahov Personal Project | All Rights Reserved
      </div>
    </footer>
  );
}

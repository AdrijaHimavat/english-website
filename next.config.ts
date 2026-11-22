import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  // The Akhtarnameh astrology app is a static page in public/astrology.
  async rewrites() {
    return [{source: "/astrology", destination: "/astrology/index.html"}];
  }
};
export default config;

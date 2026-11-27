import type { NextConfig } from "next";

// The Akhtarnameh astrology app is a static page in public/astrology.
// On its own address it opens directly at the root; on growme.blog it lives at /astrology.
const ASTRO_HOSTS = ["akhtarnameh.vercel.app"];

const config: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return {
      beforeFiles: ASTRO_HOSTS.map((host) => ({source: "/", has: [{type: "host" as const, value: host}], destination: "/astrology/index.html"})),
      afterFiles: [{source: "/astrology", destination: "/astrology/index.html"}],
      fallback: []
    };
  }
};
export default config;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // i18n: {
  //   locales: ["en", "id"],
  //   defaultLocale: "id",
  // },
};

export default nextConfig;

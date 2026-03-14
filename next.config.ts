import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const FEB19_DEPLOYMENT_URL =
  "https://beckford-site-napp8yiz2-michelle-ackers.vercel.app";

const nextConfig: NextConfig = {
  /* config options here */
  // Silence Next.js 16 turbopack/webpack warning by explicitly enabling Turbopack
  // and setting the root to this project directory.
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    if (process.env.LOCALHOST_USE_FEB19 === "true") {
      return [
        {
          source: "/:path*",
          destination: `${FEB19_DEPLOYMENT_URL}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default withContentlayer(nextConfig);

import type { NextConfig } from "next";

const nextConfiguration: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./src/prompts/**/*", "./src/schemas/**/*"],
  },
};

export default nextConfiguration;

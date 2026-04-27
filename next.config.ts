import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Remove when @telekom/scale-components-react fixes type exports
    // beta.160 has broken generics in StencilReactComponent (Props param missing)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

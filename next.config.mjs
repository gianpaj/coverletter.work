/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // for langfuse
    instrumentationHook: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'avatars.githubusercontent.com',
  //       port: '',
  //       pathname: '**'
  //     }
  //   ]
  // }
};

export default nextConfig;

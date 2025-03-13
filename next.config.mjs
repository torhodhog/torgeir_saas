/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   experimental: {
     appDir: true, // ✅ Dette må være på for å støtte src/app/api
   },
 };
 
 export default nextConfig;
 
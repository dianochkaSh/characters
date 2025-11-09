import type { NextConfig } from 'next';
import { DOMAIN, DOMAIN_EXTERNAL} from './consts/consts';

const isProd = true;
//
// module.exports = {
//     output: 'export',
//     // basePath: isProd ? '/dianochkash.github.io' : '',
//     // assetPrefix: isProd ? '/dianochkash.github.io/' : '',
//     // // GitHub Pages does not support Next.js image optimization
//     images: { unoptimized: true, },
// };


const nextConfig: NextConfig = {
    reactStrictMode: true,
    // unoptimized: true,
    images: {
        domains: [DOMAIN_EXTERNAL],

    },
};

export default nextConfig;
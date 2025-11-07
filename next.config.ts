import type { NextConfig } from 'next';
import { DOMAIN, DOMAIN_EXTERNAL} from './consts/consts';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    unoptimized: true,
    images: {
        domains: [DOMAIN_EXTERNAL],

    },
};

export default nextConfig;
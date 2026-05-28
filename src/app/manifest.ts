import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinanceFlow — Financial Calculators',
    short_name: 'FinanceFlow',
    description: 'India\'s trusted free financial calculator platform. EMI, SIP, FD, RD, Tax calculators and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

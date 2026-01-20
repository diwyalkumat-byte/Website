
import { Product } from './types';

// Helper to get direct image link from Google Drive view link
const getDirectImageLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
const DEODORIZER_POUCHES = '1ZnBuvu4aPmuPJkbriGRt1JZKuHNglTYD';
const WIPES = '1tS3AGwPHUEIdAvXlOvT_k22YfZBGbnWL';
const TAPE = '1CCl2fBqy1mqcLCn_yQ7aLh1pTROLX0j7';
const KNEE = '1UYjoexWIeQZv_uKeKZ3gjc-giqiDvKLy';
const MID = '1mn7nAN6T0bGxk62FVWrb3e6TnFDkTDZW';
const ANKLE = '1qbuV9lxWnvhvp0eLYv3EtO5NUKTxKE8X';

export const PRODUCTS: Product[] = [
  {
    id: 'socks-premium',
    name: 'Memory Foam Socks',
    price: 169,
    description: 'High-quality breathable cotton socks designed for ultimate comfort and durability. Available in multiple lengths and sizes.',
    image: getDirectImageLink(ANKLE), // Default image
    category: 'Socks',
    hasOptions: true,
    aspect: '4/5',
    optionImages: {
      'Ankle Length': getDirectImageLink(ANKLE),
      'Mid Length': getDirectImageLink(MID),
      'Knee Length': getDirectImageLink(KNEE)
    }
  },
  {
    id: 'anti-bite-tape',
    name: 'Transparent Shoe Bite Tape',
    price: 119,
    description: 'Protect your heels and feet from painful blisters. Our medical-grade transparent tape is discreet and stays in place all day.',
    image: getDirectImageLink(TAPE),
    category: 'Accessories',
    aspect: '8/5'
  },
  {
    id: 'perfume-pouches',
    name: 'Deodorizer Pouches',
    price: 149,
    description: 'Keep your footwear smelling fresh with our luxury perfume pouches. Effectively neutralizes odors with a long-lasting, refreshing scent.',
    image: getDirectImageLink(DEODORIZER_POUCHES),
    category: 'Accessories',
    aspect: '4/5'
  },
  {
    id: 'shoe-wipes',
    name: 'Shoe Cleaning Wipes',
    price: 149,
    description: 'Instant cleaning on the go. These dual-textured wipes remove dirt and scuffs from sneakers, leather, and rubber easily. Available in packs of 10 and 25.',
    image: getDirectImageLink(WIPES),
    category: 'Care',
    hasOptions: true,
    aspect: '5/5'
  }
];

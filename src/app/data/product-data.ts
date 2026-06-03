export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  details: string;
  hero: string;
  images: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'bubble-boy',
    title: 'Bubble Boy',
    price: 28.0,
    description: 'A sailor-inspired plushie with embroidered accents and a soft, collectible finish.',
    details: 'Handmade from premium plush fabric with custom embroidery. Each Bubble Boy is packaged safely for delivery.',
    hero: 'assets/images/bubble-boy/Bubble-Boy-1.jpg',
    images: [
      'assets/images/bubble-boy/Bubble-Boy-1.jpg',
      'assets/images/bubble-boy/Bubble-Boy-2.jpg',
      'assets/images/bubble-boy/Bubble-Boy-3.jpg',
      'assets/images/bubble-boy/Bubble-Boy-4.jpg',
      'assets/images/bubble-boy/Bubble-Boy-5.jpg',
      'assets/images/bubble-boy/Bubble-Boy-6.jpg'
    ]
  },
  {
    id: 'dino-boy',
    title: 'Dino Boy',
    price: 32.0,
    description: 'A freckled dinosaur-themed plush with a whimsical adventure-ready hat.',
    details: 'Each Dino Boy plush is sewn with personality and vibrant details, perfect for display or gifting.',
    hero: 'assets/images/dino-boy/Dino-Boy-1.jpg',
    images: [
      'assets/images/dino-boy/Dino-Boy-1.jpg',
      'assets/images/dino-boy/Dino-Boy-2.jpg',
      'assets/images/dino-boy/Dino-Boy-3.jpg',
      'assets/images/dino-boy/Dino-Boy-4.jpg',
      'assets/images/dino-boy/Dino-Boy-5.jpg',
      'assets/images/dino-boy/Dino-Boy-6.jpg'
    ]
  },
  {
    id: 'rose-girl',
    title: 'Rose Girl',
    price: 30.0,
    description: 'A rosy plush with botanical details and bright pink hair for a bold collector display.',
    details: 'Rose Girl features soft felt petals and embroidered accents made with care for each order.',
    hero: 'assets/images/rose-girl/Rose-Girl-1.jpg',
    images: [
      'assets/images/rose-girl/Rose-Girl-1.jpg',
      'assets/images/rose-girl/Rose-Girl-2.jpg',
      'assets/images/rose-girl/Rose-Girl-3.jpg',
      'assets/images/rose-girl/Rose-Girl-4.jpg',
      'assets/images/rose-girl/Rose-Girl-5.jpg'
    ]
  },
  {
    id: 'stone-man',
    title: 'Stone Man',
    price: 34.0,
    description: 'A stone-inspired plushie with rich earth tones and a bold collector presence.',
    details: 'Stone Man is handcrafted with attention to rugged texture and decorative accents.',
    hero: 'assets/images/stone-man/Stone-Man-1.jpg',
    images: [
      'assets/images/stone-man/Stone-Man-1.jpg',
      'assets/images/stone-man/Stone-Man-2.jpg',
      'assets/images/stone-man/Stone-Man-3.jpg',
      'assets/images/stone-man/Stone-Man-4.jpg',
      'assets/images/stone-man/Stone-Man-5.jpg',
      'assets/images/stone-man/Stone-Man-6.jpg'
    ]
  },
  {
    id: 'wind-warrior',
    title: 'Wind Warrior',
    price: 35.0,
    description: 'A skybound warrior plush with flowing details and a custom embroidered tail.',
    details: 'Wind Warrior is made with unique applique and plush fabric for an eye-catching collectible.',
    hero: 'assets/images/wind-warrior/Wind-Warrior-1.jpg',
    images: [
      'assets/images/wind-warrior/Wind-Warrior-1.jpg',
      'assets/images/wind-warrior/Wind-Warrior-2.jpg',
      'assets/images/wind-warrior/Wind-Warrior-3.jpg',
      'assets/images/wind-warrior/Wind-Warrior-4.jpg',
      'assets/images/wind-warrior/Wind-Warrior-5.jpg',
      'assets/images/wind-warrior/Wind-Warrior-6.jpg'
    ]
  }
];

export function findProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

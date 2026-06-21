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
    price: 60.0,
    description: 'A sailor-inspired plushie with embroidered accents and a soft, collectible finish.',
    details: 'This funny little guy is 16cm tall and handmade with soft minky. His hat is even removable (but don\'t take it away from him, he likes it!) Buyers can choose from a plush with an embroidered face, a regular plush with a printed face, or a discounted plush with a slight color variation. Please allow 1-2 weeks for shipping; domestic shipping time is usually under one week while International shipping times can vary. NOTE: This product was made in a household with dogs. Also, as these are handmade, they may not be identical to the one pictured.',
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
    price: 65.0,
    description: 'A racing dinosaur jockey who\'s ready to win!',
    details: 'This dino cowboy plushie is 16cm tall and made of lovely, soft minky. His cap is removeable, and his tail is magnetic! Won\'t you accept this little menace into your home? He can\'t WAIT to chew on your furniture! This plush can either come with an embroidered face or a regular printed face. Please allow 1-2 weeks for shipping; domestic shipping time is usually under one week while International shipping times can vary. NOTE: This product was made in a household with dogs. Also, as these are handmade, they may not be identical to the one pictured.',
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
    price: 60.0,
    description: 'A racing dinosaur jockey who\'s ready to win!',
    details: 'No matter what, this rosy girl will find her way! 16cm tall and handmade with soft minky, buyers can choose from a plush with an embroidered face or a printed face. Please allow 1-2 weeks for shipping; domestic shipping time is usually under one week while International shipping times can vary. NOTE: This product was made in a household with dogs. Also, as these are handmade, they may not be identical to the one pictured. ',
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
    price: 60.0,
    description: 'A solemn plushie awakened from his long slumber!',
    details: 'The mysterious stone man has awakened... And he\'s adorable! This handmade little guy is 16cm tall with soft minky skin and felt hair. Buyers can choose from a plush with an embroidered face or a regular plush with a printed face. Please allow 1-2 weeks for shipping; domestic shipping time is usually under one week while International shipping times can vary. NOTE: This product was made in a household with dogs. Also, as these are handmade, they may not be identical to the one pictured. ',
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
    price: 60.0,
    description: 'A solemn plushie awakened from his long slumber!',
    details: 'Don\'t let his size fool you—this fearsome warrior has never been defeated! If you\'re not careful, he might just put a wedding ring (of death) around your heart <3. Handmade of soft minky and felt, this little guy is about 16cm tall. Buyers can choose from a plush with an embroidered face or a printed face. Please allow 1-2 weeks for shipping; domestic shipping time is usually under one week while International shipping times can vary. NOTE: This product was made in a household with dogs. Also, as these are handmade, they may not be identical to the one pictured.',
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

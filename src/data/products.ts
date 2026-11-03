import { Product } from '../types';

export const PANJIRI_WEIGHT_OPTIONS = [
  
  { label: '500 g', multiplier: 0.5, unit: 'g' },
  { label: '1 kg', multiplier: 1.0, unit: 'kg' },
  { label: '2 kg', multiplier: 2, unit: 'kg' },
];

export const GHEE_VOLUME_OPTIONS = [
  { label: '500 ml', multiplier: 0.5, unit: 'ml' },
  { label: '1 Litre', multiplier: 1.0, unit: 'L' },
  { label: '2 Litres', multiplier: 2, unit: 'L' },
  { label: '5 Litres (Tin)', multiplier: 5, unit: 'L' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'classic-panjiri',
    name: 'Classic Panjiri',
    subtitle: 'Traditional Whole Wheat & Asli Desi Ghee Roast',
    category: 'panjiri',
    pricePerKgOrLitre: 4000,
    description: 'The golden staple of traditional households. Coarsely ground whole wheat flour slow-roasted in pure Asli Desi Ghee on a gentle flame until golden brown and aromatic, tossed with chopped almonds, cashews, cardamom, and unrefined raw sugar.',
    highlights: ['100% Pure Asli Desi Ghee', 'Slow Roasted on Low Flame', 'No Preservatives or Chemicals'],
    ingredients: ['Whole Wheat Flour (Atta)', 'Pure Desi Cow Ghee', 'Mamra Almonds', 'Cashew Nuts', 'Green Cardamom', 'Unrefined Raw Sugar'],
    nutrition: {
      protein: '11g / 100g',
      energy: '480 kcal',
      goodFats: '24g',
      shelfLife: '90 Days at Room Temperature',
    },
    image: '/images/classic.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'gond-panjiri',
    name: 'Gond Panjiri',
    subtitle: 'Winter Special & Bone Strength Formulation',
    category: 'panjiri',
    pricePerKgOrLitre: 4400,
    isBestseller: true,
    description: 'Our most sought-after winter and recovery superfood. Hand-picked edible gum crystals (Gond) puffed to crispy perfection in pure desi ghee, combined with roasted foxnuts (phool makhana), cashews, melon seeds (char magaz), and warming cardamom.',
    highlights: ['Crispy Puffed Gond Crystals', 'Joint Lubrication & Bone Strength', 'Postpartum & Maternal Recovery'],
    ingredients: ['Edible Acacia Gum (Gond)', 'Pure Desi Ghee', 'Fox Nuts (Makhana)', 'Roasted Cashews', 'Melon Seeds (Magaz)', 'Coarse Wheat', 'Cardamom'],
    nutrition: {
      protein: '13g / 100g',
      energy: '510 kcal',
      goodFats: '28g',
      shelfLife: '90 Days at Room Temperature',
    },
    image: '/images/01a1a10c-6998-7811-a9e6-ccb67f2d4643.jfif.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'dry-fruits-panjiri',
    name: 'Dry Fruits Panjiri',
    subtitle: 'Royal Shahi Blend Packed with Over 60% Nuts',
    category: 'panjiri',
    pricePerKgOrLitre: 4800,
    isBestseller: true,
    description: 'A lavish nut-rich delicacy. Loaded with premium almonds, golden cashews, green pistachios, walnuts, and sun-dried raisins, roasted together in rich aromatic desi ghee for high-octane energy and sharp mental focus.',
    highlights: ['Over 60% Premium Nuts Proportion', 'Rich in Natural Vitamin E & Omega-3', 'Nutrient Fuel for Students & Adults'],
    ingredients: ['Mamra Badam', 'Golden Cashews', 'Pistachios (Pista)', 'Walnuts (Akhrot)', 'Kishmish Raisins', 'Pure Desi Ghee', 'Wheat Flour', 'Shakkar'],
    nutrition: {
      protein: '15g / 100g',
      energy: '540 kcal',
      goodFats: '32g',
      shelfLife: '90 Days at Room Temperature',
    },
    image: '/images/01a1a10e-79f4-7f93-9cab-1e80df1a2896.jfif.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'protein-panjiri',
    name: 'Protein Panjiri',
    subtitle: 'High Natural Plant Protein & Multi-Seed Power',
    category: 'panjiri',
    pricePerKgOrLitre: 5000,
    description: 'Wholesome strength recipe without synthetic powders. Crafted from slow-roasted gram flour, sprouted grains, pumpkin seeds, chia seeds, crushed almonds, and walnuts bound together with pure desi ghee for sustained athletic power.',
    highlights: ['18g Clean Natural Plant Protein per 100g', 'Roasted Gram & Superseed Matrix', 'Pre & Post Workout Sustained Fuel'],
    ingredients: ['Roasted Gram Flour', 'Sprouted Grains', 'Pumpkin Seeds', 'Chia Seeds', 'Walnuts', 'Pure Desi Ghee', 'Natural Dates Powder', 'Green Cardamom'],
    nutrition: {
      protein: '18.5g / 100g',
      energy: '460 kcal',
      goodFats: '21g',
      shelfLife: '75 Days at Room Temperature',
    },
    image: '/images/protien.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'sugar-free-panjiri',
    name: 'Sugar Free Panjiri',
    subtitle: 'Naturally Sweetened with Arabian Dates & Wild Figs',
    category: 'panjiri',
    pricePerKgOrLitre: 3600,
    description: 'Formulated specifically for diabetics, weight watchers, and refined sugar-conscious families. Naturally sweet with Saudi dates and dried figs (anjeer), blended with roasted dry fruits and pure desi ghee.',
    highlights: ['Zero Refined Sugar or Chemical Sweeteners', 'Naturally Sweetened with Dates & Anjeer', 'Low Glycemic Index Profile'],
    ingredients: ['Saudi Arabian Dates', 'Dried Wild Figs (Anjeer)', 'Whole Wheat Flour', 'Pure Desi Ghee', 'Almonds', 'Walnuts', 'Chia Seeds', 'Green Cardamom'],
    nutrition: {
      protein: '12g / 100g',
      energy: '440 kcal',
      goodFats: '22g',
      shelfLife: '60 Days in Cool Dry Place',
    },
    image: '/images/2-Picsart-AiImageEnhancer.jpg.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'special-panjiri',
    name: 'Special Panjiri (Royal Batch)',
    subtitle: 'Kashmiri Saffron & Pure Shilajit Luxury Blend',
    category: 'panjiri',
    pricePerKgOrLitre: 6000,
    isSpecial: true,
    description: 'Our crowned specialty made in limited small batches. Enriched with original Grade-A Kashmiri Mongra Saffron, purified Himalayan Shilajit, Gond Katira, Chironji kernels, and gold-grade roasted nuts.',
    highlights: ['Pure Kashmiri Mongra Saffron Infusion', 'Himalayan Shilajit & Gond Synergy', 'Micro-Batch Artisan Preparation'],
    ingredients: ['Kashmiri Mongra Saffron (Kesar)', 'Purified Himalayan Shilajit', 'Gond Katira', 'Chironji', 'Mamra Badam', 'Cashews', 'Pure Cultured Ghee', 'Wheat & Raw Sugar'],
    nutrition: {
      protein: '16g / 100g',
      energy: '560 kcal',
      goodFats: '34g',
      shelfLife: '90 Days at Room Temperature',
    },
    image: '/images/62173d30-bc37-485c-bc2a-3f17ef2f7ce9.jfif.jpeg',
    weightOptions: PANJIRI_WEIGHT_OPTIONS,
  },
  {
    id: 'pure-asli-desi-cow-ghee',
    name: 'Pure Asli Desi Ghee',
    subtitle: 'Cultured Wooden Churned Traditional Ghee',
    category: 'ghee',
    pricePerKgOrLitre: 3600,
    isBestseller: true,
    description: 'Pure, authentic cultured cow ghee hand-churned from fresh dahi using traditional wooden mathani churners. Slow-simmered to achieve divine golden granular (danedar) texture and therapeutic aroma.',
    highlights: ['Authentic Wooden Churning Method', 'Grainy Danedar Golden Texture', 'Rich in Natural Fat-Soluble Vitamins'],
    ingredients: ['100% Pure Cultured Cow Butterfat'],
    nutrition: {
      protein: '0g',
      energy: '897 kcal / 100ml',
      goodFats: '99.7g',
      shelfLife: '12 Months (Store in Cool Dry Place)',
    },
    image: '/images/256a2d72-6b3e-43ba-8337-c416ebddfc71.png',
    weightOptions: GHEE_VOLUME_OPTIONS,
  },


  /*
  
  
  {
    id: 'pure-buffalo-desi-ghee',
    name: 'Pure Traditional Buffalo Desi Ghee',
    subtitle: 'Snow-White Danedar Ghee with High Smoke Point',
    category: 'ghee',
    pricePerKgOrLitre: 950,
    description: 'Pure, thick, snow-white danedar buffalo ghee famous for its rich body, distinctive buttery aroma, and high smoke point. Ideal for crispy parathas, baking, and traditional cooking.',
    highlights: ['Thick Grainy Danedar Consistency', 'High Smoke Point (250°C)', 'Rich Aroma for Daily Cooking'],
    ingredients: ['100% Pure Grass-Fed Buffalo Butterfat'],
    nutrition: {
      protein: '0g',
      energy: '900 kcal / 100ml',
      goodFats: '99.8g',
      shelfLife: '12 Months',
    },
    image: '/src/assets/images/hero_bilona_ghee_pour_1793636454276.jpg',
    weightOptions: GHEE_VOLUME_OPTIONS,
  },
 
  {
    id: 'traditional-danedar-ghee',
    name: 'Traditional Danedar Desi Ghee',
    subtitle: 'Aromatic Golden Ghee for Daily Family Nutrition',
    category: 'ghee',
    pricePerKgOrLitre: 1400,
    description: 'Handcrafted golden desi ghee slow-cooked to granular perfection. Melts instantly on steaming hot rotis, daal tarka, and khichdi. Packed in airtight food-grade amber glass jars.',
    highlights: ['Slow Cooked for Rich Aroma', 'Rich in Vitamins A, D, E & K', 'Zero Additives, Zero Bleaching'],
    ingredients: ['100% Pure Clarified Butterfat'],
    nutrition: {
      protein: '0g',
      energy: '895 kcal / 100ml',
      goodFats: '99.5g',
      shelfLife: '12 Months',
    },
    image: '/src/assets/images/product_a2_ghee_jar_1793636457180.jpg',
    weightOptions: GHEE_VOLUME_OPTIONS,
  },

*/


];



export const CORE_BENEFITS = [
  {
    id: 'energy',
    title: 'ENERGY BOOSTER',
    description: 'Packed with pure healthy fats and complex carbs that fuel stamina, physical endurance, and clear mental energy without sugar crashes.',
    icon: 'Zap',
  },
  {
    id: 'immunity',
    title: 'IMMUNITY SUPPORT',
    description: 'Infused with antioxidant-rich nuts, edible gond, and natural vitamins (A, D, E, K) that strengthen natural immunity and internal vitality.',
    icon: 'ShieldCheck',
  },
  {
    id: 'natural',
    title: '100% NATURAL',
    description: 'Zero artificial preservatives, zero food colours, and zero synthetic flavours. Only pure farm ingredients prepared in hygienic small batches.',
    icon: 'Leaf',
  },
  {
    id: 'all-ages',
    title: 'GOOD FOR ALL AGES',
    description: 'Nourishes growing children, powers working adults, rejuvenates new mothers postpartum, and lubricates joint cartilage in elders.',
    icon: 'Dumbbell',
  },
];

export const BILONA_STEPS = [
  {
    step: '01',
    title: 'Fresh Grass-Fed Milk',
    description: 'Raw whole milk collected from healthy grass-fed cows fed on green seasonal fodder.',
  },
  {
    step: '02',
    title: 'Overnight Earthen Pot Curd',
    description: 'Milk is boiled gently on low fire and naturally inoculated to cultivate probiotic rich curd (dahi) overnight.',
  },
  {
    step: '03',
    title: 'Two-Way Wooden Churning',
    description: 'Curd is hand-churned in clockwise and anti-clockwise directions using a traditional wooden mathani to separate fresh butter (makhan).',
  },
  {
    step: '04',
    title: 'Slow Simmering & Clarification',
    description: 'Fresh makhan is gently simmered in heavy-bottom vessels until the water evaporates and milk solids caramelize to golden granules.',
  },
  {
    step: '05',
    title: 'Danedar Golden Ghee',
    description: 'Strained through fine muslin cloth into sanitised glass jars with fragrant aroma and distinctive grainy texture.',
  },
];

export interface MakingVideoChapter {
  id: string;
  title: string;
  itemType: 'ghee' | 'panjiri';
  duration: string;
  stepNumber: number;
  description: string;
  chefTips: string;
  videoSrc: string; // HTML5 video or animation stream
  posterImg: string;
}

export const MAKING_VIDEO_CHAPTERS: MakingVideoChapter[] = [
  {
    id: 'churn-butter',
    title: '1. Wooden Churning of Fresh Makhan',
    itemType: 'ghee',
    duration: '0:05',
    stepNumber: 1,
    description: 'Watch the rhythmic bi-directional churning of whole milk dahi in earthen pots to separate luscious, golden makhan from buttermilk.',
    chefTips: 'Keep the temperature cool during churning so the butter globule crystals stay intact and do not melt prematurely.',
    videoSrc: 'public/videos/1.mp4',
    posterImg: 'public/assets/images/tradition_vedic_bilona_1793636457582.jpg',
  },
  {
    id: 'simmer-ghee',
    title: '2. Slow Simmering into Danedar Ghee',
    itemType: 'ghee',
    duration: '0:05',
    stepNumber: 2,
    description: 'The golden makhan is gently melted over low flame. The foam crackles and settles, separating clear golden liquid ghee with aromatic granular sediments.',
    chefTips: 'Cook on low heat. High heat burns the caramelising milk solids and destroys the natural nutty fragrance.',
    videoSrc: 'public/videos/2.mp4',
    posterImg: 'public/assets/images/hero_bilona_ghee_pour_1793636454276.jpg',
  },
  {
    id: 'puff-gond',
    title: '3. Puffing Edible Gond & Makhana in Hot Ghee',
    itemType: 'panjiri',
    duration: '0:05',
    stepNumber: 3,
    description: 'Pure edible gum crystals (Gond) are dropped into hot desi ghee. They instantly expand and puff into airy, crunchy white popcorn-like gems.',
    chefTips: 'Gond must be roasted on medium-low heat so it cooks completely through without remaining hard or gummy in the center.',
    videoSrc: 'public/videos/3.mp4',
    posterImg: 'public/assets/images/product_panjiri_bowl_1793636456547.jpg',
  },
  {
    id: 'roast-atta',
    title: '4. Slow Roasting Whole Wheat in Asli Ghee',
    itemType: 'panjiri',
    duration: '0:05',
    stepNumber: 4,
    description: 'Coarse whole wheat flour (atta) and suji are roasted continuously in generous ladles of pure desi ghee until a deep golden hue and intoxicating roasted aroma fills the kitchen.',
    chefTips: 'Constant stirring with a heavy wooden ladle prevents scorching and produces uniform nutty sweetness.',
    videoSrc: 'public/videos/4.mp4',
    posterImg: 'public/assets/aistudio/image_9615a613.png',
  },
  {
    id: 'combine-nuts',
    title: '5. Folding Roasted Dry Fruits, Cardamom & Saffron',
    itemType: 'panjiri',
    duration: '0:05',
    stepNumber: 5,
    description: 'Ghee-roasted almonds, cashews, pistachios, melon seeds, crushed gond, and freshly ground green cardamom with saffron strands are folded into the warm mixture.',
    chefTips: 'Sweetener is added only after the roasted mixture cools slightly, preserving its crisp texture without turning sticky.',
    videoSrc: 'public/videos/5.mp4',
    posterImg: 'public/assets/images/product_panjiri_bowl_1793636456547.jpg',
  },
];

export interface CategoryItem {
  id: string;
  name: string;
  title: string;
  description: string;
  bgImage: string;
}

export const MENU_CATEGORIES: CategoryItem[] = [
  {
    id: 'offered',
    name: "TODAY'S OFFER",
    title: "Don't miss",
    description: "Special daily discount items carefully curated by our executive head chef.",
    bgImage: '/assets/menu/banner3.jpg',
  },
  {
    id: 'dessert',
    name: 'DESSERTS',
    title: 'Sweet Temptation',
    description: 'Delectable French pastries, rich chocolates, and handcrafted dessert creations.',
    bgImage: '/assets/menu/dessert-bg.jpeg',
  },
  {
    id: 'pizza',
    name: 'PIZZA',
    title: 'Artisan Pizzas',
    description: 'Wood-fired sourdough pizzas crafted with authentic Italian ingredients and fresh basil.',
    bgImage: '/assets/menu/pizza-bg.jpg',
  },
  {
    id: 'salad',
    name: 'SALADS',
    title: 'Fresh & Organic',
    description: 'Crisp seasonal greens, organic farm produce, and chef special house dressings.',
    bgImage: '/assets/menu/salad-bg.jpg',
  },
  {
    id: 'soup',
    name: 'SOUPS',
    title: 'Warm & Comforting',
    description: 'Hearty slow-simmered broths, creamy wild mushroom velvet, and traditional seafood chowder.',
    bgImage: '/assets/menu/soup-bg.jpg',
  },
  {
    id: 'drinks',
    name: 'DRINKS',
    title: 'Refreshing Beverages',
    description: 'Craft mocktails, artisanal coffees, freshly squeezed juices, and fine organic teas.',
    bgImage: '/assets/menu/banner3.jpg',
  },
];

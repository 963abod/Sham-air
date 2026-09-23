export interface MenuItem {
  id: string;
  category: 'Appetizer' | 'Main' | 'Dessert' | 'Beverage';
  nameEnglish: string;
  nameArabic: string;
  description: string;
  calories: string;
  cabinAvailability: ('first' | 'business' | 'premium_economy' | 'economy')[];
}

export const DINING_MENUS: MenuItem[] = [
  {
    id: 'm1',
    category: 'Appetizer',
    nameEnglish: 'Grand Mezze Damascus Sanctuary',
    nameArabic: 'مقبلات الشام الملكية',
    description: 'Fresh pomegranate molasses hummus, smoked eggplant mutabbal with Aleppo pepper infused extra virgin olive oil, and handmade vine leaves stuffed with spiced rice.',
    calories: '380 kcal',
    cabinAvailability: ['first', 'business'],
  },
  {
    id: 'm2',
    category: 'Main',
    nameEnglish: 'Royal Lamb Shank Ouzi in Filo Pastry',
    nameArabic: 'قوزي اللحم الملكي بالفستق الحلبي',
    description: 'Slow-cooked Syrian lamb shoulder over aromatic cardamom rice, roasted pistachios, and pine nuts encased in golden crispy filo pastry.',
    calories: '720 kcal',
    cabinAvailability: ['first', 'business', 'premium_economy'],
  },
  {
    id: 'm3',
    category: 'Dessert',
    nameEnglish: 'Baklawa Jewels with Bouza Fresh Jasmine Ice Cream',
    nameArabic: 'بقلاوة الشام مع البوظة العربية بالمسكة والورد',
    description: 'Layered pistachio pastry accompanied by authentic hand-pounded Damascene mastic ice cream garnished with edible Damascus rose petals.',
    calories: '450 kcal',
    cabinAvailability: ['first', 'business'],
  },
  {
    id: 'm4',
    category: 'Beverage',
    nameEnglish: 'Syrian Imperial Mint Limonada & White Coffee',
    nameArabic: 'ليموناضة بالنعناع والقهوة البيضاء بالزهر',
    description: 'Freshly pressed lemons with crushed garden mint, followed by traditional Damascene hot blossom orange water.',
    calories: '110 kcal',
    cabinAvailability: ['first', 'business', 'premium_economy', 'economy'],
  },
];

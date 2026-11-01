const MENU_CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const MENU_ITEMS = [
  // Starters
  {
    id: 's1',
    name: 'Ember-Blistered Shishito Peppers',
    description: 'Fire-blistered peppers, smoked sea salt, lime crema, toasted cumin.',
    price: 16,
    category: 'Starters',
    veg: true,
  },
  {
    id: 's2',
    name: 'Wood-Oven Burrata',
    description: 'Charred sourdough, heirloom tomatoes, basil oil, 25-year aged balsamic.',
    price: 21,
    category: 'Starters',
    veg: true,
    chefPick: true,
  },
  {
    id: 's3',
    name: 'Fire-Roasted Bone Marrow',
    description: 'Oak-smoked marrow, grilled bread, parsley salad, charred shallots.',
    price: 19,
    category: 'Starters',
  },
  {
    id: 's4',
    name: 'Ember Calamari',
    description: 'Flash-fried in ember ash oil, lemon-herb aioli, pickled fennel.',
    price: 18,
    category: 'Starters',
    spicy: true,
  },
  {
    id: 's5',
    name: 'Tandoori Paneer Tikka',
    description: 'Fire-charred paneer, smoked paprika, onion masala, mint chutney.',
    price: 18,
    category: 'Starters',
    veg: true,
    spicy: true,
  },

  // Mains
  {
    id: 'm1',
    name: 'Oak-Fired Ribeye',
    description: '45-day dry-aged, bone-marrow jus, ember onion, smoked potato purée.',
    price: 68,
    category: 'Mains',
    signature: true,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'm2',
    name: 'Fire-Roasted Branzino',
    description: 'Whole fish over open flame, fennel, preserved lemon, herb salsa verde.',
    price: 52,
    category: 'Mains',
    signature: true,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'm3',
    name: 'Ember-Smoked Lamb Shoulder',
    description: '18-hour oak smoke, smoked eggplant, pomegranate jus, grilled herbs.',
    price: 46,
    category: 'Mains',
    chefPick: true,
  },
  {
    id: 'm4',
    name: 'Ember-Roasted Half Chicken',
    description: 'Clamshell-roasted over oak, smoked pan jus, charred spring onion.',
    price: 38,
    category: 'Mains',
  },
  {
    id: 'm5',
    name: 'Tandoori Flame Chicken',
    description:
      'Fire-roasted tikka chicken over oak coals, yogurt-mint masala, charred onion, lemon rice.',
    price: 44,
    category: 'Mains',
    spicy: true,
    chefPick: true,
  },
  {
    id: 'm6',
    name: 'Tandoor Oak Lamb',
    description: 'Charcoal oak smoke, garam masala crust, mint chutney, saffron basmati.',
    price: 58,
    category: 'Mains',
    signature: true,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },

  // Desserts
  {
    id: 'd1',
    name: 'Burnt Basque Cheesecake',
    description: 'Caramelized top, vanilla bean, macerated seasonal berries.',
    price: 14,
    category: 'Desserts',
    signature: true,
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'd2',
    name: 'Ember Chocolate Cake',
    description: 'Dark chocolate, smoked salt, oak cream, cocoa nib tuile.',
    price: 16,
    category: 'Desserts',
    chefPick: true,
  },
  {
    id: 'd3',
    name: "Campfire S'mores",
    description: 'Toasted meringue, dark chocolate, graham ash, smoked vanilla.',
    price: 12,
    category: 'Desserts',
  },
  {
    id: 'd4',
    name: 'Smoked Cardamom Kulfi',
    description: 'Slow fire-smoked cardamom, saffron, pistachio, rose water.',
    price: 12,
    category: 'Desserts',
    chefPick: true,
  },

  // Drinks
  {
    id: 'dr1',
    name: 'Ember Old Fashioned',
    description: 'Small-batch bourbon, demerara, burnt orange, smoked cedar bitters.',
    price: 18,
    category: 'Drinks',
  },
  {
    id: 'dr2',
    name: 'Oak & Smoke Spritz',
    description: 'Oak-aged amaro, smoked rosemary, prosecco, charred grapefruit.',
    price: 16,
    category: 'Drinks',
  },
  {
    id: 'dr3',
    name: 'Fire & Smoke Negroni',
    description: 'Gin, campari, cacao, mezcal veil, orange smoke.',
    price: 17,
    category: 'Drinks',
    spicy: true,
  },
  {
    id: 'dr4',
    name: 'Golden Hour',
    description: 'Blanco tequila, yellow chartreuse, fresh lime, chili salt rim.',
    price: 19,
    category: 'Drinks',
  },
  {
    id: 'dr5',
    name: 'Ember Mango Lassi',
    description: 'Charred seasonal mango, cardamom, hand-set yogurt, toasted pistachio.',
    price: 9,
    category: 'Drinks',
  },
];

export function getDishesByCategory(category) {
  if (!category || category === 'All') return MENU_ITEMS;
  return MENU_ITEMS.filter((dish) => dish.category === category);
}

export function getDishById(id) {
  return MENU_ITEMS.find((dish) => dish.id === id);
}

export function getSignatureDishes() {
  return MENU_ITEMS.filter((dish) => dish.signature);
}

export { MENU_CATEGORIES };
export default MENU_ITEMS;

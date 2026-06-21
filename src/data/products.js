/**
 * PC Forge — Product Data
 *
 * All gaming PC components organized by category.
 * Real product names and realistic pricing.
 * Each product includes compatibility-relevant spec fields.
 */

export const STEP_ORDER = [
  'cpu',
  'gpu',
  'motherboard',
  'ram',
  'storage',
  'pccase',
  'psu',
];

export const STEP_LABELS = {
  cpu: 'Processor',
  gpu: 'Graphics Card',
  motherboard: 'Motherboard',
  ram: 'Memory',
  storage: 'Storage',
  pccase: 'Case',
  psu: 'Power Supply',
};

export const STEP_DESCRIPTIONS = {
  cpu: 'Choose the brain of your build. The processor determines overall system performance.',
  gpu: 'Select your graphics card. This is the most important component for gaming performance.',
  motherboard: 'Pick a motherboard that matches your processor and desired features.',
  ram: 'Choose your system memory. More RAM allows better multitasking.',
  storage: 'Select your storage drive. NVMe SSDs offer the fastest load times.',
  pccase: 'Pick a case that fits your components and matches your style.',
  psu: 'Choose a power supply with enough wattage for your build.',
};

/**
 * Category-level product images from Unsplash (free, stable CDN).
 * One representative image per component category for visual consistency.
 */
export const CATEGORY_IMAGES = {
  cpu: 'https://images.unsplash.com/photo-1555617981-dac3d01ab5eb?w=400&h=300&fit=crop&auto=format&q=80',
  gpu: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop&auto=format&q=80',
  motherboard: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format&q=80',
  ram: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop&auto=format&q=80',
  storage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop&auto=format&q=80',
  pccase: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop&auto=format&q=80',
  psu: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&auto=format&q=80',
};

// ─── CPUs ────────────────────────────────────────────────

export const cpus = [
  {
    'id': 'cpu-001',
    'category': 'cpu',
    'name': 'AMD Ryzen 9 7950X',
    'brand': 'AMD',
    'price': 549,
    'image': '/processors/AMD Ryzen 9 7950X.jpg',
    'specs': {
      'cores': 16,
      'threads': 32,
      'baseClock': '4.5 GHz',
      'boostClock': '5.7 GHz',
      'tdp': 170,
      'socket': 'AM5'
    },
    'popular': true
  },
  {
    'id': 'cpu-002',
    'category': 'cpu',
    'name': 'AMD Ryzen 7 7800X3D',
    'brand': 'AMD',
    'price': 349,
    'image': '/processors/AMD Ryzen 7 7800X3Djpg.jpg',
    'specs': {
      'cores': 8,
      'threads': 16,
      'baseClock': '4.2 GHz',
      'boostClock': '5.0 GHz',
      'tdp': 120,
      'socket': 'AM5'
    },
    'popular': true
  },
  {
    'id': 'cpu-003',
    'category': 'cpu',
    'name': 'AMD Ryzen 5 7600X',
    'brand': 'AMD',
    'price': 199,
    'image': '/processors/AMD Ryzen 5 7600X.jpg',
    'specs': {
      'cores': 6,
      'threads': 12,
      'baseClock': '4.7 GHz',
      'boostClock': '5.3 GHz',
      'tdp': 105,
      'socket': 'AM5'
    },
    'popular': false
  },
  {
    'id': 'cpu-004',
    'category': 'cpu',
    'name': 'Intel Core i9-14900K',
    'brand': 'Intel',
    'price': 544,
    'image': '/processors/iIntel Core i9-14900K.jpg',
    'specs': {
      'cores': 24,
      'threads': 32,
      'baseClock': '3.2 GHz',
      'boostClock': '6.0 GHz',
      'tdp': 253,
      'socket': 'LGA1700'
    },
    'popular': true
  },
  {
    'id': 'cpu-005',
    'category': 'cpu',
    'name': 'Intel Core i7-14700K',
    'brand': 'Intel',
    'price': 384,
    'image': '/processors/Intel Core i7-14700K.jpg',
    'specs': {
      'cores': 20,
      'threads': 28,
      'baseClock': '3.4 GHz',
      'boostClock': '5.6 GHz',
      'tdp': 253,
      'socket': 'LGA1700'
    },
    'popular': false
  },
  {
    'id': 'cpu-006',
    'category': 'cpu',
    'name': 'Intel Core i5-14600K',
    'brand': 'Intel',
    'price': 249,
    'image': '/processors/Intel Core i5-14600K.jpg',
    'specs': {
      'cores': 14,
      'threads': 20,
      'baseClock': '3.5 GHz',
      'boostClock': '5.3 GHz',
      'tdp': 181,
      'socket': 'LGA1700'
    },
    'popular': false
  },
  {
    'id': 'cpu-007',
    'category': 'cpu',
    'name': 'AMD Ryzen 5 7600',
    'brand': 'AMD',
    'price': 229,
    'image': '/processors/AMD Ryzen 5 7600.jpg',
    'specs': {
      'cores': 6,
      'threads': 12,
      'baseClock': '3.8 GHz',
      'boostClock': '5.1 GHz',
      'tdp': 65,
      'socket': 'AM5'
    },
    'popular': false
  },
  {
    'id': 'cpu-008',
    'category': 'cpu',
    'name': 'AMD Ryzen 9 7900X',
    'brand': 'AMD',
    'price': 439,
    'image': '/processors/AMD Ryzen 9 7900X.jpg',
    'specs': {
      'cores': 12,
      'threads': 24,
      'baseClock': '4.7 GHz',
      'boostClock': '5.6 GHz',
      'tdp': 170,
      'socket': 'AM5'
    },
    'popular': false
  },
  {
    'id': 'cpu-009',
    'category': 'cpu',
    'name': 'Intel Core i5-13400F',
    'brand': 'Intel',
    'price': 189,
    'image': '/processors/Intel Core i5-13400F.jpg',
    'specs': {
      'cores': 10,
      'threads': 16,
      'baseClock': '2.5 GHz',
      'boostClock': '4.6 GHz',
      'tdp': 65,
      'socket': 'LGA1700'
    },
    'popular': false
  },
  {
    'id': 'cpu-010',
    'category': 'cpu',
    'name': 'Intel Core i3-13100F',
    'brand': 'Intel',
    'price': 119,
    'image': '/processors/Intel Core i3-13100F.jpg',
    'specs': {
      'cores': 4,
      'threads': 8,
      'baseClock': '3.4 GHz',
      'boostClock': '4.5 GHz',
      'tdp': 58,
      'socket': 'LGA1700'
    },
    'popular': false
  },
  {
    'id': 'cpu-011',
    'category': 'cpu',
    'name': 'AMD Ryzen 7 7700X',
    'brand': 'AMD',
    'price': 299,
    'image': '/processors/AMD Ryzen 7 7700X.jpg',
    'specs': {
      'cores': 8,
      'threads': 16,
      'baseClock': '4.5 GHz',
      'boostClock': '5.4 GHz',
      'tdp': 105,
      'socket': 'AM5'
    },
    'popular': false
  },
  {
    'id': 'cpu-012',
    'category': 'cpu',
    'name': 'Intel Core i9-13900K',
    'brand': 'Intel',
    'price': 519,
    'image': '/processors/Intel Core i9-13900K.jpg',
    'specs': {
      'cores': 24,
      'threads': 32,
      'baseClock': '3.0 GHz',
      'boostClock': '5.8 GHz',
      'tdp': 253,
      'socket': 'LGA1700'
    },
    'popular': false
  }
];

// ─── GPUs ────────────────────────────────────────────────

export const gpus = [
  {
    'id': 'gpu-001',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4090',
    'brand': 'NVIDIA',
    'price': 1599,
    'image': '/graphics-cards/NVIDIA RTX 4090.png',
    'specs': {
      'vram': '24 GB GDDR6X',
      'boostClock': '2.52 GHz',
      'tdp': 450,
      'length': 336
    },
    'popular': true
  },
  {
    'id': 'gpu-002',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4080 Super',
    'brand': 'NVIDIA',
    'price': 999,
    'image': '/graphics-cards/NVIDIA RTX 4080 Super.webp',
    'specs': {
      'vram': '16 GB GDDR6X',
      'boostClock': '2.55 GHz',
      'tdp': 320,
      'length': 304
    },
    'popular': true
  },
  {
    'id': 'gpu-003',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4070 Ti Super',
    'brand': 'NVIDIA',
    'price': 799,
    'image': '/graphics-cards/NVIDIA RTX 4070 Ti Super.webp',
    'specs': {
      'vram': '16 GB GDDR6X',
      'boostClock': '2.61 GHz',
      'tdp': 285,
      'length': 300
    },
    'popular': false
  },
  {
    'id': 'gpu-004',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4070 Super',
    'brand': 'NVIDIA',
    'price': 599,
    'image': '/graphics-cards/NVIDIA RTX 4070 Super.png',
    'specs': {
      'vram': '12 GB GDDR6X',
      'boostClock': '2.48 GHz',
      'tdp': 220,
      'length': 267
    },
    'popular': false
  },
  {
    'id': 'gpu-005',
    'category': 'gpu',
    'name': 'AMD Radeon RX 7900 XTX',
    'brand': 'AMD',
    'price': 899,
    'image': '/graphics-cards/AMD Radeon RX 7900 XTX.webp',
    'specs': {
      'vram': '24 GB GDDR6',
      'boostClock': '2.50 GHz',
      'tdp': 355,
      'length': 287
    },
    'popular': false
  },
  {
    'id': 'gpu-006',
    'category': 'gpu',
    'name': 'AMD Radeon RX 7800 XT',
    'brand': 'AMD',
    'price': 479,
    'image': '/graphics-cards/AMD Radeon RX 7800 XT.avif',
    'specs': {
      'vram': '16 GB GDDR6',
      'boostClock': '2.43 GHz',
      'tdp': 263,
      'length': 267
    },
    'popular': false
  },
  {
    'id': 'gpu-007',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4060 Ti',
    'brand': 'NVIDIA',
    'price': 399,
    'image': '/graphics-cards/NVIDIA RTX 4060 Ti.webp',
    'specs': {
      'vram': '8 GB GDDR6',
      'boostClock': '2.54 GHz',
      'tdp': 160,
      'length': 240
    },
    'popular': false
  },
  {
    'id': 'gpu-008',
    'category': 'gpu',
    'name': 'NVIDIA RTX 4060',
    'brand': 'NVIDIA',
    'price': 299,
    'image': '/graphics-cards/NVIDIA RTX 4060.png',
    'specs': {
      'vram': '8 GB GDDR6',
      'boostClock': '2.46 GHz',
      'tdp': 115,
      'length': 200
    },
    'popular': false
  },
  {
    'id': 'gpu-009',
    'category': 'gpu',
    'name': 'AMD Radeon RX 7900 XT',
    'brand': 'AMD',
    'price': 749,
    'image': '/graphics-cards/AMD Radeon RX 7900 XT.png',
    'specs': {
      'vram': '20 GB GDDR6',
      'boostClock': '2.40 GHz',
      'tdp': 315,
      'length': 276
    },
    'popular': false
  },
  {
    'id': 'gpu-010',
    'category': 'gpu',
    'name': 'AMD Radeon RX 7700 XT',
    'brand': 'AMD',
    'price': 419,
    'image': '/graphics-cards/AMD Radeon RX 7700 XT.webp',
    'specs': {
      'vram': '12 GB GDDR6',
      'boostClock': '2.54 GHz',
      'tdp': 245,
      'length': 267
    },
    'popular': false
  },
  {
    'id': 'gpu-011',
    'category': 'gpu',
    'name': 'AMD Radeon RX 7600',
    'brand': 'AMD',
    'price': 269,
    'image': '/graphics-cards/AMD Radeon RX 7600.png',
    'specs': {
      'vram': '8 GB GDDR6',
      'boostClock': '2.66 GHz',
      'tdp': 165,
      'length': 205
    },
    'popular': false
  },
  {
    'id': 'gpu-012',
    'category': 'gpu',
    'name': 'Intel Arc A770',
    'brand': 'Intel',
    'price': 289,
    'image': '/graphics-cards/Intel Arc A770.png',
    'specs': {
      'vram': '16 GB GDDR6',
      'boostClock': '2.10 GHz',
      'tdp': 225,
      'length': 268
    },
    'popular': false
  }
];

// ─── Motherboards ────────────────────────────────────────

export const motherboards = [
  {
    'id': 'mb-001',
    'category': 'motherboard',
    'name': 'ASUS ROG Crosshair X670E Hero',
    'brand': 'ASUS',
    'price': 699,
    'image': '/motherboard/ASUS ROG Crosshair X670E Hero.webp',
    'specs': {
      'socket': 'AM5',
      'chipset': 'X670E',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': true
  },
  {
    'id': 'mb-002',
    'category': 'motherboard',
    'name': 'MSI MAG B650 Tomahawk WiFi',
    'brand': 'MSI',
    'price': 259,
    'image': '/motherboard/MSI. MAG B650 Tomahawk WiFi.png',
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': true
  },
  {
    'id': 'mb-003',
    'category': 'motherboard',
    'name': 'Gigabyte B650M Aorus Elite AX',
    'brand': 'Gigabyte',
    'price': 189,
    'image': '/motherboard/Gigabyte B650M Aorus Elite AX.png',
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650',
      'formFactor': 'Micro-ATX',
      'ramType': 'DDR5',
      'ramSlots': 2,
      'maxRam': '64 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-004',
    'category': 'motherboard',
    'name': 'ASUS ROG Maximus Z790 Hero',
    'brand': 'ASUS',
    'price': 629,
    'image': '/motherboard/ASUS ROG Maximus Z790 Hero.jpg',
    'specs': {
      'socket': 'LGA1700',
      'chipset': 'Z790',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': true
  },
  {
    'id': 'mb-005',
    'category': 'motherboard',
    'name': 'MSI PRO B760M-A WiFi',
    'brand': 'MSI',
    'price': 139,
    'image': '/motherboard/MSI PRO B760M-A WiFi.png',
    'specs': {
      'socket': 'LGA1700',
      'chipset': 'B760',
      'formFactor': 'Micro-ATX',
      'ramType': 'DDR5',
      'ramSlots': 2,
      'maxRam': '64 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-006',
    'category': 'motherboard',
    'name': 'ASRock B650E Taichi',
    'brand': 'ASRock',
    'price': 369,
    'image': '/motherboard/ASRock B650E Taichi.jpg',
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650E',
      'formFactor': 'E-ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-007',
    'category': 'motherboard',
    'name': 'Gigabyte Z790 AORUS ELITE',
    'brand': 'Gigabyte',
    'price': 249,
    'image': '/motherboard/Gigabyte Z790 AORUS ELITE.jpg',
    'specs': {
      'socket': 'LGA1700',
      'chipset': 'Z790',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-008',
    'category': 'motherboard',
    'name': 'MSI MAG X670E TOMAHAWK',
    'brand': 'MSI',
    'price': 279,
    'image': '/motherboard/MSI MAG X670E TOMAHAWK.jpg',
    'specs': {
      'socket': 'AM5',
      'chipset': 'X670E',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-009',
    'category': 'motherboard',
    'name': 'ASUS ROG STRIX B650-A',
    'brand': 'ASUS',
    'price': 229,
    'image': '/motherboard/ASUS ROG STRIX B650-A.jpg',
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-010',
    'category': 'motherboard',
    'name': 'ASRock B760 Pro RS',
    'brand': 'ASRock',
    'price': 149,
    'image': '/motherboard/ASRock B760 Pro RS.png',
    'specs': {
      'socket': 'LGA1700',
      'chipset': 'B760',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-011',
    'category': 'motherboard',
    'name': 'Gigabyte B650 AORUS ELITE AX',
    'brand': 'Gigabyte',
    'price': 199,
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  },
  {
    'id': 'mb-012',
    'category': 'motherboard',
    'name': 'ASUS TUF GAMING B650-PLUS',
    'brand': 'ASUS',
    'price': 199,
    'image': '/motherboard/ASUS TUF GAMING B650-PLUS.jpg',
    'specs': {
      'socket': 'AM5',
      'chipset': 'B650',
      'formFactor': 'ATX',
      'ramType': 'DDR5',
      'ramSlots': 4,
      'maxRam': '128 GB'
    },
    'popular': false
  }
];

// ─── RAM ─────────────────────────────────────────────────

export const ram = [
  {
    'id': 'ram-001',
    'category': 'ram',
    'name': 'G.Skill Trident Z5 RGB 32GB',
    'brand': 'G.Skill',
    'price': 124,
    'image': '/Memory/G.Skill Trident Z5 RGB 32GB.webp',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6000 MHz',
      'latency': 'CL30'
    },
    'popular': true
  },
  {
    'id': 'ram-002',
    'category': 'ram',
    'name': 'Corsair Vengeance 32GB',
    'brand': 'Corsair',
    'price': 99,
    'image': '/Memory/Corsair Vengeance 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '5600 MHz',
      'latency': 'CL36'
    },
    'popular': true
  },
  {
    'id': 'ram-003',
    'category': 'ram',
    'name': 'Kingston Fury Beast 64GB',
    'brand': 'Kingston',
    'price': 219,
    'image': '/Memory/Kingston Fury Beast 64GB.jpg',
    'specs': {
      'capacity': '64 GB (2x32)',
      'type': 'DDR5',
      'speed': '5200 MHz',
      'latency': 'CL40'
    },
    'popular': false
  },
  {
    'id': 'ram-004',
    'category': 'ram',
    'name': 'G.Skill Trident Z5 RGB 64GB',
    'brand': 'G.Skill',
    'price': 249,
    'image': '/Memory/G.Skill Trident Z5 RGB 64GB.jpg',
    'specs': {
      'capacity': '64 GB (2x32)',
      'type': 'DDR5',
      'speed': '6400 MHz',
      'latency': 'CL32'
    },
    'popular': false
  },
  {
    'id': 'ram-005',
    'category': 'ram',
    'name': 'Corsair Dominator Titanium 32GB',
    'brand': 'Corsair',
    'price': 189,
    'image': '/Memory/Corsair Dominator Titanium 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '7200 MHz',
      'latency': 'CL34'
    },
    'popular': false
  },
  {
    'id': 'ram-006',
    'category': 'ram',
    'name': 'TeamGroup T-Force Delta RGB 32GB',
    'brand': 'TeamGroup',
    'price': 109,
    'image': '/Memory/TeamGroup T-Force Delta RGB 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6000 MHz',
      'latency': 'CL30'
    },
    'popular': false
  },
  {
    'id': 'ram-007',
    'category': 'ram',
    'name': 'Crucial Pro 32GB',
    'brand': 'Crucial',
    'price': 89,
    'image': '/Memory/Crucial Pro 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '5600 MHz',
      'latency': 'CL46'
    },
    'popular': false
  },
  {
    'id': 'ram-008',
    'category': 'ram',
    'name': 'G.Skill Flare X5 32GB',
    'brand': 'G.Skill',
    'price': 104,
    'image': '/Memory/G.Skill Flare X5 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6000 MHz',
      'latency': 'CL36'
    },
    'popular': false
  },
  {
    'id': 'ram-009',
    'category': 'ram',
    'name': 'Corsair Vengeance RGB 64GB',
    'brand': 'Corsair',
    'price': 214,
    'image': '/Memory/Corsair Vengeance RGB 64GB.jpg',
    'specs': {
      'capacity': '64 GB (2x32)',
      'type': 'DDR5',
      'speed': '6000 MHz',
      'latency': 'CL30'
    },
    'popular': false
  },
  {
    'id': 'ram-010',
    'category': 'ram',
    'name': 'Kingston Fury Renegade 32GB',
    'brand': 'Kingston',
    'price': 134,
    'image': '/Memory/Kingston Fury Renegade 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6400 MHz',
      'latency': 'CL32'
    },
    'popular': false
  },
  {
    'id': 'ram-011',
    'category': 'ram',
    'name': 'Patriot Viper Venom 32GB',
    'brand': 'Patriot',
    'price': 119,
    'image': '/Memory/Patriot Viper Venom 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6200 MHz',
      'latency': 'CL40'
    },
    'popular': false
  },
  {
    'id': 'ram-012',
    'category': 'ram',
    'name': 'Adata XPG Lancer 32GB',
    'brand': 'Adata',
    'price': 115,
    'image': '/Memory/Adata XPG Lancer 32GB.jpg',
    'specs': {
      'capacity': '32 GB (2x16)',
      'type': 'DDR5',
      'speed': '6000 MHz',
      'latency': 'CL30'
    },
    'popular': false
  }
];

// ─── Storage ─────────────────────────────────────────────

export const storage = [
  {
    'id': 'stor-001',
    'category': 'storage',
    'name': 'Samsung 990 Pro 2TB',
    'brand': 'Samsung',
    'price': 179,
    'image': '/Storage/Samsung 990 Pro 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen4',
      'read': '7,450 MB/s',
      'write': '6,900 MB/s'
    },
    'popular': true
  },
  {
    'id': 'stor-002',
    'category': 'storage',
    'name': 'WD Black SN850X 1TB',
    'brand': 'Western Digital',
    'price': 89,
    'image': '/Storage/WD Black SN850X 1TB.jpg',
    'specs': {
      'capacity': '1 TB',
      'type': 'NVMe Gen4',
      'read': '7,300 MB/s',
      'write': '6,300 MB/s'
    },
    'popular': true
  },
  {
    'id': 'stor-003',
    'category': 'storage',
    'name': 'Crucial T700 2TB',
    'brand': 'Crucial',
    'price': 249,
    'image': '/Storage/Crucial T700 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen5',
      'read': '12,400 MB/s',
      'write': '11,800 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-004',
    'category': 'storage',
    'name': 'Samsung 870 EVO 2TB',
    'brand': 'Samsung',
    'price': 149,
    'image': '/Storage/Samsung 870 EVO 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'SATA SSD',
      'read': '560 MB/s',
      'write': '530 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-005',
    'category': 'storage',
    'name': 'Seagate FireCuda 530 4TB',
    'brand': 'Seagate',
    'price': 499,
    'image': '/Storage/Seagate FireCuda 530 4TB.jpg',
    'specs': {
      'capacity': '4 TB',
      'type': 'NVMe Gen4',
      'read': '7,300 MB/s',
      'write': '6,900 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-006',
    'category': 'storage',
    'name': 'Samsung 980 Pro 1TB',
    'brand': 'Samsung',
    'price': 99,
    'image': '/Storage/Samsung 980 Pro 1TB.jpg',
    'specs': {
      'capacity': '1 TB',
      'type': 'NVMe Gen4',
      'read': '7,000 MB/s',
      'write': '5,000 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-007',
    'category': 'storage',
    'name': 'Crucial P3 Plus 2TB',
    'brand': 'Crucial',
    'price': 119,
    'image': '/Storage/Crucial P3 Plus 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen4',
      'read': '5,000 MB/s',
      'write': '4,200 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-008',
    'category': 'storage',
    'name': 'WD Blue SN580 1TB',
    'brand': 'Western Digital',
    'price': 69,
    'image': '/Storage/WD Blue SN580 1TB.jpg',
    'specs': {
      'capacity': '1 TB',
      'type': 'NVMe Gen4',
      'read': '4,150 MB/s',
      'write': '4,150 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-009',
    'category': 'storage',
    'name': 'Kingston KC3000 2TB',
    'brand': 'Kingston',
    'price': 159,
    'image': '/Storage/Kingston KC3000 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen4',
      'read': '7,000 MB/s',
      'write': '7,000 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-010',
    'category': 'storage',
    'name': 'Corsair MP600 Pro 2TB',
    'brand': 'Corsair',
    'price': 169,
    'image': '/Storage/Corsair MP600 Pro 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen4',
      'read': '7,100 MB/s',
      'write': '6,800 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-011',
    'category': 'storage',
    'name': 'Sabrent Rocket 4.0 1TB',
    'brand': 'Sabrent',
    'price': 89,
    'image': '/Storage/Sabrent Rocket 4.0 1TB.jpg',
    'specs': {
      'capacity': '1 TB',
      'type': 'NVMe Gen4',
      'read': '5,000 MB/s',
      'write': '4,400 MB/s'
    },
    'popular': false
  },
  {
    'id': 'stor-012',
    'category': 'storage',
    'name': 'TeamGroup MP44L 2TB',
    'brand': 'TeamGroup',
    'price': 114,
    'image': '/Storage/TeamGroup MP44L 2TB.jpg',
    'specs': {
      'capacity': '2 TB',
      'type': 'NVMe Gen4',
      'read': '4,800 MB/s',
      'write': '4,400 MB/s'
    },
    'popular': false
  }
];

// ─── Cases ───────────────────────────────────────────────

export const cases = [
  {
    'id': 'case-001',
    'category': 'pccase',
    'name': 'Lian Li O11 Dynamic EVO',
    'brand': 'Lian Li',
    'price': 169,
    'image': '/cases/Lian Li O11 Dynamic EVO.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 420,
      'type': 'Mid Tower',
      'fans': '10× 120mm'
    },
    'popular': true
  },
  {
    'id': 'case-002',
    'category': 'pccase',
    'name': 'NZXT H7 Flow',
    'brand': 'NZXT',
    'price': 129,
    'image': '/cases/NZXT H7 Flow.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 400,
      'type': 'Mid Tower',
      'fans': '7× 120mm'
    },
    'popular': true
  },
  {
    'id': 'case-003',
    'category': 'pccase',
    'name': 'Corsair 4000D Airflow',
    'brand': 'Corsair',
    'price': 104,
    'image': '/cases/Corsair 4000D Airflow.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 360,
      'type': 'Mid Tower',
      'fans': '6× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-004',
    'category': 'pccase',
    'name': 'Fractal Design North',
    'brand': 'Fractal Design',
    'price': 139,
    'image': '/cases/Fractal Design North.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 355,
      'type': 'Mid Tower',
      'fans': '6× 140mm'
    },
    'popular': false
  },
  {
    'id': 'case-005',
    'category': 'pccase',
    'name': 'Phanteks NV7',
    'brand': 'Phanteks',
    'price': 219,
    'image': '/cases/Phanteks NV7.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 450,
      'type': 'Full Tower',
      'fans': '12× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-006',
    'category': 'pccase',
    'name': 'Lian Li Lancool 216',
    'brand': 'Lian Li',
    'price': 99,
    'image': '/cases/Lian Li Lancool 216.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 392,
      'type': 'Mid Tower',
      'fans': '3× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-007',
    'category': 'pccase',
    'name': 'Fractal Design Pop Air',
    'brand': 'Fractal Design',
    'price': 89,
    'image': '/cases/Fractal Design Pop Air.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 405,
      'type': 'Mid Tower',
      'fans': '5× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-008',
    'category': 'pccase',
    'name': 'NZXT H5 Flow',
    'brand': 'NZXT',
    'price': 94,
    'image': '/cases/NZXT H5 Flow.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 365,
      'type': 'Mid Tower',
      'fans': '6× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-009',
    'category': 'pccase',
    'name': 'Corsair 5000D Airflow',
    'brand': 'Corsair',
    'price': 149,
    'image': '/cases/Corsair 5000D Airflow.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 420,
      'type': 'Mid Tower',
      'fans': '10× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-010',
    'category': 'pccase',
    'name': 'Hyte Y60',
    'brand': 'Hyte',
    'price': 189,
    'image': '/cases/Hyte Y60.jpg',
    'modalImage': '/Untitled_design-removebg-preview.png',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 375,
      'type': 'Mid Tower',
      'fans': '8× 120mm'
    },
    'popular': false
  },
  {
    'id': 'case-011',
    'category': 'pccase',
    'name': 'be quiet! Pure Base 500DX',
    'brand': 'be quiet!',
    'price': 109,
    'image': '/cases/be quiet! Pure Base 500DX.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 369,
      'type': 'Mid Tower',
      'fans': '6× 140mm'
    },
    'popular': false
  },
  {
    'id': 'case-012',
    'category': 'pccase',
    'name': 'Cooler Master MasterBox TD500',
    'brand': 'Cooler Master',
    'price': 99,
    'image': '/cases/Cooler Master MasterBox TD500.jpg',
    'specs': {
      'formFactor': 'ATX',
      'maxGpuLength': 410,
      'type': 'Mid Tower',
      'fans': '7× 120mm'
    },
    'popular': false
  }
];

// ─── PSUs ────────────────────────────────────────────────

export const psus = [
  {
    'id': 'psu-001',
    'category': 'psu',
    'name': 'Corsair RM1000x',
    'brand': 'Corsair',
    'image': '/power-supply/Corsair RM1000x.jpg',
    'price': 189,
    'specs': {
      'wattage': 1000,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': true
  },
  {
    'id': 'psu-002',
    'category': 'psu',
    'name': 'EVGA SuperNOVA 850 G7',
    'brand': 'EVGA',
    'image': '/power-supply/EVGA SuperNOVA 850 G7.jpg',
    'price': 149,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': true
  },
  {
    'id': 'psu-003',
    'category': 'psu',
    'name': 'Seasonic Prime TX-1000',
    'brand': 'Seasonic',
    'image': '/power-supply/Seasonic Prime TX-1000.jpg',
    'price': 299,
    'specs': {
      'wattage': 1000,
      'efficiency': '80+ Titanium',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-004',
    'category': 'psu',
    'name': 'be quiet! Straight Power 12 750W',
    'brand': 'be quiet!',
    'image': '/power-supply/be quiet! Straight Power 12 750W.jpg',
    'price': 129,
    'specs': {
      'wattage': 750,
      'efficiency': '80+ Platinum',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-005',
    'category': 'psu',
    'name': 'Corsair RM850x',
    'brand': 'Corsair',
    'image': '/power-supply/Corsair RM850x.jpg',
    'price': 139,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-006',
    'category': 'psu',
    'name': 'Seasonic Focus GX-850',
    'brand': 'Seasonic',
    'image': '/power-supply/Seasonic Focus GX-850.jpg',
    'price': 149,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '120mm'
    },
    'popular': false
  },
  {
    'id': 'psu-007',
    'category': 'psu',
    'name': 'MSI MPG A850G',
    'brand': 'MSI',
    'image': '/power-supply/MSI MPG A850G.jpg',
    'price': 129,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-008',
    'category': 'psu',
    'name': 'Thermaltake GF3 850W',
    'brand': 'Thermaltake',
    'image': '/power-supply/Thermaltake GF3 850W.jpg',
    'price': 119,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-009',
    'category': 'psu',
    'name': 'Corsair SF750',
    'brand': 'Corsair',
    'image': '/power-supply/Corsair SF750.jpg',
    'price': 169,
    'specs': {
      'wattage': 750,
      'efficiency': '80+ Platinum',
      'modular': 'Fully Modular',
      'fanSize': '92mm'
    },
    'popular': false
  },
  {
    'id': 'psu-010',
    'category': 'psu',
    'name': 'be quiet! Pure Power 12 M 850W',
    'brand': 'be quiet!',
    'image': '/power-supply/be quiet! Pure Power 12 M 850W.jpg',
    'price': 134,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '120mm'
    },
    'popular': false
  },
  {
    'id': 'psu-011',
    'category': 'psu',
    'name': 'EVGA SuperNOVA 1000 GT',
    'brand': 'EVGA',
    'image': '/power-supply/EVGA SuperNOVA 1000 GT.jpg',
    'price': 169,
    'specs': {
      'wattage': 1000,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  },
  {
    'id': 'psu-012',
    'category': 'psu',
    'name': 'ASUS ROG Strix 850W',
    'brand': 'ASUS',
    'image': '/power-supply/ASUS ROG Strix 850W.jpg',
    'price': 159,
    'specs': {
      'wattage': 850,
      'efficiency': '80+ Gold',
      'modular': 'Fully Modular',
      'fanSize': '135mm'
    },
    'popular': false
  }
];

// ─── Category → Products mapping ────────────────────────

export const productsByCategory = {
  cpu: cpus,
  gpu: gpus,
  motherboard: motherboards,
  ram: ram,
  storage: storage,
  pccase: cases,
  psu: psus,
};

/**
 * Get unique brands for a given category.
 */
export function getBrandsForCategory(category) {
  const products = productsByCategory[category] || [];
  return [...new Set(products.map((p) => p.brand))];
}

/**
 * Get the spec keys to display for a given category.
 */
export function getSpecLabels(category) {
  const labels = {
    cpu: { cores: 'Cores', threads: 'Threads', boostClock: 'Boost', tdp: 'TDP', socket: 'Socket' },
    gpu: { vram: 'VRAM', boostClock: 'Boost', tdp: 'TDP', length: 'Length' },
    motherboard: { chipset: 'Chipset', formFactor: 'Form Factor', ramType: 'RAM Type', ramSlots: 'RAM Slots' },
    ram: { capacity: 'Capacity', speed: 'Speed', type: 'Type', latency: 'Latency' },
    storage: { capacity: 'Capacity', type: 'Type', read: 'Read', write: 'Write' },
    pccase: { type: 'Type', formFactor: 'Form Factor', maxGpuLength: 'Max GPU', fans: 'Fan Support' },
    psu: { wattage: 'Wattage', efficiency: 'Efficiency', modular: 'Modular' },
  };
  return labels[category] || {};
}

/**
 * Get ALL spec keys with human-readable labels for the Learn More modal.
 * Unlike getSpecLabels, this returns every available spec field.
 */
export function getFullSpecLabels(category) {
  const labels = {
    cpu: { cores: 'Cores', threads: 'Threads', baseClock: 'Base Clock', boostClock: 'Boost Clock', tdp: 'TDP', socket: 'Socket' },
    gpu: { vram: 'VRAM', boostClock: 'Boost Clock', tdp: 'TDP', length: 'Card Length' },
    motherboard: { socket: 'CPU Socket', chipset: 'Chipset', formFactor: 'Form Factor', ramType: 'Memory Type', ramSlots: 'Memory Slots', maxRam: 'Max Memory' },
    ram: { capacity: 'Capacity', type: 'Type', speed: 'Speed', latency: 'CAS Latency' },
    storage: { capacity: 'Capacity', type: 'Interface', read: 'Sequential Read', write: 'Sequential Write' },
    pccase: { type: 'Case Type', formFactor: 'Form Factor', maxGpuLength: 'Max GPU Length', fans: 'Fan Support' },
    psu: { wattage: 'Wattage', efficiency: 'Efficiency Rating', modular: 'Cable Management', fanSize: 'Fan Size' },
  };
  return labels[category] || {};
}

/**
 * Generate a dynamic 2-4 sentence product overview.
 */
export function getProductOverview(product) {
  const { category, brand, name } = product;
  
  if (category === 'cpu') {
    const coreTarget = product.specs?.cores >= 12 ? 'enthusiasts, heavy multitasking, and professional content creation' : 'modern gaming and seamless multitasking';
    return `The ${name} is a high-performance desktop processor engineered by ${brand}. It is designed for ${coreTarget}, offering exceptional single-core speeds and multi-threaded capabilities. This processor exists to push the boundaries of system performance, ensuring your system remains responsive even under the heaviest workloads.`;
  }
  
  if (category === 'gpu') {
    const memory = product.specs?.vram || 'ample';
    return `The ${name} is a dedicated graphics card designed by ${brand} to deliver exceptional frame rates and high-fidelity visuals. Featuring ${memory} of video memory, it is perfectly suited for demanding AAA gaming and hardware-accelerated creative workflows. Its major strength lies in providing smooth, uncompromising graphical fidelity.`;
  }
  
  if (category === 'motherboard') {
    const size = product.specs?.formFactor || 'standard';
    return `The ${name} is a premium ${size} motherboard from ${brand} that acts as the central foundation of your PC. It is designed for builders who require robust power delivery, extensive connectivity, and rock-solid stability. This board provides the expandability you need to support next-generation components and high-speed peripherals.`;
  }
  
  if (category === 'ram') {
    const speed = product.specs?.speed || 'high-speed';
    return `The ${brand} ${name} memory kit provides ${speed} data transfer rates for a highly responsive computing experience. It is built for gamers and professionals who demand instant application loading and seamless background multitasking. Its high frequency ensures your processor always has the data it needs precisely when it needs it.`;
  }
  
  if (category === 'storage') {
    const cap = product.specs?.capacity || 'high-capacity';
    return `This ${cap} solid-state drive from ${brand} offers lightning-fast data access and incredible transfer speeds. The ${name} is engineered for users who want to eliminate loading screens and drastically reduce application launch times. Its major strength is transforming how quickly your system boots and handles large files.`;
  }
  
  if (category === 'pccase') {
    return `The ${name} is an intelligently designed chassis from ${brand} that prioritizes both aesthetics and functionality. It is aimed at builders who want excellent airflow, straightforward cable management, and broad component compatibility. The case exists to showcase your components while keeping them running at optimal temperatures.`;
  }
  
  if (category === 'psu') {
    const cert = product.specs?.efficiency || 'efficient';
    return `The ${name} is a reliable power supply unit delivering clean, stable energy to your entire system. Manufactured by ${brand} with a ${cert} rating, it is built for users who prioritize system stability and longevity. Its efficient design minimizes heat generation while easily supporting power-hungry modern components.`;
  }

  return `The ${name} is a premium hardware component from ${brand}. Designed with high performance and reliability in mind, it provides an excellent foundation for any modern PC build.`;
}

/**
 * Generate a dynamic list of key features based on the product.
 */
export function getProductFeatures(product) {
  const { category, specs = {} } = product;
  const features = [];
  
  if (category === 'cpu') {
    features.push(`Features ${specs.cores} physical cores and ${specs.threads} threads for massive parallel processing`);
    features.push(`Achieves boost clock speeds up to ${specs.boostClock} for immediate responsiveness`);
    features.push(`Designed for the modern ${specs.socket} motherboard platform`);
    features.push('Optimized for high-framerate gaming and heavy workloads');
  } else if (category === 'gpu') {
    features.push(`Equipped with ${specs.vram} of high-speed video memory`);
    features.push('Supports advanced ray tracing and AI-accelerated rendering');
    features.push(`Operates with a maximum boost frequency of ${specs.boostClock}`);
    features.push('Premium cooling design for sustained high-performance output');
  } else if (category === 'motherboard') {
    features.push(`Supports the latest processors on the ${specs.socket} socket`);
    features.push(`Features the robust ${specs.chipset} chipset architecture`);
    features.push(`Accommodates up to ${specs.maxRam} of ${specs.ramType} memory`);
    features.push('Advanced power delivery and premium thermal design');
  } else if (category === 'ram') {
    features.push(`Massive ${specs.capacity} capacity for heavy multitasking`);
    features.push(`Blazing fast ${specs.speed} operating frequencies`);
    features.push(`Low ${specs.latency} latency for immediate data access`);
    features.push('Premium heat spreader design for stable operation');
  } else if (category === 'storage') {
    features.push(`Massive ${specs.capacity} storage capacity`);
    features.push(`Utilizes high-speed ${specs.type} technology`);
    features.push(`Incredible sequential read speeds up to ${specs.read}`);
    features.push(`Rapid sequential write speeds up to ${specs.write}`);
  } else if (category === 'pccase') {
    features.push('Excellent airflow-focused design');
    features.push(`Supports large modern graphics cards up to ${specs.maxGpuLength}mm`);
    features.push('Tempered glass side panel for easy viewing');
    features.push('Advanced cable management system');
    features.push(`Optimized cooling support for up to ${specs.fans}`);
  } else if (category === 'psu') {
    features.push(`Delivers ${specs.wattage}W of continuous, stable power`);
    features.push(`Certified ${specs.efficiency} efficiency rating`);
    features.push(`${specs.modular} cabling for clean builds`);
    features.push(`Quiet ${specs.fanSize} cooling fan`);
    features.push('High-quality components for long-term reliability');
  } else {
    features.push('Premium build quality and reliability');
    features.push('Optimized for modern PC standards');
    features.push('Excellent price-to-performance ratio');
  }
  
  return features;
}

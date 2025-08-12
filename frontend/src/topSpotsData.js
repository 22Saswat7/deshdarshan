// src/topSpotsData.js

// Import the image utility function
import { getTopSpotImage } from './utils/imageUtils';

/**
 * Alternative approach: Pre-define image imports for better tree shaking
 * You can uncomment this approach if you prefer explicit imports
 */
// const topSpotImages = {
//   'puri': () => import('./assets/topspots/puri.jpg'),
//   'konark': () => import('./assets/topspots/konark.jpg'),
//   'gateway-of-india': () => import('./assets/topspots/gateway-of-india.jpg'),
//   'jagannath-temple': () => import('./assets/topspots/jagannath-temple.jpg'),
//   // Add more as needed...
// };

export const topSpots = {
  // East India
  Odisha: [
    {
      name: "Puri",
      description: "A sacred coastal city famous for the Jagannath Temple and golden beaches.",
      image: getTopSpotImage("Puri"),
      points: [
        "Jagannath Temple",
        "Golden Beach",
        "Rath Yatra Festival",
        "Chilika Lake nearby"
      ]
    },
    {
      name: "Konark",
      description: "Historic town renowned for the UNESCO-listed Sun Temple.",
      image: getTopSpotImage("Konark"),
      points: [
        "Konark Sun Temple – stone chariot marvel",
        "Konark Dance Festival",
        "Chandrabhaga Beach"
      ]
    },
    {
      name: "Nandankanan",
      description: "Botanical and zoological park famous for white tigers.",
      image: getTopSpotImage("Nandankanan"),
      points: [
        "Safari tours",
        "Kanjia Lake boating"
      ]
    },
    {
      name: "Chilika Lake",
      description: "Asia's largest lagoon, a hub for dolphins and migratory birds.",
      image: getTopSpotImage("Chilika Lake"),
      points: [
        "Dolphin boat tours",
        "Kalijai Temple",
        "Birdwatching"
      ]
    },
    {
      name: "Deomali",
      description: "Highest peak in Odisha, a favorite for trekkers.",
      image: getTopSpotImage("Deomali"),
      points: [
        "Scenic sunrise views",
        "Adventure trekking"
      ]
    }
  ],
  "West Bengal": [
    {
      name: "Kolkata",
      description: "City of literature, colonial architecture, and food.",
      image: getTopSpotImage("Kolkata"),
      points: [
        "Victoria Memorial",
        "Howrah Bridge",
        "Street food delights"
      ]
    },
    {
      name: "Darjeeling",
      description: "Hill town with Himalayan views, tea gardens, and toy trains.",
      image: getTopSpotImage("Darjeeling"),
      points: [
        "Tiger Hill sunrise",
        "Tea estates",
        "UNESCO toy train"
      ]
    },
    {
      name: "Sundarbans",
      description: "Largest mangrove forest, famous for tigers.",
      image: getTopSpotImage("Sundarbans"),
      points: [
        "Boat safaris",
        "Mangrove walks"
      ]
    },
    {
      name: "Digha",
      description: "Popular beach town.",
      image: getTopSpotImage("Digha"),
      points: [
        "Wide sandy beaches",
        "Seafood shacks"
      ]
    },
    {
      name: "Kalimpong",
      description: "Hill town with Buddhist monasteries and nurseries.",
      image: getTopSpotImage("Kalimpong"),
      points: [
        "Cactus nurseries",
        "Durpin Monastery"
      ]
    }
  ],
  Bihar: [
    {
      name: "Bodh Gaya",
      description: "Buddhist pilgrimage city where Buddha attained enlightenment.",
      image: getTopSpotImage("Bodh Gaya"),
      points: [
        "Mahabodhi Temple (UNESCO)",
        "Giant Buddha statue",
        "Monasteries from many countries"
      ]
    },
    {
      name: "Nalanda",
      description: "Historic site of the ancient Nalanda University.",
      image: getTopSpotImage("Nalanda"),
      points: [
        "Ancient university ruins",
        "Archaeological museum",
        "Stupa and temples"
      ]
    },
    {
      name: "Patna",
      description: "State capital with rich historical and cultural sites.",
      image: getTopSpotImage("Patna"),
      points: [
        "Golghar granary",
        "Patna Museum",
        "Ganga river ghats"
      ]
    },
    {
      name: "Rajgir",
      description: "Ancient capital with hills, hot springs and Buddhist caves.",
      image: getTopSpotImage("Rajgir"),
      points: [
        "Vishwa Shanti Stupa (Peace Pagoda)",
        "Venuvana Park",
        "Hot springs"
      ]
    },
    {
      name: "Valmiki National Park",
      description: "Tiger reserve and biodiversity hotspot in Bihar’s northwest.",
      image: getTopSpotImage("Valmiki National Park"),
      points: [
        "Wildlife safari",
        "Riverine forest trails"
      ]
    }
  ],
  Jharkhand: [
    {
      name: "Ranchi",
      description: "State capital with waterfalls and parks.",
      image: getTopSpotImage("Ranchi"),
      points: [
        "Hundru Falls",
        "Rock Garden",
        "Kanke Dam"
      ]
    },
    {
      name: "Netarhat",
      description: "Picturesque plateau known as 'Queen of Chotanagpur'.",
      image: getTopSpotImage("Netarhat"),
      points: [
        "Mesmerizing sunrise and sunset points",
        "Cool climate"
      ]
    },
    {
      name: "Deoghar",
      description: "Temple town and pilgrimage site.",
      image: getTopSpotImage("Deoghar"),
      points: [
        "Baidyanath Jyotirlinga Mandir",
        "Tapovan caves"
      ]
    },
    {
      name: "Hundru Falls",
      description: "One of the highest waterfalls in Jharkhand.",
      image: getTopSpotImage("Hundru Falls"),
      points: [
        "Scenic picnic spot",
        "Photography haven"
      ]
    }
  ],

  // West India
  Maharashtra: [
    {
      name: "Mumbai",
      description: "Financial, cultural, and cinematic capital of India.",
      image: getTopSpotImage("Mumbai"),
      points: [
        "Gateway of India",
        "Marine Drive",
        "Bollywood tours"
      ]
    },
    {
      name: "Ajanta Caves",
      description: "Buddhist caves with paintings and sculptures.",
      image: getTopSpotImage("Ajanta Caves"),
      points: [
        "Ancient murals",
        "Rock-cut architecture"
      ]
    },
    {
      name: "Lonavala",
      description: "Monsoon-favorite hill station.",
      image: getTopSpotImage("Lonavala"),
      points: [
        "Tiger’s Leap",
        "Chikki markets"
      ]
    },
    {
      name: "Mahabaleshwar",
      description: "Strawberry farms and mountain views.",
      image: getTopSpotImage("Mahabaleshwar"),
      points: [
        "Venna Lake",
        "Viewpoints"
      ]
    },
    {
      name: "Shirdi",
      description: "Pilgrimage town dedicated to Sai Baba.",
      image: getTopSpotImage("Shirdi"),
      points: [
        "Sai Baba Temple",
        "Spiritual atmosphere"
      ]
    }
  ],
  Goa: [
    {
      name: "Calangute Beach",
      description: "Largest and liveliest beach in Goa.",
      image: getTopSpotImage("Calangute Beach"),
      points: [
        "Water sports",
        "Beach shacks"
      ]
    },
    {
      name: "Panaji",
      description: "Charming riverside capital of Goa.",
      image: getTopSpotImage("Panaji"),
      points: [
        "Fontainhas old quarter",
        "River cruises"
      ]
    },
    {
      name: "Dudhsagar Falls",
      description: "Towering multi-tier waterfall.",
      image: getTopSpotImage("Dudhsagar Falls"),
      points: [
        "Rainy season best",
        "Jungle trek"
      ]
    },
    {
      name: "Old Goa",
      description: "Historical site of Portuguese-era churches.",
      image: getTopSpotImage("Old Goa"),
      points: [
        "Basilica of Bom Jesus",
        "Se Cathedral"
      ]
    }
  ],
  Gujarat: [
    {
      name: "Gir",
      description: "The only place in the world to see Asiatic lions.",
      image: getTopSpotImage("Gir"),
      points: [
        "Jeep safaris",
        "Deciduous forests"
      ]
    },
    {
      name: "Ahmedabad",
      description: "Vibrant city of heritage, stepwells, and food.",
      image: getTopSpotImage("Ahmedabad"),
      points: [
        "Sabarmati Ashram",
        "Pol house tours",
        "Street food"
      ]
    },
    {
      name: "Kutch",
      description: "Unique salt desert and cultural heartland.",
      image: getTopSpotImage("Kutch"),
      points: [
        "Rann of Kutch white desert",
        "Rann Utsav festival"
      ]
    },
    {
      name: "Somnath",
      description: "Temple town on the Arabian Sea.",
      image: getTopSpotImage("Somnath"),
      points: [
        "Somnath Jyotirling temple",
        "Sunset views"
      ]
    },
    {
      name: "Dwarka",
      description: "Mythical city, one of the Char Dhams.",
      image: getTopSpotImage("Dwarka"),
      points: [
        "Dwarkadhish Temple",
        "Sea coast"
      ]
    }
  ],
  Rajasthan: [
    {
      name: "Jaipur",
      description: "The Pink City, home to forts, palaces, and vibrant bazaars.",
      image: getTopSpotImage("Jaipur"),
      points: [
        "Amber Fort",
        "Hawa Mahal"
      ]
    },
    {
      name: "Udaipur",
      description: "The City of Lakes, renowned for romantic palaces.",
      image: getTopSpotImage("Udaipur"),
      points: [
        "Lake Pichola",
        "City Palace"
      ]
    },
    {
      name: "Jaisalmer",
      description: "Golden city at the edge of the Thar desert.",
      image: getTopSpotImage("Jaisalmer"),
      points: [
        "Sand dunes",
        "Jaisalmer Fort"
      ]
    },
    {
      name: "Mount Abu",
      description: "Hill station oasis in arid Rajasthan.",
      image: getTopSpotImage("Mount Abu"),
      points: [
        "Dilwara Jain Temples",
        "Nakki Lake"
      ]
    },
    {
      name: "Pushkar",
      description: "Pilgrimage site and annual fair host.",
      image: getTopSpotImage("Pushkar"),
      points: [
        "Brahma Temple",
        "Camel fair"
      ]
    }
  ],

  // North India
  Uttarakhand: [
    {
      name: "Nainital",
      description: "Kumaon’s famous lake city and hill station.",
      image: getTopSpotImage("Nainital"),
      points: [
        "Naini Lake boating",
        "Tiffin Top views"
      ]
    },
    {
      name: "Rishikesh",
      description: "Yoga and adventure capital on the Ganges.",
      image: getTopSpotImage("Rishikesh"),
      points: [
        "River rafting",
        "Hanging bridges"
      ]
    },
    {
      name: "Haridwar",
      description: "Holy city and Ganga aarti destination.",
      image: getTopSpotImage("Haridwar"),
      points: [
        "Har Ki Pauri",
        "Mansa Devi cable car"
      ]
    },
    {
      name: "Valley of Flowers",
      description: "UNESCO park with seasonal wildflower blooms.",
      image: getTopSpotImage("Valley of Flowers"),
      points: [
        "Wildflower trekking",
        "Scenic meadows"
      ]
    },
    {
      name: "Mussoorie",
      description: "Cool mountain air at Queen of the Hills.",
      image: getTopSpotImage("Mussoorie"),
      points: [
        "Kempty Falls",
        "Mall Road"
      ]
    }
  ],
  "Himachal Pradesh": [
    {
      name: "Manali",
      description: "Adventure center—mountains, snow, and cafes.",
      image: getTopSpotImage("Manali"),
      points: [
        "Solang Valley paragliding",
        "Rohtang Pass"
      ]
    },
    {
      name: "Shimla",
      description: "Colonial hill town and capital.",
      image: getTopSpotImage("Shimla"),
      points: [
        "Mall Road",
        "Kalibari Temple"
      ]
    },
    {
      name: "Dharamshala",
      description: "Home to the Dalai Lama and Tibetan culture.",
      image: getTopSpotImage("Dharamshala"),
      points: [
        "McLeod Ganj",
        "Bhagsu Falls"
      ]
    },
    {
      name: "Kullu",
      description: "Valley of gods, lush with orchards.",
      image: getTopSpotImage("Kullu"),
      points: [
        "Raghunath Temple",
        "Bijli Mahadev Trek"
      ]
    },
    {
      name: "Spiti Valley",
      description: "High-altitude cold desert and monasteries.",
      image: getTopSpotImage("Spiti Valley"),
      points: [
        "Key Monastery",
        "Chandratal Lake"
      ]
    }
  ],
  Delhi: [
    {
      name: "Red Fort",
      description: "Iconic Mughal fortification in Old Delhi.",
      image: getTopSpotImage("Red Fort"),
      points: [
        "Light & sound show",
        "UNESCO World Heritage"
      ]
    },
    {
      name: "Qutub Minar",
      description: "World's tallest brick minaret.",
      image: getTopSpotImage("Qutub Minar"),
      points: [
        "Architecture",
        "Archaeological complex"
      ]
    },
    {
      name: "India Gate",
      description: "War memorial in central Delhi.",
      image: getTopSpotImage("India Gate"),
      points: [
        "Evening family hangout",
        "Night lighting"
      ]
    },
    {
      name: "Lotus Temple",
      description: "Baha’i temple known for its flower-like shape.",
      image: getTopSpotImage("Lotus Temple"),
      points: [
        "Silence, meditation",
        "Modern design"
      ]
    }
  ],
  "Uttar Pradesh": [
    {
      name: "Varanasi",
      description: "Spiritual heart of India on the Ganges.",
      image: getTopSpotImage("Varanasi"),
      points: [
        "Sunrise boat rides",
        "Ghats and aartis"
      ]
    },
    {
      name: "Agra",
      description: "Home of the world-famous Taj Mahal.",
      image: getTopSpotImage("Agra"),
      points: [
        "Taj Mahal",
        "Agra Fort"
      ]
    },
    {
      name: "Lucknow",
      description: "City of Nawabs, famous for kebabs and culture.",
      image: getTopSpotImage("Lucknow"),
      points: [
        "Bara Imambara",
        "Chowk markets"
      ]
    },
    {
      name: "Mathura",
      description: "Birthplace of Lord Krishna, full of temples.",
      image: getTopSpotImage("Mathura"),
      points: [
        "Krishna Janmabhoomi",
        "Yamuna Ghats"
      ]
    },
    {
      name: "Prayagraj",
      description: "Confluence of three rivers and Kumbh Mela site.",
      image: getTopSpotImage("Prayagraj"),
      points: [
        "Triveni Sangam",
        "Allahabad Fort"
      ]
    }
  ],

  // South India
  Kerala: [
    {
      name: "Alleppey",
      description: "‘Venice of the East’, known for backwaters and houseboats.",
      image: getTopSpotImage("Alleppey"),
      points: [
        "Overnight houseboat cruises",
        "Snake boat races"
      ]
    },
    {
      name: "Munnar",
      description: "Hill station famed for misty tea gardens.",
      image: getTopSpotImage("Munnar"),
      points: [
        "Eravikulam Park",
        "Tea museum"
      ]
    },
    {
      name: "Kochi",
      description: "Historic city blending European and Indian cultures.",
      image: getTopSpotImage("Kochi"),
      points: [
        "Fort Kochi",
        "Chinese nets"
      ]
    },
    {
      name: "Wayanad",
      description: "Lush forests, waterfalls, and tribal villages.",
      image: getTopSpotImage("Wayanad"),
      points: [
        "Edakkal Caves",
        "Banasura Sagar Dam"
      ]
    },
    {
      name: "Kovalam",
      description: "Best-known beach resort in southern India.",
      image: getTopSpotImage("Kovalam"),
      points: [
        "Lighthouse Beach",
        "Surfing"
      ]
    }
  ],
  "Tamil Nadu": [
    {
      name: "Chennai",
      description: "Capital city with rich culture and cuisine.",
      image: getTopSpotImage("Chennai"),
      points: [
        "Marina Beach",
        "Kapaleeshwarar Temple"
      ]
    },
    {
      name: "Mahabalipuram",
      description: "Famous for shore temples and rock cut monuments.",
      image: getTopSpotImage("Mahabalipuram"),
      points: [
        "Shore Temple",
        "Pancha Rathas"
      ]
    },
    {
      name: "Ooty",
      description: "‘Queen of the Nilgiris’ hill stations.",
      image: getTopSpotImage("Ooty"),
      points: [
        "Botanical Garden",
        "Heritage train"
      ]
    },
    {
      name: "Kodaikanal",
      description: "Cool lake town with rolling hills.",
      image: getTopSpotImage("Kodaikanal"),
      points: [
        "Star-shaped Kodaikanal Lake",
        "Coaker's Walk"
      ]
    },
    {
      name: "Madurai",
      description: "Temple city with long history.",
      image: getTopSpotImage("Madurai"),
      points: [
        "Meenakshi Temple",
        "Local markets"
      ]
    }
  ],
  Karnataka: [
    {
      name: "Bengaluru",
      description: "‘Garden City’ and Silicon Valley of India.",
      image: getTopSpotImage("Bengaluru"),
      points: [
        "Lalbagh Botanical Garden",
        "Cafés and nightlife"
      ]
    },
    {
      name: "Coorg",
      description: "Coffee hills with cool weather and plantations.",
      image: getTopSpotImage("Coorg"),
      points: [
        "Abbey Falls",
        "Coffee estate visits"
      ]
    },
    {
      name: "Hampi",
      description: "Vijayanagar-era ruined city, a UNESCO World Heritage site.",
      image: getTopSpotImage("Hampi"),
      points: [
        "Stone temples",
        "Unique boulder landscapes"
      ]
    },
    {
      name: "Mysuru",
      description: "Royal city with palaces and culture.",
      image: getTopSpotImage("Mysuru"),
      points: [
        "Mysore Palace",
        "Dussehra festival"
      ]
    },
    {
      name: "Gokarna",
      description: "Tranquil beach and pilgrimage destination.",
      image: getTopSpotImage("Gokarna"),
      points: [
        "Om Beach",
        "Water sports"
      ]
    }
  ],
  "Andhra Pradesh": [
    {
      name: "Vijayawada",
      description: "Key city on the banks of the Krishna river.",
      image: getTopSpotImage("Vijayawada"),
      points: [
        "Kanaka Durga Temple",
        "Prakasam Barrage"
      ]
    },
    {
      name: "Araku Valley",
      description: "Hill station with coffee estates and waterfalls.",
      image: getTopSpotImage("Araku Valley"),
      points: [
        "Scenic train journey",
        "Tribal Museum"
      ]
    },
    {
      name: "Tirupati",
      description: "One of the most visited pilgrimage spots in the world.",
      image: getTopSpotImage("Tirupati"),
      points: [
        "Tirumala Venkateswara Temple",
        "Scenic hilltop"
      ]
    },
    {
      name: "Visakhapatnam",
      description: "Port city known for beaches and shipyards.",
      image: getTopSpotImage("Visakhapatnam"),
      points: [
        "RK Beach",
        "Kailasagiri Hill Park"
      ]
    }
  ]
};

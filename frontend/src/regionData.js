// Import the image utility function
import { getStateImage } from './utils/imageUtils';

export const regionDetails = {
  east: {
    name: 'East India',
    states: [
      {
        name: 'Odisha',
        description: 'Temples, arts, beaches',
        image: getStateImage('Odisha'),
      },
      {
        name: 'West Bengal',
        description: 'Culture, sweets, hills',
        image: getStateImage('West Bengal'),
      },
      {
        name: 'Bihar',
        description: 'Heritage, Buddhism',
        image: getStateImage('Bihar'),
      },
      {
        name: 'Jharkhand',
        description: 'Forests, waterfalls',
        image: getStateImage('Jharkhand'),
      },
    ],
  },
  west: {
    name: 'West India',
    states: [
      {
        name: 'Maharashtra',
        description: 'Bollywood, caves, food',
        image: getStateImage('Maharashtra'),
      },
      {
        name: 'Goa',
        description: 'Beaches, parties, churches',
        image: getStateImage('Goa'),
      },
      {
        name: 'Gujarat',
        description: 'Heritage, lions, crafts',
        image: getStateImage('Gujarat'),
      },
      {
        name: 'Rajasthan',
        description: 'Forts, deserts, fairs',
        image: getStateImage('Rajasthan'),
      },
    ],
  },
  north: {
    name: 'North India',
    states: [
      {
        name: 'Uttarakhand',
        description: 'Himalayas, adventure',
        image: getStateImage('Uttarakhand'),
      },
      {
        name: 'Himachal Pradesh',
        description: 'Hills, trekking',
        image: getStateImage('Himachal Pradesh'),
      },
      {
        name: 'Delhi',
        description: 'Capital, cuisine, heritage',
        image: getStateImage('Delhi'),
      },
      {
        name: 'Uttar Pradesh',
        description: 'Ghats, history',
        image: getStateImage('Uttar Pradesh'),
      },
    ],
  },
  south: {
    name: 'South India',
    states: [
      {
        name: 'Kerala',
        description: 'Backwaters, ayurveda, beaches',
        image: getStateImage('Kerala'),
      },
      {
        name: 'Tamil Nadu',
        description: 'Temples, Dravidian culture',
        image: getStateImage('Tamil Nadu'),
      },
      {
        name: 'Karnataka',
        description: 'Heritage, coffee, tech',
        image: getStateImage('Karnataka'),
      },
      {
        name: 'Andhra Pradesh',
        description: 'Temples, hills, food',
        image: getStateImage('Andhra Pradesh'),
      },
    ],
  },
};

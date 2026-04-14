import { assetUrl } from '../utils/asset-url.js';

export const services = [
  {
    title: 'Restorative Dentistry',
    text: 'Dental refilling, tooth repair, and precise treatment plans that protect function while keeping results natural.',
    image: assetUrl('images/services/restorative-dentistry.jpg'),
    alt: 'A bright healthy smile shown during a restorative dental treatment showcase.',
    detail:
      'Restorative care focuses on rebuilding comfort, function, and confidence with treatments that feel precise and natural.',
    highlights: ['Dental refilling and repair', 'Tooth preservation planning', 'Balanced, natural-looking results']
  },
  {
    title: 'Orthodontics',
    text: 'Braces and alignment care designed to improve comfort, confidence, and long-term bite health.',
    image: assetUrl('images/services/orthodontics.jpg'),
    alt: 'A smiling patient wearing blue braces during orthodontic treatment.',
    detail:
      'Orthodontic care helps guide teeth into healthier alignment while improving bite comfort and smile confidence over time.',
    highlights: ['Braces and alignment review', 'Long-term bite support', 'Confidence-focused smile planning']
  },
  {
    title: 'Preventive Care',
    text: 'Professional cleaning, whitening, exams, and hygiene guidance that help prevent more serious treatment later.',
    image: assetUrl('images/services/preventive-care.jpg'),
    alt: 'A close-up dental exam showing preventive care in a modern clinical setting.',
    detail:
      'Preventive visits keep small concerns from becoming bigger ones through routine checks, cleaning, and clear hygiene guidance.',
    highlights: ['Professional cleaning and exams', 'Whitening and hygiene support', 'Early issue detection']
  },
  {
    title: 'Dental Imaging & X-Ray Review',
    text: 'Clear dental imaging and x-ray review that helps the team understand what is happening beneath the surface before treatment begins.',
    image: assetUrl('images/services/urgent-treatment.jpg'),
    alt: 'A dental x-ray image used during diagnostic imaging and treatment planning.',
    detail:
      'Imaging appointments give patients clearer answers, support more confident treatment planning, and help the clinic explain the next step in a simple, reassuring way.',
    highlights: ['Dental x-rays and scan review', 'Better diagnosis before treatment', 'Clearer treatment planning conversations']
  }
];

import { type QRSettings } from './types';

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  settings: Partial<QRSettings>;
  previewColor: string;
}

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon purple and blue gradients with futuristic dots',
    previewColor: '#A855F7',
    settings: {
      dotsOptions: { type: 'classy-rounded', color: '#A855F7' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#3B82F6' },
      cornersDotOptions: { type: 'dot', color: '#A855F7' },
    }
  },
  {
    id: 'minimalist-dark',
    name: 'Ethereal',
    description: 'Ultra clean white dots on transparent background',
    previewColor: '#FFFFFF',
    settings: {
      dotsOptions: { type: 'dots', color: '#FFFFFF' },
      cornersSquareOptions: { type: 'dot', color: '#FFFFFF' },
      cornersDotOptions: { type: 'dot', color: '#FFFFFF' },
    }
  },
  {
    id: 'golden-luxury',
    name: 'Luxury',
    description: 'Golden accents for high-end experiences',
    previewColor: '#F59E0B',
    settings: {
      dotsOptions: { type: 'classy', color: '#F59E0B' },
      cornersSquareOptions: { type: 'square', color: '#F59E0B' },
      cornersDotOptions: { type: 'square', color: '#D97706' },
    }
  },
  {
    id: 'organic-green',
    name: 'Eco Nature',
    description: 'Soft rounded greens for sustainability brands',
    previewColor: '#10B981',
    settings: {
      dotsOptions: { type: 'rounded', color: '#10B981' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#059669' },
      cornersDotOptions: { type: 'dot', color: '#10B981' },
    }
  },
  {
    id: 'branded-frame',
    name: 'Branded',
    description: 'Professional label frame with accent text',
    previewColor: '#EC4899',
    settings: {
      frameOptions: { type: 'label', color: '#EC4899', text: 'SCAN QR' },
      dotsOptions: { type: 'classy-rounded', color: '#EC4899' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#EC4899' },
      cornersDotOptions: { type: 'dot', color: '#EC4899' },
    }
  },
  {
    id: 'atomic-fusion',
    name: 'Atomic',
    description: 'Decomposed multi-color eyes for a scientific look',
    previewColor: '#06B6D4',
    settings: {
      dotsOptions: { type: 'dots', color: '#334155' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#06B6D4' },
      cornersDotOptions: { type: 'dot', color: '#F43F5E' },
      frameOptions: { type: 'modern', color: '#06B6D4', text: '' }
    }
  },
  {
    id: 'industrial-tech',
    name: 'Industrial',
    description: 'Double frames and rigid shapes for rugged brands',
    previewColor: '#6366F1',
    settings: {
      dotsOptions: { type: 'square', color: '#1E293B' },
      cornersSquareOptions: { type: 'square', color: '#6366F1' },
      cornersDotOptions: { type: 'square', color: '#6366F1' },
      frameOptions: { type: 'double', color: '#6366F1', text: '' }
    }
  },
  {
    id: 'prism-vibe',
    name: 'Prism',
    description: 'Vibrant linear gradients with extra-rounded shapes',
    previewColor: '#F472B6',
    settings: {
      dotsOptions: { 
        type: 'extra-rounded', 
        color: '#DB2777',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#DB2777' },
            { offset: 1, color: '#6366F1' }
          ]
        }
      },
      cornersSquareOptions: { type: 'extra-rounded', color: '#6366F1' },
      cornersDotOptions: { type: 'dot', color: '#DB2777' },
      frameOptions: { type: 'glass', color: '#DB2777', text: '' }
    }
  }
];

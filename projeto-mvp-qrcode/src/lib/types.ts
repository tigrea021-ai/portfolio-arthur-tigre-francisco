import { type Options, type TypeNumber, type ErrorCorrectionLevel, type Mode, type DotType, type CornerSquareType, type CornerDotType } from 'qr-code-styling';

export type GradientType = 'linear' | 'radial';
export type FrameType = 'none' | 'simple' | 'glass' | 'bracket' | 'label' | 'thick' | 'dashed' | 'double' | 'modern';

export interface QRSettings extends Options {
  data: string;
  width: number;
  height: number;
  margin: number;
  frameOptions: {
    type: FrameType;
    color: string;
    text: string;
  };
  dotsOptions: {
    color: string;
    type: DotType;
    gradient?: {
      type: GradientType;
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
  };
  backgroundOptions: {
    color: string;
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
    crossOrigin: string;
  };
  image?: string;
  qrOptions: {
    typeNumber: TypeNumber;
    mode: Mode;
    errorCorrectionLevel: ErrorCorrectionLevel;
  };
}

export const DEFAULT_SETTINGS: QRSettings = {
  data: 'https://google.com',
  width: 300,
  height: 300,
  margin: 10,
  frameOptions: {
    type: 'none',
    color: '#7c3aed',
    text: 'SCAN ME',
  },
  dotsOptions: {
    color: '#000000',
    type: 'square',
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'square',
  },
  cornersDotOptions: {
    color: '#000000',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: 'anonymous',
  },
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'M',
  },
};

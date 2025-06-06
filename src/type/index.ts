type LogoOption = {
  imageUrl?: string;
  clickUrl?: string;
};

export type VideoRenderOptions = {
  logo?: LogoOption;
  onImpressionViewable?: () => void;
  onAdVideoComplete?: () => void;
  fullClickArea?: boolean;
};

export type FluidPlayerFactoryOptions = {
  vastUrl?: string;
  vastXml?: string;
  logo?: LogoOption;
};

export type BannerRenderOptions = {
  clickThrough?: string;
  onImpressionViewable?: () => void;
};

export type NativeRenderOptions = {
  onImpressionViewable?: () => void;
};

export type InRendererOptions = {
  clickThrough?: string;
  logo?: LogoOption;
  onImpressionViewable?: () => void;
  fullClickArea?: boolean;
};

export type InVideoRendererOptions = {
  onImpressionViewable?: () => void;
  onAdVideoComplete?: () => void;
  logo?: LogoOption;
  fullClickArea?: boolean;
};

export type InNativeRendererOptions = {
  onImpressionViewable?: () => void;
};
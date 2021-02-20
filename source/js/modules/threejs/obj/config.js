import {colors, reflectivitySettings} from '../common';

const getSquareRadius = (width) => Math.hypot(width, width) / 2;

export const carpetConfig = {
  width: 180,
  depth: 3,
  radius: 763,
  degStart: 16,
  degEnd: 74,
  color: `#A481D1`,
  segments: 40,
  stripes: 7,
};

export const roadConfig = {
  width: 160,
  depth: 3,
  radius: 732,
  degStart: 0,
  degEnd: 90,
  color: `#646B7C`,
  segments: 40,
};

export const getSaturnConfig = (isDarkTheme) => ({
  planet: {
    radius: 60,
    color: isDarkTheme ? colors.ShadowedDominantRed : colors.DominantRed,
    segments: 40,
    ...reflectivitySettings.soft
  },
  ring: {
    width: 40,
    depth: 2,
    radius: 80,
    color: isDarkTheme ? colors.ShadowedBrightPurple : colors.BrightPurple,
    segments: 40,
    ...reflectivitySettings.soft
  },
  sphere: {
    radius: 10,
    color: isDarkTheme ? colors.ShadowedBrightPurple : colors.BrightPurple,
    segments: 40,
    ...reflectivitySettings.soft
  },
  line: {
    radius: 1,
    height: 1000,
    color: colors.MetalGrey,
    segments: 40,
    ...reflectivitySettings.soft
  }
});

export const lanternConfig = {
  topCap: {
    widthTop: 45,
    widthBottom: 57,
    height: 6,
    color: `#376ee0`,
    radialSegments: 4,
    ...reflectivitySettings.soft
  },
  topTrapezoid: {
    widthTop: 42,
    widthBottom: 34,
    height: 60,
    color: `#9db3ef`,
    radialSegments: 4,
    ...reflectivitySettings.soft
  },
  topBox: {
    width: 37,
    height: 4,
    color: `#376ee0`,
    ...reflectivitySettings.soft
  },
  middleCylinder: {
    height: 230,
    radius: 7,
    radialSegments: 20,
    color: `#376ee0`,
    ...reflectivitySettings.soft
  },
  baseSphere: {
    height: 16,
    radius: 16,
    segments: 20,
    color: `#376ee0`,
    ...reflectivitySettings.soft
  },
  baseCylinder: {
    height: 120,
    radius: 16,
    radialSegments: 20,
    color: `#376ee0`,
    ...reflectivitySettings.soft
  }
};

export const pyramidConfig = {
  height: 280,
  radius: getSquareRadius(250),
  radialSegments: 4,
  color: `#1960cf`,
  ...reflectivitySettings.soft
};

export const snowmanConfig = {
  topSphere: {
    radius: 44,
    segments: 20,
    color: colors.SnowColor,
    ...reflectivitySettings.strong
  },
  cone: {
    radius: 18,
    height: 75,
    radialSegments: 20,
    color: colors.Orange,
    ...reflectivitySettings.soft
  },
  baseSphere: {
    radius: 75,
    segments: 20,
    color: colors.SnowColor,
    ...reflectivitySettings.strong
  },
};

const PathConstants = {
  HOME: "/",
  AUTH: "/login",
  FAVORITES: "/favorites",
  MATCH: "/match",
} as const;

export type PathConstantType =
  (typeof PathConstants)[keyof typeof PathConstants];

export default PathConstants;

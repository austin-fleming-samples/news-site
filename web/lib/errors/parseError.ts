export const parseError = (error: unknown) =>
  error instanceof Error ? error.message : `${error}`;

export function requireEnv(...names: string[]) {
  const values = names.map((name) => process.env[name]);
  const missing = names.filter((_, i) => !values[i]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
  return values as string[];
}

import { RequestError } from "./RequestError";

export function getRequiredEnvironmentValue(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new RequestError(`Missing setting ${name}`, 500);
  }
  return value;
}

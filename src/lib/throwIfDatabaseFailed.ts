import { RequestError } from "./RequestError";

export function throwIfDatabaseFailed(error: { message: string } | null): void {
  if (error) {
    throw new RequestError(`Database error: ${error.message}`, 500);
  }
}

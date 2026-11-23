export class RateLimitError extends Error {
  retryAfterSeconds: number;

  constructor(retryAfterSeconds: number) {
    super(`Demasiadas solicitudes. Intenta de nuevo en ${retryAfterSeconds} s.`);
    this.name = "RateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  let timestamps: number[] = [];

  return {
    consume(): void {
      const now = Date.now();
      timestamps = timestamps.filter((time) => now - time < windowMs);
      if (timestamps.length >= maxRequests) {
        throw new RateLimitError(Math.ceil((windowMs - (now - timestamps[0])) / 1000));
      }
      timestamps.push(now);
    },
  };
}

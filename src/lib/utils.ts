export function getBasePath(): string | undefined {
  return process.env.VERCEL_URL || process.env.BASE_URL;
}

export function generateId(): number {
  return Math.floor(Date.now() + Math.random());
}

export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleString().split(',')[0];
}

export const BASE_URL = (endpoint: string) =>
	`https://api.rawg.io/api/${endpoint}?key=${process.env.NEXT_PUBLIC_API_KEY}`;

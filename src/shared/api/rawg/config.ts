const API_KEY = `?key=${process.env.NEXT_PUBLIC_API_KEY}`;

export const BASE_URL = (endpoint: string) =>
	`https://api.rawg.io/api/${endpoint}${API_KEY}`;

export const DETAILS_URL = (slug: string) =>
	`https://api.rawg.io/api/games/${slug}${API_KEY}`;

export const SCREENSHOTS_URL = (slug: string) =>
	`https://api.rawg.io/api/games/${slug}/screenshots${API_KEY}`;

export type EsrbRating = {
	id: number;
	slug: string;
	name: string;
};

export type Platform = {
	id: number;
	slug: string;
	name: string;
};

export type Requirements = {
	minimum: string;
	recommended: string;
};

export type PlatformWithRequirements = {
	platform: Platform;
	released_at: string;
	requirements: Requirements;
};

export type GameDto = {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: Object;
	ratings_count: number;
	reviews_text_count: string;
	added: number;
	added_by_status: Object;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: string;
	esrb_rating: EsrbRating;
	platforms: Platform[];
};

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

export type Developer = {
	games_count: number;
	id: number;
	image_background: string;
	name: string;
	slug: string;
};

export type GameDetailDto = GameDto & {
	background_image_additional: string;
	developers: Developer[];
	description: string;
	description_raw: string;
	website: string;
	released: string;
};

export type Screenshot = {
	image: string;
	id: number;
	width: number;
	height: number;
	is_deleted: boolean;
};

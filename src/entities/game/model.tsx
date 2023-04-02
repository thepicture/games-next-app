import { useInfiniteQuery } from 'react-query';
import { rawgApi } from 'shared';

export const useGamesQuery = () =>
	useInfiniteQuery<rawgApi.GameModels.GameDto[]>({
		queryKey: ['games'],
		queryFn: ({ pageParam = 1 }) =>
			fetch(`${rawgApi.BASE_URL('games')}&page=${pageParam}`).then((res) =>
				res.json()
			),
		getNextPageParam: (lastPage) =>
			(lastPage as unknown as { next: string }).next.split('&page=')[1],
	});

export const getGameBySlug = (
	slug: string
): Promise<rawgApi.GameModels.GameDetailDto> =>
	fetch(rawgApi.DETAILS_URL(slug)).then((response) => response.json());

export const useScreenshotsQuery = (slug?: string) => {
	return useInfiniteQuery<rawgApi.GameModels.Screenshot[]>({
		queryKey: ['screenshots', slug],
		queryFn: ({ pageParam = 1 }) =>
			fetch(`${rawgApi.SCREENSHOTS_URL(slug || '')}&page=${pageParam}`).then(
				(res) => res.json()
			),
		getNextPageParam: (lastPage) =>
			(lastPage as unknown as { next: string }).next &&
			(lastPage as unknown as { next: string }).next.split('&page=')[1],
	});
};

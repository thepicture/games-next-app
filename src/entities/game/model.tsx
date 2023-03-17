import { useInfiniteQuery } from 'react-query';
import { rawgApi } from 'shared';

export function useGamesQuery() {
	return useInfiniteQuery<rawgApi.GameModels.GameDto[]>({
		queryKey: ['games'],
		queryFn: ({ pageParam = 1 }) =>
			fetch(`${rawgApi.BASE_URL('games')}&page=${pageParam}`).then((res) =>
				res.json()
			),
		getNextPageParam: (lastPage) =>
			(lastPage as unknown as { next: string }).next.split('&page=')[1],
	});
}

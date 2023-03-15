import { useQuery } from 'react-query';
import { rawgApi } from 'shared';

export function useGamesQuery() {
	const { isLoading, error, data } = useQuery<rawgApi.GameModels.GameDto[]>(
		'games',
		() => fetch(`${rawgApi.BASE_URL('games')}`).then((res) => res.json())
	);

	if (isLoading) return 'Loading...';

	if (error) return 'Cannot fetch games at this time';

	return data;
}

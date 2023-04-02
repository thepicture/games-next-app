import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { GameCard, gameModel } from 'entities/game';

import { GameDto } from 'shared/api/rawg/models';

const List = styled('section')(() => ({
	display: 'flex',
	justifyContent: 'center',
	flex: 1,
	flexWrap: 'wrap',
	gap: 16,
}));

export type GameListProps = {
	filters: { id: string; name: string; suggestions: string };
};

export const GameList = ({ filters }: GameListProps) => {
	const {
		data: games,
		isLoading,
		hasNextPage,
		isLoadingError,
		fetchNextPage,
	} = gameModel.useGamesQuery();

	const [scrollRef] = useInfiniteScroll({
		loading: isLoading,
		disabled: !!isLoadingError,
		hasNextPage: hasNextPage || false,
		onLoadMore: fetchNextPage,
		rootMargin: '0px 0px 400px 0px',
	});

	if (!games) {
		return <Typography>Loading...</Typography>;
	}

	if (typeof games === 'string') {
		return <Typography>games</Typography>;
	}

	return (
		<List>
			{(games as unknown as { pages: { results: GameDto[] }[] }).pages
				.map((page) => page.results)
				.reduce((result1, result2) => [...result1, ...result2], [])
				.filter((game) =>
					filters.name ? game.name.includes(filters.name) : true
				)
				.filter((game) =>
					filters.id ? game.id.toString().includes(filters.id) : true
				)
				.filter((game) =>
					filters.suggestions
						? game.suggestions_count.toString().includes(filters.suggestions)
						: true
				)
				.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			<div ref={scrollRef} />
		</List>
	);
};

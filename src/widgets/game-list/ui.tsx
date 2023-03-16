import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { rawgApi } from 'shared';

import { GameCard, gameModel } from 'entities/game';

const List = styled('section')(() => ({
	display: 'flex',
	flex: 1,
	flexWrap: 'wrap',
	gap: 8,
}));

export type GameListProps = {
	filters: { id: string; name: string; suggestions: string };
};

export const GameList = ({ filters }: GameListProps) => {
	const games = gameModel.useGamesQuery();

	if (!games) {
		return <Typography>Loading...</Typography>;
	}

	if (typeof games === 'string') {
		return <Typography>games</Typography>;
	}

	return (
		<List>
			{(games as unknown as { results: rawgApi.GameModels.GameDto[] }).results
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
					<GameCard key={game.id.toString()} game={game} />
				))}
		</List>
	);
};

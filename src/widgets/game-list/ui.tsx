import { Typography } from '@mui/material';
import React from 'react';
import { rawgApi } from 'shared';

import { GameCard, gameModel } from 'entities/game';

export const GameList = () => {
	const games = gameModel.useGamesQuery();

	if (!games) {
		return <Typography>Loading...</Typography>;
	}

	if (typeof games === 'string') {
		return <Typography>games</Typography>;
	}

	return (
		<>
			{(
				games as unknown as { results: rawgApi.GameModels.GameDto[] }
			).results.map((game) => (
				<GameCard key={game.id.toString()} game={game} />
			))}
		</>
	);
};

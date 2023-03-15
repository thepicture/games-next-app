import { CardContent, Typography } from '@mui/material';
import React from 'react';

import { rawgApi } from 'shared/api';
import { Card } from 'shared/ui';

export const Game = ({ game }: { game: rawgApi.GameModels.GameDto }) => {
	console.log(game);
	return (
		<Card>
			<CardContent>
				<Typography gutterBottom variant="h5" component="p">
					{game.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{game.suggestions_count} suggestion
					{game.suggestions_count === 1 ? '' : 's'}
				</Typography>
			</CardContent>
		</Card>
	);
};
